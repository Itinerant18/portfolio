"use client";

import { useIDEStore } from "@/store/useIDEStore";
import { portfolioFiles } from "@/data/files";
import { useState } from "react";

export default function FileExplorer() {
  const activeFile = useIDEStore((state) => state.activeFile);
  const openFile = useIDEStore((state) => state.openFile);
  const [collapsedFolders, setCollapsedFolders] = useState<string[]>([]);

  const toggleFolder = (folder: string) => {
    setCollapsedFolders((prev) =>
      prev.includes(folder) ? prev.filter((f) => f !== folder) : [...prev, folder]
    );
  };

  return (
    <div className="flex h-full flex-col select-none bg-[var(--bg-sidebar)]">
      {/* Tight Header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-2.5 h-[32px] shrink-0">
        <span className="font-bold text-[var(--text-muted)] uppercase tracking-wider text-[10px]">Explorer</span>
        <button className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-1">
        {/* Project Folder */}
        <div className="flex flex-col">
          <div 
            className="flex items-center gap-1 px-2 py-0.5 hover:bg-[var(--bg-hover)] cursor-pointer group h-[22px]"
            onClick={() => toggleFolder("PORTFOLIO")}
          >
            <svg 
              className={`transition-transform duration-75 text-[var(--text-muted)] ${collapsedFolders.includes("PORTFOLIO") ? "-rotate-90" : ""}`}
              width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
            <span className="text-[10px] font-black text-[var(--text)] uppercase tracking-tight">PORTFOLIO</span>
          </div>

          {!collapsedFolders.includes("PORTFOLIO") && (
            <div className="flex flex-col">
              {portfolioFiles.map((file) => {
                const isActive = activeFile === file.path;
                return (
                  <div
                    key={file.path}
                    onClick={() => openFile(file.path)}
                    className={`flex items-center gap-1.5 pl-5 pr-2 py-0.5 cursor-pointer h-[22px] transition-colors ${
                      isActive ? "bg-[var(--bg-active)] text-[var(--text)] shadow-[inset_2px_0_0_0_var(--accent)]" : "text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text)]"
                    }`}
                  >
                    <FileIcon name={file.name} isActive={isActive} />
                    <span className="truncate text-[11px] font-medium">{file.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FileIcon({ name, isActive }: { name: string; isActive: boolean }) {
  const ext = name.split(".").pop();
  const color = isActive ? "currentColor" : undefined;
  
  if (ext === "tsx" || ext === "ts") {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color || "#3178c6"} strokeWidth="2.5" className="shrink-0"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
    );
  }
  if (ext === "json") {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color || "#cbcb41"} strokeWidth="2.5" className="shrink-0"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 opacity-70"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
  );
}
