"use client";

import { buildAIResponse } from "@/data/content";
import { getPortfolioFile } from "@/data/files";
import { type ChatMessage, useIDEStore } from "@/store/useIDEStore";
import { useEffect, useRef, useState } from "react";

const agents = [
  { id: "default", label: "Default Agent", detail: "General workspace help" },
  { id: "projects", label: "Projects Agent", detail: "Project and delivery questions" },
  { id: "systems", label: "Systems Agent", detail: "Architecture and tooling questions" },
] as const;

type AgentId = (typeof agents)[number]["id"];

function createMessage(role: "user" | "assistant", content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
  };
}

export default function SidebarAI() {
  const activeFile = useIDEStore((state) => state.activeFile);
  const chatMessages = useIDEStore((state) => state.chatMessages);
  const addMessage = useIDEStore((state) => state.addMessage);
  const clearChat = useIDEStore((state) => state.clearChat);
  const [input, setInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<AgentId>("default");
  const [pending, setPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "auto",
    });
  }, [chatMessages, pending]);

  useEffect(() => {
    const handleFocus = () => {
      inputRef.current?.focus();
    };

    window.addEventListener("focus-ai-input", handleFocus);
    return () => window.removeEventListener("focus-ai-input", handleFocus);
  }, []);

  function handleNewChat() {
    clearChat();
    setInput("");
    setPending(false);
  }

  function handleSend() {
    const trimmed = input.trim();

    if (!trimmed || pending) {
      return;
    }

    addMessage(createMessage("user", trimmed));
    setInput("");
    setPending(true);

    // BUG FIX #7: Pass selectedAgent to buildAIResponse so agent context actually affects replies
    setTimeout(() => {
      const activeMeta = activeFile ? getPortfolioFile(activeFile) : undefined;
      const reply = buildAIResponse(trimmed, activeMeta?.name, selectedAgent);
      addMessage(createMessage("assistant", reply));
      setPending(false);
    }, 260);
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[var(--bg-main)] text-[12px]">
      {/* BUG FIX #8: Was labeled "New Chat" as a title — confusing because it looked like a button.
          Changed to "AI Assistant" as the panel title. Reset button stays on the right. */}
      <div className="flex h-9 items-center justify-between border-b border-[var(--border)] px-2">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <span className="leading-none text-[var(--text)]">AI Assistant</span>
        </div>
        <button
          type="button"
          onClick={handleNewChat}
          title="Clear chat session"
          className="h-6 px-2 leading-none text-[var(--text-muted)] transition hover:bg-[var(--bg-hover)] hover:text-[var(--text)]"
        >
          Reset
        </button>
      </div>

      <div className="border-b border-[var(--border)] p-2">
        <label className="block border border-[var(--border)] bg-[var(--bg-main)] focus-within:border-[var(--accent)] transition">
          <textarea
            ref={inputRef}
            rows={2}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask the assistant"
            className="h-14 w-full resize-none bg-transparent px-2 py-1.5 text-[12px] leading-[18px] text-[var(--text)] outline-none placeholder:text-[var(--text-muted)]"
          />
        </label>

        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || pending}
            className="h-7 flex-1 border border-[var(--border)] px-2 text-[12px] leading-none text-[var(--text-muted)] transition hover:bg-[var(--bg-hover)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Running…" : "Send ↵"}
          </button>
          {/* Agent quick-select pill */}
          <span className="text-[11px] text-[var(--text-muted)] opacity-70">
            {agents.find((a) => a.id === selectedAgent)?.label.replace(" Agent", "")}
          </span>
        </div>
      </div>

      <div className="border-b border-[var(--border)] p-2">
        <div className="mb-1.5 text-[11px] leading-none text-[var(--text-muted)]">Agents</div>
        <div className="space-y-1">
          {agents.map((agent) => (
            <button
              key={agent.id}
              type="button"
              onClick={() => setSelectedAgent(agent.id)}
              className={`flex h-6 w-full items-center justify-between px-2 text-left transition ${
                selectedAgent === agent.id
                  // BUG FIX #7 (visual): Active agent now uses accent-soft for clear selection
                  ? "bg-[var(--accent-soft)] text-[var(--text)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--bg-panel)] hover:text-[var(--text)]"
              }`}
            >
              <div className="flex items-center gap-1.5">
                {selectedAgent === agent.id && (
                  <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                )}
                <span className="truncate leading-none">{agent.label}</span>
              </div>
              <span className="ml-2 truncate text-[11px] leading-none opacity-70">
                {agent.detail}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div ref={scrollRef} className="ide-scrollbar min-h-0 flex-1 overflow-y-auto p-2">
        <div className="mb-1.5 text-[11px] leading-none text-[var(--text-muted)]">Session</div>
        <div className="space-y-1">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className="border-b border-[var(--border)] px-2 py-1.5 last:border-b-0"
            >
              <div className="mb-1 flex items-center gap-1.5">
                <span
                  className={`h-1 w-1 rounded-full ${
                    message.role === "assistant"
                      ? "bg-[var(--accent)]"
                      : "bg-[var(--text-muted)]"
                  }`}
                />
                <span className="text-[11px] leading-none text-[var(--text-muted)]">
                  {message.role === "assistant" ? "Assistant" : "You"}
                </span>
              </div>
              <div className="text-[12px] leading-[18px] text-[var(--text)]">
                {message.content}
              </div>
            </div>
          ))}
          {pending ? (
            <div className="border-b border-[var(--border)] px-2 py-1.5 text-[12px] leading-[18px] text-[var(--text-muted)]">
              <span className="inline-flex gap-0.5">
                <span className="animate-pulse">·</span>
                <span className="animate-pulse delay-75">·</span>
                <span className="animate-pulse delay-150">·</span>
              </span>
              {" "}Assistant is responding…
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
