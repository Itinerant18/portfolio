"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import {
  fallbackProjects,
  isForkedProject,
  sortProjectsByUpdatedAt,
} from "@/data/projects";
import { useIDEStore } from "@/store/useIDEStore";
import { IDEButton, IDEInput } from "@/components/ui/Primitives";
import { 
  ProjectDetail, ProjectShape, TabKey, LoadState, 
  isProjectLike, asProjectShape, getInitials, techColor, 
  categoryOf, languageOf, yearOf, whyOf, problemOf, 
  techGroupsOf, featuresOf, topicsOf, flowsOf, 
  dataModelsOf, backendOf, storageOf, architectureOf, 
  highLevelOf, releasesOf 
} from "./projects/ProjectData";
import { 
  LoadingState, ProjectRowSkeleton
} from "./projects/ProjectUI";
import { ProjectOverview } from "./projects/ProjectOverview";
import { ProjectArchitecture } from "./projects/ProjectArchitecture";
import { ProjectChangelog } from "./projects/ProjectChangelog";
import { ProjectReadme } from "./projects/ProjectReadme";
import { ProjectInsights } from "./projects/ProjectInsights";
import { VscRepo, VscCode, VscProject } from "react-icons/vsc";
import { calcHealth } from "@/utils/projectHealth";

const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "readme", label: "README" },
  { key: "architecture", label: "Architecture" },
  { key: "insights", label: "Insights" },
  { key: "changelog", label: "Changelog" },
];

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

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
          payload.filter(isProjectLike).filter((project) => !isForkedProject(project)).filter((project) => project.id !== "Itinerant18"),
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
      previewImage: selectedProject.previewImage ?? null,
      previewImages: selectedProject.previewImages ?? (selectedProject.previewImage ? [selectedProject.previewImage] : []),
      liveUrl: selectedProject.liveUrl ?? null,
    } satisfies ProjectDetail;
  }, [selectedProject]);

  if (loadState === "loading" || !selectedProject || !detail) {
    return (
      <div className="type-ui flex h-full w-full overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
        <aside className="hidden h-full shrink-0 flex-col border-r border-[var(--border-default)] bg-[var(--bg-elevated)] md:flex md:w-[200px] lg:w-[260px]">
          <div className="shrink-0 border-b border-[var(--border-default)] px-4 py-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="type-sys-micro text-[var(--text-muted)]">
                Projects
              </span>
              <div className="type-sys-micro flex items-center gap-2 text-[var(--text-muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)] animate-pulse" />
                Syncing
              </div>
            </div>
            <div className="h-8 rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)]" />
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
    <div className="type-ui flex h-full w-full overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      <aside className="hidden h-full shrink-0 flex-col border-r border-[var(--border-default)] bg-[var(--bg-elevated)] md:flex md:w-[200px] lg:w-[260px]">
        <div className="shrink-0 border-b border-[var(--border-default)] px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <VscProject className="text-[var(--accent)]" size={14} />
              <span className="type-sys-micro text-[var(--text-primary)]">
                Projects
              </span>
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
            placeholder="Search registry..."
          />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="ide-scrollbar min-h-0 flex-1 overflow-y-auto"
        >
          {filteredProjects.map((project) => {
            const active = project.id === selectedProjectId;
            const lang = languageOf(project);
            const health = calcHealth(project);

            return (
              <motion.button
                key={project.id}
                variants={itemVariants}
                whileHover={{ x: 1 }}
                type="button"
                onClick={() => {
                  setSelectedProjectId(project.id);
                  setActiveTab("overview");
                }}
                className={`design-row relative mb-2 grid w-full grid-cols-[38px_minmax(0,1fr)_auto] items-center gap-2.5 px-4 py-3 text-left ${
                  active ? "border-[var(--accent)]" : ""
                }`}
                style={active ? { boxShadow: "var(--shadow-card)" } : undefined}
              >
                {active && (
                  <motion.span 
                    layoutId="active-indicator"
                    className="absolute left-0 top-0 h-full w-[2px] bg-[var(--accent)]" 
                  />
                )}
                <div
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-sm text-[10px] font-bold text-white shadow-[var(--shadow-ambient)]"
                  style={{ backgroundColor: techColor(lang) }}
                >
                  {getInitials(project.name)}
                </div>
                <div className="min-w-0">
                  <div className="type-title-sm truncate text-[var(--text-primary)]">
                    {project.name}
                  </div>
                  <div className="type-body truncate text-[var(--text-secondary)]">
                    {project.shortDescription ?? `${lang} project`}
                  </div>
                </div>
                <span
                  className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: health.color }}
                />
              </motion.button>
            );
          })}

          {filteredProjects.length === 0 ? (
            <div className="px-6 py-12 text-center text-[12px] text-[var(--text-disabled)] italic font-medium">
              No matching records in registry.
            </div>
          ) : null}
        </motion.div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[var(--bg-base)]">
        <div className="border-b border-[var(--border-default)] bg-[var(--bg-elevated)] md:hidden">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <VscProject className="text-[var(--accent)]" size={14} />
              <span className="type-sys-micro text-[var(--text-primary)]">
                Projects
              </span>
            </div>

            <div className="mt-3">
              <IDEInput
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search registry..."
              />
            </div>

            {filteredProjects.length > 0 ? (
              <div className="mt-4 space-y-2">
                {filteredProjects.map((project) => {
                  const active = project.id === selectedProjectId;
                  const projectLanguage = languageOf(project);
                  const visibleTech = (project.techStack ?? []).slice(0, 3);
                  const hiddenTechCount = Math.max((project.techStack ?? []).length - visibleTech.length, 0);

                  return (
                    <button
                      key={`mobile-${project.id}`}
                      type="button"
                      onClick={() => {
                        setSelectedProjectId(project.id);
                        setActiveTab("overview");
                      }}
                      className={`w-full rounded-sm border p-3 text-left transition-all ${
                        active
                          ? "border-[var(--accent)] bg-[var(--bg-muted)]"
                          : "border-[var(--border-default)] bg-[var(--bg-base)] hover:border-[var(--accent-muted)] hover:bg-[var(--bg-muted)]/40"
                      }`}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-sm text-[10px] font-bold text-white shadow-[var(--shadow-ambient)]"
                            style={{ backgroundColor: techColor(projectLanguage) }}
                          >
                            {getInitials(project.name)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="type-title-sm truncate leading-none text-[var(--text-primary)]">
                              {project.name}
                            </div>
                            <div className="type-body mt-1 truncate text-[var(--text-secondary)]">
                              {project.shortDescription ?? `${projectLanguage} project`}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {visibleTech.map((tech) => (
                            <span
                              key={`${project.id}-${tech}`}
                              className="type-caption touch-target inline-flex items-center rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] px-2 py-0.5 text-[var(--text-muted)]"
                            >
                              {tech}
                            </span>
                          ))}
                          {hiddenTechCount > 0 ? (
                            <span className="type-caption touch-target inline-flex items-center rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] px-2 py-0.5 text-[var(--text-muted)]">
                              +{hiddenTechCount}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="mt-4 rounded-sm border border-dashed border-[var(--border-default)] px-4 py-5 text-center text-[12px] font-medium italic text-[var(--text-disabled)]">
                No matching records in registry.
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
          <div className="mx-auto w-full max-w-[1200px] px-6 py-4 sm:py-5">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={`hero-${selectedProject.id}`}
              className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
            >
              <div className="relative shrink-0">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-sm text-[22px] font-bold text-white shadow-[var(--shadow-card)]"
                  style={{ backgroundColor: techColor(detail.language) }}
                >
                  {getInitials(selectedProject.name)}
                </motion.div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[var(--bg-elevated)] bg-[var(--success)] animate-pulse" />
              </div>

              <div className="min-w-0 flex-1 overflow-hidden">
                <div className="type-sys-micro flex flex-wrap items-center gap-x-2 gap-y-1 text-[var(--text-muted)]">
                  <span className="text-[var(--accent)]">{detail.category}</span>
                  <span className="opacity-30">•</span>
                  <span>{detail.language}</span>
                  <span className="opacity-30">•</span>
                  <span>{detail.year}</span>
                </div>
                <h1 className="type-hero mt-1 text-[var(--text-primary)] overflow-hidden">
                  <span className="gradient-text break-words">{selectedProject.name}</span>
                </h1>
                <p className="type-body mt-2 max-w-[60ch] text-[var(--text-secondary)]">
                  {detail.tagline}
                </p>
                
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <IDEButton
                    type="button"
                    onClick={() => openExternal(selectedProject.links.github)}
                    variant="primary"
                    className="type-btn h-8 gap-2 px-3"
                  >
                    <VscRepo size={14} /> Repository
                  </IDEButton>
                  <IDEButton
                    type="button"
                    onClick={() => openFile("data/projects.ts")}
                    variant="ghost"
                    className="type-btn h-8 gap-2 px-3"
                  >
                    <VscCode size={14} /> Source
                  </IDEButton>
                </div>
              </div>

              <div className="shrink-0 md:pt-1">
                <div className="type-mono-sm rounded-full border border-[var(--border-default)] bg-[var(--bg-base)] px-2 py-1 uppercase text-[var(--text-muted)]">
                  {detail.dependencies} deps
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="shrink-0 border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="px-6">
              <div className="flex overflow-x-auto scrollbar-hide gap-0 border-b border-[var(--border-default)] max-w-full">
                {TABS.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className={`type-sys-micro touch-target relative flex-shrink-0 whitespace-nowrap px-4 py-3 text-center transition-all ${
                      activeTab === key
                        ? "gradient-text"
                        : "text-[var(--text-muted)] hover:text-[var(--accent)]"
                    }`}
                  >
                    {label}
                    {activeTab === key && (
                      <motion.div 
                        layoutId="activeTabUnderline" 
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="ide-scrollbar min-h-0 flex-1 overflow-y-auto bg-[var(--bg-base)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedProject.id}-${activeTab}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="content-max section-spacing min-w-0"
            >
              {activeTab === "overview" && (
                <ProjectOverview project={selectedProject} detail={detail} allProjects={projects} />
              )}

              {activeTab === "readme" && (
                <ProjectReadme project={selectedProject} />
              )}

              {activeTab === "architecture" && (
                <ProjectArchitecture project={selectedProject} detail={detail} />
              )}

              {activeTab === "insights" && (
                <ProjectInsights project={selectedProject} />
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
