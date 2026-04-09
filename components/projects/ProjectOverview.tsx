"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
        className="w-full border border-[var(--border-default)] bg-[var(--bg-muted)]"
      >
        <div className="flex items-center justify-center py-16">
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
      <div className="relative w-full" style={{ height: "480px" }}>
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
      className={`group/img relative overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] transition-all duration-300 hover:border-[var(--accent-muted)] hover:shadow-xl cursor-pointer flex items-center justify-center`}
    >
      {/* Loading skeleton */}
      {!loaded && (
        <div className="flex items-center justify-center" style={{ minHeight: total === 1 ? 280 : 220, minWidth: "100%" }}>
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
        className={`w-auto h-auto object-contain max-h-[600px] max-w-full transition-all duration-700 group-hover/img:scale-[1.02] ${loaded ? "opacity-100" : "opacity-0"}`}
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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

/* ─── Main overview component ─── */
export function ProjectOverview({ project, detail }: { project: ProjectShape; detail: ProjectDetail }) {
  const images: string[] = detail.previewImages ?? [];
  const liveUrl: string | null = detail.liveUrl ?? null;

  return (
    <div className="flex flex-col gap-10">
      {/* ──── Priority 1: Live Website Preview ──── */}
      {liveUrl && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <SectionLabel label="Live Preview" />
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--success)] tracking-widest uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)] animate-pulse" />
              Operational
            </span>
          </div>
          <LivePreview url={liveUrl} projectName={project.name} />
        </section>
      )}

      {/* ──── Priority 2: Static Image Gallery (only when no live URL) ──── */}
      {!liveUrl && images.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <SectionLabel label="Project Gallery" />
            <span className="text-[10px] font-bold text-[var(--text-disabled)] tracking-widest uppercase">
              {images.length} {images.length === 1 ? "snapshot" : "snapshots"}
            </span>
          </div>
          <div className={`grid gap-4 ${
            images.length === 1
              ? "grid-cols-1"
              : images.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}>
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
        </section>
      )}

      {/* ──── Main content grid ──── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
        <div className="space-y-10">
          <section>
            <SectionLabel label="Core Capabilities" />
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {detail.features.slice(0, 6).map((feature: string, index: number) => (
                <motion.div key={`${project.id}-feature-${index}`} variants={itemVariants}>
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
              initial={{ opacity: 0 }}
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
              {detail.techGroups.flatMap((g: TechGroup) => g.items).map((item: TechGroupItem, iIndex: number) => (
                <motion.div key={`${project.id}-tech-${iIndex}`} variants={itemVariants}>
                  <TechBadge name={item.n} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>

        <div className="space-y-8">
          <aside className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 shadow-sm">
            <SectionLabel label="Specifications" />
            <div className="mt-5 space-y-4">
              <SidebarKeyValue label="Category" value={detail.category} />
              <SidebarKeyValue label="Engine" value={detail.language} />
              <SidebarKeyValue label="Release" value={detail.year} />
              <SidebarKeyValue label="Backend" value={detail.backend.split(".")[0]} />
              <SidebarKeyValue label="Storage" value={detail.storage.split(".")[0]} />
            </div>
          </aside>

          <aside className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 shadow-sm">
            <SectionLabel label="Topic Graph" />
            <div className="mt-4 flex flex-wrap gap-2">
              {detail.topics.slice(0, 12).map((topic: string, index: number) => (
                <motion.span
                  key={`${project.id}-topic-${index}`}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="px-2.5 py-1 rounded-sm bg-[var(--bg-muted)] text-[10px] font-bold text-[var(--text-muted)] border border-[var(--border-default)] hover:text-[var(--accent)] hover:border-[var(--accent-muted)] transition-all cursor-default"
                >
                  #{topic}
                </motion.span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
