"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  fallbackProjects,
  isForkedProject,
  sortProjectsByUpdatedAt,
} from "@/data/projects";
import { IDEInput } from "@/components/ui/Primitives";
import {
  ProjectDetail,
  ProjectShape,
  TabKey,
  LoadState,
  isProjectLike,
  asProjectShape,
  getInitials,
  techColor,
  categoryOf,
  languageOf,
  yearOf,
  techGroupsOf,
  topicsOf,
} from "./projects/ProjectData";
import { LoadingState, ProjectRowSkeleton } from "./projects/ProjectUI";
import { ProjectOverview } from "./projects/ProjectOverview";
import { ProjectPreview } from "./projects/ProjectPreview";
import { ProjectArchitecture } from "./projects/ProjectArchitecture";
import { ProjectTech } from "./projects/ProjectTech";
import { ProjectChangelog } from "./projects/ProjectChangelog";
import {
  VscChevronDown,
  VscChromeClose,
  VscGithub,
  VscGlobe,
  VscProject,
} from "react-icons/vsc";

const LANGS = ["All", "TypeScript", "Python", "Dart", "JavaScript"] as const;

const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "preview", label: "Preview" },
  { key: "architecture", label: "Architecture" },
  { key: "tech", label: "Tech" },
  { key: "changelog", label: "Changelog" },
];

function activityState(updatedAt: string | undefined) {
  if (!updatedAt) {
    return { color: "#ef4444", label: "Dormant" };
  }

  const days = (Date.now() - new Date(updatedAt).getTime()) / 86400000;
  if (days < 90) return { color: "#22c55e", label: "Active" };
  if (days < 365) return { color: "#f59e0b", label: "Recent" };
  return { color: "#ef4444", label: "Dormant" };
}

function ProjectListRow({
  active,
  onSelect,
  project,
}: {
  active: boolean;
  onSelect: () => void;
  project: ProjectShape;
}) {
  const language = languageOf(project);
  const health = activityState(project.updatedAt);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative grid h-14 w-full grid-cols-[32px_minmax(0,1fr)] items-center gap-3 rounded-md px-3 text-left transition-colors ${
        active ? "bg-[var(--bg-base)]" : "hover:bg-[var(--bg-muted)]"
      }`}
      style={active ? { boxShadow: "inset 0 0 0 1px var(--accent)" } : undefined}
    >
      <div
        className="flex h-8 w-8 items-center justify-center rounded-md text-[10px] font-bold text-white"
        style={{ backgroundColor: techColor(project.primaryTech || language) }}
      >
        {getInitials(project.name)}
      </div>

      <div className="relative min-w-0 pr-4">
        <div
          className="type-title-sm overflow-hidden text-[var(--text-primary)]"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {project.name}
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
          <span className="h-2 w-2 rounded-full" style={{ background: techColor(language) }} />
          <span className="truncate">{language}</span>
        </div>
      </div>

      <span
        className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: health.color }}
        aria-hidden="true"
      />
    </button>
  );
}

function ActivityLegend() {
  return (
    <div className="sticky bottom-0 border-t border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-3">
      <div className="mb-2 text-[10px] uppercase tracking-[0.08em] text-[var(--text-muted)]">
        Activity
      </div>
      {[
        { color: "#22c55e", label: "Active (< 90d)" },
        { color: "#f59e0b", label: "Recent (< 1y)" },
        { color: "#ef4444", label: "Dormant" },
      ].map((item) => (
        <div
          key={item.label}
          className="mb-1 flex items-center gap-2 text-[11px] text-[var(--text-secondary)] last:mb-0"
        >
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: item.color }} />
          {item.label}
        </div>
      ))}
    </div>
  );
}

function ActionLink({
  accent = false,
  href,
  icon,
  label,
}: {
  accent?: boolean;
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`type-btn inline-flex items-center gap-2 rounded-md px-3 py-2 transition-colors ${
        accent
          ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
          : "border border-[var(--border-default)] bg-[var(--bg-base)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
      }`}
    >
      {icon}
      {label}
    </a>
  );
}

function LanguageFilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`type-sys-micro rounded-full border px-2.5 py-1 transition-colors ${
        active
          ? "border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--text-primary)]"
          : "border-[var(--border-default)] bg-[var(--bg-base)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
      }`}
    >
      {label}
    </button>
  );
}

export default function ProjectsTab() {
  const fallbackList = useMemo(
    () =>
      sortProjectsByUpdatedAt(
        fallbackProjects.filter((project) => !isForkedProject(project)),
      ).map(asProjectShape),
    [],
  );
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [projects, setProjects] = useState<ProjectShape[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [langFilter, setLangFilter] = useState<(typeof LANGS)[number]>("All");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function hydrateProjects() {
      try {
        const response = await fetch("/api/github-projects", { cache: "no-store" });
        if (!response.ok) throw new Error(`Failed to load projects: ${response.status}`);
        const payload = (await response.json()) as unknown;
        if (!Array.isArray(payload)) throw new Error("Projects payload was not an array.");

        const nextProjects = sortProjectsByUpdatedAt(
          payload
            .filter(isProjectLike)
            .filter((project) => !isForkedProject(project))
            .filter((project) => project.id !== "Itinerant18"),
        ).map((project) => {
          const shape = asProjectShape(project);
          // Merge with fallback data to preserve handwritten rich fields
          const fallback = fallbackList.find((f) => f.id === shape.id);
          if (fallback) {
            return {
              ...shape,
              problem: shape.problem || fallback.problem,
              features: (shape.features?.length ? shape.features : fallback.features) ?? [],
              architecture: shape.architecture || fallback.architecture,
              flows: (shape.flows?.length ? shape.flows : fallback.flows) ?? [],
              dataModels: (shape.dataModels?.length ? shape.dataModels : fallback.dataModels) ?? [],
              backend: shape.backend || fallback.backend,
              dataStorage: shape.dataStorage || fallback.dataStorage,
              visualFlow: (shape.visualFlow?.length ? shape.visualFlow : fallback.visualFlow) ?? [],
              highLevel: shape.highLevel || fallback.highLevel,
              why: shape.why || fallback.why,
              techGroups: (shape.techGroups?.length ? shape.techGroups : fallback.techGroups) ?? [],
              liveUrl: shape.liveUrl ?? fallback.liveUrl,
              previewImages: (shape.previewImages?.length ? shape.previewImages : fallback.previewImages) ?? [],
            } as ProjectShape;
          }
          return shape;
        });

        if (cancelled) return;
        if (nextProjects.length > 0) {
          setProjects(nextProjects);
          setLoadState("ready");
          return;
        }

        setProjects(fallbackList);
        setLoadState("fallback");
      } catch {
        if (cancelled) return;
        setProjects(fallbackList);
        setLoadState("fallback");
      }
    }

    void hydrateProjects();

    return () => {
      cancelled = true;
    };
  }, [fallbackList]);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const language = languageOf(project);
      const category = categoryOf(project).toLowerCase();
      const matchesLanguage = langFilter === "All" || language === langFilter;
      const matchesQuery =
        !query ||
        project.name.toLowerCase().includes(query) ||
        category.includes(query) ||
        language.toLowerCase().includes(query) ||
        (project.topics ?? []).some((topic) => topic.toLowerCase().includes(query));

      return matchesLanguage && matchesQuery;
    });
  }, [langFilter, projects, searchQuery]);

  useEffect(() => {
    if (filteredProjects.length === 0) {
      setSelectedProjectId("");
      return;
    }

    if (!filteredProjects.some((project) => project.id === selectedProjectId)) {
      setSelectedProjectId(filteredProjects[0].id);
    }
  }, [filteredProjects, selectedProjectId]);

  const selectedProject = useMemo(
    () =>
      filteredProjects.find((project) => project.id === selectedProjectId) ??
      filteredProjects[0] ??
      null,
    [filteredProjects, selectedProjectId],
  );

  const detail = useMemo(() => {
    if (!selectedProject) return null;

    return {
      architecture: selectedProject.architecture?.trim() || null,
      backend: selectedProject.backend?.trim() || null,
      category: categoryOf(selectedProject),
      dataModels: selectedProject.dataModels ?? [],
      dataStorage: selectedProject.dataStorage?.trim() || null,
      features: selectedProject.features ?? [],
      flows: selectedProject.flows ?? [],
      problem: selectedProject.problem?.trim() || null,
      language: languageOf(selectedProject),
      tagline: selectedProject.shortDescription?.trim() || "No description provided.",
      techGroups: techGroupsOf(selectedProject),
      topics: topicsOf(selectedProject),
      visualFlow: selectedProject.visualFlow ?? [],
      year: yearOf(selectedProject),
      previewImage: selectedProject.previewImage ?? null,
      previewImages:
        selectedProject.previewImages ??
        (selectedProject.previewImage ? [selectedProject.previewImage] : []),
      liveUrl: selectedProject.liveUrl ?? null,
    } satisfies ProjectDetail;
  }, [selectedProject]);

  if (loadState === "loading") {
    return (
      <div className="type-ui flex h-full w-full overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
        <aside className="hidden h-full shrink-0 flex-col border-r border-[var(--border-default)] bg-[var(--bg-elevated)] md:flex md:w-[220px] lg:w-[260px]">
          <div className="shrink-0 border-b border-[var(--border-default)] px-4 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="type-sys-micro text-[var(--text-muted)]">Projects</span>
              <div className="type-sys-micro flex items-center gap-2 text-[var(--text-muted)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--success)]" />
                Syncing
              </div>
            </div>
            <div className="h-8 rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)]" />
          </div>
          <div className="ide-scrollbar min-h-0 flex-1 overflow-y-auto px-2 py-2">
            {Array.from({ length: 9 }, (_, index) => (
              <ProjectRowSkeleton key={`loading-row-${index}`} index={index} />
            ))}
          </div>
        </aside>
        <div className="min-w-0 flex-1">
          <LoadingState />
        </div>
      </div>
    );
  }

  if (!selectedProject || !detail) {
    return (
      <div className="type-ui flex h-full w-full overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
        <aside className="hidden h-full shrink-0 flex-col border-r border-[var(--border-default)] bg-[var(--bg-elevated)] md:flex md:w-[220px] lg:w-[260px]">
          <div className="shrink-0 border-b border-[var(--border-default)] px-4 py-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <VscProject className="text-[var(--accent)]" size={14} />
                <span className="type-sys-micro text-[var(--text-primary)]">Projects</span>
              </div>
            </div>
            <IDEInput
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search projects..."
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {LANGS.map((lang) => (
                <LanguageFilterChip
                  key={`empty-${lang}`}
                  active={langFilter === lang}
                  label={lang}
                  onClick={() => setLangFilter(lang)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center px-4 text-center text-[12px] italic text-[var(--text-muted)]">
            No matching repositories.
          </div>
          <ActivityLegend />
        </aside>

        <div className="flex min-w-0 flex-1 items-center justify-center px-6">
          <div className="max-w-md text-center">
            <div className="type-title-sm text-[var(--text-primary)]">No matching repositories</div>
            <p className="type-body mt-2 text-[var(--text-muted)]">
              Adjust the search query or language filter to see more projects.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="type-ui flex h-full w-full overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      <aside className="hidden h-full shrink-0 flex-col border-r border-[var(--border-default)] bg-[var(--bg-elevated)] md:flex md:w-[220px] lg:w-[260px]">
        <div className="shrink-0 border-b border-[var(--border-default)] px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <VscProject className="text-[var(--accent)]" size={14} />
              <span className="type-sys-micro text-[var(--text-primary)]">Projects</span>
            </div>
            <div className="type-sys-micro flex items-center gap-2 text-[var(--text-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
              Ready
            </div>
          </div>

          <IDEInput
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search projects..."
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {LANGS.map((lang) => (
              <LanguageFilterChip
                key={lang}
                active={langFilter === lang}
                label={lang}
                onClick={() => setLangFilter(lang)}
              />
            ))}
          </div>
        </div>

        <div className="ide-scrollbar min-h-0 flex-1 overflow-y-auto px-2 py-2">
          {filteredProjects.map((project) => (
            <ProjectListRow
              key={project.id}
              active={project.id === selectedProjectId}
              project={project}
              onSelect={() => {
                setSelectedProjectId(project.id);
                setActiveTab("overview");
              }}
            />
          ))}

          {filteredProjects.length === 0 ? (
            <div className="px-4 py-12 text-center text-[12px] italic text-[var(--text-muted)]">
              No matching repositories.
            </div>
          ) : null}
        </div>

        <ActivityLegend />
      </aside>

      <section className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[var(--bg-base)]">
        <div className="sticky top-0 z-10 border-b border-[var(--border-default)] bg-[var(--bg-elevated)] md:hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="min-w-0 flex-1 rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] px-3 py-2 text-left"
            >
              <div className="type-sys-micro text-[var(--text-muted)]">Projects</div>
              <div className="mt-1 flex items-center justify-between gap-3">
                <span className="type-title-sm truncate text-[var(--text-primary)]">
                  {selectedProject.name}
                </span>
                <VscChevronDown className="shrink-0 text-[var(--text-muted)]" size={16} />
              </div>
            </button>
          </div>
        </div>

        {drawerOpen ? (
          <div
            className="fixed inset-0 z-50 bg-black/40 md:hidden"
            onClick={() => setDrawerOpen(false)}
          >
            <div
              className="absolute bottom-0 inset-x-0 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t border-[var(--border-default)] bg-[var(--bg-elevated)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="sticky top-0 border-b border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="type-title-sm text-[var(--text-primary)]">Select project</div>
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    className="rounded-md border border-[var(--border-default)] p-2 text-[var(--text-muted)]"
                  >
                    <VscChromeClose size={14} />
                  </button>
                </div>
                <IDEInput
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search projects..."
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {LANGS.map((lang) => (
                    <LanguageFilterChip
                      key={`mobile-${lang}`}
                      active={langFilter === lang}
                      label={lang}
                      onClick={() => setLangFilter(lang)}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-1 px-2 py-2">
                {filteredProjects.map((project) => (
                  <ProjectListRow
                    key={`drawer-${project.id}`}
                    active={project.id === selectedProjectId}
                    project={project}
                    onSelect={() => {
                      setSelectedProjectId(project.id);
                      setActiveTab("overview");
                      setDrawerOpen(false);
                    }}
                  />
                ))}

                {filteredProjects.length === 0 ? (
                  <div className="px-4 py-10 text-center text-[12px] italic text-[var(--text-muted)]">
                    No matching repositories.
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        <div className="shrink-0 border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-5 sm:px-6">
            <motion.div
              key={`hero-${selectedProject.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md text-[18px] font-bold text-white"
                  style={{ backgroundColor: techColor(detail.language) }}
                >
                  {getInitials(selectedProject.name)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="type-sys-micro flex flex-wrap items-center gap-x-2 gap-y-1 text-[var(--text-muted)]">
                    <span>{detail.language}</span>
                    <span className="opacity-40">•</span>
                    <span>{detail.year}</span>
                    <span className="opacity-40">•</span>
                    <span>{detail.category}</span>
                  </div>
                  <h1 className="type-hero mt-1 break-words text-[var(--text-primary)]">
                    {selectedProject.name}
                  </h1>
                  <p className="type-body mt-2 max-w-[70ch] text-[var(--text-secondary)]">
                    {detail.tagline}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <ActionLink
                      href={selectedProject.links.github}
                      icon={<VscGithub size={14} />}
                      label="GitHub"
                    />
                    {detail.liveUrl ? (
                      <ActionLink
                        accent
                        href={detail.liveUrl}
                        icon={<VscGlobe size={14} />}
                        label="Live Site"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="shrink-0 border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
            <div className="flex overflow-x-auto">
              {TABS.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`type-sys-micro relative shrink-0 px-4 py-3 transition-colors ${
                    activeTab === key
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {label}
                  {activeTab === key ? (
                    <motion.span
                      layoutId="projects-tab-active"
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--accent)]"
                    />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="ide-scrollbar min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedProject.id}-${activeTab}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {activeTab === "overview" ? (
                  <ProjectOverview detail={detail} project={selectedProject} />
                ) : null}

                {activeTab === "preview" ? <ProjectPreview detail={detail} project={selectedProject} /> : null}

                {activeTab === "architecture" ? (
                  <ProjectArchitecture project={selectedProject} />
                ) : null}

                {activeTab === "tech" ? <ProjectTech project={selectedProject} /> : null}

                {activeTab === "changelog" ? <ProjectChangelog project={selectedProject} /> : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
