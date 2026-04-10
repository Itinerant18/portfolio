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
