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
