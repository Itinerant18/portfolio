"use client";

import { useIDEStore } from "@/store/useIDEStore";
import { getPortfolioFile } from "@/data/files";

export default function EditorTabs() {
  const openFiles = useIDEStore((state) => state.openFiles);
  const activeFile = useIDEStore((state) => state.activeFile);
  const setActiveFile = useIDEStore((state) => state.setActiveFile);
  const closeFile = useIDEStore((state) => state.closeFile);

  return (
    <div className="flex h-[32px] items-center overflow-x-auto overflow-y-hidden bg-[var(--bg-app)] no-scrollbar shrink-0 select-none border-b border-[var(--border)]">
      {openFiles.map((path) => {
        const file = getPortfolioFile(path);
        const isActive = activeFile === path;
        
        if (!file) return null;

        return (
          <div
            key={path}
            onClick={() => setActiveFile(path)}
            className={`group flex h-full items-center gap-2 border-r border-[var(--border)] px-2.5 cursor-pointer transition-colors relative min-w-[100px] max-w-[180px] ${
              isActive 
                ? "bg-[var(--bg-editor)] text-[var(--text)]" 
                : "bg-[#121518] text-[var(--text-muted)] hover:bg-[var(--bg-hover)]"
            }`}
          >
            {/* Active Accent Top */}
            {isActive && (
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-[var(--accent)]" />
            )}
            
            <div className="flex items-center gap-1.5 truncate">
              <FileIcon name={file.name} isActive={isActive} />
              <span className="truncate text-[11px] font-medium">{file.name}</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                closeFile(path);
              }}
              className={`flex items-center justify-center rounded-[2px] p-0.5 hover:bg-[var(--bg-active)] ml-auto ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        );
      })}
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
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 opacity-70"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
  );
}
