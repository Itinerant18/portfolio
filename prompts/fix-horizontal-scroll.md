You are fixing horizontal scroll overflow in a Next.js 15 portfolio.
Read the attached DESIGN.md for design constraints.
The portfolio uses Tailwind v4 + Framer Motion + TypeScript strict mode.

YOUR ONLY GOAL: Eliminate ALL horizontal scrolling inside the project detail panel.
Do NOT change any colors, fonts, animations, or logic — only fix layout/overflow.
After every file change, verify TypeScript compiles with zero errors.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROOT CAUSE ANALYSIS — fix ALL of these
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CAUSE 1: components/projects/ProjectUI.tsx — FlowDiagram
CAUSE 2: components/projects/ProjectOverview.tsx — ticker + gallery grid
CAUSE 3: components/projects/ProjectArchitecture.tsx — pre blocks + category bar
CAUSE 4: components/projects/ProjectReadme.tsx — code blocks
CAUSE 5: components/ProjectsTab.tsx — outer container grid
CAUSE 6: components/projects/ProjectOverview.tsx — TechBadge groups

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 1 — components/projects/ProjectUI.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The FlowDiagram component renders a horizontal row of hex nodes.
On narrow panels (when the project list sidebar takes 200-260px),
the remaining panel width may be only 400-600px, not enough for
4-5 nodes in a row without overflow.

PROBLEM CODE in FlowDiagram:

  <div className="ide-scrollbar mt-3 overflow-x-auto overflow-y-hidden rounded-sm border ... px-3 py-6 ...">
    <div className={`mx-auto flex ${isMobileFlow
      ? "w-full items-center justify-start flex-col gap-0"
      : "w-fit min-w-max items-center gap-3 sm:gap-4"}`}>

The "w-fit min-w-max" forces the outer wrapper to match content width,
which causes the parent column to stretch horizontally.

FIX for FlowDiagram:

1. Change the outer wrapper: remove overflow-x-auto completely.
   The diagram must NEVER scroll horizontally — it must reflow instead.

2. Change the inner flex container logic:
   - REMOVE: "w-fit min-w-max"
   - REPLACE with: "w-full flex-wrap justify-center"
   - Keep the vertical (isMobileFlow) path unchanged

3. Change the breakpoint for switching to vertical layout:
   - Currently: isMobileFlow is set when window.innerWidth < 600
   - Change threshold to: window.innerWidth < 900
     This ensures vertical layout on tablet where the panel is narrowest.

4. Change FlowNode connector for the non-vertical path:
   - The connector between nodes uses fixed width: "w-8 sm:w-12"
   - Change to: "w-4 sm:w-6 lg:w-8" (shorter connectors = less width needed)

The complete fixed FlowDiagram container should be:

<div className="mt-3 rounded-sm border border-[var(--border-default)] bg-[linear-gradient(180deg,var(--bg-base),var(--bg-elevated))] px-3 py-6 shadow-[var(--shadow-ambient)] sm:px-4 sm:py-8">
  <div
    className={`mx-auto flex ${isMobileFlow
      ? "w-full flex-col items-center gap-0"
      : "w-full flex-wrap items-start justify-center gap-3 sm:gap-4"}`}
  >
    {flow.map((node, index) => (
      <FlowNode ... />
    ))}
  </div>
</div>

Note: Remove the outer "ide-scrollbar" and "overflow-x-auto overflow-y-hidden" entirely.
The flex-wrap will reflow nodes to the next line instead of overflowing.

5. In the useEffect that sets isMobileFlow, change the threshold:
   OLD: setIsMobileFlow(window.innerWidth < 600)
   NEW: setIsMobileFlow(window.innerWidth < 900)

   Also update the resize handler:
   OLD: const handler = () => setIsMobileFlow(window.innerWidth < 600)
   NEW: const handler = () => setIsMobileFlow(window.innerWidth < 900)

6. In FlowNode for the horizontal (non-vertical) connector, shorten the data stream line:
   OLD: <div className="relative flex w-8 items-center sm:w-12">
   NEW: <div className="relative flex w-4 items-center sm:w-6 lg:w-8">

   Also change the motion animate for the dot in horizontal mode:
   OLD: animate={{ x: [0, 30, 42], opacity: [0, 1, 1, 0] }}
   NEW: animate={{ x: [0, 12, 20], opacity: [0, 1, 1, 0] }}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 2 — components/projects/ProjectOverview.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROBLEM A: Status ticker marquee
The ticker uses whitespace-nowrap on its inner items which can push the
parent section wider than the available panel width.

Find this block:

  <div className="mb-4 overflow-hidden border-y border-[var(--border-default)] py-1.5">
    <motion.div
      animate={shouldReduceMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
      ...
      className="flex gap-8 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] opacity-65"
    >

FIX: The outer div already has overflow-hidden — this is correct.
But ensure the parent section div does NOT have min-w-0 missing.
Add min-w-0 to the section element that contains the ticker:

  <section className="design-surface p-4 min-w-0 overflow-hidden">

And to the motion.div containing ticker items, add:
style={{ width: "max-content" }}
so the animation works correctly without affecting parent width.

PROBLEM B: Gallery grid images overflow
The gallery images have fixed min-heights that can cause layout shift:
className="... h-[300px] sm:h-[420px] lg:h-[600px]"

The GalleryImage component wraps them in a relative div.
The outer grid container needs overflow-hidden:

Find:

  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

Replace with:

  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden">

PROBLEM C: Main content area grid missing min-w-0
The two-column grid at the bottom of ProjectOverview:

  <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

Add min-w-0 to all grid children to prevent implicit minimum size overflow:

  <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10">

Note: Change "1fr" to "minmax(0,1fr)" — this is the CSS fix for grid child overflow.
"1fr" alone allows grid children to be as wide as their content.
"minmax(0,1fr)" clamps the minimum width to 0, allowing the grid to shrink properly.

PROBLEM D: TechBadge groups in the Stack section
Find the flex container for tech badges:

  <div className={`flex flex-wrap gap-2 ${isMobile && !showAllTech ? "max-h-[88px] overflow-hidden" : ""}`}>

Add "min-w-0" and "w-full" to ensure the flex container respects parent width:

  <div className={`flex flex-wrap gap-2 w-full min-w-0 ${isMobile && !showAllTech ? "max-h-[88px] overflow-hidden" : ""}`}>

PROBLEM E: The "System Flow" section with FlowDiagram
In ProjectOverview, where FlowDiagram is rendered:

Find:

  <section className="design-surface p-4">
    <SectionLabel label="System Flow" />
    <FlowDiagram project={project} />

Add min-w-0 and overflow-hidden to the section:

  <section className="design-surface p-4 min-w-0 overflow-hidden">

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 3 — components/projects/ProjectArchitecture.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROBLEM A: Data Schema pre blocks
The pre block renders TypeScript type definitions that can be very long single lines.

Find:

  <div className="type-mono-sm ide-scrollbar overflow-x-auto bg-[var(--bg-base)] p-4 text-[var(--info)]">
    {model.split("\n").map((line, lineIndex) => (
      <motion.div ... className="whitespace-pre">
        {line}
      </motion.div>
    ))}
  </div>

FIX: Change whitespace-pre to whitespace-pre-wrap so long lines wrap:
<motion.div ... className="whitespace-pre-wrap break-words">
{line}
</motion.div>

Also change overflow-x-auto to overflow-hidden:

  <div className="type-mono-sm ide-scrollbar overflow-hidden bg-[var(--bg-base)] p-4 text-[var(--info)]">

PROBLEM B: CategoryBar grid columns
Find in CategoryBar:

  <div className="grid grid-cols-[84px_minmax(0,1fr)_auto] items-center gap-3">

This is correct (uses minmax(0,1fr)) so it should be fine.
But verify the parent container has width constraints.

Find the section wrapping CategoryBar:

  <section>
    <SectionLabel label="Tech Category Breakdown" />
    <div className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4">

Add min-w-0 to prevent overflow:

  <section className="min-w-0">
    <SectionLabel label="Tech Category Breakdown" />
    <div className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 overflow-hidden min-w-0">

PROBLEM C: Flow Nodes section
Same issue as ProjectOverview — FlowDiagram inside ProjectArchitecture also needs:

  <section className="min-w-0 overflow-hidden">

PROBLEM D: "High Level Description" and "System Layers" sections
Wrap each section with min-w-0:

  <section className="min-w-0">

PROBLEM E: The entire ProjectArchitecture return div
Change:

  <div className="flex flex-col gap-6 sm:gap-8">
To:
  <div className="flex flex-col gap-6 sm:gap-8 min-w-0 overflow-hidden">

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 4 — components/projects/ProjectReadme.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROBLEM: ReactMarkdown renders code blocks and tables that overflow.

FIX A: The outer article wrapper
Change:
<motion.article
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="prose prose-invert max-w-none"

> To:
> <motion.article

    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="prose prose-invert max-w-none min-w-0 overflow-hidden"

>

FIX B: The content wrapper div
Change:

  <div className="mt-6 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 md:p-10">
To:
  <div className="mt-6 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 md:p-8 overflow-hidden min-w-0">

FIX C: Code blocks in ReactMarkdown components
The SyntaxHighlighter inside the code component can overflow.
Add overflow-hidden to the wrapper and overflow-x-auto only to the
SyntaxHighlighter itself (not the outer div):

Find the code component render:
return (

<div className="relative my-4 rounded-sm overflow-hidden border border-[var(--border-default)]">
...
<SyntaxHighlighter
language={match[1]}
PreTag="div"
customStyle={{ margin: 0, background: "var(--bg-base)", padding: "1.25rem" }} >

Add overflowX: "auto" to the customStyle and wrapLines:
<SyntaxHighlighter
language={match[1]}
PreTag="div"
customStyle={{ margin: 0, background: "var(--bg-base)", padding: "1.25rem", overflowX: "auto" }}
wrapLines={true}
wrapLongLines={true}

>

FIX D: Tables in ReactMarkdown
Find the table wrapper:
table: ({ children }) => (

<div className="overflow-x-auto my-4">
<table className="w-full text-[12px] border-collapse">{children}</table>
</div>
),

This is already correct. But add max-w-full to the wrapper:
table: ({ children }) => (

<div className="overflow-x-auto my-4 max-w-full">
<table className="w-full text-[12px] border-collapse">{children}</table>
</div>
),

FIX E: Inline code elements
Find:
return <code className="type-mono-sm rounded px-1.5 py-0.5 text-[var(--accent)] bg-[var(--accent-subtle)]">{children}</code>;

Add break-all for long inline code strings:
return <code className="type-mono-sm rounded px-1.5 py-0.5 text-[var(--accent)] bg-[var(--accent-subtle)] break-words">{children}</code>;

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 5 — components/ProjectsTab.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROBLEM A: The main layout div
Find the outermost div of the non-loading render path:

  <div className="type-ui flex h-full w-full overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">

This is correct — overflow-hidden is present.
But verify ALL direct children also have min-w-0.

PROBLEM B: The aside (project list sidebar)
Find:

  <aside className="hidden h-full shrink-0 flex-col border-r border-[var(--border-default)] bg-[var(--bg-elevated)] md:flex md:w-[200px] lg:w-[260px]">

This is correct — fixed width prevents it from growing.

PROBLEM C: The main section (detail panel)
Find:

  <section className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[var(--bg-base)]">

This is correct — overflow-hidden and min-w-0 are present.
BUT check that the scrollable content area inside also has min-w-0:

Find:

  <div className="ide-scrollbar min-h-0 flex-1 overflow-y-auto bg-[var(--bg-base)]">
    <AnimatePresence mode="wait">
      <motion.div
        key={`${selectedProject.id}-${activeTab}`}
        ...
        className="content-max section-spacing"
      >

The motion.div with "content-max section-spacing" needs min-w-0:
Change:
className="content-max section-spacing"
To:
className="content-max section-spacing min-w-0"

PROBLEM D: The project hero header section
Find the hero div inside the detail panel header:
<motion.div
...
className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"

>

When the panel is narrow, the flex-row layout can overflow.
Add min-w-0 to the text div inside:

Find:

  <div className="min-w-0 flex-1">
    <div className="type-sys-micro flex flex-wrap items-center ...">
    <h1 className="type-hero mt-1 text-[var(--text-primary)]">
      <span className="gradient-text">{selectedProject.name}</span>
    </h1>

The h1 with type-hero at 72px can cause overflow if the project name is long.
Add overflow-hidden to the h1 and truncate text:

  <h1 className="type-hero mt-1 text-[var(--text-primary)] overflow-hidden">
    <span className="gradient-text break-words">{selectedProject.name}</span>
  </h1>

Also add min-w-0 to the parent flex div:

  <div className="min-w-0 flex-1 overflow-hidden">

PROBLEM E: The tab bar
Find:

  <div className="flex overflow-x-auto scrollbar-hide gap-0 border-b border-[var(--border-default)]">

The tab bar is already overflow-x-auto which is correct for tabs.
But add max-w-full to prevent it from stretching the header section:

  <div className="flex overflow-x-auto scrollbar-hide gap-0 border-b border-[var(--border-default)] max-w-full">

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 6 — components/projects/ProjectInsights.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The recharts ResponsiveContainer needs its parent to have defined width.
If the parent has width issues, charts overflow.

Find all:

  <div className="mt-4 h-64 rounded-sm border ... p-3">
    <ResponsiveContainer>

Change each to:

  <div className="mt-4 h-64 rounded-sm border ... p-3 overflow-hidden min-w-0 w-full">
    <ResponsiveContainer width="100%" height="100%">

Also find the section grid:

  <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">

Change to:

  <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 min-w-0">

And both child divs:

  <div>
    <SectionLabel label="Stack Proficiency" />
  <div>
    <SectionLabel label="Language Breakdown" />

Change to:

  <div className="min-w-0 overflow-hidden">

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 7 — globals.css — add overflow guard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Add a global rule to catch any remaining overflow at the end of globals.css,
AFTER all existing rules:

/_ ── Global overflow guard for project panels ── _/
.content-max {
max-width: min(1200px, 100%);
overflow-x: hidden;
}

.design-surface,
.design-surface-ambient,
.design-row {
min-width: 0;
overflow-x: hidden;
}

/_ Force all pre and code blocks to wrap inside content areas _/
.content-max pre,
.content-max code {
white-space: pre-wrap;
word-break: break-word;
overflow-wrap: break-word;
max-width: 100%;
}

/_ Allow syntax highlighting blocks to scroll internally but not cause parent overflow _/
.content-max .syntax-block {
overflow-x: auto;
max-width: 100%;
}

/_ recharts ResponsiveContainer fix _/
.recharts-wrapper {
max-width: 100% !important;
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VERIFICATION CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After making all changes, run: npx tsc --noEmit
Expected: 0 TypeScript errors.

Then run: npm run dev

Test these specific scenarios in the browser:

TEST 1 — Desktop wide (1440px):

- Open any project
- Go through all 5 tabs (Overview, README, Architecture, Insights, Changelog)
- No horizontal scrollbar should appear on the detail panel
- The AI sidebar (left, 260px) and File Explorer (right, 300px) should be visible

TEST 2 — Desktop narrow (1024px):

- Same tests as TEST 1
- FlowDiagram should wrap to 2 rows if there are 4+ nodes

TEST 3 — Tablet (768px-900px):

- Project list sidebar should be visible (200px)
- Detail panel fills remaining space
- FlowDiagram should render vertically (since 768 < 900 threshold)
- No horizontal overflow anywhere

TEST 4 — Mobile (375px):

- Mobile project list renders correctly
- No horizontal scroll on any tab content

TEST 5 — Long project names:

- Click a project with a long name (e.g. "Security-Engineers-Pvt.-Ltd.-Website")
- The hero h1 should wrap or truncate, not overflow

TEST 6 — README tab with code blocks:

- Open a project that has a README with code blocks (e.g. Swacth360_bot)
- Code blocks should have internal horizontal scroll (overflow-x-auto on the block)
- But the PANEL itself should NOT scroll horizontally

TEST 7 — Insights tab:

- Open any project's Insights tab
- The radar chart and pie chart should fit within the panel
- No horizontal overflow

AFTER PASSING ALL TESTS: run npm run build
Expected: successful build with 0 errors.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL CONSTRAINTS — do NOT violate these
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Do NOT add overflow-x-hidden to the body or html element —
   it is already overflow: hidden from CSS. Adding overflow-x-hidden
   would break the existing layout.

2. Do NOT remove the FlowNode hex shape (hexagonClipPath) —
   only change the container layout.

3. Do NOT change the FlowNode vertical path logic or its animations —
   only the horizontal (non-vertical) connector width.

4. The tab bar MUST remain horizontally scrollable (overflow-x-auto) —
   only the TAB CONTENT below it must not overflow horizontally.

5. Code blocks inside README MUST scroll internally (overflow-x-auto on
   the SyntaxHighlighter wrapper) — they should NOT wrap code (that breaks
   formatting). Only the PANEL around them must not overflow.
   Use the two-layer approach:
   - Outer panel: overflow-hidden (clips at panel boundary)
   - Inner code block: overflow-x-auto (scrolls within its own box)

6. All TypeScript types must remain strict — no `any` without existing precedent.

7. Recharts ResponsiveContainer: always set both width="100%" and height="100%"
   explicitly — do not rely on defaults.

8. Do not change the isMobile state used for LivePreview hiding —
   only change the isMobileFlow state threshold in ProjectUI.tsx.

9. The "show more/less" toggle for tech badges on mobile must still work
   after adding min-w-0 and w-full to the flex container.
