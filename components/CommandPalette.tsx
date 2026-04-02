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
  const toggleTheme = useIDEStore((state) => state.toggleTheme);
  const toggleTerminal = useIDEStore((state) => state.toggleTerminal);
  const closeAllTabs = useIDEStore((state) => state.closeAllTabs);
  const focusAIPanel = useIDEStore((state) => state.focusAIPanel);
  const setSearchQuery = useIDEStore((state) => state.setSearchQuery);
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
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/45 px-2 pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCommandPalette}
        >
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-[560px] border border-[var(--border)] bg-[var(--bg-panel)]"
          >
            <div className="border-b border-[var(--border)] p-2">
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
                  paletteMode === "files" ? "Search files" : "Type a command"
                }
                className="h-8 w-full border border-[var(--border)] bg-[var(--bg-main)] px-2 text-[12px] text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
              />
            </div>

            <div className="ide-scrollbar max-h-[320px] overflow-y-auto py-1">
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
                        className={`flex w-full items-center justify-between px-3 py-1.5 text-left text-[12px] transition ${
                          isActive
                            ? "bg-[var(--bg-hover)] text-[var(--text)]"
                            : "text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text)]"
                        }`}
                      >
                        <span className="truncate">{entry.value.path}</span>
                        <span className="ml-3 text-[11px] text-[var(--text-muted)]">
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
                      className={`flex w-full items-center justify-between px-3 py-1.5 text-left text-[12px] transition ${
                        isActive
                          ? "bg-[var(--bg-hover)] text-[var(--text)]"
                          : "text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text)]"
                      }`}
                    >
                      <span>{entry.value.title}</span>
                      <span className="ml-3 text-[11px] text-[var(--text-muted)]">
                        {entry.value.shortcut}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="px-3 py-3 text-[12px] text-[var(--text-muted)]">
                  No matching items
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
