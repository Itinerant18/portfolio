"use client";

import React, { useState } from "react";
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaPhone
} from "react-icons/fa";
import { VscCheck, VscLoading } from "react-icons/vsc";

export default function ContactTab() {
  const [formData, setInput] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const links = [
    {
      title: "EMAIL",
      detail: "aniketkarmakar018@gmail.com",
      icon: <FaEnvelope className="text-[var(--info)]" />,
      tone: "color-mix(in srgb, var(--info) 10%, transparent)",
      href: "mailto:aniketkarmakar018@gmail.com"
    },
    {
      title: "LINKEDIN",
      detail: "linkedin.com/in/aniket-karmakar",
      icon: <FaLinkedin style={{ color: "var(--brand-linkedin)" }} />,
      tone: "color-mix(in srgb, var(--brand-linkedin) 10%, transparent)",
      href: "https://linkedin.com/in/aniket-karmakar"
    },
    {
      title: "GITHUB",
      detail: "github.com/Itinerant18",
      icon: <FaGithub className="text-[var(--text-primary)]" />,
      tone: "color-mix(in srgb, var(--text-primary) 10%, transparent)",
      href: "https://github.com/Itinerant18"
    },
    {
      title: "PHONE",
      detail: "7602676448",
      icon: <FaPhone className="text-[var(--success)]" />,
      tone: "color-mix(in srgb, var(--success) 10%, transparent)",
      href: "tel:+917602676448"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus("sending");
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      setInput({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="flex h-full w-full flex-col overflow-auto bg-[var(--bg-surface)] p-6 pb-32 text-[13px] font-sans text-[var(--text-primary)] ide-scrollbar md:p-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-9">
        <div className="font-mono text-[var(--text-muted)]">
          /* contact.css - let's build something together */
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-[30px] font-semibold tracking-[-0.04em] text-[var(--text-primary)] md:text-[42px]">
            Get In Touch
          </h1>
          <div className="font-mono text-[14px] text-[var(--text-muted)]">
            // open to collaboration and strategic opportunities
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col gap-8">
            <h2 className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
              <span className="h-px w-8 bg-[var(--border-hover)]" />
              Profiles
            </h2>
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-row items-center rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 shadow-sm transition-all hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)]"
                >
                  <div
                    className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg shadow-inner"
                    style={{ backgroundColor: link.tone }}
                  >
                    {link.icon}
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="mb-0.5 text-[10px] font-medium tracking-[0.12em] text-[var(--text-muted)] transition-colors group-hover:text-[var(--text-secondary)]">
                      {link.title}
                    </span>
                    <span className="text-[var(--text-secondary)] font-medium text-[13px] group-hover:text-[var(--text-primary)] transition-colors">
                      {link.detail}
                    </span>
                  </div>
                  <div className="text-[var(--text-disabled)] transition-all group-hover:translate-x-[2px] group-hover:text-[var(--text-secondary)]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h2 className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
              <span className="h-px w-8 bg-[var(--border-hover)]" />
              Message
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="ml-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  // name <span className="text-[var(--error)]">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={e => setInput({...formData, name: e.target.value})}
                  placeholder="string"
                  className="w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)] p-3 text-[var(--text-primary)] outline-none transition-all focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="ml-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  // email <span className="text-[var(--error)]">*</span>
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setInput({...formData, email: e.target.value})}
                  placeholder="string"
                  className="w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)] p-3 text-[var(--text-primary)] outline-none transition-all focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="ml-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  // message <span className="text-[var(--error)]">*</span>
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={e => setInput({...formData, message: e.target.value})}
                  placeholder="'''your message'''"
                  className="h-32 w-full resize-none rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)] p-3 font-mono text-[var(--info)] outline-none transition-all focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/20"
                />
              </div>
              
              <button
                type="submit"
                disabled={status !== "idle"}
                className={`flex w-full items-center justify-center gap-2 rounded-md p-3 text-[12px] font-semibold transition-all ${
                  status === "success" 
                    ? "bg-[var(--success)] text-white" 
                    : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] hover:shadow-sm"
                } disabled:opacity-50`}
              >
                {status === "sending" ? (
                  <>
                    <VscLoading className="animate-spin" size={18} />
                    <span>Transmitting...</span>
                  </>
                ) : status === "success" ? (
                  <>
                    <VscCheck size={18} />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={14} />
                    <span>send_message()</span>
                  </>
                )}
              </button>
              
              <div className="text-[var(--text-disabled)] text-[10px] font-medium text-center italic">
                // Direct transmission to aniketkarmakar018@gmail.com
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
