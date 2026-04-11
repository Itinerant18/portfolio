You are making the portfolio fully responsive using DESIGN.md Section 8 as the exact spec.
All CSS tokens are already in globals.css. Do not re-add any vars.

TASK: Audit every component and layout file for responsive issues.
Apply DESIGN.md breakpoints exactly. Fix every responsive bug found.

DESIGN.md Breakpoints:
Mobile: <600px — single column, reduced padding, stacked nav
Tablet SM: 600-768px — 2-column grids begin
Tablet: 768-900px — expanded grids, sidebar appears  
 Desktop SM: 900-1279px — full layout forming
Desktop: >1279px — full layout, max-width 1200px

─────────────────────────────────────────────
STEP 1: Global layout (AppShell.tsx or equivalent)
─────────────────────────────────────────────

The main IDE grid is:
Desktop: grid-cols-[260px_minmax(0,1fr)_300px] (sidebar + main + explorer)
Tablet: grid-cols-[200px_minmax(0,1fr)] (collapsed explorer)
Mobile: grid-cols-1 (single column, panels as overlays)

Apply these breakpoints to the main grid container:
className="grid h-screen overflow-hidden
grid-cols-1
lg:grid-cols-[260px_minmax(0,1fr)_300px]
md:grid-cols-[220px_minmax(0,1fr)]"

The terminal row:
Desktop: 180px when open
Tablet: 140px when open
Mobile: 120px when open, may be disabled by default

Apply terminalOpen inline style:
style={{
  gridTemplateRows: terminalOpen
    ? "36px minmax(0,1fr) clamp(120px,18vh,180px)"
    : "36px minmax(0,1fr) 0px"
}}

─────────────────────────────────────────────
STEP 2: TopBar (nav) responsive
─────────────────────────────────────────────

DESIGN.md: "Navigation: horizontal links → hamburger on mobile"

The top bar at 36px height should:

- Desktop (lg+): show menu items text, icon buttons, live clock
- Tablet (md): show only CTA + icon buttons, hide menu text
- Mobile (<md): show logo + hamburger icon that opens mobile menu drawer

Replace the current nav menu items render:

<nav className="hidden md:flex items-center gap-3">
  {menuItems.map(...)}
</nav>

Add a mobile hamburger button:
<button
type="button"
className="flex md:hidden h-6 w-6 items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)]"
onClick={() => useIDEStore.getState().toggleMobileSidebar()}
aria-label="Open menu"

> {/_ 3 lines icon _/}
> <svg width="14" height="14" viewBox="0 0 14 14" fill="none">

    <line x1="1" y1="3.5" x2="13" y2="3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="1" y1="10.5" x2="13" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>

  </svg>
</button>

─────────────────────────────────────────────
STEP 3: Project panel responsive
─────────────────────────────────────────────

In the project detail panel:

a) Tab bar: on mobile scrolls horizontally, no wrap
className="flex overflow-x-auto scrollbar-hide gap-0 border-b border-[var(--border-default)]"
Each tab: flex-shrink-0

b) Main content grid (overview tab):
className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10"
On mobile: sidebar specs panel collapses to a horizontal scrollable row of pills

c) Feature cards grid:
className="grid grid-cols-1 sm:grid-cols-2 gap-3"

d) Gallery grid (ProjectOverview):
className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
Each image: max-h-[300px] on mobile, max-h-[600px] on desktop

e) Tech badge row: flex-wrap, gap-2, overflow-hidden on mobile with "show more" button

f) Flow diagram: on mobile use vertical layout (flex-col instead of flex-row)
Add a media query check via useEffect + window.innerWidth

─────────────────────────────────────────────
STEP 4: Project list panel responsive
─────────────────────────────────────────────

The project list rows should:

- Desktop: grid grid-cols-[38px_minmax(0,1fr)_auto] 3 columns
- Mobile: flex flex-col gap-2 p-3 (stacked layout)
  - Project name: type-title-sm
  - Description: single line, truncate
  - Tech badges: max 3 visible, rest hidden with "+N" pill

─────────────────────────────────────────────
STEP 5: Section spacing from DESIGN.md
─────────────────────────────────────────────

Add responsive padding to all section containers:

.section-spacing {
padding-top: clamp(32px, 5vw, 80px);
padding-bottom: clamp(32px, 5vw, 80px);
padding-left: clamp(16px, 4vw, 48px);
padding-right: clamp(16px, 4vw, 48px);
}

.content-max {
max-width: 1200px;
margin-left: auto;
margin-right: auto;
width: 100%;
}

─────────────────────────────────────────────
STEP 6: Touch targets (DESIGN.md Section 8)
─────────────────────────────────────────────

All interactive elements must have minimum 44px touch target on mobile.
Use a wrapper if the visual element is smaller:

.touch-target {
position: relative;
}
.touch-target::before {
content: "";
position: absolute;
inset: -8px;
/_ Extends tap area without changing visual _/
}

Apply to:

- All icon buttons in TopBar
- Close buttons on tabs (×)
- All pill tags
- Terminal input area

─────────────────────────────────────────────
STEP 7: Fluid container for project cards
─────────────────────────────────────────────

The project list sidebar (left panel on desktop) should:

- Desktop: fixed 260px width
- Tablet: 200px width
- Mobile: full width, shown/hidden via overlay

The project detail panel (center):

- Desktop: fills remaining space with minmax(0,1fr)
- Mobile: fills full width

─────────────────────────────────────────────
STEP 8: Terminal responsive
─────────────────────────────────────────────

Terminal should:

- Desktop: show at bottom, 180px tall
- Tablet: show at bottom, 140px tall
- Mobile: hide by default (terminalOpen = false on initial mount if window.innerWidth < 600)

Add to Terminal component mount:
useEffect(() => {
if (typeof window !== "undefined" && window.innerWidth < 600) {
useIDEStore.getState().toggleTerminal();
// Only close if currently open
}
}, []);

─────────────────────────────────────────────
STEP 9: Image optimization for all sizes
─────────────────────────────────────────────

In GalleryImage (ProjectOverview.tsx):
Replace <img> with Next.js <Image> where possible:

- Use fill + object-contain for gallery images
- Add sizes prop: sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw"
- Add loading="lazy"
- Keep the proxy URL wrapper: /api/proxy-image?url=

In ProjectUI TechIcon:

- Add width and height props explicitly
- Add loading="lazy"

─────────────────────────────────────────────
STEP 10: Verify all breakpoints
─────────────────────────────────────────────

After all responsive changes, check:

1. No horizontal overflow at any breakpoint (add overflow-x: hidden to body)
2. No text truncation that cuts off critical info
3. All buttons are tappable (44px minimum touch area)
4. All tab bars scroll horizontally on mobile without showing scrollbar
5. Live preview iframe hides on mobile (too heavy)

Add to ProjectOverview.tsx:
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
setIsMobile(window.innerWidth < 600);
const handler = () => setIsMobile(window.innerWidth < 600);
window.addEventListener("resize", handler);
return () => window.removeEventListener("resize", handler);
}, []);

// Then: {!isMobile && liveUrl && <LivePreview ... />}

After all changes run: npx tsc --noEmit
Fix all TypeScript errors before stopping.
