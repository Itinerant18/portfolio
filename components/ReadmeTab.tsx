"use client";

import { motion } from "framer-motion";

/**
 * ReadmeTab — renders Aniket's GitHub profile README as a rich,
 * rendered Markdown-style page inside the IDE editor pane.
 * All external images are loaded directly from their GitHub / shield URLs.
 */
export default function ReadmeTab() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="ide-scrollbar flex h-full w-full flex-col overflow-y-auto bg-[var(--bg-base)] pb-32 font-sans text-[var(--text-secondary)]">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-6 md:p-10"
      >
        {/* ── Header Banner ── */}
        <motion.div variants={item} className="overflow-hidden rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://capsule-render.vercel.app/api?type=waving&color=0:03001e,40:7303c0,80:ec38bc,100:fdeff9&height=240&section=header&text=Aniket%20Karmakar&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Systems%20Architect%20%7C%20AI%2FML%20Engineer%20%7C%20Full-Stack%20Developer&descAlignY=60&descAlign=50&descSize=18"
            alt="Header"
            className="w-full"
          />
        </motion.div>

        {/* ── Typing SVG ── */}
        <motion.div variants={item} className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=20&pause=900&color=EC38BC&center=true&vCenter=true&width=760&height=45&lines=Designing+Enterprise+RAG+%26+AI+Systems;Next.js+16+%2B+Spring+Boot+%2B+TypeScript+Fullstack;Industrial+IoT+Platform+Architect;Multilingual+LLM+Pipeline+Engineer;Junior+Executive+Engineer+%40+SEPLe"
            alt="Typing"
            className="max-w-full"
          />
        </motion.div>

        {/* ── Badges Row ── */}
        <motion.div variants={item} className="flex flex-wrap justify-center gap-2">
          {[
            { label: "LinkedIn", color: "0A66C2", logo: "linkedin", href: "https://www.linkedin.com/in/itinerant018" },
            { label: "GitHub", color: "181717", logo: "github", href: "https://github.com/Itinerant18" },
            { label: "Gmail", color: "EA4335", logo: "gmail", href: "mailto:itinerant018@gmail.com" },
            { label: "Portfolio", color: "7303c0", logo: "githubpages", href: "https://github.com/Itinerant18?tab=repositories" },
          ].map((b) => (
            <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://img.shields.io/badge/${b.label}-${b.color}?style=for-the-badge&logo=${b.logo}&logoColor=white`} alt={b.label} />
            </a>
          ))}
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap justify-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://komarev.com/ghpvc/?username=Itinerant18&color=EC38BC&style=flat-square&label=Profile+Views" alt="views" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://img.shields.io/github/followers/Itinerant18?style=flat-square&color=7303c0&label=Followers&logo=github" alt="followers" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://img.shields.io/badge/Active%20Since-Nov%202021-EC38BC?style=flat-square" alt="active" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://img.shields.io/badge/Commits-632+-7303c0?style=flat-square&logo=git&logoColor=white" alt="commits" />
        </motion.div>

        {/* ── Divider ── */}
        <Divider />

        {/* ── About Me ── */}
        <motion.div variants={item}>
          <SectionTitle emoji="👤" title="About Me" />
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 font-mono text-[12px] leading-7 shadow-sm">
              <pre className="whitespace-pre-wrap text-[var(--text-secondary)]">{`name: Aniket Karmakar
role: Junior Executive Engineer — R&D
company: Security Engineers Pvt. Ltd.
base: Kolkata, India 🇮🇳

focus: ▸ Enterprise RAG & LLM pipelines
  ▸ Full-stack · Next.js + Spring Boot
  ▸ Industrial IoT · ThingsBoard
  ▸ AI-native product development

currently_building: ▸ Dexter Tech Support AI (RAG · Sarvam-M)
  ▸ SWatch360 Flutter mobile client

leveling_up: ▸ System Design & Distributed Systems
  ▸ Kafka · CQRS · Kubernetes
  ▸ Multi-Agent AI · LLM Fine-tuning`}</pre>
            </div>
            <div className="flex items-center justify-center overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
                alt="Coding"
                className="w-full max-w-[280px] rounded"
              />
            </div>
          </div>
        </motion.div>

        <Divider />

        {/* ── Tech Stack ── */}
        <motion.div variants={item}>
          <SectionTitle emoji="💻" title="Tech Stack" />
          <div className="mt-4 flex flex-col items-center gap-6">
            <StackRow label="🔤 Languages" icons="java,python,ts,js,dart,cpp,html,css" />
            <StackRow label="🖥️ Frontend & Mobile" icons="react,nextjs,tailwind,materialui,flutter" />
            <StackRow label="⚙️ Backend" icons="spring,nodejs,fastapi,express" />
            <StackRow label="🗄️ Databases & Cache" icons="postgres,mysql,mongodb,redis,supabase" />
            <StackRow label="☁️ DevOps & Cloud" icons="docker,githubactions,aws,vercel,nginx,git" />

            <div className="w-full">
              <div className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                🤖 AI · ML · Vector
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {["LangChain", "OpenAI", "Sarvam‑M LLM", "Pinecone", "pgvector", "Upstash Redis", "Ollama", "RAG Pipelines"].map((t) => (
                  <span key={t} className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1.5 text-[10px] font-bold text-[var(--text-secondary)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full">
              <div className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                📡 IoT & Hardware
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://skillicons.dev/icons?i=arduino,raspberrypi&perline=8" alt="IoT" className="h-10" />
                {["ThingsBoard", "MQTT"].map((t) => (
                  <span key={t} className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1.5 text-[10px] font-bold text-[var(--text-secondary)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <Divider />

        {/* ── Architecture Mastery ── */}
        <motion.div variants={item}>
          <SectionTitle emoji="🏗️" title="Architecture Mastery" />
          <div className="mt-4 flex flex-col gap-4">
            <div className="text-center text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--success)]">✅ Battle-Tested</div>
            <div className="flex flex-wrap justify-center gap-1.5">
              {["MVC Architecture", "REST API Design", "JWT / OAuth2", "Spring Security", "RAG Pipelines", "Semantic Search", "LLM Orchestration", "Docker Compose", "ThingsBoard IoT", "MQTT Telemetry", "SSR Next.js", "Component Architecture", "pgvector / Vector DB", "Redis Caching"].map((t) => (
                <span key={t} className="rounded-sm border border-[var(--success)]/30 bg-[var(--success)]/10 px-2.5 py-1 text-[10px] font-bold text-[var(--success)]">
                  ✅ {t}
                </span>
              ))}
            </div>

            <div className="mt-2 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">🔥 Currently Learning</div>
            <div className="flex flex-wrap justify-center gap-1.5">
              {[
                "System Design HLD/LLD — 75%", "CAP Theorem — 55%", "Kafka / Event Driven — 40%",
                "CQRS Pattern — 30%", "Event Sourcing — 20%", "HyDE Retrieval — 55%",
                "Multi-Agent AI — 35%", "LLM Fine-Tuning — 25%", "Kubernetes — 28%",
                "Observability — 35%", "Flutter BLoC — 38%", "Flutter Clean Arch — 48%"
              ].map((t) => (
                <span key={t} className="rounded-sm border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-1 text-[10px] font-bold text-[var(--accent)]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <Divider />

        {/* ── GitHub Analytics ── */}
        <motion.div variants={item}>
          <SectionTitle emoji="📊" title="GitHub Analytics" />
          <div className="mt-4 flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://github-readme-stats-tawny-pi-56.vercel.app/api?username=Itinerant18&theme=tokyonight&hide_border=true&show_icons=true&count_private=true&include_all_commits=true&rank_icon=github"
                alt="Stats"
                className="h-[180px] rounded-sm border border-[var(--border-default)]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://github-readme-stats-tawny-pi-56.vercel.app/api/top-langs/?username=Itinerant18&theme=tokyonight&hide_border=true&layout=compact&langs_count=8&card_width=340"
                alt="Languages"
                className="h-[180px] rounded-sm border border-[var(--border-default)]"
              />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://streak-stats.demolab.com?user=Itinerant18&theme=tokyonight&hide_border=true&date_format=M%20j%5B%2C%20Y%5D&fire=EC38BC&ring=7303c0&sideLabels=EC38BC&currStreakLabel=EC38BC"
              alt="Streak"
              className="w-full max-w-3xl rounded-sm border border-[var(--border-default)]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github-readme-activity-graph.vercel.app/graph?username=Itinerant18&theme=tokyo-night&hide_border=true&area=true&color=EC38BC&line=7303c0&point=ffffff"
              alt="Graph"
              className="w-full max-w-3xl rounded-sm border border-[var(--border-default)]"
            />
          </div>
        </motion.div>

        <Divider />

        {/* ── Featured Projects ── */}
        <motion.div variants={item}>
          <SectionTitle emoji="🚀" title="Featured Projects" />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { user: "Itinerant18", repo: "Swacth360_bot" },
              { user: "Itinerant18", repo: "SWatch360" },
              { user: "Itinerant18", repo: "pookies-ai-zone" },
              { user: "Itinerant18", repo: "ThingsBoard---Bot" },
              { user: "Itinerant18", repo: "Financial-Advisor" },
              { user: "Itinerant18", repo: "HawkEye-Drone" },
            ].map((p) => (
              <a
                key={p.repo}
                href={`https://github.com/${p.user}/${p.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="overflow-hidden rounded-sm border border-[var(--border-default)] transition-all hover:border-[var(--border-hover)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github-readme-stats-tawny-pi-56.vercel.app/api/pin/?username=${p.user}&repo=${p.repo}&theme=tokyonight&hide_border=true&title_color=EC38BC&icon_color=7303c0`}
                  alt={p.repo}
                  className="w-full"
                />
              </a>
            ))}
          </div>
        </motion.div>

        <Divider />

        {/* ── Currently Building ── */}
        <motion.div variants={item}>
          <SectionTitle emoji="🔨" title="Currently Building" />
          <div className="mt-4 overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)]">
            <div className="border-b border-[var(--border-default)] bg-[var(--accent)]/10 px-5 py-3 text-center">
              <span className="text-[12px] font-bold text-[var(--accent)]">🤖 Dexter Tech Support AI — IN DEVELOPMENT</span>
            </div>
            <table className="w-full text-[12px]">
              <tbody>
                {[
                  ["🤖 LLM", "Sarvam-M · OpenAI fallback", "🟡 Active"],
                  ["📚 RAG", "Supabase pgvector → Pinecone", "🟡 Active"],
                  ["⚡ Cache", "Upstash Redis", "✅ Done"],
                  ["🖥️ Web", "Next.js 16 · React 19 · TypeScript", "🟡 Active"],
                  ["📱 Mobile", "Flutter — SWatch360", "🟡 Active"],
                  ["⚙️ API", "Spring Boot · REST + WebSocket", "🔵 Dev"],
                  ["📊 IoT", "ThingsBoard PE · MQTT", "✅ Done"],
                  ["🐳 Infra", "Docker Compose · GitHub Actions", "✅ Done"],
                ].map(([layer, tech, status]) => (
                  <tr key={layer} className="border-b border-[var(--border-default)] last:border-b-0">
                    <td className="px-4 py-2.5 font-bold text-[var(--text-primary)]">{layer}</td>
                    <td className="px-4 py-2.5 text-[var(--text-secondary)]">{tech}</td>
                    <td className="px-4 py-2.5 text-right font-bold">{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <Divider />

        {/* ── Contribution Snake ── */}
        <motion.div variants={item} className="flex flex-col items-center gap-4">
          <SectionTitle emoji="🐍" title="Contribution Snake" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://raw.githubusercontent.com/Itinerant18/Itinerant18/output/github-contribution-grid-snake-dark.svg"
            alt="Snake"
            className="mt-2 w-full max-w-3xl"
          />
        </motion.div>

        <Divider />

        {/* ── Character Sheet ── */}
        <motion.div variants={item}>
          <SectionTitle emoji="⚔️" title="Character Sheet" />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 shadow-sm">
              <h3 className="mb-3 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text-primary)]">🎮 Genshin Roster</h3>
              <table className="w-full text-[11px]">
                <tbody>
                  {[
                    ["⚡", "Raiden Shogun", "Main DPS"],
                    ["🌿", "Tighnari", "Sub DPS"],
                    ["🔥", "Xiangling", "Buffer"],
                    ["💧", "Barbara", "Healer"],
                    ["🔥", "Bennett", "ATK Buffer"],
                    ["🛡️", "Thoma", "Shielder"],
                    ["🌿", "Yaoyao", "Dendro Healer"],
                    ["❄️", "Kaeya", "Cryo Flex"],
                  ].map(([icon, name, role]) => (
                    <tr key={name} className="border-b border-[var(--border-default)] last:border-b-0">
                      <td className="py-1.5 text-center">{icon}</td>
                      <td className="py-1.5 font-bold text-[var(--text-primary)]">{name}</td>
                      <td className="py-1.5 text-right text-[var(--text-muted)]">{role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 shadow-sm">
              <h3 className="mb-3 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text-primary)]">🧙 Dev Stats</h3>
              <table className="w-full text-[11px]">
                <tbody>
                  {[
                    ["⚔️ Level", "Junior Executive Eng."],
                    ["🏢 Guild", "SEPLe — R&D"],
                    ["🌟 Class", "Full-Stack + RAG Mage"],
                    ["🗺️ Server", "Kolkata, IN 🇮🇳"],
                    ["📦 XP", "632+ commits"],
                    ["🔭 Quest", "Dexter Tech Support AI"],
                    ["🌱 Training", "Flutter · System Design"],
                    ["🎯 Next Boss", "Kafka · CQRS · K8s"],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b border-[var(--border-default)] last:border-b-0">
                      <td className="py-1.5 font-bold text-[var(--text-muted)]">{label}</td>
                      <td className="py-1.5 text-right text-[var(--text-primary)]">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <Divider />

        {/* ── Let's Connect ── */}
        <motion.div variants={item} className="flex flex-col items-center gap-6 text-center">
          <SectionTitle emoji="🤝" title="Let&apos;s Connect" />
          <div className="flex flex-wrap justify-center gap-2">
            <a href="https://www.linkedin.com/in/itinerant018" target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
            </a>
            <a href="https://github.com/Itinerant18" target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
            </a>
            <a href="mailto:itinerant018@gmail.com">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://img.shields.io/badge/Email-Reach_Out-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
            </a>
          </div>

          <div className="rounded-sm border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-6 py-3">
            <span className="text-[11px] font-bold italic text-[var(--accent)]">
              💬 &quot;Architecture is decisions made early — the rest is just code.&quot;
            </span>
          </div>
        </motion.div>

        {/* ── Footer Wave ── */}
        <motion.div variants={item} className="overflow-hidden rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://capsule-render.vercel.app/api?type=waving&color=0:fdeff9,40:ec38bc,80:7303c0,100:03001e&height=130&section=footer"
            alt="Footer"
            className="w-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── Helper Components ── */

function SectionTitle({ emoji, title }: { emoji: string; title: string }) {
  return (
    <h2 className="flex items-center gap-3 border-b border-[var(--border-default)] pb-3 text-[15px] font-semibold tracking-tight text-[var(--text-primary)]">
      <span>{emoji}</span>
      {title}
    </h2>
  );
}

function Divider() {
  return (
    <div className="flex justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif"
        alt=""
        className="w-full opacity-40"
      />
    </div>
  );
}

function StackRow({ label, icons }: { label: string; icons: string }) {
  return (
    <div className="w-full">
      <div className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
        {label}
      </div>
      <div className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://skillicons.dev/icons?i=${icons}&perline=8`} alt={label} className="h-10" />
      </div>
    </div>
  );
}
