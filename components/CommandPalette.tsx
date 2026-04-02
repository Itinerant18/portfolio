"use client";

import { useIDEStore } from "@/store/useIDEStore";
import { portfolioFiles } from "@/data/files";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useMemo, useEffect, useRef } from "react";

export default function CommandPalette() {
  const isOpen = useIDEStore((state) => state.commandPaletteOpen);
  const mode = useIDEStore((state) => state.paletteMode);
  const close = useIDEStore((state) => state.closeCommandPalette);
  const openFile = useIDEStore((state) => state.openFile);
  
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase();
    if (mode === "files") {
      return portfolioFiles
        .filter(f => f.name.toLowerCase().includes(q) || f.path.toLowerCase().includes(q))
        .map(f => ({ name: f.name, sub: f.path, action: () => openFile(f.path), type: "file" }));
    }
    return [
      { name: "Toggle Sidebar", action: () => useIDEStore.getState().toggleSidebar(), shortcut: "Ctrl+B", type: "cmd" },
      { name: "Toggle Terminal", action: () => useIDEStore.getState().toggleTerminal(), shortcut: "Ctrl+`", type: "cmd" },
      { name: "Toggle AI Panel", action: () => useIDEStore.getState().toggleAIPanel(), shortcut: "Ctrl+Shift+A", type: "cmd" },
      { name: "Toggle Split View", action: () => useIDEStore.getState().toggleSplitView(), shortcut: "Alt+S", type: "cmd" },
      { name: "Close All Tabs", action: () => {}, shortcut: "Shift+Alt+W", type: "cmd" },
    ].filter(i => i.name.toLowerCase().includes(q));
  }, [mode, query, openFile]);

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen, mode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filteredItems[selectedIndex];
      if (item) {
        item.action();
        close();
      }
    } else if (e.key === "Escape") {
      close();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[80px]">
      <div className="absolute inset-0 bg-black/40" onClick={close} />

      <div className="relative w-[500px] border border-[var(--border)] bg-[var(--bg-editor)] shadow-none flex flex-col">
        <div className="flex items-center gap-2 border-b border-[var(--border)] p-2">
          <svg className="text-[var(--text-muted)] opacity-50" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            ref={inputRef}
            className="flex-1 bg-transparent text-[13px] text-[var(--text)] outline-none placeholder-[var(--text-muted)]"
            placeholder={mode === "files" ? "Search files..." : "Type a command..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="max-h-[300px] overflow-y-auto no-scrollbar py-1 bg-[#0D1117]">
          {filteredItems.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setSelectedIndex(i)}
              onClick={() => {
                item.action();
                close();
              }}
              className={`flex items-center justify-between px-3 py-1.5 cursor-pointer ${
                selectedIndex === i ? "bg-[var(--accent)] text-white" : "text-[var(--text-muted)] hover:bg-[var(--bg-hover)]"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                 {item.type === "file" && (
                   <svg className="opacity-50" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                 )}
                 <span className={`text-[12px] ${selectedIndex === i ? "text-white" : "text-[var(--text)]"}`}>
                   {item.name}
                 </span>
                 {item.sub && (
                   <span className={`text-[10px] truncate opacity-50 ${selectedIndex === i ? "text-white" : ""}`}>
                     {item.sub}
                   </span>
                 )}
              </div>
              {"shortcut" in item && (
                <span className={`text-[10px] font-bold tracking-tight opacity-60`}>{item.shortcut as string}</span>
              )}
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="p-6 text-center text-[var(--text-muted)] text-[12px] opacity-50">No matching items</div>
          )}
        </div>
        
        <div className="flex items-center justify-between border-t border-[var(--border)] p-1.5 px-3 text-[10px] text-[var(--text-muted)] bg-[var(--bg-app)] font-bold uppercase tracking-tight opacity-80">
           <span>{filteredItems.length} results</span>
           <div className="flex gap-3">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
           </div>
        </div>
      </div>
    </div>
  );
}
