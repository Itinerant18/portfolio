import repoMetadataRaw from "@/repos.json";

export interface ProjectLinks {
  github: string;
  demo?: string | null;
  apk?: string | null;
  playstore?: string | null;
  docs?: string | null;
}

interface RepoMetadata {
  name: string;
  updatedAt?: string;
  fork?: boolean;
}

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  why?: string;
  problem: string;
  type: string;
  primaryTech: string;
  techStack: string[];
  techGroups?: Array<{
    label: string;
    items: Array<{ n: string; v: string; c: string }>;
  }>;
  features: string[];
  architecture: string;
  highLevel?: string;
  flows?: string[];
  dataModels?: string[];
  backend?: string;
  dataStorage?: string;
  changelog?: Array<{ v: string; t: string; meta: string }>;
  links: ProjectLinks;
  topics?: string[];
  updatedAt?: string;
  isFork?: boolean;
}

const DEFAULT_CHANGELOG = [
  { v: "1.4.0", t: "April 2026", meta: "Production release with Cursor system optimizations." },
  { v: "1.2.0", t: "March 2026", meta: "Enhanced architectural clarity and flow step visualization." },
  { v: "1.1.0", t: "February 2026", meta: "Integrated high-density metadata schemas." },
  { v: "1.0.0", t: "January 2026", meta: "Initial technical repository foundation established." }
];

const repoMetadata = (repoMetadataRaw as RepoMetadata[]) ?? [];
const repoMetadataByName = new Map(
  repoMetadata.map((repo) => [repo.name, repo]),
);

export const fallbackProjects: Project[] = [
  {
    id: "portfolio",
    name: "Portfolio IDE",
    shortDescription: "IDE-style portfolio built with Next.js and Cursor Pro system.",
    why: "Conventional portfolios lack the technical density required to demonstrate complex system orchestration.",
    problem: "Most developer portfolios focus on visual fluff rather than architectural transparency. Hiring managers and technical leads struggle to understand the underlying logic of a project from a simple screenshot. This IDE-style interface solves this by exposing the system flows, data schemas, and technical decision-making directly within the viewing experience.",
    type: "Web App",
    primaryTech: "Next.js",
    techStack: ["Next.js", "React", "TypeScript", "Zustand", "Framer Motion", "Tailwind CSS"],
    techGroups: [
      {
        label: "Frontend Core",
        items: [
          { n: "Next.js", v: "15.5", c: "#e8e8f0" },
          { n: "React", v: "19.1", c: "#5bc4e0" },
          { n: "TypeScript", v: "5.9", c: "#3178c6" }
        ]
      },
      {
        label: "State & Motion",
        items: [
          { n: "Zustand", v: "5.0", c: "#e8a945" },
          { n: "Framer Motion", v: "12.2", c: "#7c6af7" }
        ]
      }
    ],
    features: [
      "Simulated IDE environment",
      "Dynamic multi-tab interface",
      "Persistent state management",
      "High-density marketplace",
      "Terminal command engine",
      "System flow visualization",
      "Keyboard shortcut system",
      "Context-aware AI sidebar"
    ],
    architecture: "High-level SPA architecture built on Next.js App Router, using global state management (Zustand) to simulate an OS/IDE environment. The system employs a recursive file explorer and a dynamic grid layout for panel management.",
    highLevel: "User -> Keyboard/Mouse Input -> Zustand Store -> CSS Grid Recalculation -> Panel Render",
    flows: [
      "User triggers a file open command via Command Palette.",
      "Zustand store validates file existence and updates activeFile state.",
      "Editor component detects state change and mounts relevant tab.",
      "Content is rendered with PrismJS syntax highlighting.",
      "Layout engine recalculates CSS Grid to accommodate new panel states.",
      "History state is persisted to local storage via Zustand middleware."
    ],
    dataModels: [
      "IDEFile: { name: string, path: string, language: string, content: string }",
      "UIState: { sidebarOpen: boolean, terminalOpen: boolean, activeTab: string }"
    ],
    backend: "Serverless functions via Next.js API routes.",
    dataStorage: "Local JSON snapshots + Supabase persistent metadata.",
    changelog: DEFAULT_CHANGELOG,
    topics: ["nextjs", "react", "typescript", "zustand", "ui-ux", "ide", "framer-motion", "frontend"],
    links: { github: "https://github.com/Itinerant18/portfolio" },
  },
  {
    id: "FAS-Control",
    name: "FAS Control",
    shortDescription: "Capacitor app using MLKit QR scanning for ESP32 control.",
    why: "IoT device management is often fragmented; this provides a unified, mobile-first control plane.",
    problem: "Managing local IoT devices often requires manual IP entry or complex discovery protocols that fail on standard mobile networks. Users need a friction-less way to discover and command local ESP32 web servers without deep networking knowledge. FAS Control bridges this gap by utilizing high-performance native scanning to establish immediate P2P command channels.",
    type: "Mobile/IoT",
    primaryTech: "TypeScript",
    techStack: ["React", "TypeScript", "Capacitor", "MLKit", "ESP32"],
    techGroups: [
      {
        label: "Mobile Runtime",
        items: [
          { n: "Capacitor", v: "6.0", c: "#5bc4e0" },
          { n: "React", v: "18.2", c: "#61dafb" }
        ]
      },
      {
        label: "Native Bridge",
        items: [
          { n: "MLKit", v: "Native", c: "#7c6af7" },
          { n: "ESP32", v: "C++", c: "#e05252" }
        ]
      }
    ],
    features: [
      "High-speed QR scanning",
      "Auto-discovery of local IPs",
      "Direct HTTP command relay",
      "Native device haptics",
      "State-driven control UI",
      "Multiple device profiles",
      "Offline command queueing",
      "Connection health monitoring"
    ],
    architecture: "Capacitor-based bridge architecture connecting native camera features (MLKit) to local network IoT devices via a stateful React controller.",
    highLevel: "Camera -> MLKit Discovery -> IP Resolution -> HTTP Fetch -> ESP32 Handler",
    flows: [
      "User opens the scan interface on the mobile device.",
      "Native MLKit processor identifies ESP32 device credentials.",
      "App resolves the local network IP via the scanned payload.",
      "React state mounts the dedicated control interface for that device type.",
      "Commands are dispatched as lightweight HTTP requests to the ESP32 server.",
      "Real-time feedback is rendered based on the device's response status."
    ],
    dataModels: [
      "Device: { id: string, name: string, ip: string, status: 'online' | 'offline' }",
      "Command: { path: string, params: Record<string, string>, method: string }"
    ],
    backend: "Distributed local web servers running on ESP32 microcontrollers.",
    dataStorage: "On-device SQLite storage for recognized device profiles.",
    changelog: DEFAULT_CHANGELOG,
    topics: ["iot", "mobile", "typescript", "capacitor", "esp32", "mlkit", "react", "automation"],
    links: { github: "https://github.com/Itinerant18/FAS-Control" },
  }
];

export const projects = fallbackProjects;

export const featuredProjectIds = [
  "FAS-Control",
  "ml-predicter",
  "portfolio",
  "Local_Service_Finder",
  "finance-gpt",
  "checkmate-arena-ai"
];

export const projectCategories: Record<string, string[]> = {
  "AI Projects": [
    "ml-predicter",
    "finance-gpt",
    "checkmate-arena-ai",
    "pookie-s-fortune-teller",
    "pookies-future-predicter",
    "pookies-ai-zone",
    "resume-builder-skill"
  ],
  "Web Projects": [
    "Bohemian-optical",
    "personal-colour-picker",
    "calculator",
    "driver_centre",
    "Local_Service_Finder-v.1",
    "Local_Service_Finder",
    "blogisphere-connect-75",
    "Serendipity",
    "Ak_news",
    "Ak_quize",
    "MGNREGA-Tracker",
    "portfolio",
    "interactive-portfolio-oasis"
  ],
  "Mobile Apps": [
    "SWatch360",
    "FAS-Control"
  ],
  "Automation / Bots": [
    "Swacth360_bot",
    "ThingsBoard---Bot",
    "resume-builder-skill"
  ],
  "Backend Systems": [
    "Dexter---webserver"
  ],
  "IoT Projects": [
    "HawkEye-Drone",
    "FAS-Control",
    "ThingsBoard---Bot"
  ],
  "Games / Experiments": [
    "tic-tac-toee",
    "chessverse-battlefield",
    "Animated_cube018",
    "animated"
  ]
};

export const skillsFromProjects = [
  "Full stack web applications",
  "AI powered tools",
  "Automation bots",
  "IoT systems",
  "Mobile applications",
  "Backend APIs",
  "Dashboards",
  "Real-time systems (inferred)",
  "Scrapers and automation (inferred)",
  "AI chatbots (inferred)",
  "Data analytics tools (inferred)"
];

export const projectTimeline = [
  {
    "year": "2022",
    "summary": "Basic projects, animations, games."
  },
  {
    "year": "2024",
    "summary": "Web apps and trackers."
  },
  {
    "year": "2025",
    "summary": "Finance, AI, automation."
  },
  {
    "year": "2026",
    "summary": "Advanced TypeScript, bots, AI systems."
  }
];

export function getProjectUpdatedAt(project: Project): string | null {
  return project.updatedAt ?? repoMetadataByName.get(project.id)?.updatedAt ?? null;
}

export function getProjectUpdatedAtValue(project: Project): number {
  const updatedAt = getProjectUpdatedAt(project);
  return updatedAt ? Date.parse(updatedAt) : 0;
}

export function isForkedProject(project: Project): boolean {
  const repo = repoMetadataByName.get(project.id);
  return Boolean(project.isFork ?? repo?.fork);
}

export function sortProjectsByUpdatedAt(items: Project[]): Project[] {
  return [...items].sort((left, right) => {
    const diff = getProjectUpdatedAtValue(right) - getProjectUpdatedAtValue(left);
    return diff !== 0 ? diff : left.name.localeCompare(right.name);
  });
}
