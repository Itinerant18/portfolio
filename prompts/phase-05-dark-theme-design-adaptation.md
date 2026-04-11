You are applying DESIGN.md's design philosophy to the existing 9 dark IDE themes.
The goal is NOT to convert dark themes to light — it is to apply DESIGN.md's
component patterns, shadows, borders, and spacing philosophy to dark surfaces.

TASK: Upgrade every dark theme to use the DESIGN.md component system.

─────────────────────────────────────────────
PRINCIPLE: "Warm dark" — DESIGN.md warmth in dark palettes
─────────────────────────────────────────────

DESIGN.md uses warm browns and oklab borders on light cream.
For dark themes, we apply the same philosophy with dark warm surfaces:

- Replace cold gray borders with warm transparent overlays using the theme accent
- Replace flat card backgrounds with subtle layered surfaces
- Apply the large-blur shadow philosophy (28px, 70px) to dark surfaces
- Use DESIGN.md's shadow structure but with dark-appropriate opacity

─────────────────────────────────────────────
STEP 1: Dark theme card shadow (globals.css)
─────────────────────────────────────────────

Add to every dark theme's [data-theme="X"] block:
--shadow-card: rgba(0,0,0,0.4) 0px 28px 70px, rgba(0,0,0,0.3) 0px 14px 32px, var(--accent-muted) 0px 0px 0px 1px;
--shadow-ambient: rgba(0,0,0,0.1) 0px 0px 16px, rgba(0,0,0,0.06) 0px 0px 8px;
--shadow-focus: var(--accent-muted) 0px 0px 0px 2px, rgba(0,0,0,0.1) 0px 4px 12px;

For cursor-warm (light theme) keep the DESIGN.md values:
--shadow-card: rgba(0,0,0,0.14) 0px 28px 70px, rgba(0,0,0,0.1) 0px 14px 32px, rgba(38,37,30,0.10) 0px 0px 0px 1px;

─────────────────────────────────────────────
STEP 2: Apply design system to project cards
─────────────────────────────────────────────

In the project list rows (find the component that renders each repo row):

Replace inline bg/border/shadow styles with:

- Background: var(--bg-elevated)
- Border: 1px solid var(--border-default)
- Border radius: var(--radius-comfortable) [8px]
- On hover: box-shadow using var(--shadow-ambient) → transition to var(--shadow-card)
- Transition: box-shadow 200ms ease (DESIGN.md timing)

In the project name (title of each row):

- Apply class "type-title-sm" (22px display font, -0.11px tracking)
- Color: var(--text-primary)

In the project description:

- Apply class "type-body" (17.28px serif, lh 1.35)
- Color: var(--text-secondary) (55% opacity variant)

─────────────────────────────────────────────
STEP 3: Apply design system to project detail panel
─────────────────────────────────────────────

In ProjectOverview.tsx:

a) The main panel background: var(--bg-base)
No border — full bleed

b) Each "section" card (features, flow, tech):
Background: var(--bg-elevated)
Border: 1px solid var(--border-default)
Border radius: var(--radius-comfortable) [8px]
Box shadow on hover: var(--shadow-ambient)
Transition: box-shadow 200ms ease, border-color 150ms ease

c) The specifications sidebar card:
Background: var(--bg-surface)
Border: 1px solid var(--border-default)
Border radius: var(--radius-comfortable)
Box shadow: var(--shadow-ambient) always (ambient lift)

d) Topic badges (topic graph):
Use PillTag component from phase-03 in dark mode:
Dark themes: bg=var(--bg-muted), text=var(--text-muted), radius=9999px
cursor-warm theme: #e6e5e0 bg from DESIGN.md
Hover: text → var(--accent), transition 150ms ease

─────────────────────────────────────────────
STEP 4: Apply DESIGN.md border philosophy
─────────────────────────────────────────────

Replace ALL instances of these patterns across every component:

"border border-[var(--border-default)]"
→ Keep as-is but ensure --border-default is set correctly per theme

Any hardcoded border colors like:
"border-[#2a2a2a]", "border-gray-700", "border-white/10"
→ Replace with "border-[var(--border-default)]"

Any hardcoded "rgba(255,255,255,0.08)" borders
→ Replace with "border-[var(--border-default)]"

Ensure every theme's --border-default uses rgba with the theme's accent or neutral:

- Dark themes: rgba version of a dim warm overlay appropriate to theme bg
- aniket-dark: rgba(38,37,30,0.10) adapted to dark → use rgba(255,255,255,0.08)
  Wait — keep existing dark theme borders, only enforce consistency

─────────────────────────────────────────────
STEP 5: Hover state signature (DESIGN.md Section 7)
─────────────────────────────────────────────

DESIGN.md signature interaction: hover shifts text to warm crimson #cf2d56.

For dark themes, adapt this:

- Button hover: text shifts to var(--accent-hover) (each theme's brighter accent)
- Link hover: color → var(--accent)
- Tab hover: color → var(--accent)
- Nav item hover: color → var(--accent)
- Pill tag hover: color → var(--accent)
- Project row hover: border-color → var(--border-hover)

Transition timing from DESIGN.md: 150ms ease for color changes.

Apply this by adding to globals.css:
button { transition: var(--transition-color); }
a { transition: var(--transition-color); }

─────────────────────────────────────────────
STEP 6: Three-font voice in dark themes
─────────────────────────────────────────────

The dark IDE themes should also use the three-voice type system:

- All heading text in project panels: "type-section" or "type-sub" class
- All description text: "type-body" or "type-ui" class
- All code/schema blocks: "type-mono" class
- All labels/tags: "type-caption" or "type-sys-micro" class

This provides the DESIGN.md typographic richness regardless of theme.

After all changes run: npx tsc --noEmit
Fix all TypeScript errors before stopping.
