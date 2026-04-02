"use client";

import { useIDEStore } from "@/store/useIDEStore";
import { executeTerminalCommand } from "@/utils/commands";
import { useEffect, useMemo, useRef, useState } from "react";

interface TerminalEntry {
  id: string;
  command: string;
  lines: string[];
}

function createId() {
  return `terminal-${Math.random().toString(36).slice(2, 8)}`;
}

export default function Terminal() {
  const openFile = useIDEStore((state) => state.openFile);
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      id: "boot",
      command: "",
      lines: ['Type "help" to list commands.'],
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prompt = useMemo(() => "nyla@portfolio $", []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "auto",
    });
  }, [entries]);

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

  return (
    <section className="flex h-full min-h-0 flex-col border-t border-[var(--border)] bg-[#010409]">
      <div className="flex h-8 items-center border-b border-[var(--border)] px-2 text-[12px] leading-none text-[var(--text-muted)]">
        TERMINAL
      </div>

      <div
        ref={scrollRef}
        className="ide-scrollbar flex-1 overflow-y-auto px-2 py-2 font-mono text-[12px]"
        onClick={() => inputRef.current?.focus()}
      >
        {entries.map((entry) => (
          <div key={entry.id} className="mb-2 last:mb-0">
            {entry.command ? (
              <div className="flex items-center gap-2 leading-[18px] text-[var(--text)]">
                <span className="text-[var(--accent)]">{prompt}</span>
                <span>{entry.command}</span>
              </div>
            ) : null}

            {entry.lines.map((line, index) => (
              <div
                key={`${entry.id}-${index}`}
                className="leading-[18px] text-[var(--text-muted)]"
              >
                {line}
              </div>
            ))}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-[var(--border)] px-2 py-2">
        <label className="flex items-center gap-2">
          <span className="text-[var(--accent)]">{prompt}</span>
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
            placeholder='Try "help" or "open projects.ts"'
            className="min-w-0 flex-1 bg-transparent text-[12px] text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
          />
        </label>
      </form>
    </section>
  );
}
