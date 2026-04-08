"use client";

import { buildAIResponse } from "@/data/content";
import { getPortfolioFile } from "@/data/files";
import { type ChatMessage, useIDEStore } from "@/store/useIDEStore";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { 
  VscAdd, VscEllipsis, VscArrowRight, 
  VscCircuitBoard, VscLibrary, VscSparkle 
} from "react-icons/vsc";

function createMessage(role: "user" | "assistant", content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
  };
}

export default function SidebarAI({ mode = "sidebar" }: { mode?: "sidebar" | "full" }) {
  void mode;
  const activeFile = useIDEStore((state) => state.activeFile);
  const chatMessages = useIDEStore((state) => state.chatMessages);
  const addMessage = useIDEStore((state) => state.addMessage);
  const clearChat = useIDEStore((state) => state.clearChat);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const suggestions = [
    "Summarize the strongest projects",
    "What stack does Aniket use most?",
    "Which experience is most relevant for UI roles?",
  ];
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
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

    window.setTimeout(() => {
      const activeMeta = activeFile ? getPortfolioFile(activeFile) : undefined;
      const reply = buildAIResponse(trimmed, activeMeta?.name);
      addMessage(createMessage("assistant", reply));
      setPending(false);
    }, 260);
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[var(--bg-elevated)] text-[13px] font-sans border-r border-[var(--border-default)] text-[var(--text-secondary)] select-none">
      {/* Header */}
      <div className="flex h-9 shrink-0 items-center justify-between px-3 border-b border-[var(--border-default)] bg-[var(--bg-muted)]/30">
        <div className="flex items-center gap-2">
          <VscSparkle className="text-[var(--accent)]" size={14} />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" style={{ animation: "glow-pulse 2.4s ease-in-out infinite" }} />
          <span className="font-bold text-[var(--text-primary)] text-[11px] uppercase tracking-wider">AI Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleNewChat} title="New Chat" className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-[var(--bg-muted)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <VscAdd size={16} />
          </button>
          <button className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-[var(--bg-muted)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <VscEllipsis size={16} />
          </button>
        </div>
      </div>

      {/* Agent Chat Container */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto ide-scrollbar px-2 py-3 flex flex-col gap-4">
        
        {/* Chat History */}
        <div className="flex flex-col gap-4">
          {chatMessages.length === 1 && !pending ? (
            <div className="flex flex-col gap-3">
              <div className="text-[12px] text-[var(--text-muted)]">
                Start with a prompt or use one of these suggestions.
              </div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {suggestions.map((suggestion) => (
                  <motion.button
                    key={suggestion}
                    type="button"
                    onClick={() => setInput(suggestion)}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center whitespace-nowrap rounded-sm border border-[var(--border-default)] bg-[var(--bg-base)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)] transition-colors hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>
          ) : null}

          {chatMessages.map((message) => (
            <div key={message.id} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className={`h-1.5 w-1.5 rounded-full ${message.role === 'assistant' ? 'bg-[var(--accent)]' : 'bg-[var(--info)]'}`} />
                <span className="text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)]">
                  {message.role === "assistant" ? "Assistant" : "You"}
                </span>
              </div>
              <div className="text-[13px] leading-relaxed text-[var(--text-primary)] whitespace-pre-wrap pl-3.5 border-l border-[var(--border-default)] ml-0.5">
                {message.content}
              </div>
            </div>
          ))}
          
          {pending && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)]">Assistant</span>
              </div>
              <div className="flex items-center gap-1.5 pl-3.5">
                 <span className="h-1.5 w-1.5 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                 <span className="h-1.5 w-1.5 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                 <span className="h-1.5 w-1.5 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="border-t border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2">
        <div className="relative flex flex-col overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-base)] shadow-lg transition-all focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)]/20">
          <textarea
            ref={inputRef}
            rows={3}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask anything..."
            className="w-full resize-none bg-transparent px-4 pt-4 pb-14 text-[13px] leading-relaxed text-[var(--text-primary)] outline-none placeholder:text-[var(--text-disabled)]"
          />

          {/* Input Toolbar */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button className="flex h-7 items-center gap-1.5 rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] px-2.5 text-[11px] font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]">
                <VscCircuitBoard size={13} className="text-[var(--accent)]" />
                <span>Agent</span>
              </button>
              <button className="flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[11px] font-medium text-[var(--text-muted)] transition-all hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]">
                <VscLibrary size={13} />
                <span>Context</span>
              </button>
            </div>

            <button
              onClick={handleSend}
              disabled={!input.trim() || pending}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed shadow-sm"
            >
               <VscArrowRight size={16} strokeWidth={1} />
            </button>
          </div>
        </div>
        <div className="mt-3 text-[10px] text-center text-[var(--text-disabled)] font-medium opacity-50">
          ⌘ + Enter to send • ⇧ + Enter for new line
        </div>
      </div>
    </div>
  );
}
