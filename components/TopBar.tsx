"use client";

import type { ReactNode } from "react";
import { useIDEStore } from "@/store/useIDEStore";

const menuItems = ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"];

function IconButton({
  title,
  onClick,
  children,
  className = "",
}: {
  title: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`flex h-6 w-6 items-center justify-center text-[var(--text-muted)] transition hover:bg-[var(--bg-hover)] hover:text-[var(--text)] ${className}`}
    >
      {children}
    </button>
  );
}

export default function TopBar() {
  const openCommandPalette = useIDEStore((state) => state.openCommandPalette);
  const toggleTheme = useIDEStore((state) => state.toggleTheme);
  const toggleTerminal = useIDEStore((state) => state.toggleTerminal);
  const toggleSidebar = useIDEStore((state) => state.toggleSidebar);
  const toggleAIPanel = useIDEStore((state) => state.toggleAIPanel);

  return (
    <header className="relative flex h-9 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-main)] px-2">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-4 w-4 items-center justify-center border border-[var(--border)] bg-[var(--bg-panel)] text-[10px] font-semibold text-[var(--text)]">
          C
        </div>
        <nav className="hidden items-center gap-3 lg:flex">
          {menuItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                if (item === "File") {
                  openCommandPalette("files");
                }

                if (item === "Terminal") {
                  toggleTerminal();
                }
              }}
              className="text-[12px] leading-none text-[var(--text-muted)] transition hover:text-[var(--text)]"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[12px] leading-none text-[var(--text-muted)]">
        portfolio
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={toggleAIPanel}
          className="px-2 text-[12px] leading-none text-[var(--text-muted)] lg:hidden"
        >
          AI
        </button>
        <button
          type="button"
          onClick={toggleSidebar}
          className="px-2 text-[12px] leading-none text-[var(--text-muted)] lg:hidden"
        >
          Files
        </button>

        <IconButton title="Search" onClick={() => openCommandPalette("files")}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20L16.5 16.5" />
          </svg>
        </IconButton>

        <IconButton title="Git" onClick={() => openCommandPalette("commands")}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="6" cy="6" r="2" />
            <circle cx="18" cy="6" r="2" />
            <circle cx="12" cy="18" r="2" />
            <path d="M8 7.5l3 8" />
            <path d="M16 7.5l-3 8" />
          </svg>
        </IconButton>

        <IconButton title="Settings" onClick={toggleTheme}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1 1 0 0 1 0 1.4l-1 1a1 1 0 0 1-1.4 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1 1 0 0 1-1 1h-1.4a1 1 0 0 1-1-1v-.2a1 1 0 0 0-.7-.9 1 1 0 0 0-1 .2l-.2.1a1 1 0 0 1-1.4 0l-1-1a1 1 0 0 1 0-1.4l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a1 1 0 0 1-1-1v-1.4a1 1 0 0 1 1-1h.2a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1l-.1-.2a1 1 0 0 1 0-1.4l1-1a1 1 0 0 1 1.4 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a1 1 0 0 1 1-1h1.4a1 1 0 0 1 1 1v.2a1 1 0 0 0 .7.9 1 1 0 0 0 1-.2l.2-.1a1 1 0 0 1 1.4 0l1 1a1 1 0 0 1 0 1.4l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a1 1 0 0 1 1 1v1.4a1 1 0 0 1-1 1h-.2a1 1 0 0 0-.9.7" />
          </svg>
        </IconButton>
      </div>
    </header>
  );
}
