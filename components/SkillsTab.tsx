"use client";

import { motion } from "framer-motion";
import {
  FaReact,
  FaCode,
  FaDatabase,
  FaBrain,
  FaCloud,
} from "react-icons/fa";
import { VscSymbolNamespace } from "react-icons/vsc";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const skillCategories = [
  {
    title: "Frontend & UI/UX",
    Icon: FaReact,
    iconColor: "#61dafb",
    skills: [
      { name: "React.js & Next.js", pct: 88, color: "var(--info)" },
      { name: "HTML5 & CSS3", pct: 92, color: "var(--success)" },
      { name: "Tailwind CSS", pct: 85, color: "var(--warning)" },
      { name: "Framer Motion", pct: 80, color: "var(--accent)" },
      { name: "Flutter & Dart", pct: 65, color: "var(--info)" },
    ],
  },
  {
    title: "AI / ML & RAG",
    Icon: FaBrain,
    iconColor: "var(--accent)",
    skills: [
      { name: "LangChain", pct: 82, color: "var(--success)" },
      { name: "RAG Architecture", pct: 85, color: "var(--info)" },
      { name: "Computer Vision (OpenCV)", pct: 80, color: "var(--accent)" },
      { name: "pgvector & Vector DBs", pct: 78, color: "var(--warning)" },
      { name: "Gesture Recognition", pct: 75, color: "var(--warning)" },
    ],
  },
  {
    title: "Backend & APIs",
    Icon: FaCode,
    iconColor: "var(--success)",
    skills: [
      { name: "Java & Core Java", pct: 85, color: "var(--success)" },
      { name: "Node.js & Express", pct: 80, color: "var(--info)" },
      { name: "Python (Flask)", pct: 75, color: "var(--warning)" },
      { name: "REST APIs & WebSockets", pct: 82, color: "var(--accent)" },
      { name: "JSP & JDBC", pct: 78, color: "var(--info)" },
    ],
  },
  {
    title: "Databases & BaaS",
    Icon: FaDatabase,
    iconColor: "#e24b4a",
    skills: [
      { name: "SQL & PostgreSQL", pct: 82, color: "var(--info)" },
      { name: "Supabase & Convex", pct: 85, color: "var(--success)" },
      { name: "Firebase", pct: 78, color: "var(--warning)" },
      { name: "SQLite", pct: 80, color: "var(--accent)" },
      { name: "Redis", pct: 70, color: "#e24b4a" },
    ],
  },
  {
    title: "Cloud & IoT",
    Icon: FaCloud,
    iconColor: "var(--warning)",
    skills: [
      { name: "AWS (S3, Lambda)", pct: 78, color: "var(--warning)" },
      { name: "ESP32 & MQTT", pct: 82, color: "var(--success)" },
      { name: "Capacitor & MLKit", pct: 75, color: "var(--accent)" },
      { name: "Docker & CI/CD", pct: 72, color: "var(--info)" },
      { name: "GitHub Actions", pct: 78, color: "var(--text-secondary)" },
    ],
  },
];

const familiarTags = [
  "Zoho Creator",
  "Android SDK",
  "Arduino IDE",
  "Adobe Photoshop",
  "Netlify",
  "Agile/Scrum",
  "Convex",
  "ThingsBoard",
  "React Native",
  "Expo",
  "pdf-parse",
  "react-markdown",
  "C++",
  "Git BASH",
];

export default function SkillsTab() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="ide-scrollbar flex h-full w-full flex-col overflow-auto bg-[var(--bg-surface)] p-6 pb-32 font-sans text-[13px] text-[var(--text-primary)] md:p-12"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <motion.div
          variants={item}
          className="font-mono text-[var(--text-muted)] text-[12px]"
        >
          <span className="text-[var(--accent)]">const</span>{" "}
          <span className="text-[var(--info)]">capabilities</span>{" "}
          <span className="text-[var(--text-muted)]">=</span>{" "}
          <span className="text-[var(--success)]">"actively_evolving"</span>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-2">
          <h1 className="text-[28px] font-bold tracking-[-0.04em]">
            <span className="gradient-text">Technical Skills</span>
          </h1>
          <p className="text-[14px] text-[var(--text-muted)]">
            Competency matrix across full-stack, AI/ML, IoT and cloud.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={item}
              className="glow-card flex flex-col gap-5 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5"
            >
              <div className="flex items-center gap-2">
                <category.Icon
                  size={14}
                  style={{ color: category.iconColor }}
                />
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {category.title}
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-medium text-[var(--text-secondary)]">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[10px] font-medium text-[var(--text-muted)]">
                        {skill.pct}%
                      </span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--bg-muted)]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.pct}%` }}
                        transition={{
                          duration: 0.9,
                          delay: 0.2,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={item}
          className="flex flex-col gap-4 border-t border-[var(--border-default)] pt-8"
        >
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
            <VscSymbolNamespace size={12} />
            Ecosystem & Libraries
          </div>
          <div className="flex flex-wrap gap-2">
            {familiarTags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.025 }}
                whileHover={{ scale: 1.06, y: -2 }}
                className="cursor-default rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--accent-muted)] hover:text-[var(--accent)]"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
