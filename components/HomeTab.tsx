"use client";

import React from "react";
import { useIDEStore } from "@/store/useIDEStore";
import { IDEButton, SectionLabel } from "@/components/ui/Primitives";
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
        <SectionLabel>Front-end UI development · React.js · full-stack · AI/ML · cloud</SectionLabel>

        <div className="flex flex-col">
          <h1 className="text-[42px] leading-[1.02] font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
            Aniket
          </h1>
          <h1 className="text-[42px] leading-[1.02] font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
            Karmakar
          </h1>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {[
            { label: "Front-end UI Developer", color: "var(--info)" },
            { label: "React.js", color: "var(--text-muted)" },
            { label: "Web Designer", color: "var(--text-muted)" },
            { label: "SEPLE, Noida", color: "var(--text-muted)" }
          ].map((tag, i) => (
            <div key={i} className="flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-muted)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-secondary)]">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tag.color }} />
              {tag.label}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-[16px] font-medium text-[var(--text-secondary)] md:text-[18px]">
            Front-end UI Developer &amp; Full-stack Web Developer
            <span className="ml-2 inline-block h-[14px] w-px translate-y-[2px] bg-[var(--accent)]/70" />
          </div>

          <div className="max-w-[64ch] text-[15px] leading-7 text-[var(--text-muted)] md:text-[16px]">
            Passionate Web Developer with a strong foundation in <span className="text-[var(--text-primary)] font-semibold">Front-End Web Dev</span>, <span className="text-[var(--text-primary)] font-semibold">React.js</span>, <span className="text-[var(--text-primary)] font-semibold">Full-Stack Development</span>, and <span className="text-[var(--text-primary)] font-semibold">AI/ML</span>. Committed to building scalable, unique software solutions with elegantly-designed architecture.
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <IDEButton
            onClick={() => openFile("data/projects.ts")}
            variant="primary"
            className="px-5"
          >
            <VscFiles size={16} /> View Projects
          </IDEButton>
          <IDEButton
            onClick={() => openFile("components/AboutTab.tsx")}
            variant="secondary"
            className="px-5"
          >
            <VscAccount size={16} /> About Me
          </IDEButton>
          <IDEButton
            onClick={() => openFile("components/ContactTab.tsx")}
            variant="ghost"
            className="px-5"
          >
            <VscMail size={16} /> Contact
          </IDEButton>
        </div>

        <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] md:grid-cols-4">
          {[
            { value: "8.6", label: "CGPA" },
            { value: "36+", label: "PROJECTS" },
            { value: "4+", label: "INTERNSHIPS" },
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
          <SectionLabel>Social</SectionLabel>
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
