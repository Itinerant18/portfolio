"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { languageOf, techColor, techGroupsOf, type ProjectShape } from "./ProjectData";
import { SectionLabel, TechBadge, TechIcon } from "./ProjectUI";

interface RepoTechMetadata {
  language: string;
  size: number;
  topics: string[];
}

function TechGroupSection({
  expanded,
  items,
  label,
  onExpand,
  delay = 0,
}: {
  expanded: boolean;
  items: Array<{ n: string; v: string; c: string }>;
  label: string;
  onExpand: () => void;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const visibleItems = expanded ? items : items.slice(0, 12);
  const hiddenCount = Math.max(items.length - visibleItems.length, 0);

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay }}
      className="space-y-3"
    >
      <div className="type-sys-micro text-[var(--text-muted)]">{label}</div>
      <div className="flex flex-wrap gap-3">
        {visibleItems.map((item) => (
          <TechBadge key={`${label}-${item.n}`} name={item.n} size="md" />
        ))}
        {hiddenCount > 0 ? (
          <button
            type="button"
            onClick={onExpand}
            className="type-sys-micro flex h-11 items-center rounded-sm border border-dashed border-[var(--border-default)] bg-[var(--bg-muted)] px-4 text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            +{hiddenCount} more
          </button>
        ) : null}
      </div>
    </motion.div>
  );
}

function TopicPill({ name }: { name: string }) {
  return (
    <span
      className="type-sys-micro inline-flex items-center gap-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-muted)] px-2.5 py-1 text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-muted)]"
      style={{ whiteSpace: "nowrap" }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] opacity-50" />
      {name}
    </span>
  );
}

export function ProjectTech({ project }: { project: ProjectShape }) {
  const [repoMeta, setRepoMeta] = useState<RepoTechMetadata | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const shouldReduceMotion = useReducedMotion();

  const techGroups = useMemo(() => techGroupsOf(project), [project]);
  const primaryLanguage = repoMeta?.language || languageOf(project);
  const topics = repoMeta?.topics?.length ? repoMeta.topics : project.topics ?? [];

  useEffect(() => {
    let cancelled = false;

    async function hydrateRepoMeta() {
      try {
        const response = await fetch(`https://api.github.com/repos/Itinerant18/${project.id}`);
        if (!response.ok) throw new Error("Failed to load repository metadata.");
        const data = (await response.json()) as {
          language?: string | null;
          size?: number;
          topics?: string[];
        };

        if (!cancelled) {
          setRepoMeta({
            language: data.language || languageOf(project),
            size: data.size ?? project.size ?? 0,
            topics: Array.isArray(data.topics) ? data.topics : project.topics ?? [],
          });
        }
      } catch {
        if (!cancelled) {
          setRepoMeta({
            language: languageOf(project),
            size: project.size ?? 0,
            topics: project.topics ?? [],
          });
        }
      }
    }

    void hydrateRepoMeta();
    setExpandedGroups({});

    return () => {
      cancelled = true;
    };
  }, [project]);

  const repoSizeMB = ((repoMeta?.size ?? 0) / 1024).toFixed(1);

  return (
    <div className="flex flex-col gap-8">
      {/* Tech Stack with devicon badges */}
      <section className="space-y-4">
        <SectionLabel label="Tech Stack" />
        {techGroups.length > 0 ? (
          <div className="space-y-6">
            {techGroups.map((group, i) => (
              <TechGroupSection
                key={group.label}
                expanded={Boolean(expandedGroups[group.label])}
                items={group.items}
                label={group.label}
                onExpand={() =>
                  setExpandedGroups((current) => ({ ...current, [group.label]: true }))
                }
                delay={i * 0.06}
              />
            ))}
          </div>
        ) : (
          <p className="type-body text-[var(--text-muted)]">No stack data available for this repository.</p>
        )}
      </section>

      {/* Primary Language + Repo Size */}
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] px-5 py-4 transition-colors hover:border-[var(--border-hover)]"
        >
          <div className="type-sys-micro mb-3 text-[var(--text-muted)]">Primary Language</div>
          <div className="flex items-center gap-3">
            <TechIcon name={primaryLanguage} size={28} />
            <div>
              <div className="text-[14px] font-bold text-[var(--text-primary)]">{primaryLanguage}</div>
              <div className="type-sys-micro text-[var(--text-muted)]">Main language</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}
          className="rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] px-5 py-4 transition-colors hover:border-[var(--border-hover)]"
        >
          <div className="type-sys-micro mb-3 text-[var(--text-muted)]">Repository Size</div>
          <div className="flex items-baseline gap-1">
            <span className="type-title-sm text-[var(--text-primary)]">{repoSizeMB}</span>
            <span className="type-sys-micro text-[var(--text-muted)]">MB</span>
          </div>
          {/* Size bar visualization */}
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-muted)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(Number(repoSizeMB) * 2, 100)}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full rounded-full bg-[var(--accent)]"
            />
          </div>
        </motion.div>
      </section>

      {/* Topics */}
      <section className="space-y-4">
        <SectionLabel label="Topics" />
        {topics.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <TopicPill key={topic} name={typeof topic === "string" ? topic : String(topic)} />
            ))}
          </div>
        ) : (
          <p className="type-body text-[var(--text-muted)]">No topics published for this repository.</p>
        )}
      </section>
    </div>
  );
}
