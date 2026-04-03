import { NextResponse } from "next/server";
import {
  fallbackProjects,
  Project,
  sortProjectsByUpdatedAt,
} from "@/data/projects";
import { supabase } from "@/utils/supabase";

const GITHUB_OWNER = "Itinerant18";
export const revalidate = 3600;

const CACHE_SECONDS = revalidate;
const GITHUB_API_BASE = "https://api.github.com";

interface GitHubRepo {
  default_branch: string;
  description: string | null;
  fork: boolean;
  homepage: string | null;
  html_url: string;
  language: string | null;
  name: string;
  topics?: string[];
  updated_at: string;
}

interface GitHubReadmeResponse {
  content?: string;
  encoding?: string;
}

interface MarkdownSection {
  content: string;
  normalizedTitle: string;
  title: string;
}

const fallbackProjectsById = new Map(
  fallbackProjects.map((project) => [project.id, project]),
);

const headingAliases = {
  architecture: [
    "architecture",
    "system architecture",
    "technical architecture",
    "design",
  ],
  backend: ["backend", "api", "server", "services"],
  changelog: ["changelog", "changes", "release notes", "updates"],
  dataModels: [
    "data model",
    "data models",
    "schema",
    "database schema",
    "data structures",
  ],
  dataStorage: ["storage", "database", "persistence", "data storage"],
  features: ["features", "key features", "highlights", "capabilities"],
  flows: ["flow", "flows", "workflow", "workflows", "request flow"],
  highLevel: [
    "high level",
    "high level flow",
    "high level architecture",
    "overview flow",
  ],
  overview: ["overview", "about", "summary", "introduction"],
  problem: [
    "problem",
    "problem statement",
    "challenge",
    "motivation",
    "why",
  ],
  techStack: [
    "tech stack",
    "technology stack",
    "technologies",
    "built with",
    "stack",
  ],
} as const;

function buildGitHubHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN ?? process.env.GITHUB_PAT;

  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "User-Agent": "portfolio-github-sync",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function fetchGitHubJson<T>(path: string): Promise<T> {
  const response = await fetch(`${GITHUB_API_BASE}${path}`, {
    headers: buildGitHubHeaders(),
    next: { revalidate: CACHE_SECONDS },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `GitHub request failed (${response.status}) for ${path}: ${details.slice(0, 200)}`,
    );
  }

  return (await response.json()) as T;
}

async function fetchReadme(repoName: string): Promise<string | null> {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${GITHUB_OWNER}/${repoName}/readme`,
    {
      headers: buildGitHubHeaders(),
      next: { revalidate: CACHE_SECONDS },
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `README fetch failed (${response.status}) for ${repoName}: ${details.slice(0, 200)}`,
    );
  }

  const payload = (await response.json()) as GitHubReadmeResponse;

  if (!payload.content || payload.encoding !== "base64") {
    return null;
  }

  return Buffer.from(payload.content.replace(/\n/g, ""), "base64").toString(
    "utf8",
  );
}

function normalizeHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripMarkdown(value: string): string {
  return value
    .replace(/!\[[^\]]*]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[*_~>#]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeText(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  const cleaned = stripMarkdown(value);

  if (!cleaned || /\[confirm\]/i.test(cleaned)) {
    return null;
  }

  return cleaned;
}

function sanitizeList(values?: Array<string | null | undefined>): string[] {
  if (!values) {
    return [];
  }

  return Array.from(
    new Set(values.map((value) => sanitizeText(value)).filter(Boolean) as string[]),
  );
}

function splitMarkdownSections(markdown: string): MarkdownSection[] {
  const sections: MarkdownSection[] = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");

  let activeSection: MarkdownSection | null = null;

  for (const line of lines) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);

    if (match) {
      if (activeSection) {
        sections.push({
          ...activeSection,
          content: activeSection.content.trim(),
        });
      }

      activeSection = {
        title: match[2].trim(),
        normalizedTitle: normalizeHeading(match[2]),
        content: "",
      };
      continue;
    }

    if (activeSection) {
      activeSection.content += `${line}\n`;
    }
  }

  if (activeSection) {
    sections.push({
      ...activeSection,
      content: activeSection.content.trim(),
    });
  }

  return sections;
}

function matchesHeading(
  normalizedTitle: string,
  aliases: readonly string[],
): boolean {
  return aliases.some((alias) => {
    const normalizedAlias = normalizeHeading(alias);
    return (
      normalizedTitle === normalizedAlias ||
      normalizedTitle.includes(normalizedAlias) ||
      normalizedAlias.includes(normalizedTitle)
    );
  });
}

function findSection(
  sections: MarkdownSection[],
  aliases: readonly string[],
): MarkdownSection | null {
  return (
    sections.find(
      (section) =>
        Boolean(section.content) &&
        matchesHeading(section.normalizedTitle, aliases),
    ) ?? null
  );
}

function extractParagraph(content?: string | null): string | null {
  if (!content) {
    return null;
  }

  const paragraphs = content
    .split(/\n\s*\n/)
    .map((chunk) =>
      chunk
        .split("\n")
        .map((line) => line.trim())
        .filter(
          (line) =>
            Boolean(line) &&
            !/^([-*+]|\d+\.)\s+/.test(line) &&
            !/^!\[/.test(line) &&
            !/^\[!/.test(line),
        )
        .join(" "),
    )
    .map((paragraph) => sanitizeText(paragraph))
    .filter(Boolean) as string[];

  return paragraphs[0] ?? null;
}

function extractListItems(content?: string | null): string[] {
  if (!content) {
    return [];
  }

  return sanitizeList(
    content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => /^([-*+]|\d+\.)\s+/.test(line))
      .map((line) => line.replace(/^([-*+]|\d+\.)\s+/, "")),
  );
}

function extractCommaSeparatedValues(content?: string | null): string[] {
  const paragraph = extractParagraph(content);

  if (!paragraph) {
    return [];
  }

  return sanitizeList(
    paragraph
      .split(/[,:|]/)
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 1),
  );
}

function extractLeadParagraph(markdown?: string | null): string | null {
  if (!markdown) {
    return null;
  }

  const paragraphs = markdown
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((chunk) =>
      chunk
        .split("\n")
        .map((line) => line.trim())
        .filter(
          (line) =>
            Boolean(line) &&
            !line.startsWith("#") &&
            !line.startsWith("![") &&
            !line.startsWith("[!") &&
            !/^([-*+]|\d+\.)\s+/.test(line) &&
            !/^https?:\/\//i.test(line),
        )
        .join(" "),
    )
    .map((paragraph) => sanitizeText(paragraph))
    .filter(Boolean) as string[];

  return paragraphs[0] ?? null;
}

function extractNamedMarkdownLink(
  markdown: string | null,
  labels: readonly string[],
): string | null {
  if (!markdown) {
    return null;
  }

  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

  for (const match of markdown.matchAll(regex)) {
    const label = normalizeHeading(match[1]);
    if (labels.some((candidate) => label.includes(normalizeHeading(candidate)))) {
      return match[2];
    }
  }

  return null;
}

function humanizeRepoName(repoName: string): string {
  return repoName
    .split(/[-_]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function inferProjectType(params: {
  fallbackProject?: Project;
  readme: string | null;
  repo: GitHubRepo;
  techStack: string[];
}): string {
  const fallbackType = sanitizeText(params.fallbackProject?.type);
  if (fallbackType) {
    return fallbackType;
  }

  const corpus = [
    params.repo.name,
    params.repo.description,
    params.readme,
    ...params.techStack,
    ...(params.repo.topics ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (/\b(bot|automation|agent|workflow|cli)\b/.test(corpus)) {
    return "Automation bot";
  }

  if (/\b(esp32|iot|drone|telemetry|thingsboard|sensor)\b/.test(corpus)) {
    return "IoT project";
  }

  if (/\b(flutter|react native|expo|capacitor|android|ios|mobile)\b/.test(corpus)) {
    return "Mobile app";
  }

  if (/\b(game|chess|quiz|tic tac toe)\b/.test(corpus)) {
    return "Game";
  }

  if (/\b(ai|ml|llm|gpt|prediction|model)\b/.test(corpus)) {
    return "AI/ML project";
  }

  if (/\b(api|backend|server|fastapi|flask|django|express)\b/.test(corpus)) {
    return "Backend/API server";
  }

  if (/\b(docs|documentation|mdx|markdown)\b/.test(corpus)) {
    return "Documentation";
  }

  if (/\b(portfolio)\b/.test(corpus)) {
    return "Portfolio";
  }

  if (/\b(website|web|frontend|next js|react)\b/.test(corpus)) {
    return "Web app";
  }

  return "Software project";
}

function buildProjectFromRepo(repo: GitHubRepo, readme: string | null): Project {
  const fallbackProject = fallbackProjectsById.get(repo.name);
  const sections = readme ? splitMarkdownSections(readme) : [];

  const overviewSection = findSection(sections, headingAliases.overview);
  const problemSection = findSection(sections, headingAliases.problem);
  const featuresSection = findSection(sections, headingAliases.features);
  const architectureSection = findSection(sections, headingAliases.architecture);
  const highLevelSection = findSection(sections, headingAliases.highLevel);
  const flowsSection = findSection(sections, headingAliases.flows);
  const dataModelsSection = findSection(sections, headingAliases.dataModels);
  const backendSection = findSection(sections, headingAliases.backend);
  const dataStorageSection = findSection(sections, headingAliases.dataStorage);
  const techStackSection = findSection(sections, headingAliases.techStack);
  const changelogSection = findSection(sections, headingAliases.changelog);

  const techStack = sanitizeList([
    ...extractListItems(techStackSection?.content),
    ...extractCommaSeparatedValues(techStackSection?.content),
    ...(repo.language ? [repo.language] : []),
    ...sanitizeList(fallbackProject?.techStack),
  ]);

  const shortDescription =
    sanitizeText(repo.description) ??
    extractLeadParagraph(readme) ??
    extractParagraph(overviewSection?.content) ??
    sanitizeText(fallbackProject?.shortDescription) ??
    `${humanizeRepoName(repo.name)} synced from GitHub.`;

  const architecture =
    extractParagraph(architectureSection?.content) ??
    extractParagraph(highLevelSection?.content) ??
    sanitizeText(fallbackProject?.architecture) ??
    "Architecture details are not yet documented in the repository README.";

  const highLevel =
    extractParagraph(highLevelSection?.content) ??
    sanitizeText(fallbackProject?.highLevel) ??
    architecture;

  const flows = sanitizeList([
    ...extractListItems(flowsSection?.content),
    ...extractListItems(architectureSection?.content),
    ...sanitizeList(fallbackProject?.flows),
  ]);

  const dataModels = sanitizeList([
    ...extractListItems(dataModelsSection?.content),
    ...sanitizeList(fallbackProject?.dataModels),
  ]);

  const changelog = sanitizeList([
    ...extractListItems(changelogSection?.content),
    ...sanitizeList(fallbackProject?.changelog),
  ]);

  const features = sanitizeList([
    ...extractListItems(featuresSection?.content),
    ...extractListItems(overviewSection?.content),
    ...sanitizeList(fallbackProject?.features),
  ]);

  return {
    id: repo.name,
    name: fallbackProject?.name ?? humanizeRepoName(repo.name),
    shortDescription,
    problem:
      extractParagraph(problemSection?.content) ??
      extractParagraph(overviewSection?.content) ??
      sanitizeText(fallbackProject?.problem) ??
      shortDescription,
    type: inferProjectType({
      fallbackProject,
      readme,
      repo,
      techStack,
    }),
    primaryTech:
      sanitizeText(fallbackProject?.primaryTech) ??
      techStack[0] ??
      repo.language ??
      "Unknown",
    techStack: techStack.length > 0 ? techStack : ["Unknown"],
    features:
      features.length > 0
        ? features
        : ["Repository metadata is synced from GitHub and the project README."],
    architecture,
    highLevel,
    flows:
      flows.length > 0 ? flows : ["Open repository -> inspect implementation details."],
    dataModels:
      dataModels.length > 0
        ? dataModels
        : sanitizeList(fallbackProject?.dataModels),
    backend:
      extractParagraph(backendSection?.content) ??
      sanitizeText(fallbackProject?.backend) ??
      "Not documented",
    dataStorage:
      extractParagraph(dataStorageSection?.content) ??
      sanitizeText(fallbackProject?.dataStorage) ??
      "Not documented",
    changelog:
      changelog.length > 0
        ? changelog
        : ["No structured changelog section found in the repository README."],
    links: {
      github: repo.html_url,
      demo:
        sanitizeText(repo.homepage) ??
        extractNamedMarkdownLink(readme, ["demo", "live", "preview", "website"]),
      apk: extractNamedMarkdownLink(readme, ["apk", "android"]),
      docs: extractNamedMarkdownLink(readme, ["docs", "documentation"]),
    },
    updatedAt: repo.updated_at,
    isFork: repo.fork,
    topics: sanitizeList(repo.topics),
  };
}

async function syncToSupabase(projects: Project[]) {
  try {
    // Transform to snake_case for Supabase
    const rows = projects.map((p) => ({
      id: p.id,
      name: p.name,
      short_description: p.shortDescription,
      problem: p.problem,
      type: p.type,
      primary_tech: p.primaryTech,
      tech_stack: p.techStack,
      features: p.features,
      architecture: p.architecture,
      high_level: p.highLevel,
      flows: p.flows,
      data_models: p.dataModels,
      backend: p.backend,
      data_storage: p.dataStorage,
      changelog: p.changelog,
      links: p.links,
      updated_at: p.updatedAt,
      is_fork: p.isFork,
      topics: p.topics,
    }));

    const { error } = await supabase.from("projects").upsert(rows, {
      onConflict: "id",
    });

    if (error) {
      console.warn("Supabase sync failed (likely RLS or schema mismatch):", error.message);
    }
  } catch (err) {
    console.error("Supabase sync encountered an error:", err);
  }
}

export async function GET() {
  try {
    // 1. Try to fetch from Supabase first
    const { data: dbProjects, error: dbError } = await supabase
      .from("projects")
      .select("*")
      .order("updated_at", { ascending: false });

    if (!dbError && dbProjects && dbProjects.length > 0) {
      // Transform back to camelCase for the UI
      const projects: Project[] = dbProjects.map((p) => ({
        id: p.id,
        name: p.name,
        shortDescription: p.short_description,
        problem: p.problem,
        type: p.type,
        primaryTech: p.primary_tech,
        techStack: p.tech_stack,
        features: p.features,
        architecture: p.architecture,
        highLevel: p.high_level,
        flows: p.flows,
        dataModels: p.data_models,
        backend: p.backend,
        dataStorage: p.data_storage,
        changelog: p.changelog,
        links: p.links,
        updatedAt: p.updated_at,
        isFork: p.is_fork,
        topics: p.topics,
      }));

      return NextResponse.json(sortProjectsByUpdatedAt(projects), {
        headers: {
          "Cache-Control": `s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}`,
          "x-project-source": "supabase",
        },
      });
    }

    // 2. Fallback to GitHub Sync if Supabase is empty or failed
    const repos = await fetchGitHubJson<GitHubRepo[]>(
      `/users/${GITHUB_OWNER}/repos?per_page=100&sort=updated&direction=desc`,
    );

    const syncedProjects = await Promise.all(
      repos.map(async (repo) => buildProjectFromRepo(repo, await fetchReadme(repo.name))),
    );

    // Sync to Supabase in the background
    void syncToSupabase(syncedProjects);

    return NextResponse.json(sortProjectsByUpdatedAt(syncedProjects), {
      headers: {
        "Cache-Control": `s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}`,
        "x-project-source": "github",
      },
    });
  } catch (err) {
    console.error("Project fetch failed:", err);
    return NextResponse.json(sortProjectsByUpdatedAt(fallbackProjects), {
      headers: {
        "Cache-Control": `s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}`,
        "x-project-source": "fallback",
      },
    });
  }
}
