"use client";

import { getPortfolioFile } from "@/data/files";
import { useIDEStore } from "@/store/useIDEStore";
import { AnimatePresence, motion } from "framer-motion";
import { VscClose } from "react-icons/vsc";

export default function EditorTabs() {
  const openFiles = useIDEStore((state) => state.openFiles);
  const activeFile = useIDEStore((state) => state.activeFile);
  const setActiveFile = useIDEStore((state) => state.setActiveFile);
  const closeFile = useIDEStore((state) => state.closeFile);

  return (
    <div className="h-9 border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
      <div className="ide-scrollbar flex h-full overflow-x-auto overflow-y-hidden">
        <AnimatePresence initial={false}>
          {openFiles.length ? (
            openFiles.map((path) => {
              const file = getPortfolioFile(path);

              if (!file) {
                return null;
              }

              const isActive = path === activeFile;

              return (
                <motion.div
                  key={path}
                  layout
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className={`group relative flex h-full min-w-[120px] max-w-[200px] items-center border-r border-[var(--border-default)] text-[12px] transition-all ${isActive
                      ? "bg-[var(--bg-surface)] text-[var(--text-primary)]"
                      : "bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-secondary)]"
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFile(path)}
                    className="min-w-0 flex-1 px-3 h-full text-left font-medium truncate"
                  >
                    {file.name}
                  </button>
                  <button
                    type="button"
                    aria-label={`Close ${file.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      closeFile(path);
                    }}
                    className={`mr-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-[var(--text-muted)] transition-opacity hover:bg-[var(--border-default)] hover:text-[var(--text-primary)] ${isActive ? "opacity-50 group-hover:opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  >
                    <VscClose size={14} />
                  </button>
                  {isActive ? (
                    <motion.span
                      layoutId="active-tab-line"
                      className="absolute inset-x-0 top-0 h-[2px] bg-[var(--accent)]"
                    />
                  ) : null}
                </motion.div>
              );
            })
          ) : (
            <div className="flex h-full items-center px-4 text-[11px] font-bold uppercase tracking-widest text-[var(--text-disabled)] italic">
              No active editor
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
