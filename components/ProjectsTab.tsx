"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  fallbackProjects,
  isForkedProject,
  projectCategories,
  Project,
  sortProjectsByUpdatedAt,
} from "@/data/projects";

type LoadState = "loading" | "github" | "supabase" | "fallback";

const TECH_COLORS: Record<string, string> = {
  TypeScript: "from-[#3178c6] to-[#235a97]",
  JavaScript: "from-[#f7df1e] to-[#c9b418]",
  Python: "from-[#3776ab] to-[#2b5b87]",
  Flutter: "from-[#02569b] to-[#014175]",
  React: "from-[#61dafb] to-[#4fa8c2]",
  IoT: "from-[#00a3e0] to-[#007ba8]",
  AI: "from-[#9b4dff] to-[#7a3cc9]",
  default: "from-[#4d4d4d] to-[#3a3a3a]",
};

function TechBadge({ tech }: { tech: string }) {
  const colorKey =
    Object.keys(TECH_COLORS).find((key) => tech.includes(key)) ?? "default";
  const gradient = TECH_COLORS[colorKey];

  return (
    <span
      className={`inline-flex items-center rounded-md border border-white/5 bg-gradient-to-br ${gradient} px-2.5 py-0.5 text-[11px] font-medium text-white shadow-sm ring-1 ring-inset ring-black/10`}
    >
      {tech}
    </span>
  );
}

function ExtensionIcon({
  project,
  isSelected,
}: {
  project: Project;
  isSelected: boolean;
}) {
  const colorKey =
    Object.keys(TECH_COLORS).find(
      (key) =>
        project.primaryTech?.includes(key) ||
        project.techStack.some((tech) => tech.includes(key)),
    ) ?? "default";
  const gradient = TECH_COLORS[colorKey];
  const initial = project.name.charAt(0).toUpperCase();

  return (
    <div className="relative group">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-[20px] font-bold transition-all duration-300 ${
          isSelected
            ? `bg-gradient-to-br ${gradient} text-white shadow-lg shadow-black/40 ring-2 ring-white/10`
            : "bg-[#2d2d2d] text-[#a6a6a6] group-hover:bg-[#3d3d3d]"
        }`}
      >
        {initial}
      </div>
      {isSelected && (
        <motion.div
          layoutId="icon-glow"
          className={`absolute inset-0 -z-10 bg-gradient-to-br ${gradient} opacity-20 blur-xl`}
        />
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center text-white/40">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#007acc]/20 bg-[#0f1720]">
        <div className="absolute h-20 w-20 animate-spin rounded-full border border-transparent border-t-[#007acc]/70" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#52ee52] shadow-[0_0_10px_rgba(82,238,82,0.6)]" />
      </div>
      <div className="space-y-2">
        <p className="font-mono text-sm uppercase tracking-[0.28em] text-[#7db4ff]">
          fetching dependencies...
        </p>
        <p className="max-w-md text-[13px] leading-relaxed text-white/35">
          Syncing repository metadata and README sections from GitHub.
        </p>
      </div>
    </div>
  );
}

function ProjectRowSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-xl px-3 py-3.5">
      <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-white/[0.06]" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="h-3 w-2/3 animate-pulse rounded bg-white/[0.08]" />
        <div className="h-2.5 w-1/3 animate-pulse rounded bg-white/[0.05]" />
        <div className="h-2.5 w-full animate-pulse rounded bg-white/[0.05]" />
      </div>
    </div>
  );
}

function getStatusMeta(loadState: LoadState) {
  if (loadState === "supabase") {
    return {
      dotClass: "bg-[#00d1ff] shadow-[0_0_8px_rgba(0,209,255,0.5)]",
      label: "Supabase",
      textClass: "text-[#00d1ff]/80",
    };
  }

  if (loadState === "github") {
    return {
      dotClass:
        "bg-[#52ee52] shadow-[0_0_8px_rgba(82,238,82,0.5)]",
      label: "Live Sync",
      textClass: "text-white/35",
    };
  }

  if (loadState === "fallback") {
    return {
      dotClass:
        "bg-[#ffb347] shadow-[0_0_8px_rgba(255,179,71,0.45)]",
      label: "Fallback",
      textClass: "text-[#ffb347]/80",
    };
  }

  return {
    dotClass: "animate-pulse bg-[#007acc] shadow-[0_0_8px_rgba(0,122,204,0.45)]",
    label: "Syncing",
    textClass: "text-[#7db4ff]/80",
  };
}

function getProjectTags(project: Project): string[] {
  const topicTags = (project.topics ?? [])
    .filter(Boolean)
    .slice(0, 4)
    .map((topic) => `#${topic}`);

  if (topicTags.length > 0) {
    return topicTags;
  }

  const categoryTags = Object.entries(projectCategories)
    .filter(([, ids]) => ids.includes(project.id))
    .map(([category]) => `#${category.split(" ")[0]}`);

  if (categoryTags.length > 0) {
    return categoryTags;
  }

  return [`#${project.type.split(" ")[0]}`, `#${project.primaryTech.split(" ")[0]}`];
}

function openExternalLink(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function ProjectsTab() {
  const fallbackVisibleProjects = useMemo(
    () =>
      sortProjectsByUpdatedAt(
        fallbackProjects.filter((project) => !isForkedProject(project)),
      ),
    [],
  );

  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [projectData, setProjectData] = useState<Project[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [activeTab, setActiveTab] = useState<"details" | "architecture" | "changelog">(
    "details",
  );

  useEffect(() => {
    let cancelled = false;

    async function hydrateProjects() {
      try {
        const response = await fetch("/api/github-projects", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`GitHub projects request failed: ${response.status}`);
        }

        const projectSource = response.headers.get("x-project-source");
        const payload = (await response.json()) as unknown;

        if (!Array.isArray(payload)) {
          throw new Error("GitHub projects payload was not an array.");
        }

        const syncedProjects = sortProjectsByUpdatedAt(
          payload.filter(
            (project): project is Project =>
              Boolean(project) &&
              typeof project === "object" &&
              "id" in project &&
              "name" in project &&
              "links" in project,
          ),
        );

        if (cancelled) {
          return;
        }

        setProjectData(
          syncedProjects.length > 0 ? syncedProjects : fallbackVisibleProjects,
        );
        
        let finalState: LoadState = "fallback";
        if (projectSource === "supabase") {
          finalState = "supabase";
        } else if (projectSource === "github" && syncedProjects.length > 0) {
          finalState = "github";
        }
        
        setLoadState(finalState);
      } catch {
        if (cancelled) {
          return;
        }

        setProjectData(fallbackVisibleProjects);
        setLoadState("fallback");
      }
    }

    void hydrateProjects();

    return () => {
      cancelled = true;
    };
  }, [fallbackVisibleProjects]);

  const visibleProjects = useMemo(
    () =>
      sortProjectsByUpdatedAt(
        (projectData ?? []).filter((project) => !isForkedProject(project)),
      ),
    [projectData],
  );

  useEffect(() => {
    if (visibleProjects.length === 0) {
      if (selectedProjectId) {
        setSelectedProjectId("");
      }
      return;
    }

    if (!visibleProjects.some((project) => project.id === selectedProjectId)) {
      setSelectedProjectId(visibleProjects[0].id);
    }
  }, [selectedProjectId, visibleProjects]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return visibleProjects.filter((project) => {
      if (!normalizedQuery) {
        return true;
      }

      return (
        project.name.toLowerCase().includes(normalizedQuery) ||
        project.type.toLowerCase().includes(normalizedQuery) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(normalizedQuery))
      );
    });
  }, [searchQuery, visibleProjects]);

  const selectedProject =
    visibleProjects.find((project) => project.id === selectedProjectId) ??
    visibleProjects[0];
  const statusMeta = getStatusMeta(loadState);

  return (
    <div className="flex h-full w-full flex-row overflow-hidden bg-[#0d0d0d] text-[13px] text-[#cccccc] selection:bg-[#007acc]/30">
      <div className="flex w-[320px] shrink-0 flex-col border-r border-white/5 bg-[#141414]">
        <div className="flex shrink-0 flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">
              Marketplace
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-[0.14em] ${statusMeta.textClass}`}>
                {statusMeta.label}
              </span>
              <div className={`h-1.5 w-1.5 rounded-full ${statusMeta.dotClass}`} />
            </div>
          </div>

          <div className="relative group">
            <input
              type="text"
              placeholder="Search by tech, name, or domain..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-3.5 py-2 text-[12px] text-[#e0e0e0] placeholder-[#666] outline-none transition-all focus:border-[#007acc]/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-[#007acc]/10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-white/20 hover:text-white/60"
              >
                x
              </button>
            )}
          </div>
        </div>

        <div className="ide-scrollbar flex-1 overflow-y-auto overflow-x-hidden space-y-0.5 px-2">
          {loadState === "loading" && visibleProjects.length === 0 ? (
            Array.from({ length: 7 }, (_, index) => (
              <ProjectRowSkeleton key={index} />
            ))
          ) : filteredProjects.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const isSelected = selectedProjectId === project.id;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={project.id}
                    onClick={() => {
                      setSelectedProjectId(project.id);
                      setActiveTab("details");
                    }}
                    className={`group relative flex cursor-pointer items-center gap-4 rounded-xl px-3 py-3.5 transition-all duration-200 ${
                      isSelected ? "bg-white/[0.06] shadow-inner" : "hover:bg-white/[0.03]"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute left-0 h-6 w-1 rounded-r-full bg-[#007acc] shadow-[0_0_12px_rgba(0,122,204,0.6)]"
                      />
                    )}

                    <ExtensionIcon project={project} isSelected={isSelected} />

                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`truncate font-semibold tracking-tight transition-colors ${
                            isSelected
                              ? "text-white"
                              : "text-[#b0b0b0] group-hover:text-white"
                          }`}
                        >
                          {project.name}
                        </span>
                        <span className="shrink-0 text-[10px] font-medium text-white/20 tabular-nums">
                          v{project.techStack.length}.0
                        </span>
                      </div>

                      <span className="truncate text-[11px] font-medium text-[#007acc]/80">
                        Itinerant18
                      </span>

                      <span className="line-clamp-1 text-[11px] leading-tight text-[#888] group-hover:text-[#aaa]">
                        {project.shortDescription}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center px-6 text-center text-white/30">
              <div className="space-y-2">
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/45">
                  no matches
                </p>
                <p className="text-[13px] leading-relaxed">
                  Adjust the query to search across repository names, types, and tech
                  stack.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="ide-scrollbar relative flex flex-1 flex-col overflow-y-auto bg-[#0d0d0d]">
        {loadState === "loading" && visibleProjects.length === 0 ? (
          <LoadingState />
        ) : selectedProject ? (
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col"
          >
            <div className="relative overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent px-10 py-12">
              <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#007acc]/10 blur-[100px]" />

              <div className="relative z-10 flex gap-10">
                <div className="relative shrink-0">
                  <div className="flex h-[140px] w-[140px] items-center justify-center rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-[60px] font-bold text-white shadow-2xl ring-1 ring-white/10">
                    {selectedProject.name.charAt(0)}
                  </div>
                  <div className="absolute -inset-2 -z-10 rounded-[40px] bg-gradient-to-br from-[#007acc]/20 to-transparent blur-2xl" />
                </div>

                <div className="flex flex-col justify-center gap-4 py-2">
                  <div className="space-y-1">
                    <h1 className="text-[40px] font-bold leading-none tracking-tighter text-white">
                      {selectedProject.name}
                    </h1>
                    <div className="flex items-center gap-3 text-[14px]">
                      <span className="font-semibold text-[#007acc]">Itinerant18</span>
                      <span className="text-white/20">|</span>
                      <span className="flex items-center gap-1.5 text-white/40">
                        <span className="h-2 w-2 rounded-full bg-[#52ee52]" />
                        {loadState === "github" ? "GitHub Synced" : "Fallback Snapshot"}
                      </span>
                    </div>
                  </div>

                  <p className="max-w-xl text-[15px] leading-relaxed text-white/60">
                    {selectedProject.shortDescription}
                  </p>

                  <div className="flex items-center gap-3 pt-4">
                    <button
                      onClick={() => openExternalLink(selectedProject.links.github)}
                      className="flex items-center gap-2 rounded-lg bg-[#007acc] px-6 py-2.5 font-bold text-white shadow-lg shadow-[#007acc]/20 transition-all hover:scale-[1.02] hover:bg-[#0088e6] active:scale-[0.98]"
                    >
                      Repository
                    </button>
                    {selectedProject.links.demo && (
                      <button
                        onClick={() =>
                          selectedProject.links.demo &&
                          openExternalLink(selectedProject.links.demo)
                        }
                        className="rounded-lg border border-white/10 bg-white/5 px-6 py-2.5 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10"
                      >
                        View Demo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky top-0 z-20 flex border-y border-white/5 bg-[#0d0d0d]/80 px-10 backdrop-blur-xl">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-6 py-4 font-bold transition-all ${
                  activeTab === "details"
                    ? "border-b-2 border-[#007acc] text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`px-6 py-4 font-bold transition-all ${
                  activeTab === "architecture"
                    ? "border-b-2 border-[#007acc] text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Architecture
              </button>
              <button
                onClick={() => setActiveTab("changelog")}
                className={`px-6 py-4 font-bold transition-all ${
                  activeTab === "changelog"
                    ? "border-b-2 border-[#007acc] text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Changelog
              </button>
            </div>

            <div className="mx-auto w-full max-w-5xl px-10 py-12 pb-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedProject.id}-${activeTab}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-[1fr_240px] gap-16"
                >
                  <div className="space-y-12">
                    {activeTab === "details" && (
                      <>
                        <section className="space-y-4">
                          <h2 className="flex items-center gap-3 text-xl font-bold text-white">
                            <span className="h-6 w-1 rounded-full bg-[#007acc]" />
                            Problem Addressed
                          </h2>
                          <p className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-[15px] leading-relaxed text-white/70">
                            {selectedProject.problem}
                          </p>
                        </section>

                        <section className="space-y-6">
                          <h2 className="flex items-center gap-3 text-xl font-bold text-white">
                            <span className="h-6 w-1 rounded-full bg-[#007acc]" />
                            Key Features
                          </h2>
                          <div className="grid grid-cols-2 gap-4">
                            {selectedProject.features.map((feature, index) => (
                              <div
                                key={`${selectedProject.id}-feature-${index}`}
                                className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.01] p-4 transition-colors hover:bg-white/[0.03]"
                              >
                                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#007acc]/60" />
                                <span className="text-[14px] text-white/80">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </section>

                        <section className="space-y-4">
                          <h2 className="flex items-center gap-3 text-xl font-bold text-white">
                            <span className="h-6 w-1 rounded-full bg-[#007acc]" />
                            Technology Stack
                          </h2>
                          <div className="flex flex-wrap gap-2.5 pt-2">
                            {selectedProject.techStack.map((tech) => (
                              <TechBadge key={tech} tech={tech} />
                            ))}
                          </div>
                        </section>
                      </>
                    )}

                    {activeTab === "architecture" && (
                      <section className="space-y-10">
                        <h2 className="flex items-center gap-3 text-xl font-bold text-white">
                          <span className="h-6 w-1 rounded-full bg-[#007acc]" />
                          System Architecture
                        </h2>

                        <div className="space-y-4">
                          <h3 className="text-[12px] font-bold uppercase tracking-widest text-white/40">
                            High-Level Flow
                          </h3>
                          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 font-mono text-[14px] leading-relaxed text-[#007acc]/90 shadow-inner">
                            <div className="mb-6 flex items-center gap-2 opacity-50">
                              <div className="h-2 w-2 rounded-full bg-[#007acc]" />
                              <span>Architectural Logic</span>
                            </div>
                            <p className="whitespace-pre-wrap rounded-xl border border-white/5 bg-black/20 p-4 text-white/80">
                              {selectedProject.highLevel || selectedProject.architecture}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <h3 className="text-[12px] font-bold uppercase tracking-widest text-white/40">
                              Operational Flows
                            </h3>
                            <div className="space-y-3">
                              {(selectedProject.flows ?? [
                                "Standard request-response flow.",
                              ]).map((flow, index) => (
                                <div
                                  key={`${selectedProject.id}-flow-${index}`}
                                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.01] p-3 text-[13px] text-white/70"
                                >
                                  <span className="font-bold text-[#007acc]">
                                    0{index + 1}
                                  </span>
                                  {flow}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-[12px] font-bold uppercase tracking-widest text-white/40">
                              Data Schema
                            </h3>
                            <div className="space-y-3">
                              {(selectedProject.dataModels ?? [
                                "Dynamic state models.",
                              ]).map((model) => (
                                <div
                                  key={model}
                                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.01] p-3 font-mono text-[13px] text-white/70"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#52ee52]/40" />
                                  {model}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-white/5 pt-8">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4">
                              <span className="mb-1 block text-[10px] font-bold uppercase text-white/20">
                                Backend
                              </span>
                              <span className="text-[12px] text-white/60">
                                {selectedProject.backend || "Client-side"}
                              </span>
                            </div>
                            <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4">
                              <span className="mb-1 block text-[10px] font-bold uppercase text-white/20">
                                Storage
                              </span>
                              <span className="text-[12px] text-white/60">
                                {selectedProject.dataStorage || "Local State"}
                              </span>
                            </div>
                            <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4">
                              <span className="mb-1 block text-[10px] font-bold uppercase text-white/20">
                                Scale
                              </span>
                              <span className="text-[12px] text-white/60">
                                Distributed
                              </span>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}

                    {activeTab === "changelog" && (
                      <section className="space-y-6">
                        <h2 className="flex items-center gap-3 text-xl font-bold text-white">
                          <span className="h-6 w-1 rounded-full bg-[#007acc]" />
                          Release History
                        </h2>
                        <div className="space-y-4">
                          {(selectedProject.changelog ?? [
                            "No changes recorded.",
                          ]).map((change, index) => (
                            <div
                              key={`${selectedProject.id}-change-${index}`}
                              className="group relative flex items-center gap-6 rounded-2xl border border-white/5 bg-white/[0.01] p-5 transition-all hover:bg-white/[0.03]"
                            >
                              <div className="flex flex-col items-center gap-1">
                                <div className="h-2 w-2 rounded-full bg-[#007acc]/40 transition-colors group-hover:bg-[#007acc]" />
                                <div className="h-8 w-0.5 bg-white/5" />
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold uppercase text-white/20">
                                  Update log #
                                  {selectedProject.changelog?.length
                                    ? selectedProject.changelog.length - index
                                    : 1}
                                </span>
                                <span className="text-[14px] text-white/80">{change}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                      <div>
                        <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-white/30">
                          Classification
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between gap-4">
                            <span className="text-white/40">Type</span>
                            <span className="text-right font-medium text-white/80">
                              {selectedProject.type}
                            </span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-white/40">Tech</span>
                            <span className="text-right font-medium text-[#007acc]">
                              {selectedProject.primaryTech}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="h-px bg-white/5" />

                      <div>
                        <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-white/30">
                          Domains
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {getProjectTags(selectedProject).map((tag) => (
                            <span
                              key={tag}
                              className="cursor-default text-[12px] text-white/80 transition-colors hover:text-[#007acc]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-white/20">
            <div className="h-16 w-16 animate-spin rounded-full border-2 border-dashed border-white/10" />
            <p className="font-mono text-sm uppercase tracking-widest">
              No repositories available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
