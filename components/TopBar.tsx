"use client";

import { contactDetails } from "@/data/content";
import { defaultFilePath } from "@/data/files";
import { useIDEStore } from "@/store/useIDEStore";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { VscLayoutSidebarLeft, VscSparkle, VscCode } from "react-icons/vsc";

type MenuKey =
  | "File"
  | "Edit"
  | "View"
  | "Go"
  | "Selection"
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
      className={`flex h-8 w-11 items-center justify-center transition-colors ${close
        ? "hover:bg-[var(--danger)] hover:text-white"
        : "hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
        } text-[var(--text-muted)] rounded-none`}
    >
      {children}
    </button>
  );
}

export default function TopBar() {
  const currentMode = useIDEStore((state) => state.currentMode);
  const activeFile = useIDEStore((state) => state.activeFile);
  const sidebarOpen = useIDEStore((state) => state.sidebarOpen);
  const aiPanelOpen = useIDEStore((state) => state.aiPanelOpen);
  const terminalOpen = useIDEStore((state) => state.terminalOpen);
  const openFile = useIDEStore((state) => state.openFile);
  const closeFile = useIDEStore((state) => state.closeFile);
  const closeAllTabs = useIDEStore((state) => state.closeAllTabs);
  const openCommandPalette = useIDEStore((state) => state.openCommandPalette);
  const toggleTerminal = useIDEStore((state) => state.toggleTerminal);
  const toggleSidebar = useIDEStore((state) => state.toggleSidebar);
  const toggleAIPanel = useIDEStore((state) => state.toggleAIPanel);
  const resetTerminal = useIDEStore((state) => state.resetTerminal);
  const toggleMode = useIDEStore((state) => state.toggleMode);
  const menuRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [topBarMessage] = useState("portfolio");

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

  const menuActions: Record<MenuKey, MenuAction[]> = {
    File: [
      { label: "New Tab", shortcut: "Ctrl+T", run: () => openFile(defaultFilePath) },
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
        className: "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]",
      },
      { type: "divider" },
      { type: "header", label: "OPEN RECENT" },
      { label: "home.tsx", run: () => openFile("src/home.tsx") },
      { label: "projects.ts", run: () => openFile("src/projects.ts") },
      { label: "skills.json", run: () => openFile("src/skills.json") },
      { type: "divider" },
    ],
    Edit: [
      { label: "Find...", shortcut: "Ctrl+P", run: () => openCommandPalette("files") },
      { type: "divider" },
      { label: "Select All", shortcut: "Ctrl+A", run: selectEditorContent },
      { label: "Copy", shortcut: "Ctrl+C", run: () => { document.execCommand("copy"); } },
    ],
    Selection: [
      { label: "Select All", shortcut: "Ctrl+A", run: selectEditorContent },
    ],
    View: [
      { label: "Command Palette", shortcut: "Ctrl+P", run: () => openCommandPalette("commands") },
      { type: "divider" },
      {
        label: currentMode === "agent" ? "Switch to Editor Mode" : "Switch to Agent Mode",
        shortcut: "Ctrl+Shift+M",
        run: toggleMode,
      },
      { type: "divider" },
      { label: "Toggle Sidebar", shortcut: "Ctrl+B", run: toggleSidebar },
      { label: "Toggle Terminal", shortcut: "Ctrl+`", run: toggleTerminal },
      {
        label: "✨ AI Assistant",
        shortcut: "Ctrl+Shift+A",
        run: toggleAIPanel,
        className: "text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white",
      },
      { type: "divider" },
      {
        label: "Enter Full Screen",
        shortcut: "F11",
        run: () => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => undefined);
          } else {
            document.exitFullscreen().catch(() => undefined);
          }
        },
      },
      { label: "Zoom In", shortcut: "Ctrl++", run: useIDEStore.getState().zoomIn },
      { label: "Zoom Out", shortcut: "Ctrl+-", run: useIDEStore.getState().zoomOut },
      { label: "Reset Zoom", run: useIDEStore.getState().resetZoom },
    ],
    Go: [
      { label: "Go to File", shortcut: "Ctrl+P", run: () => openCommandPalette("files") },
      { label: "Go to Projects", run: () => openFile("src/projects.ts") },
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
    <header className="relative flex h-8 shrink-0 items-center justify-between border-b border-[var(--border-default)] bg-[var(--bg-base)] pl-2 select-none">
      <div ref={menuRef} className="flex min-w-0 items-center gap-3">
        <div className="flex h-5 w-5 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[11px] font-bold text-[var(--accent)] shadow-sm">
          C
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
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
                className={`h-7 px-2.5 rounded-md text-[12px] font-medium leading-none transition-colors ${openMenu === item
                  ? "bg-[var(--bg-muted)] text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
                  }`}
              >
                {item}
              </button>

              {openMenu === item ? (
                <div className="absolute left-0 top-full z-50 mt-1 min-w-[240px] rounded-lg border border-[var(--border-default)] bg-[var(--bg-overlay)] py-1.5 shadow-xl backdrop-blur-md">
                  {menuActions[item].map((action, i) => {
                    if (action.type === "divider") {
                      return <div key={i} className="my-1 border-t border-[var(--border-default)]" />;
                    }
                    if (action.type === "header") {
                      return (
                        <div key={i} className="mb-0.5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--text-disabled)]">
                          {action.label}
                        </div>
                      );
                    }
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => void handleMenuAction(action)}
                        className={`group flex h-8 w-full items-center justify-between gap-4 px-3.5 text-left text-[13px] transition mx-0 ${action.className
                          ? action.className
                          : "text-[var(--text-secondary)] hover:bg-[var(--accent)] hover:text-white"
                          }`}
                      >
                        <span className="font-medium">{action.label}</span>
                        {action.shortcut ? (
                          <span className={`${action.className ? '' : 'text-[var(--text-disabled)] group-hover:text-white/80'} text-[11px] font-mono tracking-tighter`}>
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
        </nav>
      </div>

      <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2">
        <button
          type="button"
          onClick={() => openCommandPalette("files")}
          className="flex h-6 w-[220px] sm:w-[320px] md:w-[480px] items-center justify-center gap-2.5 rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 text-[var(--text-secondary)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] transition-all hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] group"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition-opacity">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="text-[11px] font-medium tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">{topBarMessage === "portfolio" ? "Search files, commands, and pages" : topBarMessage}</span>
          <span className="ml-auto flex items-center gap-1 opacity-40 group-hover:opacity-60">
            <span className="rounded border border-[var(--border-default)] px-1.5 py-0.5 text-[9px] font-bold">CTRL</span>
            <span className="rounded border border-[var(--border-default)] px-1.5 py-0.5 text-[9px] font-bold">P</span>
          </span>
        </button>
      </div>

      <div className="flex h-full items-center">
        <div className="hidden md:flex items-center gap-[14px] pr-4 text-[var(--text-secondary)]">
          <div className="flex items-center gap-[4px] ml-2">
            <button 
              onClick={toggleMode} 
              title={`Switch to ${currentMode === 'agent' ? 'Editor' : 'Agent'} Mode`} 
              className={`w-7 h-7 flex items-center justify-center rounded-md transition-all ${currentMode === 'agent' ? 'bg-[var(--accent-subtle)] text-[var(--accent)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]'}`}
            >
              {currentMode === "agent" ? (
                <VscSparkle size={15} />
              ) : (
                <VscCode size={16} />
              )}
            </button>
            <div className="w-[1px] h-4 bg-[var(--border-default)] mx-1" />
            <button onClick={toggleAIPanel} title="Toggle AI Panel (Ctrl+Shift+A)" className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${aiPanelOpen ? "text-[var(--accent)]" : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
              </svg>
            </button>
            <button onClick={toggleTerminal} title="Toggle Terminal (Ctrl+`)" className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${terminalOpen ? "text-[var(--accent)]" : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="15" x2="21" y2="15"/>
              </svg>
            </button>
            <button onClick={toggleSidebar} title="Toggle Sidebar (Ctrl+B)" className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${sidebarOpen ? "text-[var(--accent)]" : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"}`}>
              <VscLayoutSidebarLeft size={15} />
            </button>
          </div>
        </div>

        <div className="flex h-full items-center">
          <WindowButton
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => undefined);
              } else {
                document.exitFullscreen().catch(() => undefined);
              }
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect width="8" height="8" x="2" y="6" />
              <polyline points="4 6 4 2 12 2 12 10 8 10" />
            </svg>
          </WindowButton>
          <WindowButton close onClick={() => setOpenMenu(null)}>
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
