"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]",
  secondary:
    "border border-[var(--border-default)] bg-[var(--bg-muted)] text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-overlay)]",
  ghost:
    "border border-[var(--border-default)] bg-transparent text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-8 gap-2 px-3 text-[11px]",
  md: "h-9 gap-2 px-4 text-[12px]",
};

interface IDEButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function IDEButton({
  variant = "secondary",
  size = "md",
  className = "",
  children,
  type = "button",
  ...props
}: IDEButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-md font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

interface IDEInputProps extends ComponentPropsWithoutRef<"input"> {}

export function IDEInput({ className = "", ...props }: IDEInputProps) {
  return (
    <input
      className={`h-8 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)] px-3 text-[12px] font-medium text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-disabled)] focus:border-[var(--accent)] ${className}`.trim()}
      {...props}
    />
  );
}

interface IDETextAreaProps extends ComponentPropsWithoutRef<"textarea"> {}

export function IDETextArea({ className = "", ...props }: IDETextAreaProps) {
  return (
    <textarea
      className={`w-full resize-none rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)] px-3 py-3 text-[13px] text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-disabled)] focus:border-[var(--accent)] ${className}`.trim()}
      {...props}
    />
  );
}

export function SectionLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)] ${className}`.trim()}>
      {children}
    </div>
  );
}
