You are upgrading portfolio components using DESIGN.md as the exact specification.
CSS variables and typography classes from previous phases are already in globals.css.
Do not re-add tokens — only build components using existing vars.

TASK: Rewrite every reusable component using DESIGN.md Section 4 specs exactly.

─────────────────────────────────────────────
PART A: Button component (components/ui/Button.tsx)
─────────────────────────────────────────────

Create or replace components/ui/Button.tsx with:

"use client";
import { motion } from "framer-motion";
import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "pill" | "pill-active" | "ghost" | "light";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
variant?: ButtonVariant;
size?: ButtonSize;
children: ReactNode;
loading?: boolean;
}

/_ DESIGN.md Section 4: Button styles _/
const variants: Record<ButtonVariant, string> = {
/_ Primary warm surface: #ebeae5 bg, dark text, hover text → #cf2d56 _/
primary: "bg-[#ebeae5] text-[#26251e] border-0 rounded-[8px] hover:text-[#cf2d56] focus:shadow-[rgba(0,0,0,0.1)_0px_4px_12px] transition-[color_150ms_ease]",
/_ Pill secondary: #e6e5e0 bg, 60% warm text, full pill, hover text → #cf2d56 _/
pill: "bg-[#e6e5e0] text-[rgba(38,37,30,0.6)] rounded-[9999px] hover:text-[#cf2d56] border-0 transition-[color_150ms_ease]",
/_ Pill active/tertiary: #e1e0db bg, full pill _/
"pill-active": "bg-[#e1e0db] text-[rgba(38,37,30,0.6)] rounded-[9999px] border-0",
/_ Ghost: 6% warm bg, 55% warm text _/
ghost: "bg-[rgba(38,37,30,0.06)] text-[rgba(38,37,30,0.55)] rounded-[8px] border-0 hover:text-[#cf2d56] transition-[color_150ms_ease]",
/_ Light surface: #f7f7f4 bg _/
light: "bg-[#f7f7f4] text-[#26251e] rounded-[8px] border-0 hover:text-[#cf2d56] transition-[color_150ms_ease]",
};

/_ DESIGN.md Section 4: Primary padding 10px 12px 10px 14px _/
const sizes: Record<ButtonSize, string> = {
sm: "px-2 py-1.5 text-[11px]",
md: "px-[14px] py-[10px] pr-[12px]",
lg: "px-5 py-3 text-[16px]",
};

export function Button({ variant = "primary", size = "md", children, loading, className = "", ...props }: ButtonProps) {
return (
<motion.button
whileTap={{ scale: 0.98 }}
className={`type-btn inline-flex items-center justify-center gap-2 outline-none cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}`}
{...props as any} >
{loading ? (
<span className="h-3.5 w-3.5 rounded-full border border-current border-t-transparent animate-spin" />
) : null}
{children}
</motion.button>
);
}

/_ Pill tag for tech stack, topics, filters _/
export function PillTag({ children, active = false }: { children: ReactNode; active?: boolean }) {
return (
<span className={`type-caption inline-flex items-center px-2 py-0.5 rounded-[9999px] border-0 cursor-default transition-[color_150ms_ease] hover:text-[#cf2d56]
      ${active
        ? "bg-[#e1e0db] text-[rgba(38,37,30,0.6)]"
        : "bg-[#e6e5e0] text-[rgba(38,37,30,0.6)]"
      }`} >
{children}
</span>
);
}

─────────────────────────────────────────────
PART B: Card component (components/ui/Card.tsx)
─────────────────────────────────────────────

Create components/ui/Card.tsx:

"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type CardVariant = "standard" | "elevated" | "compact" | "featured";

interface CardProps {
variant?: CardVariant;
children: ReactNode;
className?: string;
onClick?: () => void;
hover?: boolean;
}

/_ DESIGN.md Section 4: Cards _/
const cardStyles: Record<CardVariant, string> = {
/_ Standard: #e6e5e0 bg, 1px border at 10% warm brown, 8px radius _/
standard: "bg-[#e6e5e0] border border-[rgba(38,37,30,0.10)] rounded-[8px]",
/_ Elevated: full card shadow from DESIGN.md _/
elevated: "bg-[#f2f1ed] border-0 rounded-[8px]",
/_ Compact: tighter padding, 4px radius _/
compact: "bg-[#e6e5e0] border border-[rgba(38,37,30,0.10)] rounded-[4px]",
/_ Featured: 10px radius _/
featured: "bg-[#f2f1ed] border border-[rgba(38,37,30,0.10)] rounded-[10px]",
};

export function Card({ variant = "standard", children, className = "", onClick, hover = false }: CardProps) {
const isElevated = variant === "elevated";
return (
<motion.div
onClick={onClick}
whileHover={hover ? {
boxShadow: "rgba(0,0,0,0.14) 0px 28px 70px, rgba(0,0,0,0.1) 0px 14px 32px, rgba(38,37,30,0.1) 0px 0px 0px 1px"
} : undefined}
style={isElevated ? {
boxShadow: "rgba(0,0,0,0.14) 0px 28px 70px, rgba(0,0,0,0.1) 0px 14px 32px, rgba(38,37,30,0.1) 0px 0px 0px 1px"
} : undefined}
className={`${cardStyles[variant]} ${className} ${onClick ? "cursor-pointer" : ""}`}
transition={{ boxShadow: { duration: 0.2 } }} >
{children}
</motion.div>
);
}

─────────────────────────────────────────────
PART C: Navigation upgrade
─────────────────────────────────────────────

In the TopBar component (wherever it lives in the project), apply:

1. The portfolio title/logo uses class "type-section" (36px display font, -0.72px tracking)
   at normal size and collapses to "type-title-sm" below 900px.

2. Nav links: class "type-sys-caption" (13px system-ui, weight 600)
   color: var(--text-primary) for dark themes, #26251e for cursor-warm theme
   hover: color shifts to var(--cursor-orange) → #f54e00 (or var(--accent))
   transition: color 150ms ease

3. The bottom border of the nav: 1px solid var(--border-10)
   (uses the oklab/rgba var from phase-01)

4. Add backdrop-filter: blur(12px) to the nav container for glass effect.

─────────────────────────────────────────────
PART D: SectionLabel upgrade (components/projects/ProjectUI.tsx)
─────────────────────────────────────────────

Replace existing SectionLabel with this DESIGN.md-aligned version:

export function SectionLabel({ label }: { label: string }) {
return (

<div className="flex items-center gap-3 mb-4 pb-2 border-b"
style={{ borderColor: "var(--border-default)" }}>
<span
className="type-sys-micro gradient-text"
style={{ color: "var(--accent)" }} >
{label}
</span>
<div className="h-px flex-1 opacity-20"
style={{ background: "var(--border-default)" }} />
<span className="led-dot h-1.5 w-1.5 rounded-full flex-shrink-0"
style={{ background: "var(--accent)" }} />
</div>
);
}

─────────────────────────────────────────────
PART E: AI Timeline component (components/ui/AITimeline.tsx)
─────────────────────────────────────────────

DESIGN.md Section 4 "AI Timeline" describes a core visual. Create it:

"use client";
import { motion } from "framer-motion";

const STEPS = [
{ key: "thinking", label: "Thinking", color: "#dfa88f", desc: "Analyzing context and intent" },
{ key: "grep", label: "Searching", color: "#9fc9a2", desc: "Scanning repository structure" },
{ key: "read", label: "Reading", color: "#9fbbe0", desc: "Loading relevant files" },
{ key: "edit", label: "Editing", color: "#c0a8dd", desc: "Applying targeted changes" },
];

export function AITimeline({ activeStep = 0 }: { activeStep?: number }) {
return (

<div className="flex flex-col gap-0">
{STEPS.map((step, i) => (
<motion.div
key={step.key}
initial={{ opacity: 0, x: -16 }}
animate={{ opacity: 1, x: 0 }}
transition={{ delay: i * 0.12, duration: 0.4 }}
className="flex gap-4 relative" >
{/_ Connector line _/}
{i < STEPS.length - 1 && (
<div
className="absolute left-[11px] top-8 w-[1px] h-8 bottom-0"
style={{ background: "rgba(38,37,30,0.1)" }}
/>
)}
{/_ Color dot _/}
<div className="flex-shrink-0 mt-1.5">
<motion.div
animate={i === activeStep ? { scale: [1, 1.2, 1] } : {}}
transition={{ repeat: Infinity, duration: 2 }}
className="h-[22px] w-[22px] rounded-full flex items-center justify-center"
style={{ background: step.color + "33", border: `1.5px solid ${step.color}` }} >
<div className="h-2 w-2 rounded-full" style={{ background: step.color }} />
</motion.div>
</div>
{/_ Content _/}
<div className="pb-8">
<div className="type-sys-caption" style={{ color: step.color }}>{step.label}</div>
<div className="type-body mt-0.5" style={{ color: "rgba(38,37,30,0.55)", fontSize: "14px" }}>
{step.desc}
</div>
</div>
</motion.div>
))}
</div>
);
}

After all changes run: npx tsc --noEmit
Fix all TypeScript errors before stopping.
