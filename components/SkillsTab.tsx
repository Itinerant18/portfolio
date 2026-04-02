"use client";

import React from "react";

const skillCategories = [
  {
    title: "FRONTEND & UI/UX (8.5/10)",
    skills: [
      { name: "React & Next.js", percentage: 88, color: "#61afef" },
      { name: "Tailwind CSS & Radix UI", percentage: 92, color: "#98c379" },
      { name: "Zustand & React Query", percentage: 85, color: "#e5c07b" },
      { name: "Framer Motion", percentage: 80, color: "#c678dd" },
      { name: "Vite", percentage: 85, color: "#56b6c2" },
    ],
  },
  {
    title: "AI AGENTS & LLMs (8.0/10)",
    skills: [
      { name: "LangChain", percentage: 82, color: "#98c379" },
      { name: "RAG Architecture", percentage: 85, color: "#61afef" },
      { name: "Pinecone (Vector DB)", percentage: 80, color: "#c678dd" },
      { name: "OpenAI & Google GenAI", percentage: 82, color: "#d19a66" },
      { name: "HuggingFace", percentage: 75, color: "#e5c07b" },
    ],
  },
  {
    title: "BACKEND & APIs (7.5/10)",
    skills: [
      { name: "Node.js & Express", percentage: 80, color: "#98c379" },
      { name: "Python (Flask)", percentage: 75, color: "#61afef" },
      { name: "REST APIs & Middleware", percentage: 85, color: "#e5c07b" },
      { name: "WebSockets / Socket.io", percentage: 72, color: "#c678dd" },
      { name: "Security & Auth (JWT)", percentage: 78, color: "#56b6c2" },
    ],
  },
  {
    title: "DATABASES & BaaS (7.5/10)",
    skills: [
      { name: "PostgreSQL & Neon", percentage: 82, color: "#56b6c2" },
      { name: "Supabase & Convex", percentage: 85, color: "#98c379" },
      { name: "SQLite", percentage: 80, color: "#d19a66" },
      { name: "Redis", percentage: 75, color: "#e06c75" },
      { name: "Firebase", percentage: 70, color: "#e5c07b" },
    ],
  },
  {
    title: "MOBILE & CROSS-PLATFORM (7.0/10)",
    skills: [
      { name: "React Native", percentage: 75, color: "#61afef" },
      { name: "Expo", percentage: 78, color: "#c678dd" },
      { name: "Capacitor", percentage: 70, color: "#56b6c2" },
      { name: "Native ML Integrations", percentage: 72, color: "#e5c07b" },
      { name: "Flutter / Dart", percentage: 65, color: "#61afef" },
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
    <div className="flex h-[calc(100vh-80px)] w-full flex-col overflow-auto bg-[#1b1e22] text-[#c9d1d9] font-mono text-[13px] ide-scrollbar p-8">
      <div className="mb-8 w-full max-w-6xl mx-auto">
        <div className="mb-8 font-mono text-[#6e7681]">
          // skills.json - tech stack & tools I actually use
        </div>

        <div className="mb-6">
          <h1
            className="text-4xl font-extrabold tracking-widest text-[#f0f6fc] mb-6"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Skills
          </h1>
          <div className="text-[#8b949e]">
            {"{ "}
            <span className="text-[#7ee787]">"status"</span>:{" "}
            <span className="text-[#a5d6ff]">"always_learning"</span>,{" "}
            <span className="text-[#7ee787]">"passion"</span>:{" "}
            <span className="text-[#a5d6ff]">"immeasurable"</span>
            {" }"}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2 pt-6">
          {skillCategories.map((category) => (
            <div key={category.title} className="flex flex-col">
              <h2 className="mb-6 text-[14px] font-semibold tracking-[0.2em] text-[#d2a8ff]">
                {category.title}
              </h2>
              <div className="flex flex-col gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="grid grid-cols-[140px_1fr_40px] items-center gap-4"
                  >
                    <span className="text-[#8b949e] truncate pr-2">
                      {skill.name}
                    </span>
                    <div className="h-[2px] w-full rounded-full bg-[#30363d] overflow-hidden relative translate-y-[1px]">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.percentage}%`,
                          backgroundColor: skill.color,
                        }}
                      />
                    </div>
                    <span
                      className="text-right text-[12px] font-medium"
                      style={{ color: skill.color }}
                    >
                      {skill.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 mb-8 border-t border-[#30363d] pt-12">
          <h2 className="mb-6 text-[14px] font-semibold tracking-[0.2em] text-[#d2a8ff]">
            ALSO FAMILIAR WITH
          </h2>
          <div className="flex flex-wrap gap-3">
            {familiarTags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-[12px] text-[#8b949e] hover:border-[#8b949e] hover:text-[#c9d1d9] transition-colors cursor-default"
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
