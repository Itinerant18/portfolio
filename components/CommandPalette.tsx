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
import { VscSearch, VscFile, VscSymbolMethod } from "react-icons/vsc";

type PaletteEntry =
  | {
    kind: "command";
    value: CommandDescriptor;
  }
  | {
    kind: "file";
    value: IDEFile;
  };

export default function CommandPalette() {
  const isOpen = useIDEStore((state) => state.commandPaletteOpen);
  const paletteMode = useIDEStore((state) => state.paletteMode);
  const searchQuery = useIDEStore((state) => state.searchQuery);
  const closeCommandPalette = useIDEStore((state) => state.closeCommandPalette);
  const openCommandPalette = useIDEStore((state) => state.openCommandPalette);
  const openFile = useIDEStore((state) => state.openFile);
  const theme = useIDEStore((state) => state.theme);
  const toggleTerminal = useIDEStore((state) => state.toggleTerminal);
  const closeAllTabs = useIDEStore((state) => state.closeAllTabs);
  const focusAIPanel = useIDEStore((state) => state.focusAIPanel);
  const setSearchQuery = useIDEStore((state) => state.setSearchQuery);
  const toggleTheme = useIDEStore((state) => state.toggleTheme);
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
    if (paletteMode === "files") {
      return searchPortfolioFiles(deferredQuery).map((file) => ({
        kind: "file",
        value: file,
      }));
    }

    const normalized = deferredQuery.trim().toLowerCase();

    return commands
      .filter((command) =>
        normalized
          ? `${command.title} ${command.description}`.toLowerCase().includes(normalized)
          : true,
      )
      .map((command) => ({
        kind: "command",
        value: command,
      }));
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

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-[2px] px-4 pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCommandPalette}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-[600px] border border-[var(--border-default)] bg-[var(--bg-overlay)] rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-muted)]/50 border-b border-[var(--border-default)]">
              <VscSearch className="text-[var(--text-muted)]" size={18} />
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
                placeholder={
                  paletteMode === "files" ? "Search portfolio files..." : "Execute a workspace command..."
                }
                className="h-8 w-full bg-transparent text-[14px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-disabled)] font-medium"
              />
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[10px] font-bold text-[var(--text-muted)] shadow-sm">ESC</kbd>
              </div>
            </div>

            <div className="ide-scrollbar max-h-[400px] overflow-y-auto py-2 px-2 bg-[var(--bg-overlay)]">
              {items.length ? (
                items.map((entry, index) => {
                  const isActive = activeIndex === index;

                  if (entry.kind === "file") {
                    return (
                      <button
                        key={entry.value.path}
                        type="button"
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => handleSelect(entry)}
                        className={`group flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-left text-[13px] transition-all ${isActive
                            ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent-subtle)]"
                            : "text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
                          }`}
                      >
                        <VscFile className={isActive ? "text-white" : "text-[var(--accent)]"} size={16} />
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold truncate">{entry.value.name}</span>
                          <span className={`text-[11px] truncate opacity-70 ${isActive ? 'text-white' : 'text-[var(--text-muted)]'}`}>{entry.value.path}</span>
                        </div>
                        <span className={`ml-auto text-[10px] font-medium uppercase tracking-widest opacity-60`}>
                          {entry.value.language}
                        </span>
                      </button>
                    );
                  }

                  return (
                    <button
                      key={entry.value.id}
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => handleSelect(entry)}
                      className={`group flex w-full items-center gap-3 px-3 py-3 rounded-lg text-left text-[13px] transition-all ${isActive
                          ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent-subtle)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
                        }`}
                    >
                      <VscSymbolMethod className={isActive ? "text-white" : "text-[var(--info)]"} size={16} />
                      <div className="flex flex-col">
                        <span className="font-bold">{entry.value.title}</span>
                        <span className={`text-[11px] opacity-70 ${isActive ? 'text-white' : 'text-[var(--text-muted)]'}`}>{entry.value.description}</span>
                      </div>
                      {entry.value.shortcut && (
                        <span className={`ml-auto text-[11px] font-mono font-bold opacity-80`}>
                          {entry.value.shortcut}
                        </span>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--bg-muted)] flex items-center justify-center mb-3">
                    <VscSearch size={20} className="text-[var(--text-disabled)]" />
                  </div>
                  <div className="text-[13px] font-bold text-[var(--text-primary)]">No matching results found</div>
                  <div className="text-[11px] text-[var(--text-disabled)] mt-1 font-medium italic">Try adjusting your search query</div>
                </div>
              )}
            </div>
            
            <div className="px-4 py-2 bg-[var(--bg-muted)]/30 border-t border-[var(--border-default)] flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                   <kbd className="px-1 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-default)]">↑↓</kbd>
                   <span>Navigate</span>
                 </div>
                 <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                   <kbd className="px-1 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-default)]">↵</kbd>
                   <span>Select</span>
                 </div>
               </div>
               <div className="text-[10px] font-medium uppercase tracking-widest text-[var(--accent)] opacity-80">Workspace Registry</div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
