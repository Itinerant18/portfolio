"use client";

import React from "react";

export default function AboutTab() {
  return (
    <div className="flex flex-col overflow-auto bg-[var(--bg-surface)] text-[var(--text-primary)] font-sans text-[13px] ide-scrollbar h-full w-full p-6 md:p-12 pb-32">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-10">
        <div className="font-mono text-[var(--text-muted)]">
          {"<!-- about.html - Aniket Karmakar -->"}
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-[32px] md:text-[48px] font-black tracking-tight text-[var(--text-primary)]">
            About Me
          </h1>
          <div className="font-mono text-[14px] text-[var(--text-muted)]">
            // engineer · full-stack · AI/ML · IoT · cloud
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="border border-[var(--border-default)] rounded-xl p-6 md:p-8 bg-[var(--bg-elevated)] text-[var(--text-secondary)] leading-relaxed text-[15px] md:text-[16px] shadow-sm">
            Hi! I'm <span className="text-[var(--accent)] font-bold">Aniket Karmakar</span>, a software engineer with experience in <span className="text-[var(--info)] font-semibold">full-stack development</span>, <span className="text-[var(--info)] font-semibold">AI/ML systems</span>, <span className="text-[var(--info)] font-semibold">IoT</span>, and <span className="text-[var(--info)] font-semibold">cloud infrastructure</span>. I build products that are genuinely <span className="text-[var(--text-primary)] font-bold italic">intelligent and production-ready</span>. Currently, I'm a <span className="text-[var(--text-primary)] font-semibold underline decoration-[var(--accent)]/30 underline-offset-4">Junior Executive Engineer, R&D at Security Engineers Pvt. Ltd. (SEPL)</span>, where I build IoT control apps, internal R&D tools, and automation workflows integrating embedded hardware with cloud services.
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--accent)] flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--accent)]" />
              Strategic Focus
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: "🔭", text: "Building FAS-Control & IoT automation workflows at SEPL" },
                { icon: "🧠", text: "Deep research into Computer Vision, Gesture Recognition & ML Pipelines" },
                { icon: "🪴", text: "Full-stack apps with React, TypeScript, Java, and Python" },
                { icon: "💬", text: "Cloud infrastructure with AWS S3, Lambda, and ESP32/MQTT" },
                { icon: "⚡", text: "Shipping real products across startup and enterprise settings" },
                { icon: "✨", text: "Targeting Generative AI and software development roles" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 border border-[var(--border-default)] rounded-xl p-5 bg-[var(--bg-muted)]/50 hover:bg-[var(--bg-muted)] transition-colors group">
                  <span className="text-[20px] filter grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                  <span className="text-[13px] font-medium text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--accent)] flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--accent)]" />
              Academic Foundation
            </h2>
            <div className="flex flex-col gap-4">
              <div className="border border-[var(--border-default)] rounded-xl p-6 bg-[var(--bg-elevated)] flex flex-col md:flex-row justify-between gap-4 shadow-sm hover:border-[var(--accent)]/30 transition-all">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[16px] md:text-[18px] font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <span className="text-[var(--accent)]">🎓</span> NSHM Knowledge Campus
                  </h3>
                  <div className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Kolkata, West Bengal</div>
                  <div className="text-[var(--info)] font-bold mt-1">B.Tech – Electronics & Communication Engineering</div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1">
                  <div className="text-[var(--text-disabled)] font-mono text-[12px] mt-1">Aug 2021 - Aug 2024</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--accent)] flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--accent)]" />
              Certifications
            </h2>
            <div className="flex flex-col gap-4">
              <div className="border border-[var(--border-default)] rounded-xl p-6 bg-[var(--bg-elevated)] flex flex-col md:flex-row justify-between gap-4 shadow-sm hover:border-[var(--accent)]/30 transition-all">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[16px] md:text-[18px] font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <span className="text-[var(--accent)]">☁️</span> Cloud Computing – Amazon AWS
                  </h3>
                </div>
                <div className="flex items-start md:items-end">
                  <div className="text-[var(--text-disabled)] font-mono text-[12px]">Jun 2023</div>
                </div>
              </div>
              <div className="border border-[var(--border-default)] rounded-xl p-6 bg-[var(--bg-elevated)] flex flex-col md:flex-row justify-between gap-4 shadow-sm hover:border-[var(--accent)]/30 transition-all">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[16px] md:text-[18px] font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <span className="text-[var(--accent)]">🤖</span> AI & Machine Learning – Edu Skill
                  </h3>
                </div>
                <div className="flex items-start md:items-end">
                  <div className="text-[var(--text-disabled)] font-mono text-[12px]">Aug 2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
