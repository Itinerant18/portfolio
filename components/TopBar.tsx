"use client";

import { contactDetails } from "@/data/content";
import { useIDEStore } from "@/store/useIDEStore";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type MenuKey =
  | "File"
  | "Edit"
  | "Selection"
  | "View"
  | "Go"
  | "Run"
  | "Terminal"
  | "Help";

interface MenuAction {
  label: string;
  shortcut?: string;
  run: () => void | Promise<void>;
}

const menuOrder: MenuKey[] = [
  "File",
  "Edit",
  "Selection",
  "View",
  "Go",
  "Run",
  "Terminal",
  "Help",
];

function withProtocol(value: string) {
  return value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;
}

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
      className={`flex h-6 w-6 items-center justify-center text-[var(--text-muted)] transition hover:bg-[var(--hover)] hover:text-[var(--text-primary)] ${className}`}
    >
      {children}
    </button>
  );
}

export default function TopBar() {
  const activeFile = useIDEStore((state) => state.activeFile);
  const sidebarOpen = useIDEStore((state) => state.sidebarOpen);
  const aiPanelOpen = useIDEStore((state) => state.aiPanelOpen);
  const openFile = useIDEStore((state) => state.openFile);
  const closeFile = useIDEStore((state) => state.closeFile);
  const openCommandPalette = useIDEStore((state) => state.openCommandPalette);
  const toggleTheme = useIDEStore((state) => state.toggleTheme);
  const toggleTerminal = useIDEStore((state) => state.toggleTerminal);
  const toggleSidebar = useIDEStore((state) => state.toggleSidebar);
  const toggleAIPanel = useIDEStore((state) => state.toggleAIPanel);
  const toggleMobileSidebar = useIDEStore((state) => state.toggleMobileSidebar);
  const toggleMobileAIPanel = useIDEStore((state) => state.toggleMobileAIPanel);
  const resetTerminal = useIDEStore((state) => state.resetTerminal);
  const menuRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    }

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openExternal = (value: string) => {
    window.open(withProtocol(value), "_blank", "noopener,noreferrer");
  };

  const selectEditorContent = () => {
    const target = document.querySelector("[data-ide-editor-content='true']");

    if (!target) {
      return;
    }

    const selection = window.getSelection();

    if (!selection) {
      return;
    }

    const range = document.createRange();
    range.selectNodeContents(target);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const copyActiveFilePath = async () => {
    if (!activeFile || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(activeFile);
    } catch {
      // Ignore clipboard failures in unsupported contexts.
    }
  };

  const menuActions: Record<MenuKey, MenuAction[]> = {
    File: [
      { label: "Open Home", run: () => openFile("src/home.tsx") },
      { label: "Open Projects", run: () => openFile("src/projects.ts") },
      { label: "Open Skills", run: () => openFile("src/skills.json") },
      { label: "Open Experience", run: () => openFile("src/experience.ts") },
      { label: "Open Contact", run: () => openFile("src/contact.ts") },
      {
        label: "Close Tab",
        shortcut: "Ctrl+W",
        run: () => {
          if (activeFile) {
            closeFile(activeFile);
          }
        },
      },
    ],
    Edit: [
      { label: "Copy Active File Path", run: copyActiveFilePath },
      { label: "Clear Terminal", run: resetTerminal },
    ],
    Selection: [
      { label: "Select All", shortcut: "Ctrl+A", run: selectEditorContent },
    ],
    View: [
      {
        label: aiPanelOpen ? "Hide Chat" : "Show Chat",
        run: toggleAIPanel,
      },
      {
        label: sidebarOpen ? "Hide Explorer" : "Show Explorer",
        run: toggleSidebar,
      },
      { label: "Toggle Terminal", shortcut: "Ctrl+`", run: toggleTerminal },
      { label: "Toggle Theme", run: toggleTheme },
    ],
    Go: [
      { label: "Go to File", shortcut: "Ctrl+P", run: () => openCommandPalette("files") },
      { label: "Go to Projects", run: () => openFile("src/projects.ts") },
      { label: "Go to Skills", run: () => openFile("src/skills.json") },
    ],
    Run: [
      {
        label: "Run Portfolio Demo",
        run: () => {
          openFile("src/projects.ts");
          resetTerminal();
        },
      },
      { label: "Open Live Preview", run: () => openFile("src/home.tsx") },
    ],
    Terminal: [
      { label: "New Terminal", run: resetTerminal },
      { label: "Clear Terminal", run: resetTerminal },
    ],
    Help: [
      { label: "About Me", run: () => openFile("src/about.tsx") },
      { label: "Contact Me", run: () => openFile("src/contact.ts") },
      { label: "GitHub", run: () => openExternal(contactDetails.github) },
      { label: "LinkedIn", run: () => openExternal(contactDetails.linkedin) },
    ],
  };

  const handleMenuAction = async (action: MenuAction) => {
    await action.run();
    setOpenMenu(null);
  };

  return (
    <header className="relative flex h-9 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-2">
      <div ref={menuRef} className="flex min-w-0 items-center gap-3">
        <div className="flex h-4 w-4 items-center justify-center border border-[var(--border)] bg-[var(--panel)] text-[10px] font-semibold text-[var(--text-primary)]">
          C
        </div>

        <nav className="hidden items-center gap-3 lg:flex">
          {menuOrder.map((item) => (
            <div
              key={item}
              className="relative"
              onMouseEnter={() => {
                if (openMenu) {
                  setOpenMenu(item);
                }
              }}
            >
              <button
                type="button"
                onClick={() => setOpenMenu((current) => (current === item ? null : item))}
                className={`h-6 px-1 text-[12px] leading-none transition ${
                  openMenu === item
                    ? "bg-[var(--hover)] text-[var(--text-primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {item}
              </button>

              {openMenu === item ? (
                <div className="absolute left-0 top-full z-50 mt-px min-w-[190px] border border-[var(--border)] bg-[var(--panel)] py-1">
                  {menuActions[item].map((action) => (
                    <button
                      key={action.label}
                      type="button"
                      onClick={() => void handleMenuAction(action)}
                      className="flex h-7 w-full items-center justify-between gap-3 px-2 text-left text-[12px] text-[var(--text-muted)] transition hover:bg-[var(--hover)] hover:text-[var(--text-primary)]"
                    >
                      <span>{action.label}</span>
                      {action.shortcut ? (
                        <span className="text-[11px] text-[var(--text-muted)]">
                          {action.shortcut}
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
      </div>

      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[12px] leading-none text-[var(--text-muted)]">
        portfolio
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={toggleMobileAIPanel}
          className="px-2 text-[12px] leading-none text-[var(--text-muted)] lg:hidden"
        >
          AI
        </button>
        <button
          type="button"
          onClick={toggleMobileSidebar}
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

        <IconButton title="GitHub" onClick={() => openExternal(contactDetails.github)}>
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
