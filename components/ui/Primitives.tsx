"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]",
  secondary:
    "border border-[var(--border-default)] bg-[var(--bg-muted)] text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-overlay)] hover:text-[var(--accent-hover)]",
  ghost:
    "border border-[var(--border-default)] bg-transparent text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] hover:text-[var(--accent-hover)]",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-8 gap-2 px-3",
  md: "h-9 gap-2 px-4",
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
      className={`type-btn inline-flex items-center justify-center rounded-md transition-all disabled:cursor-not-allowed disabled:opacity-50 ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`.trim()}
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
      className={`type-btn h-8 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)] px-3 text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-disabled)] focus:border-[var(--accent)] ${className}`.trim()}
      {...props}
    />
  );
}

interface IDETextAreaProps extends ComponentPropsWithoutRef<"textarea"> {}

export function IDETextArea({ className = "", ...props }: IDETextAreaProps) {
  return (
    <textarea
      className={`type-body w-full resize-none rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)] px-3 py-3 text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-disabled)] focus:border-[var(--accent)] ${className}`.trim()}
      {...props}
    />
  );
}

export function SectionLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`type-sys-micro text-[var(--text-muted)] ${className}`.trim()}>
      {children}
    </div>
  );
}
