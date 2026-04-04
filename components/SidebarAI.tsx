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
  const [selectedAgent, setSelectedAgent] = useState<(typeof agents)[number]["id"]>("default");
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

    window.setTimeout(() => {
      const activeMeta = activeFile ? getPortfolioFile(activeFile) : undefined;
      const reply = buildAIResponse(trimmed, activeMeta?.name);
      addMessage(createMessage("assistant", reply));
      setPending(false);
    }, 260);
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[#18181A] text-[13px] font-sans border-r border-[#1e1e24] text-[#cccccc] select-none">
      {/* Header */}
      <div className="flex h-[35px] shrink-0 items-center justify-between px-3">
        <div className="flex items-center gap-[6px]">
          <span className="font-semibold text-[#cccccc] text-[12px]">New Agent</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleNewChat} className="flex h-5 w-5 items-center justify-center rounded-[4px] hover:bg-[#2a2d31] text-[#8b8b9e] hover:text-[#cccccc] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          </button>
          <button className="flex h-5 w-5 items-center justify-center rounded-[4px] hover:bg-[#2a2d31] text-[#8b8b9e] hover:text-[#cccccc] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
          </button>
        </div>
      </div>

      {/* Agent Chat Container */}
      <div className="flex-1 overflow-y-auto ide-scrollbar px-3 py-2">
        {/* Input Box */}
        <div className="flex flex-col rounded-[6px] border border-[#2a2d31] bg-[#1c1c1f] transition-colors focus-within:border-[#38383f] relative pb-2 pt-2 shadow-sm mb-4">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder="Plan, Build, / for commands, @ for context"
            className="w-full resize-none bg-transparent px-3 pb-6 text-[13px] leading-[20px] text-[#cccccc] outline-none placeholder:text-[#5e5e66] placeholder:font-normal"
          />
          
          {/* Input Toolbar */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            <div className="flex items-center gap-[4px]">
              <button className="flex h-[20px] items-center gap-[4px] rounded-[4px] border border-[#2a2d31] bg-[#222226] px-[6px] text-[11px] font-medium text-[#8b8b9e] hover:bg-[#2a2d31] hover:text-[#cccccc] transition-colors">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
                Agent
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <button className="flex h-[20px] items-center gap-[4px] rounded-[4px] bg-transparent px-[4px] text-[11px] font-medium text-[#8b8b9e] hover:text-[#cccccc] transition-colors">
                Auto
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </div>
            
            <button 
              onClick={handleSend}
              disabled={!input.trim() || pending}
              className="flex h-[24px] w-[24px] items-center justify-center rounded-[5px] text-[#8b8b9e] hover:text-[#cccccc] hover:bg-[#2a2d31] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
            </button>
          </div>
        </div>
        
        {/* Context Picker */}
        <button className="flex items-center gap-1.5 text-[11px] text-[#8b8b9e] hover:text-[#cccccc] mb-4 group transition-colors">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
          <span>Local</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>

        {/* Chat History */}
        <div className="flex flex-col gap-4 pb-4">
          {chatMessages.map((message) => (
            <div key={message.id} className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-[#8b8b9e]">{message.role === "assistant" ? "Assistant" : "You"}</span>
              <div className="text-[13px] leading-[20px] text-[#cccccc] whitespace-pre-wrap">
                {message.content}
              </div>
            </div>
          ))}
          {pending && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-[#8b8b9e]">Assistant</span>
              <div className="flex items-center gap-1">
                 <span className="h-1.5 w-1.5 bg-[#8b8b9e] rounded-full animate-pulse" />
                 <span className="h-1.5 w-1.5 bg-[#8b8b9e] rounded-full animate-pulse delay-75" />
                 <span className="h-1.5 w-1.5 bg-[#8b8b9e] rounded-full animate-pulse delay-150" />
              </div>
            </div>
          )}
        </div>
        <div ref={scrollRef} />
      </div>
    </div>
  );
}
