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
            className="w-full max-w-[640px] overflow-hidden rounded-lg border border-[#3c3c3c] bg-[#1e1e1e] shadow-[0_16px_48px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Header: Input Area */}
            <div className="flex items-center gap-3 px-4 py-[11px] bg-[#1e1e1e]">
              <span className="text-[#858585] text-[15px] font-mono leading-none flex items-center">&gt;</span>
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
                className="h-6 w-full bg-transparent text-[14px] text-[#cccccc] outline-none placeholder:text-[#5c5c5c] font-medium"
              />
              <div className="flex items-center">
                <span className="px-1.5 py-[2px] rounded-sm border border-[#454545] bg-[#333333] text-[9px] font-bold text-[#8c8c8c] leading-none uppercase select-none">Esc</span>
              </div>
            </div>

            <div className="h-[1px] w-full bg-[#3c3c3c]" />

            {/* List Content */}
            <div className="max-h-[min(520px,70vh)] overflow-y-auto py-1.5 flex flex-col">
              {items.length ? (
                items.map((entry, index) => {
                  const isActive = activeIndex === index;
                  
                  // Show "FILES" header before the first file if both copilot and files exist
                  const showFilesHeader = entry.kind === "file" && (index === 0 || items[index - 1].kind !== "file");

                  return (
                    <div key={entry.kind === "file" ? entry.value.path : entry.kind === "copilot" ? "copilot" : entry.value.id}>
                      {showFilesHeader && (
                        <div className="px-4 pt-3 pb-1 text-[10px] font-bold text-[#6f6f6f] uppercase tracking-wider select-none">
                          Files
                        </div>
                      )}
                      
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => handleSelect(entry)}
                        className={`group flex w-full items-center gap-3.5 px-3 py-1.5 text-left text-[13px] transition-colors relative ${isActive
                            ? "bg-[#2a2d2e]"
                            : "text-[#cccccc]"
                          }`}
                      >
                        {entry.kind === "copilot" ? (
                          <>
                            <VscSparkle className={`${isActive ? "text-[#a981ff]" : "text-[#8e6fd7]"}`} size={16} />
                            <span className={`font-medium ${isActive ? "text-white" : "text-[#c2abff]"}`}>
                              {entry.value.title}
                            </span>
                            <span className="ml-auto text-[10px] font-mono text-[#6f6f6f] border border-[#3c3c3c] px-1.5 py-[1px] rounded bg-[#252526]">
                              {entry.value.shortcut}
                            </span>
                          </>
                        ) : entry.kind === "file" ? (
                          <>
                            <FileIcon name={entry.value.name} className={`${isActive ? "text-[#cccccc]" : "text-[#858585]"}`} />
                            <span className={`font-semibold truncate ${isActive ? "text-white" : "text-[#cccccc]"}`}>
                              {entry.value.name}
                            </span>
                            <span className="ml-auto text-[12px] font-mono text-[#6f6f6f] select-none italic">
                              {formatPath(entry.value.path)}
                            </span>
                          </>
                        ) : (
                          <>
                             <VscSymbolMethod className={`${isActive ? "text-[#cccccc]" : "text-[#858585]"}`} size={16} />
                             <span className={`font-semibold ${isActive ? "text-white" : "text-[#cccccc]"}`}>
                                {entry.value.title}
                             </span>
                             {entry.value.shortcut && (
                               <span className="ml-auto text-[10px] font-mono text-[#6f6f6f] border border-[#3c3c3c] px-1.5 py-[1px] rounded bg-[#252526]">
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
                  <div className="text-[13px] font-medium text-[#858585]">No matching results found</div>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-4 py-[6px] bg-[#1e1e1e] border-t border-[#2d2d2d] flex items-center justify-between select-none">
               <div className="flex items-center gap-2.5 text-[11px] text-[#858585] font-medium">
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
               <div className="text-[11px] text-[#6f6f6f] flex items-center gap-1.5">
                 <span className="font-normal">Tip: type <span className="text-[#858585] italic">"copilot"</span> to open AI chat</span>
               </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
