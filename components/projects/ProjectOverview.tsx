"use client";

import React, { useState, useCallback } from "react";
import { ProjectShape } from "./ProjectData";
import { SectionLabel, VisualBadge, FlowDiagram, TechBadge, SidebarKeyValue } from "./ProjectUI";

/* ─── Live Preview iframe component ─── */
function LivePreview({ url, projectName }: { url: string; projectName: string }) {
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  // Clean display URL (strip protocol)
  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  if (errored) {
    return (
      <div className="w-full border border-[var(--border-default)] bg-[var(--bg-muted)]">
        <div className="flex items-center justify-center py-16">
          <div className="text-center space-y-2">
            <div className="text-[var(--text-disabled)] text-xs font-medium uppercase tracking-wider">
              Preview Unavailable
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--accent)] hover:underline"
            >
              Open {displayUrl} in new tab
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border border-[var(--border-default)] bg-[var(--bg-muted)] overflow-hidden">
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
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-50">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="truncate">{displayUrl}</span>
        </div>
        {/* Open in new tab */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 p-1 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          title="Open in new tab"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

      {/* iframe container */}
      <div className="relative w-full" style={{ height: "480px" }}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-muted)] z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="h-6 w-6 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
              <span className="text-[10px] font-medium text-[var(--text-disabled)] tracking-wide uppercase">
                Loading {projectName}
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
    </div>
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
  const resolvedSrc = React.useMemo(() => {
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
    <div
      className={`group/img relative overflow-hidden rounded-none border border-[var(--border-default)] bg-[var(--bg-muted)] transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-lg hover:shadow-[var(--accent)]/5 cursor-pointer flex items-center justify-center`}
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Loading skeleton */}
      {!loaded && (
        <div className="flex items-center justify-center" style={{ minHeight: total === 1 ? 280 : 220, minWidth: "100%" }}>
          <div className="flex flex-col items-center gap-2.5">
            <div className="h-6 w-6 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
            <span className="text-[10px] font-medium text-[var(--text-disabled)] tracking-wide uppercase">
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
        className={`w-auto h-auto object-contain max-h-[600px] max-w-full transition-all duration-500 group-hover/img:scale-[1.03] ${loaded ? "opacity-100" : "opacity-0"}`}
      />

      {/* Gradient overlay */}
      {loaded && (
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}

      {/* Image index badge */}
      {loaded && total > 1 && (
        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-none bg-[var(--bg-base)]/80 backdrop-blur-sm border border-[var(--border-default)]/50 text-[9px] font-bold text-[var(--text-muted)] tracking-wider uppercase opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
          {index + 1} / {total}
        </div>
      )}
    </div>
  );
}

/* ─── Main overview component ─── */
export function ProjectOverview({ project, detail }: { project: ProjectShape; detail: any }) {
  const images: string[] = detail.previewImages ?? [];
  const liveUrl: string | null = detail.liveUrl ?? null;

  return (
    <div className="flex flex-col gap-8">
      {/* ──── Priority 1: Live Website Preview ──── */}
      {liveUrl && (
        <section>
          <div className="flex items-center justify-between">
            <SectionLabel label="Live Preview" />
            <span className="text-[10px] font-medium text-[var(--text-disabled)] tracking-wider uppercase">
              Deployed
            </span>
          </div>
          <div className="mt-3">
            <LivePreview url={liveUrl} projectName={project.name} />
          </div>
        </section>
      )}

      {/* ──── Priority 2: Static Image Gallery (only when no live URL) ──── */}
      {!liveUrl && images.length > 0 && (
        <section>
          <div className="flex items-center justify-between">
            <SectionLabel label="Project Gallery" />
            <span className="text-[10px] font-medium text-[var(--text-disabled)] tracking-wider uppercase">
              {images.length} {images.length === 1 ? "screenshot" : "screenshots"}
            </span>
          </div>
          <div className={`mt-3 ${
            images.length === 1
              ? "flex justify-center"
              : images.length <= 3
                ? "flex flex-col sm:flex-row justify-center items-center gap-1"
                : "flex flex-wrap justify-center gap-1"
          }`}>
            {images.map((url, index) => (
              <GalleryImage
                key={`${project.id}-gallery-${index}`}
                src={url}
                alt={`${project.name} screenshot ${index + 1}`}
                index={index}
                total={images.length}
              />
            ))}
          </div>
        </section>
      )}

      {/* ──── Main content grid ──── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
        <div className="space-y-8">
          <section>
            <SectionLabel label="Core Capabilities" />
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {detail.features.slice(0, 4).map((feature: string, index: number) => (
                <VisualBadge
                  key={`${project.id}-feature-${index}`}
                  label={feature.split(".")[0]}
                  icon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  }
                />
              ))}
            </div>
          </section>

          <section>
            <SectionLabel label="System Flow" />
            <FlowDiagram project={project} />
          </section>

          <section>
            <SectionLabel label="Engine & Stack" />
            <div className="mt-3 flex flex-wrap gap-3">
              {detail.techGroups.flatMap((g: any) => g.items).map((item: any, iIndex: number) => (
                <TechBadge key={`${project.id}-tech-${iIndex}`} name={item.n} />
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <aside className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 shadow-sm">
            <SectionLabel label="Specifications" />
            <div className="mt-4 space-y-3">
              <SidebarKeyValue label="Category" value={detail.category} />
              <SidebarKeyValue label="Engine" value={detail.language} />
              <SidebarKeyValue label="Release" value={detail.year} />
              <SidebarKeyValue label="Backend" value={detail.backend.split(".")[0]} />
              <SidebarKeyValue label="Storage" value={detail.storage.split(".")[0]} />
            </div>
          </aside>

          <aside className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 shadow-sm">
            <SectionLabel label="Topic Graph" />
            <div className="mt-3 flex flex-wrap gap-2">
              {detail.topics.slice(0, 10).map((topic: string, index: number) => (
                <span
                  key={`${project.id}-topic-${index}`}
                  className="px-2 py-1 rounded-md bg-[var(--bg-muted)] text-[10px] font-bold text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all cursor-default"
                >
                  #{topic}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
