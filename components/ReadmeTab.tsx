"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaTerminal } from "react-icons/fa";
import { VscSparkle, VscCircuitBoard, VscServer, VscDatabase } from "react-icons/vsc";

export default function ReadmeTab() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="flex flex-col overflow-auto bg-[var(--bg-base)] text-[var(--text-secondary)] font-sans h-full w-full p-6 md:p-12 pb-32 ide-scrollbar">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-4xl flex-col gap-10"
      >
        <motion.div variants={item} className="flex flex-col items-center text-center gap-6">
          <div className="relative flex h-44 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-[var(--border-default)] bg-[linear-gradient(180deg,var(--bg-elevated),var(--bg-muted))] shadow-sm">
            <div className="absolute inset-x-0 top-0 h-px bg-[var(--border-hover)]" />
            <h1 className="text-[36px] font-semibold leading-none tracking-[-0.04em] text-[var(--text-primary)] md:text-[48px]">
              Aniket Karmakar
            </h1>
            <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)] md:text-[13px]">
              Software Engineer · Full-Stack · AI/ML · Cloud
            </p>
            <div className="absolute -bottom-12 -right-10 h-32 w-32 rounded-full bg-[var(--accent)]/5 blur-3xl" />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: FaLinkedin, label: "LinkedIn", background: "var(--brand-linkedin)", foreground: "var(--brand-medium)", href: "https://linkedin.com/in/aniket-karmakar" },
              { icon: FaGithub, label: "GitHub", background: "var(--brand-github)", foreground: "var(--bg-base)", href: "https://github.com/Itinerant18" },
              { icon: FaEnvelope, label: "Email", background: "var(--info)", foreground: "var(--bg-base)", href: "mailto:aniketkarmakar018@gmail.com" }
            ].map((link, i) => (
              <a 
                key={i} 
                href={link.href} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 rounded-md border border-[var(--border-default)] px-3.5 py-2 text-[11px] font-medium tracking-tight transition-all hover:border-[var(--border-hover)]"
                style={{ backgroundColor: link.background, color: link.foreground }}
              >
                <link.icon size={14} />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-6">
            <h2 className="flex items-center gap-3 border-b border-[var(--border-default)] pb-3 text-[15px] font-semibold tracking-tight text-[var(--text-primary)]">
                <VscSparkle className="text-[var(--accent)]" /> 
                System Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6">
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 font-mono text-[12px] leading-7 shadow-sm transition-all hover:border-[var(--border-hover)]">
                    <div className="text-[var(--error)] mb-1">status: <span className="text-[var(--text-primary)]">Ready to Build</span></div>
                    <div className="text-[var(--error)] mb-1">role: <span className="text-[var(--text-primary)]">Junior Executive Engineer, R&D</span></div>
                    <div className="text-[var(--error)] mb-1">focus: <span className="text-[var(--text-primary)]">Full-Stack, AI/ML, IoT & Cloud</span></div>
                    <div className="text-[var(--error)] mb-4">base: <span className="text-[var(--text-primary)]">Kolkata, India 🇮🇳</span></div>
                    
                    <div className="text-[var(--info)] mb-1 font-bold tracking-tight">// core_competencies:</div>
                    <div className="text-[var(--text-secondary)] ml-4">▸ Full-Stack Development (React, Java, TypeScript)</div>
                    <div className="text-[var(--text-secondary)] ml-4">▸ AI/ML Systems & Computer Vision</div>
                    <div className="text-[var(--text-secondary)] ml-4">▸ IoT Automation (ESP32, MQTT)</div>
                    <div className="text-[var(--text-secondary)] ml-4 mb-4">▸ Cloud Infrastructure (AWS S3, Lambda)</div>
                    
                    <div className="text-[var(--success)] mb-1 font-bold tracking-tight">/* active_research */</div>
                    <div className="text-[var(--text-secondary)] ml-4">▸ Generative AI & LLM Integration</div>
                    <div className="text-[var(--text-secondary)] ml-4">▸ IoT + Cloud Automation @ Scale</div>
                </div>
                <div className="group relative flex items-center justify-center overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] p-4">
                    <VscCircuitBoard className="text-[var(--accent)] opacity-20 absolute -bottom-4 -right-4" size={120} />
                    <div className="text-center relative z-10">
                      <div className="text-[28px] font-semibold leading-none text-[var(--text-primary)]">4+</div>
                      <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">Years Building</div>
                    </div>
                </div>
            </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-8">
            <h2 className="flex items-center gap-3 border-b border-[var(--border-default)] pb-3 text-[15px] font-semibold tracking-tight text-[var(--text-primary)]">
                <FaCode className="text-[var(--accent)]" /> 
                Technology Matrix
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Languages", items: ["Java", "TypeScript", "Python", "Dart"], icon: FaTerminal },
                { title: "Frontend", items: ["React", "JSP", "Flutter", "Capacitor"], icon: VscSparkle },
                { title: "Backend", items: ["Node.js", "REST APIs", "Firebase", "WebSockets"], icon: VscServer },
                { title: "Cloud & IoT", items: ["AWS S3/Lambda", "ESP32", "MQTT", "MLKit"], icon: VscDatabase }
              ].map((group, i) => (
                <div key={i} className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 shadow-sm transition-all hover:border-[var(--border-hover)]">
                  <div className="flex items-center gap-2 mb-4">
                    <group.icon className="text-[var(--accent)]" size={16} />
                    <h3 className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-primary)]">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map(t => (
                      <span key={t} className="rounded-md bg-[var(--bg-muted)] px-2 py-1 text-[10px] font-medium text-[var(--text-secondary)]">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
        </motion.div>

        <motion.div variants={item} className="relative mt-4 overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-8 text-center shadow-sm">
            <div className="absolute inset-x-0 top-0 h-px bg-[var(--border-hover)]" />
            <h2 className="relative z-10 text-[22px] font-semibold tracking-[-0.03em] text-[var(--text-primary)] md:text-[28px]">Let&apos;s Build the Future Together</h2>
            <p className="relative z-10 mx-auto mt-2 max-w-xl text-[14px] font-medium text-[var(--text-secondary)]">Currently open to Generative AI, full-stack, and software development opportunities.</p>
            <div className="relative z-10 mt-6 flex justify-center gap-4">
              <a href="mailto:aniketkarmakar018@gmail.com" className="rounded-md bg-[var(--accent)] px-5 py-2.5 text-[12px] font-semibold text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-sm">
                Initialize Contact
              </a>
            </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col items-center gap-4 text-center">
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--text-disabled)]">
              Designed & Developed by Aniket Karmakar © 2026
            </div>
        </motion.div>
        
      </motion.div>
    </div>
  );
}
