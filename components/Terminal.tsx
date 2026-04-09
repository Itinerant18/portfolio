"use client";

import { useIDEStore } from "@/store/useIDEStore";
import { executeTerminalCommand } from "@/utils/commands";
import { useEffect, useMemo, useRef, useState } from "react";
import { 
  VscClose, VscChevronDown, VscAdd, 
  VscTerminal, VscWarning
} from "react-icons/vsc";

interface TerminalEntry {
  id: string;
  command: string;
  lines: string[];
}

const bootSequence = [
  "> Initializing workspace...",
  "> Loading project registry...",
  "> GitHub sync: OK",
  "> Ready. Type 'help' for commands.",
] as const;

const initialEntries: TerminalEntry[] = [
  {
    id: "boot",
    command: "",
    lines: [],
  },
];

function createId() {
  return `terminal-${Math.random().toString(36).slice(2, 8)}`;
}

type TabKey = "Problems" | "Output" | "Debug Console" | "Terminal" | "Ports";

const tabMessages: Record<Exclude<TabKey, "Terminal">, string> = {
  Problems: "No problems detected in workspace.",
  Output: "Next.js 15 development server running on localhost:3000",
  "Debug Console": "Debug console is available when running in debug mode.",
  Ports: "Port 3000 - Next.js Dev Server",
};

export default function Terminal() {
  const openFile = useIDEStore((state) => state.openFile);
  const terminalOpen = useIDEStore((state) => state.terminalOpen);
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
  const bootTimeoutsRef = useRef<number[]>([]);
  const bootStartedRef = useRef(false);
  const previousTerminalOpenRef = useRef<boolean | null>(null);
  const prompt = useMemo(() => "PS portfolio>", []);

  function clearBootTimers() {
    for (const timeoutId of bootTimeoutsRef.current) {
      window.clearTimeout(timeoutId);
    }
    bootTimeoutsRef.current = [];
  }

  function startBootSequence() {
    clearBootTimers();
    bootStartedRef.current = true;
    setEntries([{ id: "boot", command: "", lines: [] }]);

    bootSequence.forEach((line, index) => {
      const timeoutId = window.setTimeout(() => {
        setEntries((current) =>
          current.map((entry) =>
            entry.id === "boot"
              ? { ...entry, lines: [...entry.lines, line] }
              : entry,
          ),
        );
      }, index * 80);

      bootTimeoutsRef.current.push(timeoutId);
    });
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  useEffect(() => () => clearBootTimers(), []);

  useEffect(() => {
    clearBootTimers();
    bootStartedRef.current = false;
    setEntries(initialEntries);
    setHistory([]);
    setHistoryIndex(-1);
    setInput("");

    window.setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  }, [terminalResetKey]);

  useEffect(() => {
    const bootEntry = entries[0];
    const shouldBoot =
      terminalOpen &&
      entries.length === 1 &&
      bootEntry?.id === "boot" &&
      bootEntry.command === "" &&
      bootEntry.lines.length === 0 &&
      (!bootStartedRef.current || previousTerminalOpenRef.current === false);

    if (shouldBoot) {
      startBootSequence();
    }

    previousTerminalOpenRef.current = terminalOpen;
  }, [entries, terminalOpen]);

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
    <section className="flex h-full min-h-0 flex-col border-t border-[var(--border-default)] bg-[var(--bg-surface)] select-none font-sans">
      {/* Top Bar */}
      <div className="flex h-9 shrink-0 items-center justify-between px-4 border-b border-[var(--border-default)] bg-[var(--bg-muted)]/30">
        {/* Tabs */}
        <div className="flex h-full items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex h-full items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider transition-all ${
                activeTab === tab.key
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-disabled)] hover:text-[var(--text-muted)]"
              }`}
            >
              {tab.key}
              {tab.badge !== undefined && (
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-muted)] text-[9px] font-medium text-[var(--text-secondary)]">
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]" />
              )}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Terminal Profile */}
          <div className="cursor-pointer rounded-md px-2 py-1 text-[11px] font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-muted)]">
            <div className="flex items-center gap-1.5">
              <VscTerminal size={14} className="text-[var(--text-secondary)]" />
            <span>pwsh</span>
            </div>
          </div>
          
          <button title="Show Warnings" className="flex h-6 w-6 items-center justify-center rounded-md text-[var(--warning)] hover:bg-[var(--bg-muted)] transition-colors">
            <VscWarning size={14} />
          </button>
          
          <div className="flex border border-[var(--border-default)] rounded-md ml-1 overflow-hidden bg-[var(--bg-elevated)] shadow-sm">
             <button
               type="button"
               title="New Terminal"
               onClick={resetTerminal}
               className="flex h-6 w-7 items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-colors"
             >
               <VscAdd size={14} />
             </button>
             <button
               type="button"
               className="flex h-6 w-5 items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-muted)] border-l border-[var(--border-default)] transition-colors"
             >
               <VscChevronDown size={14} />
             </button>
          </div>

          <button
            type="button"
            title="Kill Terminal"
            onClick={() => setEntries([])}
            className="flex h-6 w-6 items-center justify-center rounded-md text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--error)] ml-1"
          >
            <VscClose size={16} />
          </button>
          
          <button
            type="button"
            title="Close Panel"
            onClick={toggleTerminal}
            className="flex h-6 w-6 items-center justify-center rounded-md text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
          >
            <VscClose size={16} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden font-mono text-[13px] bg-[var(--bg-surface)]">
        {activeTab === "Terminal" ? (
          <div
            ref={scrollRef}
            className="ide-scrollbar h-full overflow-y-auto px-3 py-2"
            onClick={() => inputRef.current?.focus()}
          >
            {entries.map((entry) => (
              <div key={entry.id} className="mb-1 last:mb-0">
                {entry.command ? (
                  <div className="flex items-center gap-2 leading-relaxed text-[var(--text-secondary)]">
                    <span className="font-medium">{prompt}</span>
                    <span className="text-[var(--text-primary)]">{entry.command}</span>
                  </div>
                ) : null}

                {entry.lines.map((line, index) => (
                  <div
                    key={`${entry.id}-${index}`}
                    className="pl-[18px] leading-relaxed text-[var(--text-muted)]"
                    style={{ transitionDelay: `${index * 30}ms` }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            ))}

            <form onSubmit={handleSubmit} className="mt-1 pb-4">
              <label className="flex items-center gap-2">
                <span className="font-medium text-[var(--accent)]">{prompt}</span>
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
                  className="min-w-0 flex-1 bg-transparent text-[var(--text-primary)] outline-none"
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                />
              </label>
            </form>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-[var(--text-disabled)]">
            {tabMessages[activeTab]}
          </div>
        )}
      </div>
    </section>
  );
}

