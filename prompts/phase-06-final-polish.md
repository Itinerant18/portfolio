Final phase: design polish, consistency audit, and build verification.
All previous phases must be complete before running this.

─────────────────────────────────────────────
STEP 1: Consistency audit — find and fix
─────────────────────────────────────────────

Search for these patterns and replace:

1. Any font-size with px values not using CSS var:
   Search: "font-size: [0-9]+px" (outside globals.css)
   Replace: use the appropriate --type-\* variable

2. Any hardcoded color that should be a var:
   Search: "#f0f0f0", "#cccccc", "#888", "#555" in component files
   Replace: var(--text-primary), var(--text-secondary), var(--text-muted)

3. Any border-radius not using the design system:
   Search: "rounded-lg", "rounded-xl", "rounded-2xl" (non-standard)
   Replace: "rounded-[8px]" (comfortable) or "rounded-[4px]" (standard)

4. Any box-shadow not using the --shadow-\* vars:
   Replace with appropriate var(--shadow-ambient) or var(--shadow-card)

─────────────────────────────────────────────
STEP 2: DESIGN.md spacing system enforcement
─────────────────────────────────────────────

The DESIGN.md 8px base spacing with sub-8px fine scale is critical.
Audit every component for spacing and map to the system:

- p-1 (4px) → OK (--space-5)
- p-1.5 (6px) → OK (--space-7)
- p-2 (8px) → OK (--space-8)
- p-3 (12px) → OK (--space-12)
- p-4 (16px) → OK (--space-16)
- p-6 (24px) → OK (--space-24)

Non-standard spacings to fix:

- p-5 (20px) → use p-[20px] explicitly and comment it as "20px gap"
- Any p-7, p-9, p-11 → non-8px multiples, replace with nearest standard

─────────────────────────────────────────────
STEP 3: Add cursor-warm theme toggle swatch
─────────────────────────────────────────────

In the TopBar theme switcher (wherever theme swatches are rendered),
add cursor-warm to the swatch list with color #f54e00 (Cursor orange) as its swatch.

The theme swatch for cursor-warm should show the orange accent on a cream preview.

─────────────────────────────────────────────
STEP 4: Scrollbar styling
─────────────────────────────────────────────

Add to globals.css — matches DESIGN.md warm minimalism:

/_ Dark themes _/
.ide-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
.ide-scrollbar::-webkit-scrollbar-track { background: transparent; }
.ide-scrollbar::-webkit-scrollbar-thumb {
background: var(--border-default);
border-radius: var(--radius-pill);
}
.ide-scrollbar::-webkit-scrollbar-thumb:hover {
background: var(--border-hover);
}

/_ cursor-warm theme gets warm scrollbar _/
[data-theme="cursor-warm"] .ide-scrollbar::-webkit-scrollbar-thumb {
background: rgba(38,37,30,0.15);
}
[data-theme="cursor-warm"] .ide-scrollbar::-webkit-scrollbar-thumb:hover {
background: rgba(38,37,30,0.30);
}

─────────────────────────────────────────────
STEP 5: Selection colors
─────────────────────────────────────────────

In globals.css, replace the ::selection rule:

::selection {
background: var(--accent-muted);
color: var(--text-primary);
}

[data-theme="cursor-warm"] ::selection {
background: rgba(245, 78, 0, 0.15);
color: #26251e;
}

─────────────────────────────────────────────
STEP 6: Focus ring system
─────────────────────────────────────────────

DESIGN.md uses shadow-based focus (rgba(0,0,0,0.1) 0px 4px 12px) not colored rings.

Add to globals.css:
:focus-visible {
outline: none;
box-shadow: var(--shadow-focus);
}

button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible {
outline: none;
box-shadow: var(--shadow-focus);
}

─────────────────────────────────────────────
STEP 7: Final build
─────────────────────────────────────────────

Run: npx tsc --noEmit
Expected: 0 errors

Run: npm run build
Expected: successful build, 0 errors, 0 critical warnings

If build fails:

1. Read the full error output
2. Fix errors in the files mentioned
3. Re-run npm run build
4. Do not stop until build succeeds

After successful build, run: npm run dev
Navigate to:

- / (home, main editor)
- Click any project → verify project panel loads
- Switch theme 3+ times → verify all 10 themes apply correctly
- Resize window to 375px width → verify mobile layout
- Resize to 768px → verify tablet layout
- Verify no horizontal scroll at any width

Report back with: "Build complete. 10 themes working. Responsive at 375px/768px/1280px."
