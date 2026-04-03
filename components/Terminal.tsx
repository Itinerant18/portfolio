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
    <section className="flex h-full min-h-0 flex-col border-t border-[var(--border)] bg-[#1e1e1e] select-none font-sans">
      {/* Top Bar */}
      <div className="flex h-9 shrink-0 items-center justify-between pl-4 pr-2">
        {/* Tabs */}
        <div className="flex h-full items-center gap-5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex h-full items-center gap-1.5 text-[11px] font-medium transition-colors ${
                activeTab === tab.key
                  ? "text-[#e7e7e7]"
                  : "text-[#858585] hover:text-[#e7e7e7]"
              }`}
            >
              {tab.key}
              {tab.badge !== undefined && (
                <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#8c8c8ccd] text-[9px] text-white">
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 h-[1.5px] w-full bg-[#e7e7e7]" />
              )}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5">
          {/* Terminal Profile */}
          <div className="flex cursor-pointer items-center gap-1 rounded px-1.5 py-1 text-[#cccccc] hover:bg-[#2a2d2e] transition-colors">
            <span className="text-[12px] font-sans">powershell</span>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.976 10.072l4.357-4.357.62.618L8.284 11h-.618L3 6.333l.619-.618 4.357 4.357z" />
            </svg>
          </div>
          
          <div className="mx-1 h-[14px] w-[1px] bg-[#454545]" />

          {/* New Terminal */}
          <button
            type="button"
            title="New Terminal"
            onClick={resetTerminal}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-[#cccccc] transition-colors hover:bg-[#2a2d2e]"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 2h1v5h5v1H9v5H8V8H3V7h5V2z" />
            </svg>
          </button>

          {/* Split Terminal */}
          <button
            type="button"
            title="Split Terminal"
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-[#cccccc] transition-colors hover:bg-[#2a2d2e]"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.5 3h11A1.5 1.5 0 0 1 15 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 11.5v-7A1.5 1.5 0 0 1 2.5 3zm.5 1h4v8H3a.5.5 0 0 1-.5-.5v-7A.5.5 0 0 1 3 4zm5 0h5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H8V4z" />
            </svg>
          </button>

          {/* Kill Terminal */}
          <button
            type="button"
            title="Kill Terminal"
            onClick={() => setEntries([])}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-[#cccccc] transition-colors hover:bg-[#2a2d2e]"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1zM9 2H6v1h3V2zM4 13h7V4H4v9zm2-8H5v7h1V5zm1 0h1v7H7V5zm2 0h1v7H9V5z" />
            </svg>
          </button>
          
          {/* Maximize Panel */}
          <button
            type="button"
            title="Maximize Panel"
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-[#cccccc] transition-colors hover:bg-[#2a2d2e]"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.207 10.5l4.353-4.354.354-.353.354.353 4.353 4.354-.707.707L8 7.207l-4.086 4.086-.707-.707z" />
            </svg>
          </button>

          {/* Close Panel */}
          <button
            type="button"
            title="Close Panel"
            onClick={toggleTerminal}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-[#cccccc] transition-colors hover:bg-[#2a2d2e]"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z" />
            </svg>
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

