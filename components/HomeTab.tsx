"use client";

import React from "react";
import { useIDEStore } from "@/store/useIDEStore";
import { 
  FaGithub, FaLinkedin, 
  FaEnvelope, FaPhone
} from "react-icons/fa";
import { VscFiles, VscAccount, VscMail } from "react-icons/vsc";

export default function HomeTab() {
  const openFile = useIDEStore((state) => state.openFile);

  const socialLinks = [
    { name: "GitHub", icon: FaGithub, color: "var(--brand-github)" },
    { name: "LinkedIn", icon: FaLinkedin, color: "var(--brand-linkedin)" },
    { name: "Email", icon: FaEnvelope, color: "var(--brand-email)" },
    { name: "Phone", icon: FaPhone, color: "var(--success)" },
  ];

  return (
    <div className="ide-scrollbar flex h-full w-full flex-col overflow-auto bg-[var(--bg-surface)] px-6 pb-28 pt-8 text-[13px] font-sans text-[var(--text-primary)] md:px-10 md:pt-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 md:gap-10">
        
        <div className="font-mono text-[12px] text-[var(--text-muted)]">
          // full-stack development, AI/ML systems, IoT, and cloud infrastructure
        </div>

        <div className="flex flex-col">
          <h1 className="text-[42px] leading-[1.02] font-semibold tracking-[-0.04em] text-[var(--text-primary)] md:text-[56px] lg:text-[64px]">
            Aniket
          </h1>
          <h1 className="text-[42px] leading-[1.02] font-semibold tracking-[-0.04em] text-[var(--accent)] md:text-[56px] lg:text-[64px]">
            Karmakar
          </h1>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {[
            { label: "Software Engineer", color: "var(--info)" },
            { label: "Full-Stack Dev", color: "var(--accent)" },
            { label: "AI / ML", color: "var(--success)" },
            { label: "SEPL, Kolkata", color: "var(--error)" }
          ].map((tag, i) => (
            <div key={i} className="flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-muted)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-secondary)]">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tag.color }} />
              {tag.label}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-[16px] font-medium text-[var(--text-secondary)] md:text-[18px]">
            Building full-stack applications &amp; AI/ML systems
            <span className="ml-2 inline-block h-[14px] w-px translate-y-[2px] bg-[var(--accent)]/70" />
          </div>

          <div className="max-w-[64ch] text-[15px] leading-7 text-[var(--text-muted)] md:text-[16px]">
            I live at the crossroads of <span className="text-[var(--text-primary)] font-semibold">full-stack development</span>, <span className="text-[var(--text-primary)] font-semibold">AI/ML</span>, <span className="text-[var(--text-primary)] font-semibold">IoT</span>, and <span className="text-[var(--text-primary)] font-semibold">cloud infrastructure</span>. I ship real products with a focus on intelligent, scalable systems.
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => openFile("data/projects.ts")}
            className="flex items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-2.5 text-[12px] font-semibold text-white shadow-sm transition-all hover:bg-[var(--accent-hover)] hover:shadow-md"
          >
            <VscFiles size={16} /> View Projects
          </button>
          <button 
            onClick={() => openFile("components/AboutTab.tsx")}
            className="flex items-center gap-2 rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)] px-5 py-2.5 text-[12px] font-medium text-[var(--text-primary)] transition-all hover:border-[var(--border-hover)] hover:bg-[var(--bg-overlay)]"
          >
            <VscAccount size={16} /> About Me
          </button>
          <button 
            onClick={() => openFile("components/ContactTab.tsx")}
            className="flex items-center gap-2 rounded-md border border-[var(--border-default)] bg-transparent px-5 py-2.5 text-[12px] font-medium text-[var(--text-primary)] transition-all hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)]"
          >
            <VscMail size={16} /> Contact
          </button>
        </div>

        <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] md:grid-cols-4">
          {[
            { value: "4+", label: "YEARS" },
            { value: "15+", label: "PROJECTS" },
            { value: "∞", label: "CURIOSITY" },
            { value: "↑", label: "LEARNING" }
          ].map((stat, i) => (
            <div key={i} className={`flex flex-col items-center justify-center border-[var(--border-default)] px-4 py-5 ${i < 3 ? 'md:border-r' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''}`}>
              <div className="mb-1 text-[24px] font-semibold tracking-[-0.03em] text-[var(--text-primary)] md:text-[28px]">
                {stat.value}
              </div>
              <div className="text-[10px] font-medium tracking-[0.12em] text-[var(--text-muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">Social</div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {socialLinks.map(social => (
              <button 
                key={social.name} 
                className="group flex items-center gap-2.5 rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)] px-3.5 py-2 text-[12px] text-[var(--text-secondary)] transition-all hover:border-[var(--border-hover)] hover:bg-[var(--bg-overlay)] hover:text-[var(--text-primary)]"
              >
                <social.icon className="opacity-80 transition-opacity group-hover:opacity-100" size={16} style={{ color: social.color }} />
                <span className="font-medium">{social.name}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
