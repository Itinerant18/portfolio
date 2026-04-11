"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
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
  TypeScript: "var(--info)",
  JavaScript: "var(--warning)",
  Python: "var(--accent)",
  Dart: "var(--accent)",
  HTML: "var(--accent-muted)",
  CSS: "var(--info)",
  Java: "var(--warning)",
  "C++": "var(--warning)",
  Rust: "var(--accent)",
  Go: "var(--info)",
};

function healthScore(stats: GitHubStats): number {
  const recencyDays = (Date.now() - new Date(stats.pushedAt).getTime()) / 86400000;
  const recency = Number.isFinite(recencyDays) ? Math.max(0, 100 - recencyDays * 0.5) : 0;
  const activity = Math.min(
    100,
    stats.stars * 10 + stats.forks * 20 + stats.watchers * 5,
  );
  return Math.round(recency * 0.5 + activity * 0.5);
}

function techCategoryOf(item: string): string {
  const normalized = item.toLowerCase();
  if (
    ["react", "next", "tailwind", "framer", "html", "css", "vue"].some((key) =>
      normalized.includes(key),
    )
  ) {
    return "Frontend";
  }
  if (
    ["node", "express", "python", "go", "java", "django", "fastapi", "spring"].some((key) =>
      normalized.includes(key),
    )
  ) {
    return "Backend";
  }
  if (
    ["postgres", "mongo", "redis", "sqlite", "database", "supabase", "sql"].some((key) =>
      normalized.includes(key),
    )
  ) {
    return "Storage";
  }
  if (
    ["docker", "github", "vercel", "netlify", "ci", "tool", "linux"].some((key) =>
      normalized.includes(key),
    )
  ) {
    return "Tooling";
  }
  return "Platform";
}

export function ProjectInsights({ project }: { project: ProjectShape }) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/repos/Itinerant18/${project.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
        setStats({
          stars: data.stargazers_count ?? 0,
          forks: data.forks_count ?? 0,
          watchers: data.watchers_count ?? 0,
          openIssues: data.open_issues_count ?? 0,
          size: data.size ?? 0,
          language: data.language ?? "Unknown",
          pushedAt: data.pushed_at ?? "",
          createdAt: data.created_at ?? "",
          topics: data.topics ?? [],
        });
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setStats(null);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [project.id]);

  const proficiencyData = useMemo(() => {
    const stack = project.techStack ?? [];
    const total = stack.length;
    if (total === 0) return [];

    const counts = new Map<string, number>();
    stack.forEach((item) => {
      const category = techCategoryOf(item);
      counts.set(category, (counts.get(category) ?? 0) + 1);
    });

    return Array.from(counts.entries())
      .map(([subject, count]) => ({
        subject,
        value: Math.round((count / total) * 100),
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [project.techStack]);

  const primaryLanguage = project.primaryTech || stats?.language || "Primary";
  const languageData = [
    {
      name: primaryLanguage,
      value: 70,
      color: LANG_COLORS[primaryLanguage] || "var(--accent)",
    },
    { name: "Other", value: 30, color: "var(--border-default)" },
  ];

  const metricsUnavailable = !loading && (!stats || (stats.stars === 0 && stats.forks === 0 && stats.watchers === 0));
  const score = stats && !metricsUnavailable ? healthScore(stats) : null;
  const lastPushed =
    stats?.pushedAt && Number.isFinite(new Date(stats.pushedAt).getTime())
      ? new Date(stats.pushedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";

  return (
    <div className="space-y-8">
      <section>
        <SectionLabel label="Repository Metrics" />
        <div className="type-mono-sm mt-2 flex flex-wrap items-center gap-2 uppercase text-[var(--text-muted)]">
          <span>Last pushed: {lastPushed}</span>
          {loading ? <span className="text-[var(--accent)]">syncing...</span> : null}
        </div>
        {metricsUnavailable ? (
          <div className="type-btn mt-3 rounded-sm border border-dashed border-[var(--border-default)] bg-[var(--bg-elevated)] p-3 text-[var(--text-muted)]">
            Repository metrics unavailable
          </div>
        ) : null}

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: "Stars",
              value: stats?.stars ?? null,
              color: "var(--warning)",
              suffix: "",
            },
            {
              label: "Forks",
              value: stats?.forks ?? null,
              color: "var(--accent)",
              suffix: "",
            },
            {
              label: "Watchers",
              value: stats?.watchers ?? null,
              color: "var(--info)",
              suffix: "",
            },
            {
              label: "Health",
              value: score,
              color: score !== null && score > 60 ? "var(--success)" : "var(--warning)",
              suffix: "%",
            },
          ].map((metric, index) => {
            const unavailable = metricsUnavailable || metric.value === null;

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4"
                style={{ borderLeftWidth: 3, borderLeftColor: metric.color }}
              >
                <div className="type-sys-micro text-[var(--text-muted)]">
                  {metric.label}
                </div>
                <div className="type-sub mt-2" style={{ color: metric.color }}>
                  {unavailable ? "—" : <CounterText target={metric.value ?? 0} suffix={metric.suffix} />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <SectionLabel label="Stack Proficiency" />
          <div className="mt-4 h-64 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-3">
            {proficiencyData.length >= 3 ? (
              <ResponsiveContainer>
                <RadarChart data={proficiencyData}>
                  <PolarGrid stroke="var(--border-default)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "var(--text-muted)", fontSize: 10 }}
                  />
                  <Radar
                    name="Proficiency"
                    dataKey="value"
                    stroke="var(--accent)"
                    fill="var(--accent)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="space-y-3 p-2">
                {proficiencyData.map((entry) => (
                  <div key={entry.subject} className="space-y-1.5">
                    <div className="type-sys-micro flex items-center justify-between text-[var(--text-muted)]">
                      <span>{entry.subject}</span>
                      <span className="type-mono-sm">{entry.value}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-[var(--bg-muted)]">
                      <div
                        className="h-full rounded-full bg-[var(--accent)]"
                        style={{ width: `${entry.value}%` }}
                      />
                    </div>
                  </div>
                ))}
                {proficiencyData.length === 0 ? (
                  <div className="type-btn text-[var(--text-muted)]">
                    No stack data available.
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div>
          <SectionLabel label="Language Breakdown" />
          <div className="mt-4 flex h-64 items-center justify-center rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-3">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={languageData} cx="50%" cy="50%" outerRadius={90} dataKey="value" strokeWidth={0}>
                  {languageData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-default)",
                    borderRadius: 4,
                    color: "var(--text-primary)",
                    fontSize: 11,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex justify-center gap-4">
            {languageData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: entry.color }} />
                <span className="type-caption text-[var(--text-muted)]">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionLabel label="Project Health Score" />
        <div className="relative mt-4 h-6 overflow-hidden rounded-full bg-[var(--bg-muted)]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score ?? 0}%` }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background:
                score === null
                  ? "var(--border-default)"
                  : score > 60
                    ? "var(--success)"
                    : score > 30
                      ? "var(--warning)"
                      : "var(--error)",
            }}
          />
          <div className="absolute inset-0 flex items-center px-3">
            <span className="type-caption text-[var(--text-primary)]">
              {score === null
                ? "Unavailable"
                : `${score}/100 — ${score > 60 ? "Active" : score > 30 ? "Moderate" : "Dormant"}`}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
