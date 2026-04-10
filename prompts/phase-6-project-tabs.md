━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 6 — PROJECT TAB: 7 SUB-TABS SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANT: The project detail panel currently has 3 tabs (overview, architecture, changelog).
Expand it to 7 tabs. Update the TabKey type in ProjectData.ts:

export type TabKey = "overview" | "architecture" | "readme" | "insights" | "radar" | "changelog" | "video";

Create each new tab component:

─── TAB: README VIEWER ───
Create: components/projects/ProjectReadme.tsx

"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ProjectShape } from "./ProjectData";
import { SectionLabel } from "./ProjectUI";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectReadme({ project }: { project: ProjectShape }) {
const [content, setContent] = useState<string>("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
const [activeAnchor, setActiveAnchor] = useState("");

useEffect(() => {
const username = "Itinerant18";
const branch = "main";
fetch(`https://raw.githubusercontent.com/${username}/${project.id}/${branch}/README.md`)
.then((r) => r.ok ? r.text() : Promise.reject())
.then((text) => { setContent(text); setLoading(false); })
.catch(() => { setError(true); setLoading(false); });
}, [project.id]);

if (loading) return (

<div className="flex items-center gap-3 py-20 text-[var(--text-muted)]">
<div className="h-4 w-4 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
<span className="font-mono text-[11px] tracking-wider">Fetching README.md...</span>
</div>
);

if (error) return (

<div className="py-20 text-center">
<p className="text-[13px] text-[var(--text-muted)]">No README found for this repository.</p>
</div>
);

return (
<motion.article
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="prose prose-invert max-w-none"
style={{
        "--tw-prose-body": "var(--text-secondary)",
        "--tw-prose-headings": "var(--text-primary)",
        "--tw-prose-code": "var(--accent)",
        "--tw-prose-pre-bg": "var(--bg-elevated)",
      } as React.CSSProperties}
    >
      <SectionLabel label="README.md" />
      <div className="mt-6 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 md:p-10">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="section-heading gradient-text mb-6">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="card-heading text-[var(--text-primary)] mb-4 mt-8 border-b border-[var(--border-default)] pb-2">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-[var(--text-primary)] font-semibold text-[16px] mb-3 mt-6">{children}</h3>
            ),
            code({ inline, className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              if (!inline && match) {
                return (
                  <div className="relative my-4 rounded-sm overflow-hidden border border-[var(--border-default)]">
                    <div className="flex items-center justify-between bg-[var(--bg-muted)] px-4 py-2 border-b border-[var(--border-default)]">
                      <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider">{match[1]}</span>
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"/>
                        <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"/>
                        <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]"/>
                      </div>
                    </div>
                    <SyntaxHighlighter
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ margin: 0, background: "var(--bg-base)", padding: "1.25rem" }} >
{String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                );
              }
              return <code className="mono-text rounded px-1.5 py-0.5 text-[var(--accent)] bg-[var(--accent-subtle)]">{children}</code>;
            },
            img: ({ src, alt }) => (
              <img src={`/api/proxy-image?url=${encodeURIComponent(src || "")}`} alt={alt} className="rounded-sm border border-[var(--border-default)] max-w-full my-4" />
),
a: ({ href, children }) => (
<a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">{children}</a>
),
blockquote: ({ children }) => (

<blockquote className="border-l-4 border-[var(--accent)] bg-[var(--accent-subtle)] pl-4 py-2 my-4 italic text-[var(--text-secondary)] rounded-r-sm">{children}</blockquote>
),
table: ({ children }) => (
<div className="overflow-x-auto my-4">
<table className="w-full text-[12px] border-collapse">{children}</table>
</div>
),
th: ({ children }) => (
<th className="border border-[var(--border-default)] bg-[var(--bg-muted)] px-3 py-2 text-left font-semibold text-[var(--text-primary)]">{children}</th>
),
td: ({ children }) => (
<td className="border border-[var(--border-default)] px-3 py-2 text-[var(--text-secondary)]">{children}</td>
),
}} >
{content}
</ReactMarkdown>
</div>
</motion.article>
);
}

─── TAB: INSIGHTS ───
Create: components/projects/ProjectInsights.tsx

"use client";
import { useEffect, useState } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { ProjectShape } from "./ProjectData";
import { SectionLabel } from "./ProjectUI";
import { CounterText } from "@/components/ui/AnimatedText";

interface GitHubStats {
stars: number;
forks: number;
watchers: number;
openIssues: number;
size: number;
language: string;
pushedAt: string;
createdAt: string;
topics: string[];
}

const LANG_COLORS: Record<string, string> = {
TypeScript: "#3178c6", JavaScript: "#f7df1e", Python: "#3572a5",
Dart: "#54c5f8", HTML: "#e34f26", CSS: "#1572b6", Java: "#b07219",
"C++": "#f34b7d", Rust: "#dea584", Go: "#00add8",
};

function healthScore(stats: GitHubStats): number {
const recencyDays = (Date.now() - new Date(stats.pushedAt).getTime()) / 86400000;
const recency = Math.max(0, 100 - recencyDays _ 0.5);
const activity = Math.min(100, (stats.stars _ 10 + stats.forks _ 20 + stats.watchers _ 5));
return Math.round((recency _ 0.5 + activity _ 0.5));
}

export function ProjectInsights({ project }: { project: ProjectShape }) {
const [stats, setStats] = useState<GitHubStats | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetch(`https://api.github.com/repos/Itinerant18/${project.id}`)
.then((r) => r.json())
.then((d) => {
setStats({
stars: d.stargazers_count ?? 0, forks: d.forks_count ?? 0,
watchers: d.watchers_count ?? 0, openIssues: d.open_issues_count ?? 0,
size: d.size ?? 0, language: d.language ?? "Unknown",
pushedAt: d.pushed_at ?? "", createdAt: d.created_at ?? "",
topics: d.topics ?? [],
});
setLoading(false);
})
.catch(() => setLoading(false));
}, [project.id]);

const techGroups = project.techStack?.slice(0, 5).map((t, i) => ({
subject: t, A: Math.max(30, Math.floor(Math.random() \* 40) + 60),
})) ?? [];

const languageData = [
{ name: project.primaryTech || "TypeScript", value: 70, color: LANG_COLORS[project.primaryTech || "TypeScript"] || "#A05EF8" },
{ name: "Other", value: 30, color: "var(--border-default)" },
];

const score = stats ? healthScore(stats) : 0;

return (

<div className="space-y-10">
<section>
<SectionLabel label="Repository Metrics" />
<div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
{[
{ label: "Stars", value: stats?.stars ?? 0, color: "#fabd2f" },
{ label: "Forks", value: stats?.forks ?? 0, color: "var(--accent)" },
{ label: "Watchers", value: stats?.watchers ?? 0, color: "var(--info)" },
{ label: "Health", value: score, suffix: "%", color: score > 60 ? "var(--success)" : "var(--warning)" },
].map((metric, i) => (
<motion.div
key={metric.label}
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: i * 0.1 }}
className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5"
style={{ borderLeftColor: metric.color, borderLeftWidth: 3 }} >
<div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{metric.label}</div>
<div className="mt-2 text-[28px] font-black font-display" style={{ color: metric.color }}>
<CounterText target={metric.value} suffix={metric.suffix ?? ""} />
</div>
</motion.div>
))}
</div>
</section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <SectionLabel label="Stack Proficiency Radar" />
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <RadarChart data={techGroups}>
                <PolarGrid stroke="var(--border-default)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--text-muted)", fontSize: 10 }} />
                <Radar name="Proficiency" dataKey="A" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <SectionLabel label="Language Breakdown" />
          <div className="mt-4 h-64 flex items-center justify-center">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={languageData} cx="50%" cy="50%" outerRadius={90} dataKey="value" strokeWidth={0}>
                  {languageData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)", borderRadius: 4, color: "var(--text-primary)", fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 justify-center">
            {languageData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-[10px] font-semibold text-[var(--text-muted)]">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionLabel label="Project Health Score" />
        <div className="mt-4 relative h-6 rounded-full bg-[var(--bg-muted)] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: score > 60 ? "var(--success)" : score > 30 ? "var(--warning)" : "var(--error)" }}
          />
          <div className="absolute inset-0 flex items-center px-3">
            <span className="text-[10px] font-bold text-white">{score}/100 — {score > 60 ? "Active" : score > 30 ? "Moderate" : "Dormant"}</span>
          </div>
        </div>
      </section>
    </div>

);
}

─── TAB: VIDEO DEMO ───
Create: components/projects/ProjectVideo.tsx

"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectShape } from "./ProjectData";
import { SectionLabel } from "./ProjectUI";
import { FaPlay, FaPause, FaExpand } from "react-icons/fa6";

export function ProjectVideo({ project }: { project: ProjectShape }) {
const videoSrc = `/videos/${project.id}.mp4`;
const [playing, setPlaying] = useState(false);
const [progress, setProgress] = useState(0);
const [exists, setExists] = useState(true);
const videoRef = useRef<HTMLVideoElement>(null);

const toggle = () => {
if (!videoRef.current) return;
playing ? videoRef.current.pause() : videoRef.current.play();
setPlaying(!playing);
};

if (!exists) {
return (

<div className="py-20 text-center space-y-4">
<div className="text-[var(--text-disabled)] text-[12px] font-mono">// VIDEO_DEMO_NOT_GENERATED</div>
<p className="text-[13px] text-[var(--text-muted)]">
Run <code className="mono-text text-[var(--accent)] bg-[var(--accent-subtle)] px-1.5 py-0.5 rounded">npx create-video@latest</code> to generate a demo for this project.
</p>
<p className="text-[11px] text-[var(--text-disabled)]">Output: /public/videos/{project.id}.mp4</p>
</div>
);
}

return (

<div className="space-y-6">
<SectionLabel label="Project Demo" />
<div className="relative rounded-sm border border-[var(--border-default)] overflow-hidden bg-black group">
<video
ref={videoRef}
src={videoSrc}
className="w-full aspect-video object-cover"
onTimeUpdate={() => {
if (videoRef.current) setProgress((videoRef.current.currentTime / videoRef.current.duration) \* 100);
}}
onEnded={() => setPlaying(false)}
onError={() => setExists(false)}
muted
playsInline
/>
<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
<motion.button
whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
onClick={toggle}
className="h-16 w-16 rounded-full border-2 border-white/30 bg-black/50 backdrop-blur-sm flex items-center justify-center text-white" >
{playing ? <FaPause size={20} /> : <FaPlay size={20} className="ml-1" />}
</motion.button>
</div>
<div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
<motion.div className="h-full bg-[var(--accent)]" style={{ width: `${progress}%` }} />
</div>
</div>
</div>
);
}

─── UPDATE MAIN PROJECT PANEL ───
In whatever component renders the project tabs (likely ProjectDetail or the projects page),
expand the tab bar to show all 7 tabs:

const TABS: { key: TabKey; label: string; icon: string }[] = [
{ key: "overview", label: "Overview", icon: "eye" },
{ key: "readme", label: "README", icon: "book" },
{ key: "architecture", label: "Arch", icon: "cpu" },
{ key: "insights", label: "Insights", icon: "activity" },
{ key: "radar", label: "Stack", icon: "layers" },
{ key: "changelog", label: "Changelog", icon: "history" },
{ key: "video", label: "Demo", icon: "play" },
];

Style the tab bar with:

- Active tab: gradient-text font color + border-bottom: 2px solid var(--accent) + neon-glow box-shadow
- Inactive tab: text-muted, hover: text-secondary
- Scrollable on mobile with no scrollbar: overflow-x-auto scrollbar-hide
- Stagger animate each tab in on mount

Verify: run `npx tsc --noEmit` and show me the output before moving on.
If there are errors, fix them before we proceed to the next phase.
