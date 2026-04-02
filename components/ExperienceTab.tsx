export default function ExperienceTab() {
  const experiences = [
    {
      period: "2025 - Present",
      role: "Junior Software Developer",
      company: "EduVanceAI",
      description:
        "Building intelligent backend systems and AI integrations for an EdTech platform. ML-powered personalization, RAG pipelines, and scalable APIs serving thousands of learners daily.",
      tags: [
        "FastAPI",
        "Python",
        "Django",
        "PostgreSQL",
        "Docker",
        "AWS",
        "GenAI",
        "React",
      ],
      current: true,
    },
    {
      period: "Jun 2023 - Aug 2023",
      role: "User Experience Designer",
      company: "Zepto Digital Labs",
      description:
        "Designed UI for a simulation platform and improved user experience through design thinking principles. Delivered research-backed interface improvements that enhanced usability.",
      tags: ["Figma", "UX Research", "Design Thinking", "Prototyping"],
      current: false,
    },
    {
      period: "Jun 2023 - Jul 2023",
      role: "Back End Intern",
      company: "Laser Technologies Pvt Ltd",
      description:
        "Managed and maintained backend systems and databases to support enterprise-level web applications. Ensured uptime, performance, and data integrity across production systems.",
      tags: ["Backend", "Databases", "SQL", "Web Applications"],
      current: false,
    },
  ];

  return (
    <div className="flex flex-col overflow-auto bg-[var(--panel)] text-[var(--text-primary)] font-mono text-[13px] ide-scrollbar h-full w-full p-8 pb-32">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8 font-mono text-[#6e7681]">
          // experience.ts - professional journey
        </div>

        <div className="mb-12">
          <h1
            className="text-[40px] font-extrabold tracking-wide text-[#f0f6fc] mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Experience
          </h1>
          <div className="text-[#8b949e]">
            <span className="text-[#c678dd]">interface</span>{" "}
            <span className="text-[#e5c07b]">Career</span>{" "}
            <span className="text-[#c678dd]">extends</span>{" "}
            <span className="text-[#e5c07b]">Timeline</span> {"{}"}
          </div>
        </div>

        <div className="relative pl-4 border-l border-[#30363d] flex flex-col gap-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative">
              <div
                className={`absolute -left-[21px] top-1 h-[10px] w-[10px] rounded-full border-2 ${
                  exp.current
                    ? "border-[#58a6ff] bg-[#161b22]"
                    : "border-[#6e7681] bg-[#161b22]"
                }`}
                style={
                  exp.current
                    ? { boxShadow: "0 0 0 4px rgba(88,166,255,0.2)" }
                    : {}
                }
              ></div>
              <div className="flex flex-col ml-6">
                <div className="text-[#8b949e] mb-2">{exp.period}</div>
                <h2
                  className="text-[24px] font-bold text-[#f0f6fc] mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {exp.role}
                </h2>
                <div className="text-[#58a6ff] font-medium mb-4 tracking-wide">
                  @ {exp.company}
                </div>
                <p className="text-[#8b949e] leading-relaxed mb-6 max-w-3xl">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-[#30363d] bg-[#0d1117] px-2.5 py-1 text-[11px] text-[#58a6ff]"
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
