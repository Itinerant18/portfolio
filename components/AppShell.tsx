"use client";

import CommandPalette from "@/components/CommandPalette";
import FileExplorer from "@/components/FileExplorer";
import SidebarAI from "@/components/SidebarAI";
import Terminal from "@/components/Terminal";
import TopBar from "@/components/TopBar";
import StatusBar from "@/components/StatusBar";
import { useIDEStore } from "@/store/useIDEStore";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export default function AppShell({ children }: { children: ReactNode }) {
  const theme = useIDEStore((state) => state.theme);
  const sidebarOpen = useIDEStore((state) => state.sidebarOpen);
  const aiPanelOpen = useIDEStore((state) => state.aiPanelOpen);
  const mobileSidebarOpen = useIDEStore((state) => state.mobileSidebarOpen);
  const mobileAIPanelOpen = useIDEStore((state) => state.mobileAIPanelOpen);
  const terminalOpen = useIDEStore((state) => state.terminalOpen);
  const zoomLevel = useIDEStore((state) => state.zoomLevel);
  const zoomIn = useIDEStore((state) => state.zoomIn);
  const zoomOut = useIDEStore((state) => state.zoomOut);
  const openCommandPalette = useIDEStore((state) => state.openCommandPalette);
  const closeCommandPalette = useIDEStore((state) => state.closeCommandPalette);
  const toggleMobileSidebar = useIDEStore((state) => state.toggleMobileSidebar);
  const toggleTerminal = useIDEStore((state) => state.toggleTerminal);
  const toggleAIPanel = useIDEStore((state) => state.toggleAIPanel);
  const toggleMobileAIPanel = useIDEStore((state) => state.toggleMobileAIPanel);
  const closeMobilePanels = useIDEStore((state) => state.closeMobilePanels);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const updateViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifier = event.ctrlKey || event.metaKey;
      const isDesktop = window.innerWidth >= 1024;

      if (isModifier && event.key === "=") {
        event.preventDefault();
        zoomIn();
      }

      if (isModifier && event.key === "-") {
        event.preventDefault();
        zoomOut();
      }

      if (isModifier && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openCommandPalette("commands");
      }

      if (isModifier && event.key.toLowerCase() === "p") {
        event.preventDefault();
        openCommandPalette("files");
      }

      if (isModifier && event.key === "`") {
        event.preventDefault();
        toggleTerminal();
      }

      if (isModifier && event.key.toLowerCase() === "b" && !isDesktop) {
        event.preventDefault();
        toggleMobileSidebar();
      }

      if (isModifier && event.shiftKey && event.key.toLowerCase() === "a") {
        event.preventDefault();

        if (isDesktop) {
          if (!aiPanelOpen) {
            toggleAIPanel();
          }
        } else {
          toggleMobileAIPanel();
        }

        window.setTimeout(() => {
          window.dispatchEvent(new Event("focus-ai-input"));
        }, 60);
      }

      if (event.key === "Escape") {
        closeCommandPalette();

        if (!isDesktop) {
          closeMobilePanels();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    aiPanelOpen,
    closeCommandPalette,
    closeMobilePanels,
    openCommandPalette,
    sidebarOpen,
    toggleAIPanel,
    toggleMobileAIPanel,
    toggleMobileSidebar,
    toggleTerminal,
    zoomIn,
    zoomOut,
  ]);

  const gridTemplateColumns = !isDesktop
    ? "1fr"
    : [
        aiPanelOpen ? "260px" : null,
        "minmax(0, 1fr)",
        sidebarOpen ? "300px" : null,
      ]
        .filter(Boolean)
        .join(" ");

  const gridTemplateRows = [
    "36px", // TopBar
    "minmax(0, 1fr)", // Main content
    terminalOpen ? "180px" : "0px", // Terminal
    "22px", // StatusBar
  ].join(" ");

  return (
    <>
      <div
        className="grid h-screen overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)] transition-[grid-template-columns,grid-template-rows] duration-200"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: "0 0",
          width: `${100 / zoomLevel}%`,
          height: `${100 / zoomLevel}%`,
          gridTemplateColumns,
          gridTemplateRows,
        } as React.CSSProperties}
      >
        <div className="col-start-1 row-start-1 min-w-0" style={{ gridColumn: "1 / -1" }}>
          <TopBar />
        </div>

        {aiPanelOpen ? (
          <aside
            className="hidden min-h-0 min-w-0 border-r border-[var(--border-default)] bg-[var(--bg-elevated)] lg:col-start-1 lg:block"
            style={{
               gridRow: "2 / 4"
            }}
          >
            <SidebarAI />
          </aside>
        ) : null}

        <main
          className="min-h-0 min-w-0 bg-[var(--bg-surface)]"
          style={{
            gridColumn: isDesktop ? (aiPanelOpen ? "2 / 3" : "1 / 2") : "1 / -1",
            gridRow: "2 / 3",
          }}
        >
          {children}
        </main>

        {sidebarOpen ? (
          <aside
            className="hidden min-h-0 min-w-0 border-l border-[var(--border-default)] bg-[var(--bg-elevated)] lg:block"
            style={{
              gridColumn: isDesktop 
                ? (aiPanelOpen ? "3 / 4" : "2 / 3") 
                : undefined,
              gridRow: "2 / 4"
            }}
          >
            <FileExplorer />
          </aside>
        ) : null}

        <div
          className="min-h-0 min-w-0 overflow-hidden border-t border-[var(--border-default)]"
          style={{
            gridRow: "3 / 4",
            gridColumn: isDesktop ? (aiPanelOpen ? "2 / 3" : "1 / 2") : "1 / -1",
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
            className="fixed inset-x-0 top-9 z-50 bg-black/45 lg:hidden"
            style={{ bottom: terminalOpen ? 180 : 0 }}
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
              className="absolute inset-y-0 left-0 w-[260px] border-r border-[var(--border)] bg-[var(--sidebar)]"
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
            className="fixed inset-x-0 top-9 z-50 bg-black/45 lg:hidden"
            style={{ bottom: terminalOpen ? 180 : 0 }}
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
              className="absolute inset-y-0 right-0 w-[300px] border-l border-[var(--border)] bg-[var(--sidebar)]"
              onClick={(event) => event.stopPropagation()}
            >
              <FileExplorer />
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <CommandPalette />
    </>
  );
}
