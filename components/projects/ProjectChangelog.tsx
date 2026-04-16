"use client";

import { useEffect, useState } from "react";
import { FaCircle, FaMinus, FaStar } from "react-icons/fa6";
import { VscCheckAll, VscHistory } from "react-icons/vsc";
import { SectionLabel } from "./ProjectUI";
import type { ProjectShape, ReleaseEntry } from "./ProjectData";

function normalizeVersion(value: string) {
  return value.replace(/^v/i, "");
}

function formatReleaseDate(value: string | undefined) {
  if (!value) return "Unknown publish date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown publish date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function versionIcon(version: string) {
  const parts = normalizeVersion(version).split(".");
  if (parts.length >= 2 && parts[1] === "0") return <FaStar size={10} />;
  if (parts.length >= 3 && parts[2] !== "0") return <FaMinus size={10} />;
  return <FaCircle size={8} />;
}

function VersionBadge({ version }: { version: string }) {
  return (
    <div className="type-mono-sm pt-1.5 font-bold tracking-tight text-[var(--accent)] sm:text-[14px]">
      v{normalizeVersion(version)}
    </div>
  );
}

export function ProjectChangelog({ project }: { project: ProjectShape }) {
  const [releases, setReleases] = useState<ReleaseEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function hydrateReleases() {
      setLoading(true);
      try {
        const response = await fetch(`https://api.github.com/repos/Itinerant18/${project.id}/releases`);
        if (!response.ok) throw new Error("Failed to load releases.");
        const data = (await response.json()) as Array<{
          html_url?: string;
          name?: string | null;
          published_at?: string | null;
          tag_name?: string | null;
        }>;

        if (!cancelled) {
          setReleases(
            Array.isArray(data)
              ? data.map((release) => ({
                  v: release.tag_name || "untagged",
                  t: release.name || release.tag_name || "Untitled release",
                  meta: formatReleaseDate(release.published_at || undefined),
                  url: release.html_url,
                }))
              : [],
          );
        }
      } catch {
        if (!cancelled) {
          setReleases([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void hydrateReleases();

    return () => {
      cancelled = true;
    };
  }, [project.id]);

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="mb-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SectionLabel label="Release History" />
        <div className="type-sys-micro flex items-center gap-2 text-[var(--accent)]">
          <VscHistory size={14} />
          Changelog
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-5">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
          <span className="type-sys-micro text-[var(--text-muted)]">Loading releases</span>
        </div>
      ) : null}

      {!loading && releases.length === 0 ? (
        <div className="rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] px-6 py-10 text-center text-[var(--text-muted)]">
          <div className="type-body">No releases published yet.</div>
          <a
            href={`${project.links.github}/releases`}
            target="_blank"
            rel="noopener noreferrer"
            className="type-btn mt-3 inline-flex text-[var(--accent)] hover:underline"
          >
            Create one on GitHub
          </a>
        </div>
      ) : null}

      {!loading ? (
        <div className="space-y-0">
          {releases.map((release, index) => (
            <div
              key={`${release.v}-${index}`}
              className="grid grid-cols-[84px_minmax(0,1fr)] gap-4 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-8"
            >
              <div className="relative pr-4 text-right sm:pr-6">
                <VersionBadge version={release.v} />
                {index < releases.length - 1 ? (
                  <div className="absolute bottom-[-40px] right-[3px] top-8 w-[2px] bg-gradient-to-b from-[var(--accent)]/50 via-[var(--border-default)] to-transparent" />
                ) : null}
                <div className="absolute right-0 top-[17px] z-10 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-base)] text-[var(--accent)]">
                  {versionIcon(release.v)}
                </div>
              </div>

              <div className="group mb-8 rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-4 transition-colors hover:bg-[var(--bg-muted)] sm:mb-10 sm:px-6 sm:py-5">
                <div className="mb-3 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div className="type-sys-micro flex items-center gap-2 text-[var(--text-muted)]">
                    <VscCheckAll className="text-[var(--success)]" size={12} />
                    {release.meta}
                  </div>
                </div>

                {release.url ? (
                  <a
                    href={release.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-body text-[var(--text-primary)] hover:text-[var(--accent)]"
                  >
                    {release.t}
                  </a>
                ) : (
                  <div className="type-body text-[var(--text-primary)]">{release.t}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
