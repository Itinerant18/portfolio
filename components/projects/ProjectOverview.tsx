"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaArrowUpRightFromSquare,
  FaStar,
  FaCodeFork,
  FaCode,
  FaClock,
  FaBolt,
  FaShieldHalved,
  FaChartLine,
  FaGear,
  FaLayerGroup,
  FaCubes,
  FaMicrochip,
  FaEye,
  FaWifi,
  FaUser,
  FaTerminal,
  FaDatabase,
  FaServer,
} from "react-icons/fa6";
import { VscChevronDown } from "react-icons/vsc";
import type { ProjectDetail, ProjectShape, TechGroup } from "./ProjectData";
import { TechBadge } from "./ProjectUI";

/* ─── Types ──────────────────────────────────────────────────── */

interface RepoOverviewStats {
  forks: number;
  language: string;
  pushedAt: string;
  stars: number;
}

/* ─── Helpers ────────────────────────────────────────────────── */

function formatDate(value: string | undefined) {
  if (!value) return "Unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

const FEATURE_ICON_MAP: [RegExp, React.ComponentType<{ size?: number }>][] = [
  [/scan|camera|vision|detect/i, FaEye],
  [/ai|ml|model|gpt|intelligence/i, FaMicrochip],
  [/api|server|backend|endpoint/i, FaServer],
  [/database|storage|persist|sql|redis/i, FaDatabase],
  [/auth|security|encrypt|protect/i, FaShieldHalved],
  [/real.?time|live|stream|socket|websocket/i, FaWifi],
  [/terminal|command|cli|console/i, FaTerminal],
  [/user|profile|account/i, FaUser],
  [/state|zustand|redux|store/i, FaLayerGroup],
  [/chart|analytics|metric|dashboard/i, FaChartLine],
  [/component|module|plugin/i, FaCubes],
  [/config|setting/i, FaGear],
];

function featureIcon(text: string): React.ComponentType<{ size?: number }> {
  for (const [re, Icon] of FEATURE_ICON_MAP) {
    if (re.test(text)) return Icon;
  }
  return FaBolt;
}

/* ─── Bento Card Wrapper ─────────────────────────────────────── */

function BentoCard({
  children,
  className = "",
  colSpan = 1,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const spanClass =
    colSpan === 4
      ? "col-span-full"
      : colSpan === 3
        ? "col-span-full lg:col-span-3"
        : colSpan === 2
          ? "col-span-full sm:col-span-2"
          : "";

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, delay }}
      className={`rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 transition-all hover:border-[var(--border-hover)] hover:bg-[var(--bg-overlay)] hover:shadow-[var(--shadow-ambient)] sm:p-5 ${spanClass} ${className}`}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  title,
  icon,
  collapsed,
  onToggle,
}: {
  title: string;
  icon: React.ReactNode;
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full mb-3 group"
      type="button"
    >
      <div className="flex items-center gap-2">
        <span className="text-[var(--accent)] opacity-70 group-hover:opacity-100 transition-opacity">
          {icon}
        </span>
        <span className="text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
          {title}
        </span>
      </div>
      <VscChevronDown
        className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${
          collapsed ? "-rotate-90" : ""
        }`}
      />
    </button>
  );
}

/* ─── Quick Stat Cell ────────────────────────────────────────── */

function QuickStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)] px-3.5 py-3 transition-colors hover:border-[var(--border-active)]">
      <div className="mt-0.5 text-[var(--accent)] opacity-70">{icon}</div>
      <div className="min-w-0">
        <div className="type-title-sm font-semibold text-[var(--text-primary)] tracking-tight">{value}</div>
        <div className="type-sys-micro mt-0.5 text-[var(--text-muted)]">{label}</div>
      </div>
    </div>
  );
}

/* ─── Feature Card ───────────────────────────────────────────── */

function FeatureCard({ text, index }: { text: string; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = featureIcon(text);

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, delay: index * 0.04 }}
      className="group flex items-start gap-2.5 rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)] px-3 py-2.5 transition-all hover:border-[var(--accent)]/[0.2] hover:bg-[var(--bg-elevated)]"
    >
      <div className="mt-0.5 shrink-0 text-[var(--accent)] opacity-60 transition-opacity group-hover:opacity-100">
        <Icon size={13} />
      </div>
      <span className="type-mono-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
        {text}
      </span>
    </motion.div>
  );
}

/* ─── Topic Pill ─────────────────────────────────────────────── */

function TopicPill({ name }: { name: string }) {
  return (
    <span
      className="type-sys-micro inline-flex items-center gap-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-muted)] px-2.5 py-1 text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
      style={{ whiteSpace: "nowrap" }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] opacity-50" />
      {name}
    </span>
  );
}

/* ─── Tech Stack Highlight Row ───────────────────────────────── */

function TechHighlight({ techGroups }: { techGroups: TechGroup[] }) {
  const allItems = techGroups.flatMap((g) => g.items);
  const top = allItems.slice(0, 8);

  if (top.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {top.map((item) => (
        <TechBadge key={item.n} name={item.n} size="sm" />
      ))}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */

export function ProjectOverview({
  detail,
  project,
}: {
  detail: ProjectDetail;
  project: ProjectShape;
}) {
  const [stats, setStats] = useState<RepoOverviewStats | null>(null);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const description = project.shortDescription?.trim();
  const problem = (project as ProjectShape & { problem?: string }).problem?.trim();
  const features = (project as ProjectShape & { features?: string[] }).features ?? [];

  function toggleSection(section: string) {
    setCollapsed((current) => ({ ...current, [section]: !current[section] }));
  }

  useEffect(() => {
    let cancelled = false;

    async function hydrateStats() {
      try {
        const response = await fetch(`https://api.github.com/repos/Itinerant18/${project.id}`);
        if (!response.ok) throw new Error("Failed to load repository stats.");
        const data = (await response.json()) as {
          forks_count?: number;
          language?: string | null;
          pushed_at?: string;
          stargazers_count?: number;
        };

        if (!cancelled) {
          setStats({
            forks: data.forks_count ?? 0,
            language: data.language || detail.language,
            pushedAt: data.pushed_at ?? project.updatedAt ?? "",
            stars: data.stargazers_count ?? 0,
          });
        }
      } catch {
        if (!cancelled) {
          setStats({
            forks: 0,
            language: detail.language,
            pushedAt: project.updatedAt ?? "",
            stars: 0,
          });
        }
      }
    }

    void hydrateStats();

    return () => {
      cancelled = true;
    };
  }, [detail.language, project.id, project.updatedAt]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* ── Row 1: Problem + Quick Stats ─────────────────────── */}

      {/* The Problem / Description — spans 2 cols */}
      <BentoCard colSpan={2} delay={0}>
        <SectionHeader
          title={problem ? "The Problem" : "Description"}
          icon={<FaBolt size={12} />}
          collapsed={Boolean(collapsed.description)}
          onToggle={() => toggleSection("description")}
        />
        {!collapsed.description ? (
          <>
            {problem ? (
              <p className="type-body max-w-[72ch] leading-relaxed text-[var(--text-secondary)]">
                {problem}
              </p>
            ) : description ? (
              <p className="type-body max-w-[72ch] leading-relaxed text-[var(--text-secondary)]">
                {description}
              </p>
            ) : (
              <p className="type-body italic text-[var(--text-muted)]">No description provided.</p>
            )}
            <a
              href={`${project.links.github}#readme`}
              target="_blank"
              rel="noopener noreferrer"
              className="type-btn mt-4 inline-flex items-center gap-2 text-[var(--accent)] transition-colors hover:underline"
            >
              View README
              <FaArrowUpRightFromSquare size={10} />
            </a>
          </>
        ) : null}
      </BentoCard>

      {/* Quick Stats — spans 2 cols */}
      <BentoCard colSpan={2} delay={0.05}>
        <SectionHeader
          title="Quick Stats"
          icon={<FaChartLine size={12} />}
          collapsed={Boolean(collapsed.stats)}
          onToggle={() => toggleSection("stats")}
        />
        {!collapsed.stats ? (
          <div className="grid grid-cols-2 gap-3">
            <QuickStat
              icon={<FaStar size={14} />}
              label="Stars"
              value={String(stats?.stars ?? 0)}
            />
            <QuickStat
              icon={<FaCodeFork size={14} />}
              label="Forks"
              value={String(stats?.forks ?? 0)}
            />
            <QuickStat
              icon={<FaCode size={14} />}
              label="Language"
              value={stats?.language || detail.language}
            />
            <QuickStat
              icon={<FaClock size={14} />}
              label="Last Push"
              value={formatDate(stats?.pushedAt || project.updatedAt)}
            />
          </div>
        ) : null}
      </BentoCard>

      {/* ── Row 2: Core Features — full width ────────────────── */}
      {features.length > 0 ? (
        <BentoCard colSpan={4} delay={0.1}>
          <SectionHeader
            title="Core Features"
            icon={<FaLayerGroup size={12} />}
            collapsed={Boolean(collapsed.features)}
            onToggle={() => toggleSection("features")}
          />
          {!collapsed.features ? (
            <>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                {features.slice(0, 8).map((feat, i) => (
                  <FeatureCard key={`feat-${i}`} text={feat} index={i} />
                ))}
              </div>
              {features.length > 8 ? (
                <div className="type-sys-micro mt-4 text-[var(--text-muted)]">
                  +{features.length - 8} more features
                </div>
              ) : null}
            </>
          ) : null}
        </BentoCard>
      ) : null}

      {/* ── Row 3: Tech Stack Highlight — full width ─────────── */}
      {detail.techGroups.length > 0 ? (
        <BentoCard colSpan={4} delay={0.15}>
          <SectionHeader
            title="Tech Stack"
            icon={<FaCode size={12} />}
            collapsed={Boolean(collapsed.tech)}
            onToggle={() => toggleSection("tech")}
          />
          {!collapsed.tech ? <TechHighlight techGroups={detail.techGroups} /> : null}
        </BentoCard>
      ) : null}

      {/* ── Row 4: Topics + Description ──────────────────────── */}
      {detail.topics.length > 0 ? (
        <BentoCard colSpan={problem ? 2 : 4} delay={0.2}>
          <SectionHeader
            title="Topics"
            icon={<FaCubes size={12} />}
            collapsed={Boolean(collapsed.topics)}
            onToggle={() => toggleSection("topics")}
          />
          {!collapsed.topics ? (
            <div className="flex flex-wrap gap-2">
              {detail.topics.map((topic) => (
                <TopicPill key={topic} name={topic} />
              ))}
            </div>
          ) : null}
        </BentoCard>
      ) : null}

      {/* If we showed "The Problem" above, also show the short description here */}
      {problem && description ? (
        <BentoCard colSpan={detail.topics.length > 0 ? 2 : 4} delay={0.22}>
          <SectionHeader
            title="Repository Summary"
            icon={<FaArrowUpRightFromSquare size={12} />}
            collapsed={Boolean(collapsed.summary)}
            onToggle={() => toggleSection("summary")}
          />
          {!collapsed.summary ? (
            <p className="type-body text-[var(--text-secondary)] leading-relaxed">{description}</p>
          ) : null}
        </BentoCard>
      ) : null}
    </div>
  );
}
