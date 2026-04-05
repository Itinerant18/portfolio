# Cursorfolio IDE — Complete Implementation Plan

> **Purpose:** Fix all UI/UX issues identified in the design audit. Make the portfolio match Cursor IDE's premium aesthetic.
> **Agent Instructions:** Execute phases sequentially (1-12). Each phase is self-contained with exact file paths, line numbers, and code changes.

---

## Execution Order & Dependencies

```
PHASE 1  → Critical bugs (MUST be first — app is broken on mobile)
PHASE 2  → Dead interactions (removes broken UI before visual changes)
PHASE 3  → Color system (changes CSS variables — affects all components)
PHASE 4  → Typography weights (global font-weight reduction)
PHASE 5  → Accent reduction (depends on Phase 3 color values)
PHASE 6  → Mobile navigation (depends on Phase 1 mobile fix)
PHASE 7  → Amateur signals removal (content changes)
PHASE 8  → Component unification (creates shared components, refactors existing)
PHASE 9  → Missing UX states (adds new UI sections)
PHASE 10 → Micro-interactions (polish layer — depends on all above)
PHASE 11 → Heading normalization (final sizing pass)
PHASE 12 → Validation (testing — MUST be last)
```

---

## PHASE 1: Fix Critical Bugs

### BUG 1: Undefined CSS Variables in Mobile Panels
**File:** `components/AppShell.tsx`

**Line 228** — Mobile AI panel overlay:
```tsx
// FIND:
className="absolute inset-y-0 left-0 w-[260px] border-r border-[var(--border)] bg-[var(--sidebar)]"
// REPLACE WITH:
className="absolute inset-y-0 left-0 w-[260px] border-r border-[var(--border-default)] bg-[var(--bg-elevated)]"
```

**Line 252** — Mobile files panel overlay:
```tsx
// FIND:
className="absolute inset-y-0 right-0 w-[300px] border-l border-[var(--border)] bg-[var(--sidebar)]"
// REPLACE WITH:
className="absolute inset-y-0 right-0 w-[300px] border-l border-[var(--border-default)] bg-[var(--bg-elevated)]"
```

### BUG 2: Broken Download Resume Link
**File:** `components/TopBar.tsx` — **Line 162**
Remove this line:
```tsx
{ label: "Download Resume", run: () => window.open("#", "_blank") },
```

### BUG 3: Minimize Button Empty Handler
**File:** `components/TopBar.tsx` — **Lines 353-358**
Remove the minimize WindowButton entirely, or wire to `toggleTerminal`.

---

## PHASE 2: Remove Dead Interactions

### 9 items to fix across 3 files:

| # | File | Line | Element | Fix |
|---|------|------|---------|-----|
| 1 | FileExplorer.tsx | 227 | Source Control icon | Add onClick → open GitHub |
| 2 | FileExplorer.tsx | 228 | Extensions icon | Add onClick → open Skills tab |
| 3-5 | FileExplorer.tsx | 250-258 | New File/Folder/Refresh | Remove (keep Collapse All) |
| 6 | Terminal.tsx | 273-275 | Non-terminal tabs empty state | Add contextual messages |
| 7 | Terminal.tsx | 193-199 | Maximize Panel button | Remove |
| 8-9 | TopBar.tsx | 172-173 | Expand/Shrink Selection | Remove empty handlers |

**Terminal non-functional tabs replacement (Terminal.tsx):**
Replace the generic "No data available" with:
- Problems → "No problems detected in workspace."
- Output → "Next.js 15 development server running on localhost:3000"
- Debug Console → "Debug console is available when running in debug mode."
- Ports → "Port 3000 — Next.js Dev Server"

---

## PHASE 3: Color System Overhaul

### File: `app/globals.css` — Update :root variables

**Replace neutrals (lines 6-14):**
```css
--neutral-0:   #0a0a0c;
--neutral-25:  #111114;
--neutral-50:  #18181c;
--neutral-75:  #1f1f24;
--neutral-100: #26262c;
--neutral-200: rgba(255, 255, 255, 0.07);
--neutral-300: rgba(255, 255, 255, 0.11);
--neutral-400: rgba(255, 255, 255, 0.16);
--neutral-500: #585862;
--neutral-600: #8c8c96;
--neutral-700: #e2e2e8;
```

**Replace accent (lines 18-19):**
```css
--violet-400: #7c80ff;
--violet-300: #9498ff;
```

**Fix text-disabled (line 40):**
```css
--text-disabled: #3c3c44;
```

**Fix scrollbar for rgba compatibility (line 285):**
```css
scrollbar-color: rgba(255, 255, 255, 0.10) transparent;
```

**Fix webkit scrollbar thumb (line 286):**
```css
background: rgba(255, 255, 255, 0.10);
```

---

## PHASE 4: Typography Weight Reduction

### Global rule: Maximum weight = `font-semibold` (600). No `font-black` (900) or `font-bold` (700) on UI elements.

**ExperienceTab.tsx:**
- Line 74: `font-black` → `font-semibold`, size 48px → 28px
- Line 99: `font-black` → `font-medium`
- Line 108: `font-black` → `font-medium`
- Line 116: `font-black` → `font-semibold`, size 28px → 20px
- Line 119: `font-bold` → `font-medium`
- Line 137: `font-bold` → `font-medium`

**SidebarAI.tsx:**
- Line 82: `font-bold` → `font-medium`
- Line 103: `font-black` → `font-medium`
- Line 150: `font-bold` → `font-medium`
- Line 154: `font-bold` → `font-medium`

**Terminal.tsx:**
- Line 136: `font-bold` → `font-medium`
- Line 158: `font-bold` → `font-medium`
- Lines 226, 248: `font-bold` → `font-medium`

**HomeTab.tsx:**
- Lines 30-33: size 64px → 42px max

**ContactTab.tsx:**
- Lines 66-67: size 42px → 28px

---

## PHASE 5: Reduce Accent Overuse

### Remove accent from these locations:

| File | Line | What | Change to |
|------|------|------|-----------|
| HomeTab.tsx | 33 | Last name color | `text-[var(--text-primary)]` |
| HomeTab.tsx | 40-43 | 3 of 4 tag dot colors | `var(--text-muted)` |
| ExperienceTab.tsx | 78-81 | Code-style declaration | Remove, replace with plain subtitle |
| ExperienceTab.tsx | 91 | Timeline dot | `bg-[var(--text-primary)]` |
| ExperienceTab.tsx | 119 | Company name | `text-[var(--text-secondary)]` |
| ExperienceTab.tsx | 137 | Tech tag text | `text-[var(--text-secondary)]` |
| Terminal.tsx | 159 | pwsh icon | `text-[var(--text-secondary)]` |
| SidebarAI.tsx | 151 | Circuit board icon | `text-[var(--text-muted)]` |
| ContactTab.tsx | 155 | Textarea | Remove `font-mono text-[var(--info)]` |

---

## PHASE 6: Add Mobile Navigation

### Add bottom nav bar in AppShell.tsx (mobile only)
- 4 buttons: AI, Search, Terminal, Files
- Fixed bottom, 48px height, `lg:hidden`
- Active state uses accent color

### Hide StatusBar on mobile
- StatusBar.tsx: Add `hidden lg:flex`

### Fix TopBar search bar
- Remove `pointer-events-none` from mobile
- Reduce width: `w-[200px] sm:w-[280px] md:w-[400px]`

### Add bottom padding to all content tabs
- Account for 48px bottom nav on mobile

---

## PHASE 7: Remove Amateur Signals

1. Remove emoji `📍` from ExperienceTab.tsx line 124
2. Remove close button joke from TopBar.tsx lines 85-89
3. Fix contact form — use mailto instead of fake API call
4. Remove code puns from contact labels (`// name` → `Name`)
5. Remove code-style comments from tab headers (`/* comment */` → plain label)
6. Remove `'''your message'''` placeholder
7. Remove `send_message()` button text → `Send Message`

---

## PHASE 8: Unify Component Patterns

### Create `components/ui/Primitives.tsx`
- `IDEButton` — variant: primary/secondary/ghost, size: sm/md
- `IDEInput` — standardized h-8, consistent focus states
- `SectionLabel` — uppercase tracking label

### Refactor all buttons in HomeTab, ProjectsTab, ContactTab to use IDEButton
### Refactor all inputs in ProjectsTab, ContactTab to use IDEInput
### Standardize tab underline pattern across Terminal and ProjectsTab

---

## PHASE 9: Add Missing UX States

1. **AI Chat empty state** — suggestion buttons in SidebarAI.tsx
2. **Welcome tab** — keyboard shortcuts grid when no file is open (CodeEditor.tsx)
3. **Contact form validation** — inline email format check
4. **Breadcrumb path** — file path above editor content

---

## PHASE 10: Micro-Interaction Polish

1. **Folder expand/collapse** — Framer Motion height animation in FileExplorer.tsx
2. **Editor content cross-fade** — AnimatePresence in CodeEditor.tsx
3. **Terminal output stagger** — 30ms delay per line
4. **Reduce SkillsTab progress bar** — 1000ms → 400ms
5. **Remove timeline glow** — ExperienceTab.tsx
6. **Remove animate-pulse** from "Active" badge

---

## PHASE 11: Heading Normalization

Cap all content headings at 28px (md breakpoint), 24px (mobile).
Exception: HomeTab hero name at 42px.

Verify with: `grep -rn "text-\[3[0-9]px\]" components/`

---

## PHASE 12: Final Validation

```bash
# 1. Build must pass
npm run build

# 2. No undefined CSS vars
grep -rn "var(--border)" components/ | grep -v "border-default\|border-hover\|border-active"

# 3. No font-black
grep -rn "font-black" components/

# 4. No dead handlers
grep -rn "() => { }\|() => {}" components/

# 5. Accent count per file (target: <5 each)
grep -c "var(--accent)" components/*.tsx

# 6. No oversized headings
grep -rn "text-\[4[0-9]px\]\|text-\[5[0-9]px\]\|text-\[6[0-9]px\]" components/
```

### Manual Testing:
- Mobile (375px): bottom nav, overlays, no overflow
- Tablet (768px): layout adjusts
- Desktop (1024px+): full panel layout
- All keyboard shortcuts
- All clickable elements
- Contact form submission
- AI chat interaction

---

## Summary

| Phase | Files Modified | Impact |
|-------|---------------|--------|
| 1 | AppShell, TopBar | Fixes broken mobile + dead links |
| 2 | FileExplorer, Terminal, TopBar | Removes 9 dead interactions |
| 3 | globals.css | Cursor-authentic color system |
| 4 | 5 component files | Professional typography |
| 5 | 5 component files | Restrained accent usage |
| 6 | AppShell, StatusBar, TopBar | Mobile navigation |
| 7 | ExperienceTab, TopBar, ContactTab, HomeTab | Removes amateur signals |
| 8 | NEW Primitives.tsx + 3 refactors | Consistent components |
| 9 | SidebarAI, CodeEditor, ContactTab | Missing UX states |
| 10 | FileExplorer, CodeEditor, Terminal, SkillsTab | Animation polish |
| 11 | 4-5 component files | Heading consistency |
| 12 | — | Testing + validation |

**Total files created:** 1 (Primitives.tsx)
**Total files modified:** ~14
**Estimated changes:** ~350 line modifications
