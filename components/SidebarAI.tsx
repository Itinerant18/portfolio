"use client";

import { buildAIResponse } from "@/data/content";
import { getPortfolioFile } from "@/data/files";
import { type ChatMessage, useIDEStore } from "@/store/useIDEStore";
import { useEffect, useRef, useState } from "react";
import { 
  VscAdd, VscEllipsis, VscArrowRight, VscCheck, 
  VscCircuitBoard, VscLibrary, VscSparkle 
} from "react-icons/vsc";

const agents = [
  { id: "default", label: "Default Agent", detail: "General workspace help" },
  { id: "projects", label: "Projects Agent", detail: "Project and delivery questions" },
  { id: "systems", label: "Systems Agent", detail: "Architecture and tooling questions" },
] as const;

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
  const [pending, setPending] = useState(false);
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
      <div ref={scrollRef} className="flex-1 overflow-y-auto ide-scrollbar px-3 py-4 flex flex-col gap-6">
        
        {/* Chat History */}
        <div className="flex flex-col gap-6">
          {chatMessages.map((message) => (
            <div key={message.id} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className={`h-1.5 w-1.5 rounded-full ${message.role === 'assistant' ? 'bg-[var(--accent)]' : 'bg-[var(--info)]'}`} />
                <span className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">
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
                <span className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">Assistant</span>
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
      <div className="p-3 border-t border-[var(--border-default)] bg-[var(--bg-elevated)]">
        <div className="flex flex-col rounded-lg border border-[var(--border-default)] bg-[var(--bg-muted)] transition-all focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)]/30 relative overflow-hidden">
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
            placeholder="Ask about projects, skills, or experience..."
            className="w-full resize-none bg-transparent px-3 pt-3 pb-10 text-[13px] leading-relaxed text-[var(--text-primary)] outline-none placeholder:text-[var(--text-disabled)]"
          />
          
          {/* Input Toolbar */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button className="flex h-6 items-center gap-1.5 rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] px-2 text-[10px] font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all">
                <VscCircuitBoard size={12} className="text-[var(--accent)]" />
                <span>Agent</span>
              </button>
              <button className="flex h-6 items-center gap-1.5 rounded-md border border-transparent bg-transparent px-2 text-[10px] font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all">
                <VscLibrary size={12} />
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
        <div className="mt-2 text-[10px] text-center text-[var(--text-disabled)] font-medium">
          Press Enter to send, Shift + Enter for new line
        </div>
      </div>
    </div>
  );
}
