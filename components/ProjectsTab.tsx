"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  VscSearch,
  VscGlobe,
  VscProject,
  VscCode,
  VscChevronDown,
  VscClose,
} from "react-icons/vsc";
import {
  FaGithub,
  FaGlobe,
  FaCode,
  FaSitemap,
  FaTimeline,
  FaWandMagicSparkles,
} from "react-icons/fa6";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import {
  fallbackProjects,
  isForkedProject,
  isHiddenProjectId,
  sortProjectsByUpdatedAt,
} from "@/data/projects";
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
import { projectMotion } from "./projects/motion";

const LANGS = ["All", "TypeScript", "Python", "Dart", "JavaScript"] as const;

const statusConfig = {
  active: { color: "bg-[#1f8a65]", label: "Active", textColor: "text-[#1f8a65]" },
  recent: { color: "bg-[#c08532]", label: "Recent", textColor: "text-[#c08532]" },
  dormant: { color: "bg-[#cf2d56]", label: "Dormant", textColor: "text-[#cf2d56]" },
};

function activityState(updatedAt: string | undefined) {
  if (!updatedAt) {
    return "dormant";
  }

  const days = (Date.now() - new Date(updatedAt).getTime()) / 86400000;
  if (days < 90) return "active";
  if (days < 365) return "recent";
  return "dormant";
}

export default function ProjectsTab() {
  const shouldReduceMotion = useReducedMotion();
  const fallbackList = useMemo(
    () =>
      sortProjectsByUpdatedAt(
        fallbackProjects
          .filter((project) => !isForkedProject(project))
          .filter((project) => !isHiddenProjectId(project.id)),
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
    if (!drawerOpen) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [drawerOpen]);

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
            .filter((project) => !isHiddenProjectId(project.id))
            .filter((project) => project.id !== "Itinerant18"),
        ).map((project) => {
          const shape = asProjectShape(project);
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
      mermaidDiagrams: selectedProject.mermaidDiagrams ?? [],
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
      <div className="flex h-full w-full bg-[#f2f1ed]">
        <aside className="hidden h-full w-80 flex-col border-r border-[var(--border-default)] bg-[#f7f7f4] md:flex">
          <div className="flex-shrink-0 border-b border-[var(--border-default)] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <VscProject className="h-5 w-5 text-[#f54e00]" />
                <h2 className="type-title-sm font-semibold text-[#26251e]">Projects</h2>
              </div>
              <Badge variant="outline" className="gap-1 border-[var(--border-default)]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#1f8a65]" /> Syncing
              </Badge>
            </div>
            <div className="h-9 rounded-md border border-[var(--border-default)] bg-[#ebeae5]" />
          </div>
          <div className="flex-1 p-4 space-y-2 overflow-hidden">
            {Array.from({ length: 9 }, (_, index) => (
              <ProjectRowSkeleton key={`loading-row-${index}`} index={index} />
            ))}
          </div>
        </aside>
        <div className="flex-1 overflow-hidden">
          <LoadingState />
        </div>
      </div>
    );
  }

  if (!selectedProject || !detail) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#f2f1ed] p-8">
        <div className="max-w-md text-center">
          <VscProject className="mx-auto h-12 w-12 text-[#26251e]/20" />
          <h2 className="mt-4 type-sub font-semibold text-[#26251e]">No matching projects</h2>
          <p className="mt-2 type-body text-[#26251e]/60">
            Adjust the search query or language filter to see more projects.
          </p>
          <Button
            variant="outline"
            className="mt-6 border-[var(--border-default)] hover:text-[#cf2d56]"
            onClick={() => {
              setSearchQuery("");
              setLangFilter("All");
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    );
  }

  const selectedProjectStatus = activityState(selectedProject.updatedAt);

  return (
    <div className="flex h-full w-full bg-[#f2f1ed] overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden h-full w-80 flex-col border-r border-[var(--border-default)] bg-[#f7f7f4] md:flex">
        <div className="flex-shrink-0 border-b border-[var(--border-default)] p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <VscProject className="h-5 w-5 text-[#f54e00]" />
              <h2 className="type-title-sm font-semibold text-[#26251e]">Projects</h2>
            </div>
            <Badge variant="outline" className="gap-1 border-[var(--border-default)] font-mono text-[10px]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#1f8a65]" /> Live
            </Badge>
          </div>
          <div className="relative">
            <VscSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#26251e]/40" />
            <Input
              type="text"
              placeholder="Search projects..."
              aria-label="Search projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-[#f2f1ed] border-[var(--border-default)] focus-visible:border-[var(--border-active)]"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {LANGS.map((lang) => (
              <button
                key={lang}
                onClick={() => setLangFilter(lang)}
                className={`pill-tag px-3 py-1 text-[11px] font-medium border transition-all ${
                  langFilter === lang 
                    ? "bg-[#e1e0db] text-[#26251e] border-[#26251e]/15 shadow-sm" 
                    : "bg-[#ebeae5] text-[#26251e]/60 border-transparent hover:text-[#cf2d56] hover:bg-[#e6e5e0]"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="space-y-2 p-4">
            {filteredProjects.map((project) => {
              const language = languageOf(project);
              const status = activityState(project.updatedAt);
              const isActive = selectedProject.id === project.id;

              return (
                <motion.button
                  key={project.id}
                  aria-label={`Open project ${project.name}`}
                  onClick={() => {
                    setSelectedProjectId(project.id);
                    setActiveTab("overview");
                  }}
                  whileHover={shouldReduceMotion ? undefined : { y: -1, scale: 1.005 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
                  className={`w-full rounded-lg border p-3 text-left transition-all ${
                    isActive
                      ? "border-[#f54e00]/35 bg-[#f54e00]/6 shadow-sm"
                      : "border-[var(--border-default)] bg-[#f7f7f4] hover:border-[#f54e00]/20 hover:bg-[#ebeae5]/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        {isActive ? <span className="h-4 w-[2px] rounded-full bg-[#f54e00]" /> : null}
                        <div
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: techColor(project.primaryTech || language) }}
                        />
                        <h3 className="truncate font-semibold text-[13px] text-[#26251e]">{project.name}</h3>
                      </div>
                      <p className="line-clamp-1 type-caption text-[#26251e]/60 leading-tight">
                        {project.shortDescription || "No description provided."}
                      </p>
                      <div className="mt-2 flex items-center gap-2 type-mono-sm text-[#26251e]/40">
                        <span>{language}</span>
                        {isActive ? (
                          <>
                            <span>•</span>
                            <span>{project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : "Unknown"}</span>
                          </>
                        ) : null}
                      </div>
                    </div>
                    <span
                      className={`h-1.5 w-1.5 rounded-full shrink-0 mt-1.5 ${
                        statusConfig[status as keyof typeof statusConfig].color
                      }`}
                    />
                  </div>
                </motion.button>
              );
            })}
            {filteredProjects.length === 0 && (
              <div className="py-8 text-center type-caption italic text-[#26251e]/40">
                No matching repositories.
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex-shrink-0 border-t border-[var(--border-default)] bg-[#f2f1ed]/50 p-4">
          <div className="mb-3 type-sys-micro font-semibold text-[#26251e]/40">
            Activity Legend
          </div>
          <div className="space-y-2">
            {Object.entries(statusConfig).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 type-caption">
                <span className={`h-1.5 w-1.5 rounded-full ${value.color}`} />
                <span className="text-[#26251e]/60">
                  {value.label} {key === "active" && "(<90d)"} {key === "recent" && "(<1y)"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden bg-[#f2f1ed]">
        {/* Mobile Header Toggle */}
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--border-default)] bg-[#f7f7f4] px-4 py-3 md:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:text-[#cf2d56]"
            aria-label="Open project selector"
            onClick={() => setDrawerOpen(true)}
          >
            <VscProject className="h-4 w-4" />
            <span className="font-semibold truncate max-w-[150px] text-[#26251e]">{selectedProject.name}</span>
            <VscChevronDown className="h-4 w-4 text-[#26251e]/40" />
          </Button>
        </div>

        {/* Mobile Sidebar (Drawer) */}
        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={projectMotion.transitions.overlayFade}
                className="fixed inset-0 z-50 bg-[#26251e]/60 backdrop-blur-sm md:hidden"
                onClick={() => setDrawerOpen(false)}
              />
              <motion.aside
                initial={shouldReduceMotion ? false : { y: "100%" }}
                animate={{ y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { y: "100%" }}
                transition={shouldReduceMotion ? projectMotion.transitions.overlayFade : projectMotion.transitions.drawer}
                className="fixed bottom-0 inset-x-0 z-50 flex max-h-[85vh] flex-col rounded-t-2xl border-t border-[var(--border-default)] bg-[#f7f7f4] md:hidden"
              >
                <div className="flex shrink-0 items-center justify-between border-b border-[var(--border-default)] px-6 py-4">
                  <h2 className="type-sub font-semibold text-[#26251e]">Select Project</h2>
                  <Button variant="ghost" size="icon" className="hover:text-[#cf2d56]" onClick={() => setDrawerOpen(false)}>
                    <VscClose className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex shrink-0 flex-col gap-4 border-b border-[var(--border-default)] p-6">
                  <div className="relative">
                    <VscSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#26251e]/40" />
                    <Input
                      type="text"
                      placeholder="Search projects..."
                      aria-label="Search projects in mobile drawer"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 bg-[#f2f1ed] border-[var(--border-default)]"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {LANGS.map((lang) => (
                      <button
                        key={`mob-${lang}`}
                        onClick={() => setLangFilter(lang)}
                        className={`pill-tag px-3 py-1 text-[11px] font-medium transition-all ${
                          langFilter === lang 
                            ? "bg-[#e1e0db] text-[#26251e]" 
                            : "bg-[#ebeae5] text-[#26251e]/60"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
                <ScrollArea className="flex-1 overflow-y-auto p-4 min-h-0">
                  <div className="space-y-2 pb-8">
                    {filteredProjects.map((project) => (
                      <button
                        key={`mob-${project.id}`}
                        aria-label={`Open project ${project.name}`}
                        onClick={() => {
                          setSelectedProjectId(project.id);
                          setActiveTab("overview");
                          setDrawerOpen(false);
                        }}
                        className={`w-full rounded-lg border p-4 text-left transition-all ${
                          selectedProject.id === project.id
                            ? "border-[#f54e00]/30 bg-[#f54e00]/5"
                            : "border-[var(--border-default)] bg-[#f7f7f4]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-[#26251e]">{project.name}</h3>
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              statusConfig[activityState(project.updatedAt) as keyof typeof statusConfig].color
                            }`}
                          />
                        </div>
                        <p className="mt-1 type-caption text-[#26251e]/60 line-clamp-1">
                          {project.shortDescription}
                        </p>
                        <p className="mt-1 type-mono-sm text-[#26251e]/40">{languageOf(project)}</p>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          key={selectedProject.id}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={projectMotion.transitions.sectionIn}
          className="flex-shrink-0 border-b border-[var(--border-default)] bg-gradient-to-br from-[#f54e00]/5 via-[#cf2d56]/5 to-transparent p-6 sm:p-10"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="type-mono-sm border-[var(--border-default)] text-[#26251e]/60">{detail.language}</Badge>
              <Badge variant="outline" className="type-mono-sm border-[var(--border-default)] text-[#26251e]/60">{detail.year}</Badge>
              <Badge
                variant="outline"
                className={`type-mono-sm border-[var(--border-default)] ${statusConfig[selectedProjectStatus as keyof typeof statusConfig].textColor}`}
              >
                {statusConfig[selectedProjectStatus as keyof typeof statusConfig].label}
              </Badge>
            </div>
            <h1 className="mb-4 type-section text-[#26251e]">
              {selectedProject.name}
            </h1>
            <p className="mb-3 type-caption uppercase tracking-[0.1em] text-[#26251e]/45">Category • {detail.category}</p>
            <p className="mb-8 type-body-lg text-[#26251e]/70 max-w-3xl leading-relaxed">
              {detail.tagline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="gap-2 bg-[#26251e] text-[#f2f1ed] hover:bg-[#26251e]/90 hover:text-[#cf2d56] px-5 py-2.5 rounded-lg"
                asChild
              >
                  <a href={selectedProject.links.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="h-4 w-4" /> View on GitHub
                  </a>
                </Button>
              {detail.liveUrl && (
                <Button 
                  variant="outline" 
                  className="gap-2 border-[#26251e]/10 bg-[#ebeae5] text-[#26251e] hover:text-[#cf2d56] px-5 py-2.5 rounded-lg" 
                  asChild
                >
                  <a href={detail.liveUrl} target="_blank" rel="noopener noreferrer">
                    <FaGlobe className="h-4 w-4" /> Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as TabKey)}
            className="flex h-full flex-col"
          >
            <div className="sticky top-0 z-10 flex-shrink-0 border-b border-[var(--border-default)] bg-[#f7f7f4]/90 px-6 sm:px-10 py-0 backdrop-blur-sm">
              <div className="mx-auto max-w-5xl">
                <TabsList className="bg-transparent p-0 h-auto gap-4 sm:gap-8">
                  {[
                    { value: "overview", icon: FaWandMagicSparkles, label: "Overview", mobile: "Over" },
                    { value: "preview", icon: FaGlobe, label: "Preview", mobile: "Prev" },
                    { value: "architecture", icon: FaSitemap, label: "Architecture", mobile: "Arch" },
                    { value: "tech", icon: FaCode, label: "Tech", mobile: "Tech" },
                    { value: "changelog", icon: FaTimeline, label: "Changelog", mobile: "Log" }
                  ].map((tab) => (
                    <TabsTrigger 
                      key={tab.value}
                      value={tab.value} 
                      className="gap-2 py-4 px-0 data-[state=active]:bg-transparent data-[state=active]:text-[#26251e] data-[state=active]:border-b-2 data-[state=active]:border-[#f54e00] rounded-none shadow-none border-0 text-[#26251e]/40 hover:text-[#cf2d56] transition-all"
                    >
                      <tab.icon className="h-4 w-4 shrink-0" /> 
                      <span className="inline sm:hidden type-sys-caption font-medium">{tab.mobile}</span>
                      <span className="hidden sm:inline type-sys-caption font-medium">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            <ScrollArea className="flex-1 min-h-0">
              <div className="mx-auto max-w-5xl p-6 sm:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedProject.id}-${activeTab}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={projectMotion.transitions.tabSwitch}
                  >
                    <TabsContent value="overview" className="mt-0 outline-none">
                      <ProjectOverview detail={detail} project={selectedProject} />
                    </TabsContent>
                    <TabsContent value="preview" className="mt-0 outline-none">
                      <ProjectPreview detail={detail} project={selectedProject} />
                    </TabsContent>
                    <TabsContent value="architecture" className="mt-0 outline-none">
                      <ProjectArchitecture project={selectedProject} />
                    </TabsContent>
                    <TabsContent value="tech" className="mt-0 outline-none">
                      <ProjectTech project={selectedProject} />
                    </TabsContent>
                    <TabsContent value="changelog" className="mt-0 outline-none">
                      <ProjectChangelog project={selectedProject} />
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </div>
            </ScrollArea>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
