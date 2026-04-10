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
  const recency = Math.max(0, 100 - recencyDays * 0.5);
  const activity = Math.min(100, (stats.stars * 10 + stats.forks * 20 + stats.watchers * 5));
  return Math.round((recency * 0.5 + activity * 0.5));
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
    subject: t, A: Math.max(30, Math.floor(Math.random() * 40) + 60),
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
              style={{ borderLeftColor: metric.color, borderLeftWidth: 3 }}
            >
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
