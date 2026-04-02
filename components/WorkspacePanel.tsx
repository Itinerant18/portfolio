"use client";

import { getPortfolioFile } from "@/data/files";
import { useIDEStore } from "@/store/useIDEStore";

export default function WorkspacePanel() {
  const activeFile = useIDEStore((state) => state.activeFile);
  const file = getPortfolioFile(activeFile);

  return (
    <div className="flex h-full flex-col text-[11px] select-none bg-[var(--bg-sidebar)]">
      {/* Dense Header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-2.5 h-[32px] shrink-0">
        <span className="font-bold text-[var(--text-muted)] uppercase tracking-wider text-[10px]">Metadata</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-4">
        {/* File Info Section */}
        <section>
          <div className="text-[9px] uppercase font-black text-[var(--text-muted)] tracking-widest mb-2 opacity-60">Active Context</div>
          <div className="border border-[var(--border)] bg-[var(--bg-app)] p-2">
             <div className="flex justify-between items-center mb-1.5">
                <span className="font-bold text-[var(--text)] truncate pr-2">{file?.name ?? "No file"}</span>
                <span className="text-[8px] px-1 border border-[var(--border)] text-[var(--text-muted)] font-black uppercase">{file?.language ?? "N/A"}</span>
             </div>
             <p className="text-[var(--text-muted)] leading-tight text-[10px]">
               {file?.summary ?? "Select a file in the explorer to see detailed metadata and technical context."}
             </p>
          </div>
        </section>

        {/* Workspace Outline Mock */}
        <section>
          <div className="text-[9px] uppercase font-black text-[var(--text-muted)] tracking-widest mb-2 opacity-60">Outline</div>
          <div className="space-y-1 opacity-50">
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
               <span className="text-[var(--accent)] font-bold">V</span>
               <span>PortfolioState</span>
            </div>
            <div className="pl-3 flex items-center gap-2 text-[var(--text-muted)]">
               <span className="text-blue-400 font-bold">f</span>
               <span>renderHero()</span>
            </div>
            <div className="pl-3 flex items-center gap-2 text-[var(--text-muted)]">
               <span className="text-blue-400 font-bold">f</span>
               <span>handleContact()</span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="pt-2 border-t border-[var(--border-muted)]">
           <div className="flex justify-between text-[var(--text-muted)] opacity-70">
              <span>Lines:</span>
              <span className="font-mono">{file?.content.split('\n').length ?? 0}</span>
           </div>
           <div className="flex justify-between text-[var(--text-muted)] opacity-70 mt-1">
              <span>Encoding:</span>
              <span className="font-mono uppercase">UTF-8</span>
           </div>
        </section>
      </div>
    </div>
  );
}
