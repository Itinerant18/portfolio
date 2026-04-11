"use client";

import { motion, Variants } from "framer-motion";
import {
  VscCircleFilled,
} from "react-icons/vsc";
import { 
  FaBriefcase, 
  FaCode, 
  FaCloud, 
  FaFlask, 
  FaBuilding, 
  FaCalendarAlt, 
  FaMapMarkerAlt 
} from "react-icons/fa";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const experiences = [
  {
    period: "Oct 2024 - Present",
    role: "Junior Software Engineer in R&D department",
    company: "Security Engineers Pvt. Ltd. (SEPLE)",
    type: "Full-time",
    location: "Noida, Uttar Pradesh, India · On-site",
    description:
      "Built FAS-Control: React + TypeScript Capacitor app using MLKit for QR-based ESP32 server management. Developed Dexter Tech Support AI — a cloud-native RAG system. Built SWatch360 Flutter mobile app on ThingsBoard PE. Developed internal R&D tools in Java and JavaScript; built the company website using Zoho.",
    tags: [
      "React",
      "TypeScript",
      "Capacitor",
      "MLKit",
      "Java",
      "JavaScript",
      "ESP32",
      "IoT",
      "Flutter",
      "LangChain",
      "RAG",
    ],
    current: true,
    Icon: FaBriefcase,
    accentColor: "var(--accent)",
  },
  {
    period: "May 2024 - Oct 2024",
    role: "Internship - Java Full Stack Developer",
    company: "Jspiders",
    type: "Internship · 6 months",
    location: "India",
    description:
      "Delivered a real-time chat application end-to-end using Java and JSP. Built a procedural dungeon-generation game. Participated in Agile sprints.",
    tags: ["Java", "JSP", "SQL", "JDBC", "React.js", "CSS", "HTML5", "Agile"],
    current: false,
    Icon: FaCode,
    accentColor: "var(--info)",
  },
  {
    period: "Apr 2024 - Oct 2024",
    role: "Internship - Software Testing",
    company: "Qspiders",
    type: "Internship · 7 months",
    location: "India",
    description:
      "Gained expertise in manual and automation testing, test case design, execution, and defect tracking.",
    tags: ["Software Testing", "Manual Testing", "Automation Testing", "QA"],
    current: false,
    Icon: FaFlask,
    accentColor: "var(--warning)",
  },
  {
    period: "Jan 2024 - May 2024",
    role: "Internship - Cloud Computing",
    company: "Cisco",
    type: "Internship · 5 months",
    location: "Remote",
    description:
      "Cloud computing fundamentals and infrastructure management. Deployed and maintained cloud infrastructure and services.",
    tags: ["Cloud Computing", "Cisco", "Networking", "Infrastructure"],
    current: false,
    Icon: FaCloud,
    accentColor: "var(--success)",
  },
];

export default function ExperienceTab() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="type-ui ide-scrollbar flex h-full w-full flex-col overflow-auto bg-[var(--bg-surface)] p-6 pb-32 text-[var(--text-primary)] md:p-12"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <motion.div variants={item}>
          <div className="type-sys-micro text-[var(--text-muted)]">
            Professional journey timeline
          </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-2">
          <h1 className="type-hero">
            <span className="gradient-text">Experience</span>
          </h1>
          <p className="type-body text-[var(--text-muted)]">
            Professional roles across software engineering, testing, and cloud
            systems.
          </p>
        </motion.div>

        <div className="relative ml-5 flex flex-col gap-0 pl-8 border-l-2 border-[var(--border-default)]">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="relative mb-12 last:mb-0"
            >
              {/* Timeline node */}
              <div
                className="absolute -left-[45px] top-1 flex h-8 w-8 items-center justify-center rounded-sm border-2 bg-[var(--bg-surface)]"
                style={{ borderColor: exp.accentColor }}
              >
                <exp.Icon size={14} style={{ color: exp.accentColor }} />
              </div>

              {/* 20px gap */}
              <motion.div
                whileHover={{ x: 4 }}
                className="glow-card rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-[20px] transition-all"
                style={{ borderLeftWidth: 3, borderLeftColor: exp.accentColor }}
              >
                {/* Top row */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="type-mono-sm flex items-center gap-1.5 rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] px-2 py-0.5 text-[var(--text-muted)]">
                    <FaCalendarAlt size={9} />
                    {exp.period}
                  </span>
                  <span className="type-caption rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] px-2 py-0.5 text-[var(--text-secondary)]">
                    {exp.type}
                  </span>
                  {exp.current && (
                    <span className="type-caption flex items-center gap-1.5 text-[var(--success)]">
                      <VscCircleFilled size={8} className="animate-pulse" />
                      Active
                    </span>
                  )}
                </div>

                {/* Role */}
                <h2 className="type-sub text-[var(--text-primary)]">
                  {exp.role}
                </h2>
                <div
                  className="type-btn mt-1 flex items-center gap-2"
                  style={{ color: exp.accentColor }}
                >
                  <FaBuilding size={12} />
                  {exp.company}
                </div>
                {exp.location && (
                  <div className="type-caption mt-1 flex items-center gap-1.5 text-[var(--text-muted)]">
                    <FaMapMarkerAlt size={10} />
                    {exp.location}
                  </div>
                )}

                {/* Description */}
                <p className="type-body mt-3 text-[var(--text-secondary)]">
                  {exp.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="type-caption rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] px-2 py-0.5 text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
