"use client";

import { type IDEFile } from "@/data/files";
import { useIDEStore } from "@/store/useIDEStore";
import {
  createCommandDescriptors,
  searchPortfolioFiles,
  type CommandDescriptor,
} from "@/utils/commands";
import { AnimatePresence, motion } from "framer-motion";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import {
  VscFile,
  VscSymbolMethod,
  VscSparkle,
  VscMarkdown,
  VscJson,
  VscCode,
  VscFilePdf,
} from "react-icons/vsc";

type PaletteEntry =
  | {
    kind: "copilot";
    value: { title: string; shortcut: string };
  }
  | {
    kind: "command";
    value: CommandDescriptor;
  }
  | {
    kind: "file";
    value: IDEFile;
  };

const FileIcon = ({ name, className }: { name: string; className?: string }) => {
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "md":
      return <VscMarkdown className={className} />;
    case "json":
      return <VscJson className={className} />;
    case "pdf":
      return <VscFilePdf className={className} />;
    case "tsx":
    case "ts":
    case "js":
    case "jsx":
    case "html":
      return <VscCode className={className} />;
    default:
      return <VscFile className={className} />;
  }
};

export default function CommandPalette() {
  const isOpen = useIDEStore((state) => state.commandPaletteOpen);
  const paletteMode = useIDEStore((state) => state.paletteMode);
  const searchQuery = useIDEStore((state) => state.searchQuery);
  const closeCommandPalette = useIDEStore((state) => state.closeCommandPalette);
  const openCommandPalette = useIDEStore((state) => state.openCommandPalette);
  const openFile = useIDEStore((state) => state.openFile);
  const focusAIPanel = useIDEStore((state) => state.focusAIPanel);
  const setSearchQuery = useIDEStore((state) => state.setSearchQuery);
  const toggleTheme = useIDEStore((state) => state.toggleTheme);
  const toggleTerminal = useIDEStore((state) => state.toggleTerminal);
  const closeAllTabs = useIDEStore((state) => state.closeAllTabs);
  const deferredQuery = useDeferredValue(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const commands = useMemo(
    () =>
      createCommandDescriptors({
        toggleTheme,
        toggleTerminal,
        focusAIPanel: () => {
          focusAIPanel();
          window.setTimeout(() => {
            window.dispatchEvent(new Event("focus-ai-input"));
          }, 60);
        },
        openFileSearch: () => openCommandPalette("files"),
        closeAllTabs,
      }),
    [closeAllTabs, focusAIPanel, openCommandPalette, toggleTerminal, toggleTheme],
  );

  const items = useMemo<PaletteEntry[]>(() => {
    const list: PaletteEntry[] = [];

    // Always add Copilot at the top if it matches or if search is empty
    const copilotMatch = "copilot".includes(deferredQuery.toLowerCase());
    if (deferredQuery === "" || copilotMatch) {
      list.push({
        kind: "copilot",
        value: { title: "Open Aniket's Copilot", shortcut: "Ctrl+Shift+C" },
      });
    }

    if (paletteMode === "files") {
      const files = searchPortfolioFiles(deferredQuery).map((file) => ({
        kind: "file" as const,
        value: file,
      }));
      list.push(...files);
    } else {
      const normalized = deferredQuery.trim().toLowerCase();
      const matchedCommands = commands
        .filter((command) =>
          normalized
            ? `${command.title} ${command.description}`.toLowerCase().includes(normalized)
            : true,
        )
        .map((command) => ({
          kind: "command" as const,
          value: command,
        }));
      list.push(...matchedCommands);
    }

    return list;
  }, [commands, deferredQuery, paletteMode]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setActiveIndex(0);
    const timeoutId = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(timeoutId);
  }, [isOpen, paletteMode]);

  useEffect(() => {
    setActiveIndex(0);
  }, [deferredQuery, paletteMode]);

  function handleSelect(entry: PaletteEntry) {
    if (entry.kind === "copilot") {
      focusAIPanel();
      closeCommandPalette();
      return;
    }
    if (entry.kind === "file") {
      openFile(entry.value.path);
      closeCommandPalette();
      return;
    }

    entry.value.run();

    if (entry.value.id !== "open-file") {
      closeCommandPalette();
    }
  }

  // Helper to format path as directory
  const formatPath = (path: string) => {
    const parts = path.split("/");
    if (parts.length <= 1) return "./";
    return parts.slice(0, -1).join("/") + "/";
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div
           className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-[1px] px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCommandPalette}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.99, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99, y: -4 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className="flex w-full max-w-[640px] flex-col overflow-hidden rounded-[8px] border border-[var(--border-default)] bg-[var(--bg-overlay)] shadow-[var(--shadow-card)]"
          >
            {/* Header: Input Area */}
            <div className="flex items-center gap-3 bg-[var(--bg-overlay)] px-4 py-[11px]">
              <span className="flex items-center text-[15px] leading-none text-[var(--text-muted)] font-mono">&gt;</span>
              <input
                ref={inputRef}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setActiveIndex((current) =>
                      items.length ? (current + 1) % items.length : 0,
                    );
                  }

                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setActiveIndex((current) =>
                      items.length ? (current - 1 + items.length) % items.length : 0,
                    );
                  }

                  if (event.key === "Enter") {
                    event.preventDefault();

                    if (items[activeIndex]) {
                      handleSelect(items[activeIndex]);
                    }
                  }

                  if (event.key === "Escape") {
                    event.preventDefault();
                    closeCommandPalette();
                  }
                }}
                placeholder="Go to file or run command..."
                className="h-6 w-full bg-transparent text-[14px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-disabled)] font-medium"
              />
              <div className="flex items-center">
                <span className="select-none rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] px-1.5 py-[2px] text-[9px] font-bold uppercase leading-none text-[var(--text-muted)]">Esc</span>
              </div>
            </div>

            <div className="h-[1px] w-full bg-[var(--border-default)]" />

            {/* List Content */}
            <div className="ide-scrollbar flex max-h-[min(520px,70vh)] flex-col overflow-y-auto py-1.5">
              {items.length ? (
                items.map((entry, index) => {
                  const isActive = activeIndex === index;
                  
                  // Show "FILES" header before the first file if both copilot and files exist
                  const showFilesHeader = entry.kind === "file" && (index === 0 || items[index - 1].kind !== "file");

                  return (
                    <div key={entry.kind === "file" ? entry.value.path : entry.kind === "copilot" ? "copilot" : entry.value.id}>
                      {showFilesHeader && (
                        <div className="select-none px-4 pb-1 pt-3 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                          Files
                        </div>
                      )}
                      
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => handleSelect(entry)}
                        className={`group flex w-full items-center gap-3.5 px-3 py-1.5 text-left text-[13px] transition-colors relative ${isActive
                            ? "bg-[var(--bg-muted)]"
                            : "text-[var(--text-secondary)]"
                          }`}
                      >
                        {entry.kind === "copilot" ? (
                          <>
                            <VscSparkle className={`${isActive ? "text-[var(--accent-hover)]" : "text-[var(--accent)]"}`} size={16} />
                            <span className={`font-medium ${isActive ? "text-[var(--text-primary)]" : "text-[var(--accent)]"}`}>
                              {entry.value.title}
                            </span>
                            <span className="ml-auto rounded border border-[var(--border-default)] bg-[var(--bg-base)] px-1.5 py-[1px] text-[10px] font-mono text-[var(--text-muted)]">
                              {entry.value.shortcut}
                            </span>
                          </>
                        ) : entry.kind === "file" ? (
                          <>
                            <FileIcon name={entry.value.name} className={`${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`} />
                            <span className={`truncate font-semibold ${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                              {entry.value.name}
                            </span>
                            <span className="ml-auto select-none text-[12px] font-mono italic text-[var(--text-muted)]">
                              {formatPath(entry.value.path)}
                            </span>
                          </>
                        ) : (
                          <>
                             <VscSymbolMethod className={`${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`} size={16} />
                             <span className={`font-semibold ${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                                {entry.value.title}
                             </span>
                             {entry.value.shortcut && (
                               <span className="ml-auto rounded border border-[var(--border-default)] bg-[var(--bg-base)] px-1.5 py-[1px] text-[10px] font-mono text-[var(--text-muted)]">
                                 {entry.value.shortcut}
                               </span>
                             )}
                          </>
                        )}
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                  <div className="text-[13px] font-medium text-[var(--text-muted)]">No matching results found</div>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="flex select-none items-center justify-between border-t border-[var(--border-default)] bg-[var(--bg-overlay)] px-4 py-[6px]">
               <div className="flex items-center gap-2.5 text-[11px] font-medium text-[var(--text-muted)]">
                 <span className="flex items-center gap-1">
                   <span className="text-[12px]">↑↓</span> navigate
                 </span>
                 <span className="opacity-40">·</span>
                 <span className="flex items-center gap-1">
                   <span className="text-[12px]">↵</span> open
                 </span>
                 <span className="opacity-40">·</span>
                 <span className="flex items-center gap-1">
                   Esc close
                 </span>
               </div>
               <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                 <span className="font-normal">Tip: type <span className="italic text-[var(--text-secondary)]">"copilot"</span> to open AI chat</span>
               </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
