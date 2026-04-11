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

/* DESIGN.md Section 4: Cards */
const cardStyles: Record<CardVariant, string> = {
  /* Standard: #e6e5e0 bg, 1px border at 10% warm brown, 8px radius */
  standard: "rounded-[8px] border border-[var(--border-default)] bg-[var(--bg-muted)]",
  /* Elevated: full card shadow from DESIGN.md */
  elevated: "rounded-[8px] border border-[var(--border-default)] bg-[var(--bg-elevated)]",
  /* Compact: tighter padding, 4px radius */
  compact: "rounded-[4px] border border-[var(--border-default)] bg-[var(--bg-muted)]",
  /* Featured: 10px radius */
  featured: "rounded-[10px] border border-[var(--border-default)] bg-[var(--bg-overlay)]",
};

export function Card({
  variant = "standard",
  children,
  className = "",
  onClick,
  hover = false,
}: CardProps) {
  const isElevated = variant === "elevated";

  return (
    <motion.div
      onClick={onClick}
      whileHover={
        hover
          ? {
              boxShadow: "var(--shadow-card)",
            }
          : undefined
      }
      style={
        isElevated
          ? {
              boxShadow: "var(--shadow-card)",
            }
          : undefined
      }
      className={`${cardStyles[variant]} ${className} ${onClick ? "cursor-pointer" : ""}`}
      transition={{ boxShadow: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
}
