"use client";

import CommandPalette from "@/components/CommandPalette";
import FileExplorer from "@/components/FileExplorer";
import SidebarAI from "@/components/SidebarAI";
import Terminal from "@/components/Terminal";
import TopBar from "@/components/TopBar";
import { useIDEStore } from "@/store/useIDEStore";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect } from "react";

export default function AppShell({ children }: { children: ReactNode }) {
  const theme = useIDEStore((state) => state.theme);
  const sidebarOpen = useIDEStore((state) => state.sidebarOpen);
  const aiPanelOpen = useIDEStore((state) => state.aiPanelOpen);
  const terminalOpen = useIDEStore((state) => state.terminalOpen);
  const openCommandPalette = useIDEStore((state) => state.openCommandPalette);
  const closeCommandPalette = useIDEStore((state) => state.closeCommandPalette);
  const toggleSidebar = useIDEStore((state) => state.toggleSidebar);
  const toggleTerminal = useIDEStore((state) => state.toggleTerminal);
  const toggleAIPanel = useIDEStore((state) => state.toggleAIPanel);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifier = event.ctrlKey || event.metaKey;
      const isDesktop = window.innerWidth >= 1024;

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
        toggleSidebar();
      }

      if (isModifier && event.shiftKey && event.key.toLowerCase() === "a") {
        event.preventDefault();

        if (!isDesktop) {
          toggleAIPanel();
        }

        window.setTimeout(() => {
          window.dispatchEvent(new Event("focus-ai-input"));
        }, 60);
      }

      if (event.key === "Escape") {
        closeCommandPalette();

        if (!isDesktop) {
          if (aiPanelOpen) {
            toggleAIPanel();
          }

          if (sidebarOpen) {
            toggleSidebar();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    aiPanelOpen,
    closeCommandPalette,
    openCommandPalette,
    sidebarOpen,
    toggleAIPanel,
    toggleSidebar,
    toggleTerminal,
  ]);

  return (
    <>
      <div
        className="grid h-screen grid-cols-1 overflow-hidden bg-[var(--bg-main)] text-[var(--text)] transition-[grid-template-rows] duration-200 lg:grid-cols-[260px_minmax(0,1fr)_300px]"
        style={{
          gridTemplateRows: terminalOpen
            ? "36px minmax(0, 1fr) 180px"
            : "36px minmax(0, 1fr) 0px",
        }}
      >
        <div className="col-start-1 row-start-1 min-w-0 lg:col-span-3">
          <TopBar />
        </div>

        <aside className="hidden min-h-0 min-w-0 border-r border-[var(--border)] bg-[var(--bg-main)] lg:col-start-1 lg:row-start-2 lg:block">
          <SidebarAI />
        </aside>

        <main className="col-start-1 row-start-2 min-h-0 min-w-0 bg-[var(--bg-main)] lg:col-start-2">
          {children}
        </main>

        <aside className="hidden min-h-0 min-w-0 border-l border-[var(--border)] bg-[var(--bg-main)] lg:col-start-3 lg:row-start-2 lg:block">
          <FileExplorer />
        </aside>

        <div className="col-start-1 row-start-3 min-h-0 min-w-0 overflow-hidden lg:col-span-3">
          <Terminal />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {aiPanelOpen ? (
          <motion.div
            key="mobile-ai"
            className="fixed inset-x-0 top-9 z-50 bg-black/45 lg:hidden"
            style={{ bottom: terminalOpen ? 180 : 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleAIPanel}
          >
            <motion.aside
              initial={{ x: -12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -12, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-y-0 left-0 w-[260px] border-r border-[var(--border)] bg-[var(--bg-main)]"
              onClick={(event) => event.stopPropagation()}
            >
              <SidebarAI />
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {sidebarOpen ? (
          <motion.div
            key="mobile-files"
            className="fixed inset-x-0 top-9 z-50 bg-black/45 lg:hidden"
            style={{ bottom: terminalOpen ? 180 : 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          >
            <motion.aside
              initial={{ x: 12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 12, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-y-0 right-0 w-[300px] border-l border-[var(--border)] bg-[var(--bg-main)]"
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
