"use client";

import { getPortfolioFile } from "@/data/files";
import { useIDEStore } from "@/store/useIDEStore";
import { AnimatePresence, motion } from "framer-motion";

export default function EditorTabs() {
  const openFiles = useIDEStore((state) => state.openFiles);
  const activeFile = useIDEStore((state) => state.activeFile);
  const setActiveFile = useIDEStore((state) => state.setActiveFile);
  const closeFile = useIDEStore((state) => state.closeFile);

  return (
    <div className="h-9 border-b border-[var(--border)] bg-[var(--bg-panel)]">
      <div className="ide-scrollbar flex h-full overflow-x-auto">
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`relative flex h-full min-w-0 items-center border-r border-[var(--border)] text-[12px] leading-none transition ${
                    isActive
                      ? "bg-[var(--bg-main)] text-[var(--text)]"
                      : "bg-[var(--bg-panel)] text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFile(path)}
                    className="min-w-0 flex-1 px-2 text-left"
                  >
                    <span className="block truncate">{file.name}</span>
                  </button>
                  <button
                    type="button"
                    aria-label={`Close ${file.name}`}
                    onClick={() => closeFile(path)}
                    className="mr-2 flex h-4 w-4 shrink-0 items-center justify-center text-[12px] leading-none text-[var(--text-muted)] transition hover:text-[var(--text)]"
                  >
                    x
                  </button>
                  {isActive ? (
                    <motion.span
                      layoutId="active-tab-line"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--accent)]"
                    />
                  ) : null}
                </motion.div>
              );
            })
          ) : (
            <div className="flex h-full items-center px-2 text-[12px] leading-none text-[var(--text-muted)]">
              No open tabs
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
