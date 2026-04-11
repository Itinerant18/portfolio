"use client";

import { contactDetails } from "@/data/content";
import { defaultFilePath } from "@/data/files";
import { useIDEStore, type ThemeMode } from "@/store/useIDEStore";
import { motion } from "framer-motion";
import { FaGear } from "react-icons/fa6";
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
  VscCode,
  VscLayoutSidebarLeft,
  VscSearch,
  VscTerminal,
} from "react-icons/vsc";
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
      className={`touch-target flex h-9 w-11 items-center justify-center transition-colors ${close
        ? "hover:bg-[var(--danger)] hover:text-white"
        : "hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
        } text-[var(--text-muted)] rounded-none`}
    >
      {children}
    </button>
  );
}

function LiveClock() {
  const [t, setT] = useState(() => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
  useEffect(() => { const id = setInterval(() => setT(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })), 1000); return () => clearInterval(id); }, []);
  return <span className="type-mono-sm text-[var(--text-muted)] tabular-nums hidden lg:block">{t}</span>;
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
  const toggleMobileSidebar = useIDEStore((state) => state.toggleMobileSidebar);
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
    <header
      className="relative flex h-9 shrink-0 items-center justify-between border-b border-[var(--border-10)] bg-[var(--bg-base)]/85 pl-0.5 pr-2 select-none backdrop-blur-[12px]"
      style={{ WebkitBackdropFilter: "blur(12px)" }}
    >
      {/* Left: Logo + Menu items */}
      <div ref={menuRef} className="flex min-w-0 items-center gap-1.5 pl-1.5">
        <div className="flex h-5 w-5 items-center justify-center pointer-events-none">
          <img 
            src="https://img.icons8.com/?size=32&id=LhC2HfftBElY&format=png" 
            alt="Cursor AI Logo" 
            className="h-full w-full object-contain"
          />
        </div>

        <button
          type="button"
          className="touch-target flex md:hidden h-6 w-6 items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          onClick={toggleMobileSidebar}
          aria-label="Open menu"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <line x1="1" y1="3.5" x2="13" y2="3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="1" y1="10.5" x2="13" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <nav
          className="hidden items-center gap-0.5 lg:flex ml-1 backdrop-blur-[12px]"
          style={{ WebkitBackdropFilter: "blur(12px)" }}
        >
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
                className={`type-sys-caption h-7 px-1.5 rounded-md leading-none transition-[color_150ms_ease] ${openMenu === item
                  ? "bg-[var(--bg-muted)] text-[var(--accent)]"
                  : "text-[var(--text-primary)] hover:bg-[var(--bg-muted)] hover:text-[var(--accent)]"
                  }`}
              >
                {item}
              </button>

              {openMenu === item ? (
                <div className="absolute left-0 top-full z-50 mt-1 min-w-[240px] rounded-sm border border-[var(--border-default)] bg-[var(--bg-overlay)] py-1.5 shadow-[var(--shadow-card)] backdrop-blur-md">
                  {menuActions[item].map((action, i) => {
                    if (action.type === "divider") {
                      return <div key={i} className="my-1 border-t border-[var(--border-default)]" />;
                    }
                    if (action.type === "header") {
                      return (
                        <div key={i} className="type-sys-micro mb-0.5 px-3.5 py-1.5 text-[var(--text-disabled)]">
                          {action.label}
                        </div>
                      );
                    }
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => void handleMenuAction(action)}
                        className={`type-btn group flex h-8 w-full items-center justify-between gap-4 px-3.5 text-left transition mx-0 ${action.className
                          ? action.className
                          : "text-[var(--text-secondary)] hover:bg-[var(--accent)] hover:text-white"
                          }`}
                      >
                        <span className="font-medium">{action.label}</span>
                        {action.shortcut ? (
                          <span className={`${action.className ? '' : 'text-[var(--text-disabled)] group-hover:text-white/80'} type-mono-sm tracking-tighter`}>
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

      {/* Center: Search / title */}
      {currentMode === "editor" ? (
        <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => openCommandPalette("files")}
            className="group flex h-[22px] w-[min(64vw,380px)] min-w-[160px] items-center gap-2 rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 text-[var(--text-secondary)] shadow-[var(--shadow-ambient)] transition-all hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] sm:min-w-[220px]"
          >
            <VscSearch size={13} className="shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="min-w-0 cursor-pointer"
            >
              <span className="gradient-text cursor-pointer type-ui leading-none">
                Aniket.site
              </span>
            </motion.div>
            <span className="ml-auto hidden shrink-0 items-center gap-1 opacity-30 group-hover:opacity-50 sm:flex">
              <span className="rounded border border-[var(--border-default)] px-1 py-[1px] text-[9px] font-bold leading-none">CTRL</span>
              <span className="rounded border border-[var(--border-default)] px-1 py-[1px] text-[9px] font-bold leading-none">P</span>
            </span>
          </button>
        </div>
      ) : (
        <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <span className="gradient-text cursor-pointer type-ui leading-none">
              Aniket.site
            </span>          </motion.div>
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
              className="type-caption hidden md:flex items-center gap-1 mr-2 px-2 h-[22px] rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span>Editor</span>
            </button>

            {/* Panel toggle icons */}
            <div className="hidden md:flex items-center gap-[4px] mr-1.5">
              <button
                onClick={toggleSidebar}
                title="Toggle Sidebar"
                className={`touch-target w-[26px] h-[26px] flex items-center justify-center rounded-[4px] transition-all duration-200 ${sidebarOpen
                  ? "bg-[var(--bg-muted)] text-[var(--text-primary)] border border-[var(--border-default)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
                  }`}
              >
                <VscCode size={14} />
              </button>
              <button
                onClick={toggleTerminal}
                title="Toggle Terminal"
                className={`touch-target w-[26px] h-[26px] flex items-center justify-center rounded-[4px] transition-all duration-200 ${terminalOpen
                  ? "bg-[var(--bg-muted)] text-[var(--text-primary)] border border-[var(--border-default)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
                  }`}
              >
                <VscTerminal size={14} />
              </button>
              <button
                onClick={toggleAIPanel}
                title="Toggle AI Panel"
                className={`touch-target w-[26px] h-[26px] flex items-center justify-center rounded-[4px] transition-all duration-200 ${aiPanelOpen
                  ? "bg-[var(--bg-muted)] text-[var(--text-primary)] border border-[var(--border-default)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
                  }`}
              >
                <VscLayoutSidebarLeft size={14} />
              </button>
            </div>
          </>
        )}

        {currentMode === "agent" && (
          <button
            type="button"
            onClick={toggleMode}
            title={`Switch to Editor Mode`}
            className="type-caption flex items-center gap-1 mr-2 px-2 h-[22px] rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span>Agent</span>
          </button>
        )}



        <div className="mr-2">
          <LiveClock />
        </div>

        {/* Window controls */}
        <div className="flex h-full items-center">
          <button
            type="button"
            onClick={toggleSettings}
            title="Settings"
            className="touch-target mr-1 flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
          >
            <FaGear size={13} />
          </button>
          <WindowButton
            onClick={() => {}}
            title="Minimize"
          >
            <VscChromeMinimize size={12} />
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
            <VscChromeMaximize size={12} />
          </WindowButton>
          <WindowButton close onClick={() => setOpenMenu(null)}>
            <VscChromeClose size={12} />
          </WindowButton>
        </div>
      </div>
    </header>
  );
}
