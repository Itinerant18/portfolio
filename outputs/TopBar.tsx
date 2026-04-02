"use client";

import type { ReactNode } from "react";
import { useIDEStore } from "@/store/useIDEStore";

const menuItems = ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"];

function IconButton({
  title,
  onClick,
  children,
  className = "",
  active = false,
}: {
  title: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`flex h-6 w-6 items-center justify-center transition hover:bg-[var(--bg-hover)] ${
        active
          ? "text-[var(--accent)]"
          : "text-[var(--text-muted)] hover:text-[var(--text)]"
      } ${className}`}
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
  const theme = useIDEStore((state) => state.theme);
  const terminalOpen = useIDEStore((state) => state.terminalOpen);

  return (
    <header className="relative flex h-9 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-main)] px-2">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-4 w-4 items-center justify-center border border-[var(--border)] bg-[var(--accent)] text-[10px] font-semibold text-white">
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
                if (item === "Go") {
                  openCommandPalette("commands");
                }
              }}
              className={`text-[12px] leading-none transition hover:text-[var(--text)] ${
                item === "Terminal" && terminalOpen
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[12px] leading-none text-[var(--text-muted)]">
        cursorfolio
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

        <IconButton
          title="Search files (Ctrl+P)"
          onClick={() => openCommandPalette("files")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20L16.5 16.5" />
          </svg>
        </IconButton>

        <IconButton
          title="Command palette (Ctrl+K)"
          onClick={() => openCommandPalette("commands")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="6" cy="6" r="2" />
            <circle cx="18" cy="6" r="2" />
            <circle cx="12" cy="18" r="2" />
            <path d="M8 7.5l3 8" />
            <path d="M16 7.5l-3 8" />
          </svg>
        </IconButton>

        {/* BUG FIX #4: Was titled "Settings" but actually toggles theme. Now correctly labeled.
            Also shows sun/moon icon matching current theme, with active state feedback. */}
        <IconButton
          title={`Toggle theme — currently ${theme} (Ctrl+Shift+T)`}
          onClick={toggleTheme}
          active={false}
        >
          {theme === "dark" ? (
            // Moon icon for dark mode
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            // Sun icon for light mode
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          )}
        </IconButton>
      </div>
    </header>
  );
}
