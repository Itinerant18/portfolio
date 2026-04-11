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

/* DESIGN.md Section 4: Button styles */
const variants: Record<ButtonVariant, string> = {
  /* Primary warm surface: #ebeae5 bg, dark text, hover text → #cf2d56 */
  primary:
    "bg-[var(--bg-muted)] text-[var(--text-primary)] border-0 rounded-[8px] hover:text-[var(--accent-hover)] focus:shadow-[var(--shadow-focus)] transition-[color_150ms_ease]",
  /* Pill secondary: #e6e5e0 bg, 60% warm text, full pill, hover text → #cf2d56 */
  pill:
    "pill-tag rounded-[9999px] border-0",
  /* Pill active/tertiary: #e1e0db bg, full pill */
  "pill-active": "pill-tag pill-tag--active rounded-[9999px] border-0",
  /* Ghost: 6% warm bg, 55% warm text */
  ghost:
    "bg-[var(--accent-subtle)] text-[var(--text-muted)] rounded-[8px] border border-[var(--border-default)] hover:text-[var(--accent-hover)] transition-[color_150ms_ease]",
  /* Light surface: #f7f7f4 bg */
  light:
    "bg-[var(--bg-overlay)] text-[var(--text-primary)] rounded-[8px] border border-[var(--border-default)] hover:text-[var(--accent-hover)] transition-[color_150ms_ease]",
};

/* DESIGN.md Section 4: Primary padding 10px 12px 10px 14px */
const sizes: Record<ButtonSize, string> = {
  sm: "px-2 py-1.5 text-[11px]",
  md: "px-[14px] py-[10px] pr-[12px]",
  lg: "px-5 py-3 text-[16px]",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  loading,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`type-btn inline-flex items-center justify-center gap-2 outline-none cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}`}
      {...(props as any)}
    >
      {loading ? (
        <span className="h-3.5 w-3.5 rounded-full border border-current border-t-transparent animate-spin" />
      ) : null}
      {children}
    </motion.button>
  );
}

/* Pill tag for tech stack, topics, filters */
export function PillTag({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={`type-caption touch-target pill-tag inline-flex items-center px-2 py-0.5 rounded-[9999px] border-0 cursor-default ${
        active ? "pill-tag--active" : ""
      }`}
    >
      {children}
    </span>
  );
}
