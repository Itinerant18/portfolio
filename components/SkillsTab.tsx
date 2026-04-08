"use client";

const skillCategories = [
  {
    title: "FRONTEND & UI/UX",
    skills: [
      { name: "React.js & Next.js", percentage: 88, color: "var(--info)" },
      { name: "HTML5 & CSS3", percentage: 92, color: "var(--success)" },
      { name: "Tailwind CSS", percentage: 85, color: "var(--warning)" },
      { name: "Framer Motion", percentage: 80, color: "var(--accent)" },
      { name: "Flutter & Dart", percentage: 65, color: "var(--info)" },
    ],
  },
  {
    title: "AI / ML & RAG",
    skills: [
      { name: "LangChain", percentage: 82, color: "var(--success)" },
      { name: "RAG Architecture", percentage: 85, color: "var(--info)" },
      { name: "Computer Vision (OpenCV)", percentage: 80, color: "var(--accent)" },
      { name: "pgvector & Vector DBs", percentage: 78, color: "var(--warning)" },
      { name: "Gesture Recognition", percentage: 75, color: "var(--warning)" },
    ],
  },
  {
    title: "BACKEND & APIs",
    skills: [
      { name: "Java & Core Java", percentage: 85, color: "var(--success)" },
      { name: "Node.js & Express", percentage: 80, color: "var(--info)" },
      { name: "Python (Flask)", percentage: 75, color: "var(--warning)" },
      { name: "REST APIs & WebSockets", percentage: 82, color: "var(--accent)" },
      { name: "JSP & JDBC", percentage: 78, color: "var(--info)" },
    ],
  },
  {
    title: "DATABASES & BaaS",
    skills: [
      { name: "SQL & PostgreSQL", percentage: 82, color: "var(--info)" },
      { name: "Supabase & Convex", percentage: 85, color: "var(--success)" },
      { name: "Firebase", percentage: 78, color: "var(--warning)" },
      { name: "SQLite", percentage: 80, color: "var(--accent)" },
      { name: "Redis", percentage: 70, color: "var(--error)" },
    ],
  },
  {
    title: "CLOUD & IoT",
    skills: [
      { name: "AWS (S3, Lambda)", percentage: 78, color: "var(--info)" },
      { name: "ESP32 & MQTT", percentage: 82, color: "var(--success)" },
      { name: "Capacitor & MLKit", percentage: 75, color: "var(--accent)" },
      { name: "Docker & CI/CD", percentage: 72, color: "var(--warning)" },
      { name: "GitHub Actions", percentage: 78, color: "var(--info)" },
    ],
  },
];

const familiarTags = [
  "Zoho Creator",
  "Android SDK",
  "Android Studio",
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
  "Microsoft Excel",
  "Git BASH",
];

export default function SkillsTab() {
  return (
    <div className="flex h-full w-full flex-col overflow-auto bg-[var(--bg-surface)] text-[var(--text-primary)] font-sans text-[13px] ide-scrollbar p-6 md:p-12 pb-32">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-10">
        <div className="font-mono text-[var(--text-muted)]">
          // skills.json - core competency matrix
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-[24px] font-semibold tracking-tight text-[var(--text-primary)] md:text-[28px]">
            Technical Skills
          </h1>
          <div className="font-mono text-[14px]">
            <span className="text-[var(--accent)]">const</span> <span className="text-[var(--info)]">capabilities</span> = {"{ "}
            <span className="text-[var(--warning)]">status</span>: <span className="text-[var(--success)]">"actively_evolving"</span>,{" "}
            <span className="text-[var(--warning)]">growth</span>: <span className="text-[var(--success)]">"exponential"</span>
            {" }"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mt-4">
          {skillCategories.map((category) => (
            <div key={category.title} className="flex flex-col gap-6">
              <h2 className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
                <span className="h-px flex-1 bg-[var(--border-default)]" />
                {category.title}
              </h2>
              <div className="flex flex-col gap-5">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col gap-2">
                    <div className="flex justify-between items-end px-0.5">
                      <span className="text-[13px] font-medium text-[var(--text-secondary)]">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[11px] font-medium text-[var(--text-muted)]">
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[var(--bg-muted)] overflow-hidden relative border border-[var(--border-default)]/50">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(0,0,0,0.2)]"
                        style={{
                          width: `${skill.percentage}%`,
                          backgroundColor: skill.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--border-default)] pt-10">
          <h2 className="mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
            ECOSYSTEM & LIBRARIES
          </h2>
          <div className="flex flex-wrap gap-2">
            {familiarTags.map((tag) => (
              <span
                key={tag}
                className="cursor-default rounded-lg border border-[var(--border-default)] bg-[var(--bg-muted)] px-3 py-1.5 text-[12px] font-medium text-[var(--text-secondary)] shadow-sm transition-all hover:border-[var(--accent)]/50 hover:bg-[var(--bg-overlay)] hover:text-[var(--text-primary)]"
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
