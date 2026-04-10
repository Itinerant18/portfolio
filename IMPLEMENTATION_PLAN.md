You are upgrading the Cursor IDE portfolio (Next.js 15, Tailwind v4, Framer Motion 12)
for Aniket Karmakar. This is a VISUAL-ONLY upgrade — no data logic changes.

Implement every section in order. Run `npx tsc --noEmit` after EACH section.
Target: zero TypeScript errors, zero console warnings, zero layout shift.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION A — EXTENDED COLOR SYSTEM (app/globals.css)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Replace the entire :root block with this expanded token set:

:root {
/_ ── ANIKET DARK (default) ── _/
--neutral-0: #0b0b0b;
--neutral-25: #0f0f0f;
--neutral-50: #141414;
--neutral-75: #1a1a1a;
--neutral-100: #1f1f1f;
--neutral-200: #252525;
--neutral-300: #2e2e2e;
--neutral-400: #3a3a3a;
--neutral-500: #6e6e6e;
--neutral-600: #a0a0a0;
--neutral-700: #cccccc;
--neutral-800: #f0f0f0;

/_ ── PRIMARY ACCENT RAMP (violet) ── _/
--violet-50: rgba(160,94,248,0.06);
--violet-100: rgba(160,94,248,0.12);
--violet-200: rgba(160,94,248,0.20);
--violet-300: #8b5cf6;
--violet-400: #A05EF8;
--violet-500: #b785f9;
--violet-600: #c4a0fb;
--violet-glow: 0 0 8px rgba(160,94,248,0.5), 0 0 24px rgba(160,94,248,0.2), 0 0 48px rgba(160,94,248,0.08);
--violet-glow-lg: 0 0 20px rgba(160,94,248,0.7), 0 0 60px rgba(160,94,248,0.3);

/_ ── SECONDARY ACCENT RAMP (cyan/electric blue) ── _/
--cyan-50: rgba(34,211,238,0.06);
--cyan-100: rgba(34,211,238,0.12);
--cyan-200: rgba(34,211,238,0.20);
--cyan-400: #22d3ee;
--cyan-500: #38bdf8;
--cyan-glow: 0 0 8px rgba(34,211,238,0.5), 0 0 24px rgba(34,211,238,0.15);

/_ ── TERTIARY ACCENT (electric green for IoT/status) ── _/
--green-400: #4ade80;
--green-dim: #1a3a28;
--green-glow: 0 0 8px rgba(74,222,128,0.5);

/_ ── SEMANTIC COLORS ── _/
--amber-400: #fbbf24;
--rose-400: #fb7185;
--orange-400: #fb923c;

/_ ── SURFACES ── _/
--bg-base: var(--neutral-0);
--bg-surface: var(--neutral-25);
--bg-elevated: var(--neutral-50);
--bg-overlay: var(--neutral-75);
--bg-muted: var(--neutral-100);
--bg-glass: rgba(255,255,255,0.02);
--bg-glass-hover: rgba(255,255,255,0.04);

/_ ── BORDERS ── _/
--border-default: var(--neutral-200);
--border-hover: var(--neutral-300);
--border-active: var(--accent);
--border-glow: rgba(160,94,248,0.35);

/_ ── TEXT ── _/
--text-primary: #f0f0f0;
--text-secondary: #a0a0a0;
--text-muted: #6e6e6e;
--text-disabled: #3a3a3a;
--text-accent: var(--violet-500);

/_ ── ACCENT ALIASES ── _/
--accent: var(--violet-400);
--accent-hover: var(--violet-500);
--accent-muted: var(--violet-100);
--accent-subtle: var(--violet-50);
--accent-glow: var(--violet-glow);
--info: var(--cyan-400);
--info-glow: var(--cyan-glow);
--success: var(--green-400);
--success-dim: var(--green-dim);
--warning: var(--amber-400);
--danger: var(--rose-400);

/_ ── NOISE/GRAIN ── _/
--noise-opacity: 0.035;
--noise-url: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");

/_ ── TYPOGRAPHY ── _/
--font-sans: var(--font-geist-sans), "Inter", system-ui, sans-serif;
--font-mono: var(--font-geist-mono), "JetBrains Mono", "Fira Code", monospace;
--font-display: var(--font-geist-mono), monospace;

/_ ── TYPE SCALE (Geist Mono based) ── _/
--text-2xs: 9px;
--text-xs: 10px;
--text-sm: 11px;
--text-base: 12px;
--text-md: 13px;
--text-lg: 14px;
--text-xl: 18px;
--text-2xl: 24px;
--text-3xl: 36px;
--text-4xl: 56px;
--text-display: 72px;

--tracking-tighter: -0.05em;
--tracking-tight: -0.03em;
--tracking-normal: 0;
--tracking-wide: 0.08em;
--tracking-wider: 0.15em;
--tracking-widest: 0.25em;
--tracking-ultra: 0.35em;

--leading-none: 1;
--leading-tight: 1.1;
--leading-snug: 1.3;
--leading-normal: 1.5;

/_ ── MOTION ── _/
--dur-instant: 60ms;
--dur-fast: 120ms;
--dur-base: 200ms;
--dur-slow: 400ms;
--dur-slower: 700ms;
--ease-snap: cubic-bezier(0.22, 1, 0.36, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);

/_ ── RADII ── _/
--radius-xs: 2px;
--radius-sm: 3px;
--radius-md: 4px;
--radius-lg: 6px;
--radius-xl: 8px;
--radius-pill: 999px;

/_ ── SHADOWS ── _/
--shadow-sm: 0 2px 8px rgba(0,0,0,0.3);
--shadow-md: 0 8px 24px rgba(0,0,0,0.4);
--shadow-lg: 0 20px 48px rgba(0,0,0,0.5);
--shadow-inner: inset 0 1px 0 rgba(255,255,255,0.04);

/_ ── BRAND COLORS (unchanged) ── _/
--brand-github: var(--text-primary);
--brand-linkedin: #0077b5;
--brand-email: #22d3ee;

/_ ── FILE TYPE COLORS ── _/
--file-ts: #3178c6;
--file-tsx: #61dafb;
--file-js: #f7df1e;
--file-py: #3572a5;
--file-json: #cbcb41;
--file-css: #1572b6;
--file-md: #519aba;
--file-html: #e34f26;

/_ ── SYNTAX ── _/
--syntax-comment: #4a5568;
--syntax-keyword: #c678dd;
--syntax-string: #98c379;
--syntax-number: #d19a66;
--syntax-function: #61afef;
--syntax-class: #e5c07b;
--syntax-property: #e06c75;
--syntax-punctuation: #abb2bf;
--syntax-operator: #56b6c2;
}

/_ ─────────────────────────────────────────
7 ADDITIONAL THEMES — add below existing
───────────────────────────────────────── _/

[data-theme="aurora"] {
--bg-base: #050a14;
--bg-surface: #070d1c;
--bg-elevated: #0a1428;
--bg-overlay: #0d1a32;
--bg-muted: #101e38;
--border-default: #0f2040;
--border-hover: #163060;
--text-primary: #e2f0ff;
--text-secondary: #8ab4e0;
--text-muted: #3d6080;
--accent: #00d4ff;
--accent-hover: #38e8ff;
--accent-muted: rgba(0,212,255,0.12);
--accent-subtle: rgba(0,212,255,0.06);
--accent-glow: 0 0 8px rgba(0,212,255,0.6), 0 0 24px rgba(0,212,255,0.2);
--info: #8b5cf6;
--info-glow: 0 0 8px rgba(139,92,246,0.5);
--success: #ec4899;
--violet-400: #00d4ff;
--cyan-400: #8b5cf6;
}

[data-theme="void"] {
--bg-base: #08060f;
--bg-surface: #0d0a18;
--bg-elevated: #110f1f;
--bg-overlay: #161326;
--bg-muted: #1a1730;
--border-default: #1e1a38;
--border-hover: #2a2550;
--text-primary: #ede9fe;
--text-secondary: #9d8fc4;
--text-muted: #4d4570;
--accent: #a855f7;
--accent-hover: #c084fc;
--accent-muted: rgba(168,85,247,0.14);
--accent-subtle: rgba(168,85,247,0.07);
--accent-glow: 0 0 8px rgba(168,85,247,0.6), 0 0 30px rgba(168,85,247,0.25);
--info: #ec4899;
--success: #6366f1;
--violet-400: #a855f7;
--cyan-400: #ec4899;
}

[data-theme="cyber"] {
--bg-base: #000d0d;
--bg-surface: #001414;
--bg-elevated: #001a1a;
--bg-overlay: #002020;
--bg-muted: #002828;
--border-default: #003333;
--border-hover: #004444;
--text-primary: #ccffee;
--text-secondary: #66ccaa;
--text-muted: #338866;
--accent: #00ff9f;
--accent-hover: #33ffb5;
--accent-muted: rgba(0,255,159,0.12);
--accent-subtle: rgba(0,255,159,0.06);
--accent-glow: 0 0 8px rgba(0,255,159,0.7), 0 0 24px rgba(0,255,159,0.3), 0 0 60px rgba(0,255,159,0.1);
--info: #00ccff;
--success: #00ff9f;
--warning: #ffff00;
--violet-400: #00ff9f;
--cyan-400: #00ccff;
}

[data-theme="sunset"] {
--bg-base: #0d0508;
--bg-surface: #130609;
--bg-elevated: #190810;
--bg-overlay: #1f0a14;
--bg-muted: #260c18;
--border-default: #2d0f1c;
--border-hover: #3d1428;
--text-primary: #ffe4e4;
--text-secondary: #cc9999;
--text-muted: #884444;
--accent: #ff6b6b;
--accent-hover: #ff8888;
--accent-muted: rgba(255,107,107,0.14);
--accent-subtle: rgba(255,107,107,0.07);
--accent-glow: 0 0 8px rgba(255,107,107,0.6), 0 0 24px rgba(255,107,107,0.25);
--info: #ffa07a;
--success: #ffdf00;
--violet-400: #ff6b6b;
--cyan-400: #ffa07a;
}

[data-theme="glacier"] {
--bg-base: #04080d;
--bg-surface: #060c14;
--bg-elevated: #08101c;
--bg-overlay: #0a1424;
--bg-muted: #0d1a2e;
--border-default: #101f36;
--border-hover: #162840;
--text-primary: #e0f2fe;
--text-secondary: #7bb8d8;
--text-muted: #3a6880;
--accent: #38bdf8;
--accent-hover: #60ceff;
--accent-muted: rgba(56,189,248,0.12);
--accent-subtle: rgba(56,189,248,0.06);
--accent-glow: 0 0 8px rgba(56,189,248,0.55), 0 0 24px rgba(56,189,248,0.2);
--info: #818cf8;
--success: #6366f1;
--violet-400: #38bdf8;
--cyan-400: #818cf8;
}

[data-theme="bloom"] {
--bg-base: #0a050d;
--bg-surface: #0f0614;
--bg-elevated: #14081a;
--bg-overlay: #190b20;
--bg-muted: #1e0e28;
--border-default: #240f30;
--border-hover: #30143e;
--text-primary: #fce7f3;
--text-secondary: #d499bb;
--text-muted: #6e3a55;
--accent: #f472b6;
--accent-hover: #f799cc;
--accent-muted: rgba(244,114,182,0.14);
--accent-subtle: rgba(244,114,182,0.07);
--accent-glow: 0 0 8px rgba(244,114,182,0.6), 0 0 24px rgba(244,114,182,0.25);
--info: #c084fc;
--success: #818cf8;
--violet-400: #f472b6;
--cyan-400: #c084fc;
}

/_ Keep existing: rose-pine, tokyo-night, catppuccin, nord, gruvbox, light _/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION B — GEN Z TYPOGRAPHY SYSTEM (app/globals.css continued)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Add these utility classes after the existing @keyframes:

/_ ─── TYPE UTILITIES ─── _/

/_ Variable-weight clash — large bold + thin suffix _/
.type-clash-heavy {
font-family: var(--font-display);
font-size: clamp(28px, 5vw, 48px);
font-weight: 900;
letter-spacing: var(--tracking-tighter);
line-height: var(--leading-none);
color: var(--text-primary);
}
.type-clash-light {
font-family: var(--font-display);
font-size: clamp(28px, 5vw, 48px);
font-weight: 100;
letter-spacing: var(--tracking-wide);
line-height: var(--leading-none);
opacity: 0.35;
}

/_ Oversized label stack _/
.type-oversize-label {
font-family: var(--font-mono);
font-size: var(--text-2xs);
font-weight: 700;
letter-spacing: var(--tracking-ultra);
text-transform: uppercase;
color: var(--text-muted);
}
.type-oversize-value {
font-family: var(--font-display);
font-size: clamp(20px, 3.5vw, 32px);
font-weight: 800;
letter-spacing: var(--tracking-tighter);
line-height: var(--leading-tight);
color: var(--text-primary);
}

/_ Truncated ghost background text _/
.type-ghost-bg {
font-family: var(--font-display);
font-size: clamp(48px, 8vw, 80px);
font-weight: 900;
letter-spacing: var(--tracking-tighter);
line-height: 1;
color: var(--text-primary);
opacity: 0.04;
overflow: hidden;
white-space: nowrap;
pointer-events: none;
user-select: none;
position: absolute;
top: 0; left: 0;
width: 100%;
}

/_ Code badge (inline tech pill) _/
.type-code-badge {
font-family: var(--font-mono);
font-size: var(--text-2xs);
font-weight: 700;
letter-spacing: var(--tracking-wider);
text-transform: uppercase;
padding: 3px 8px;
border-radius: var(--radius-sm);
background: var(--accent-subtle);
color: var(--accent);
border: 1px solid var(--accent-muted);
display: inline-flex;
align-items: center;
gap: 5px;
line-height: 1;
}
.type-code-badge::before {
content: '';
width: 4px; height: 4px;
border-radius: 50%;
background: currentColor;
opacity: 0.7;
flex-shrink: 0;
}

/_ Gradient headline _/
.type-gradient {
font-family: var(--font-display);
font-weight: 800;
letter-spacing: var(--tracking-tighter);
background: linear-gradient(
135deg,
var(--accent) 0%,
var(--info) 40%,
var(--accent-hover) 100%
);
background-size: 200% 200%;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
animation: gradient-shift 4s ease infinite;
}

/_ Mono stat display _/
.type-stat-number {
font-family: var(--font-mono);
font-size: clamp(18px, 3vw, 28px);
font-weight: 700;
letter-spacing: var(--tracking-tight);
color: var(--text-primary);
font-variant-numeric: tabular-nums;
}
.type-stat-label {
font-family: var(--font-mono);
font-size: var(--text-2xs);
font-weight: 700;
letter-spacing: var(--tracking-widest);
text-transform: uppercase;
color: var(--text-muted);
margin-top: 2px;
}

/_ HUD label _/
.type-hud {
font-family: var(--font-mono);
font-size: var(--text-2xs);
font-weight: 700;
letter-spacing: var(--tracking-widest);
text-transform: uppercase;
color: var(--accent);
opacity: 0.8;
}

/_ Section heading — underline accent _/
.type-section {
font-family: var(--font-mono);
font-size: var(--text-sm);
font-weight: 700;
letter-spacing: var(--tracking-wider);
text-transform: uppercase;
color: var(--text-secondary);
position: relative;
padding-bottom: 8px;
}
.type-section::after {
content: '';
position: absolute;
bottom: 0; left: 0;
width: 24px; height: 1px;
background: var(--accent);
box-shadow: var(--accent-glow);
}

/_ Stacked identity block _/
.type-identity {
display: flex;
flex-direction: column;
gap: 2px;
}
.type-identity-name {
font-family: var(--font-display);
font-size: clamp(14px, 2.5vw, 20px);
font-weight: 800;
letter-spacing: var(--tracking-tight);
color: var(--text-primary);
line-height: 1;
}
.type-identity-role {
font-family: var(--font-mono);
font-size: var(--text-xs);
font-weight: 700;
letter-spacing: var(--tracking-wider);
text-transform: uppercase;
color: var(--accent);
}
.type-identity-loc {
font-family: var(--font-mono);
font-size: var(--text-2xs);
font-weight: 400;
letter-spacing: var(--tracking-wide);
color: var(--text-muted);
text-transform: uppercase;
}

/_ Noise grain overlay _/
.noise-overlay::before {
content: '';
position: fixed;
inset: 0;
pointer-events: none;
z-index: 9998;
background-image: var(--noise-url);
background-repeat: repeat;
background-size: 256px 256px;
opacity: var(--noise-opacity);
mix-blend-mode: overlay;
}

/_ Scrollbar neon _/
.neon-scrollbar {
scrollbar-width: thin;
scrollbar-color: rgba(160,94,248,0.25) transparent;
}
.neon-scrollbar::-webkit-scrollbar { width: 3px; height: 3px; }
.neon-scrollbar::-webkit-scrollbar-thumb {
background: var(--accent);
border-radius: var(--radius-pill);
box-shadow: var(--accent-glow);
}
.neon-scrollbar::-webkit-scrollbar-track { background: transparent; }

/_ LED status dot _/
.led-status {
width: 6px; height: 6px;
border-radius: 50%;
background: var(--success);
box-shadow: var(--green-glow);
animation: led-blink 4s ease-in-out infinite;
flex-shrink: 0;
}

/_ Ambient cursor glow (applied to body via JS) _/
.cursor-glow-active::after {
content: '';
position: fixed;
width: 400px; height: 400px;
border-radius: 50%;
background: radial-gradient(circle, var(--accent-subtle) 0%, transparent 70%);
pointer-events: none;
z-index: 9997;
transform: translate(-50%, -50%);
transition: left 0.1s linear, top 0.1s linear;
left: var(--cursor-x, -200px);
top: var(--cursor-y, -200px);
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION C — UPDATE THEME STORE (store/useIDEStore.ts)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

C.1 — Expand ThemeMode type to include all 13 themes:
export type ThemeMode =
| "aniket-dark"
| "aurora"
| "void"
| "cyber"
| "sunset"
| "glacier"
| "bloom"
| "rose-pine"
| "tokyo-night"
| "catppuccin"
| "nord"
| "gruvbox"
| "light";

C.2 — Replace toggleTheme to cycle through all 13:
const THEME_CYCLE: ThemeMode[] = [
"aniket-dark","aurora","void","cyber","sunset","glacier","bloom",
"rose-pine","tokyo-night","catppuccin","nord","gruvbox","light"
];
toggleTheme: () =>
set((state) => {
const idx = THEME_CYCLE.indexOf(state.theme);
return { theme: THEME_CYCLE[(idx + 1) % THEME_CYCLE.length] };
}),

C.3 — Add theme metadata export (new file: data/themes.ts):
Create src/data/themes.ts with:

export interface ThemeMeta {
id: string;
name: string;
accent: string;
bg: string;
surface: string;
description: string;
vibe: string;
}

export const THEME_META: ThemeMeta[] = [
{ id:"aniket-dark", name:"Aniket Dark", accent:"#A05EF8", bg:"#0b0b0b", surface:"#141414", description:"The default. Deep violet on pure black.", vibe:"focused" },
{ id:"aurora", name:"Aurora", accent:"#00d4ff", bg:"#050a14", surface:"#0a1428", description:"Cyan-purple gradient. Night sky energy.", vibe:"electric" },
{ id:"void", name:"Void", accent:"#a855f7", bg:"#08060f", surface:"#110f1f", description:"Deep purple. Minimal. Cosmic.", vibe:"calm" },
{ id:"cyber", name:"Cyber", accent:"#00ff9f", bg:"#000d0d", surface:"#001a1a", description:"Neon green on pitch black. Hacker mode.", vibe:"intense" },
{ id:"sunset", name:"Sunset", accent:"#ff6b6b", bg:"#0d0508", surface:"#190810", description:"Warm coral red. Late evening warmth.", vibe:"warm" },
{ id:"glacier", name:"Glacier", accent:"#38bdf8", bg:"#04080d", surface:"#08101c", description:"Sky blue. Clean. Arctic clarity.", vibe:"cool" },
{ id:"bloom", name:"Bloom", accent:"#f472b6", bg:"#0a050d", surface:"#14081a", description:"Hot pink. Bold. Unapologetically Y2K.", vibe:"bold" },
{ id:"rose-pine", name:"Rosé Pine", accent:"#ebbcba", bg:"#191724", surface:"#1f1d2e", description:"Muted rose. Aesthetic. Cottagecore IDE.", vibe:"soft" },
{ id:"tokyo-night", name:"Tokyo Night", accent:"#7aa2f7", bg:"#1a1b26", surface:"#16161e", description:"Classic blue-purple. Proven favorite.", vibe:"classic" },
{ id:"catppuccin", name:"Catppuccin", accent:"#cba6f7", bg:"#1e1e2e", surface:"#181825", description:"Mocha palette. Pastel perfection.", vibe:"pastel" },
{ id:"nord", name:"Nord", accent:"#88c0d0", bg:"#2e3440", surface:"#3b4252", description:"Scandinavian. Clean. Professional.", vibe:"neutral" },
{ id:"gruvbox", name:"Gruvbox", accent:"#fabd2f", bg:"#282828", surface:"#1d2021", description:"Retro amber. Warm and earthy.", vibe:"retro" },
{ id:"light", name:"Light", accent:"#A05EF8", bg:"#ffffff", surface:"#f3f3f3", description:"Bright mode. High contrast.", vibe:"minimal" },
];

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION D — THEME SWITCHER PANEL (new component)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create: components/ui/ThemeSwitcher.tsx

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useIDEStore } from "@/store/useIDEStore";
import { THEME_META } from "@/data/themes";
import { useState } from "react";

export default function ThemeSwitcher() {
const { theme, setTheme } = useIDEStore();
const [hovered, setHovered] = useState<string | null>(null);

function handleThemeChange(id: string) {
// Flash transition
const flash = document.createElement("div");
Object.assign(flash.style, {
position: "fixed", inset: "0", background: "rgba(255,255,255,0.06)",
zIndex: "99999", pointerEvents: "none", transition: "opacity 300ms ease"
});
document.body.appendChild(flash);
requestAnimationFrame(() => {
flash.style.opacity = "0";
setTimeout(() => flash.remove(), 320);
});
setTheme(id as any);
}

return (
<div style={{ padding: "12px", borderBottom: "1px solid var(--border-default)" }}>
{/_ Section label _/}
<div style={{
        fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: "var(--text-muted)", marginBottom: "10px",
        display: "flex", alignItems: "center", gap: "8px"
      }}>
<span style={{ width: "16px", height: "1px", background: "var(--accent)", display: "inline-block" }} />
THEME
<span style={{ flex: 1, height: "1px", background: "var(--border-default)", display: "inline-block" }} />
</div>

      {/* Grid of swatches */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "8px"
      }}>
        {THEME_META.map((t) => (
          <motion.button
            key={t.id}
            type="button"
            title={t.name}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleThemeChange(t.id)}
            onHoverStart={() => setHovered(t.id)}
            onHoverEnd={() => setHovered(null)}
            style={{
              height: "28px", borderRadius: "4px",
              background: t.accent,
              border: theme === t.id
                ? `2px solid ${t.accent}`
                : "2px solid transparent",
              outline: theme === t.id ? `1px solid rgba(255,255,255,0.3)` : "none",
              outlineOffset: "2px",
              cursor: "pointer",
              boxShadow: theme === t.id
                ? `0 0 10px ${t.accent}66, 0 0 20px ${t.accent}33`
                : "none",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Inner darker center */}
            <div style={{
              position: "absolute", inset: "4px", borderRadius: "2px",
              background: t.bg, opacity: 0.6
            }} />
          </motion.button>
        ))}
      </div>

      {/* Active theme info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={hovered || theme}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <div style={{
            width: "8px", height: "8px", borderRadius: "2px",
            background: THEME_META.find(t => t.id === (hovered || theme))?.accent ?? "var(--accent)",
            boxShadow: `0 0 6px ${THEME_META.find(t => t.id === (hovered || theme))?.accent ?? "var(--accent)"}88`
          }} />
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700,
            color: "var(--text-secondary)", letterSpacing: "0.05em"
          }}>
            {THEME_META.find(t => t.id === (hovered || theme))?.name}
          </span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "9px",
            color: "var(--text-muted)", letterSpacing: "0.05em",
            textTransform: "uppercase"
          }}>
            · {THEME_META.find(t => t.id === (hovered || theme))?.vibe}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>

);
}

Wire ThemeSwitcher into the top of FileExplorer.tsx (add as first child inside the outer div,
above the EXPLORER header row). Import it at the top.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION E — AMBIENT CURSOR ORB (components/ui/CursorOrb.tsx)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create: components/ui/CursorOrb.tsx

"use client";
import { useEffect, useRef } from "react";
import { useIDEStore } from "@/store/useIDEStore";

export default function CursorOrb() {
const orbRef = useRef<HTMLDivElement>(null);
const theme = useIDEStore((s) => s.theme);

// Disable for light theme and reduced motion
const disabled = theme === "light";

useEffect(() => {
if (disabled) return;
const orb = orbRef.current;
if (!orb) return;

    let raf = 0;
    let tx = -400, ty = -400;
    let cx = -400, cy = -400;

    function move(e: MouseEvent) { tx = e.clientX; ty = e.clientY; }
    function loop() {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      orb.style.left = `${cx}px`;
      orb.style.top = `${cy}px`;
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };

}, [disabled]);

if (disabled) return null;

return (
<div
ref={orbRef}
aria-hidden
style={{
        position: "fixed",
        width: "500px", height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, var(--accent-subtle) 0%, transparent 65%)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 0,
        transition: "opacity 0.5s ease",
      }}
/>
);
}

Add <CursorOrb /> to AppShell.tsx — place it as the very first child inside the <>
fragment, before the grid div. Import it.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION F — STATS COUNTER BAR (new component)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create: components/ui/StatsBar.tsx

"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Stat { label: string; value: number; suffix?: string; prefix?: string; }

const STATS: Stat[] = [
{ label: "repos", value: 36 },
{ label: "languages", value: 7 },
{ label: "projects shipped", value: 11 },
{ label: "stars", value: 14 },
{ label: "commits", value: 340, suffix: "+" },
{ label: "years coding", value: 3, suffix: "+" },
];

function useCountUp(target: number, duration = 1200) {
const [count, setCount] = useState(0);
const started = useRef(false);

function start() {
if (started.current) return;
started.current = true;
const startTime = Date.now();
const step = () => {
const elapsed = Date.now() - startTime;
const progress = Math.min(elapsed / duration, 1);
const eased = 1 - Math.pow(1 - progress, 3);
setCount(Math.round(eased \* target));
if (progress < 1) requestAnimationFrame(step);
};
requestAnimationFrame(step);
}

return { count, start };
}

function StatItem({ stat, delay }: { stat: Stat; delay: number }) {
const { count, start } = useCountUp(stat.value, 1000 + delay \* 100);

return (
<motion.div
initial={{ opacity: 0, y: 12 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: delay * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
onViewportEnter={start}
style={{
        display: "flex", flexDirection: "column", gap: "2px",
        padding: "10px 16px",
        borderRight: "1px solid var(--border-default)",
        flexShrink: 0,
      }} >
<div style={{
        fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: 800,
        letterSpacing: "-0.03em", color: "var(--text-primary)",
        fontVariantNumeric: "tabular-nums",
        lineHeight: 1,
      }}>
{stat.prefix ?? ""}{count}{stat.suffix ?? ""}
</div>
<div style={{
        fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase",
        color: "var(--text-muted)",
      }}>
{stat.label}
</div>
</motion.div>
);
}

export default function StatsBar() {
return (
<div style={{
      display: "flex", overflowX: "auto", overflowY: "hidden",
      borderBottom: "1px solid var(--border-default)",
      scrollbarWidth: "none",
    }}>
<style>{`.stats-bar::-webkit-scrollbar{display:none}`}</style>
<div className="stats-bar" style={{ display: "flex", alignItems: "stretch" }}>
{STATS.map((s, i) => <StatItem key={s.label} stat={s} delay={i} />)}
</div>
{/_ Live badge _/}
<div style={{
        marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px",
        padding: "0 16px", flexShrink: 0,
        borderLeft: "1px solid var(--border-default)",
      }}>
<div style={{
          width: "5px", height: "5px", borderRadius: "50%",
          background: "var(--success)",
          boxShadow: "var(--green-glow)",
          animation: "led-blink 3s ease-in-out infinite",
        }} />
<span style={{
          fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700,
          letterSpacing: "0.15em", textTransform: "uppercase",
          color: "var(--text-muted)",
        }}>LIVE</span>
</div>
</div>
);
}

Add StatsBar to CodeEditor.tsx or the main editor panel — place it below the EditorTabs
and above the main content area. Import it. If CodeEditor.tsx doesn't exist,
add it to the top of the main <main> element in AppShell.tsx.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION G — NOISE GRAIN LAYER (app/layout.tsx)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

G.1 — Add the noise overlay SVG as an inline element in layout.tsx.
Inside <body>, before <AppShell>, add:

  <div
    aria-hidden="true"
    style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 9998,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
      backgroundSize: "256px 256px",
      opacity: 0.03,
      mixBlendMode: "overlay",
    }}
  />

G.2 — Add noise-overlay class to html element in layout.tsx for CSS approach.
Change:
<html lang="en" data-theme="aniket-dark" ...>
To:
<html lang="en" data-theme="aniket-dark" className={`${GeistSans.variable} ${GeistMono.variable} noise-overlay`}>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION H — SKILL RADAR CHART (components/ui/SkillRadar.tsx)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create: components/ui/SkillRadar.tsx

"use client";
import { motion } from "framer-motion";

interface Skill { label: string; value: number; color: string; }

const SKILLS: Skill[] = [
{ label: "Frontend", value: 88, color: "#A05EF8" },
{ label: "Backend", value: 72, color: "#228DF2" },
{ label: "AI / ML", value: 76, color: "#c084fc" },
{ label: "IoT", value: 80, color: "#4ade80" },
{ label: "Mobile", value: 70, color: "#fbbf24" },
{ label: "Cloud", value: 65, color: "#38bdf8" },
];

function polarToXY(angle: number, r: number, cx: number, cy: number) {
const rad = (angle - 90) _ (Math.PI / 180);
return { x: cx + r _ Math.cos(rad), y: cy + r \* Math.sin(rad) };
}

export default function SkillRadar({ size = 200 }: { size?: number }) {
const cx = size / 2, cy = size / 2;
const maxR = size \* 0.38;
const n = SKILLS.length;

// Grid rings
const rings = [0.25, 0.5, 0.75, 1];
const axes = SKILLS.map((\_, i) => polarToXY((360 / n) \* i, maxR, cx, cy));

// Skill polygon points
const skillPoints = SKILLS.map((s, i) => {
const r = (s.value / 100) _ maxR;
return polarToXY((360 / n) _ i, r, cx, cy);
});

const polyStr = skillPoints.map(p => `${p.x},${p.y}`).join(" ");

return (
<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
{/_ Grid rings _/}
{rings.map((r, i) => (
<polygon
key={i}
points={SKILLS.map((\_, si) => {
const pt = polarToXY((360 / n) _ si, maxR _ r, cx, cy);
return `${pt.x},${pt.y}`;
}).join(" ")}
fill="none"
stroke="var(--border-default)"
strokeWidth="0.5"
opacity={0.6}
/>
))}

        {/* Axis lines */}
        {axes.map((pt, i) => (
          <line
            key={i}
            x1={cx} y1={cy} x2={pt.x} y2={pt.y}
            stroke="var(--border-default)" strokeWidth="0.5" opacity={0.4}
          />
        ))}

        {/* Skill area */}
        <motion.polygon
          points={polyStr}
          fill="var(--accent)"
          fillOpacity={0.12}
          stroke="var(--accent)"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Skill dots + labels */}
        {skillPoints.map((pt, i) => {
          const ax = axes[i];
          const labelPt = polarToXY((360 / n) * i, maxR + 14, cx, cy);
          return (
            <g key={i}>
              <motion.circle
                cx={pt.x} cy={pt.y} r={3}
                fill={SKILLS[i].color}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                style={{ transformOrigin: `${pt.x}px ${pt.y}px`, filter: `drop-shadow(0 0 4px ${SKILLS[i].color})` }}
              />
              <text
                x={labelPt.x} y={labelPt.y}
                textAnchor="middle" dominantBaseline="central"
                style={{
                  fontFamily: "var(--font-mono)", fontSize: "8px", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  fill: "var(--text-muted)",
                }}
              >
                {SKILLS[i].label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
        {SKILLS.map(s => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "1px", background: s.color }} />
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "9px",
              color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase"
            }}>
              {s.label} {s.value}%
            </span>
          </div>
        ))}
      </div>
    </div>

);
}

Add SkillRadar to the SidebarAI.tsx below the agents section,
wrapped in a collapsible section with a toggle button labeled "SKILL MATRIX".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION I — LIVE ACTIVITY FEED (components/ui/ActivityFeed.tsx)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create: components/ui/ActivityFeed.tsx

"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FEED_ITEMS = [
{ type: "push", repo: "portfolio", time: "2m ago", msg: "feat: add theme switcher panel" },
{ type: "create", repo: "Swacth360_bot", time: "1h ago", msg: "chore: update RAG pipeline config" },
{ type: "push", repo: "FAS-Control", time: "3h ago", msg: "fix: QR decode edge case on Android" },
{ type: "star", repo: "ml-predicter", time: "5h ago", msg: "Repository starred" },
{ type: "push", repo: "SWatch360", time: "1d ago", msg: "feat: ThingsBoard dashboard integration" },
{ type: "create", repo: "portfolio", time: "2d ago", msg: "Initial commit — cursor IDE theme" },
];

const TYPE_COLOR: Record<string, string> = {
push: "var(--accent)", create: "var(--success)", star: "var(--warning)", merge: "var(--info)"
};
const TYPE_ICON: Record<string, string> = {
push: "↑", create: "+", star: "★", merge: "⌥"
};

export default function ActivityFeed() {
const [visible, setVisible] = useState(3);

return (
<div style={{ padding: "12px", borderTop: "1px solid var(--border-default)" }}>
<div style={{
        fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: "var(--text-muted)", marginBottom: "8px",
        display: "flex", alignItems: "center", gap: "8px"
      }}>
<div style={{
          width: "5px", height: "5px", borderRadius: "50%",
          background: "var(--success)", boxShadow: "var(--green-glow)",
          animation: "led-blink 3s ease-in-out infinite",
          flexShrink: 0,
        }} />
ACTIVITY
</div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <AnimatePresence>
          {FEED_ITEMS.slice(0, visible).map((item, i) => (
            <motion.div
              key={item.msg}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
              style={{
                display: "grid",
                gridTemplateColumns: "16px 1fr auto",
                gap: "6px",
                padding: "5px 6px",
                borderRadius: "3px",
                alignItems: "flex-start",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              whileHover={{ backgroundColor: "var(--bg-muted)" }}
            >
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700,
                color: TYPE_COLOR[item.type] ?? "var(--accent)",
                lineHeight: 1.4, textAlign: "center",
              }}>
                {TYPE_ICON[item.type]}
              </span>
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700,
                  color: "var(--text-secondary)", letterSpacing: "0.02em",
                  marginBottom: "1px", lineHeight: 1.3,
                }}>
                  {item.repo}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "9px",
                  color: "var(--text-muted)", lineHeight: 1.4,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {item.msg}
                </div>
              </div>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "9px",
                color: "var(--text-disabled)", flexShrink: 0, lineHeight: 1.4,
              }}>
                {item.time}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visible < FEED_ITEMS.length && (
        <button
          type="button"
          onClick={() => setVisible(FEED_ITEMS.length)}
          style={{
            marginTop: "6px", width: "100%", padding: "4px",
            fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "var(--text-muted)", background: "none", border: "none",
            borderTop: "1px solid var(--border-default)", cursor: "pointer",
            transition: "color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          show {FEED_ITEMS.length - visible} more
        </button>
      )}
    </div>

);
}

Add <ActivityFeed /> inside SidebarAI.tsx below the chat session area.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION J — FOCUS MODE (store/useIDEStore.ts + AppShell)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

J.1 — Add focusMode to IDEState in store/useIDEStore.ts:
focusMode: boolean;
toggleFocusMode: () => void;

In the create block:
focusMode: false,
toggleFocusMode: () => set((state) => ({ focusMode: !state.focusMode })),

J.2 — Add keyboard shortcut in AppShell.tsx:
Pull toggleFocusMode from store.
In handleKeyDown:
if (isModifier && event.shiftKey && event.key.toLowerCase() === "f") {
event.preventDefault();
toggleFocusMode();
}

J.3 — Apply focus mode to AppShell grid:
Pull focusMode from store.
Add to the main grid div:
style={{
...existing styles,
"--sidebar-opacity": focusMode ? "0.15" : "1",
"--sidebar-pointer": focusMode ? "none" : "auto",
} as React.CSSProperties}

Add to the two aside elements:
style={{ opacity: "var(--sidebar-opacity)", pointerEvents: "var(--sidebar-pointer)" as any, transition: "opacity 400ms ease" }}

J.4 — Add focus mode toggle to TopBar as a small button:
<IconButton title="Focus mode (Ctrl+Shift+F)" onClick={toggleFocusMode} active={focusMode}>
{/_ Diamond icon _/}
<svg width="14" height="14" viewBox="0 0 24 24" fill={focusMode ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
<polygon points="12 2 22 12 12 22 2 12"/>
</svg>
</IconButton>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION K — TOPBAR IDENTITY UPGRADE (components/TopBar.tsx)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Replace the center title div with a full identity block:

<div style={{
  position: "absolute", left: "50%", transform: "translateX(-50%)",
  display: "flex", alignItems: "center", gap: "8px", pointerEvents: "none"
}}>
  {/* Ghost text behind */}
  <div style={{ position: "relative" }}>
    {/* Accent dot */}
    <span style={{
      width: "5px", height: "5px", borderRadius: "50%",
      background: "var(--accent)",
      boxShadow: "var(--accent-glow)",
      display: "inline-block",
      animation: "led-blink 4s ease-in-out infinite",
      flexShrink: 0,
    }} />
  </div>
  {/* Name + role */}
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0px" }}>
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 800,
      letterSpacing: "-0.02em", color: "var(--text-primary)", lineHeight: 1,
    }}>
      ANIKET KARMAKAR
    </span>
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: "8px", fontWeight: 700,
      letterSpacing: "0.15em", textTransform: "uppercase",
      color: "var(--accent)", lineHeight: 1, opacity: 0.8,
    }}>
      R&amp;D · SEPLE · Bengaluru
    </span>
  </div>
</div>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION L — ACCESSIBILITY + MOTION SAFETY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Add to app/globals.css AFTER all other rules:

@media (prefers-reduced-motion: reduce) {
_, _::before, \*::after {
animation-duration: 0.01ms !important;
animation-iteration-count: 1 !important;
transition-duration: 0.01ms !important;
}
.cursor-glow-active::after { display: none; }
.noise-overlay::before { display: none; }
}

@media (prefers-contrast: high) {
:root {
--accent-muted: rgba(160, 94, 248, 0.3);
--accent-subtle: rgba(160, 94, 248, 0.15);
--border-default: #444444;
--text-muted: #999999;
}
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FINAL CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After all sections:

[ ] npx tsc --noEmit → 0 errors
[ ] npm run build → succeeds
[ ] npm run dev → open in browser

Visual checks:
[ ] All 13 themes switch correctly via Ctrl+Shift+T cycling
[ ] ThemeSwitcher panel shows 13 swatches, active one glows
[ ] CursorOrb follows mouse smoothly (not jerky)
[ ] StatsBar counter animates on first scroll into view
[ ] ActivityFeed shows in SidebarAI with live dot
[ ] SkillRadar animates in SidebarAI
[ ] Focus mode dims sidebars on Ctrl+Shift+F
[ ] Noise grain is barely visible (0.03 opacity)
[ ] No layout shift on theme change
[ ] No text clipping in TopBar identity block on narrow screens
[ ] Mobile: test at 375px width — all panels accessible

Performance:
[ ] No CSS animations running on non-visible elements
[ ] CursorOrb uses requestAnimationFrame (not setInterval)
[ ] StatsBar counter uses rAF, not setInterval
[ ] Noise layer uses CSS background-image (SVG data URI), not canvas

CONSTRAINTS (do not violate):

- Zero new npm packages
- All components are "use client" if they use hooks
- TypeScript strict mode — no `any`
- Framer Motion only for complex animations (CSS for simple ones)
- Canvas only for ParticleField (from previous prompt)
- prefers-reduced-motion must disable all animations
