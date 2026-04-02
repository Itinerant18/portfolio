"use client";

import { useIDEStore, ChatMessage } from "@/store/useIDEStore";
import { useState, useRef, useEffect } from "react";

export default function SidebarAI() {
  const chatMessages = useIDEStore((state) => state.chatMessages);
  const addMessage = useIDEStore((state) => state.addMessage);
  const clearChat = useIDEStore((state) => state.clearChat);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    addMessage(userMsg);
    setInput("");

    // Minimal delay for product feel
    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Analyzing workspace... I found several projects in your explorer. The "CodeFlow SDK" seems most relevant to your question.`,
      };
      addMessage(assistantMsg);
    }, 400);
  };

  const handleNewChat = () => {
    clearChat();
    addMessage({
      id: "welcome-" + Date.now(),
      role: "assistant",
      content: "New session started. How can I help with your code or portfolio today?",
    });
  };

  return (
    <div className="flex h-full flex-col text-[11px] select-none bg-[var(--bg-sidebar)]">
      {/* Dense Header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-2.5 h-[32px] shrink-0">
        <span className="font-bold text-[var(--text-muted)] uppercase tracking-wider text-[10px]">Chat</span>
        <div className="flex items-center gap-1">
           <button 
             onClick={handleNewChat}
             className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]"
             title="New Chat"
           >
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
           </button>
           <button className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
           </button>
        </div>
      </div>

      {/* Denser Message List */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar p-2.5 space-y-3">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-0.5 ${msg.role === "user" ? "items-end pl-4" : "items-start pr-4"}`}
          >
            <div className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-tight opacity-70">
              {msg.role === "assistant" ? "Cursor" : "You"}
            </div>
            <div className={`leading-snug py-1.5 px-2.5 rounded-[2px] border ${
              msg.role === "user" 
                ? "bg-[var(--accent-muted)] text-[var(--text)] border-[var(--accent)]" 
                : "bg-[var(--bg-active)] text-[var(--text)] border-[var(--border)]"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Compact Input Area */}
      <div className="border-t border-[var(--border)] p-2 bg-[var(--bg-sidebar)]">
        <div className="relative border border-[var(--border)] bg-[var(--bg-app)] focus-within:border-[var(--accent)]">
          <textarea
            className="w-full bg-transparent p-2 pr-8 outline-none resize-none no-scrollbar h-[60px] text-[11px] placeholder-[var(--text-muted)] leading-normal"
            placeholder="Ask AI... (Ctrl+L)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button 
            onClick={handleSend}
            className="absolute bottom-1.5 right-1.5 p-1 text-[var(--text-muted)] hover:text-[var(--accent)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-tighter">
          <div className="flex gap-2">
            <span className="cursor-pointer hover:text-[var(--text)]">@ Symbols</span>
            <span className="cursor-pointer hover:text-[var(--text)]"># Docs</span>
          </div>
          <div className="flex items-center gap-1 opacity-80">
             <span className="w-1 h-1 rounded-full bg-green-500"></span>
             <span>Claude 3.5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
