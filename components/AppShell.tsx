"use client";

import CommandPalette from "@/components/CommandPalette";
import FileExplorer from "@/components/FileExplorer";
import SettingsOverlay from "@/components/SettingsOverlay";
import SidebarAI from "@/components/SidebarAI";
import Terminal from "@/components/Terminal";
import TopBar from "@/components/TopBar";
import StatusBar from "@/components/StatusBar";
import VantaBackground from "@/components/ui/VantaBackground";
import LenisProvider from "@/components/ui/LenisProvider";
import { useIDEStore } from "@/store/useIDEStore";
import { AnimatePresence, motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { VscFiles, VscSearch, VscSourceControl, VscExtensions, VscSparkle, VscTerminal, VscClose } from "react-icons/vsc";
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function AppShell({ children }: { children: ReactNode }) {
  const hasHydrated = useIDEStore((state) => state.hasHydrated);
  const currentMode = useIDEStore((state) => state.currentMode);
  const theme = useIDEStore((state) => state.theme);
  const sidebarOpen = useIDEStore((state) => state.sidebarOpen);
  const aiPanelOpen = useIDEStore((state) => state.aiPanelOpen);
  const mobileSidebarOpen = useIDEStore((state) => state.mobileSidebarOpen);
  const mobileAIPanelOpen = useIDEStore((state) => state.mobileAIPanelOpen);
  const terminalOpen = useIDEStore((state) => state.terminalOpen);
  const zoomLevel = useIDEStore((state) => state.zoomLevel);
  const zoomIn = useIDEStore((state) => state.zoomIn);
  const zoomOut = useIDEStore((state) => state.zoomOut);
  const toggleTheme = useIDEStore((state) => state.toggleTheme);
  const openCommandPalette = useIDEStore((state) => state.openCommandPalette);
  const closeCommandPalette = useIDEStore((state) => state.closeCommandPalette);
  const toggleMobileSidebar = useIDEStore((state) => state.toggleMobileSidebar);
  const toggleTerminal = useIDEStore((state) => state.toggleTerminal);
  const toggleAIPanel = useIDEStore((state) => state.toggleAIPanel);
  const toggleMobileAIPanel = useIDEStore((state) => state.toggleMobileAIPanel);
  const closeMobilePanels = useIDEStore((state) => state.closeMobilePanels);
  const toggleSidebar = useIDEStore((state) => state.toggleSidebar);
  const [isMounted, setIsMounted] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [showSocials, setShowSocials] = useState(false);
  const isMobile = viewportWidth < 600;
  const isTablet = viewportWidth >= 600 && viewportWidth < 900;
  const isDesktop = viewportWidth >= 900;

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Aniket_resume_updated.pdf";
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const socialLinks = [
    { icon: FaGithub, label: "GitHub", href: "https://github.com/Itinerant18", color: "#e6edf3" },
    { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/itinerant018", color: "#0a66c2" },
    { icon: FaEnvelope, label: "Email", href: "mailto:itinerant018@gmail.com", color: "#ea4335" },
    { icon: FaInstagram, label: "Instagram", href: "https://instagram.com/itinerant018", color: "#e4405f" },
    { icon: FaYoutube, label: "YouTube", href: "https://youtube.com/@itinerant018", color: "#ff0000" },
    { icon: SiLeetcode, label: "LeetCode", href: "https://leetcode.com/itinerant018", color: "#f89f1b" },
  ];
  const mobileNavItems = [
    {
      key: "ai",
      label: "AI",
      active: mobileAIPanelOpen,
      onClick: () => {
        closeMobilePanels();
        toggleMobileAIPanel();
      },
      icon: VscSparkle,
    },
    {
      key: "search",
      label: "Search",
      active: false,
      onClick: () => openCommandPalette("files"),
      icon: VscSearch,
    },
    {
      key: "terminal",
      label: "Terminal",
      active: terminalOpen,
      onClick: toggleTerminal,
      icon: VscTerminal,
    },
    {
      key: "files",
      label: "Files",
      active: mobileSidebarOpen,
      onClick: () => {
        closeMobilePanels();
        toggleMobileSidebar();
      },
      icon: VscFiles,
    },
  ] as const;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    setIsMounted(true);
    const updateViewport = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifier = event.ctrlKey || event.metaKey;
      const isDesktop = window.innerWidth >= 1024;
      const state = useIDEStore.getState();

      if (isModifier && event.key === "=") {
        event.preventDefault();
        state.zoomIn();
      }

      if (isModifier && event.key === "-") {
        event.preventDefault();
        state.zoomOut();
      }

      if (isModifier && event.key.toLowerCase() === "k") {
        event.preventDefault();
        state.openCommandPalette("commands");
      }

      if (isModifier && event.key.toLowerCase() === "p") {
        event.preventDefault();
        state.openCommandPalette("files");
      }

      if (isModifier && event.key === "`") {
        event.preventDefault();
        state.toggleTerminal();
      }

      if (isModifier && event.shiftKey && event.key.toLowerCase() === "t") {
        event.preventDefault();
        state.toggleTheme();
      }

      if (isModifier && event.key.toLowerCase() === "b" && !isDesktop) {
        event.preventDefault();
        state.toggleMobileSidebar();
      }

      if (isModifier && event.shiftKey && event.key.toLowerCase() === "a") {
        event.preventDefault();

        if (isDesktop) {
          if (!state.aiPanelOpen) {
            state.toggleAIPanel();
          }
        } else {
          state.toggleMobileAIPanel();
        }

        window.setTimeout(() => {
          window.dispatchEvent(new Event("focus-ai-input"));
        }, 60);
      }

      if (isModifier && event.shiftKey && event.key.toLowerCase() === "m") {
        event.preventDefault();
        state.toggleMode();
      }

      if (event.key === "Escape") {
        state.closeCommandPalette();

        if (!isDesktop) {
          state.closeMobilePanels();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme]);

  const gridTemplateColumns =
    currentMode === "agent"
      ? "1fr"
      : isDesktop
      ? [aiPanelOpen ? "260px" : null, "minmax(0, 1fr)", sidebarOpen ? "300px" : null]
          .filter(Boolean)
          .join(" ")
      : isTablet && aiPanelOpen
      ? "220px minmax(0,1fr)"
      : "1fr";

  const terminalRow = terminalOpen ? "clamp(120px,18vh,180px)" : "0px";
  const gridTemplateRows = `36px minmax(0,1fr) ${terminalRow} 22px`;

  if (!isMounted || !hasHydrated) {
    return (
      <div className="relative h-screen overflow-hidden">
        <VantaBackground />
        <div
          className="relative z-10 grid h-screen overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]"
          style={{ gridTemplateRows: "36px minmax(0,1fr) 22px" }}
        >
          <div className="border-b border-[var(--border-default)] bg-[var(--bg-base)]" />
          <div className="bg-[var(--bg-surface)]" />
          <div className="border-t border-[var(--border-default)] bg-[var(--bg-elevated)]" />
        </div>
      </div>
    );
  }

  return (
    <>
      <LenisProvider />
      <VantaBackground />
      <div
        className="relative z-10 grid h-screen overflow-hidden grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)_300px] bg-[var(--bg-base)] text-[var(--text-primary)] transition-[grid-template-columns,grid-template-rows] duration-200"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: "0 0",
          width: `${100 / zoomLevel}%`,
          height: `${100 / zoomLevel}%`,
          gridTemplateColumns,
          gridTemplateRows,
        } as CSSProperties}
      >
        <div
          className="col-start-1 row-start-1 min-w-0"
          style={{ gridColumn: "1 / -1" }}
        >
          <TopBar />
        </div>



        {currentMode === "agent" ? (
          <main
            className="min-h-0 min-w-0 bg-[var(--bg-surface)]"
            style={{
              gridColumn: "1 / -1",
              gridRow: "2 / 3",
            }}
          >
            <SidebarAI mode="full" />
          </main>
        ) : (
          <main
            className="min-h-0 min-w-0 bg-[var(--bg-surface)]"
            style={{
              gridColumn: isDesktop
                ? (aiPanelOpen ? "2 / 3" : "1 / 2")
                : isTablet && aiPanelOpen
                ? "2 / 3"
                : "1 / -1",
              gridRow: "2 / 3",
            }}
          >
            {children}
          </main>
        )}

        {currentMode === "editor" && aiPanelOpen && (
          <aside
            className="hidden min-h-0 min-w-0 border-r border-[var(--border-default)] bg-[var(--bg-elevated)] md:block"
            style={{
              gridRow: "2 / 4"
            }}
          >
            <SidebarAI />
          </aside>
        )}

        {currentMode === "editor" && sidebarOpen ? (
          <aside
            className="hidden min-h-0 min-w-0 border-l border-[var(--border-default)] bg-[var(--bg-elevated)] lg:flex lg:flex-col"
            style={{
              gridColumn: isDesktop
                ? (aiPanelOpen ? "3 / 4" : "2 / 3")
                : undefined,
              gridRow: "2 / 4"
            }}
          >
            {/* Activity Bar — refined horizontal header for the explorer */}
            <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-[var(--border-default)] bg-[var(--bg-elevated)] shrink-0 select-none">
              <div className="type-sys-micro text-[var(--text-muted)] px-1">
                Explorer
              </div>
              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => openCommandPalette("files")}
                  title="Search files..."
                  className="p-1 rounded-sm text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-all"
                >
                  <VscSearch size={16} />
                </button>
                <button
                  onClick={() => setShowSocials(!showSocials)}
                  title="Source Control — Social Links"
                  className={`p-1 rounded-sm transition-all ${showSocials ? "bg-[var(--accent)]/15 text-[var(--accent)]" : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"}`}
                >
                  <VscSourceControl size={16} />
                </button>
                <button
                  onClick={downloadResume}
                  title="Extensions — Download Resume"
                  className="p-1 rounded-sm text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-all"
                >
                  <VscExtensions size={16} />
                </button>
                <div className="mx-1 h-3 w-[1px] bg-[var(--border-default)] opacity-50" />
                <button
                  onClick={() => toggleSidebar()}
                  title="Hide Sidebar"
                  className="p-1 rounded-sm text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-all"
                >
                  <VscClose size={16} />
                </button>
              </div>
            </div>

            {/* Social Links Panel — shown when Source Control is active */}
            {showSocials && (
              <div className="border-b border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-3 shrink-0">
                <div className="type-sys-micro text-[var(--text-muted)] mb-2.5 px-0.5">
                  Connect
                </div>
                <div className="flex flex-col gap-1">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-btn flex items-center gap-2.5 rounded-sm px-2 py-1.5 text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
                    >
                      <link.icon size={14} style={{ color: link.color }} />
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
            {/* File Explorer */}
            <div className="flex-1 min-h-0 overflow-auto">
              <FileExplorer />
            </div>
          </aside>
        ) : null}

        <div
          className="min-h-0 min-w-0 overflow-hidden border-t border-[var(--border-default)]"
          style={{
            gridRow: "3 / 4",
            gridColumn: isDesktop
              ? (currentMode === "agent"
                  ? "1 / -1"
                  : aiPanelOpen
                    ? "2 / 3"
                    : "1 / 2")
              : "1 / -1",
          }}
        >
          <Terminal />
        </div>

        <div
          className="col-start-1 row-start-4 min-h-0 min-w-0"
          style={{ gridColumn: "1 / -1" }}
        >
          <StatusBar />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileAIPanelOpen ? (
          <motion.div
            key="mobile-ai"
            className="fixed inset-x-0 top-9 z-50 bg-black/45 md:hidden"
            style={{ bottom: terminalOpen ? "clamp(120px,18vh,180px)" : 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileAIPanel}
          >
            <motion.aside
              initial={{ x: -12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -12, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-y-0 left-0 w-full border-r border-[var(--border-default)] bg-[var(--bg-elevated)]"
              onClick={(event) => event.stopPropagation()}
            >
              <SidebarAI />
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {mobileSidebarOpen ? (
          <motion.div
            key="mobile-files"
            className="fixed inset-x-0 top-9 z-50 bg-black/45 md:hidden"
            style={{ bottom: terminalOpen ? "clamp(120px,18vh,180px)" : 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileSidebar}
          >
            <motion.aside
              initial={{ x: 12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 12, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-y-0 right-0 w-full border-l border-[var(--border-default)] bg-[var(--bg-elevated)]"
              onClick={(event) => event.stopPropagation()}
            >
              <FileExplorer />
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex h-12 items-center border-t border-[var(--border-default)] bg-[var(--bg-elevated)] md:hidden">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.key}
              type="button"
              onClick={item.onClick}
              className={`type-caption flex h-full flex-1 flex-col items-center justify-center gap-0.5 transition-colors ${
                item.active
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <CommandPalette />
      <SettingsOverlay />
    </>
  );
}
