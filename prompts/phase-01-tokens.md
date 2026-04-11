You are upgrading a Next.js 15 Cursor IDE portfolio for Aniket Karmakar.
The attached DESIGN.md is your single source of truth for all design decisions.
Do not invent values — use exact hex, oklab, and spacing values from DESIGN.md.

TASK: Rewrite the entire CSS custom properties block in app/globals.css.

RULES:

1. Keep ALL existing dark-theme semantic vars (--bg-base, --accent, etc.) intact.
   They are used by 9 dark themes (aniket-dark, synthwave, dracula, etc.).
   Do NOT remove or rename them.

2. ADD a new design-system layer of variables inside :root that maps the
   DESIGN.md values as a parallel system for typography, spacing, borders,
   and component primitives. These are additive — they do not replace dark-theme vars.

ADD THIS BLOCK inside :root in globals.css:

/_ ── DESIGN.md: Cursor Warm Design System ──────────────────────── _/

/_ Colors _/
--cursor-dark: #26251e;
--cursor-cream: #f2f1ed;
--cursor-light: #e6e5e0;
--cursor-white: #ffffff;
--cursor-black: #000000;
--cursor-orange: #f54e00;
--cursor-gold: #c08532;
--cursor-error: #cf2d56;
--cursor-success: #1f8a65;

/_ Timeline semantic colors _/
--cursor-thinking: #dfa88f;
--cursor-grep: #9fc9a2;
--cursor-read: #9fbbe0;
--cursor-edit: #c0a8dd;

/_ Surface scale _/
--surface-100: #f7f7f4;
--surface-200: #f2f1ed;
--surface-300: #ebeae5;
--surface-400: #e6e5e0;
--surface-500: #e1e0db;

/_ Border scale (oklab with rgba fallback) _/
--border-10: rgba(38, 37, 30, 0.10);
--border-20: rgba(38, 37, 30, 0.20);
--border-55: rgba(38, 37, 30, 0.55);
--border-60: rgba(38, 37, 30, 0.60);
--border-90: rgba(38, 37, 30, 0.90);
--border-solid: #26251e;
--border-light: #f2f1ed;
/_ oklab versions for browsers that support it _/
@supports (color: oklab(0 0 0)) {
--border-10: oklab(0.263084 -0.00230259 0.0124794 / 0.10);
--border-20: oklab(0.263084 -0.00230259 0.0124794 / 0.20);
--border-55: oklab(0.263084 -0.00230259 0.0124794 / 0.55);
}

/_ Elevation / Shadow scale _/
--shadow-ambient: rgba(0,0,0,0.02) 0px 0px 16px, rgba(0,0,0,0.008) 0px 0px 8px;
--shadow-card: rgba(0,0,0,0.14) 0px 28px 70px, rgba(0,0,0,0.1) 0px 14px 32px, var(--border-10) 0px 0px 0px 1px;
--shadow-focus: rgba(0,0,0,0.1) 0px 4px 12px;
--shadow-ring-10: var(--border-10) 0px 0px 0px 1px;
--shadow-ring-20: var(--border-20) 0px 0px 0px 1px;

/_ Border Radius scale (from DESIGN.md Section 5) _/
--radius-micro: 1.5px;
--radius-small: 2px;
--radius-medium: 3px;
--radius-standard: 4px;
--radius-comfortable: 8px;
--radius-featured: 10px;
--radius-pill: 9999px;

/_ Spacing (8px base + sub-8px fine scale) _/
--space-1: 1.5px;
--space-2: 2px;
--space-3: 2.5px;
--space-4: 3px;
--space-5: 4px;
--space-6: 5px;
--space-7: 6px;
--space-8: 8px;
--space-10: 10px;
--space-12: 12px;
--space-14: 14px;
--space-16: 16px;
--space-24: 24px;
--space-32: 32px;
--space-48: 48px;
--space-64: 64px;
--space-80: 80px;
--space-96: 96px;
--space-120: 120px;

/_ Font families (DESIGN.md Section 3) _/
--font-display: "CursorGothic", "CursorGothic Fallback", "Space Grotesk", system-ui, "Helvetica Neue", Helvetica, Arial;
--font-serif: "jjannon", "Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, ui-serif, Georgia, Cambria, "Times New Roman", Times;
--font-code: "berkeleyMono", "DM Mono", ui-monospace, "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New";
--font-system: system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial;

/_ Letter-spacing scale (DESIGN.md: tracking scales with font size) _/
--tracking-72: -2.16px;
--tracking-36: -0.72px;
--tracking-26: -0.325px;
--tracking-22: -0.11px;
--tracking-16: 0.08px;
--tracking-14-caption: 0.14px;
--tracking-11-micro: 0.048px;
--tracking-mono-sm: -0.275px;

/_ Type scale (DESIGN.md Section 3 Hierarchy table) _/
--type-hero: 4.50rem; /_ 72px _/
--type-section: 2.25rem; /_ 36px _/
--type-sub: 1.63rem; /_ 26px _/
--type-title-sm: 1.38rem; /_ 22px _/
--type-body-lg: 1.20rem; /_ 19.2px _/
--type-body: 1.08rem; /_ 17.28px _/
--type-ui: 1.00rem; /_ 16px _/
--type-btn: 0.88rem; /_ 14px _/
--type-caption: 0.69rem; /_ 11px _/
--type-system: 1.25rem; /_ 20px _/
--type-sys-cap: 0.81rem; /_ 13px _/
--type-sys-micro:0.69rem; /_ 11px _/
--type-mono: 0.75rem; /_ 12px _/
--type-mono-sm: 0.69rem; /_ 11px _/

/_ Line heights _/
--lh-display: 1.10;
--lh-section: 1.20;
--lh-sub: 1.25;
--lh-title: 1.30;
--lh-body-lg: 1.50;
--lh-body: 1.35;
--lh-ui: 1.50;
--lh-btn: 1.00;
--lh-caption: 1.50;
--lh-sys: 1.55;
--lh-sys-cap: 1.33;
--lh-mono: 1.67;
--lh-mono-sm: 1.33;

/_ Transition speeds (DESIGN.md Section 7) _/
--transition-color: color 150ms ease, background-color 150ms ease;
--transition-shadow: box-shadow 200ms ease;
--transition-all: all 150ms ease;

/_ Breakpoints as custom properties for JS reference _/
--bp-mobile: 600px;
--bp-tablet-sm: 768px;
--bp-tablet: 900px;
--bp-desktop-sm: 1279px;
--bp-desktop: 1440px;
--content-max: 1200px;

/_ ── END DESIGN.md tokens ─────────────────────────────────────── _/

ALSO ADD a [data-theme="cursor-warm"] theme block that is a fully light/warm theme
derived from DESIGN.md for users who want the Cursor website aesthetic:

[data-theme="cursor-warm"] {
--bg-base: #f2f1ed;
--bg-surface: #ebeae5;
--bg-elevated: #ffffff;
--bg-overlay: #f7f7f4;
--bg-muted: #e6e5e0;
--border-default: rgba(38, 37, 30, 0.10);
--border-hover: rgba(38, 37, 30, 0.20);
--border-active: #f54e00;
--text-primary: #26251e;
--text-secondary: rgba(38, 37, 30, 0.55);
--text-muted: rgba(38, 37, 30, 0.40);
--text-disabled: rgba(38, 37, 30, 0.25);
--accent: #f54e00;
--accent-hover: #cf2d56;
--accent-muted: rgba(245, 78, 0, 0.12);
--accent-subtle: rgba(245, 78, 0, 0.06);
--success: #1f8a65;
--warning: #c08532;
--error: #cf2d56;
--info: #9fbbe0;
--syntax-keyword: #cf2d56;
--syntax-string: #1f8a65;
--syntax-number: #c08532;
--syntax-property: #f54e00;
--syntax-punctuation: rgba(38, 37, 30, 0.40);
--syntax-class: #c08532;
--syntax-variable: #26251e;
--glow-accent: rgba(0,0,0,0.14) 0px 28px 70px, rgba(0,0,0,0.1) 0px 14px 32px;
--gradient-accent: linear-gradient(135deg, #f54e00 0%, #cf2d56 100%);
}

ALSO update store/useIDEStore.ts ThemeMode to include "cursor-warm":
type ThemeMode = "aniket-dark" | "synthwave" | "dracula" | "light" | "rose-pine" | "tokyo-night" | "catppuccin" | "nord" | "gruvbox" | "cursor-warm";

ALSO update the THEME_CYCLE array to include "cursor-warm".

After making all changes run: npx tsc --noEmit
Fix any TypeScript errors before stopping.
