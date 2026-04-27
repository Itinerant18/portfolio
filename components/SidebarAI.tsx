"use client";

import { type ChatMessage, useIDEStore } from "@/store/useIDEStore";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
  const chatMessages = useIDEStore((state) => state.chatMessages);
  const addMessage = useIDEStore((state) => state.addMessage);
  const updateLastMessage = useIDEStore((state) => state.updateLastMessage);
  const clearChat = useIDEStore((state) => state.clearChat);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [flash, setFlash] = useState(false);
  const suggestions = [
    "What projects has Aniket built?",
    "What is Aniket's current tech stack?",
    "Tell me about Aniket's work experience",
    "How can I contact Aniket?",
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
    setFlash(true);
    setTimeout(() => {
      clearChat();
      setInput("");
      setPending(false);
      setFlash(false);
    }, 300);
  }

  async function handleSend() {
    const trimmed = input.trim();

    if (!trimmed || pending) {
      return;
    }

    const newUserMsg = createMessage("user", trimmed);
    const streamingMsg: ChatMessage = {
      id: `streaming-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      role: "assistant",
      content: "",
    };

    addMessage(newUserMsg);
    addMessage(streamingMsg);
    setInput("");
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...chatMessages, newUserMsg].map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("AI service unavailable");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const event of events) {
          const dataLines = event
            .split("\n")
            .filter((line) => line.startsWith("data: "))
            .map((line) => line.slice(6));

          for (const data of dataLines) {
            if (data === "[DONE]") {
              continue;
            }

            try {
              const parsed = JSON.parse(data) as {
                text?: string;
                error?: string;
              };

              if (parsed.error) {
                throw new Error(parsed.error);
              }

              if (parsed.text) {
                updateLastMessage(parsed.text);
              }
            } catch (error) {
              if (error instanceof SyntaxError) {
                continue;
              }

              throw error;
            }
          }
        }
      }
    } catch {
      useIDEStore.setState((state) => ({
        chatMessages: state.chatMessages.map((message, index) =>
          index === state.chatMessages.length - 1
            ? {
                ...message,
                content:
                  "Sorry, I couldn't connect to the AI service. Check your API key.",
              }
            : message,
        ),
      }));
    } finally {
      setPending(false);
    }
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
        <motion.div 
          animate={{ opacity: flash ? [1, 0, 1] : 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4"
        >
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

          {chatMessages.map((message, index) => {
            const isAsst = message.role === "assistant";
            const isStreamingLast = pending && index === chatMessages.length - 1;
            return (
              <div key={message.id} className={`flex flex-col gap-1 ${isAsst ? "items-start" : "items-end"}`}>
                <div className="flex items-center gap-1.5">
                  {isAsst ? (
                    <div className="flex items-center justify-center w-5 h-5 rounded-sm bg-[var(--accent)]/10 text-[var(--accent)]">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4l7.07 17 2.51-7.39L21 11.07z" />
                      </svg>
                    </div>
                  ) : (
                    <span className="text-[10px] font-medium text-[var(--text-muted)]">You</span>
                  )}
                </div>

                <div className={`text-[12px] leading-snug p-2.5 max-w-[90%] ${
                  isAsst
                    ? "rounded-r-md rounded-bl-md border-l-2 border-[var(--accent)] bg-[var(--accent)]/[0.04]"
                    : "rounded-l-md rounded-br-md bg-[var(--bg-elevated)] border border-[var(--border-default)]"
                }`}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => <p className="mb-1.5 last:mb-0 leading-snug">{children}</p>,
                      ul: ({ children }) => <ul className="space-y-0.5 mb-1.5">{children}</ul>,
                      ol: ({ children }) => <ol className="space-y-0.5 mb-1.5 pl-3">{children}</ol>,
                      li: ({ children }) => <li className="flex items-start gap-1.5"><span className="text-[var(--accent)] mt-0.5"></span><span className="flex-1">{children}</span></li>,
                      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                      code: ({ children }) => <code className="bg-[var(--bg-muted)] px-1 py-0.5 rounded text-[var(--accent)] text-[11px] font-mono">{children}</code>,
                      pre: ({ children }) => <pre className="bg-[var(--bg-muted)] p-2 rounded overflow-x-auto mb-1.5 text-[11px]">{children}</pre>,
                      a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline text-[11px]">{children}</a>,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                  {isStreamingLast && (
                    <span className="ml-0.5 inline-block w-1.5 h-3 bg-[var(--accent)] animate-pulse" />
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Input Section */}
      <div className="border-t border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2">
        <div className="relative flex flex-col overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-base)] shadow-[var(--shadow-ambient)] transition-all focus-within:border-[var(--accent)] focus-within:shadow-[var(--shadow-focus)]">
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
              className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent)] text-white shadow-[var(--shadow-ambient)] transition-all hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-30 disabled:grayscale"
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
