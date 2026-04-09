You are working on a Next.js 15 portfolio codebase (Cursor IDE theme) for Aniket Karmakar.
The stack is: Next.js 15, React 19, TypeScript, Tailwind v4, Framer Motion 12, Zustand 5, Geist fonts.

Your task is to implement ALL of the following in sequence. Do not skip any section.
After each section, verify TypeScript compiles with zero errors before moving on.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1 — BUG FIXES (do these first, they block everything else)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FIX 1.1 — utils/commands.ts
  Change the shortcut for id="toggle-theme" from "Ctrl+K" to "Ctrl+Shift+T".
  Ctrl+K is already bound to openCommandPalette in AppShell — this is a live conflict.

FIX 1.2 — AppShell.tsx CSS variable references
  Replace ALL occurrences of:
    var(--bg-main)   → var(--bg-base)
    var(--border)    → var(--border-default)
    var(--text)      → var(--text-primary)
    var(--bg-panel)  → var(--bg-surface)
    var(--bg-hover)  → var(--bg-muted)
    var(--bg-overlay) → var(--bg-overlay)  [this one exists, keep]
    var(--accent-soft) → var(--accent-subtle)
  These undefined vars are why the IDE shell renders with no background or borders.

FIX 1.3 — store/useIDEStore.ts toggleTheme
  The toggleTheme action currently only cycles aniket-dark ↔ light.
  Replace it with a full cycle through all 7 themes in order:
    aniket-dark → light → rose-pine → tokyo-night → catppuccin → nord → gruvbox → aniket-dark

FIX 1.4 — data/content.ts vs outputs/content.ts identity conflict
  The file outputs/content.ts contains a fictional persona "Nyla Verma".
  This file is used by SidebarAI and Terminal as a fallback.
  Replace the portfolioProfile in outputs/content.ts with Aniket's actual data from data/content.ts.
  Keep the outputs/ file structure intact (it's the older version used by some components).
  The name, role, email, github, linkedin, summary must all match data/content.ts exactly.

FIX 1.5 — ProjectOverview.tsx gallery grid
  The images grid:
    grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  Add a max-w and ensure it never overflows on mobile. Change to:
    grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4
  and wrap the grid div with: overflow-hidden rounded-sm

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2 — COLOR SYSTEM + TYPOGRAPHY OVERHAUL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Edit app/globals.css.

2.1 — Add these new CSS variables inside :root (aniket-dark theme):
  /* Chromatic aberration colors */
  --chroma-r: rgba(160, 94, 248, 0.08);
  --chroma-g: rgba(34, 141, 242, 0.06);
  /* Neon glow intensities */
  --glow-accent: 0 0 8px rgba(160, 94, 248, 0.4), 0 0 24px rgba(160, 94, 248, 0.15);
  --glow-info:   0 0 8px rgba(34, 141, 242, 0.4),  0 0 24px rgba(34, 141, 242, 0.12);
  --glow-success: 0 0 8px rgba(27, 71, 33, 0.5);
  /* Futuristic typography */
  --font-display: "Geist Mono", "JetBrains Mono", monospace;
  --tracking-display: -0.05em;
  --tracking-code: 0.02em;

2.2 — Add these @keyframes AFTER existing ones:

@keyframes crt-scanline {
  0% { background-position: 0 0; }
  100% { background-position: 0 4px; }
}

@keyframes glitch-clip {
  0%, 100% { clip-path: inset(0 0 98% 0); transform: translate(-2px, 0); }
  20% { clip-path: inset(20% 0 60% 0); transform: translate(2px, 0); }
  40% { clip-path: inset(50% 0 30% 0); transform: translate(-1px, 0); }
  60% { clip-path: inset(80% 0 5% 0); transform: translate(1px, 0); }
  80% { clip-path: inset(10% 0 85% 0); transform: translate(-2px, 0); }
}

@keyframes glitch-clip-2 {
  0%, 100% { clip-path: inset(95% 0 0% 0); transform: translate(2px, 0); }
  20% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 0); }
  40% { clip-path: inset(70% 0 15% 0); transform: translate(1px, 0); }
  60% { clip-path: inset(5% 0 88% 0); transform: translate(-1px, 0); }
  80% { clip-path: inset(60% 0 30% 0); transform: translate(2px, 0); }
}

@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes cursor-blink {
  0%, 100% { border-right-color: var(--accent); }
  50% { border-right-color: transparent; }
}

@keyframes neon-pulse {
  0%, 100% { box-shadow: var(--glow-accent); }
  50% { box-shadow: 0 0 16px rgba(160, 94, 248, 0.6), 0 0 40px rgba(160, 94, 248, 0.2); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-8px) rotate(0.5deg); }
  66% { transform: translateY(-4px) rotate(-0.5deg); }
}

@keyframes reveal-up {
  from { opacity: 0; transform: translateY(32px) skewY(1deg); }
  to { opacity: 1; transform: translateY(0) skewY(0deg); }
}

@keyframes reveal-chars {
  from { opacity: 0; transform: translateY(100%); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes counter-up {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes led-blink {
  0%, 90%, 100% { opacity: 1; }
  95% { opacity: 0.3; }
}

2.3 — Add utility classes after @keyframes:

.glitch-text {
  position: relative;
}
.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  background: inherit;
}
.glitch-text::before {
  color: var(--cyan-400);
  animation: glitch-clip 3.5s infinite linear;
  animation-delay: 0.5s;
}
.glitch-text::after {
  color: var(--violet-400);
  animation: glitch-clip-2 3.5s infinite linear;
  animation-delay: 1s;
}

.typewriter-text {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid var(--accent);
  animation: typewriter 2s steps(40, end) both, cursor-blink 1s step-end infinite;
}

.neon-border {
  border-color: var(--accent);
  box-shadow: var(--glow-accent);
  transition: box-shadow 300ms ease;
}
.neon-border:hover {
  box-shadow: 0 0 20px rgba(160, 94, 248, 0.7), 0 0 60px rgba(160, 94, 248, 0.25);
}

.led-dot {
  animation: led-blink 4s ease-in-out infinite;
}

.float-card {
  animation: float 6s ease-in-out infinite;
}

.reveal-text > span {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
}
.reveal-text > span > span {
  display: inline-block;
  animation: reveal-chars 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.crt-overlay::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 1px,
    rgba(0,0,0,0.03) 1px,
    rgba(0,0,0,0.03) 2px
  );
  z-index: 9999;
  animation: crt-scanline 0.1s linear infinite;
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3 — PROJECTUI.TSX DEEP REWORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File: components/projects/ProjectUI.tsx

3.1 — Replace SectionLabel component:
  Old version just renders a div with text.
  New version: animated gradient text with a scanning underline effect.

export function SectionLabel({ label }: { label: string }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="h-px w-6 bg-gradient-to-r from-[var(--accent)] to-transparent" />
        <span
          className="gradient-text text-[10px] font-bold uppercase tracking-[0.2em]"
          data-text={label}
        >
          {label}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-[var(--accent-muted)] to-transparent" />
      </div>
    </div>
  );
}

3.2 — Replace FlowNode component with a futuristic holographic node:
  Each node should have:
  - A hexagon-clip SVG background
  - Neon border pulse on hover
  - A protocol label that types in on mount
  - The connector arrow becomes a data-stream dashed line with moving dots

export function FlowNode({ label, icon, isLast, protocol }: { label: string; icon: string; isLast?: boolean; protocol?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center gap-2">
        <motion.div
          whileHover={{ scale: 1.15, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative flex h-12 w-12 items-center justify-center"
          style={{
            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            background: "linear-gradient(135deg, var(--bg-elevated), var(--bg-overlay))",
            border: "1px solid var(--accent-muted)",
          }}
        >
          {/* Neon inner glow */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(circle at center, var(--accent-muted), transparent 70%)" }}
          />
          <span className="relative z-10 text-[var(--accent)]">
            <IconMapper name={icon} size={18} />
          </span>
        </motion.div>
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--accent)]"
        >
          {label}
        </motion.span>
      </div>
      {!isLast && (
        <div className="mb-5 flex flex-col items-center gap-1">
          {protocol && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[7px] font-bold uppercase tracking-widest text-[var(--text-muted)]"
            >
              {protocol}
            </motion.span>
          )}
          <div className="relative flex items-center">
            {/* Animated data stream */}
            <svg width="48" height="8" viewBox="0 0 48 8">
              <line x1="0" y1="4" x2="48" y2="4" stroke="var(--accent-muted)" strokeWidth="1" strokeDasharray="4 3" />
              <circle r="2" fill="var(--accent)" opacity="0.8">
                <animateMotion dur="1.2s" repeatCount="indefinite" path="M0,4 L48,4"/>
              </circle>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

3.3 — Replace TechBadge with an orbital icon card:
  On hover, a faint orbit ring appears and the icon scales up.
  Tooltip becomes a futuristic HUD-style pop.

export function TechBadge({ name }: { name: string }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex h-12 w-12 items-center justify-center"
    >
      {/* Orbit ring on hover */}
      <div className="absolute inset-[-4px] rounded-full border border-[var(--accent-muted)] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
        style={{ animation: "spin-slow 4s linear infinite" }}
      />
      <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-sm transition-all duration-300 group-hover:border-[var(--accent)] group-hover:shadow-[var(--glow-accent)]">
        <TechIcon name={name} size={22} />
      </div>
      {/* HUD tooltip */}
      <div className="pointer-events-none absolute -top-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap">
        <div className="relative rounded-sm border border-[var(--accent-muted)] bg-[var(--bg-overlay)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--accent)] opacity-0 transition-all duration-200 group-hover:opacity-100">
          {/* HUD corners */}
          <span className="absolute top-0 left-0 h-1 w-1 border-t border-l border-[var(--accent)]" />
          <span className="absolute top-0 right-0 h-1 w-1 border-t border-r border-[var(--accent)]" />
          <span className="absolute bottom-0 left-0 h-1 w-1 border-b border-l border-[var(--accent)]" />
          <span className="absolute bottom-0 right-0 h-1 w-1 border-b border-r border-[var(--accent)]" />
          {name}
        </div>
      </div>
    </motion.div>
  );
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4 — PROJECTOVERVIEW.TSX ANIMATION OVERHAUL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File: components/projects/ProjectOverview.tsx

4.1 — Add a "scanning" intro animation when the overview mounts.
  At the top of the component, add a useEffect that plays a scan line across the panel.
  Use framer-motion AnimatePresence.

  Add this at the top of ProjectOverview:
  const [scanning, setScanning] = useState(true);
  useEffect(() => { const t = setTimeout(() => setScanning(false), 800); return () => clearTimeout(t); }, []);

  Wrap the entire return in:
  <AnimatePresence>
    {scanning ? (
      <motion.div
        key="scan"
        className="fixed inset-0 z-50 pointer-events-none"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0, originY: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "linear-gradient(180deg, transparent, var(--accent-muted), transparent)", height: "4px" }}
      />
    ) : null}
  </AnimatePresence>

4.2 — Replace "Core Capabilities" feature grid items with animated reveal cards.
  Each VisualBadge should stagger in with:
  - initial: opacity 0, y: 20, rotateX: -15deg
  - animate: opacity 1, y: 0, rotateX: 0
  - transition: spring with delay = index * 0.06

  Add perspective to the container: style={{ perspective: "800px" }}

4.3 — Add a live "status ticker" above the feature grid:
  A horizontal scrolling text marquee showing:
    "[ SYSTEM ONLINE ] — PROJECT LOADED — ARCHITECTURE MAPPED — STACK RESOLVED — READY"
  
  Implement as:
  <div className="overflow-hidden border-y border-[var(--border-default)] py-1.5 mb-6">
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="flex whitespace-nowrap gap-8 text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] opacity-60"
    >
      {Array.from({ length: 4 }).flatMap(() =>
        ["SYSTEM ONLINE", "PROJECT LOADED", "ARCHITECTURE MAPPED", "STACK RESOLVED", "RUNTIME ACTIVE"].map((s, i) => (
          <span key={`${s}-${i}`} className="flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-[var(--accent)] led-dot" />
            {s}
          </span>
        ))
      )}
    </motion.div>
  </div>

4.4 — Topic Graph: replace flat badges with an animated node cloud.
  Each topic badge should:
  - Enter with a random x/y offset and fade+scale in
  - On hover: glow border + scale 1.1 + show connection lines to neighboring badges
  - Use CSS custom properties for stagger delay: style={{ "--delay": `${index * 40}ms` }}
  - Animation: opacity 0 → 1, scale 0.3 → 1, with spring physics

4.5 — Specifications sidebar: animate each SidebarKeyValue with a number counter for year values
  and a typewriter effect for string values.
  Wrap the sidebar in:
  <motion.aside
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3, duration: 0.5 }}
    className="..."
  >

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5 — PROJECTARCHITECTURE.TSX OVERHAUL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File: components/projects/ProjectArchitecture.tsx

5.1 — Replace the static terminal command prefix with an animated typewriter:
  Currently: <span className="font-bold opacity-80 animate-pulse">$ arch --inspect --verbose</span>
  Replace with a TypewriterText component:

  function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);
    useEffect(() => {
      let i = 0;
      const id = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayed(text.slice(0, ++i));
          if (i >= text.length) { setDone(true); clearInterval(interval); }
        }, 35);
        return () => clearInterval(interval);
      }, delay);
      return () => clearTimeout(id);
    }, [text, delay]);
    return (
      <span className="font-mono text-[11px] text-[var(--info)]">
        {displayed}
        {!done && <span className="inline-block h-3 w-[2px] bg-[var(--accent)] animate-[blink_1s_step-end_infinite] ml-0.5" />}
      </span>
    );
  }

  Use it: <TypewriterText text="$ arch --inspect --verbose" delay={200} />

5.2 — Animate the 3-card grid (Logic Layer, Persistence, Discovery):
  Replace the plain grid with a staggered 3D card reveal:
  - Each card enters from y:40 with a rotateX(-10deg) and fades in
  - On hover: border-left lights up with neon glow matching its accent color
  - Add a subtle scanline pattern on each card background using the crt CSS class

5.3 — Data Schema Preview: add syntax highlighting animation.
  When the schema pre block enters the viewport (use IntersectionObserver or framer-motion whileInView):
  - Characters reveal left-to-right with a 2ms per character delay
  - The accent dot (●) pulses with neon-pulse animation
  - Add a "READONLY" watermark text in the corner with 3% opacity

  Implement the line-by-line reveal:
  const lines = model.split('\n');
  Use motion.div with staggerChildren where each line has:
  initial={{ opacity: 0, x: -8 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-40px" }}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 6 — PROJECTCHANGELOG.TSX ANIMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File: components/projects/ProjectChangelog.tsx

6.1 — Timeline connector: replace the static gradient line with an animated one.
  The vertical line between releases should have a glowing particle that travels down it:
  
  Add after the timeline divider line:
  <motion.div
    className="absolute right-[-5px] w-[2px] bg-[var(--accent)]"
    initial={{ height: 0, top: 8 }}
    whileInView={{ height: "calc(100% + 32px)" }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: "easeInOut" }}
  />

6.2 — Release cards: animated border-left reveal + content fade.
  Each release card should:
  - Slide in from left with x: -24px → 0
  - Border-left color transitions from transparent → accent over 400ms after slide completes
  - Version number (v1.x) has a glitch effect: add data-text={release.v} and className="glitch-text"
    for 600ms on mount, then remove the class

6.3 — Version badge: make it count up from v0.0 to the target version.
  On whileInView trigger, animate the displayed version number using a counter.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 7 — TOPBAR.TSX + TERMINAL.TSX POLISH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7.1 — TopBar: make the center "cursorfolio" title a glitch-text element.
  Replace:
    <div className="... text-[var(--text-muted)]">cursorfolio</div>
  With:
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="... cursor-pointer"
    >
      <span className="glitch-text gradient-text text-[12px] font-bold" data-text="cursorfolio.dev">
        cursorfolio.dev
      </span>
    </motion.div>

7.2 — TopBar: add a live clock in the status bar (right side, before the icon buttons):
  function LiveClock() {
    const [time, setTime] = useState("");
    useEffect(() => {
      const update = () => setTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }));
      update();
      const id = setInterval(update, 10000);
      return () => clearInterval(id);
    }, []);
    return <span className="text-[10px] font-mono text-[var(--text-muted)] opacity-60 hidden lg:block">{time}</span>;
  }

7.3 — Terminal: add a boot animation when terminal first opens.
  When terminalOpen goes from false → true, show a boot sequence in the terminal:
  Lines appear one by one with 80ms gap:
    "> Initializing workspace..."
    "> Loading project registry..."
    "> GitHub sync: OK"
    "> Ready. Type 'help' for commands."
  
  Detect "first open" by checking entries.length === 1 and the boot entry has no command.
  On first render, stagger the boot lines via setTimeout chains.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 8 — PARTICLE BACKGROUND + GLOBAL AMBIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create a new file: components/ui/ParticleField.tsx

This is a lightweight canvas-based particle system (no heavy libraries):
- 60-80 dots floating slowly
- Each dot: radius 1-2px, color var(--accent) at 6-15% opacity
- Movement: each particle has vx, vy ±0.2px/frame, bounces off edges
- Connections: if two particles are within 120px, draw a line between them at opacity proportional to distance
- On mouse move (window listener): particles within 100px of cursor gently repel
- Performance: use requestAnimationFrame, skip if document is hidden

Export as default. Add to AppShell.tsx as a fixed z-0 layer behind the grid:
  <ParticleField className="fixed inset-0 z-0 pointer-events-none opacity-40" />

Make it conditional: only render if theme is "aniket-dark" or "tokyo-night".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 9 — SETTINGS PANEL (theme switcher visual upgrade)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If a Settings panel component exists, upgrade the theme switcher to show:
- A visual color swatch for each of the 7 themes
- The active theme has a neon-border ring around its swatch
- Hover shows a live preview of the accent color
- Clicking triggers an animated theme transition:
  1. A white flash div (opacity 0 → 0.15 → 0) over 300ms
  2. Then setTheme fires
  3. All CSS var transitions handle the color morph (already set to 180ms)

If no Settings panel exists, skip this section.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPLEMENTATION ORDER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9
  
  After Section 1: run `npx tsc --noEmit` — must show 0 errors
  After Section 3: test in browser that AppShell renders with correct colors
  After Section 4-6: test that project panel animations run on first load without jank
  Final: run `npm run build` — must succeed with 0 errors

CONSTRAINTS:
  - Do NOT use any animation library other than framer-motion (already installed)
  - Do NOT add new npm packages unless explicitly stated
  - All canvas work (ParticleField) must be vanilla JS
  - All animations must respect prefers-reduced-motion:
    Add this once to globals.css:
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
    }
  - TypeScript strict mode: no `any` types
  - All new components must be "use client" if they use hooks or browser APIs