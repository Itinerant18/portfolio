"use client";

import { contactDetails } from "@/data/content";
import { useIDEStore } from "@/store/useIDEStore";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type MenuKey =
  | "File"
  | "Edit"
  | "View"
  | "Go"
  | "Run"
  | "Run"
  | "Terminal"
  | "Help";

type MenuContext = "action" | "divider" | "header";

interface MenuAction {
  type?: MenuContext;
  label?: string;
  shortcut?: string;
  run?: () => void | Promise<void>;
  className?: string;
}

const menuOrder: MenuKey[] = [
  "File",
  "Edit",
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
  isActive = false,
  className = "",
}: {
  title: string;
  onClick: () => void;
  children: ReactNode;
  isActive?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`flex h-6 w-6 items-center justify-center rounded transition ${
        isActive
          ? "bg-[var(--hover)] text-[var(--text-primary)]"
          : "text-[var(--text-muted)] hover:bg-[var(--hover)] hover:text-[var(--text-primary)]"
      } ${className}`}
    >
      {children}
    </button>
  );
}

function WindowButton({
  onClick,
  children,
  close = false,
}: {
  onClick: () => void;
  children: ReactNode;
  close?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-9 w-11 items-center justify-center transition-colors ${
        close
          ? "hover:bg-[#e81123] hover:text-white"
          : "hover:bg-[#30363d] hover:text-[var(--text-primary)]"
      } text-[var(--text-muted)]`}
    >
      {children}
    </button>
  );
}

export default function TopBar() {
  const activeFile = useIDEStore((state) => state.activeFile);
  const sidebarOpen = useIDEStore((state) => state.sidebarOpen);
  const aiPanelOpen = useIDEStore((state) => state.aiPanelOpen);
  const terminalOpen = useIDEStore((state) => state.terminalOpen);
  const openFile = useIDEStore((state) => state.openFile);
  const closeFile = useIDEStore((state) => state.closeFile);
  const closeAllTabs = useIDEStore((state) => state.closeAllTabs);
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
  const [topBarMessage, setTopBarMessage] = useState("portfolio");

  const handleCloseClick = () => {
    setTopBarMessage("You cannot close a portfolio... nice try! 😉");
    setTimeout(() => {
      setTopBarMessage("portfolio");
    }, 3000);
  };

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
      { label: "New Tab", shortcut: "Ctrl+T", run: () => {} },
      { label: "Open File...", shortcut: "Ctrl+P", run: () => openCommandPalette("files") },
      { type: "divider" },
      {
        label: "Close Tab",
        shortcut: "Ctrl+W",
        run: () => {
          if (activeFile) {
            closeFile(activeFile);
          }
        },
      },
      {
        label: "Close All Tabs",
        run: closeAllTabs,
        className: "bg-[#e5c07b] text-[#1b1e22] hover:bg-[#d1b071] hover:text-[#1b1e22]",
      },
      { type: "divider" },
      { type: "header", label: "OPEN RECENT" },
      { label: "home.tsx", run: () => openFile("src/home.tsx") },
      { label: "about.html", run: () => openFile("src/about.html") },
      { label: "projects.ts", run: () => openFile("src/projects.ts") },
      { label: "skills.json", run: () => openFile("src/skills.json") },
      { type: "divider" },
      { label: "Download Resume", run: () => window.open("#", "_blank") },
    ],
    Edit: [
      { label: "Find...", shortcut: "Ctrl+P", run: () => openCommandPalette("files") },
      { type: "divider" },
      { label: "Select All", shortcut: "Ctrl+A", run: selectEditorContent },
      { label: "Copy", shortcut: "Ctrl+C", run: () => { document.execCommand("copy"); } },
    ],
    View: [
      { label: "Command Palette", shortcut: "Ctrl+P", run: () => openCommandPalette("commands") },
      { type: "divider" },
      { label: "Toggle Sidebar", shortcut: "Ctrl+B", run: toggleSidebar },
      { label: "Toggle Terminal", shortcut: "Ctrl+`", run: toggleTerminal },
      {
        label: "✨ Aahana's Copilot",
        shortcut: "Ctrl+Shift+C",
        run: toggleAIPanel,
        className: "text-[#d2a8ff] hover:bg-[#d2a8ff] hover:text-[#1b1e22]",
      },
      { type: "divider" },
      {
        label: "Enter Full Screen",
        shortcut: "F11",
        run: () => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        },
      },
      { label: "Zoom In", shortcut: "Ctrl++", run: useIDEStore.getState().zoomIn },
      { label: "Zoom Out", shortcut: "Ctrl+-", run: useIDEStore.getState().zoomOut },
      { label: "Reset Zoom", run: useIDEStore.getState().resetZoom },
    ],
    Go: [
      { label: "Go to File", shortcut: "Ctrl+P", run: () => openCommandPalette("files") },
      { label: "Go to Projects", run: () => openFile("src/projects.js") },
      { label: "Go to Skills", run: () => openFile("src/skills.json") },
    ],
    Run: [
      {
        label: "Run Portfolio Demo",
        run: () => {
          openFile("src/projects.js");
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
      { label: "About Me", run: () => openFile("src/about.html") },
      { label: "Contact Me", run: () => openFile("src/contact.css") },
      { label: "GitHub", run: () => openExternal(contactDetails.github) },
      { label: "LinkedIn", run: () => openExternal(contactDetails.linkedin) },
    ],
  };

  const handleMenuAction = async (action: MenuAction) => {
    if (action.run) {
      await action.run();
    }
    setOpenMenu(null);
  };

  return (
    <header className="relative flex h-9 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] pl-2 select-none">
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
                className={`h-6 px-1 text-[13px] leading-none transition ${
                  openMenu === item
                    ? "bg-[var(--hover)] text-[var(--text-primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {item}
              </button>

              {openMenu === item ? (
                <div className="absolute left-0 top-full z-50 mt-px min-w-[210px] border border-[#30363d] bg-[#3e3936] py-1 shadow-lg">
                  {menuActions[item].map((action, i) => {
                    if (action.type === "divider") {
                      return <div key={i} className="my-1 border-t border-[#4a4742]" />;
                    }
                    if (action.type === "header") {
                      return (
                        <div key={i} className="px-3 py-1.5 text-[11px] font-mono tracking-widest text-[#a69c86] uppercase mb-1">
                          {action.label}
                        </div>
                      );
                    }
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => void handleMenuAction(action)}
                        className={`flex h-8 w-full items-center justify-between gap-3 px-3 text-left font-mono text-[13px] transition ${
                          action.className
                            ? action.className
                            : "text-[#e5dfc5] hover:bg-[#e5c07b] hover:text-[#1b1e22]"
                        }`}
                      >
                        <span className="font-semibold">{action.label}</span>
                        {action.shortcut ? (
                          <span className={`${action.className ? '' : 'text-[#8b826b] group-hover:text-[#1b1e22]'} font-medium`}>
                            {action.shortcut}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ))}

          <div className="ml-1 flex items-center gap-0.5 opacity-90">
            <button
              type="button"
              title="Toggle Copilot UI"
              onClick={toggleAIPanel}
              className="flex h-6 w-6 items-center justify-center rounded text-[var(--text-muted)] transition hover:bg-[var(--hover)] hover:text-[var(--text-primary)]"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
            <button
              type="button"
              title="New Chat"
              onClick={() => useIDEStore.getState().clearChat()}
              className="flex h-6 w-6 items-center justify-center rounded text-[var(--text-muted)] transition hover:bg-[var(--hover)] hover:text-[var(--text-primary)]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </div>
        </nav>
      </div>

      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[12px] leading-none text-[var(--text-muted)] transition-colors">
        {topBarMessage}
      </div>

      <div className="flex h-full items-center">
        <div className="flex items-center gap-1.5 pr-3">
          <IconButton
            title="Toggle Sidebar"
            onClick={toggleSidebar}
            isActive={sidebarOpen}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <path d="M9 3v18"/>
            </svg>
          </IconButton>

          <IconButton
            title="Toggle Terminal"
            onClick={toggleTerminal}
            isActive={terminalOpen}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <path d="M3 15h18"/>
            </svg>
          </IconButton>

          <IconButton
            title="Toggle Copilot"
            onClick={toggleAIPanel}
            isActive={aiPanelOpen}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <path d="M15 3v18"/>
            </svg>
          </IconButton>

          <IconButton
            title="Search"
            onClick={() => openCommandPalette("files")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20L16.5 16.5" />
            </svg>
          </IconButton>

          <IconButton
            title="Settings"
            onClick={toggleTheme}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </IconButton>
        </div>

        <div className="flex h-full items-center">
          <WindowButton onClick={() => {}}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <rect width="10" height="1" x="3" y="8" />
            </svg>
          </WindowButton>
          <WindowButton
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
              } else {
                document.exitFullscreen().catch(() => {});
              }
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect width="8" height="8" x="2" y="6" />
              <polyline points="4 6 4 2 12 2 12 10 8 10" />
            </svg>
          </WindowButton>
          <WindowButton close onClick={handleCloseClick}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
              <line x1="3" y1="3" x2="13" y2="13" />
              <line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </WindowButton>
        </div>
      </div>
    </header>
  );
}
