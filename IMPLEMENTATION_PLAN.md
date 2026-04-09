## Portfolio IDE — Animation, Typography, Icon & Tab Overhaul

You are working on a Next.js 15 portfolio app styled as a Cursor IDE clone. The codebase is already set up with Tailwind CSS, Framer Motion, Zustand, and react-icons. Your task is a deep visual and interaction upgrade across all content tabs and the shell. Do **not** touch routing, API routes, data files, or store logic unless explicitly listed below.

---

### PREREQUISITES — Install missing icon packages

```bash
npm install react-icons
```

Confirm `react-icons` is already present (it is — `VscFiles`, `FaGithub` etc. are already used). You will use it exclusively for all icons. **Remove every inline `<svg>` element** from component files and replace with react-icons equivalents. Never write raw SVG JSX.

---

### PART 1 — Global CSS upgrades (`app/globals.css`)

**1A — Typography tokens: switch to Geist**

The current font stack uses Inter. Replace with Geist which is sharper at small IDE sizes:

```css
/* In :root */
--font-sans:
  "Geist", "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
--font-mono: "Geist Mono", "JetBrains Mono", "SF Mono", monospace;
```

Add the Geist import at the top of the file (replace the existing Google Fonts import):

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap");
```

Geist is bundled via Next.js font optimization — add this to `app/layout.tsx`:

```tsx
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

// In RootLayout, add className to <html>:
<html lang="en" data-theme="aniket-dark" className={`${GeistSans.variable} ${GeistMono.variable}`}>
```

Update CSS font variables to use the Next.js variables:

```css
--font-sans: var(--font-geist-sans), "Inter", system-ui, sans-serif;
--font-mono: var(--font-geist-mono), "JetBrains Mono", monospace;
```

**1B — Animation keyframes: add to globals.css**

Add these at the bottom of the file, before the PrismJS section:

```css
/* ── Ambient glow pulse (for accent dots and active indicators) ── */
@keyframes glow-pulse {
  0%,
  100% {
    box-shadow: 0 0 4px 1px var(--accent-muted);
  }
  50% {
    box-shadow:
      0 0 12px 3px var(--accent-muted),
      0 0 24px 6px color-mix(in srgb, var(--accent) 8%, transparent);
  }
}

/* ── Gradient shimmer (for skeleton loaders and hero text) ── */
@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

/* ── Floating upward drift ── */
@keyframes float-up {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
}

/* ── Typewriter blink ── */
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* ── Slide in from left (panels) ── */
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ── Slide in from bottom (cards stagger) ── */
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Gradient text animation ── */
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* ── Spin (loading indicators) ── */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ── Stagger children helper ── */
.stagger-children > * {
  animation: slide-up 0.4s ease-out both;
}
.stagger-children > *:nth-child(1) {
  animation-delay: 0ms;
}
.stagger-children > *:nth-child(2) {
  animation-delay: 60ms;
}
.stagger-children > *:nth-child(3) {
  animation-delay: 120ms;
}
.stagger-children > *:nth-child(4) {
  animation-delay: 180ms;
}
.stagger-children > *:nth-child(5) {
  animation-delay: 240ms;
}
.stagger-children > *:nth-child(6) {
  animation-delay: 300ms;
}

/* ── Gradient text utility ── */
.gradient-text {
  background: linear-gradient(
    135deg,
    var(--accent) 0%,
    var(--info) 50%,
    var(--accent-hover) 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 4s ease infinite;
}

/* ── Glow card hover ── */
.glow-card {
  transition:
    box-shadow 200ms ease-out,
    border-color 200ms ease-out;
}
.glow-card:hover {
  box-shadow:
    0 0 0 1px var(--accent-muted),
    0 4px 20px color-mix(in srgb, var(--accent) 10%, transparent);
  border-color: color-mix(in srgb, var(--accent) 40%, var(--border-default));
}
```

**1C — Color palette additions**

Add these new semantic tokens to `:root`:

```css
/* Gradient accent backgrounds */
--gradient-accent: linear-gradient(135deg, var(--accent) 0%, var(--info) 100%);
--gradient-warm: linear-gradient(135deg, #f97316 0%, var(--accent) 100%);
--gradient-cool: linear-gradient(135deg, var(--info) 0%, #06b6d4 100%);
--gradient-surface: linear-gradient(
  180deg,
  var(--bg-elevated) 0%,
  var(--bg-base) 100%
);

/* Tag colors for skill/tech badges */
--tag-ts: #3178c6;
--tag-react: #61dafb;
--tag-python: #3572a5;
--tag-java: #b07219;
--tag-flutter: #54c5f8;
--tag-iot: #22c55e;
--tag-ai: #a855f7;
--tag-cloud: #f59e0b;
```

---

### PART 2 — HomeTab.tsx full rewrite (`components/HomeTab.tsx`)

Replace the entire component with this richer animated version. Keep all data references pointing to the existing `useIDEStore` and hardcoded content — do not import from different data files than currently used:

```tsx
"use client";

import { motion } from "framer-motion";
import { useIDEStore } from "@/store/useIDEStore";
import {
  VscFiles,
  VscAccount,
  VscMail,
  VscSparkle,
  VscTerminal,
  VscGithub,
  VscCode,
} from "react-icons/vsc";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaReact,
  FaPython,
  FaJava,
  FaAws,
} from "react-icons/fa";
import { SiTypescript, SiFlutter, SiNextdotjs } from "react-icons/si";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const techIcons = [
  { Icon: SiTypescript, color: "#3178c6", label: "TypeScript" },
  { Icon: FaReact, color: "#61dafb", label: "React" },
  { Icon: SiNextdotjs, color: "#ffffff", label: "Next.js" },
  { Icon: FaPython, color: "#3572a5", label: "Python" },
  { Icon: FaJava, color: "#b07219", label: "Java" },
  { Icon: SiFlutter, color: "#54c5f8", label: "Flutter" },
  { Icon: FaAws, color: "#f59e0b", label: "AWS" },
];

export default function HomeTab() {
  const openFile = useIDEStore((state) => state.openFile);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="ide-scrollbar flex h-full w-full flex-col overflow-auto bg-[var(--bg-surface)] px-6 pb-28 pt-8 font-sans text-[13px] text-[var(--text-primary)] md:px-10 md:pt-12"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        {/* ── Hero status badge ── */}
        <motion.div variants={item}>
          <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)] animate-pulse" />
            Available for new opportunities · Noida / Remote
          </div>
        </motion.div>

        {/* ── Name hero ── */}
        <motion.div variants={item} className="flex flex-col gap-2">
          <h1 className="text-[52px] font-bold leading-[0.95] tracking-[-0.05em] text-[var(--text-primary)] md:text-[72px]">
            <span className="gradient-text">Aniket</span>
          </h1>
          <h1 className="text-[52px] font-bold leading-[0.95] tracking-[-0.05em] text-[var(--text-primary)] md:text-[72px]">
            Karmakar
          </h1>
          <p className="mt-3 max-w-[52ch] text-[15px] font-medium leading-relaxed text-[var(--text-muted)] md:text-[17px]">
            Front-end UI Developer · Full-stack · AI/ML · IoT · Cloud
            <span
              className="ml-1 inline-block h-[16px] w-[2px] translate-y-[3px] bg-[var(--accent)]"
              style={{ animation: "blink 1.2s step-end infinite" }}
            />
          </p>
        </motion.div>

        {/* ── Tech icon strip ── */}
        <motion.div variants={item} className="flex flex-wrap gap-3">
          {techIcons.map(({ Icon, color, label }) => (
            <div
              key={label}
              title={label}
              className="glow-card flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] transition-all hover:scale-110"
            >
              <Icon size={18} style={{ color }} />
            </div>
          ))}
        </motion.div>

        {/* ── CTA buttons ── */}
        <motion.div variants={item} className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openFile("src/projects.ts")}
            className="inline-flex items-center gap-2 rounded-sm border border-transparent bg-[var(--accent)] px-5 py-2.5 text-[12px] font-semibold text-white shadow-lg shadow-[var(--accent-muted)] transition-all hover:bg-[var(--accent-hover)]"
          >
            <VscFiles size={15} /> View Projects
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openFile("src/about.html")}
            className="inline-flex items-center gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-5 py-2.5 text-[12px] font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--accent-muted)] hover:bg-[var(--bg-muted)]"
          >
            <VscAccount size={15} /> About Me
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openFile("src/contact.css")}
            className="inline-flex items-center gap-2 rounded-sm border border-[var(--border-default)] bg-transparent px-5 py-2.5 text-[12px] font-medium text-[var(--text-muted)] transition-all hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
          >
            <VscMail size={15} /> Contact
          </motion.button>
        </motion.div>

        {/* ── Stats grid ── */}
        <motion.div
          variants={item}
          className="grid grid-cols-2 overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] md:grid-cols-4"
        >
          {[
            { value: "8.6", label: "CGPA", color: "var(--success)" },
            { value: "36+", label: "PROJECTS", color: "var(--accent)" },
            { value: "4+", label: "INTERNSHIPS", color: "var(--info)" },
            { value: "2+", label: "YEARS EXP", color: "var(--warning)" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ backgroundColor: "var(--bg-muted)" }}
              className={`flex flex-col items-center justify-center px-4 py-6 transition-colors ${i < 3 ? "md:border-r border-[var(--border-default)]" : ""} ${i < 2 ? "border-b md:border-b-0 border-[var(--border-default)]" : ""}`}
            >
              <div
                className="text-[28px] font-bold tracking-[-0.04em] md:text-[32px]"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="mt-1 text-[9px] font-medium tracking-[0.14em] text-[var(--text-muted)]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Social links ── */}
        <motion.div variants={item} className="flex flex-col gap-3">
          <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Connect
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              {
                label: "GitHub",
                Icon: FaGithub,
                color: "var(--text-primary)",
                href: "https://github.com/Itinerant18",
              },
              {
                label: "LinkedIn",
                Icon: FaLinkedin,
                color: "#0077b5",
                href: "https://linkedin.com/in/aniket-karmakar",
              },
              {
                label: "Email",
                Icon: FaEnvelope,
                color: "var(--info)",
                href: "mailto:aniketkarmakar018@gmail.com",
              },
              {
                label: "Phone",
                Icon: FaPhone,
                color: "var(--success)",
                href: "tel:+917602676448",
              },
            ].map(({ label, Icon, color, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3.5 py-2 text-[12px] font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
              >
                <Icon size={14} style={{ color }} />
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ── Current focus ── */}
        <motion.div
          variants={item}
          className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5"
        >
          <div className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--accent)]">
            <VscSparkle size={12} />
            Current Focus
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              {
                icon: "🔭",
                text: "Building FAS-Control, SWatch360 & Dexter AI at SEPLE",
              },
              {
                icon: "🧠",
                text: "Computer Vision, Gesture Recognition & RAG Pipelines",
              },
              {
                icon: "🪴",
                text: "Full-stack apps with React, TypeScript, Java & Python",
              },
              {
                icon: "⚡",
                text: "IoT automation with ESP32/MQTT & AWS cloud services",
              },
            ].map((focus, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 3 }}
                className="flex items-start gap-3 rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)]/50 p-3 transition-colors hover:bg-[var(--bg-muted)]"
              >
                <span className="text-[16px]">{focus.icon}</span>
                <span className="text-[12px] leading-relaxed text-[var(--text-secondary)]">
                  {focus.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
```

---

### PART 3 — AboutTab.tsx full rewrite (`components/AboutTab.tsx`)

Replace with an animated, colorful, icon-rich version:

```tsx
"use client";

import { motion } from "framer-motion";
import {
  VscAccount,
  VscMortarBoard,
  VscBriefcase,
  VscVerified,
  VscGlobe,
} from "react-icons/vsc";
import {
  FaReact,
  FaPython,
  FaJava,
  FaAws,
  FaDocker,
  FaGraduationCap,
  FaCertificate,
  FaLanguage,
} from "react-icons/fa";
import {
  SiTypescript,
  SiFlutter,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const services = [
  "Web Design",
  "Software Testing",
  "Web Development",
  "Application Development",
  "Cloud Application Development",
];

const serviceColors = [
  "var(--accent)",
  "var(--info)",
  "var(--warning)",
  "var(--success)",
  "var(--accent-hover)",
];

export default function AboutTab() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="ide-scrollbar flex h-full w-full flex-col overflow-auto bg-[var(--bg-surface)] p-6 pb-32 font-sans text-[13px] text-[var(--text-primary)] md:p-12"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        {/* Header */}
        <motion.div variants={item}>
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
            About Aniket Karmakar
          </div>
        </motion.div>

        {/* Hero bio card */}
        <motion.div
          variants={item}
          className="glow-card relative overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 md:p-8"
        >
          <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-[var(--accent-subtle)] blur-2xl" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)]">
              <VscAccount size={32} className="text-[var(--accent)]" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[22px] font-bold tracking-tight text-[var(--text-primary)]">
                  <span className="gradient-text">Aniket Karmakar</span>
                </h1>
                <span className="rounded-sm border border-[var(--accent-muted)] bg-[var(--accent-subtle)] px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)]">
                  He/Him
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px]">
                {[
                  "Front-end UI Developer",
                  "React.js",
                  "Full-stack",
                  "AI/ML",
                  "IoT",
                ].map((tag, i) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] px-2 py-0.5 font-medium"
                    style={{ color: serviceColors[i % serviceColors.length] }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="max-w-[60ch] text-[13px] leading-relaxed text-[var(--text-secondary)]">
                Pursuing B.Tech in Electronics & Communication Engineering at
                NSHM Knowledge Campus. Passionate about Front-end UI Development
                and Full-stack Web Development. Currently a{" "}
                <strong className="font-semibold text-[var(--text-primary)]">
                  Junior Software Engineer in R&D at Security Engineers Pvt.
                  Ltd. (SEPLE)
                </strong>
                .
              </p>
            </div>
          </div>
        </motion.div>

        {/* Services */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <VscBriefcase size={12} />
            Services
          </div>
          <div className="flex flex-wrap gap-2">
            {services.map((service, i) => (
              <motion.div
                key={service}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex cursor-default items-center gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-2 text-[12px] font-semibold transition-all hover:border-[var(--accent-muted)] hover:bg-[var(--bg-muted)]"
                style={{ color: serviceColors[i % serviceColors.length] }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: serviceColors[i % serviceColors.length],
                  }}
                />
                {service}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack visual */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <VscGlobe size={12} />
            Core Stack
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
            {[
              { Icon: SiTypescript, color: "#3178c6", label: "TypeScript" },
              { Icon: FaReact, color: "#61dafb", label: "React" },
              {
                Icon: SiNextdotjs,
                color: "var(--text-primary)",
                label: "Next.js",
              },
              { Icon: FaPython, color: "#3572a5", label: "Python" },
              { Icon: FaJava, color: "#b07219", label: "Java" },
              { Icon: SiFlutter, color: "#54c5f8", label: "Flutter" },
              { Icon: FaAws, color: "#f59e0b", label: "AWS" },
            ].map(({ Icon, color, label }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.08, y: -3 }}
                className="glow-card flex flex-col items-center gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] py-3 px-2 transition-all"
              >
                <Icon size={20} style={{ color }} />
                <span className="text-[9px] font-medium text-[var(--text-muted)]">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strategic focus */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <VscVerified size={12} />
            Strategic Focus
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              {
                icon: "🔭",
                text: "Building FAS-Control, SWatch360, & Dexter AI at SEPLE",
              },
              {
                icon: "🧠",
                text: "Deep research into Computer Vision, Gesture Recognition & RAG Pipelines",
              },
              {
                icon: "🪴",
                text: "Full-stack apps with React, TypeScript, Java, and Python",
              },
              {
                icon: "💬",
                text: "Cloud infrastructure with AWS S3, Lambda, ESP32/MQTT, and Cisco",
              },
              {
                icon: "⚡",
                text: "Shipping real products across startup and enterprise settings",
              },
              {
                icon: "✨",
                text: "Targeting Generative AI and software development roles",
              },
            ].map((focus, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4 }}
                className="glow-card flex items-start gap-4 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 transition-all"
              >
                <span className="text-[18px]">{focus.icon}</span>
                <span className="text-[12px] leading-relaxed text-[var(--text-secondary)]">
                  {focus.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <FaGraduationCap size={12} />
            Education
          </div>
          <div className="flex flex-col gap-3">
            {[
              {
                school: "NSHM College of Management and Technology",
                degree: "B.Tech – Electronics & Communication Engineering",
                period: "Apr 2020 – Aug 2024",
                grade: "CGPA: 8.6",
                location: "Kolkata, West Bengal",
                accent: "var(--accent)",
              },
              {
                school: "Jemo NN High School",
                degree: "Higher Secondary",
                period: "Feb 2018 – Jun 2020",
                location: "India",
                accent: "var(--info)",
              },
            ].map((edu, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 3 }}
                className="glow-card flex flex-col gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 transition-all md:flex-row md:items-start md:justify-between"
                style={{ borderLeftWidth: 3, borderLeftColor: edu.accent }}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <VscMortarBoard size={14} style={{ color: edu.accent }} />
                    <h3 className="text-[14px] font-bold text-[var(--text-primary)]">
                      {edu.school}
                    </h3>
                  </div>
                  <div className="text-[11px] font-medium text-[var(--text-muted)]">
                    {edu.location}
                  </div>
                  <div
                    className="text-[12px] font-semibold"
                    style={{ color: edu.accent }}
                  >
                    {edu.degree}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1 md:items-end">
                  <div className="font-mono text-[11px] text-[var(--text-disabled)]">
                    {edu.period}
                  </div>
                  {edu.grade && (
                    <div className="text-[12px] font-bold text-[var(--success)]">
                      {edu.grade}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <FaCertificate size={12} />
            Certifications
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              {
                name: "Cloud Computing",
                issuer: "Amazon AWS",
                date: "Jun 2023",
                color: "var(--warning)",
              },
              {
                name: "AI & Machine Learning",
                issuer: "Edu Skill",
                date: "Aug 2023",
                color: "var(--accent)",
              },
            ].map((cert) => (
              <motion.div
                key={cert.name}
                whileHover={{ scale: 1.02, y: -2 }}
                className="glow-card flex items-center gap-3 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3"
              >
                <FaCertificate size={16} style={{ color: cert.color }} />
                <div className="flex flex-col">
                  <span className="text-[12px] font-semibold text-[var(--text-primary)]">
                    {cert.name}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {cert.issuer} · {cert.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div variants={item} className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <FaLanguage size={12} />
            Languages
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-2 text-[12px] font-medium text-[var(--text-secondary)]">
              🌏 English · Professional Working Proficiency
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
```

---

### PART 4 — SkillsTab.tsx rewrite (`components/SkillsTab.tsx`)

Replace with a more visual, animated version using react-icons for category headers:

```tsx
"use client";

import { motion } from "framer-motion";
import {
  FaReact,
  FaPython,
  FaJava,
  FaAws,
  FaDocker,
  FaCode,
  FaDatabase,
  FaBrain,
  FaCloud,
  FaMobile,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiFlutter,
} from "react-icons/si";
import { VscSymbolNamespace } from "react-icons/vsc";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const skillCategories = [
  {
    title: "Frontend & UI/UX",
    Icon: FaReact,
    iconColor: "#61dafb",
    skills: [
      { name: "React.js & Next.js", pct: 88, color: "var(--info)" },
      { name: "HTML5 & CSS3", pct: 92, color: "var(--success)" },
      { name: "Tailwind CSS", pct: 85, color: "var(--warning)" },
      { name: "Framer Motion", pct: 80, color: "var(--accent)" },
      { name: "Flutter & Dart", pct: 65, color: "var(--info)" },
    ],
  },
  {
    title: "AI / ML & RAG",
    Icon: FaBrain,
    iconColor: "var(--accent)",
    skills: [
      { name: "LangChain", pct: 82, color: "var(--success)" },
      { name: "RAG Architecture", pct: 85, color: "var(--info)" },
      { name: "Computer Vision (OpenCV)", pct: 80, color: "var(--accent)" },
      { name: "pgvector & Vector DBs", pct: 78, color: "var(--warning)" },
      { name: "Gesture Recognition", pct: 75, color: "var(--warning)" },
    ],
  },
  {
    title: "Backend & APIs",
    Icon: FaCode,
    iconColor: "var(--success)",
    skills: [
      { name: "Java & Core Java", pct: 85, color: "var(--success)" },
      { name: "Node.js & Express", pct: 80, color: "var(--info)" },
      { name: "Python (Flask)", pct: 75, color: "var(--warning)" },
      { name: "REST APIs & WebSockets", pct: 82, color: "var(--accent)" },
      { name: "JSP & JDBC", pct: 78, color: "var(--info)" },
    ],
  },
  {
    title: "Databases & BaaS",
    Icon: FaDatabase,
    iconColor: "#e24b4a",
    skills: [
      { name: "SQL & PostgreSQL", pct: 82, color: "var(--info)" },
      { name: "Supabase & Convex", pct: 85, color: "var(--success)" },
      { name: "Firebase", pct: 78, color: "var(--warning)" },
      { name: "SQLite", pct: 80, color: "var(--accent)" },
      { name: "Redis", pct: 70, color: "#e24b4a" },
    ],
  },
  {
    title: "Cloud & IoT",
    Icon: FaCloud,
    iconColor: "var(--warning)",
    skills: [
      { name: "AWS (S3, Lambda)", pct: 78, color: "var(--warning)" },
      { name: "ESP32 & MQTT", pct: 82, color: "var(--success)" },
      { name: "Capacitor & MLKit", pct: 75, color: "var(--accent)" },
      { name: "Docker & CI/CD", pct: 72, color: "var(--info)" },
      { name: "GitHub Actions", pct: 78, color: "var(--text-secondary)" },
    ],
  },
];

const familiarTags = [
  "Zoho Creator",
  "Android SDK",
  "Arduino IDE",
  "Adobe Photoshop",
  "Netlify",
  "Agile/Scrum",
  "Convex",
  "ThingsBoard",
  "React Native",
  "Expo",
  "pdf-parse",
  "react-markdown",
  "C++",
  "Git BASH",
];

export default function SkillsTab() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="ide-scrollbar flex h-full w-full flex-col overflow-auto bg-[var(--bg-surface)] p-6 pb-32 font-sans text-[13px] text-[var(--text-primary)] md:p-12"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <motion.div
          variants={item}
          className="font-mono text-[var(--text-muted)] text-[12px]"
        >
          <span className="text-[var(--accent)]">const</span>{" "}
          <span className="text-[var(--info)]">capabilities</span>{" "}
          <span className="text-[var(--text-muted)]">=</span>{" "}
          <span className="text-[var(--success)]">"actively_evolving"</span>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-2">
          <h1 className="text-[28px] font-bold tracking-[-0.04em]">
            <span className="gradient-text">Technical Skills</span>
          </h1>
          <p className="text-[14px] text-[var(--text-muted)]">
            Competency matrix across full-stack, AI/ML, IoT and cloud.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={item}
              className="glow-card flex flex-col gap-5 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5"
            >
              <div className="flex items-center gap-2">
                <category.Icon
                  size={14}
                  style={{ color: category.iconColor }}
                />
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {category.title}
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-medium text-[var(--text-secondary)]">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[10px] font-medium text-[var(--text-muted)]">
                        {skill.pct}%
                      </span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--bg-muted)]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.pct}%` }}
                        transition={{
                          duration: 0.9,
                          delay: 0.2,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={item}
          className="flex flex-col gap-4 border-t border-[var(--border-default)] pt-8"
        >
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
            <VscSymbolNamespace size={12} />
            Ecosystem & Libraries
          </div>
          <div className="flex flex-wrap gap-2">
            {familiarTags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.025 }}
                whileHover={{ scale: 1.06, y: -2 }}
                className="cursor-default rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--accent-muted)] hover:text-[var(--accent)]"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
```

---

### PART 5 — ExperienceTab.tsx rewrite (`components/ExperienceTab.tsx`)

Replace timeline dots with react-icons, add animation:

```tsx
"use client";

import { motion } from "framer-motion";
import {
  VscCircleFilled,
  VscOrganization,
  VscCalendar,
  VscLocation,
  VscTag,
} from "react-icons/vsc";
import { FaBriefcase, FaCode, FaCloud, FaFlask } from "react-icons/fa";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const experiences = [
  {
    period: "Oct 2024 - Present",
    role: "Junior Software Engineer in R&D department",
    company: "Security Engineers Pvt. Ltd. (SEPLE)",
    type: "Full-time",
    location: "Noida, Uttar Pradesh, India · On-site",
    description:
      "Built FAS-Control: React + TypeScript Capacitor app using MLKit for QR-based ESP32 server management. Developed Dexter Tech Support AI — a cloud-native RAG system. Built SWatch360 Flutter mobile app on ThingsBoard PE. Developed internal R&D tools in Java and JavaScript; built the company website using Zoho.",
    tags: [
      "React",
      "TypeScript",
      "Capacitor",
      "MLKit",
      "Java",
      "JavaScript",
      "ESP32",
      "IoT",
      "Flutter",
      "LangChain",
      "RAG",
    ],
    current: true,
    Icon: FaBriefcase,
    accentColor: "var(--accent)",
  },
  {
    period: "May 2024 - Oct 2024",
    role: "Internship - Java Full Stack Developer",
    company: "Jspiders",
    type: "Internship · 6 months",
    location: "India",
    description:
      "Delivered a real-time chat application end-to-end using Java and JSP. Built a procedural dungeon-generation game. Participated in Agile sprints.",
    tags: ["Java", "JSP", "SQL", "JDBC", "React.js", "CSS", "HTML5", "Agile"],
    current: false,
    Icon: FaCode,
    accentColor: "var(--info)",
  },
  {
    period: "Apr 2024 - Oct 2024",
    role: "Internship - Software Testing",
    company: "Qspiders",
    type: "Internship · 7 months",
    location: "India",
    description:
      "Gained expertise in manual and automation testing, test case design, execution, and defect tracking.",
    tags: ["Software Testing", "Manual Testing", "Automation Testing", "QA"],
    current: false,
    Icon: FaFlask,
    accentColor: "var(--warning)",
  },
  {
    period: "Jan 2024 - May 2024",
    role: "Internship - Cloud Computing",
    company: "Cisco",
    type: "Internship · 5 months",
    location: "Remote",
    description:
      "Cloud computing fundamentals and infrastructure management. Deployed and maintained cloud infrastructure and services.",
    tags: ["Cloud Computing", "Cisco", "Networking", "Infrastructure"],
    current: false,
    Icon: FaCloud,
    accentColor: "var(--success)",
  },
];

export default function ExperienceTab() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="ide-scrollbar flex h-full w-full flex-col overflow-auto bg-[var(--bg-surface)] p-6 pb-32 font-sans text-[13px] text-[var(--text-primary)] md:p-12"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <motion.div variants={item}>
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Professional journey timeline
          </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-2">
          <h1 className="text-[28px] font-bold tracking-[-0.04em]">
            <span className="gradient-text">Experience</span>
          </h1>
          <p className="text-[14px] text-[var(--text-muted)]">
            Professional roles across software engineering, testing, and cloud
            systems.
          </p>
        </motion.div>

        <div className="relative ml-5 flex flex-col gap-0 pl-8 border-l-2 border-[var(--border-default)]">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="relative mb-12 last:mb-0"
            >
              {/* Timeline node */}
              <div
                className="absolute -left-[45px] top-1 flex h-8 w-8 items-center justify-center rounded-sm border-2 bg-[var(--bg-surface)]"
                style={{ borderColor: exp.accentColor }}
              >
                <exp.Icon size={14} style={{ color: exp.accentColor }} />
              </div>

              <motion.div
                whileHover={{ x: 4 }}
                className="glow-card rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 transition-all"
                style={{ borderLeftWidth: 3, borderLeftColor: exp.accentColor }}
              >
                {/* Top row */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] px-2 py-0.5 font-mono text-[10px] font-medium text-[var(--text-muted)]">
                    <VscCalendar size={9} />
                    {exp.period}
                  </span>
                  <span className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                    {exp.type}
                  </span>
                  {exp.current && (
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[var(--success)]">
                      <VscCircleFilled size={8} className="animate-pulse" />
                      Active
                    </span>
                  )}
                </div>

                {/* Role */}
                <h2 className="text-[17px] font-bold leading-tight text-[var(--text-primary)]">
                  {exp.role}
                </h2>
                <div
                  className="mt-1 flex items-center gap-2 text-[13px] font-medium"
                  style={{ color: exp.accentColor }}
                >
                  <VscOrganization size={12} />
                  {exp.company}
                </div>
                {exp.location && (
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                    <VscLocation size={10} />
                    {exp.location}
                  </div>
                )}

                {/* Description */}
                <p className="mt-3 text-[13px] leading-relaxed text-[var(--text-secondary)]">
                  {exp.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
```

---

### PART 6 — TopBar.tsx icon replacements (`components/TopBar.tsx`)

Remove all raw `<svg>` blocks from TopBar. Replace with react-icons equivalents:

Find every inline `<svg>` and replace:

```tsx
// Add these imports at the top
import {
  VscLayoutSidebarLeft,
  VscSparkle,
  VscCode,
  VscSearch,
  VscTerminal,
  VscChromeMaximize,
  VscChromeClose,
  VscSymbolMethod,
} from "react-icons/vsc";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
```

In the right-side controls section, replace the raw SVG window chrome buttons:

```tsx
// Maximize button — replace the svg block with:
<VscChromeMaximize size={12} />

// Close button — replace the svg block with:
<VscChromeClose size={12} />

// AI panel toggle svg — replace with:
<VscLayoutSidebarLeft size={14} />

// Terminal toggle svg — replace with:
<VscTerminal size={14} />

// Search icon inside the center search bar svg — replace with:
<VscSearch size={13} className="opacity-60 group-hover:opacity-100 transition-opacity" />
```

---

### PART 7 — FileExplorer.tsx icon cleanup (`components/FileExplorer.tsx`)

The current `FaHtml5`, `SiTypescript` etc. icon mix creates inconsistent stroke weights. Standardize to VSCode icons for files, keep color:

```tsx
// Replace the getFileIcon function entirely:
import { VscFile, VscJson, VscCode } from "react-icons/vsc";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiCss3,
  SiHtml5,
} from "react-icons/si";
import { FaMarkdown } from "react-icons/fa";

function getFileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  const size = 13;

  if (ext === "html")
    return (
      <SiHtml5
        size={size}
        style={{ color: "var(--file-html)" }}
        className="shrink-0"
      />
    );
  if (ext === "json")
    return (
      <VscJson
        size={size}
        style={{ color: "var(--file-json)" }}
        className="shrink-0"
      />
    );
  if (ext === "ts")
    return (
      <SiTypescript
        size={size}
        style={{ color: "var(--file-typescript)" }}
        className="shrink-0"
      />
    );
  if (ext === "js")
    return (
      <SiJavascript
        size={size}
        style={{ color: "var(--file-javascript)" }}
        className="shrink-0"
      />
    );
  if (ext === "py")
    return (
      <SiPython
        size={size}
        style={{ color: "var(--file-python)" }}
        className="shrink-0"
      />
    );
  if (ext === "tsx" || ext === "jsx")
    return (
      <SiReact
        size={size}
        style={{ color: "var(--file-react)" }}
        className="shrink-0"
      />
    );
  if (ext === "css")
    return (
      <SiCss3
        size={size}
        style={{ color: "var(--file-css)" }}
        className="shrink-0"
      />
    );
  if (ext === "md")
    return (
      <FaMarkdown
        size={size}
        style={{ color: "var(--file-markdown)" }}
        className="shrink-0"
      />
    );
  return <VscFile size={size} className="shrink-0 text-[var(--text-muted)]" />;
}
```

---

### PART 8 — StatusBar.tsx icon replacements (`components/StatusBar.tsx`)

Replace raw SVGs with react-icons:

```tsx
import {
  VscSourceControl, VscClock, VscSparkle,
  VscExtensions, VscWarning,
} from "react-icons/vsc";

// Replace the git branch svg with:
<VscSourceControl size={11} />

// Replace the clock svg with:
<VscClock size={11} />
```

---

### PART 9 — SidebarAI.tsx suggestion chips animation

In the suggestion chips section already fixed to compact pills, add Framer Motion hover lift:

```tsx
// Wrap each suggestion chip button with motion:
import { motion } from "framer-motion";

// Replace the button with:
<motion.button
  key={suggestion}
  type="button"
  onClick={() => setInput(suggestion)}
  whileHover={{ scale: 1.03, y: -1 }}
  whileTap={{ scale: 0.97 }}
  className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)] border border-[var(--border-default)] bg-[var(--bg-base)] rounded-sm hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] transition-colors whitespace-nowrap"
>
  {suggestion}
</motion.button>;
```

Also add a pulsing accent dot next to the header:

```tsx
// In the header div, after VscSparkle icon:
<span
  className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
  style={{ animation: "glow-pulse 2.4s ease-in-out infinite" }}
/>
```

---

### PART 10 — EditorTabs.tsx active indicator animation

The existing `motion.span` with `layoutId="active-tab-line"` at the top is correct. Add a subtle glow to the accent line on active tabs:

```tsx
// Find the active top accent line span and update:
{
  isActive ? (
    <motion.span
      layoutId="active-tab-line"
      className="absolute inset-x-0 top-0 h-[2px]"
      style={{
        background: "var(--accent)",
        boxShadow: "0 0 8px 1px var(--accent-muted)",
      }}
    />
  ) : null;
}
```

---

### PART 11 — ProjectsTab sidebar list item hover

In `ProjectsTab.tsx`, add Framer Motion to the project list buttons:

```tsx
// Wrap the project list button with motion
import { motion } from "framer-motion"; // already imported

// Add to each project button in the sidebar:
<motion.button
  key={project.id}
  whileHover={{ x: 2 }}
  // ... rest of existing props
>
```

---

### Summary of all files changed

| File                           | Change                                                                     |
| ------------------------------ | -------------------------------------------------------------------------- |
| `app/globals.css`              | Geist fonts, keyframes, gradient-text utility, glow-card, new color tokens |
| `app/layout.tsx`               | Add GeistSans/GeistMono Next.js font variables                             |
| `components/HomeTab.tsx`       | Full rewrite with animation, tech icons, gradient text                     |
| `components/AboutTab.tsx`      | Full rewrite with react-icons, animated cards, color coding                |
| `components/SkillsTab.tsx`     | Animated skill bars, icon category headers, card layout                    |
| `components/ExperienceTab.tsx` | Timeline with react-icons nodes, animated entry cards                      |
| `components/TopBar.tsx`        | Remove all raw SVGs → react-icons equivalents                              |
| `components/FileExplorer.tsx`  | Replace mixed icon sources → standardized Si + Vsc icons                   |
| `components/StatusBar.tsx`     | Remove raw SVGs → react-icons                                              |
| `components/SidebarAI.tsx`     | Animated chips, glow-pulse header dot                                      |
| `components/EditorTabs.tsx`    | Active tab line glow effect                                                |
| `components/ProjectsTab.tsx`   | Framer Motion hover on sidebar list                                        |

**Do not touch:** `store/useIDEStore.ts`, `data/content.ts`, `data/projects.ts`, `app/api/`, `utils/`, `supabase/`. All content, routing, and state logic must remain unchanged.
