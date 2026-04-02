"use client";

import { getPortfolioFile } from "@/data/files";
import { useIDEStore } from "@/store/useIDEStore";
import { AnimatePresence, motion } from "framer-motion";

// Language badge colors consistent with FileExplorer icons
const langColor: Record<string, string> = {
  tsx: "text-[#79c0ff]",
  ts: "text-[#7ee787]",
  json: "text-[#ffa657]",
};

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
                    className="flex min-w-0 flex-1 items-center gap-1.5 px-2 text-left"
                  >
                    {/* Language dot indicator */}
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        isActive ? "bg-[var(--accent)]" : "bg-[var(--text-muted)] opacity-50"
                      }`}
                    />
                    <span className="block truncate">{file.name}</span>
                    {/* Language label */}
                    <span className={`ml-0.5 shrink-0 text-[10px] ${langColor[file.language] ?? "text-[var(--text-muted)]"}`}>
                      .{file.language}
                    </span>
                  </button>

                  {/* BUG FIX #3: Was showing literal "x" text — visually bad.
                      Now uses the proper × character with correct ARIA label. */}
                  <button
                    type="button"
                    aria-label={`Close ${file.name}`}
                    title={`Close ${file.name} (Ctrl+W)`}
                    onClick={() => closeFile(path)}
                    className="mr-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded text-[var(--text-muted)] opacity-60 transition hover:bg-[var(--bg-hover)] hover:opacity-100 hover:text-[var(--text)]"
                  >
                    ×
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
              No open tabs — use Ctrl+P to open a file
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
