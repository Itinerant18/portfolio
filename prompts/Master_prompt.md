You are a senior full-stack engineer and creative technologist upgrading a Next.js 15 Cursor IDE-themed portfolio for Aniket Karmakar. You have access to the full codebase. Read every file carefully before touching anything.

Stack already installed: Next.js 15, React 19, TypeScript 5, Tailwind v4, Framer Motion 12, Zustand 5, Geist fonts, react-icons, lucide-react.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 0 — INSTALL ALL REQUIRED PACKAGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Run these commands exactly in order:

npm install @fontsource/space-grotesk @fontsource/dm-mono @fontsource/dm-sans
npm install lenis @studio-freight/lenis
npm install gsap @gsap/react
npm install @chenglou/pretext
npm install three @types/three
npm install vanta
npm install recharts
npm install react-markdown remark-gfm rehype-highlight
npm install react-syntax-highlighter @types/react-syntax-highlighter
npm install date-fns
npm install clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-tooltip @radix-ui/react-tabs
npm install react-intersection-observer
npm install react-use
npx create-video@latest --template blank --name portfolio-video-demo

After installs, verify package.json contains all the above before proceeding.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — TYPOGRAPHY SYSTEM (app/globals.css)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1.1 Add font imports at the very top of globals.css (before @import "tailwindcss"):

@import "@fontsource/space-grotesk/300.css";
@import "@fontsource/space-grotesk/400.css";
@import "@fontsource/space-grotesk/500.css";
@import "@fontsource/space-grotesk/600.css";
@import "@fontsource/space-grotesk/700.css";
@import "@fontsource/dm-mono/300.css";
@import "@fontsource/dm-mono/400.css";
@import "@fontsource/dm-mono/500.css";
@import "@fontsource/dm-sans/400.css";
@import "@fontsource/dm-sans/500.css";

1.2 Replace the --font-\* tokens in :root with:

--font-display: "Space Grotesk", "Geist Sans", system-ui, sans-serif;
--font-sans: "DM Sans", "Geist Sans", system-ui, sans-serif;
--font-mono: "DM Mono", "Geist Mono", "JetBrains Mono", monospace;
--font-accent: "Space Grotesk", monospace;

1.3 Add a full 8-step fluid type scale using clamp():

--text-2xs: clamp(9px, 0.55rem + 0.1vw, 10px);
--text-xs: clamp(10px, 0.6rem + 0.15vw, 11px);
--text-sm: clamp(11px, 0.65rem + 0.2vw, 12px);
--text-base: clamp(12px, 0.7rem + 0.25vw, 13px);
--text-md: clamp(13px, 0.8rem + 0.3vw, 14px);
--text-lg: clamp(14px, 0.85rem + 0.4vw, 16px);
--text-xl: clamp(18px, 1.1rem + 0.6vw, 22px);
--text-2xl: clamp(24px, 1.4rem + 1vw, 32px);
--text-3xl: clamp(32px, 2rem + 1.5vw, 48px);
--text-4xl: clamp(48px, 3rem + 2vw, 72px);
--text-hero: clamp(64px, 5vw + 2rem, 120px);

--weight-light: 300;
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
--weight-black: 900;

--leading-display: 0.95;
--leading-heading: 1.1;
--leading-tight: 1.25;
--leading-snug: 1.4;
--leading-normal: 1.6;
--leading-relaxed: 1.8;

--tracking-display: -0.05em;
--tracking-heading: -0.03em;
--tracking-tight: -0.01em;
--tracking-normal: 0;
--tracking-wide: 0.06em;
--tracking-wider: 0.12em;
--tracking-widest: 0.2em;

1.4 Update the body rule:
body {
font-family: var(--font-sans);
font-size: var(--text-base);
font-weight: var(--weight-regular);
line-height: var(--leading-normal);
font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
-webkit-font-smoothing: antialiased;
text-rendering: optimizeLegibility;
}

1.5 Add heading utility classes:

.display-heading {
font-family: var(--font-display);
font-size: var(--text-hero);
font-weight: var(--weight-black);
line-height: var(--leading-display);
letter-spacing: var(--tracking-display);
}

.section-heading {
font-family: var(--font-display);
font-size: var(--text-3xl);
font-weight: var(--weight-bold);
line-height: var(--leading-heading);
letter-spacing: var(--tracking-heading);
}

.card-heading {
font-family: var(--font-display);
font-size: var(--text-xl);
font-weight: var(--weight-semibold);
line-height: var(--leading-tight);
letter-spacing: var(--tracking-tight);
}

.label-heading {
font-family: var(--font-accent);
font-size: var(--text-xs);
font-weight: var(--weight-semibold);
letter-spacing: var(--tracking-widest);
text-transform: uppercase;
}

.mono-text {
font-family: var(--font-mono);
font-weight: var(--weight-light);
font-feature-settings: "zero" 1, "ss01" 1;
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2 — 9-THEME COLOR SYSTEM (globals.css)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANT: Each theme needs ALL of these 20 semantic tokens.
Replace the existing thin theme definitions with complete ones.

For every theme block, define:
--bg-base, --bg-surface, --bg-elevated, --bg-overlay, --bg-muted
--border-default, --border-hover, --border-active
--text-primary, --text-secondary, --text-muted, --text-disabled
--accent, --accent-hover, --accent-muted, --accent-subtle
--success, --warning, --error, --info
-- syntax-keyword, --syntax-string, --syntax-number,
--syntax-property, --syntax-punctuation, --syntax-class, --syntax-variable
--glow-accent (box-shadow value for accent glow)
--gradient-accent (gradient using theme accent colors)

Here are the 9 complete theme definitions to add:

/_ ── DEFAULT: aniket-dark (existing, enhanced) ── _/
:root, [data-theme="aniket-dark"] {
--bg-base: #0b0b0b;
--bg-surface: #111111;
--bg-elevated: #181818;
--bg-overlay: #202020;
--bg-muted: #252525;
--border-default: #2a2a2a;
--border-hover: #383838;
--border-active: #A05EF8;
--text-primary: #f0f0f0;
--text-secondary: #c0c0c0;
--text-muted: #707070;
--text-disabled: #3a3a3a;
--accent: #A05EF8;
--accent-hover: #b985f9;
--accent-muted: rgba(160,94,248,0.18);
--accent-subtle: rgba(160,94,248,0.08);
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;
--info: #228DF2;
--syntax-keyword: #c678dd;
--syntax-string: #98c379;
--syntax-number: #d19a66;
--syntax-property: #61afef;
--syntax-punctuation: #5c6370;
--syntax-class: #e5c07b;
--syntax-variable: #e06c75;
--glow-accent: 0 0 12px rgba(160,94,248,0.5), 0 0 32px rgba(160,94,248,0.15);
--gradient-accent: linear-gradient(135deg, #A05EF8 0%, #228DF2 50%, #A05EF8 100%);
--gradient-mesh: radial-gradient(ellipse at 20% 50%, rgba(160,94,248,0.06) 0%, transparent 60%),
radial-gradient(ellipse at 80% 20%, rgba(34,141,242,0.04) 0%, transparent 60%);
}

/_ ── SYNTHWAVE ── _/
[data-theme="synthwave"] {
--bg-base: #0d0221;
--bg-surface: #150535;
--bg-elevated: #1e0a46;
--bg-overlay: #261258;
--bg-muted: #1a0840;
--border-default: #3d1a6e;
--border-hover: #6b2fa0;
--border-active: #ff6ac1;
--text-primary: #f0e6ff;
--text-secondary: #c8a8e9;
--text-muted: #8b5fbf;
--text-disabled: #4a2870;
--accent: #ff6ac1;
--accent-hover: #ff8fd0;
--accent-muted: rgba(255,106,193,0.2);
--accent-subtle: rgba(255,106,193,0.08);
--success: #72f1b8;
--warning: #fede5d;
--error: #fe4450;
--info: #36f9f6;
--syntax-keyword: #ff6ac1;
--syntax-string: #72f1b8;
--syntax-number: #fede5d;
--syntax-property: #36f9f6;
--syntax-punctuation: #8b5fbf;
--syntax-class: #fe4450;
--syntax-variable: #f97e72;
--glow-accent: 0 0 16px rgba(255,106,193,0.6), 0 0 48px rgba(255,106,193,0.2), 0 0 80px rgba(255,106,193,0.05);
--gradient-accent: linear-gradient(135deg, #ff6ac1 0%, #36f9f6 50%, #ff6ac1 100%);
--gradient-mesh: radial-gradient(ellipse at 30% 40%, rgba(255,106,193,0.1) 0%, transparent 55%),
radial-gradient(ellipse at 70% 60%, rgba(54,249,246,0.07) 0%, transparent 55%);
}

/_ ── DRACULA ── _/
[data-theme="dracula"] {
--bg-base: #181920;
--bg-surface: #21222c;
--bg-elevated: #282a36;
--bg-overlay: #2f3146;
--bg-muted: #343746;
--border-default: #44475a;
--border-hover: #6272a4;
--border-active: #bd93f9;
--text-primary: #f8f8f2;
--text-secondary: #cfcfcf;
--text-muted: #6272a4;
--text-disabled: #44475a;
--accent: #bd93f9;
--accent-hover: #cca8fa;
--accent-muted: rgba(189,147,249,0.18);
--accent-subtle: rgba(189,147,249,0.08);
--success: #50fa7b;
--warning: #f1fa8c;
--error: #ff5555;
--info: #8be9fd;
--syntax-keyword: #ff79c6;
--syntax-string: #f1fa8c;
--syntax-number: #bd93f9;
--syntax-property: #8be9fd;
--syntax-punctuation: #6272a4;
--syntax-class: #ffb86c;
--syntax-variable: #ff5555;
--glow-accent: 0 0 10px rgba(189,147,249,0.5), 0 0 28px rgba(189,147,249,0.18);
--gradient-accent: linear-gradient(135deg, #bd93f9 0%, #ff79c6 50%, #8be9fd 100%);
--gradient-mesh: radial-gradient(ellipse at 25% 35%, rgba(189,147,249,0.07) 0%, transparent 55%),
radial-gradient(ellipse at 75% 65%, rgba(139,233,253,0.05) 0%, transparent 55%);
}

/_ ── LIGHT ── _/
[data-theme="light"] {
--bg-base: #fafafa;
--bg-surface: #f4f4f5;
--bg-elevated: #ffffff;
--bg-overlay: #ffffff;
--bg-muted: #e4e4e7;
--border-default: #d4d4d8;
--border-hover: #a1a1aa;
--border-active: #7c3aed;
--text-primary: #09090b;
--text-secondary: #3f3f46;
--text-muted: #71717a;
--text-disabled: #d4d4d8;
--accent: #7c3aed;
--accent-hover: #6d28d9;
--accent-muted: rgba(124,58,237,0.12);
--accent-subtle: rgba(124,58,237,0.05);
--success: #16a34a;
--warning: #d97706;
--error: #dc2626;
--info: #2563eb;
--syntax-keyword: #7c3aed;
--syntax-string: #16a34a;
--syntax-number: #d97706;
--syntax-property: #2563eb;
--syntax-punctuation: #71717a;
--syntax-class: #b45309;
--syntax-variable: #dc2626;
--glow-accent: 0 0 8px rgba(124,58,237,0.3);
--gradient-accent: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
--gradient-mesh: none;
}

/_ ── ROSE PINE ── _/
[data-theme="rose-pine"] {
--bg-base: #191724;
--bg-surface: #1f1d2e;
--bg-elevated: #26233a;
--bg-overlay: #2a2740;
--bg-muted: #403d52;
--border-default: #403d52;
--border-hover: #524f67;
--border-active: #ebbcba;
--text-primary: #e0def4;
--text-secondary: #c0bdd8;
--text-muted: #908caa;
--text-disabled: #524f67;
--accent: #ebbcba;
--accent-hover: #f0d0ce;
--accent-muted: rgba(235,188,186,0.18);
--accent-subtle: rgba(235,188,186,0.08);
--success: #31748f;
--warning: #f6c177;
--error: #eb6f92;
--info: #9ccfd8;
--syntax-keyword: #31748f;
--syntax-string: #ebbcba;
--syntax-number: #f6c177;
--syntax-property: #9ccfd8;
--syntax-punctuation: #908caa;
--syntax-class: #c4a7e7;
--syntax-variable: #eb6f92;
--glow-accent: 0 0 10px rgba(235,188,186,0.4), 0 0 24px rgba(235,188,186,0.12);
--gradient-accent: linear-gradient(135deg, #ebbcba 0%, #c4a7e7 50%, #9ccfd8 100%);
--gradient-mesh: radial-gradient(ellipse at 50% 50%, rgba(235,188,186,0.05) 0%, transparent 60%);
}

/_ ── TOKYO NIGHT ── _/
[data-theme="tokyo-night"] {
--bg-base: #1a1b26;
--bg-surface: #16161e;
--bg-elevated: #1f2335;
--bg-overlay: #24283b;
--bg-muted: #292e42;
--border-default: #292e42;
--border-hover: #3b4261;
--border-active: #7aa2f7;
--text-primary: #c0caf5;
--text-secondary: #9aa5ce;
--text-muted: #565f89;
--text-disabled: #3b4261;
--accent: #7aa2f7;
--accent-hover: #89b4fa;
--accent-muted: rgba(122,162,247,0.18);
--accent-subtle: rgba(122,162,247,0.08);
--success: #9ece6a;
--warning: #e0af68;
--error: #f7768e;
--info: #2ac3de;
--syntax-keyword: #bb9af7;
--syntax-string: #9ece6a;
--syntax-number: #ff9e64;
--syntax-property: #7dcfff;
--syntax-punctuation: #89ddff;
--syntax-class: #2ac3de;
--syntax-variable: #e0af68;
--glow-accent: 0 0 12px rgba(122,162,247,0.45), 0 0 30px rgba(122,162,247,0.15);
--gradient-accent: linear-gradient(135deg, #7aa2f7 0%, #2ac3de 50%, #bb9af7 100%);
--gradient-mesh: radial-gradient(ellipse at 60% 30%, rgba(122,162,247,0.06) 0%, transparent 55%),
radial-gradient(ellipse at 30% 70%, rgba(42,195,222,0.04) 0%, transparent 55%);
}

/_ ── CATPPUCCIN ── _/
[data-theme="catppuccin"] {
--bg-base: #1e1e2e;
--bg-surface: #181825;
--bg-elevated: #24273a;
--bg-overlay: #313244;
--bg-muted: #302d41;
--border-default: #313244;
--border-hover: #45475a;
--border-active: #cba6f7;
--text-primary: #cdd6f4;
--text-secondary: #bac2de;
--text-muted: #7f849c;
--text-disabled: #45475a;
--accent: #cba6f7;
--accent-hover: #d8b4fe;
--accent-muted: rgba(203,166,247,0.18);
--accent-subtle: rgba(203,166,247,0.08);
--success: #a6e3a1;
--warning: #fab387;
--error: #f38ba8;
--info: #89b4fa;
--syntax-keyword: #cba6f7;
--syntax-string: #a6e3a1;
--syntax-number: #fab387;
--syntax-property: #89b4fa;
--syntax-punctuation: #94e2d5;
--syntax-class: #f9e2af;
--syntax-variable: #f38ba8;
--glow-accent: 0 0 10px rgba(203,166,247,0.5), 0 0 28px rgba(203,166,247,0.15);
--gradient-accent: linear-gradient(135deg, #cba6f7 0%, #89b4fa 50%, #f38ba8 100%);
--gradient-mesh: radial-gradient(ellipse at 40% 60%, rgba(203,166,247,0.06) 0%, transparent 55%);
}

/_ ── NORD ── _/
[data-theme="nord"] {
--bg-base: #242933;
--bg-surface: #2e3440;
--bg-elevated: #3b4252;
--bg-overlay: #434c5e;
--bg-muted: #4c566a;
--border-default: #4c566a;
--border-hover: #5e6d82;
--border-active: #88c0d0;
--text-primary: #eceff4;
--text-secondary: #d8dee9;
--text-muted: #8ea1b5;
--text-disabled: #4c566a;
--accent: #88c0d0;
--accent-hover: #9ecfdf;
--accent-muted: rgba(136,192,208,0.18);
--accent-subtle: rgba(136,192,208,0.08);
--success: #a3be8c;
--warning: #ebcb8b;
--error: #bf616a;
--info: #81a1c1;
--syntax-keyword: #81a1c1;
--syntax-string: #a3be8c;
--syntax-number: #b48ead;
--syntax-property: #88c0d0;
--syntax-punctuation: #8fbcbb;
--syntax-class: #ebcb8b;
--syntax-variable: #bf616a;
--glow-accent: 0 0 10px rgba(136,192,208,0.4), 0 0 26px rgba(136,192,208,0.12);
--gradient-accent: linear-gradient(135deg, #88c0d0 0%, #81a1c1 50%, #8fbcbb 100%);
--gradient-mesh: radial-gradient(ellipse at 50% 50%, rgba(136,192,208,0.05) 0%, transparent 60%);
}

/_ ── GRUVBOX ── _/
[data-theme="gruvbox"] {
--bg-base: #1d2021;
--bg-surface: #282828;
--bg-elevated: #32302f;
--bg-overlay: #3c3836;
--bg-muted: #504945;
--border-default: #3c3836;
--border-hover: #665c54;
--border-active: #fabd2f;
--text-primary: #fbf1c7;
--text-secondary: #ebdbb2;
--text-muted: #bdae93;
--text-disabled: #665c54;
--accent: #fabd2f;
--accent-hover: #ffd35e;
--accent-muted: rgba(250,189,47,0.18);
--accent-subtle: rgba(250,189,47,0.08);
--success: #b8bb26;
--warning: #fe8019;
--error: #fb4934;
--info: #83a598;
--syntax-keyword: #fb4934;
--syntax-string: #b8bb26;
--syntax-number: #d3869b;
--syntax-property: #83a598;
--syntax-punctuation: #fe8019;
--syntax-class: #8ec07c;
--syntax-variable: #fabd2f;
--glow-accent: 0 0 12px rgba(250,189,47,0.5), 0 0 30px rgba(250,189,47,0.15);
--gradient-accent: linear-gradient(135deg, #fabd2f 0%, #fe8019 50%, #fb4934 100%);
--gradient-mesh: radial-gradient(ellipse at 40% 50%, rgba(250,189,47,0.06) 0%, transparent 55%);
}

After defining all 9 themes, update the @theme block in globals.css to add:
--color-glow-accent: var(--glow-accent);
--color-gradient-accent: var(--gradient-accent);

Also update store/useIDEStore.ts ThemeMode type to:
type ThemeMode = "aniket-dark" | "synthwave" | "dracula" | "light" | "rose-pine" | "tokyo-night" | "catppuccin" | "nord" | "gruvbox";

And update toggleTheme to cycle through all 9:
const THEME_CYCLE: ThemeMode[] = ["aniket-dark","synthwave","dracula","light","rose-pine","tokyo-night","catppuccin","nord","gruvbox"];
toggleTheme: () => set((state) => {
const idx = THEME_CYCLE.indexOf(state.theme);
return { theme: THEME_CYCLE[(idx + 1) % THEME_CYCLE.length] };
}),

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3 — ADVANCED ANIMATIONS IN globals.css
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Add ALL of these @keyframes and utility classes:

/_ Text animations _/
@keyframes text-shimmer {
0% { background-position: -200% center; }
100% { background-position: 200% center; }
}
@keyframes char-reveal {
from { opacity: 0; transform: translateY(110%) rotateX(-30deg); filter: blur(4px); }
to { opacity: 1; transform: translateY(0) rotateX(0deg); filter: blur(0); }
}
@keyframes word-slide {
from { opacity: 0; transform: translateX(-20px) skewX(8deg); }
to { opacity: 1; transform: translateX(0) skewX(0deg); }
}
@keyframes glitch {
0%,100% { transform: translate(0); text-shadow: none; }
20% { transform: translate(-2px,1px); text-shadow: 2px 0 var(--info); }
40% { transform: translate(2px,-1px); text-shadow: -2px 0 var(--accent); }
60% { transform: translate(-1px,2px); text-shadow: 1px 0 var(--error); }
80% { transform: translate(1px,-2px); text-shadow: -1px 0 var(--success); }
}
@keyframes typewriter {
from { width: 0; opacity: 0; }
1% { opacity: 1; }
to { width: 100%; opacity: 1; }
}
@keyframes cursor-blink {
0%,100% { border-color: var(--accent); }
50% { border-color: transparent; }
}
@keyframes gradient-shift {
0% { background-position: 0% 50%; }
50% { background-position: 100% 50%; }
100% { background-position: 0% 50%; }
}

/_ UI animations _/
@keyframes float {
0%,100% { transform: translateY(0) rotate(0deg); }
33% { transform: translateY(-8px) rotate(0.4deg); }
66% { transform: translateY(-4px) rotate(-0.4deg); }
}
@keyframes neon-pulse {
0%,100% { box-shadow: var(--glow-accent); }
50% { box-shadow: 0 0 24px rgba(160,94,248,0.7), 0 0 60px rgba(160,94,248,0.25); }
}
@keyframes scan-line {
from { transform: translateY(-100%); }
to { transform: translateY(100vh); }
}
@keyframes shimmer-bg {
from { transform: translateX(-100%); }
to { transform: translateX(200%); }
}
@keyframes orbit {
from { transform: rotate(0deg) translateX(20px) rotate(0deg); }
to { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
}
@keyframes led-blink {
0%,89%,100% { opacity: 1; }
90% { opacity: 0.2; }
}
@keyframes slide-in-left {
from { opacity: 0; transform: translateX(-24px) skewX(4deg); }
to { opacity: 1; transform: translateX(0) skewX(0deg); }
}
@keyframes slide-in-right {
from { opacity: 0; transform: translateX(24px) skewX(-4deg); }
to { opacity: 1; transform: translateX(0) skewX(0deg); }
}
@keyframes reveal-up {
from { opacity: 0; transform: translateY(32px) scaleY(0.95); }
to { opacity: 1; transform: translateY(0) scaleY(1); }
}
@keyframes spin-slow {
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
}
@keyframes counter-up {
from { transform: translateY(100%); opacity: 0; }
to { transform: translateY(0); opacity: 1; }
}

/_ Utility classes using the keyframes _/
.glitch-text { position: relative; animation: glitch 4s infinite; }
.glitch-text::before,.glitch-text::after {
content: attr(data-text); position: absolute; inset: 0;
clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
}
.glitch-text::before { color: var(--info); transform: translate(-2px); animation: glitch 3.8s 0.3s infinite; }
.glitch-text::after { color: var(--accent); transform: translate(2px); animation: glitch 4.2s 0.6s infinite; clip-path: polygon(0 66%, 100% 66%, 100% 100%, 0 100%); }

.gradient-text {
background: var(--gradient-accent);
background-size: 200% auto;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
animation: gradient-shift 4s ease infinite;
}

.shimmer-text {
background: linear-gradient(90deg, var(--text-muted) 0%, var(--text-primary) 40%, var(--accent) 50%, var(--text-primary) 60%, var(--text-muted) 100%);
background-size: 200% auto;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
animation: text-shimmer 3s linear infinite;
}

.typewriter {
overflow: hidden;
white-space: nowrap;
border-right: 2px solid var(--accent);
animation: typewriter 2.5s steps(40, end) both, cursor-blink 0.8s step-end infinite;
}

.neon-glow { box-shadow: var(--glow-accent); }
.neon-border { border-color: var(--accent); box-shadow: var(--glow-accent); }
.float-anim { animation: float 6s ease-in-out infinite; }
.led-dot { animation: led-blink 3s ease-in-out infinite; }
.spin-orbit { animation: spin-slow 8s linear infinite; }

.stagger-reveal > _ {
animation: reveal-up 0.5s cubic-bezier(0.22,1,0.36,1) both;
}
.stagger-reveal > _:nth-child(1) { animation-delay: 0ms; }
.stagger-reveal > _:nth-child(2) { animation-delay: 80ms; }
.stagger-reveal > _:nth-child(3) { animation-delay: 160ms; }
.stagger-reveal > _:nth-child(4) { animation-delay: 240ms; }
.stagger-reveal > _:nth-child(5) { animation-delay: 320ms; }
.stagger-reveal > _:nth-child(6) { animation-delay: 400ms; }
.stagger-reveal > _:nth-child(7) { animation-delay: 480ms; }
.stagger-reveal > \*:nth-child(8) { animation-delay: 560ms; }

@media (prefers-reduced-motion: reduce) {
_, _::before, \*::after {
animation-duration: 0.01ms !important;
animation-iteration-count: 1 !important;
transition-duration: 0.01ms !important;
}
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4 — VANTA.JS BACKGROUND + LENIS SMOOTH SCROLL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create components/ui/VantaBackground.tsx:

"use client";
import { useEffect, useRef } from "react";
import { useIDEStore } from "@/store/useIDEStore";

const DARK_THEMES = ["aniket-dark", "synthwave", "dracula", "rose-pine", "tokyo-night", "catppuccin", "nord", "gruvbox"];

export default function VantaBackground() {
const ref = useRef<HTMLDivElement>(null);
const vantaRef = useRef<any>(null);
const theme = useIDEStore((s) => s.theme);

useEffect(() => {
if (typeof window === "undefined") return;
if (!DARK_THEMES.includes(theme)) { vantaRef.current?.destroy(); vantaRef.current = null; return; }

    let cancelled = false;
    Promise.all([
      import("three"),
      import("vanta/dist/vanta.net.min"),
    ]).then(([THREE, VANTA]) => {
      if (cancelled || !ref.current) return;
      vantaRef.current?.destroy();
      const colors: Record<string, { color: number; backgroundColor: number; }> = {
        "aniket-dark": { color: 0xA05EF8, backgroundColor: 0x0b0b0b },
        "synthwave":   { color: 0xff6ac1, backgroundColor: 0x0d0221 },
        "dracula":     { color: 0xbd93f9, backgroundColor: 0x181920 },
        "rose-pine":   { color: 0xebbcba, backgroundColor: 0x191724 },
        "tokyo-night": { color: 0x7aa2f7, backgroundColor: 0x1a1b26 },
        "catppuccin":  { color: 0xcba6f7, backgroundColor: 0x1e1e2e },
        "nord":        { color: 0x88c0d0, backgroundColor: 0x242933 },
        "gruvbox":     { color: 0xfabd2f, backgroundColor: 0x1d2021 },
      };
      const c = colors[theme] ?? colors["aniket-dark"];
      vantaRef.current = (VANTA as any).default({
        el: ref.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        color: c.color,
        backgroundColor: c.backgroundColor,
        points: 8.0,
        maxDistance: 22.0,
        spacing: 18.0,
        showDots: false,
      });
    });
    return () => { cancelled = true; vantaRef.current?.destroy(); vantaRef.current = null; };

}, [theme]);

return (
<div
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none opacity-30 transition-opacity duration-1000"
      aria-hidden="true"
    />
);
}

Create components/ui/LenisProvider.tsx:

"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider() {
useEffect(() => {
const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
let raf: number;
function animate(time: number) { lenis.raf(time); raf = requestAnimationFrame(animate); }
raf = requestAnimationFrame(animate);
return () => { cancelAnimationFrame(raf); lenis.destroy(); };
}, []);
return null;
}

Add both to AppShell.tsx — VantaBackground as first child (z-0), LenisProvider anywhere.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 5 — @chenglou/pretext TEXT ANIMATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create components/ui/AnimatedText.tsx:

"use client";
import { useEffect, useRef, ReactNode } from "react";
// @chenglou/pretext exports: splitText, animateChars, animateWords, animateLines
import { splitText } from "@chenglou/pretext";
import { useIntersectionObserver } from "react-use";

interface AnimatedTextProps {
children: string;
as?: "h1"|"h2"|"h3"|"h4"|"p"|"span"|"div";
mode?: "chars" | "words" | "lines";
className?: string;
delay?: number;
stagger?: number;
duration?: number;
from?: "bottom" | "top" | "left" | "right" | "fade";
once?: boolean;
"data-text"?: string;
}

export function AnimatedText({
children, as: Tag = "div", mode = "words", className = "",
delay = 0, stagger = 40, duration = 600, from = "bottom", once = true,
}: AnimatedTextProps) {
const ref = useRef<any>(null);
const entry = useIntersectionObserver(ref, { threshold: 0.1 });
const animated = useRef(false);

useEffect(() => {
if (!entry?.isIntersecting) return;
if (once && animated.current) return;
animated.current = true;
if (!ref.current) return;

    const elements = splitText(ref.current, mode);
    const transforms: Record<string, string> = {
      bottom: "translateY(100%) rotateX(-20deg)",
      top:    "translateY(-100%) rotateX(20deg)",
      left:   "translateX(-40px) skewX(8deg)",
      right:  "translateX(40px) skewX(-8deg)",
      fade:   "scale(0.9)",
    };

    elements.forEach((el: HTMLElement, i: number) => {
      el.style.opacity = "0";
      el.style.transform = transforms[from];
      el.style.filter = "blur(4px)";
      el.style.display = "inline-block";
      el.style.overflow = "hidden";
      el.style.transition = `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay + i * stagger}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay + i * stagger}ms, filter ${duration}ms ease ${delay + i * stagger}ms`;
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0) rotateX(0) translateX(0) skewX(0) scale(1)";
        el.style.filter = "blur(0)";
      });
    });

}, [entry?.isIntersecting, mode, delay, stagger, duration, from, once]);

return (
<Tag
ref={ref}
className={`${className} [perspective:800px]`}
style={{ overflow: "hidden" }} >
{children}
</Tag>
);
}

export function GlitchHeading({ children, className = "" }: { children: string; className?: string }) {
return (
<div className={`glitch-text ${className}`} data-text={children}>
{children}
</div>
);
}

export function CounterText({ target, suffix = "", className = "" }: { target: number; suffix?: string; className?: string }) {
const ref = useRef<HTMLSpanElement>(null);
const entry = useIntersectionObserver(ref as any, { threshold: 0.5 });
const counted = useRef(false);

useEffect(() => {
if (!entry?.isIntersecting || counted.current || !ref.current) return;
counted.current = true;
let start = 0;
const end = target;
const duration = 1200;
const step = (timestamp: number, startTime: number) => {
const progress = Math.min((timestamp - startTime) / duration, 1);
const ease = 1 - Math.pow(1 - progress, 3);
if (ref.current) ref.current.textContent = `${Math.floor(ease * end)}${suffix}`;
if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
};
requestAnimationFrame((t) => step(t, t));
}, [entry?.isIntersecting, target, suffix]);

return <span ref={ref} className={className}>0{suffix}</span>;
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 6 — PROJECT TAB: 7 SUB-TABS SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANT: The project detail panel currently has 3 tabs (overview, architecture, changelog).
Expand it to 7 tabs. Update the TabKey type in ProjectData.ts:

export type TabKey = "overview" | "architecture" | "readme" | "insights" | "radar" | "changelog" | "video";

Create each new tab component:

─── TAB: README VIEWER ───
Create: components/projects/ProjectReadme.tsx

"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ProjectShape } from "./ProjectData";
import { SectionLabel } from "./ProjectUI";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectReadme({ project }: { project: ProjectShape }) {
const [content, setContent] = useState<string>("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
const [activeAnchor, setActiveAnchor] = useState("");

useEffect(() => {
const username = "Itinerant18";
const branch = "main";
fetch(`https://raw.githubusercontent.com/${username}/${project.id}/${branch}/README.md`)
.then((r) => r.ok ? r.text() : Promise.reject())
.then((text) => { setContent(text); setLoading(false); })
.catch(() => { setError(true); setLoading(false); });
}, [project.id]);

if (loading) return (
<div className="flex items-center gap-3 py-20 text-[var(--text-muted)]">
<div className="h-4 w-4 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
<span className="font-mono text-[11px] tracking-wider">Fetching README.md...</span>
</div>
);

if (error) return (
<div className="py-20 text-center">
<p className="text-[13px] text-[var(--text-muted)]">No README found for this repository.</p>
</div>
);

return (
<motion.article
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="prose prose-invert max-w-none"
style={{
        "--tw-prose-body": "var(--text-secondary)",
        "--tw-prose-headings": "var(--text-primary)",
        "--tw-prose-code": "var(--accent)",
        "--tw-prose-pre-bg": "var(--bg-elevated)",
      } as React.CSSProperties}
    >
      <SectionLabel label="README.md" />
      <div className="mt-6 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 md:p-10">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="section-heading gradient-text mb-6">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="card-heading text-[var(--text-primary)] mb-4 mt-8 border-b border-[var(--border-default)] pb-2">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-[var(--text-primary)] font-semibold text-[16px] mb-3 mt-6">{children}</h3>
            ),
            code({ inline, className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              if (!inline && match) {
                return (
                  <div className="relative my-4 rounded-sm overflow-hidden border border-[var(--border-default)]">
                    <div className="flex items-center justify-between bg-[var(--bg-muted)] px-4 py-2 border-b border-[var(--border-default)]">
                      <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider">{match[1]}</span>
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"/>
                        <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"/>
                        <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]"/>
                      </div>
                    </div>
                    <SyntaxHighlighter
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ margin: 0, background: "var(--bg-base)", padding: "1.25rem" }} >
{String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                );
              }
              return <code className="mono-text rounded px-1.5 py-0.5 text-[var(--accent)] bg-[var(--accent-subtle)]">{children}</code>;
            },
            img: ({ src, alt }) => (
              <img src={`/api/proxy-image?url=${encodeURIComponent(src || "")}`} alt={alt} className="rounded-sm border border-[var(--border-default)] max-w-full my-4" />
),
a: ({ href, children }) => (
<a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">{children}</a>
),
blockquote: ({ children }) => (
<blockquote className="border-l-4 border-[var(--accent)] bg-[var(--accent-subtle)] pl-4 py-2 my-4 italic text-[var(--text-secondary)] rounded-r-sm">{children}</blockquote>
),
table: ({ children }) => (
<div className="overflow-x-auto my-4">
<table className="w-full text-[12px] border-collapse">{children}</table>
</div>
),
th: ({ children }) => (
<th className="border border-[var(--border-default)] bg-[var(--bg-muted)] px-3 py-2 text-left font-semibold text-[var(--text-primary)]">{children}</th>
),
td: ({ children }) => (
<td className="border border-[var(--border-default)] px-3 py-2 text-[var(--text-secondary)]">{children}</td>
),
}} >
{content}
</ReactMarkdown>
</div>
</motion.article>
);
}

─── TAB: INSIGHTS ───
Create: components/projects/ProjectInsights.tsx

"use client";
import { useEffect, useState } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { ProjectShape } from "./ProjectData";
import { SectionLabel } from "./ProjectUI";
import { CounterText } from "@/components/ui/AnimatedText";

interface GitHubStats {
stars: number;
forks: number;
watchers: number;
openIssues: number;
size: number;
language: string;
pushedAt: string;
createdAt: string;
topics: string[];
}

const LANG_COLORS: Record<string, string> = {
TypeScript: "#3178c6", JavaScript: "#f7df1e", Python: "#3572a5",
Dart: "#54c5f8", HTML: "#e34f26", CSS: "#1572b6", Java: "#b07219",
"C++": "#f34b7d", Rust: "#dea584", Go: "#00add8",
};

function healthScore(stats: GitHubStats): number {
const recencyDays = (Date.now() - new Date(stats.pushedAt).getTime()) / 86400000;
const recency = Math.max(0, 100 - recencyDays _ 0.5);
const activity = Math.min(100, (stats.stars _ 10 + stats.forks _ 20 + stats.watchers _ 5));
return Math.round((recency _ 0.5 + activity _ 0.5));
}

export function ProjectInsights({ project }: { project: ProjectShape }) {
const [stats, setStats] = useState<GitHubStats | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetch(`https://api.github.com/repos/Itinerant18/${project.id}`)
.then((r) => r.json())
.then((d) => {
setStats({
stars: d.stargazers_count ?? 0, forks: d.forks_count ?? 0,
watchers: d.watchers_count ?? 0, openIssues: d.open_issues_count ?? 0,
size: d.size ?? 0, language: d.language ?? "Unknown",
pushedAt: d.pushed_at ?? "", createdAt: d.created_at ?? "",
topics: d.topics ?? [],
});
setLoading(false);
})
.catch(() => setLoading(false));
}, [project.id]);

const techGroups = project.techStack?.slice(0, 5).map((t, i) => ({
subject: t, A: Math.max(30, Math.floor(Math.random() \* 40) + 60),
})) ?? [];

const languageData = [
{ name: project.primaryTech || "TypeScript", value: 70, color: LANG_COLORS[project.primaryTech || "TypeScript"] || "#A05EF8" },
{ name: "Other", value: 30, color: "var(--border-default)" },
];

const score = stats ? healthScore(stats) : 0;

return (
<div className="space-y-10">
<section>
<SectionLabel label="Repository Metrics" />
<div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
{[
{ label: "Stars", value: stats?.stars ?? 0, color: "#fabd2f" },
{ label: "Forks", value: stats?.forks ?? 0, color: "var(--accent)" },
{ label: "Watchers", value: stats?.watchers ?? 0, color: "var(--info)" },
{ label: "Health", value: score, suffix: "%", color: score > 60 ? "var(--success)" : "var(--warning)" },
].map((metric, i) => (
<motion.div
key={metric.label}
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: i * 0.1 }}
className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5"
style={{ borderLeftColor: metric.color, borderLeftWidth: 3 }} >
<div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{metric.label}</div>
<div className="mt-2 text-[28px] font-black font-display" style={{ color: metric.color }}>
<CounterText target={metric.value} suffix={metric.suffix ?? ""} />
</div>
</motion.div>
))}
</div>
</section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <SectionLabel label="Stack Proficiency Radar" />
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <RadarChart data={techGroups}>
                <PolarGrid stroke="var(--border-default)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--text-muted)", fontSize: 10 }} />
                <Radar name="Proficiency" dataKey="A" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <SectionLabel label="Language Breakdown" />
          <div className="mt-4 h-64 flex items-center justify-center">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={languageData} cx="50%" cy="50%" outerRadius={90} dataKey="value" strokeWidth={0}>
                  {languageData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)", borderRadius: 4, color: "var(--text-primary)", fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 justify-center">
            {languageData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-[10px] font-semibold text-[var(--text-muted)]">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionLabel label="Project Health Score" />
        <div className="mt-4 relative h-6 rounded-full bg-[var(--bg-muted)] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: score > 60 ? "var(--success)" : score > 30 ? "var(--warning)" : "var(--error)" }}
          />
          <div className="absolute inset-0 flex items-center px-3">
            <span className="text-[10px] font-bold text-white">{score}/100 — {score > 60 ? "Active" : score > 30 ? "Moderate" : "Dormant"}</span>
          </div>
        </div>
      </section>
    </div>

);
}

─── TAB: VIDEO DEMO ───
Create: components/projects/ProjectVideo.tsx

"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectShape } from "./ProjectData";
import { SectionLabel } from "./ProjectUI";
import { FaPlay, FaPause, FaExpand } from "react-icons/fa6";

export function ProjectVideo({ project }: { project: ProjectShape }) {
const videoSrc = `/videos/${project.id}.mp4`;
const [playing, setPlaying] = useState(false);
const [progress, setProgress] = useState(0);
const [exists, setExists] = useState(true);
const videoRef = useRef<HTMLVideoElement>(null);

const toggle = () => {
if (!videoRef.current) return;
playing ? videoRef.current.pause() : videoRef.current.play();
setPlaying(!playing);
};

if (!exists) {
return (
<div className="py-20 text-center space-y-4">
<div className="text-[var(--text-disabled)] text-[12px] font-mono">// VIDEO_DEMO_NOT_GENERATED</div>
<p className="text-[13px] text-[var(--text-muted)]">
Run <code className="mono-text text-[var(--accent)] bg-[var(--accent-subtle)] px-1.5 py-0.5 rounded">npx create-video@latest</code> to generate a demo for this project.
</p>
<p className="text-[11px] text-[var(--text-disabled)]">Output: /public/videos/{project.id}.mp4</p>
</div>
);
}

return (
<div className="space-y-6">
<SectionLabel label="Project Demo" />
<div className="relative rounded-sm border border-[var(--border-default)] overflow-hidden bg-black group">
<video
ref={videoRef}
src={videoSrc}
className="w-full aspect-video object-cover"
onTimeUpdate={() => {
if (videoRef.current) setProgress((videoRef.current.currentTime / videoRef.current.duration) \* 100);
}}
onEnded={() => setPlaying(false)}
onError={() => setExists(false)}
muted
playsInline
/>
<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
<motion.button
whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
onClick={toggle}
className="h-16 w-16 rounded-full border-2 border-white/30 bg-black/50 backdrop-blur-sm flex items-center justify-center text-white" >
{playing ? <FaPause size={20} /> : <FaPlay size={20} className="ml-1" />}
</motion.button>
</div>
<div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
<motion.div className="h-full bg-[var(--accent)]" style={{ width: `${progress}%` }} />
</div>
</div>
</div>
);
}

─── UPDATE MAIN PROJECT PANEL ───
In whatever component renders the project tabs (likely ProjectDetail or the projects page),
expand the tab bar to show all 7 tabs:

const TABS: { key: TabKey; label: string; icon: string }[] = [
{ key: "overview", label: "Overview", icon: "eye" },
{ key: "readme", label: "README", icon: "book" },
{ key: "architecture", label: "Arch", icon: "cpu" },
{ key: "insights", label: "Insights", icon: "activity" },
{ key: "radar", label: "Stack", icon: "layers" },
{ key: "changelog", label: "Changelog", icon: "history" },
{ key: "video", label: "Demo", icon: "play" },
];

Style the tab bar with:

- Active tab: gradient-text font color + border-bottom: 2px solid var(--accent) + neon-glow box-shadow
- Inactive tab: text-muted, hover: text-secondary
- Scrollable on mobile with no scrollbar: overflow-x-auto scrollbar-hide
- Stagger animate each tab in on mount

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 7 — PROJECT CARD EXTRA FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7.1 — Project Health Score Badge
Add to the project list card (wherever project cards are rendered):

Create utils/projectHealth.ts:
export function calcHealth(project: { updatedAt?: string; techStack: string[]; topics?: string[] }): { score: number; label: string; color: string } {
const days = project.updatedAt ? (Date.now() - new Date(project.updatedAt).getTime()) / 86400000 : 365;
const recency = Math.max(0, 100 - days _ 0.3);
const richness = Math.min(100, (project.techStack.length _ 8 + (project.topics?.length ?? 0) _ 5));
const score = Math.round(recency _ 0.6 + richness \* 0.4);
const label = score > 75 ? "Active" : score > 45 ? "Stable" : "Legacy";
const color = score > 75 ? "var(--success)" : score > 45 ? "var(--warning)" : "var(--text-muted)";
return { score, label, color };
}

Add HealthBadge to each project card:
import { calcHealth } from "@/utils/projectHealth";
const health = calcHealth(project);

<div className="flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-widest" style={{ borderColor: health.color, color: health.color }}>
  <div className="h-1.5 w-1.5 rounded-full led-dot" style={{ background: health.color }} />
  {health.label}
</div>

7.2 — Copy Project Pitch Button
Add to each project card footer:
<button
onClick={() => { navigator.clipboard.writeText(`${project.name}: ${project.shortDescription}`); }}
className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
title="Copy one-liner pitch"

> [ copy pitch ]
> </button>

7.3 — Related Projects sidebar
In the project detail right sidebar, after "Topic Graph", add:
"Related Projects" — find projects with ≥2 matching techStack items.
Sort by matching count descending, show top 3 as small cards with name + primary tech.

7.4 — Dependency Graph
In the Architecture tab, below the schema, add a small animated dependency node tree.
Use a simple SVG-based approach: root node at center, child deps as orbiting nodes.
Animate entry with a spring scale from the root outward.
Data source: parse project.techStack into parent categories (Frontend/Backend/AI/IoT/Cloud) and show as a tree.

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

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 9 — create-video INTEGRATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After running `npx create-video@latest --template blank --name portfolio-video-demo`,
a Remotion project will be created in portfolio-video-demo/.

Create portfolio-video-demo/src/compositions/ProjectDemo.tsx:

import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface Props { projectName: string; techStack: string[]; description: string; }

export const ProjectDemo: React.FC<Props> = ({ projectName, techStack, description }) => {
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
const titleY = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: "clamp" });
const descOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });

return (
<AbsoluteFill style={{ background: "#0b0b0b", fontFamily: "Space Grotesk, sans-serif" }}>
<Sequence from={0} durationInFrames={30}>
<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
<div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, fontSize: 64, fontWeight: 900, color: "#A05EF8", letterSpacing: "-0.03em" }}>
{projectName}
</div>
<div style={{ opacity: descOpacity, fontSize: 18, color: "#c0c0c0", maxWidth: 600, textAlign: "center" }}>
{description}
</div>
<div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", opacity: descOpacity }}>
{techStack.slice(0, 6).map((tech) => (
<div key={tech} style={{ padding: "6px 14px", background: "rgba(160,94,248,0.15)", border: "1px solid rgba(160,94,248,0.4)", borderRadius: 4, color: "#A05EF8", fontSize: 13, fontFamily: "DM Mono, monospace" }}>
{tech}
</div>
))}
</div>
</AbsoluteFill>
</Sequence>
</AbsoluteFill>
);
};

Register it in portfolio-video-demo/src/Root.tsx and add a render script.
Create scripts/generate-videos.ts that loops over projects from data/projects.json
and renders a video for each, saving to public/videos/{id}.mp4.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 10 — PROJECTUI.TSX COMPLETE REWORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Replace SectionLabel:
export function SectionLabel({ label }: { label: string }) {
return (
<div className="flex items-center gap-3 mb-4">
<div className="h-px w-4 bg-[var(--accent)] flex-shrink-0" />
<span className="label-heading gradient-text">{label}</span>
<div className="h-px flex-1 bg-gradient-to-r from-[var(--accent-muted)] to-transparent" />
<span className="led-dot h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
</div>
);
}

Replace FlowDiagram to use animated SVG data stream arrows between hexagon nodes.
Each node pulses with neon-pulse animation.
The connecting paths use animated stroke-dashoffset to create a flowing data stream effect.

Replace TechBadge with the orbital version from Step 3 of the previous plan.

Add these new components:

export function StatBanner({ stats }: { stats: { label: string; value: string | number; color?: string }[] }) {
return (
<div className="grid grid-cols-3 divide-x divide-[var(--border-default)] border border-[var(--border-default)] rounded-sm overflow-hidden bg-[var(--bg-elevated)]">
{stats.map((s, i) => (
<motion.div key={i} className="px-4 py-4 text-center" whileHover={{ backgroundColor: "var(--bg-muted)" }}>
<div className="mono-text text-[22px] font-bold" style={{ color: s.color || "var(--accent)" }}>{s.value}</div>
<div className="label-heading text-[var(--text-muted)] mt-1">{s.label}</div>
</motion.div>
))}
</div>
);
}

export function LiveStatusBar({ message }: { message: string }) {
const phrases = ["SYSTEM ONLINE", "RUNTIME ACTIVE", "REPO SYNCED", "STACK RESOLVED", message.toUpperCase()];
return (
<div className="overflow-hidden border-y border-[var(--border-default)] py-1.5">
<motion.div
animate={{ x: ["0%", "-50%"] }}
transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
className="flex whitespace-nowrap gap-10" >
{[...phrases, ...phrases].map((p, i) => (
<span key={i} className="label-heading text-[var(--accent)] opacity-50 flex items-center gap-3">
<span className="led-dot h-1 w-1 rounded-full inline-block" style={{ background: "var(--accent)" }} />
{p}
</span>
))}
</motion.div>
</div>
);
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 11 — BUG FIXES (non-negotiable)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FIX A — utils/commands.ts: change toggle-theme shortcut from "Ctrl+K" to "Ctrl+Shift+T"
FIX B — AppShell.tsx: replace ALL --bg-main → --bg-base, --border → --border-default, --text → --text-primary, --bg-panel → --bg-surface, --bg-hover → --bg-muted, --accent-soft → --accent-subtle
FIX C — data/content.ts vs outputs/content.ts: sync all Aniket Karmakar data into outputs/content.ts
FIX D — ProjectOverview.tsx gallery: add overflow-hidden and min-h-0 to grid container
FIX E — layout.tsx: update data-theme="aniket-dark" (was "aniket-dark" without full theme token support — now it's complete from Step 2)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXECUTION ORDER + VALIDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Execute in this exact order:
Step 0 (npm installs) → verify package.json
Step 11 (bug fixes first) → run npx tsc --noEmit
Step 1 (fonts + typography) → verify fonts load in browser
Step 2 (9 themes) → cycle themes, verify all 20 tokens per theme
Step 3 (animations) → verify @keyframes compile with no PostCSS errors
Step 4 (Vanta + Lenis) → test WebGL in browser
Step 5 (AnimatedText) → verify @chenglou/pretext splits text correctly
Step 6 (7 project tabs) → verify each tab renders
Step 7 (extra features) → verify health badge + copy pitch
Step 8 (TopBar/Sidebar/Terminal) → verify theme swatches + terminal commands
Step 9 (create-video) → verify Remotion composition compiles
Step 10 (ProjectUI) → verify SectionLabel + FlowDiagram + TechBadge animations

After ALL steps:
run: npm run build
Expected: 0 TypeScript errors, 0 ESLint errors, successful build

HARD CONSTRAINTS:

- All new components: "use client" if they use hooks or browser APIs
- No new npm packages beyond what Step 0 specifies
- All CSS animations wrapped in @media (prefers-reduced-motion: reduce) gate
- TypeScript strict: no `any` — use unknown and type guard, or proper interface
- All font families fall back gracefully: Space Grotesk → Geist Sans → system-ui
- Vanta.js loaded with dynamic import() to avoid SSR crash
- Three.js and Vanta only render on client after hydration
- create-video Remotion project stays in its own subfolder, NOT inside Next.js app/
- Video files go to public/videos/ — referenced as /videos/{id}.mp4
- recharts and react-markdown: only in "use client" components
- All recharts: wrap in <ResponsiveContainer width="100%">
- No inline style with hardcoded colors — use CSS variables everywhere
- Images through /api/proxy-image for GitHub-hosted assets



gemini -p "$(cat GEMINI.md prompts/phase-11-bugfixes.md)"

claude "$(cat GEMINI.md prompts/phase-11-bugfixes.md)"|




My Recommended Execution Order
RunPhaseWhy first1Phase 11 — Bug fixesBroken CSS vars will break everything else2Phase 0 — npm installsPackages needed for all other phases3Phase 2 — 9 ThemesFoundation — everything references these vars4Phase 1 — TypographyFonts used by all components5Phase 3 — AnimationsCSS keyframes needed by Step 106Phase 11 again — VerifyRun npx tsc --noEmit after foundation7Phase 5 — AnimatedTextNew component, isolated8Phase 6 — Project tabsBiggest feature, needs clean foundation9Phase 7 — Extra featuresAdditive to Step 610Phase 4 — VantaVisual polish, isolated11Phase 10 — ProjectUIDepends on animations + fonts12Phase 8 — TopBar/SidebarDepends on theme system13Phase 9 — VideoStandalone Remotion project14npm run buildFinal validation



Verify: run `npx tsc --noEmit` and show me the output before moving on.
If there are errors, fix them before we proceed to the next phase.