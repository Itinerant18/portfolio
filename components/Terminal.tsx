"use client";

import { useIDEStore } from "@/store/useIDEStore";
import { executeTerminalCommand } from "@/utils/commands";
import { useEffect, useMemo, useRef, useState } from "react";

interface TerminalEntry {
  id: string;
  command: string;
  lines: string[];
}

const initialEntries: TerminalEntry[] = [
  {
    id: "boot",
    command: "",
    lines: ['Type "help" to list commands.'],
  },
];

function createId() {
  return `terminal-${Math.random().toString(36).slice(2, 8)}`;
}

type TabKey = "Problems" | "Output" | "Debug Console" | "Terminal" | "Ports";

export default function Terminal() {
  const openFile = useIDEStore((state) => state.openFile);
  const terminalResetKey = useIDEStore((state) => state.terminalResetKey);
  const toggleTerminal = useIDEStore((state) => state.toggleTerminal);
  const resetTerminal = useIDEStore((state) => state.resetTerminal);
  
  const [activeTab, setActiveTab] = useState<TabKey>("Terminal");
  const [entries, setEntries] = useState<TerminalEntry[]>(initialEntries);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prompt = useMemo(() => "PS C:\\workspace\\tech-support-ai>", []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "auto",
    });
  }, [entries]);

  useEffect(() => {
    setEntries(initialEntries);
    setHistory([]);
    setHistoryIndex(-1);
    setInput("");

    window.setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  }, [terminalResetKey]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();

    if (!trimmed) {
      return;
    }

    setHistory((current) => [trimmed, ...current.filter((item) => item !== trimmed)].slice(0, 20));
    setHistoryIndex(-1);
    setInput("");

    const result = executeTerminalCommand(trimmed, { openFile });

    if (result.clear) {
      setEntries([]);
      return;
    }

    setEntries((current) => [
      ...current,
      {
        id: createId(),
        command: trimmed,
        lines: result.lines,
      },
    ]);
  }

  function moveHistory(direction: "up" | "down") {
    if (!history.length) {
      return;
    }

    if (direction === "up") {
      const nextIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? "");
      return;
    }

    const nextIndex = historyIndex - 1;

    if (nextIndex < 0) {
      setHistoryIndex(-1);
      setInput("");
      return;
    }

    setHistoryIndex(nextIndex);
    setInput(history[nextIndex] ?? "");
  }

  const tabs: { key: TabKey; badge?: number }[] = [
    { key: "Problems", badge: 0 },
    { key: "Output" },
    { key: "Debug Console" },
    { key: "Terminal" },
    { key: "Ports" },
  ];

  return (
    <section className="flex h-full min-h-0 flex-col border-t border-[#1e1e24] bg-[#0a0a0a] select-none font-sans">
      {/* Top Bar */}
      <div className="flex h-[35px] shrink-0 items-center justify-between pl-4 pr-3">
        {/* Tabs */}
        <div className="flex h-full items-center gap-[24px]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex h-full items-center gap-1.5 text-[11px] font-medium tracking-[0.02em] transition-colors ${
                activeTab === tab.key
                  ? "text-[#e7e7e7]"
                  : "text-[#8b8b9e] hover:text-[#cccccc]"
              }`}
            >
              {tab.key}
              {tab.badge !== undefined && (
                <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#8c8c8ccd] text-[9px] text-white">
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 h-[1.5px] w-full bg-[#007fd4]" />
              )}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 opacity-80">
          {/* Terminal Profile */}
          <div className="flex cursor-pointer items-center gap-[4px] rounded-[4px] px-1 py-0.5 text-[#cccccc] hover:bg-[#2a2d31] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 17l6-6-6-6"/><path d="M12 19h8"/></svg>
            <span className="text-[12px]">pwsh</span>
          </div>
          
          <button className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[4px] text-[#e5c07b] hover:bg-[#2a2d31] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </button>
          
          <div className="flex border border-[#2a2d31] rounded-[4px] ml-1 overflow-hidden">
             {/* New Terminal */}
             <button
               type="button"
               title="New Terminal"
               onClick={resetTerminal}
               className="flex h-5 w-6 cursor-pointer items-center justify-center text-[#cccccc] hover:bg-[#2a2d31] transition-colors"
             >
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
             </button>
             {/* Dropdown handle */}
             <button
               type="button"
               className="flex h-5 w-4 cursor-pointer items-center justify-center text-[#cccccc] hover:bg-[#2a2d31] border-l border-[#2a2d31] transition-colors"
             >
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
             </button>
          </div>

          {/* Kill Terminal */}
          <button
            type="button"
            title="Kill Terminal"
            onClick={() => setEntries([])}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[4px] text-[#cccccc] transition-colors hover:bg-[#2a2d31] ml-1"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </button>
          
          {/* Maximize Panel */}
          <button
            type="button"
            title="Maximize Panel"
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[4px] text-[#cccccc] transition-colors hover:bg-[#2a2d31]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
          </button>

          {/* Close Panel */}
          <button
            type="button"
            title="Close Panel"
            onClick={toggleTerminal}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[4px] text-[#cccccc] transition-colors hover:bg-[#2a2d31]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden font-mono text-[13px]">
        {activeTab === "Terminal" ? (
          <div
            ref={scrollRef}
            className="ide-scrollbar h-full overflow-y-auto px-4 py-2"
            onClick={() => inputRef.current?.focus()}
          >
            {entries.map((entry) => (
              <div key={entry.id} className="mb-0.5 last:mb-0">
                {entry.command ? (
                  <div className="flex items-center gap-2 leading-relaxed text-[#cccccc]">
                    <div className="flex items-center gap-1.5">
                      {/* Prompt Circle Decorator */}
                      <svg width="8" height="8" viewBox="0 0 16 16" fill="none" stroke="#858585" strokeWidth="2" className="mt-0.5">
                        <circle cx="8" cy="8" r="6" />
                      </svg>
                      <span className="text-[#cccccc]">{prompt}</span>
                    </div>
                    <span className="text-[#e7e7e7]">{entry.command}</span>
                  </div>
                ) : null}

                {entry.lines.map((line, index) => (
                  <div
                    key={`${entry.id}-${index}`}
                    className="leading-relaxed text-[#cccccc]"
                  >
                    {line}
                  </div>
                ))}
              </div>
            ))}

            <form onSubmit={handleSubmit} className="mt-0.5 pb-2">
              <label className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <svg width="8" height="8" viewBox="0 0 16 16" fill="none" stroke="#858585" strokeWidth="2" className="mt-0.5">
                    <circle cx="8" cy="8" r="6" />
                  </svg>
                  <span className="text-[#cccccc]">{prompt}</span>
                </div>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowUp") {
                      event.preventDefault();
                      moveHistory("up");
                    }

                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      moveHistory("down");
                    }
                  }}
                  className="min-w-0 flex-1 bg-transparent text-[#e7e7e7] outline-none"
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                />
              </label>
            </form>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-[#858585]">
            No data available for {activeTab}.
          </div>
        )}
      </div>
    </section>
  );
}

