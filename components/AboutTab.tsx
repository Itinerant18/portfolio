"use client";

import { motion } from "framer-motion";
import {
  VscAccount,
  VscCheck,
  VscCircuitBoard,
} from "react-icons/vsc";
import {
  FaReact,
  FaPython,
  FaJava,
  FaAws,
  FaCertificate,
  FaLanguage,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa";
import {
  SiTypescript,
  SiFlutter,
  SiNextdotjs,
} from "react-icons/si";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const services = [
  "Frontend Development",
  "Full-stack Web Apps",
  "AI/ML Solutions",
  "RAG Pipelines",
  "IoT Automation",
  "Mobile Apps",
  "Cloud Infrastructure",
];

const serviceColors = [
  "var(--accent)",
  "var(--info)",
  "var(--success)",
  "var(--warning)",
  "#a855f7",
  "#06b6d4",
  "#f97316",
];

export default function AboutTab() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="ide-scrollbar flex h-full w-full flex-col overflow-auto bg-[var(--bg-surface)] p-6 pb-32 font-sans text-[13px] text-[var(--text-primary)] md:p-12"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        {/* Header section */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
            <VscAccount size={12} />
            Background
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
            <div className="flex flex-col gap-4 md:flex-1">
              <h1 className="text-[32px] font-bold tracking-[-0.04em] md:text-[40px]">
                I build <span className="gradient-text">intelligent</span> web
                interfaces.
              </h1>
              <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
                I'm Aniket Karmakar, a developer focused on creating seamless
                digital experiences where design meets high-performance code. I
                specialize in bridging the gap between complex backend systems
                and intuitive frontend interfaces.
              </p>
              <p className="text-[14px] leading-relaxed text-[var(--text-muted)]">
                Currently, I'm a{" "}
                <strong className="text-[var(--text-primary)] font-semibold">
                  Junior Software Engineer in R&D at Security Engineers Pvt.
                  Ltd. (SEPLE)
                </strong>
                .
              </p>
            </div>
          </div>
        </motion.div>

        {/* Services */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <FaBriefcase size={12} />
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
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: serviceColors[i % serviceColors.length],
                  }}
                />
                {service}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack visual */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <VscCircuitBoard size={12} />
            Core Stack
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
            {[
              { Icon: SiTypescript, color: "#3178c6", label: "TypeScript" },
              { Icon: FaReact, color: "#61dafb", label: "React" },
              {
                Icon: SiNextdotjs,
                color: "var(--text-primary)",
                label: "Next.js",
              },
              { Icon: FaPython, color: "#3572a5", label: "Python" },
              { Icon: FaJava, color: "#b07219", label: "Java" },
              { Icon: SiFlutter, color: "#54c5f8", label: "Flutter" },
              { Icon: FaAws, color: "#f59e0b", label: "AWS" },
            ].map(({ Icon, color, label }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.08, y: -3 }}
                className="glow-card flex flex-col items-center gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] py-3 px-2 transition-all"
              >
                <Icon size={20} style={{ color }} />
                <span className="text-[9px] font-medium text-[var(--text-muted)]">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strategic focus */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <VscCheck size={12} />
            Strategic Focus
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              {
                icon: "🔭",
                text: "Building FAS-Control, SWatch360, & Dexter AI at SEPLE",
              },
              {
                icon: "🧠",
                text: "Deep research into Computer Vision, Gesture Recognition & RAG Pipelines",
              },
              {
                icon: "🪴",
                text: "Full-stack apps with React, TypeScript, Java, and Python",
              },
              {
                icon: "💬",
                text: "Cloud infrastructure with AWS S3, Lambda, ESP32/MQTT, and Cisco",
              },
              {
                icon: "⚡",
                text: "Shipping real products across startup and enterprise settings",
              },
              {
                icon: "✨",
                text: "Targeting Generative AI and software development roles",
              },
            ].map((focus, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4 }}
                className="glow-card flex items-start gap-4 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 transition-all"
              >
                <span className="text-[18px]">{focus.icon}</span>
                <span className="text-[12px] leading-relaxed text-[var(--text-secondary)]">
                  {focus.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <FaGraduationCap size={12} />
            Education
          </div>
          <div className="flex flex-col gap-3">
            {[
              {
                school: "NSHM College of Management and Technology",
                degree: "B.Tech – Electronics & Communication Engineering",
                period: "Apr 2020 – Aug 2024",
                grade: "CGPA: 8.6",
                location: "Kolkata, West Bengal",
                accent: "var(--accent)",
              },
              {
                school: "Jemo NN High School",
                degree: "Higher Secondary",
                period: "Feb 2018 – Jun 2020",
                location: "India",
                accent: "var(--info)",
              },
            ].map((edu, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 3 }}
                className="glow-card flex flex-col gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 transition-all md:flex-row md:items-start md:justify-between"
                style={{ borderLeftWidth: 3, borderLeftColor: edu.accent }}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <FaGraduationCap size={14} style={{ color: edu.accent }} />
                    <h3 className="text-[14px] font-bold text-[var(--text-primary)]">
                      {edu.school}
                    </h3>
                  </div>
                  <div className="text-[11px] font-medium text-[var(--text-muted)]">
                    {edu.location}
                  </div>
                  <div
                    className="text-[12px] font-semibold"
                    style={{ color: edu.accent }}
                  >
                    {edu.degree}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1 md:items-end">
                  <div className="font-mono text-[11px] text-[var(--text-disabled)]">
                    {edu.period}
                  </div>
                  {edu.grade && (
                    <div className="text-[12px] font-bold text-[var(--success)]">
                      {edu.grade}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <FaCertificate size={12} />
            Certifications
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              {
                name: "Cloud Computing",
                issuer: "Amazon AWS",
                date: "Jun 2023",
                color: "var(--warning)",
              },
              {
                name: "AI & Machine Learning",
                issuer: "Edu Skill",
                date: "Aug 2023",
                color: "var(--accent)",
              },
            ].map((cert) => (
              <motion.div
                key={cert.name}
                whileHover={{ scale: 1.02, y: -2 }}
                className="glow-card flex items-center gap-3 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3"
              >
                <FaCertificate size={16} style={{ color: cert.color }} />
                <div className="flex flex-col">
                  <span className="text-[12px] font-semibold text-[var(--text-primary)]">
                    {cert.name}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {cert.issuer} · {cert.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div variants={item} className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            <FaLanguage size={12} />
            Languages
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-2 text-[12px] font-medium text-[var(--text-secondary)]">
              🌐 English · Professional Working Proficiency
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
