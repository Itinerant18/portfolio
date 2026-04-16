import { NextResponse } from "next/server";
import { getProjectArchitectureOverride } from "@/data/projectArchitecture";
import { isHiddenProjectId } from "@/data/projects";
import { getSupabaseServerClient } from "@/utils/supabase";

type VisualFlowNode = { label: string; icon: string };

interface DbArchitectureRow {
  repo_name: string;
  source: "readme_auto" | "manual_override";
  confidence: "high" | "medium" | "low";
  problem: string | null;
  architecture: string | null;
  high_level: string | null;
  visual_flow: unknown;
  mermaid_diagrams: unknown;
  flows: string[] | null;
  data_models: string[] | null;
  backend: string | null;
  data_storage: string | null;
  live_url: string | null;
  updated_at: string;
}

type DbArchitectureOverride = {
  source?: "readme_auto" | "manual_override";
  problem?: string;
  architecture?: string;
  highLevel?: string;
  visualFlow?: VisualFlowNode[];
  mermaidDiagrams?: string[];
  flows?: string[];
  dataModels?: string[];
  backend?: string;
  dataStorage?: string;
  liveUrl?: string | null;
};

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function asVisualFlow(value: unknown): VisualFlowNode[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const node = item as { label?: unknown; icon?: unknown };
      if (typeof node.label !== "string" || typeof node.icon !== "string") return null;
      return { label: node.label, icon: node.icon };
    })
    .filter((item): item is VisualFlowNode => item !== null);
}

function pickPreferredRows(rows: DbArchitectureRow[]): Map<string, DbArchitectureOverride> {
  const grouped = new Map<string, DbArchitectureRow[]>();

  for (const row of rows) {
    const key = row.repo_name.trim().toLowerCase();
    const list = grouped.get(key) ?? [];
    list.push(row);
    grouped.set(key, list);
  }

  const selected = new Map<string, DbArchitectureOverride>();
  for (const [repo, list] of grouped.entries()) {
    const manual = list.find((item) => item.source === "manual_override");
    const readmeAuto = list.find((item) => item.source === "readme_auto");
    const row = manual ?? readmeAuto ?? list[0];
    if (!row) continue;

    selected.set(repo, {
      source: row.source,
      problem: row.problem ?? undefined,
      architecture: row.architecture ?? undefined,
      highLevel: row.high_level ?? undefined,
      visualFlow: asVisualFlow(row.visual_flow),
      mermaidDiagrams: asStringArray(row.mermaid_diagrams),
      flows: row.flows ?? [],
      dataModels: row.data_models ?? [],
      backend: row.backend ?? undefined,
      dataStorage: row.data_storage ?? undefined,
      liveUrl: row.live_url,
    });
  }

  return selected;
}

async function fetchArchitectureOverridesFromDb(repoNames: string[]) {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return new Map<string, DbArchitectureOverride>();
    }
    const normalized = repoNames.map((name) => name.trim().toLowerCase());

    const { data, error } = await supabase
      .from("project_architecture")
      .select(
        "repo_name,source,confidence,problem,architecture,high_level,visual_flow,mermaid_diagrams,flows,data_models,backend,data_storage,live_url,updated_at",
      )
      .in("repo_name", normalized);

    if (error || !data) {
      return new Map<string, DbArchitectureOverride>();
    }

    return pickPreferredRows(data as DbArchitectureRow[]);
  } catch {
    return new Map<string, DbArchitectureOverride>();
  }
}

interface GitHubRepo {
  default_branch?: string;
  description: string | null;
  fork: boolean;
  homepage: string | null;
  html_url: string;
  language: string | null;
  name: string;
  private: boolean;
  topics?: string[];
  updated_at: string;
}

function extractMermaidBlocks(readmeText: string): string[] {
  const out: string[] = [];
  const regex = /```mermaid\s*([\s\S]*?)```/gi;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(readmeText)) !== null) {
    const block = match[1]?.trim();
    if (block) out.push(block);
  }

  return out;
}

function extractTechFromReadme(readmeText: string) {
  const techs: string[] = [];
  const lowerReadme = readmeText.toLowerCase();
  
  const keywords = [
    "supabase", "firebase", "postgresql", "mongodb", "redis", "mysql", "sqlite",
    "docker", "kubernetes", "aws", "google cloud", "azure", "vercel", "netlify",
    "tailwind", "bootstrap", "framer motion", "zustand", "redux", "prisma", "mongoose",
    "openai", "langchain", "huggingface", "pytorch", "tensorflow", "scikit-learn",
    "flask", "django", "fastapi", "express", "nest.js", "capacitor", "expo", "mlkit",
    "socket.io", "webgl", "three.js", "d3.js", "graphql", "apollo", "trpc", "grpc",
    "rabbitmq", "kafka", "elasticsearch", "terraform", "ansible", "jenkins", "github actions"
  ];

  for (const keyword of keywords) {
    if (lowerReadme.includes(keyword)) {
      let label = keyword.charAt(0).toUpperCase() + keyword.slice(1).replace(".js", "JS");
      if (keyword === "aws") label = "AWS";
      if (keyword === "postgresql") label = "PostgreSQL";
      if (keyword === "mongodb") label = "MongoDB";
      if (keyword === "fastapi") label = "FastAPI";
      if (keyword === "mlkit") label = "MLKit";
      techs.push(label);
    }
  }

  return techs;
}

async function fetchPackageJson(username: string, repo: string, branch: string) {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${username}/${repo}/${branch}/package.json`);
    if (res.ok) {
      const pkg = await res.json();
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      const techs: string[] = [];
      
      const map: Record<string, string> = {
        "next": "Next.js",
        "react": "React",
        "typescript": "TypeScript",
        "tailwindcss": "Tailwind",
        "supabase": "Supabase",
        "framer-motion": "Framer Motion",
        "zustand": "Zustand",
        "prisma": "Prisma",
        "lucide-react": "Lucide Icons",
        "axios": "Axios",
        "express": "Express",
        "socket.io": "Socket.io",
        "three": "Three.js"
      };

      for (const [key, val] of Object.entries(map)) {
        if (deps[key]) techs.push(val);
      }
      return techs;
    }
  } catch (e) {
    // console.error(`Error fetching package.json for ${repo}:`, e);
  }
  return [];
}

function parseArchitecture(readmeText: string, language: string) {
  const lowerReadme = readmeText.toLowerCase();
  
  // 1. AI / ML / LLM
  if (lowerReadme.includes("openai") || lowerReadme.includes("llm") || lowerReadme.includes("gpt") || lowerReadme.includes("langchain")) {
    return {
      highLevel: "User Input -> LLM Logic -> AI Response",
      visualFlow: [
        { label: "User", icon: "user" },
        { label: "AI Model", icon: "cpu" },
        { label: "Output", icon: "terminal" }
      ]
    };
  }

  // 2. Mobile / IoT / ESP32
  if (lowerReadme.includes("esp32") || lowerReadme.includes("arduino") || lowerReadme.includes("iot") || lowerReadme.includes("capacitor")) {
    return {
      highLevel: "Mobile App -> IP Discovery -> IoT Command -> Device Control",
      visualFlow: [
        { label: "Native App", icon: "smartphone" },
        { label: "MLKit/P2P", icon: "zap" },
        { label: "ESP32", icon: "cpu" },
        { label: "Device", icon: "power" }
      ]
    };
  }

  // 3. Modern Web App (Next.js / React / Supabase)
  if (language === "TypeScript" || language === "JavaScript" || lowerReadme.includes("react") || lowerReadme.includes("next.js")) {
    return {
      highLevel: "Web Client -> API Route -> Serverless Logic -> Persistence",
      visualFlow: [
        { label: "Web UI", icon: "monitor" },
        { label: "Edge Fn", icon: "server" },
        { label: "Storage", icon: "database" }
      ]
    };
  }

  // 4. Automation / Bots / Scrapers
  if (lowerReadme.includes("bot") || lowerReadme.includes("scrape") || lowerReadme.includes("automation")) {
    return {
      highLevel: "Trigger -> Workflow -> Task Execution -> Result",
      visualFlow: [
        { label: "Trigger", icon: "play" },
        { label: "Workflow", icon: "activity" },
        { label: "Result", icon: "check" }
      ]
    };
  }

  // Default Fallback
  return {
    highLevel: "Standard architecture: Flow depends on specific module execution.",
    visualFlow: [
      { label: "Input", icon: "box" },
      { label: "Process", icon: "settings" },
      { label: "Output", icon: "share" }
    ]
  };
}

export async function GET() {
  const username = "Itinerant18";
  const token = process.env.GITHUB_PAT;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch repositories" }, { status: res.status });
    }

    const repos = (await res.json()) as GitHubRepo[];

    // Filter out forked, private, and profile README repos
    const filteredRepos = repos.filter((repo) => {
      if (repo.fork) return false;
      if (repo.private) return false;
      if (repo.name === username) return false; // profile README repo
      if (isHiddenProjectId(repo.name)) return false;
      return true;
    });

    const dbOverrides = await fetchArchitectureOverridesFromDb(
      filteredRepos.map((repo) => repo.name),
    );

    const projectsWithImages = await Promise.all(
      filteredRepos.map(async (repo) => {
        const architectureOverride = getProjectArchitectureOverride(repo.name);
        const dbOverride = dbOverrides.get(repo.name.trim().toLowerCase());
        const previewImages: string[] = [];
        let mermaidDiagramsFromReadme: string[] = [];
        let archInfo = {
          highLevel: "Standard repository architecture.",
          visualFlow: [
            { label: "Client", icon: "monitor" },
            { label: "Service", icon: "server" },
            { label: "Storage", icon: "database" }
          ]
        };
        let extraTechs: string[] = [];
        const defaultBranch = repo.default_branch || "main";
        
        try {
          const readmeRes = await fetch(
            `https://raw.githubusercontent.com/${username}/${repo.name}/${defaultBranch}/README.md`,
            { next: { revalidate: 3600 } }
          );

          if (readmeRes.ok) {
            const readmeText = await readmeRes.text();
            
            // Extract ALL image URLs preserving README order
            // We process the README linearly to maintain order across both syntaxes
            const orderedImages: string[] = [];
            const seenUrls = new Set<string>();

            // Split into lines and process sequentially for correct ordering
            const lines = readmeText.split("\n");
            for (const line of lines) {
              // HTML <img> tags
              const htmlImgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
              let htmlMatch;
              while ((htmlMatch = htmlImgRegex.exec(line)) !== null) {
                const url = htmlMatch[1].trim();
                if (!seenUrls.has(url)) {
                  seenUrls.add(url);
                  orderedImages.push(url);
                }
              }

              // Markdown image syntax ![alt](url) — skip when url contains HTML
              const mdImgRegex = /!\[[^\]]*\]\(([^)<>\s]+(?:\s[^)]*)?)\)/g;
              let mdMatch;
              while ((mdMatch = mdImgRegex.exec(line)) !== null) {
                let url = mdMatch[1].trim();
                if (url.includes(" ")) url = url.split(" ")[0];
                if (url.startsWith("<") || url.includes("<img")) continue;
                if (!seenUrls.has(url)) {
                  seenUrls.add(url);
                  orderedImages.push(url);
                }
              }
            }

            // Filter out non-demo images (badges, banners, decorative elements)
            const excludePatterns = [
              /img\.shields\.io/i,
              /badge/i,
              /api\.netlify\.com/i,
              /capsule-render\.vercel\.app/i,
              /github-readme-stats/i,
              /github-profile-trophy/i,
              /streak-stats/i,
              /media\.giphy\.com/i,
              /giphy\.gif/i,
              /octodex\.github\.com/i,
              /skillicons\.dev/i,
              /techstack-generator/i,
              /contrib\.rocks/i,
              /komarev\.com/i,
              /depfu\./i,
              /\.svg(\?|$)/i,
              /separator.*\.gif/i,
              /115834477/i,
            ];

            const isExcluded = (url: string) =>
              excludePatterns.some((pattern) => pattern.test(url));

            // Resolve relative URLs and collect ALL valid images
            for (const rawUrl of orderedImages) {
              if (isExcluded(rawUrl)) continue;

              let resolvedUrl = rawUrl;
              if (!resolvedUrl.startsWith("http")) {
                resolvedUrl = resolvedUrl.replace(/^\.\//, "").replace(/^\//, "");
                resolvedUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/${defaultBranch}/${resolvedUrl}`;
              }

              previewImages.push(resolvedUrl);
            }

            // Extract dynamic architecture
            archInfo = parseArchitecture(readmeText, repo.language || "");
            mermaidDiagramsFromReadme = extractMermaidBlocks(readmeText);
            
            // Extract tech from readme
            extraTechs = [...extraTechs, ...extractTechFromReadme(readmeText)];
          }
        } catch (e) {
          console.error(`Error fetching README for ${repo.name}:`, e);
        }

        // Fetch package.json dependencies for JS/TS
        if (repo.language === "TypeScript" || repo.language === "JavaScript") {
          const pkgTechs = await fetchPackageJson(username, repo.name, defaultBranch);
          extraTechs = [...extraTechs, ...pkgTechs];
        }

        // Deduplicate techStack
        const fullTechStack = Array.from(new Set([
          repo.language,
          ...(repo.topics || []).map((t: string) => t.charAt(0).toUpperCase() + t.slice(1)),
          ...extraTechs
        ])).filter(Boolean);

        // Determine embeddable live URL from repo homepage
        let liveUrl: string | null = null;
        if (repo.homepage && repo.homepage.trim()) {
          const hp = repo.homepage.trim();
          // Only keep URLs that can actually be embedded in an iframe
          const nonEmbeddable = [
            /play\.google\.com/i,
            /apps\.apple\.com/i,
            /marketplace\./i,
            /chrome\.google\.com/i,
          ];
          const isEmbeddable = hp.startsWith("http") && !nonEmbeddable.some(p => p.test(hp));
          if (isEmbeddable) liveUrl = hp;
        }

        return {
          id: repo.name,
          name: repo.name,
          shortDescription: repo.description || "No description provided.",
          problem:
            dbOverride?.problem ||
            architectureOverride?.problem ||
            repo.description ||
            "No specific problem documented.",
          type: "Repository",
          primaryTech: repo.language || "Unknown",
          techStack: fullTechStack,
          features: [],
          architecture: dbOverride?.architecture || architectureOverride?.architecture || archInfo.highLevel,
          highLevel: dbOverride?.highLevel || architectureOverride?.highLevel || archInfo.highLevel,
          visualFlow: dbOverride?.visualFlow?.length
            ? dbOverride.visualFlow
            : architectureOverride?.visualFlow || archInfo.visualFlow,
          mermaidDiagrams:
            dbOverride?.source === "manual_override" && dbOverride?.mermaidDiagrams?.length
              ? dbOverride.mermaidDiagrams
              : mermaidDiagramsFromReadme.length
                ? mermaidDiagramsFromReadme
                : dbOverride?.mermaidDiagrams?.length
                  ? dbOverride.mermaidDiagrams
                  : architectureOverride?.mermaidDiagrams?.length
                    ? architectureOverride.mermaidDiagrams
                    : [],
          flows: dbOverride?.flows?.length ? dbOverride.flows : architectureOverride?.flows || [],
          dataModels: dbOverride?.dataModels?.length
            ? dbOverride.dataModels
            : architectureOverride?.dataModels || [],
          backend: dbOverride?.backend || architectureOverride?.backend || null,
          dataStorage: dbOverride?.dataStorage || architectureOverride?.dataStorage || null,
          links: {
            github: repo.html_url,
          },
          topics: repo.topics || [],
          updatedAt: repo.updated_at,
          isFork: false,
          previewImage: previewImages[0] || null,
          previewImages,
          liveUrl: dbOverride?.liveUrl ?? architectureOverride?.liveUrl ?? liveUrl,
        };
      })
    );

    return NextResponse.json(projectsWithImages);
  } catch (error) {
    console.error("Error fetching github projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
