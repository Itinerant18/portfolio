import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/utils/supabase";

interface GitHubRepo {
  default_branch?: string;
  fork: boolean;
  name: string;
  private: boolean;
}

type SyncRow = {
  repo_name: string;
  source: "readme_auto";
  confidence: "high" | "medium" | "low";
  problem: string | null;
  architecture: string | null;
  high_level: string | null;
  visual_flow: Array<{ label: string; icon: string }>;
  mermaid_diagrams: string[];
  flows: string[];
  data_models: string[];
  backend: string | null;
  data_storage: string | null;
  updated_at: string;
};

function getHeadingSection(text: string, headingKeywords: string[]) {
  const lines = text.split("\n");
  let start = -1;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim().toLowerCase();
    if (!line.startsWith("#")) continue;
    if (headingKeywords.some((keyword) => line.includes(keyword))) {
      start = i + 1;
      break;
    }
  }

  if (start === -1) return "";

  const chunk: string[] = [];
  for (let i = start; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (line.startsWith("#")) break;
    chunk.push(line);
  }

  return chunk.join("\n").trim();
}

function firstNonEmptyParagraph(section: string) {
  const parts = section
    .split(/\n{2,}/)
    .map((s) => s.replace(/^[-*]\s+/gm, "").trim())
    .filter(Boolean);
  return parts[0] ?? "";
}

function extractMermaidBlocks(readme: string) {
  const out: string[] = [];
  const regex = /```mermaid\s*([\s\S]*?)```/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(readme)) !== null) {
    const block = match[1]?.trim();
    if (block) out.push(block);
  }
  return out;
}

function extractNumberedSteps(section: string) {
  const lines = section.split("\n").map((line) => line.trim());
  return lines
    .filter((line) => /^\d+\./.test(line))
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 8);
}

function extractBacktickModels(section: string) {
  const out: string[] = [];
  const regex = /`([^`]{2,100})`/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(section)) !== null) {
    out.push(match[1]);
  }
  return Array.from(new Set(out)).slice(0, 10);
}

function deriveVisualFlow(readme: string) {
  const lower = readme.toLowerCase();
  if (lower.includes("rag") || lower.includes("llm") || lower.includes("gpt")) {
    return [
      { label: "Query", icon: "user" },
      { label: "Retrieve", icon: "database" },
      { label: "Generate", icon: "cpu" },
      { label: "Respond", icon: "terminal" },
    ];
  }
  if (lower.includes("esp32") || lower.includes("capacitor") || lower.includes("iot")) {
    return [
      { label: "Mobile", icon: "smartphone" },
      { label: "Gateway", icon: "server" },
      { label: "Device", icon: "cpu" },
    ];
  }
  if (lower.includes("flutter")) {
    return [
      { label: "Mobile", icon: "smartphone" },
      { label: "API", icon: "server" },
      { label: "Data", icon: "database" },
    ];
  }
  return [
    { label: "Client", icon: "monitor" },
    { label: "Service", icon: "server" },
    { label: "Storage", icon: "database" },
  ];
}

function deriveHighLevel(readme: string) {
  const lower = readme.toLowerCase();
  if (lower.includes("layered monolithic") || lower.includes("rag engine")) {
    return "Client -> API Gateway -> Intelligence Layer -> Data Layer";
  }
  if (lower.includes("capacitor") || lower.includes("esp32")) {
    return "Mobile App -> Device Gateway -> IoT Controller";
  }
  if (lower.includes("fastapi")) {
    return "Client Request -> FastAPI Service -> Prediction Response";
  }
  if (lower.includes("flutter") && lower.includes("thingsboard")) {
    return "Flutter Client -> ThingsBoard API -> Telemetry";
  }
  return "Client -> Application -> Data";
}

function deriveConfidence(mermaidCount: number, architecture: string, flowsCount: number) {
  if (mermaidCount > 0) return "high" as const;
  if (architecture.length > 120 || flowsCount >= 3) return "medium" as const;
  return "low" as const;
}

function deriveBackend(readme: string) {
  const lower = readme.toLowerCase();
  if (lower.includes("next.js route") || lower.includes("netlify")) return "Next.js/Serverless API routes";
  if (lower.includes("fastapi")) return "Python FastAPI backend";
  if (lower.includes("express")) return "Node.js/Express backend";
  if (lower.includes("flask")) return "Python Flask backend";
  if (lower.includes("supabase")) return "Supabase-backed API/data layer";
  return null;
}

function deriveStorage(readme: string) {
  const lower = readme.toLowerCase();
  if (lower.includes("pgvector") || lower.includes("postgres")) return "PostgreSQL/pgvector";
  if (lower.includes("supabase")) return "Supabase PostgreSQL";
  if (lower.includes("sqlite")) return "SQLite";
  if (lower.includes("redis")) return "Redis cache layer";
  return null;
}

async function fetchReadme(username: string, repo: string, branch: string) {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${username}/${repo}/${branch}/README.md`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const syncToken = process.env.ARCH_SYNC_TOKEN;
  const provided = request.headers.get("x-sync-token") ?? "";
  const isProduction = process.env.NODE_ENV === "production";

  if (syncToken && provided !== syncToken) {
    return NextResponse.json({ error: "Unauthorized sync token." }, { status: 401 });
  }

  if (!syncToken && isProduction) {
    return NextResponse.json(
      { error: "ARCH_SYNC_TOKEN must be configured in production." },
      { status: 400 },
    );
  }

  const username = "Itinerant18";
  const token = process.env.GITHUB_PAT || process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { headers, cache: "no-store" },
    );

    if (!repoRes.ok) {
      return NextResponse.json(
        { error: `Failed to fetch repositories: ${repoRes.status}` },
        { status: repoRes.status },
      );
    }

    const repos = (await repoRes.json()) as GitHubRepo[];
    const filtered = repos.filter(
      (repo) => !repo.fork && !repo.private && repo.name !== username,
    );

    const nowIso = new Date().toISOString();

    const rows: SyncRow[] = [];

    for (const repo of filtered) {
      const defaultBranch = repo.default_branch || "main";
      const readme =
        (await fetchReadme(username, repo.name, defaultBranch)) ??
        (defaultBranch !== "master" ? await fetchReadme(username, repo.name, "master") : null);

      if (!readme) continue;

      const architectureSection = getHeadingSection(readme, [
        "architecture",
        "system architecture",
        "high-level architecture",
        "overview",
      ]);
      const problemSection = getHeadingSection(readme, ["problem", "what is this project", "solution"]);
      const flowSection = getHeadingSection(readme, ["data flow", "working flow", "pipeline", "flow"]);
      const modelSection = getHeadingSection(readme, ["database schema", "schema", "data model", "models"]);

      const mermaidDiagrams = extractMermaidBlocks(readme);
      const architectureText = firstNonEmptyParagraph(architectureSection);
      const problemText = firstNonEmptyParagraph(problemSection);
      const flows = extractNumberedSteps(flowSection);
      const dataModels = extractBacktickModels(modelSection);

      rows.push({
        repo_name: repo.name.trim().toLowerCase(),
        source: "readme_auto",
        confidence: deriveConfidence(mermaidDiagrams.length, architectureText, flows.length),
        problem: problemText || null,
        architecture: architectureText || null,
        high_level: deriveHighLevel(readme),
        visual_flow: deriveVisualFlow(readme),
        mermaid_diagrams: mermaidDiagrams,
        flows,
        data_models: dataModels,
        backend: deriveBackend(readme),
        data_storage: deriveStorage(readme),
        updated_at: nowIso,
      });
    }

    if (rows.length === 0) {
      return NextResponse.json({ synced: 0, message: "No README data parsed." });
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        {
          error:
            "Supabase server credentials are missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
        },
        { status: 500 },
      );
    }
    const { error } = await supabase
      .from("project_architecture")
      .upsert(rows, { onConflict: "repo_name,source" });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      synced: rows.length,
      source: "readme_auto",
      sample: rows.slice(0, 5).map((row) => ({
        repo: row.repo_name,
        confidence: row.confidence,
        mermaidCount: row.mermaid_diagrams.length,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sync failed" },
      { status: 500 },
    );
  }
}
