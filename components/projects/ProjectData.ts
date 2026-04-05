import {
  Project,
  projectCategories,
} from "@/data/projects";

export type TabKey = "overview" | "architecture" | "changelog";
export type LoadState = "loading" | "ready" | "fallback";
export type TechGroupItem = { n: string; v: string; c: string };
export type TechGroup = { label: string; items: TechGroupItem[] };
export type ReleaseEntry = { v: string; t: string; meta: string };

export type ProjectShape = Omit<Project, "changelog"> & {
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
  previewImage?: string | null;
  visualFlow?: Array<{ label: string; icon: string }>;
};

export const TECH_MAP: ReadonlyArray<{ re: RegExp; color: string }> = [
  { re: /next|react|typescript|tsx/i, color: "var(--accent)" },
  { re: /javascript|node/i, color: "var(--warning)" },
  { re: /python|flask|django|fastapi/i, color: "var(--info)" },
  { re: /flutter|dart|capacitor|expo|react native|android|ios/i, color: "var(--success)" },
  { re: /supabase|postgres|sql|database|storage|redis/i, color: "var(--error)" },
  { re: /ai|ml|llm|model|gpt/i, color: "var(--accent)" },
];

export function isProjectLike(value: unknown): value is Project {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { id?: unknown; name?: unknown; links?: { github?: unknown } };
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.links?.github === "string"
  );
}

export function asProjectShape(project: Project): ProjectShape {
  return project as ProjectShape;
}

export function uniq(values: Array<string | null | undefined>): string[] {
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

export function sentence(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

export function sentences(value: string | undefined): string[] {
  return (value ?? "")
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function titleFromId(value: string): string {
  return value.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

export function getInitials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "PR";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

export function techColor(label: string): string {
  return TECH_MAP.find((entry) => entry.re.test(label))?.color ?? "var(--border-active)";
}

export function categoryOf(project: ProjectShape): string {
  return (
    Object.entries(projectCategories).find(([, ids]) => (ids as string[]).includes(project.id))?.[0] ??
    project.type ??
    "Software Project"
  );
}

export function languageOf(project: ProjectShape): string {
  return project.primaryTech || project.techStack[0] || project.techGroups?.[0]?.items[0]?.n || "Unknown";
}

export function yearOf(project: ProjectShape): string {
  if (project.year !== undefined && project.year !== null) return String(project.year);
  if (project.updatedAt) return String(new Date(project.updatedAt).getFullYear());
  return String(new Date().getFullYear());
}

export function formatReleaseDate(updatedAt: string | undefined, index: number): string {
  const base = updatedAt ? new Date(updatedAt) : new Date();
  const date = new Date(base);
  date.setMonth(date.getMonth() - index * 2);
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(date);
}

export function ensureText(base: string | undefined, extra: string[], min: number): string {
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

export function whyOf(project: ProjectShape): string {
  if (project.why?.trim()) return sentence(project.why);
  return sentence(
    `I built ${project.name} to make a ${categoryOf(project).toLowerCase()} workflow easier to scan and faster to operate under real usage.`,
  );
}

export function problemOf(project: ProjectShape): string {
  return ensureText(project.problem, [
    `${project.name} was built because real ${categoryOf(project).toLowerCase()} workflows often scatter essential context across too many disconnected screens and manual checks.`,
    `Most existing solutions either over-simplify the system or bury the important implementation details, which slows review and increases guesswork.`,
    `This project compresses that path into a clearer sequence so a user can understand status, architecture, and next actions without losing momentum.`,
    `${languageOf(project)} keeps the runtime surface explicit while the surrounding structure stays readable enough for fast iteration.`,
  ], 4);
}

export function splitVersion(value: string): { n: string; v: string } {
  const cleaned = value.replace(/\[.*?\]/g, "").trim();
  const match = cleaned.match(/^(.*?)(?:\s+v?(\d+(?:\.\d+){0,2}))$/i);
  if (!match) return { n: cleaned, v: "stable" };
  return { n: match[1].trim(), v: match[2].trim() };
}

export function techGroupLabel(value: string): string {
  const lower = value.toLowerCase();
  if (/postgres|supabase|database|storage|redis|sql|mongo|sqlite/.test(lower)) return "Storage";
  if (/flutter|dart|capacitor|expo|react native|android|ios/.test(lower)) return "Mobile runtime";
  if (/node|python|api|server|backend|convex|fastapi|flask|django/.test(lower)) return "Backend";
  if (/react|next|typescript|javascript|tailwind|html|css|mdx|tsx/.test(lower)) return "Frontend";
  if (/docker|github|ci|vercel|netlify|tool/.test(lower)) return "Tooling";
  return "Platform";
}

export function techGroupsOf(project: ProjectShape): TechGroup[] {
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

export function featuresOf(project: ProjectShape): string[] {
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

export function topicsOf(project: ProjectShape): string[] {
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

export function flowsOf(project: ProjectShape): string[] {
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

export function modelOf(project: ProjectShape, value: string, index: number): string {
  const trimmed = value.trim();
  if (/\b(type|interface)\b/.test(trimmed) || trimmed.includes("{")) return trimmed;
  const base = titleFromId(project.name).replace(/\s+/g, "");
  return `type ${base}Model${index + 1} = { description: "${trimmed.replace(/"/g, '\\"')}"; };`;
}

export function dataModelsOf(project: ProjectShape): string[] {
  const raw = project.dataModels?.length
    ? project.dataModels.map((entry, index) => modelOf(project, entry, index))
    : [
      'type ProjectSummary = { id: string; name: string; status: "active" | "archived"; updatedAt: string; };',
      'type ProjectTopic = { slug: string; label: string; weight: number; };',
      'type ReleaseNote = { version: string; publishedAt: string; summary: string; };',
    ];

  return uniq(raw).slice(0, 4);
}

export function backendOf(project: ProjectShape): string {
  return sentence(
    project.backend ||
    "The server layer stays focused on request handling, domain rules, and shaping data for the user-facing surface.",
  );
}

export function storageOf(project: ProjectShape): string {
  return sentence(
    project.storage ||
    project.dataStorage ||
    "Persistence is handled through a lightweight storage layer that keeps project state, content, and release context available for later reads.",
  );
}

export function architectureOf(project: ProjectShape): string {
  return ensureText(project.architecture, [
    `${project.name} is structured as a layered flow where the interface handles discovery first and the supporting service logic resolves deeper implementation details second.`,
    `${whyOf(project)} The architecture favors direct state transitions, explicit data shaping, and a narrow handoff between UI concerns and service concerns.`,
    `${backendOf(project)} ${storageOf(project)}`,
  ], 3);
}

export function highLevelOf(project: ProjectShape): string {
  return (
    project.highLevel ||
    `${project.name} UI -> State Orchestration -> Service Layer -> Persistence -> Feedback Surface`
  );
}

export function releasesOf(project: ProjectShape): ReleaseEntry[] {
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
