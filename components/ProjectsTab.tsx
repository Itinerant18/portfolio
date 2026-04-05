"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  fallbackProjects,
  isForkedProject,
  sortProjectsByUpdatedAt,
} from "@/data/projects";
import { useIDEStore } from "@/store/useIDEStore";
import { 
  ProjectShape, TabKey, LoadState, 
  isProjectLike, asProjectShape, getInitials, techColor, 
  categoryOf, languageOf, yearOf, whyOf, problemOf, 
  techGroupsOf, featuresOf, topicsOf, flowsOf, 
  dataModelsOf, backendOf, storageOf, architectureOf, 
  highLevelOf, releasesOf 
} from "./projects/ProjectData";
import { 
  LoadingState, ProjectRowSkeleton, StatCell, SectionLabel 
} from "./projects/ProjectUI";
import { ProjectOverview } from "./projects/ProjectOverview";
import { ProjectArchitecture } from "./projects/ProjectArchitecture";
import { ProjectChangelog } from "./projects/ProjectChangelog";

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function ProjectsTab() {
  const openFile = useIDEStore((state) => state.openFile);
  const fallbackList = useMemo(
    () =>
      sortProjectsByUpdatedAt(fallbackProjects.filter((project) => !isForkedProject(project))).map(
        asProjectShape,
      ),
    [],
  );
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [projects, setProjects] = useState<ProjectShape[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function hydrateProjects() {
      try {
        const response = await fetch("/api/github-projects", { cache: "no-store" });
        if (!response.ok) throw new Error(`Failed to load projects: ${response.status}`);
        const payload = (await response.json()) as unknown;
        if (!Array.isArray(payload)) throw new Error("Projects payload was not an array.");
        const nextProjects = sortProjectsByUpdatedAt(
          payload.filter(isProjectLike).filter((project) => !isForkedProject(project)),
        ).map(asProjectShape);
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
    if (!query) return projects;

    return projects.filter((project) => {
      const category = categoryOf(project).toLowerCase();
      const language = languageOf(project).toLowerCase();
      const topics = topicsOf(project).join(" ").toLowerCase();

      return (
        project.name.toLowerCase().includes(query) ||
        category.includes(query) ||
        language.includes(query) ||
        topics.includes(query)
      );
    });
  }, [projects, searchQuery]);

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

    const techGroups = techGroupsOf(selectedProject);
    const features = featuresOf(selectedProject);
    const flows = flowsOf(selectedProject);
    const releases = releasesOf(selectedProject);
    const topics = topicsOf(selectedProject);

    return {
      architecture: architectureOf(selectedProject),
      backend: backendOf(selectedProject),
      category: categoryOf(selectedProject),
      dataModels: dataModelsOf(selectedProject),
      dependencies: techGroups.reduce((sum, group) => sum + group.items.length, 0),
      features,
      flows,
      highLevel: highLevelOf(selectedProject),
      language: languageOf(selectedProject),
      problem: problemOf(selectedProject),
      releases,
      storage: storageOf(selectedProject),
      tagline:
        selectedProject.shortDescription ||
        `${selectedProject.name} packages a focused workflow into a sharper operational surface.`,
      techGroups,
      topics,
      why: whyOf(selectedProject),
      year: yearOf(selectedProject),
      previewImage: selectedProject.previewImage,
    };
  }, [selectedProject]);

  if (loadState === "loading" || !selectedProject || !detail) {
    return (
      <div className="flex h-full w-full overflow-hidden bg-[var(--bg-base)] font-sans text-[var(--text-primary)]">
        <aside className="hidden md:flex h-full w-[268px] shrink-0 flex-col border-r border-[var(--border-default)] bg-[var(--bg-elevated)]">
          <div className="shrink-0 border-b border-[var(--border-default)] px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Projects
              </span>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)] animate-pulse" />
                Syncing
              </div>
            </div>
            <div className="h-8 rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)]" />
          </div>
          <div className="ide-scrollbar min-h-0 flex-1 overflow-y-auto">
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

  return (
    <div className="flex h-full w-full overflow-hidden bg-[var(--bg-base)] font-sans text-[var(--text-primary)]">
      <aside className="hidden md:flex h-full w-[280px] shrink-0 flex-col border-r border-[var(--border-default)] bg-[var(--bg-elevated)]">
        <div className="shrink-0 border-b border-[var(--border-default)] px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
              Projects
            </span>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
              Ready
            </div>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search projects..."
            className="h-8 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)] px-3 text-[12px] font-medium text-[var(--text-primary)] outline-none placeholder:text-[var(--text-disabled)] focus:border-[var(--accent)] transition-colors"
          />
        </div>

        <div className="ide-scrollbar min-h-0 flex-1 overflow-y-auto">
          {filteredProjects.map((project, index) => {
            const active = project.id === selectedProjectId;
            const lang = languageOf(project);

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => {
                  setSelectedProjectId(project.id);
                  setActiveTab("overview");
                }}
                className={`relative grid w-full grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 border-b border-[var(--border-default)] px-4 py-3.5 text-left transition-all ${
                  index === 0 ? "border-t border-[var(--border-default)]" : ""
                } ${active
                    ? "bg-[var(--bg-muted)]"
                    : "hover:bg-[var(--bg-muted)]/50"
                  }`}
              >
                {active ? <span className="absolute left-0 top-0 h-full w-px bg-[var(--accent)]" /> : null}
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-md text-[12px] font-semibold text-white shadow-sm"
                  style={{ backgroundColor: techColor(lang) }}
                >
                  {getInitials(project.name)}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[12px] font-medium text-[var(--text-primary)]">
                    {project.name}
                  </div>
                  <div className="truncate text-[10px] font-medium text-[var(--text-muted)]">
                    {project.shortDescription || "No description provided."}
                  </div>
                </div>
                {active && (
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]/80" />
                )}
              </button>
            );
          })}

          {filteredProjects.length === 0 ? (
            <div className="px-6 py-12 text-center text-[12px] text-[var(--text-disabled)] italic font-medium">
              No matching projects found.
            </div>
          ) : null}
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[var(--bg-base)]">
        <div className="shrink-0 border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
          <div className="px-6 py-7 md:px-10">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-7">
              <div className="shrink-0 relative">
                <div
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-xl text-[24px] font-semibold text-white shadow-sm"
                  style={{ backgroundColor: techColor(detail.language) }}
                >
                  {getInitials(selectedProject.name)}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  <span>{detail.category}</span>
                  <span className="opacity-30">•</span>
                  <span>{detail.language}</span>
                  <span className="opacity-30">•</span>
                  <span>{detail.year}</span>
                </div>
                <h1 className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.04em] text-[var(--text-primary)] md:text-[38px]">
                  {selectedProject.name}
                </h1>
                <p className="mt-3 max-w-[70ch] text-[14px] font-medium leading-relaxed text-[var(--text-secondary)]">{detail.tagline}</p>
                
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openExternal(selectedProject.links.github)}
                    className="rounded-md bg-[var(--accent)] px-4 py-2 text-[12px] font-semibold text-white transition-all hover:bg-[var(--accent-hover)] hover:shadow-sm"
                  >
                    Repository
                  </button>
                  {selectedProject.links.demo && (
                    <button
                      type="button"
                      onClick={() => openExternal(selectedProject.links.demo!)}
                      className="rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)] px-4 py-2 text-[12px] font-medium text-[var(--text-primary)] transition-all hover:border-[var(--border-hover)] hover:bg-[var(--bg-overlay)]"
                    >
                      Live Demo
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => openFile("data/projects.ts")}
                    className="rounded-md border border-[var(--border-default)] bg-transparent px-4 py-2 text-[12px] font-medium text-[var(--text-muted)] transition-all hover:border-[var(--border-hover)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
                  >
                    Open Source
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-[var(--border-default)] border-t border-[var(--border-default)] bg-[var(--bg-muted)]/30">
            <StatCell label="Dependencies" value={detail.dependencies} />
            <StatCell label="Features" value={detail.features.length} />
            <StatCell label="Flow steps" value={detail.flows.length} />
            <StatCell label="Releases" value={detail.releases.length} />
            <StatCell label="Topics" value={detail.topics.length} />
          </div>
        </div>

        <div className="shrink-0 border-b border-[var(--border-default)] bg-[var(--bg-elevated)] px-6 md:px-10">
          <div className="flex items-center gap-8">
            {([
              ["overview", "Overview"],
              ["architecture", "Architecture"],
              ["changelog", "Changelog"],
            ] as Array<[TabKey, string]>).map(([tabKey, label]) => (
              <button
                key={tabKey}
                type="button"
                onClick={() => setActiveTab(tabKey)}
                className={`relative px-0 py-4 text-[11px] font-medium uppercase tracking-[0.12em] transition-all ${activeTab === tabKey
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-disabled)] hover:text-[var(--text-muted)]"
                  }`}
              >
                {label}
                {activeTab === tabKey && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="ide-scrollbar min-h-0 flex-1 overflow-y-auto bg-[var(--bg-base)] px-6 py-8 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedProject.id}-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "overview" && (
                <ProjectOverview project={selectedProject} detail={detail} />
              )}

              {activeTab === "architecture" && (
                <ProjectArchitecture project={selectedProject} detail={detail} />
              )}

              {activeTab === "changelog" && (
                <ProjectChangelog releases={detail.releases} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
