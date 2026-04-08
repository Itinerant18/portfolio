"use client";

import { motion, type Variants } from "framer-motion";
import {
  VscAccount,
  VscBriefcase,
  VscGlobe,
  VscMortarBoard,
  VscVerified,
} from "react-icons/vsc";
import {
  FaAws,
  FaCertificate,
  FaGraduationCap,
  FaJava,
  FaLanguage,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { SiFlutter, SiNextdotjs, SiTypescript } from "react-icons/si";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

const services = ["Web Design", "Software Testing", "Web Development", "Application Development", "Cloud Application Development"];
const serviceColors = ["var(--accent)", "var(--info)", "var(--warning)", "var(--success)", "var(--accent-hover)"];

export default function AboutTab() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="ide-scrollbar flex h-full w-full flex-col overflow-auto bg-[var(--bg-surface)] p-6 pb-32 font-sans text-[13px] text-[var(--text-primary)] md:p-12"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <motion.div variants={item}>
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
            About Aniket Karmakar
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="glow-card relative overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 md:p-8"
        >
          <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-[var(--accent-subtle)] blur-2xl" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)]">
              <VscAccount size={32} className="text-[var(--accent)]" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[22px] font-bold tracking-tight text-[var(--text-primary)]">
                  <span className="gradient-text">Aniket Karmakar</span>
                </h1>
                <span className="rounded-sm border border-[var(--accent-muted)] bg-[var(--accent-subtle)] px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)]">
                  He/Him
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px]">
                {["Front-end UI Developer", "React.js", "Full-stack", "AI/ML", "IoT"].map((tag, i) => (
                  <span key={tag} className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] px-2 py-0.5 font-medium" style={{ color: serviceColors[i % serviceColors.length] }}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className="max-w-[60ch] text-[13px] leading-relaxed text-[var(--text-secondary)]">
                Pursuing B.Tech in Electronics & Communication Engineering at NSHM Knowledge Campus. Passionate about Front-end UI Development and Full-stack Web Development. Currently a <strong className="font-semibold text-[var(--text-primary)]">Junior Software Engineer in R&D at Security Engineers Pvt. Ltd. (SEPLE)</strong>.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <VscBriefcase size={12} />
            Services
          </div>
          <div className="flex flex-wrap gap-2">
            {services.map((service, i) => (
              <motion.div
                key={service}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex cursor-default items-center gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-2 text-[12px] font-semibold transition-all hover:border-[var(--accent-muted)] hover:bg-[var(--bg-muted)]"
                style={{ color: serviceColors[i % serviceColors.length] }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: serviceColors[i % serviceColors.length] }} />
                {service}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <VscGlobe size={12} />
            Core Stack
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
            {[
              { Icon: SiTypescript, color: "#3178c6", label: "TypeScript" },
              { Icon: FaReact, color: "#61dafb", label: "React" },
              { Icon: SiNextdotjs, color: "var(--text-primary)", label: "Next.js" },
              { Icon: FaPython, color: "#3572a5", label: "Python" },
              { Icon: FaJava, color: "#b07219", label: "Java" },
              { Icon: SiFlutter, color: "#54c5f8", label: "Flutter" },
              { Icon: FaAws, color: "#f59e0b", label: "AWS" },
            ].map(({ Icon, color, label }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.08, y: -3 }}
                className="glow-card flex flex-col items-center gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-2 py-3 transition-all"
              >
                <Icon size={20} style={{ color }} />
                <span className="text-[9px] font-medium text-[var(--text-muted)]">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <VscVerified size={12} />
            Strategic Focus
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              "Building FAS-Control, SWatch360, & Dexter AI at SEPLE",
              "Deep research into Computer Vision, Gesture Recognition & RAG Pipelines",
              "Full-stack apps with React, TypeScript, Java, and Python",
              "Cloud infrastructure with AWS S3, Lambda, ESP32/MQTT, and Cisco",
              "Shipping real products across startup and enterprise settings",
              "Targeting Generative AI and software development roles",
            ].map((focus, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4 }}
                className="glow-card flex items-start gap-4 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 transition-all"
              >
                <span className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                  Focus
                </span>
                <span className="text-[12px] leading-relaxed text-[var(--text-secondary)]">{focus}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <FaGraduationCap size={12} />
            Education
          </div>
          <div className="flex flex-col gap-3">
            {[
              { school: "NSHM College of Management and Technology", degree: "B.Tech – Electronics & Communication Engineering", period: "Apr 2020 – Aug 2024", grade: "CGPA: 8.6", location: "Kolkata, West Bengal", accent: "var(--accent)" },
              { school: "Jemo NN High School", degree: "Higher Secondary", period: "Feb 2018 – Jun 2020", location: "India", accent: "var(--info)" },
            ].map((edu, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 3 }}
                className="glow-card flex flex-col gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 transition-all md:flex-row md:items-start md:justify-between"
                style={{ borderLeftWidth: 3, borderLeftColor: edu.accent }}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <VscMortarBoard size={14} style={{ color: edu.accent }} />
                    <h3 className="text-[14px] font-bold text-[var(--text-primary)]">{edu.school}</h3>
                  </div>
                  <div className="text-[11px] font-medium text-[var(--text-muted)]">{edu.location}</div>
                  <div className="text-[12px] font-semibold" style={{ color: edu.accent }}>{edu.degree}</div>
                </div>
                <div className="flex flex-col items-start gap-1 md:items-end">
                  <div className="font-mono text-[11px] text-[var(--text-disabled)]">{edu.period}</div>
                  {edu.grade ? <div className="text-[12px] font-bold text-[var(--success)]">{edu.grade}</div> : null}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <FaCertificate size={12} />
            Certifications
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Cloud Computing", issuer: "Amazon AWS", date: "Jun 2023", color: "var(--warning)" },
              { name: "AI & Machine Learning", issuer: "Edu Skill", date: "Aug 2023", color: "var(--accent)" },
            ].map((cert) => (
              <motion.div
                key={cert.name}
                whileHover={{ scale: 1.02, y: -2 }}
                className="glow-card flex items-center gap-3 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3"
              >
                <FaCertificate size={16} style={{ color: cert.color }} />
                <div className="flex flex-col">
                  <span className="text-[12px] font-semibold text-[var(--text-primary)]">{cert.name}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">{cert.issuer} · {cert.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <FaLanguage size={12} />
            Languages
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-2 text-[12px] font-medium text-[var(--text-secondary)]">
              English · Professional Working Proficiency
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
