"use client";

export default function AboutTab() {
  return (
    <div className="flex flex-col overflow-auto bg-[var(--bg-surface)] text-[var(--text-primary)] font-sans text-[13px] ide-scrollbar h-full w-full p-6 md:p-12 pb-32">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-10">
        <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
          About Aniket Karmakar
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-[24px] font-semibold tracking-tight text-[var(--text-primary)] md:text-[28px]">
            About Me
          </h1>
          <div className="text-[14px] text-[var(--text-muted)]">
            Front-end UI developer · React.js · full-stack · AI/ML · IoT · cloud
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="rounded border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 text-[15px] leading-relaxed text-[var(--text-secondary)] shadow-sm md:p-8 md:text-[16px]">
            Hi! I'm <span className="text-[var(--accent)] font-bold">Aniket Karmakar</span>, pursuing a Bachelor of Technology in Electronics and Communication Engineering at NSHM Knowledge Campus, with a strong passion for <span className="text-[var(--info)] font-semibold">Front-end UI Development</span> and <span className="text-[var(--info)] font-semibold">Full-stack Web Development</span>. I'm a passionate Web Developer with a strong foundation in <span className="text-[var(--info)] font-semibold">Front-End Web Dev</span> with competitive programming. With a passion for elegantly-designed architecture and code, I am committed to leveraging technology to build scalable, unique software solutions. Currently working as a <span className="text-[var(--text-primary)] font-semibold underline decoration-[var(--accent)]/30 underline-offset-4">Junior Software Engineer in R&D at Security Engineers Pvt. Ltd. (SEPLE)</span>.
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
              <span className="h-px w-8 bg-[var(--accent)]" />
              Services
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Web Design",
                "Software Testing",
                "Web Development",
                "Application Development",
                "Cloud Application Development"
              ].map((service, i) => (
                <div key={i} className="flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-muted)] px-4 py-2 text-[12px] font-semibold text-[var(--text-secondary)] hover:border-[var(--accent)]/30 hover:bg-[var(--bg-overlay)] transition-all">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  {service}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
              <span className="h-px w-8 bg-[var(--accent)]" />
              Strategic Focus
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: "🔭", text: "Building FAS-Control, SWatch360, & Dexter AI at SEPLE" },
                { icon: "🧠", text: "Deep research into Computer Vision, Gesture Recognition & RAG Pipelines" },
                { icon: "🪴", text: "Full-stack apps with React, TypeScript, Java, and Python" },
                { icon: "💬", text: "Cloud infrastructure with AWS S3, Lambda, ESP32/MQTT, and Cisco" },
                { icon: "⚡", text: "Shipping real products across startup and enterprise settings" },
                { icon: "✨", text: "Targeting Generative AI and software development roles" }
              ].map((item, i) => (
                <div key={i} className="group flex items-start gap-4 rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)]/50 p-5 transition-colors hover:bg-[var(--bg-muted)]">
                  <span className="text-[20px] filter grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                  <span className="text-[13px] font-medium text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
              <span className="h-px w-8 bg-[var(--accent)]" />
              Academic Foundation
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col justify-between gap-4 rounded border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 shadow-sm transition-all hover:border-[var(--accent)]/30 md:flex-row">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[16px] md:text-[18px] font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <span className="text-[var(--accent)]">🎓</span> NSHM College of Management and Technology
                  </h3>
                  <div className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Kolkata, West Bengal</div>
                  <div className="text-[var(--info)] font-bold mt-1">B.Tech – Electronics & Communication Engineering</div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1">
                  <div className="text-[var(--text-disabled)] font-mono text-[12px] mt-1">Apr 2020 - Aug 2024</div>
                  <div className="text-[var(--success)] font-bold text-[14px]">CGPA: 8.6</div>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-4 rounded border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 shadow-sm transition-all hover:border-[var(--accent)]/30 md:flex-row">
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
              <div className="flex flex-col justify-between gap-4 rounded border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 shadow-sm transition-all hover:border-[var(--accent)]/30 md:flex-row">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[16px] md:text-[18px] font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <span className="text-[var(--accent)]">🏫</span> Jemo NN High School
                  </h3>
                  <div className="text-[var(--info)] font-bold mt-1">Higher Secondary</div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1">
                  <div className="text-[var(--text-disabled)] font-mono text-[12px] mt-1">Feb 2018 - Jun 2020</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
              <span className="h-px w-8 bg-[var(--accent)]" />
              Certifications
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col justify-between gap-4 rounded border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 shadow-sm transition-all hover:border-[var(--accent)]/30 md:flex-row">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[16px] md:text-[18px] font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <span className="text-[var(--accent)]">☁️</span> Cloud Computing – Amazon AWS
                  </h3>
                </div>
                <div className="flex items-start md:items-end">
                  <div className="text-[var(--text-disabled)] font-mono text-[12px]">Jun 2023</div>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-4 rounded border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 shadow-sm transition-all hover:border-[var(--accent)]/30 md:flex-row">
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

          <div className="flex flex-col gap-6">
            <h2 className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
              <span className="h-px w-8 bg-[var(--accent)]" />
              Languages
            </h2>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-muted)] px-4 py-2 text-[12px] font-semibold text-[var(--text-secondary)]">
                🌏 English · Professional Working Proficiency
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
