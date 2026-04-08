"use client";

import { contactDetails } from "@/data/content";
import { defaultFilePath } from "@/data/files";
import { useIDEStore } from "@/store/useIDEStore";
import { FaGear } from "react-icons/fa6";
import { useEffect, useRef, useState, type ReactNode } from "react";

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

function withProtocol(value: string) {
  return value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;
}

function WindowButton({
  onClick,
  children,
  close = false,
  title,
}: {
  onClick: () => void;
  children: ReactNode;
  close?: boolean;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
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
  const toggleSettings = useIDEStore((state) => state.toggleSettings);
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
      { label: "Find...", shortcut: "Ctrl+F", run: () => openCommandPalette("files") },
      { type: "divider" },
      { label: "Select All", shortcut: "Ctrl+A", run: selectEditorContent },
      { label: "Copy", shortcut: "Ctrl+C", run: async () => { try { await navigator.clipboard.writeText(window.getSelection()?.toString() ?? ""); } catch {} } },
    ],
    Selection: [
      { label: "Select All", shortcut: "Ctrl+A", run: selectEditorContent },
    ],
    View: [
      { label: "Command Palette", shortcut: "Ctrl+K", run: () => openCommandPalette("commands") },
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

  const editorMenuOrder: MenuKey[] = [
    "File",
    "Edit",
    "Selection",
    "View",
    "Go",
    "Run",
    "Terminal",
    "Help",
  ];

  const agentMenuOrder: MenuKey[] = ["File", "Edit", "View", "Help"];
  const currentMenuOrder = currentMode === "agent" ? agentMenuOrder : editorMenuOrder;

  return (
    <header className="relative flex h-8 shrink-0 items-center justify-between border-b border-[var(--border-default)] bg-[var(--bg-base)] pl-0.5 pr-2 select-none">
      {/* Left: Logo + Menu items */}
      <div ref={menuRef} className="flex min-w-0 items-center gap-1.5 pl-1.5">
        <div className="flex h-5 w-5 items-center justify-center pointer-events-none">
          <img 
            src="https://img.icons8.com/?size=32&id=LhC2HfftBElY&format=png" 
            alt="Cursor AI Logo" 
            className="h-full w-full object-contain"
          />
        </div>

        <nav className="hidden items-center gap-0.5 lg:flex ml-1">
          {currentMenuOrder.map((item) => (
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
                onClick={() => setOpenMenu((current: MenuKey | null) => (current === item ? null : item))}
                className={`h-7 px-1.5 rounded-md text-[12.5px] font-medium leading-none transition-colors ${openMenu === item
                  ? "bg-[var(--bg-muted)] text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
                  }`}
              >
                {item}
              </button>

              {openMenu === item ? (
                <div className="absolute left-0 top-full z-50 mt-1 min-w-[240px] rounded-sm border border-[var(--border-default)] bg-[var(--bg-overlay)] py-1.5 shadow-xl backdrop-blur-md">
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

      {/* Center: Back button + Search bar — Editor Mode only */}
      {currentMode === "editor" && (
        <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">

          <button
            type="button"
            onClick={() => openCommandPalette("files")}
            className="flex h-[22px] w-[220px] sm:w-[260px] md:w-[320px] lg:w-[380px] items-center gap-2 rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 text-[var(--text-secondary)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] transition-all hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] group"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 shrink-0 transition-opacity">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="text-[11px] font-medium tracking-tight opacity-60 group-hover:opacity-100 transition-opacity truncate">
              portfolio
            </span>
            <span className="ml-auto flex items-center gap-1 opacity-30 group-hover:opacity-50 shrink-0">
              <span className="rounded border border-[var(--border-default)] px-1 py-[1px] text-[9px] font-bold leading-none">CTRL</span>
              <span className="rounded border border-[var(--border-default)] px-1 py-[1px] text-[9px] font-bold leading-none">P</span>
            </span>
          </button>
        </div>
      )}

      {/* Right side — Mode specific controls */}
      <div className="flex h-full items-center">
        {currentMode === "editor" && (
          <>
            {/* Mode toggle toggle */}
            <button
              type="button"
              onClick={toggleMode}
              title={`Switch to Agent Mode`}
              className="hidden md:flex items-center gap-1 mr-2 px-2 h-[22px] rounded-md text-[11px] font-medium text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span>Editor</span>
            </button>

            {/* Panel toggle icons */}
            <div className="hidden md:flex items-center gap-[4px] mr-1.5">
              <button
                onClick={toggleSidebar}
                title="Toggle Sidebar"
                className={`w-[26px] h-[26px] flex items-center justify-center rounded-[4px] transition-all duration-200 ${sidebarOpen
                  ? "bg-[#2d2d2d] text-[var(--text-primary)] shadow-[0_0_8px_rgba(0,0,0,0.4)] border border-[#404040]"
                  : "text-[var(--text-muted)] hover:bg-[#2d2d2d] hover:text-[var(--text-primary)]"
                  }`}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="2" y="2" width="12" height="12" rx="1.5" />
                  <line x1="6" y1="2" x2="6" y2="14" />
                </svg>
              </button>
              <button
                onClick={toggleTerminal}
                title="Toggle Terminal"
                className={`w-[26px] h-[26px] flex items-center justify-center rounded-[4px] transition-all duration-200 ${terminalOpen
                  ? "bg-[#2d2d2d] text-[var(--text-primary)] shadow-[0_0_8px_rgba(0,0,0,0.4)] border border-[#404040]"
                  : "text-[var(--text-muted)] hover:bg-[#2d2d2d] hover:text-[var(--text-primary)]"
                  }`}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="2" y="2" width="12" height="12" rx="1.5" />
                  <line x1="2" y1="10" x2="14" y2="10" />
                </svg>
              </button>
              <button
                onClick={toggleAIPanel}
                title="Toggle AI Panel"
                className={`w-[26px] h-[26px] flex items-center justify-center rounded-[4px] transition-all duration-200 ${aiPanelOpen
                  ? "bg-[#2d2d2d] text-[var(--text-primary)] shadow-[0_0_10px_rgba(59,130,246,0.15)] border border-[#444444]"
                  : "text-[var(--text-muted)] hover:bg-[#2d2d2d] hover:text-[var(--text-primary)]"
                  }`}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="2" y="2" width="12" height="12" rx="1.5" />
                  <line x1="10" y1="2" x2="10" y2="14" />
                </svg>
              </button>
            </div>
          </>
        )}

        {currentMode === "agent" && (
          <button
            type="button"
            onClick={toggleMode}
            title={`Switch to Editor Mode`}
            className="flex items-center gap-1 mr-2 px-2 h-[22px] rounded-md text-[11px] font-medium text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span>Agent</span>
          </button>
        )}

        {/* Window controls */}
        <div className="flex h-full items-center">
          <button
            type="button"
            onClick={toggleSettings}
            title="Settings"
            className="mr-1 flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
          >
            <FaGear size={13} />
          </button>
          <WindowButton
            onClick={() => {}}
            title="Minimize"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
              <line x1="3" y1="8" x2="13" y2="8" />
            </svg>
          </WindowButton>
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
