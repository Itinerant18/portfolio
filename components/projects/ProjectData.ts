import { Project, projectCategories } from "@/data/projects";

export type TabKey = "overview" | "preview" | "architecture" | "tech" | "changelog";
export type LoadState = "loading" | "ready" | "fallback";
export type TechGroupItem = { n: string; v: string; c: string };
export type TechGroup = { label: string; items: TechGroupItem[] };
export type ReleaseEntry = { v: string; t: string; meta: string; url?: string };

export interface ProjectDetail {
  architecture: string | null;
  backend: string | null;
  category: string;
  dataModels: string[];
  dataStorage: string | null;
  features: string[];
  flows: string[];
  problem: string | null;
  language: string;
  tagline: string;
  techGroups: TechGroup[];
  topics: string[];
  visualFlow: Array<{ label: string; icon: string }>;
  year: string;
  previewImage: string | null;
  previewImages: string[];
  liveUrl: string | null;
}

export type ProjectShape = Omit<Project, "changelog"> & {
  year?: string | number;
  techGroups?: TechGroup[];
  topics?: string[];
  updatedAt?: string;
  primaryTech?: string;
  shortDescription?: string;
  type?: string;
  architecture?: string;
  backend?: string;
  dataModels?: string[];
  dataStorage?: string;
  features?: string[];
  flows?: string[];
  problem?: string;
  previewImage?: string | null;
  previewImages?: string[];
  liveUrl?: string | null;
  size?: number;
  visualFlow?: Array<{ label: string; icon: string }>;
  highLevel?: string;
  why?: string;
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
    "Repository"
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

export function splitVersion(value: string): { n: string; v: string } {
  const cleaned = value.replace(/\[.*?\]/g, "").trim();
  const match = cleaned.match(/^(.*?)(?:\s+v?(\d+(?:\.\d+){0,2}))$/i);
  if (!match) return { n: cleaned, v: "stable" };
  return { n: match[1].trim(), v: match[2].trim() };
}

export function techGroupLabel(value: string): string {
  const lower = value.toLowerCase();
  if (/postgres|supabase|database|storage|redis|sql|mongo|sqlite|mysql/.test(lower)) return "Storage";
  if (/flutter|dart|capacitor|expo|react native|android|ios/.test(lower)) return "Mobile";
  if (/node|python|api|server|backend|convex|fastapi|flask|django|express|nest/.test(lower)) return "Backend";
  if (/react|next|typescript|javascript|tailwind|html|css|mdx|tsx|vue|angular|svelte/.test(lower)) return "Frontend";
  if (/docker|github|ci|vercel|netlify|tool|vite|webpack|eslint|prettier/.test(lower)) return "Tooling";
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

  const techStack = uniq(project.techStack ?? []);
  if (techStack.length === 0) return [];

  const groups = new Map<string, TechGroupItem[]>();

  for (const item of techStack) {
    const parsed = splitVersion(item);
    const label = techGroupLabel(parsed.n);
    const next = groups.get(label) ?? [];
    next.push({ n: parsed.n, v: parsed.v, c: techColor(parsed.n) });
    groups.set(label, next);
  }

  return Array.from(groups.entries()).map(([label, items]) => ({ label, items }));
}

export function topicsOf(project: ProjectShape): string[] {
  return uniq(project.topics ?? []);
}
