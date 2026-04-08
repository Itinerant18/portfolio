"use client";

import { ReleaseEntry } from "./ProjectData";
import { SectionLabel } from "./ProjectUI";

export function ProjectChangelog({ releases }: { releases: ReleaseEntry[] }) {
  return (
    <div className="flex flex-col gap-6">
      <SectionLabel label="Release History" />
      <div className="mt-4 space-y-0">
        {releases.map((release, index) => (
          <div
            key={`${release.v}-${index}`}
            className="grid grid-cols-[80px_minmax(0,1fr)] gap-6"
          >
            <div className="relative pr-4 text-right">
              <div className="pt-1 text-[13px] font-bold text-[var(--accent)] font-mono">
                {release.v}
              </div>
              {index < releases.length - 1 ? (
                <div className="absolute right-0 top-6 bottom-[-24px] w-[1.5px] bg-[var(--border-default)]" />
              ) : null}
              <div className="absolute right-[-4px] top-[14px] h-2 w-2 rounded-full border-[1.5px] border-[var(--accent)] bg-[var(--bg-base)] z-10" />
            </div>
            <div className="group mb-8 rounded-sm border border-[var(--border-default)] border-l-[3px] border-l-[var(--accent)] bg-[var(--bg-elevated)] px-5 py-4 shadow-sm transition-all hover:bg-[var(--bg-muted)]">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)] transition-colors group-hover:text-[var(--text-secondary)]">
                  {release.meta}
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-[var(--success)] opacity-40 group-hover:opacity-100 animate-pulse" />
              </div>
              <div className="text-[13px] leading-relaxed text-[var(--text-primary)] font-sans">
                {release.t}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
