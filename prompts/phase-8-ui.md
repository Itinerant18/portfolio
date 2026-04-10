━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 8 — TOPBAR + SIDEBAR + TERMINAL UPGRADES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

8.1 — TopBar improvements (components/TopBar.tsx or wherever it lives):

a) Center title: Replace static text with GlitchHeading + gradient
<GlitchHeading className="gradient-text text-[13px] font-bold font-display cursor-pointer" data-text="cursorfolio.dev">
cursorfolio.dev
</GlitchHeading>

b) Live clock: Add right of icons on lg breakpoint
function LiveClock() {
const [t, setT] = useState(() => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
useEffect(() => { const id = setInterval(() => setT(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })), 1000); return () => clearInterval(id); }, []);
return <span className="mono-text text-[10px] text-[var(--text-muted)] tabular-nums hidden lg:block">{t}</span>;
}

c) Theme selector: Replace single toggle with a mini swatch row:
Show 9 colored dots. Clicking one sets the theme directly.
Active dot has neon-border ring + scale 1.3.
Dots use the --accent color of each theme as the fill.

8.2 — SidebarAI improvements:
a) Add agent persona icons next to each agent name (simple colored SVG shapes — not emoji)
b) Message bubbles: assistant messages get left-aligned with accent left border + bg-accent-subtle
user messages get right-aligned with bg-elevated
c) Add a "Clear + new session" button that shows a brief flash animation before clearing
d) Add typing indicator with 3 dots animation between sending and receiving

8.3 — Terminal improvements:
a) ASCII art boot screen: when terminal mounts for first time, display:
╔══════════════════════════════════════╗
║ CURSOR IDE PORTFOLIO v4.0.0 ║
║ Aniket Karmakar — Bengaluru ║
║ Stack: Next.js · TypeScript · AI ║
╚══════════════════════════════════════╝
Lines appear one by one at 60ms intervals.

b) Color-coded output: success messages green, errors red, commands use accent color.
c) Add these terminal commands:

- "theme <name>" — change theme live
- "stats" — show project count, tech count, year
- "whoami" — show ASCII profile card
- "contact" — show contact info in styled box
- "skills" — show skill matrix as a table

Verify: run `npx tsc --noEmit` and show me the output before moving on.
If there are errors, fix them before we proceed to the next phase.
