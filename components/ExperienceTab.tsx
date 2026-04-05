"use client";

import React from "react";

export default function ExperienceTab() {
  const experiences = [
    {
      period: "Oct 2024 - Present",
      role: "Junior Software Engineer in R&D department",
      company: "Security Engineers Pvt. Ltd. (SEPLE)",
      type: "Full-time",
      location: "Noida, Uttar Pradesh, India · On-site",
      description:
        "Built FAS-Control: React + TypeScript Capacitor app using MLKit for QR-based ESP32 server management. Developed Dexter Tech Support AI — a cloud-native RAG system for industrial control panels. Built SWatch360 Flutter mobile app on ThingsBoard PE platform. Developed internal R&D tools in Java and JavaScript; built the company website using Zoho and custom CSS. Engineered IoT automation workflows integrating embedded hardware with cloud services.",
      tags: [
        "React",
        "TypeScript",
        "Capacitor",
        "MLKit",
        "Java",
        "JavaScript",
        "Zoho",
        "ESP32",
        "IoT",
        "Flutter",
        "LangChain",
        "RAG",
      ],
      current: true,
    },
    {
      period: "May 2024 - Oct 2024",
      role: "Internship - Java Full Stack Developer program",
      company: "Jspiders",
      type: "Internship · 6 months",
      location: "India",
      description:
        "Delivered a real-time chat application end-to-end using Java and JSP. Built a procedural dungeon-generation game in Java with automated environment testing. Participated in Agile sprints; collaborated across design and development cycles.",
      tags: ["Java", "JSP", "SQL", "JDBC", "React.js", "CSS", "HTML5", "Agile"],
      current: false,
    },
    {
      period: "Apr 2024 - Oct 2024",
      role: "Internship - Software Testing",
      company: "Qspiders",
      type: "Internship · 7 months",
      location: "India",
      description:
        "Gained expertise in software testing methodologies including manual testing, automation testing, test case design, execution, and defect tracking. Worked on quality assurance best practices.",
      tags: ["Software Testing", "Manual Testing", "Automation Testing", "QA"],
      current: false,
    },
    {
      period: "Jan 2024 - May 2024",
      role: "Internship - Cloud Computing",
      company: "Cisco",
      type: "Internship · 5 months",
      location: "Remote",
      description:
        "Cloud computing fundamentals and infrastructure management with Cisco technologies. Deployed and maintained cloud infrastructure and services. Gained hands-on experience with cloud-native environments and networking.",
      tags: ["Cloud Computing", "Cisco", "Networking", "Infrastructure"],
      current: false,
    },
  ];

  return (
    <div className="flex flex-col overflow-auto bg-[var(--bg-surface)] text-[var(--text-primary)] font-sans text-[13px] ide-scrollbar h-full w-full p-6 md:p-12 pb-32">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-10">
        <div className="font-mono text-[var(--text-muted)]">
          // experience.ts - professional journey timeline
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-[32px] md:text-[48px] font-black tracking-tight text-[var(--text-primary)]">
            Experience
          </h1>
          <div className="font-mono text-[14px] text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">interface</span>{" "}
            <span className="text-[var(--info)]">Career</span>{" "}
            <span className="text-[var(--accent)]">extends</span>{" "}
            <span className="text-[var(--info)]">Timeline</span> {"{}"}
          </div>
        </div>

        <div className="relative ml-4 mt-4 pl-8 border-l-2 border-[var(--border-default)] flex flex-col gap-16">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Dot */}
              <div
                className={`absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-4 border-[var(--bg-surface)] transition-all duration-300 ${
                  exp.current
                    ? "bg-[var(--accent)] scale-110 shadow-[0_0_12px_var(--accent-muted)]"
                    : "bg-[var(--text-disabled)] group-hover:bg-[var(--text-muted)]"
                }`}
              />
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-[var(--bg-muted)] text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] border border-[var(--border-default)]">
                    {exp.period}
                  </span>
                  {exp.type && (
                    <span className="px-2 py-0.5 rounded-md bg-[var(--bg-elevated)] text-[10px] font-medium text-[var(--text-secondary)] border border-[var(--border-default)]">
                      {exp.type}
                    </span>
                  )}
                  {exp.current && (
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-[var(--success)] uppercase tracking-tighter">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)] animate-pulse" />
                      Active
                    </span>
                  )}
                </div>

                <div className="mt-1">
                  <h2 className="text-[24px] md:text-[28px] font-black text-[var(--text-primary)] leading-tight">
                    {exp.role}
                  </h2>
                  <div className="text-[16px] md:text-[18px] font-bold text-[var(--accent)] mt-1">
                    @ {exp.company}
                  </div>
                  {exp.location && (
                    <div className="text-[12px] text-[var(--text-muted)] mt-1 font-medium">
                      📍 {exp.location}
                    </div>
                  )}
                </div>

                <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-3xl">
                  {exp.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1.5 text-[11px] font-bold text-[var(--info)] hover:border-[var(--info)]/30 hover:bg-[var(--bg-muted)] transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
