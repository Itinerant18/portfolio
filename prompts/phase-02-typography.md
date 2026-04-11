You are upgrading the portfolio typography using the attached DESIGN.md as spec.
The portfolio is a Next.js 15 app. CSS variables from phase-01 are already in globals.css.

TASK: Implement the three-voice typography system from DESIGN.md Section 3.

STEP 1 — Font loading in app/layout.tsx:

Since CursorGothic, jjannon, and berkeleyMono are proprietary fonts that require
self-hosting, implement a graceful fallback system using @fontsource packages that
most closely approximate each voice:

npm install @fontsource/space-grotesk @fontsource/dm-mono @fontsource/lora

In app/layout.tsx, add these imports:
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/lora/400.css";
import "@fontsource/lora/500.css";
import "@fontsource/dm-mono/300.css";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";

Then create app/fonts.css and @import it in globals.css:
/_ Fallback font mappings approximating DESIGN.md proprietary fonts _/
@font-face {
font-family: "CursorGothic";
src: local("Space Grotesk"), local("system-ui");
font-weight: 100 900;
font-display: swap;
}
@font-face {
font-family: "jjannon";
src: local("Lora"), local("Georgia");
font-weight: 100 900;
font-display: swap;
}
@font-face {
font-family: "berkeleyMono";
src: local("DM Mono"), local("Menlo");
font-weight: 100 900;
font-display: swap;
}
NOTE: If the user has actual font files in /public/fonts/, use those instead.
Check for .woff2 files in public/fonts/ before writing @font-face declarations.
If found, generate @font-face rules pointing to those files.

STEP 2 — Typography utility classes in globals.css:

Add these classes after the @keyframes section. These implement DESIGN.md Section 3
Hierarchy table exactly:

/_ ── DESIGN.md Typography Utilities ──────────────────────────── _/

/_ Display hero: 72px, weight 400, lh 1.10, ls -2.16px _/
.type-hero {
font-family: var(--font-display);
font-size: var(--type-hero);
font-weight: 400;
line-height: var(--lh-display);
letter-spacing: var(--tracking-72);
font-feature-settings: "kern" 1;
}

/_ Section heading: 36px, weight 400, lh 1.20, ls -0.72px _/
.type-section {
font-family: var(--font-display);
font-size: var(--type-section);
font-weight: 400;
line-height: var(--lh-section);
letter-spacing: var(--tracking-36);
}

/_ Sub-heading: 26px, weight 400, lh 1.25, ls -0.325px _/
.type-sub {
font-family: var(--font-display);
font-size: var(--type-sub);
font-weight: 400;
line-height: var(--lh-sub);
letter-spacing: var(--tracking-26);
}

/_ Title small: 22px, weight 400, lh 1.30, ls -0.11px _/
.type-title-sm {
font-family: var(--font-display);
font-size: var(--type-title-sm);
font-weight: 400;
line-height: var(--lh-title);
letter-spacing: var(--tracking-22);
}

/_ Body serif large: 19.2px jjannon, weight 500, lh 1.50 _/
.type-body-lg {
font-family: var(--font-serif);
font-size: var(--type-body-lg);
font-weight: 500;
line-height: var(--lh-body-lg);
font-feature-settings: "cswh" 1;
}

/_ Body serif: 17.28px jjannon, weight 400, lh 1.35 _/
.type-body {
font-family: var(--font-serif);
font-size: var(--type-body);
font-weight: 400;
line-height: var(--lh-body);
font-feature-settings: "cswh" 1;
}

/_ UI body: 16px CursorGothic, weight 400, lh 1.50, ls 0.08px _/
.type-ui {
font-family: var(--font-display);
font-size: var(--type-ui);
font-weight: 400;
line-height: var(--lh-ui);
letter-spacing: var(--tracking-16);
}

/_ Button label: 14px CursorGothic, weight 400, lh 1.00 _/
.type-btn {
font-family: var(--font-display);
font-size: var(--type-btn);
font-weight: 400;
line-height: var(--lh-btn);
}

/_ Button caption: 14px CursorGothic, weight 400, lh 1.50, ls 0.14px, ss09 _/
.type-btn-caption {
font-family: var(--font-display);
font-size: var(--type-btn);
font-weight: 400;
line-height: var(--lh-caption);
letter-spacing: var(--tracking-14-caption);
font-feature-settings: "ss09" 1;
}

/_ Caption: 11px CursorGothic, weight 400-500, lh 1.50 _/
.type-caption {
font-family: var(--font-display);
font-size: var(--type-caption);
font-weight: 400;
line-height: var(--lh-caption);
}

/_ System heading: 20px system-ui, weight 700, lh 1.55 _/
.type-sys-heading {
font-family: var(--font-system);
font-size: var(--type-system);
font-weight: 700;
line-height: var(--lh-sys);
}

/_ System caption: 13px system-ui, weight 500-600, lh 1.33 _/
.type-sys-caption {
font-family: var(--font-system);
font-size: var(--type-sys-cap);
font-weight: 600;
line-height: var(--lh-sys-cap);
}

/_ System micro: 11px system-ui, weight 500, lh 1.27, ls 0.048px, uppercase _/
.type-sys-micro {
font-family: var(--font-system);
font-size: var(--type-sys-micro);
font-weight: 500;
line-height: 1.27;
letter-spacing: var(--tracking-11-micro);
text-transform: uppercase;
}

/_ Mono body: 12px berkeleyMono, weight 400, lh 1.67 _/
.type-mono {
font-family: var(--font-code);
font-size: var(--type-mono);
font-weight: 400;
line-height: var(--lh-mono);
}

/_ Mono small: 11px berkeleyMono, weight 400, lh 1.33, ls -0.275px _/
.type-mono-sm {
font-family: var(--font-code);
font-size: var(--type-mono-sm);
font-weight: 400;
line-height: var(--lh-mono-sm);
letter-spacing: var(--tracking-mono-sm);
}

/_ ── END Typography Utilities ─────────────────────────────────── _/

STEP 3 — Apply typography classes throughout the codebase:

Scan every component file in components/ and apply the correct type class:

- All h1 elements → add class "type-hero" (remove font-size inline styles)
- All h2 elements → add class "type-section"
- All h3 elements → add class "type-sub"
- All h4 elements → add class "type-title-sm"
- All description/paragraph text in project panels → add class "type-body"
- All button text → add class "type-btn"
- All code/mono elements → add class "type-mono" or "type-mono-sm"
- All tiny labels, tags, badges → add class "type-caption" or "type-sys-micro"
- All tab labels and navigation items → add class "type-btn" or "type-sys-caption"

STEP 4 — Responsive type scaling per DESIGN.md Section 8:

Add this responsive block at the END of globals.css:

/_ DESIGN.md Section 8: Hero collapses: 72px → 36px → 26px _/
@media (max-width: 900px) {
.type-hero {
font-size: var(--type-section);
letter-spacing: var(--tracking-36);
line-height: var(--lh-section);
}
.type-section {
font-size: var(--type-sub);
letter-spacing: var(--tracking-26);
}
}
@media (max-width: 600px) {
.type-hero {
font-size: var(--type-sub);
letter-spacing: var(--tracking-26);
line-height: var(--lh-sub);
}
.type-section {
font-size: var(--type-title-sm);
letter-spacing: var(--tracking-22);
}
.type-sub {
font-size: var(--type-title-sm);
letter-spacing: var(--tracking-22);
}
}

After all changes run: npx tsc --noEmit
Show output and fix any errors before stopping.
