"use client";

import React from "react";

const skillCategories = [
  {
    title: "FRONTEND & UI/UX",
    skills: [
      { name: "React & Next.js", percentage: 88, color: "var(--info)" },
      { name: "Tailwind CSS & Radix UI", percentage: 92, color: "var(--success)" },
      { name: "Zustand & React Query", percentage: 85, color: "var(--warning)" },
      { name: "Framer Motion", percentage: 80, color: "var(--accent)" },
      { name: "Vite", percentage: 85, color: "var(--info)" },
    ],
  },
  {
    title: "AI AGENTS & LLMs",
    skills: [
      { name: "LangChain", percentage: 82, color: "var(--success)" },
      { name: "RAG Architecture", percentage: 85, color: "var(--info)" },
      { name: "Pinecone (Vector DB)", percentage: 80, color: "var(--accent)" },
      { name: "OpenAI & Google GenAI", percentage: 82, color: "var(--warning)" },
      { name: "HuggingFace", percentage: 75, color: "var(--warning)" },
    ],
  },
  {
    title: "BACKEND & APIs",
    skills: [
      { name: "Node.js & Express", percentage: 80, color: "var(--success)" },
      { name: "Python (Flask)", percentage: 75, color: "var(--info)" },
      { name: "REST APIs & Middleware", percentage: 85, color: "var(--warning)" },
      { name: "WebSockets / Socket.io", percentage: 72, color: "var(--accent)" },
      { name: "Security & Auth (JWT)", percentage: 78, color: "var(--info)" },
    ],
  },
  {
    title: "DATABASES & BaaS",
    skills: [
      { name: "PostgreSQL & Neon", percentage: 82, color: "var(--info)" },
      { name: "Supabase & Convex", percentage: 85, color: "var(--success)" },
      { name: "SQLite", percentage: 80, color: "var(--warning)" },
      { name: "Redis", percentage: 75, color: "var(--error)" },
      { name: "Firebase", percentage: 70, color: "var(--warning)" },
    ],
  },
  {
    title: "MOBILE & CROSS-PLATFORM",
    skills: [
      { name: "React Native", percentage: 75, color: "var(--info)" },
      { name: "Expo", percentage: 78, color: "var(--accent)" },
      { name: "Capacitor", percentage: 70, color: "var(--info)" },
      { name: "Native ML Integrations", percentage: 72, color: "var(--warning)" },
      { name: "Flutter / Dart", percentage: 65, color: "var(--info)" },
    ],
  },
];

const familiarTags = [
  "Chakra UI",
  "React Hook Form",
  "Zod",
  "Ollama",
  "pdf-parse",
  "HTTPX",
  "Asyncio",
  "Helmet",
  "Argon2",
  "Razorpay Integrations",
  "LRU Caching",
  "React Router v7",
  "Class Variance Authority",
];

export default function SkillsTab() {
  return (
    <div className="flex h-full w-full flex-col overflow-auto bg-[var(--bg-surface)] text-[var(--text-primary)] font-sans text-[13px] ide-scrollbar p-6 md:p-12 pb-32">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-10">
        <div className="font-mono text-[var(--text-muted)]">
          // skills.json - core competency matrix
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-[32px] md:text-[48px] font-black tracking-tight text-[var(--text-primary)]">
            Technical Skills
          </h1>
          <div className="font-mono text-[14px]">
            <span className="text-[var(--accent)]">const</span> <span className="text-[var(--info)]">capabilities</span> = {"{ "}
            <span className="text-[var(--warning)]">status</span>: <span className="text-[var(--success)]">"actively_evolving"</span>,{" "}
            <span className="text-[var(--warning)]">growth</span>: <span className="text-[var(--success)]">"exponential"</span>
            {" }"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mt-4">
          {skillCategories.map((category) => (
            <div key={category.title} className="flex flex-col gap-6">
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--accent)] flex items-center gap-3">
                <span className="h-px flex-1 bg-[var(--border-default)]" />
                {category.title}
              </h2>
              <div className="flex flex-col gap-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-2">
                    <div className="flex justify-between items-end px-0.5">
                      <span className="text-[13px] font-bold text-[var(--text-secondary)]">
                        {skill.name}
                      </span>
                      <span className="text-[11px] font-black text-[var(--text-muted)] font-mono">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[var(--bg-muted)] overflow-hidden relative border border-[var(--border-default)]/50">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(0,0,0,0.2)]"
                        style={{
                          width: `${skill.percentage}%`,
                          backgroundColor: skill.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--border-default)] pt-10">
          <h2 className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
            ECOSYSTEM & LIBRARIES
          </h2>
          <div className="flex flex-wrap gap-2">
            {familiarTags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-muted)] px-3 py-1.5 text-[12px] font-bold text-[var(--text-secondary)] hover:border-[var(--accent)]/50 hover:bg-[var(--bg-overlay)] hover:text-[var(--text-primary)] transition-all cursor-default shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
