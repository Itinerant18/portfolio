"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion, Variants } from "framer-motion";
import { FaArrowUpRightFromSquare, FaCheck, FaLock } from "react-icons/fa6";
import type { ProjectDetail, ProjectShape, TechGroup, TechGroupItem } from "./ProjectData";
import { SectionLabel, VisualBadge, FlowDiagram, TechBadge, SidebarKeyValue } from "./ProjectUI";

/* ─── Live Preview iframe component ─── */
function LivePreview({ url, projectName }: { url: string; projectName: string }) {
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  // Clean display URL (strip protocol)
  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  if (errored) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)]"
      >
        <div className="flex items-center justify-center px-4 py-12 sm:py-16">
          <div className="text-center space-y-2">
            <div className="text-[var(--text-disabled)] text-xs font-bold uppercase tracking-wider">
              Preview Unavailable
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[var(--accent)] hover:underline"
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
      className="w-full border border-[var(--border-default)] bg-[var(--bg-muted)] overflow-hidden shadow-2xl"
    >
      {/* Browser-like URL bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
        {/* Traffic light dots */}
        <div className="flex items-center gap-1.5 mr-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        {/* URL display */}
        <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1 bg-[var(--bg-muted)] border border-[var(--border-default)] text-[10px] text-[var(--text-muted)] font-mono tracking-wide truncate">
          <FaLock size={10} className="shrink-0 opacity-50" />
          <span className="truncate font-semibold">{displayUrl}</span>
        </div>
        {/* Open in new tab */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 p-1 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          title="Open in new tab"
        >
          <FaArrowUpRightFromSquare size={12} />
        </a>
      </div>

      {/* iframe container */}
      <div className="relative aspect-[16/10] w-full min-h-[220px] sm:min-h-[320px] lg:min-h-[400px] xl:min-h-[480px]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-muted)] z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="h-6 w-6 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
              <span className="text-[10px] font-bold text-[var(--text-disabled)] tracking-widest uppercase">
                Synchronizing {projectName}
              </span>
            </div>
          </div>
        )}
        <iframe
          src={url}
          title={`Live preview of ${projectName}`}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={() => setErrored(true)}
        />
      </div>
    </motion.div>
  );
}

/* ─── Single gallery image with loading/error state ─── */
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

  // Proxy GitHub-hosted images to bypass CORS
  const resolvedSrc = useMemo(() => {
    try {
      const parsed = new URL(src);
      const needsProxy =
        parsed.hostname === "github.com" ||
        parsed.hostname.endsWith(".githubusercontent.com");
      if (needsProxy) {
        return `/api/proxy-image?url=${encodeURIComponent(src)}`;
      }
    } catch {
      // not a valid URL
    }
    return src;
  }, [src]);

  if (errored) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="group/img relative flex items-center justify-center overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] p-2 transition-all duration-300 hover:border-[var(--accent-muted)] hover:shadow-xl"
    >
      {/* Loading skeleton */}
      {!loaded && (
        <div
          className="flex min-w-full items-center justify-center"
          style={{ minHeight: total === 1 ? 220 : 180 }}
        >
          <div className="flex flex-col items-center gap-2.5">
            <div className="h-6 w-6 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
            <span className="text-[10px] font-bold text-[var(--text-disabled)] tracking-widest uppercase">
              Loading
            </span>
          </div>
        </div>
      )}

      {/* Image */}
      <img
        src={resolvedSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        style={!loaded ? { position: "absolute", opacity: 0 } : undefined}
        className={`h-auto max-h-[520px] w-full rounded-[2px] object-contain transition-all duration-700 group-hover/img:scale-[1.02] sm:max-h-[600px] ${loaded ? "opacity-100" : "opacity-0"}`}
      />

      {/* Gradient overlay */}
      {loaded && (
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/40 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}

      {/* Image index badge */}
      {loaded && total > 1 && (
        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-sm bg-[var(--bg-base)]/80 backdrop-blur-sm border border-[var(--border-default)]/50 text-[9px] font-bold text-[var(--text-muted)] tracking-wider uppercase opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
          {index + 1} / {total}
        </div>
      )}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const statusTickerItems = [
  "SYSTEM ONLINE",
  "PROJECT LOADED",
  "ARCHITECTURE MAPPED",
  "STACK RESOLVED",
  "RUNTIME ACTIVE",
] as const;

function topicOffset(index: number) {
  return {
    x: ((index % 4) - 1.5) * 18,
    y: (((index * 7) % 5) - 2) * 10,
  };
}

/* ─── Main overview component ─── */
export function ProjectOverview({ project, detail }: { project: ProjectShape; detail: ProjectDetail }) {
  const images: string[] = detail.previewImages ?? [];
  const liveUrl: string | null = detail.liveUrl ?? null;
  const shouldReduceMotion = useReducedMotion();
  const [scanning, setScanning] = useState(!shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion) {
      setScanning(false);
      return;
    }

    setScanning(true);
    const timeoutId = window.setTimeout(() => setScanning(false), 800);
    return () => window.clearTimeout(timeoutId);
  }, [project.id, shouldReduceMotion]);

  return (
    <>
      <AnimatePresence>
        {scanning ? (
          <motion.div
            key="scan"
            className="pointer-events-none fixed inset-0 z-50"
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0, originY: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background:
                "linear-gradient(180deg, transparent, var(--accent-muted), transparent)",
              height: "4px",
            }}
          />
        ) : null}
      </AnimatePresence>

      <div className="flex flex-col gap-8 sm:gap-10">
        {/* ──── Priority 1: Live Website Preview ──── */}
        {liveUrl && (
          <section>
            <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
              <SectionLabel label="Live Preview" />
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--success)] tracking-widest uppercase">
                <span className="led-dot h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                Operational
              </span>
            </div>
            <LivePreview url={liveUrl} projectName={project.name} />
          </section>
        )}

        {/* ──── Priority 2: Static Image Gallery (only when no live URL) ──── */}
        {!liveUrl && images.length > 0 && (
          <section>
            <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
              <SectionLabel label="Project Gallery" />
              <span className="text-[10px] font-bold text-[var(--text-disabled)] tracking-widest uppercase">
                {images.length} {images.length === 1 ? "snapshot" : "snapshots"}
              </span>
            </div>
            <div className="overflow-hidden rounded-sm">
              <div className="mx-auto grid w-full max-w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {images.map((url, index) => (
                  <GalleryImage
                    key={`${project.id}-gallery-${index}`}
                    src={url}
                    alt={`${project.name} snapshot ${index + 1}`}
                    index={index}
                    total={images.length}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ──── Main content grid ──── */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_280px] xl:gap-10">
          <div className="space-y-8 sm:space-y-10">
            <section>
              <SectionLabel label="Core Capabilities" />
              <div className="mb-6 overflow-hidden border-y border-[var(--border-default)] py-1.5">
                <motion.div
                  animate={shouldReduceMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="flex gap-8 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--accent)] opacity-60"
                >
                  {Array.from({ length: 4 }, (_, groupIndex) =>
                    statusTickerItems.map((status, index) => (
                      <span
                        key={`${groupIndex}-${status}-${index}`}
                        className="flex items-center gap-3"
                      >
                        <span className="led-dot h-1 w-1 rounded-full bg-[var(--accent)]" />
                        {status}
                      </span>
                    )),
                  ).flat()}
                </motion.div>
              </div>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3"
                style={{ perspective: "800px" }}
              >
                {detail.features.slice(0, 6).map((feature: string, index: number) => (
                  <motion.div
                    key={`${project.id}-feature-${index}`}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, y: 20, rotateX: -15 }
                    }
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 20,
                      delay: index * 0.06,
                    }}
                    whileHover={shouldReduceMotion ? undefined : { y: -4, rotateX: 4 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <VisualBadge
                      label={feature.split(".")[0]}
                      icon={<FaCheck size={12} />}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </section>

            <section>
              <SectionLabel label="System Flow" />
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <FlowDiagram project={project} />
              </motion.div>
            </section>

            <section>
              <SectionLabel label="Engine & Stack" />
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="mt-4 flex flex-wrap gap-3"
              >
                {detail.techGroups
                  .flatMap((group: TechGroup) => group.items)
                  .map((item: TechGroupItem, iIndex: number) => (
                    <motion.div key={`${project.id}-tech-${iIndex}`} variants={itemVariants}>
                      <TechBadge name={item.n} />
                    </motion.div>
                  ))}
              </motion.div>
            </section>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <motion.aside
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 shadow-sm sm:p-6"
            >
              <SectionLabel label="Specifications" />
              <div className="mt-5 space-y-4">
                {[
                  ["Category", detail.category],
                  ["Engine", detail.language],
                  ["Release", detail.year],
                  ["Backend", detail.backend.split(".")[0]],
                  ["Storage", detail.storage.split(".")[0]],
                ].map(([label, value], index) => (
                  <SidebarKeyValue
                    key={`${label}-${value}`}
                    label={label}
                    value={value}
                    delay={index * 120}
                  />
                ))}
              </div>
            </motion.aside>

            <aside className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 shadow-sm sm:p-6">
              <SectionLabel label="Topic Graph" />
              <div className="relative mt-4 flex flex-wrap gap-2.5 sm:gap-3">
                {detail.topics.slice(0, 12).map((topic: string, index: number) => {
                  const offset = topicOffset(index);

                  return (
                    <motion.div
                      key={`${project.id}-topic-${index}`}
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              x: offset.x,
                              y: offset.y,
                              scale: 0.3,
                            }
                      }
                      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 18,
                        delay: index * 0.04,
                      }}
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
                      className="group/topic relative"
                      style={
                        {
                          "--delay": `${index * 40}ms`,
                          transitionDelay: "var(--delay)",
                        } as CSSProperties
                      }
                    >
                      <span className="absolute right-full top-1/2 h-px w-4 -translate-y-1/2 bg-gradient-to-r from-transparent to-[var(--accent-muted)] opacity-0 transition-opacity duration-300 group-hover/topic:opacity-100" />
                      <span className="absolute left-full top-1/2 h-px w-4 -translate-y-1/2 bg-gradient-to-r from-[var(--accent-muted)] to-transparent opacity-0 transition-opacity duration-300 group-hover/topic:opacity-100" />
                      <span
                        className={`inline-flex cursor-default items-center rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] px-3 py-1.5 text-[10px] font-bold text-[var(--text-muted)] transition-all group-hover/topic:border-[var(--accent)] group-hover/topic:text-[var(--accent)] group-hover/topic:shadow-[var(--glow-accent)] ${
                          index % 3 === 0 ? "float-card" : ""
                        }`}
                      >
                        #{topic}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
