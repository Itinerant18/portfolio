"use client";

import { motion, type Variants } from "framer-motion";
import { useIDEStore } from "@/store/useIDEStore";
import { VscAccount, VscFiles, VscMail, VscSparkle } from "react-icons/vsc";
import {
  FaAws,
  FaEnvelope,
  FaGithub,
  FaJava,
  FaLinkedin,
  FaPhone,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { SiFlutter, SiNextdotjs, SiTypescript } from "react-icons/si";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const techIcons = [
  { Icon: SiTypescript, color: "#3178c6", label: "TypeScript" },
  { Icon: FaReact, color: "#61dafb", label: "React" },
  { Icon: SiNextdotjs, color: "var(--text-primary)", label: "Next.js" },
  { Icon: FaPython, color: "#3572a5", label: "Python" },
  { Icon: FaJava, color: "#b07219", label: "Java" },
  { Icon: SiFlutter, color: "#54c5f8", label: "Flutter" },
  { Icon: FaAws, color: "#f59e0b", label: "AWS" },
];

export default function HomeTab() {
  const openFile = useIDEStore((state) => state.openFile);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="ide-scrollbar flex h-full w-full flex-col overflow-auto bg-[var(--bg-surface)] px-6 pb-28 pt-8 font-sans text-[13px] text-[var(--text-primary)] md:px-10 md:pt-12"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <motion.div variants={item}>
          <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)] animate-pulse" />
            Available for new opportunities · Noida / Remote
          </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-2">
          <h1 className="text-[52px] font-bold leading-[0.95] tracking-[-0.05em] text-[var(--text-primary)] md:text-[72px]">
            <span className="gradient-text">Aniket</span>
          </h1>
          <h1 className="text-[52px] font-bold leading-[0.95] tracking-[-0.05em] text-[var(--text-primary)] md:text-[72px]">
            Karmakar
          </h1>
          <p className="mt-3 max-w-[52ch] text-[15px] font-medium leading-relaxed text-[var(--text-muted)] md:text-[17px]">
            Front-end UI Developer · Full-stack · AI/ML · IoT · Cloud
            <span
              className="ml-1 inline-block h-[16px] w-[2px] translate-y-[3px] bg-[var(--accent)]"
              style={{ animation: "blink 1.2s step-end infinite" }}
            />
          </p>
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap gap-3">
          {techIcons.map(({ Icon, color, label }) => (
            <div
              key={label}
              title={label}
              className="glow-card flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] transition-all hover:scale-110"
            >
              <Icon size={18} style={{ color }} />
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openFile("src/projects.ts")}
            className="inline-flex items-center gap-2 rounded-sm border border-transparent bg-[var(--accent)] px-5 py-2.5 text-[12px] font-semibold text-white shadow-lg shadow-[var(--accent-muted)] transition-all hover:bg-[var(--accent-hover)]"
          >
            <VscFiles size={15} /> View Projects
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openFile("src/about.html")}
            className="inline-flex items-center gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-5 py-2.5 text-[12px] font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--accent-muted)] hover:bg-[var(--bg-muted)]"
          >
            <VscAccount size={15} /> About Me
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openFile("src/contact.css")}
            className="inline-flex items-center gap-2 rounded-sm border border-[var(--border-default)] bg-transparent px-5 py-2.5 text-[12px] font-medium text-[var(--text-muted)] transition-all hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
          >
            <VscMail size={15} /> Contact
          </motion.button>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-2 overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] md:grid-cols-4">
          {[
            { value: "8.6", label: "CGPA", color: "var(--success)" },
            { value: "36+", label: "PROJECTS", color: "var(--accent)" },
            { value: "4+", label: "INTERNSHIPS", color: "var(--info)" },
            { value: "2+", label: "YEARS EXP", color: "var(--warning)" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ backgroundColor: "var(--bg-muted)" }}
              className={`flex flex-col items-center justify-center px-4 py-6 transition-colors ${i < 3 ? "md:border-r border-[var(--border-default)]" : ""} ${i < 2 ? "border-b md:border-b-0 border-[var(--border-default)]" : ""}`}
            >
              <div className="text-[28px] font-bold tracking-[-0.04em] md:text-[32px]" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="mt-1 text-[9px] font-medium tracking-[0.14em] text-[var(--text-muted)]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-3">
          <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Connect
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "GitHub", Icon: FaGithub, color: "var(--text-primary)", href: "https://github.com/Itinerant18" },
              { label: "LinkedIn", Icon: FaLinkedin, color: "#0077b5", href: "https://linkedin.com/in/aniket-karmakar" },
              { label: "Email", Icon: FaEnvelope, color: "var(--info)", href: "mailto:aniketkarmakar018@gmail.com" },
              { label: "Phone", Icon: FaPhone, color: "var(--success)", href: "tel:+917602676448" },
            ].map(({ label, Icon, color, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3.5 py-2 text-[12px] font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
              >
                <Icon size={14} style={{ color }} />
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5">
          <div className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--accent)]">
            <VscSparkle size={12} />
            Current Focus
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              { icon: "Building", text: "Building FAS-Control, SWatch360 & Dexter AI at SEPLE" },
              { icon: "Research", text: "Computer Vision, Gesture Recognition & RAG Pipelines" },
              { icon: "Shipping", text: "Full-stack apps with React, TypeScript, Java & Python" },
              { icon: "Systems", text: "IoT automation with ESP32/MQTT & AWS cloud services" },
            ].map((focus, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 3 }}
                className="flex items-start gap-3 rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)]/50 p-3 transition-colors hover:bg-[var(--bg-muted)]"
              >
                <span className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                  {focus.icon}
                </span>
                <span className="text-[12px] leading-relaxed text-[var(--text-secondary)]">{focus.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
