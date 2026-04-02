"use client";

import { useIDEStore } from "@/store/useIDEStore";
import TopBar from "@/components/TopBar";
import SidebarAI from "@/components/SidebarAI";
import FileExplorer from "@/components/FileExplorer";
import EditorTabs from "@/components/EditorTabs";
import CodeEditor from "@/components/CodeEditor";
import Terminal from "@/components/Terminal";
import CommandPalette from "@/components/CommandPalette";
import { useEffect, useState } from "react";

export default function HomePage() {
  const sidebarOpen = useIDEStore((state) => state.sidebarOpen);
  const aiPanelOpen = useIDEStore((state) => state.aiPanelOpen);
  const splitView = useIDEStore((state) => state.splitView);
  const openCommandPalette = useIDEStore((state) => state.openCommandPalette);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        openCommandPalette("files");
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openCommandPalette("commands");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openCommandPalette]);

  if (!mounted) return null;

  return (
    <main className="flex h-screen w-screen flex-col overflow-hidden bg-[var(--bg-app)] select-none">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left: AI/Chat Panel - Cursor Signature */}
        {aiPanelOpen && (
          <aside className="w-[280px] shrink-0 border-r border-[var(--border)] bg-[var(--bg-sidebar)] flex flex-col">
            <SidebarAI />
          </aside>
        )}

        {/* Center: Editor Workspace */}
        <section className="flex flex-1 flex-col overflow-hidden min-w-0 bg-[var(--bg-editor)]">
          <div className="flex flex-1 flex-col overflow-hidden border-b border-[var(--border)]">
            <EditorTabs />
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <CodeEditor />
              </div>
              {splitView && (
                <div className="flex-1 border-l border-[var(--border)] overflow-hidden">
                  <CodeEditor />
                </div>
              )}
            </div>
          </div>
          <Terminal />
        </section>

        {/* Right: Project Explorer */}
        {sidebarOpen && (
          <aside className="w-[240px] shrink-0 border-l border-[var(--border)] bg-[var(--bg-sidebar)] flex flex-col">
            <FileExplorer />
          </aside>
        )}
      </div>

      <CommandPalette />
    </main>
  );
}
