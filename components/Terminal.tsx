"use client";

import { useIDEStore } from "@/store/useIDEStore";
import { executeTerminalCommand } from "@/utils/commands";
import { useState, useRef, useEffect, useMemo } from "react";

interface TerminalEntry {
  id: string;
  command: string;
  output: string[];
}

export default function Terminal() {
  const terminalOpen = useIDEStore((state) => state.terminalOpen);
  const openFile = useIDEStore((state) => state.openFile);
  const toggleTerminal = useIDEStore((state) => state.toggleTerminal);
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      id: "initial",
      command: "",
      output: ["Cursor Portfolio Shell v1.0.0", "Type 'help' to see commands."],
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  const prompt = useMemo(() => "user@portfolio:~$", []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const trimmed = input.trim();
    const result = executeTerminalCommand(trimmed, { openFile });

    if (result.clear) {
      setEntries([]);
    } else {
      setEntries((prev) => [
        ...prev,
        { id: Date.now().toString(), command: trimmed, output: result.lines },
      ]);
    }
    setInput("");
  };

  if (!terminalOpen) return null;

  return (
    <div className="flex h-[160px] w-full flex-col border-t border-[var(--border)] bg-[#050607] font-mono text-[11px] shrink-0 select-text">
      {/* Tab Strip - Integrated Feel */}
      <div className="flex h-[28px] items-center justify-between px-3 shrink-0 bg-[var(--bg-app)] border-b border-[var(--border-muted)]">
        <div className="flex items-center gap-4 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-tighter">
           <div className="flex items-center gap-1 text-[var(--text)] border-b border-b-[var(--accent)] h-[28px]">
             <span>Terminal</span>
           </div>
           <span className="hover:text-[var(--text)] cursor-pointer">Output</span>
           <span className="hover:text-[var(--text)] cursor-pointer">Debug</span>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
           </button>
           <button onClick={toggleTerminal} className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
           </button>
        </div>
      </div>

      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-0.5"
        onClick={() => document.getElementById("terminal-input")?.focus()}
      >
        {entries.map((entry) => (
          <div key={entry.id} className="space-y-0.5">
            {entry.command && (
              <div className="flex gap-1.5 items-center">
                <span className="text-[#4AF626] font-bold">{prompt}</span>
                <span className="text-[var(--text)]">{entry.command}</span>
              </div>
            )}
            <div className="space-y-0">
              {entry.output.map((line, i) => (
                <div key={i} className="text-[var(--text-muted)] leading-tight">{line}</div>
              ))}
            </div>
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex gap-1.5 items-center">
          <span className="text-[#4AF626] font-bold">{prompt}</span>
          <input
            id="terminal-input"
            className="flex-1 bg-transparent text-[var(--text)] outline-none border-none p-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
