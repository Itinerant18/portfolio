"use client";

import { useState, useMemo } from "react";
import { FaArrowUpRightFromSquare, FaLock } from "react-icons/fa6";
import Image from "next/image";
import { VscGlobe } from "react-icons/vsc";
import type { ProjectDetail, ProjectShape } from "./ProjectData";
import { SectionLabel } from "./ProjectUI";

function LivePreview({ projectName, url }: { projectName: string; url: string }) {
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);
  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  if (errored) {
    return (
      <div className="rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] px-6 py-16 text-center">
        <VscGlobe size={32} className="mx-auto mb-4 text-[var(--text-muted)] opacity-40" />
        <div className="type-sys-micro text-[var(--text-muted)]">Preview unavailable</div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="type-btn mt-4 inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-white transition-colors hover:bg-[var(--accent-hover)]"
        >
          Open {displayUrl}
          <FaArrowUpRightFromSquare size={10} />
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)]">
      <div className="flex items-center gap-2 border-b border-[var(--border-default)] bg-[var(--bg-base)] px-3 py-2">
        <div className="mr-1 flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--error)]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--warning)]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[var(--success)]" />
        </div>
        <div className="type-mono-sm flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)] px-2.5 py-1 text-[var(--text-muted)]">
          <FaLock size={10} className="shrink-0 opacity-60" />
          <span className="truncate">{displayUrl}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
          title={`Open ${projectName}`}
        >
          <FaArrowUpRightFromSquare size={12} />
        </a>
      </div>
      <div className="relative aspect-[16/10] min-h-[320px] w-full bg-[var(--bg-muted)]">
        {loading ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
              <span className="type-sys-micro text-[var(--text-muted)]">Loading preview</span>
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
    </div>
  );
}

function GalleryImage({ alt, src }: { alt: string; src: string }) {
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
    <div className="group relative h-[260px] overflow-hidden rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] transition-all hover:border-[var(--accent-muted)] hover:shadow-[var(--shadow-card)] sm:h-[320px]">
      {!loaded ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
        </div>
      ) : null}
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`object-contain p-3 transition-all duration-300 group-hover:scale-[1.02] ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export function ProjectPreview({
  detail,
  project,
}: {
  detail: ProjectDetail;
  project: ProjectShape;
}) {
  if (detail.liveUrl) {
    return (
      <div className="flex flex-col gap-6">
        <SectionLabel label="Live Preview" />
        <LivePreview projectName={project.name} url={detail.liveUrl} />
      </div>
    );
  }

  if (detail.previewImages.length > 0) {
    return (
      <div className="flex flex-col gap-6">
        <SectionLabel label="Preview Gallery" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {detail.previewImages.slice(0, 6).map((image, index) => (
            <GalleryImage
              key={`${project.id}-preview-${index}`}
              alt={`${project.name} preview ${index + 1}`}
              src={image}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionLabel label="Preview" />
      <div className="flex flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-[var(--border-default)] bg-[var(--bg-elevated)] px-6 py-16 text-center">
        <VscGlobe size={36} className="text-[var(--text-muted)] opacity-30" />
        <div className="type-body text-[var(--text-muted)]">
          No preview available for this repository.
        </div>
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="type-btn inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-white transition-colors hover:bg-[var(--accent-hover)]"
        >
          View on GitHub
          <FaArrowUpRightFromSquare size={10} />
        </a>
      </div>
    </div>
  );
}
