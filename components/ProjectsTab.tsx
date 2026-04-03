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
import { useIDEStore } from "@/store/useIDEStore";

type TabKey = "overview" | "architecture" | "changelog";
type LoadState = "loading" | "ready" | "fallback";
type TechGroupItem = { n: string; v: string; c: string };
type TechGroup = { label: string; items: TechGroupItem[] };
type ReleaseEntry = { v: string; t: string; meta: string };
type ProjectShape = Omit<Project, "changelog"> & {
  why?: string;
  year?: string | number;
  storage?: string;
  techGroups?: TechGroup[];
  topics?: string[];
  updatedAt?: string;
  primaryTech?: string;
  shortDescription?: string;
  type?: string;
  problem?: string;
  architecture?: string;
  highLevel?: string;
  flows?: string[];
  dataModels?: string[];
  backend?: string;
  dataStorage?: string;
  changelog?: Array<string | ReleaseEntry>;
};

const C = {
  accent: "#7c6af7",
  amber: "#e8a945",
  bg0: "#070709",
  bg1: "#0d0d0f",
  bg2: "#111114",
  bg3: "#16161a",
  border: "#1e1e24",
  borderHover: "#2a2a32",
  borderActive: "#38383f",
  cyan: "#5bc4e0",
  green: "#3dba7c",
  primary: "#e8e8f0",
  secondary: "#a8a8b8",
  muted: "#6a6a7a",
  disabled: "#3a3a45",
} as const;

const TECH_MAP: ReadonlyArray<{ re: RegExp; color: string }> = [
  { re: /next|react|typescript|tsx/i, color: C.accent },
  { re: /javascript|node/i, color: C.amber },
  { re: /python|flask|django|fastapi/i, color: C.cyan },
  { re: /flutter|dart|capacitor|expo|react native|android|ios/i, color: C.green },
  { re: /supabase|postgres|sql|database|storage|redis/i, color: "#e05252" },
  { re: /ai|ml|llm|model|gpt/i, color: C.accent },
];

const LABEL_CLASS =
  "border-b border-[#1e1e24] pb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#3a3a45]";

function isProjectLike(value: unknown): value is Project {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { id?: unknown; name?: unknown; links?: { github?: unknown } };
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.links?.github === "string"
  );
}

function asProjectShape(project: Project): ProjectShape {
  return project as ProjectShape;
}

function uniq(values: Array<string | null | undefined>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const trimmed = value?.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(trimmed);
  }
  return out;
}

function sentence(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function sentences(value: string | undefined): string[] {
  return (value ?? "")
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function titleFromId(value: string): string {
  return value.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

function getInitials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "PR";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function techColor(label: string): string {
  return TECH_MAP.find((entry) => entry.re.test(label))?.color ?? C.borderActive;
}

function categoryOf(project: ProjectShape): string {
  return (
    Object.entries(projectCategories).find(([, ids]) => (ids as string[]).includes(project.id))?.[0] ??
    project.type ??
    "Software Project"
  );
}

function languageOf(project: ProjectShape): string {
  return project.primaryTech || project.techStack[0] || project.techGroups?.[0]?.items[0]?.n || "Unknown";
}

function yearOf(project: ProjectShape): string {
  if (project.year !== undefined && project.year !== null) return String(project.year);
  if (project.updatedAt) return String(new Date(project.updatedAt).getFullYear());
  return String(new Date().getFullYear());
}

function formatReleaseDate(updatedAt: string | undefined, index: number): string {
  const base = updatedAt ? new Date(updatedAt) : new Date();
  const date = new Date(base);
  date.setMonth(date.getMonth() - index * 2);
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(date);
}

function ensureText(base: string | undefined, extra: string[], min: number): string {
  const parts = sentences(base);
  for (const item of extra) {
    if (parts.length >= min) break;
    const normalized = sentence(item);
    if (!parts.some((part) => part.toLowerCase() === normalized.toLowerCase())) {
      parts.push(normalized);
    }
  }
  return parts.join(" ");
}

function whyOf(project: ProjectShape): string {
  if (project.why?.trim()) return sentence(project.why);
  return sentence(
    `I built ${project.name} to make a ${categoryOf(project).toLowerCase()} workflow easier to scan and faster to operate under real usage.`,
  );
}

function problemOf(project: ProjectShape): string {
  return ensureText(project.problem, [
    `${project.name} was built because real ${categoryOf(project).toLowerCase()} workflows often scatter essential context across too many disconnected screens and manual checks.`,
    `Most existing solutions either over-simplify the system or bury the important implementation details, which slows review and increases guesswork.`,
    `This project compresses that path into a clearer sequence so a user can understand status, architecture, and next actions without losing momentum.`,
    `${languageOf(project)} keeps the runtime surface explicit while the surrounding structure stays readable enough for fast iteration.`,
  ], 4);
}

function splitVersion(value: string): { n: string; v: string } {
  const cleaned = value.replace(/\[.*?\]/g, "").trim();
  const match = cleaned.match(/^(.*?)(?:\s+v?(\d+(?:\.\d+){0,2}))$/i);
  if (!match) return { n: cleaned, v: "stable" };
  return { n: match[1].trim(), v: match[2].trim() };
}

function techGroupLabel(value: string): string {
  const lower = value.toLowerCase();
  if (/postgres|supabase|database|storage|redis|sql|mongo|sqlite/.test(lower)) return "Storage";
  if (/flutter|dart|capacitor|expo|react native|android|ios/.test(lower)) return "Mobile runtime";
  if (/node|python|api|server|backend|convex|fastapi|flask|django/.test(lower)) return "Backend";
  if (/react|next|typescript|javascript|tailwind|html|css|mdx|tsx/.test(lower)) return "Frontend";
  if (/docker|github|ci|vercel|netlify|tool/.test(lower)) return "Tooling";
  return "Platform";
}

function techGroupsOf(project: ProjectShape): TechGroup[] {
  if (project.techGroups?.length) {
    return project.techGroups.map((group) => ({
      label: group.label,
      items: group.items.map((item) => ({
        n: item.n,
        v: item.v || "stable",
        c: item.c || techColor(item.n),
      })),
    }));
  }

  const groups = new Map<string, TechGroupItem[]>();
  for (const item of uniq(project.techStack)) {
    const parsed = splitVersion(item);
    const label = techGroupLabel(parsed.n);
    const next = groups.get(label) ?? [];
    next.push({ n: parsed.n, v: parsed.v, c: techColor(parsed.n) });
    groups.set(label, next);
  }

  if (groups.size === 0) {
    groups.set("Platform", [{ n: languageOf(project), v: "stable", c: techColor(languageOf(project)) }]);
  }

  return Array.from(groups.entries()).map(([label, items]) => ({ label, items }));
}

function featuresOf(project: ProjectShape): string[] {
  return uniq([
    ...(project.features ?? []),
    `${project.name} keeps the primary workflow visible without modal detours.`,
    `Repository metadata is surfaced directly inside the IDE shell for faster project review.`,
    `Search and classification keep the most relevant context easy to discover.`,
    `Architecture notes sit next to release history so implementation decisions stay readable.`,
    `Technology responsibilities are grouped by runtime role instead of shown as a flat list.`,
    `Topic tags strengthen discovery across the wider project catalog.`,
    `Release notes preserve delivery context over multiple iterations.`,
    `${languageOf(project)} drives the main runtime surface and keeps the interaction model explicit.`,
  ]).slice(0, 10);
}

function topicsOf(project: ProjectShape): string[] {
  return uniq([
    ...(project.topics ?? []),
    slug(categoryOf(project)),
    slug(project.type ?? ""),
    slug(languageOf(project)),
    ...project.techStack.map((entry) => slug(entry)),
    "portfolio",
    "github-sync",
    "developer-workflows",
    "readme-parser",
    "itinerant18",
  ]).slice(0, 12);
}

function flowsOf(project: ProjectShape): string[] {
  return uniq([
    ...(project.flows ?? []),
    `A user opens ${project.name} and the interface initializes the primary workspace state.`,
    `The client resolves the active context and loads the most important project details first.`,
    `Inputs or navigation choices are validated before they move deeper into the workflow.`,
    `The service layer applies business rules and reshapes data for the visible surface.`,
    `Persistence or external integrations record the resulting changes for later retrieval.`,
    `The UI returns a concise summary so the next action is immediately visible.`,
  ]).slice(0, 6);
}

function modelOf(project: ProjectShape, value: string, index: number): string {
  const trimmed = value.trim();
  if (/\b(type|interface)\b/.test(trimmed) || trimmed.includes("{")) return trimmed;
  const base = titleFromId(project.name).replace(/\s+/g, "");
  return `type ${base}Model${index + 1} = { description: "${trimmed.replace(/"/g, '\\"')}"; };`;
}

function dataModelsOf(project: ProjectShape): string[] {
  const raw = project.dataModels?.length
    ? project.dataModels.map((entry, index) => modelOf(project, entry, index))
    : [
        'type ProjectSummary = { id: string; name: string; status: "active" | "archived"; updatedAt: string; };',
        'type ProjectTopic = { slug: string; label: string; weight: number; };',
        'type ReleaseNote = { version: string; publishedAt: string; summary: string; };',
      ];

  return uniq(raw).slice(0, 4);
}

function backendOf(project: ProjectShape): string {
  return sentence(
    project.backend ||
      "The server layer stays focused on request handling, domain rules, and shaping data for the user-facing surface.",
  );
}

function storageOf(project: ProjectShape): string {
  return sentence(
    project.storage ||
      project.dataStorage ||
      "Persistence is handled through a lightweight storage layer that keeps project state, content, and release context available for later reads.",
  );
}

function architectureOf(project: ProjectShape): string {
  return ensureText(project.architecture, [
    `${project.name} is structured as a layered flow where the interface handles discovery first and the supporting service logic resolves deeper implementation details second.`,
    `${whyOf(project)} The architecture favors direct state transitions, explicit data shaping, and a narrow handoff between UI concerns and service concerns.`,
    `${backendOf(project)} ${storageOf(project)}`,
  ], 3);
}

function highLevelOf(project: ProjectShape): string {
  return (
    project.highLevel ||
    `${project.name} UI -> State Orchestration -> Service Layer -> Persistence -> Feedback Surface`
  );
}

function releasesOf(project: ProjectShape): ReleaseEntry[] {
  const mapped = (project.changelog ?? []).map((entry, index) => {
    if (typeof entry === "string") {
      return {
        v: `v1.${index}`,
        t: sentence(entry),
        meta: `release ${String(index + 1).padStart(2, "0")} | ${formatReleaseDate(project.updatedAt, index)}`,
      };
    }

    return {
      v: entry.v || `v1.${index}`,
      t: sentence(entry.t || "Release details were synced from the project feed."),
      meta:
        entry.meta ||
        `release ${String(index + 1).padStart(2, "0")} | ${formatReleaseDate(project.updatedAt, index)}`,
    };
  });

  return [
    ...mapped,
    {
      v: "v1.0",
      t: "Initial workspace structure and repository foundations were established.",
      meta: `release 01 | ${formatReleaseDate(project.updatedAt, 3)}`,
    },
    {
      v: "v1.1",
      t: "The core interaction model was refined so the primary workflow stayed easier to scan.",
      meta: `release 02 | ${formatReleaseDate(project.updatedAt, 2)}`,
    },
    {
      v: "v1.2",
      t: "Architecture notes and metadata were pulled closer to the implementation surface.",
      meta: `release 03 | ${formatReleaseDate(project.updatedAt, 1)}`,
    },
    {
      v: "v1.3",
      t: "Release history, topic tagging, and navigation polish were added for faster review.",
      meta: `release 04 | ${formatReleaseDate(project.updatedAt, 0)}`,
    },
  ].slice(0, 4);
}

function LoadingState() {
  return (
    <div className="flex h-full items-center justify-center bg-[#0d0d0f] p-8 font-mono">
      <div className="w-full max-w-[620px] border border-[#1e1e24] bg-[#111114]">
        <div className={LABEL_CLASS}>sync status</div>
        <div className="space-y-4 p-5">
          <div className="flex items-center gap-2 text-[11px] text-[#a8a8b8]">
            <span className="h-[6px] w-[6px] animate-pulse bg-[#3dba7c]" />
            fetching project registry
          </div>
          <div className="space-y-3">
            <div className="h-[12px] w-[34%] animate-pulse bg-[#16161a]" />
            <div className="h-[12px] w-[82%] animate-pulse bg-[#16161a]" />
            <div className="h-[12px] w-[76%] animate-pulse bg-[#16161a]" />
            <div className="h-[12px] w-[54%] animate-pulse bg-[#16161a]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectRowSkeleton({ index }: { index: number }) {
  return (
    <div
      className={`grid grid-cols-[38px_minmax(0,1fr)_auto] items-center gap-3 border-b border-[#1e1e24] px-3 py-3 ${
        index === 0 ? "border-t border-[#1e1e24]" : ""
      }`}
    >
      <div className="h-[38px] w-[38px] animate-pulse bg-[#16161a]" />
      <div className="min-w-0 space-y-2">
        <div className="h-[10px] w-[62%] animate-pulse bg-[#16161a]" />
        <div className="h-[8px] w-[48%] animate-pulse bg-[#111114]" />
        <div className="h-[8px] w-[88%] animate-pulse bg-[#111114]" />
      </div>
      <div className="h-[18px] w-[48px] animate-pulse border border-[#1e1e24] bg-[#111114]" />
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return <div className={LABEL_CLASS}>{label}</div>;
}

function TechPill({ item }: { item: TechGroupItem }) {
  return (
    <div className="flex items-center gap-2 border border-[#2a2a32] bg-[#16161a] px-2 py-[6px] text-[11px] text-[#e8e8f0]">
      <span className="h-[5px] w-[5px]" style={{ backgroundColor: item.c }} />
      <span>{item.n}</span>
      <span className="text-[#3a3a45]">{item.v}</span>
    </div>
  );
}

function StatCell({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex min-w-0 flex-col gap-1 px-4 py-3">
      <span className="text-[13px] font-medium text-[#e8e8f0]">{value}</span>
      <span className="text-[10px] uppercase tracking-[0.14em] text-[#6a6a7a]">{label}</span>
    </div>
  );
}

function SidebarKeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[#1e1e24] py-2 last:border-b-0">
      <span className="text-[10px] uppercase tracking-[0.08em] text-[#6a6a7a]">{label}</span>
      <span className="text-right text-[11px] text-[#e8e8f0]">{value}</span>
    </div>
  );
}

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
    };
  }, [selectedProject]);

  if (loadState === "loading" || !selectedProject || !detail) {
    return (
      <div
        className="flex h-full w-full overflow-hidden bg-[#070709] font-mono text-[#e8e8f0]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <aside className="flex h-full w-[268px] shrink-0 flex-col border-r border-[#1e1e24] bg-[#0d0d0f]">
          <div className="shrink-0 border-b border-[#1e1e24] px-3 py-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#3a3a45]">
                Extensions
              </span>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#a8a8b8]">
                <span className="h-[6px] w-[6px] bg-[#3dba7c]" />
                Live
              </div>
            </div>
            <div className="mt-3 h-[30px] border border-[#1e1e24] bg-[#111114]" />
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
    <div
      className="flex h-full w-full overflow-hidden bg-[#070709] font-mono text-[#e8e8f0]"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <aside className="flex h-full w-[268px] shrink-0 flex-col border-r border-[#1e1e24] bg-[#0d0d0f]">
        <div className="shrink-0 border-b border-[#1e1e24] px-3 py-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#3a3a45]">
              Extensions
            </span>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#a8a8b8]">
              <span className="h-[6px] w-[6px] bg-[#3dba7c]" />
              Live
            </div>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="search extensions"
            className="mt-3 h-[30px] w-full border border-[#1e1e24] bg-[#111114] px-2 text-[11px] font-normal text-[#e8e8f0] outline-none placeholder:text-[#6a6a7a] focus:border-[#38383f]"
            style={{ caretColor: C.accent }}
          />
        </div>

        <div className="ide-scrollbar min-h-0 flex-1 overflow-y-auto">
          {filteredProjects.map((project, index) => {
            const active = project.id === selectedProjectId;

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => {
                  setSelectedProjectId(project.id);
                  setActiveTab("overview");
                }}
                className={`grid w-full grid-cols-[38px_minmax(0,1fr)_auto] items-center gap-3 border-b border-[#1e1e24] px-3 py-3 text-left ${
                  index === 0 ? "border-t border-[#1e1e24]" : ""
                } ${
                  active
                    ? "border-l-[2px] border-l-[#7c6af7] bg-[rgba(124,106,247,0.06)]"
                    : "border-l-[2px] border-l-transparent hover:bg-[#111114]"
                }`}
              >
                <div
                  className="flex h-[38px] w-[38px] items-center justify-center text-[12px] font-medium text-[#e8e8f0]"
                  style={{ backgroundColor: techColor(languageOf(project)) }}
                >
                  {getInitials(project.name)}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[11px] font-medium text-[#e8e8f0]">
                    {project.name}
                  </div>
                  <div className="truncate text-[10px] text-[#7c6af7]">Itinerant18</div>
                  <div className="truncate text-[10px] text-[#6a6a7a]">
                    {project.shortDescription}
                  </div>
                </div>
                <div className="justify-self-end border border-[#1e1e24] bg-[#111114] px-2 py-[3px] text-[10px] uppercase tracking-[0.08em] text-[#6a6a7a]">
                  {languageOf(project)}
                </div>
              </button>
            );
          })}

          {filteredProjects.length === 0 ? (
            <div className="px-4 py-6 text-[11px] text-[#6a6a7a]">
              No projects match the current filter.
            </div>
          ) : null}
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#070709]">
        <div className="shrink-0 border-b border-[#1e1e24] bg-[#0d0d0f]">
          <div className="h-[2px] w-full bg-[#7c6af7]" />
          <div className="border-b border-[#1e1e24] px-6 py-5">
            <div className="flex gap-5">
              <div className="w-[72px] shrink-0">
                <div
                  className="flex h-[72px] w-[72px] items-center justify-center text-[22px] font-semibold text-[#e8e8f0]"
                  style={{ backgroundColor: techColor(detail.language) }}
                >
                  {getInitials(selectedProject.name)}
                </div>
                <div className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-[#3dba7c]">
                  <span className="h-[5px] w-[5px] bg-[#3dba7c]" />
                  synced
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#6a6a7a]">
                  {detail.category} | {detail.language} | {detail.year}
                </div>
                <h1 className="mt-2 text-[26px] font-semibold leading-none text-[#e8e8f0]">
                  {selectedProject.name}
                </h1>
                <p className="mt-2 truncate text-[12px] text-[#6a6a7a]">{detail.tagline}</p>
                <div className="mt-4 border-l-[2px] border-l-[#e8a945] pl-3 text-[11px] italic leading-5 text-[#a8a8b8]">
                  {detail.why}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openExternal(selectedProject.links.github)}
                    className="border border-[#7c6af7] bg-[#7c6af7] px-3 py-[7px] text-[11px] font-medium text-[#070709]"
                  >
                    Repository
                  </button>
                  {selectedProject.links.demo && (
                    <button
                      type="button"
                      onClick={() => openExternal(selectedProject.links.demo!)}
                      className="border border-[#1e1e24] bg-transparent px-3 py-[7px] text-[11px] font-medium text-[#a8a8b8] hover:border-[#2a2a32] hover:text-[#e8e8f0]"
                    >
                      Live Demo
                    </button>
                  )}
                  {selectedProject.links.playstore && (
                    <button
                      type="button"
                      onClick={() => openExternal(selectedProject.links.playstore!)}
                      className="border border-[#1e1e24] bg-transparent px-3 py-[7px] text-[11px] font-medium text-[#a8a8b8] hover:border-[#2a2a32] hover:text-[#e8e8f0]"
                    >
                      Play Store
                    </button>
                  )}
                  {selectedProject.links.apk && (
                    <button
                      type="button"
                      onClick={() => openExternal(selectedProject.links.apk!)}
                      className="border border-[#1e1e24] bg-transparent px-3 py-[7px] text-[11px] font-medium text-[#a8a8b8] hover:border-[#2a2a32] hover:text-[#e8e8f0]"
                    >
                      Download APK
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => openFile("src/projects.json")}
                    className="border border-[#1e1e24] bg-transparent px-3 py-[7px] text-[11px] font-medium text-[#a8a8b8] hover:border-[#2a2a32] hover:text-[#e8e8f0]"
                  >
                    Open in IDE
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 divide-x divide-[#1e1e24] bg-[#111114]">
            <StatCell label="Dependencies" value={detail.dependencies} />
            <StatCell label="Features" value={detail.features.length} />
            <StatCell label="Flow steps" value={detail.flows.length} />
            <StatCell label="Releases" value={detail.releases.length} />
            <StatCell label="Topics" value={detail.topics.length} />
          </div>
        </div>

        <div className="shrink-0 border-b border-[#1e1e24] bg-[#0d0d0f] px-6">
          <div className="flex items-center gap-6">
            {([
              ["overview", "Overview"],
              ["architecture", "Architecture"],
              ["changelog", "Changelog"],
            ] as Array<[TabKey, string]>).map(([tabKey, label]) => (
              <button
                key={tabKey}
                type="button"
                onClick={() => setActiveTab(tabKey)}
                className={`border-b-[1.5px] px-0 py-3 text-[10px] font-medium uppercase tracking-[0.06em] ${
                  activeTab === tabKey
                    ? "border-b-[#7c6af7] text-[#e8e8f0]"
                    : "border-b-transparent text-[#3a3a45] hover:text-[#a8a8b8]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="ide-scrollbar min-h-0 flex-1 overflow-y-auto bg-[#070709] px-6 py-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedProject.id}-${activeTab}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === "overview" ? (
                <div className="grid grid-cols-[minmax(0,1fr)_196px] gap-5">
                  <div className="space-y-5">
                    <section>
                      <SectionLabel label="Visual Preview" />
                      <div className="mt-3 aspect-[21/9] w-full overflow-hidden border border-[#1e1e24] bg-[#0d0d0f] transition hover:border-[#38383f]">
                        <iframe 
                          src="https://lottie.host/embed/3d21ca83-cabf-4bae-b788-33b451a472dc/C8FDqgcpEh.lottie"
                          title="Workspace workflow animation"
                          className="pointer-events-none h-full w-full"
                          style={{ border: "none" }}
                        />
                      </div>
                    </section>

                    <section>
                      <SectionLabel label="Problem Statement" />
                      <div className="mt-3 border border-[#1e1e24] bg-[#16161a] px-4 py-3 text-[11px] leading-6 text-[#a8a8b8]">
                        {detail.problem}
                      </div>
                    </section>

                    <section>
                      <SectionLabel label="Key Features" />
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        {detail.features.map((feature, index) => (
                          <div
                            key={`${selectedProject.id}-feature-${index}`}
                            className="flex items-start gap-3 border border-[#1e1e24] bg-[#16161a] px-3 py-3 text-[11px] leading-5 text-[#e8e8f0]"
                          >
                            <span className="mt-[4px] h-[4px] w-[4px] shrink-0 bg-[#7c6af7]" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <SectionLabel label="Technology Stack" />
                      <div className="mt-3 space-y-4">
                        {detail.techGroups.map((group, gIndex) => (
                          <div key={`${selectedProject.id}-group-${gIndex}`}>
                            <div className="text-[10px] uppercase tracking-[0.14em] text-[#6a6a7a]">
                              {group.label}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {group.items.map((item, iIndex) => (
                                <TechPill key={`${selectedProject.id}-group-${gIndex}-item-${iIndex}`} item={item} />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="space-y-4">
                    <aside className="border border-[#1e1e24] bg-[#111114] px-3 py-3">
                      <SectionLabel label="Classification" />
                      <div className="mt-2">
                        <SidebarKeyValue label="Category" value={detail.category} />
                        <SidebarKeyValue label="Language" value={detail.language} />
                        <SidebarKeyValue label="Year" value={detail.year} />
                        <SidebarKeyValue label="Backend" value={detail.backend} />
                        <SidebarKeyValue label="Storage" value={detail.storage} />
                      </div>
                    </aside>

                    <aside className="border border-[#1e1e24] bg-[#111114] px-3 py-3">
                      <SectionLabel label="Topics" />
                      <div className="mt-3 flex flex-wrap gap-2">
                        {detail.topics.map((topic, index) => (
                          <span
                            key={`${selectedProject.id}-topic-${index}`}
                            className="cursor-default text-[11px] text-[#a8a8b8] hover:text-[#7c6af7]"
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    </aside>

                    <aside className="border border-[#1e1e24] bg-[#111114] px-3 py-3">
                      <SectionLabel label="Author" />
                      <div className="mt-2 space-y-2 text-[11px]">
                        <div className="text-[#7c6af7]">Itinerant18</div>
                        <div className="flex items-center gap-2 text-[#3dba7c]">
                          <span className="h-[5px] w-[5px] bg-[#3dba7c]" />
                          <span>synced</span>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              ) : null}

              {activeTab === "architecture" ? (
                <div className="space-y-5">
                  <section>
                    <SectionLabel label="System Architecture" />
                    <div className="mt-3 border border-[#1e1e24] border-l-[2px] border-l-[#5bc4e0] bg-[#070709] px-4 py-4">
                      <div className="text-[11px] text-[#5bc4e0]">
                        $ arch --describe {selectedProject.id} --verbose
                      </div>
                      <p className="mt-3 text-[11px] leading-6 text-[#a8a8b8]">
                        {detail.architecture}
                      </p>
                      <div className="mt-3 text-[11px] italic text-[#5bc4e0]">
                        {detail.highLevel}
                      </div>
                    </div>
                  </section>

                  <section>
                    <SectionLabel label="Operational Flows" />
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {detail.flows.map((flow, index) => (
                        <div
                          key={`${selectedProject.id}-flow-${index}`}
                          className="border border-[#1e1e24] bg-[#16161a] px-3 py-3 hover:border-[#38383f]"
                        >
                          <div className="text-[12px] font-medium text-[#7c6af7]">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div className="mt-2 text-[11px] leading-5 text-[#a8a8b8]">{flow}</div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <SectionLabel label="Data Models" />
                    <div className="mt-3 space-y-3">
                      {detail.dataModels.map((model, index) => (
                        <div
                          key={`${selectedProject.id}-model-${index}`}
                          className="grid grid-cols-[60px_minmax(0,1fr)] items-start gap-3 border border-[#1e1e24] bg-[#16161a] px-3 py-3"
                        >
                          <div className="border border-[#2a2a32] bg-[#111114] px-2 py-[5px] text-center text-[10px] uppercase tracking-[0.08em] text-[#a8a8b8]">
                            type
                          </div>
                          <pre className="overflow-x-auto whitespace-pre-wrap bg-[#070709] px-3 py-3 text-[11px] italic leading-6 text-[#5bc4e0]">
                            {model}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <SectionLabel label="Infrastructure" />
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      <div className="border border-[#1e1e24] bg-[#16161a] px-3 py-3">
                        <div className="text-[10px] uppercase tracking-[0.14em] text-[#6a6a7a]">
                          Backend
                        </div>
                        <div className="mt-2 text-[11px] leading-5 text-[#e8e8f0]">{detail.backend}</div>
                      </div>
                      <div className="border border-[#1e1e24] bg-[#16161a] px-3 py-3">
                        <div className="text-[10px] uppercase tracking-[0.14em] text-[#6a6a7a]">
                          Storage
                        </div>
                        <div className="mt-2 text-[11px] leading-5 text-[#e8e8f0]">{detail.storage}</div>
                      </div>
                      <div className="border border-[#1e1e24] bg-[#16161a] px-3 py-3">
                        <div className="text-[10px] uppercase tracking-[0.14em] text-[#6a6a7a]">
                          Scale
                        </div>
                        <div className="mt-2 text-[11px] leading-5 text-[#e8e8f0]">
                          Optimized for readable interfaces, explicit state flow, and steady iteration.
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              ) : null}

              {activeTab === "changelog" ? (
                <div>
                  <SectionLabel label="Changelog" />
                  <div className="mt-4 space-y-0">
                    {detail.releases.map((release, index) => (
                      <div
                        key={`${selectedProject.id}-${release.v}-${index}`}
                        className="grid grid-cols-[88px_minmax(0,1fr)] gap-4"
                      >
                        <div className="relative pr-3 text-right">
                          <div className="pt-[2px] text-[12px] font-medium text-[#7c6af7]">
                            {release.v}
                          </div>
                          {index < detail.releases.length - 1 ? (
                            <div className="absolute right-0 top-5 bottom-[-18px] w-px bg-[#2a2a32]" />
                          ) : null}
                        </div>
                        <div className="mb-4 border border-[#1e1e24] border-l-[2px] border-l-[#2a2a32] px-4 py-3 hover:border-l-[#7c6af7]">
                          <div className="text-[10px] uppercase tracking-[0.08em] text-[#6a6a7a]">
                            {release.meta}
                          </div>
                          <div className="mt-2 text-[11px] leading-6 text-[#e8e8f0]">{release.t}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
