"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaArrowUpRightFromSquare, FaLock } from "react-icons/fa6";
import Image from "next/image";
import type { ProjectDetail, ProjectShape, TechGroup, TechGroupItem } from "./ProjectData";
import { languageOf } from "./ProjectData";
import { FlowDiagram, SectionLabel, SidebarKeyValue, TechBadge } from "./ProjectUI";
import { PillTag } from "@/components/ui/Button";

function LivePreview({ url, projectName }: { url: string; projectName: string }) {
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);
  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  if (errored) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)]"
      >
        <div className="flex items-center justify-center px-4 py-12 sm:py-16">
          <div className="space-y-2 text-center">
            <div className="type-sys-micro text-[var(--text-disabled)]">
              Preview Unavailable
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="type-btn inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
            >
              Open {displayUrl} in new tab
              <FaArrowUpRightFromSquare size={10} />
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full overflow-hidden border border-[var(--border-default)] bg-[var(--bg-muted)] shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center gap-2 border-b border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1.5">
        <div className="mr-1 flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--error)]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--warning)]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--success)]" />
        </div>
        <div className="type-mono-sm flex flex-1 items-center gap-1.5 truncate border border-[var(--border-default)] bg-[var(--bg-muted)] px-2.5 py-1 tracking-wide text-[var(--text-muted)]">
          <FaLock size={10} className="shrink-0 opacity-50" />
          <span className="truncate font-semibold">{displayUrl}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 p-1 text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
          title="Open in new tab"
        >
          <FaArrowUpRightFromSquare size={12} />
        </a>
      </div>

      <div className="relative aspect-[16/10] w-full min-h-[220px] sm:min-h-[320px] lg:min-h-[400px] xl:min-h-[480px]">
        {loading ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--bg-muted)]">
            <div className="flex flex-col items-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
              <span className="type-sys-micro text-[var(--text-disabled)]">
                Synchronizing {projectName}
              </span>
            </div>
          </div>
        ) : null}
        <iframe
          src={url}
          title={`Live preview of ${projectName}`}
          className="h-full w-full border-0"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={() => setErrored(true)}
        />
      </div>
    </motion.div>
  );
}

function GalleryImage({
  src,
  alt,
  index,
  total,
}: {
  src: string;
  alt: string;
  index: number;
  total: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const resolvedSrc = useMemo(() => {
    if (/^https?:\/\//i.test(src)) {
      return `/api/proxy-image?url=${encodeURIComponent(src)}`;
    }
    return src;
  }, [src]);

  if (errored) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08 }}
      className="group/img relative overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] p-2 transition-all duration-300 hover:border-[var(--accent-muted)] h-[300px] sm:h-[420px] lg:h-[600px]"
    >
      {!loaded ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2.5">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
            <span className="type-sys-micro text-[var(--text-disabled)]">
              Loading
            </span>
          </div>
        </div>
      ) : null}

      <div className="relative h-full w-full">
        <Image
          src={resolvedSrc}
          alt={alt}
          fill
          sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`rounded-[2px] object-contain transition-all duration-700 group-hover/img:scale-[1.02] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {loaded && total > 1 ? (
        <div className="type-caption absolute right-2.5 top-2.5 rounded-sm border border-[var(--border-default)]/50 bg-[var(--bg-base)]/80 px-2 py-0.5 uppercase text-[var(--text-muted)] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/img:opacity-100">
          {index + 1} / {total}
        </div>
      ) : null}
    </motion.div>
  );
}

const statusTickerItems = [
  "SYSTEM ONLINE",
  "PROJECT LOADED",
  "ARCHITECTURE MAPPED",
  "STACK RESOLVED",
  "RUNTIME ACTIVE",
] as const;

export function ProjectOverview({
  project,
  detail,
  allProjects = [],
}: {
  project: ProjectShape;
  detail: ProjectDetail;
  allProjects?: ProjectShape[];
}) {
  const images = detail.previewImages ?? [];
  const liveUrl = detail.liveUrl ?? null;
  const shouldReduceMotion = useReducedMotion();
  const [scanning, setScanning] = useState(!shouldReduceMotion);
  const [problemExpanded, setProblemExpanded] = useState(false);
  const [showAllTech, setShowAllTech] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const relatedProjects = useMemo(() => {
    if (!allProjects.length) return [];
    return allProjects
      .filter((p) => p.id !== project.id)
      .map((p) => {
        const matchingCount =
          p.techStack?.filter((t) => project.techStack?.includes(t)).length || 0;
        return { project: p, matchingCount };
      })
      .filter((entry) => entry.matchingCount >= 2)
      .sort((a, b) => b.matchingCount - a.matchingCount)
      .slice(0, 2);
  }, [allProjects, project]);

  useEffect(() => {
    setProblemExpanded(false);
    setShowAllTech(false);
  }, [project.id]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsMobile(window.innerWidth < 600);
    const handler = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      setScanning(false);
      return;
    }

    setScanning(true);
    const timeoutId = window.setTimeout(() => setScanning(false), 360);
    return () => window.clearTimeout(timeoutId);
  }, [project.id, shouldReduceMotion]);

  const showProblemToggle = detail.problem.length > 280;

  return (
    <>
      <AnimatePresence>
        {scanning ? (
          <motion.div
            key="scan"
            className="pointer-events-none fixed inset-x-0 top-0 z-50 h-2"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: "100vh", opacity: [0, 0.35, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--accent-muted) 35%, transparent) 50%, transparent 100%)",
            }}
          />
        ) : null}
      </AnimatePresence>

      <div className="bg-[var(--bg-base)] flex flex-col gap-6 sm:gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10">
          <div className="space-y-6 sm:space-y-8 min-w-0">
            <section className="min-w-0">
              <SectionLabel label="The Problem" />
              <p
                className={`type-body text-[var(--text-secondary)] ${
                  problemExpanded ? "" : "line-clamp-4"
                }`}
              >
                {detail.problem}
              </p>
              {showProblemToggle ? (
                <button
                  type="button"
                  onClick={() => setProblemExpanded((value) => !value)}
                  className="type-mono-sm mt-2 uppercase text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
                >
                  {problemExpanded ? "Show less" : "Read more"}
                </button>
              ) : null}

              <div className="type-body mt-4 border-l-2 border-[var(--accent)] pl-4 italic text-[var(--text-secondary)]">
                {detail.why}
              </div>
            </section>

            <section className="design-surface p-4 min-w-0 overflow-hidden">
              <SectionLabel label="Core Features" />
              <div className="mb-4 overflow-hidden border-y border-[var(--border-default)] py-1.5">
                <motion.div
                  animate={shouldReduceMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  style={{ width: "max-content" }}
                  className="flex gap-8 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] opacity-65"
                >
                  {Array.from({ length: 4 }, (_, groupIndex) =>
                    statusTickerItems.map((status, index) => (
                      <span
                        key={`${groupIndex}-${status}-${index}`}
                        className="flex items-center gap-3"
                      >
                        <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                        {status}
                      </span>
                    )),
                  ).flat()}
                </motion.div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detail.features.slice(0, 6).map((feature: string, index: number) => (
                  <motion.article
                    key={`${project.id}-feature-${index}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.25 }}
                    className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2.5"
                  >
                    <span className="type-body text-[var(--text-secondary)]">{feature}</span>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="design-surface p-4 min-w-0 overflow-hidden">
              <SectionLabel label="Stack" />
              <div className="space-y-4">
                {detail.techGroups.map((group: TechGroup, groupIndex: number) => (
                  <motion.div
                    key={`${project.id}-group-${group.label}-${groupIndex}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: groupIndex * 0.04 }}
                    className="min-w-0"
                  >
                    <div className="type-sys-micro mb-2 text-[var(--text-muted)]">
                      {group.label}
                    </div>
                    <div className={`flex flex-wrap gap-2 w-full min-w-0 ${isMobile && !showAllTech ? "max-h-[88px] overflow-hidden" : ""}`}>
                      {(isMobile && !showAllTech ? group.items.slice(0, 6) : group.items).map((item: TechGroupItem, index: number) => (
                        <TechBadge
                          key={`${project.id}-tech-${group.label}-${index}`}
                          name={item.n}
                          size="sm"
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
                {isMobile && detail.techGroups.some((group) => group.items.length > 6) ? (
                  <button
                    type="button"
                    onClick={() => setShowAllTech((value) => !value)}
                    className="type-mono-sm touch-target uppercase text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
                  >
                    {showAllTech ? "Show less" : "Show more"}
                  </button>
                ) : null}
              </div>
            </section>

            <section className="design-surface p-4 min-w-0 overflow-hidden">
              <SectionLabel label="System Flow" />
              <FlowDiagram project={project} />
              <p className="type-mono-sm mt-2 text-[var(--text-muted)]">
                {detail.highLevel}
              </p>
            </section>

            <section className="min-w-0 overflow-hidden">
              <SectionLabel label={liveUrl ? "Live Preview" : images.length > 0 ? "Gallery" : "Preview"} />
              {!isMobile && liveUrl ? (
                <LivePreview url={liveUrl} projectName={project.name} />
              ) : images.length > 0 ? (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden">
                  {images.slice(0, 3).map((url, index) => (
                    <GalleryImage
                      key={`${project.id}-gallery-${index}`}
                      src={url}
                      alt={`${project.name} snapshot ${index + 1}`}
                      index={index}
                      total={Math.min(images.length, 3)}
                    />
                  ))}
                </div>
              ) : (
                <div className="type-btn rounded-sm border border-dashed border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 text-[var(--text-muted)]">
                  No preview available.
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]"
                  >
                    View repository
                  </a>
                </div>
              )}
            </section>
          </div>

          <div className="space-y-6">
            <aside className="design-surface-ambient p-4">
              <SectionLabel label="Specifications" />
              {isMobile ? (
                <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
                  {[
                    ["Category", detail.category],
                    ["Engine", detail.language],
                    ["Release", detail.year],
                    ["Backend", detail.backend.split(".")[0]],
                  ].map(([label, value]) => (
                    <span
                      key={`${label}-${value}`}
                      className="type-caption touch-target inline-flex shrink-0 items-center rounded-full border border-[var(--border-default)] bg-[var(--bg-muted)] px-2.5 py-1 text-[var(--text-muted)]"
                    >
                      {label}: {value}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="mt-3 space-y-3">
                  {[
                    ["Category", detail.category],
                    ["Engine", detail.language],
                    ["Release", detail.year],
                    ["Backend", detail.backend.split(".")[0]],
                  ].map(([label, value], index) => (
                    <SidebarKeyValue
                      key={`${label}-${value}`}
                      label={label}
                      value={value}
                      delay={index * 80}
                    />
                  ))}
                </div>
              )}
            </aside>

            <aside className="design-surface p-4">
              <SectionLabel label="Topic Tags" />
              <div className="mt-3 flex flex-wrap gap-2">
                {detail.topics.slice(0, 12).map((topic: string, index: number) => (
                  <motion.div
                    key={`${project.id}-topic-${index}`}
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                  >
                    <PillTag>#{topic}</PillTag>
                  </motion.div>
                ))}
              </div>
            </aside>

            {relatedProjects.length > 0 ? (
              <aside className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4">
                <SectionLabel label="Related Projects" />
                <div className="mt-3 space-y-2">
                  {relatedProjects.map(({ project: related, matchingCount }) => (
                    <div
                      key={related.id}
                      className="flex items-center justify-between rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] px-3 py-2"
                    >
                      <div className="min-w-0">
                        <div className="type-btn truncate text-[var(--text-primary)]">
                          {related.name}
                        </div>
                        <span className="type-mono-sm uppercase text-[var(--text-muted)]">
                          {matchingCount} shared tech
                        </span>
                      </div>
                      <span className="type-caption touch-target rounded-full border border-[var(--border-default)] px-2 py-0.5 uppercase text-[var(--text-secondary)]">
                        {languageOf(related)}
                      </span>
                    </div>
                  ))}
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
