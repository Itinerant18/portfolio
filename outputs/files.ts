export interface IDEFile {
  name: string;
  path: string;
  language: "tsx" | "ts" | "json";
  content: string;
}

// BUG FIX #5: File content was "JohnDoe"/"TechGlobal" placeholder data — completely
// inconsistent with the Nyla Verma data in content.ts. Now all file content matches
// the actual portfolio identity across both data sources.
export const portfolioFiles: IDEFile[] = [
  {
    name: "home.tsx",
    path: "src/home.tsx",
    language: "tsx",
    content: `import React from 'react';

/**
 * @name NylaVerma
 * @role Senior Full-stack Engineer
 * @location Bengaluru, India
 * @availability Open to staff-level, platform, and founding engineer roles.
 */

export const Hero = () => {
  return (
    <div className="portfolio">
      <h1>Senior Full-stack Engineer</h1>
      <p>
        Building AI-native products, internal tools, and frontend systems
        that feel deliberate under pressure.
      </p>
      <div className="availability">
        Open to: staff-level · platform · founding engineer opportunities
      </div>
      <div className="focus-areas">
        {[
          "AI copilots and chat surfaces",
          "Developer experience and workflow tools",
          "Realtime collaboration systems",
          "Design-forward product engineering",
        ].map((area) => (
          <span key={area} className="tag">{area}</span>
        ))}
      </div>
    </div>
  );
};`,
  },
  {
    name: "projects.ts",
    path: "src/projects.ts",
    language: "ts",
    content: `export const featuredProjects = [
  {
    name: "portfolio",
    year: "2026",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/portfolio",
      "Stars: " + "0"
    ],
  },
  {
    name: "Swacth360_bot",
    year: "2026",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Swacth360_bot",
      "Stars: " + "0"
    ],
  },
  {
    name: "Itinerant18",
    year: "2026",
    role: "Developer",
    stack: [],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Itinerant18",
      "Stars: " + "0"
    ],
  },
  {
    name: "Dexter---webserver",
    year: "2026",
    role: "Developer",
    stack: ["Python"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Dexter---webserver",
      "Stars: " + "1"
    ],
  },
  {
    name: "pookies-ai-zone",
    year: "2026",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/pookies-ai-zone",
      "Stars: " + "1"
    ],
  },
  {
    name: "Serendipity",
    year: "2026",
    role: "Developer",
    stack: ["JavaScript"],
    summary: "Finding something good unintentationally",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Serendipity",
      "Stars: " + "1"
    ],
  },
  {
    name: "resume-builder-skill",
    year: "2026",
    role: "Developer",
    stack: [],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/resume-builder-skill",
      "Stars: " + "0"
    ],
  },
  {
    name: "FAS-Control",
    year: "2026",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "Hestia Control: A React + TypeScript Capacitor app using MLKit for QR scanning to manage local ESP32 web servers.",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/FAS-Control",
      "Stars: " + "1"
    ],
  },
  {
    name: "skills-introduction-to-github",
    year: "2026",
    role: "Developer",
    stack: [],
    summary: "My clone repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/skills-introduction-to-github",
      "Stars: " + "0"
    ],
  },
  {
    name: "SWatch360",
    year: "2026",
    role: "Developer",
    stack: ["Dart"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/SWatch360",
      "Stars: " + "1"
    ],
  },
  {
    name: "Financial-Advisor",
    year: "2025",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Financial-Advisor",
      "Stars: " + "0"
    ],
  },
  {
    name: "finance-gpt",
    year: "2026",
    role: "Developer",
    stack: ["JavaScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/finance-gpt",
      "Stars: " + "0"
    ],
  },
  {
    name: "ui-ux-pro-max-skill",
    year: "2026",
    role: "Developer",
    stack: ["Python"],
    summary: "An AI SKILL that provide design intelligence for building professional UI/UX multiple platforms",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/ui-ux-pro-max-skill",
      "Stars: " + "0"
    ],
  },
  {
    name: "Perplexica",
    year: "2026",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "Perplexica is an AI-powered answering engine. It is an Open source alternative to Perplexity AI",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Perplexica",
      "Stars: " + "0"
    ],
  },
  {
    name: "pookie-s-fortune-teller",
    year: "2026",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/pookie-s-fortune-teller",
      "Stars: " + "1"
    ],
  },
  {
    name: "system-prompts-and-models-of-ai-tools",
    year: "2026",
    role: "Developer",
    stack: [],
    summary: "FULL Augment Code, Claude Code, Cluely, CodeBuddy, Comet, Cursor, Devin AI, Junie, Kiro, Leap.new, Lovable, Manus, NotionAI, Orchids.app, Perplexity, Poke, Qoder, Replit, Same.dev, Trae, Traycer AI, VSCode Agent, Warp.dev, Windsurf, Xcode, Z.ai Code, Dia & v0. (And other Open Sourced) System Prompts, Internal Tools & AI Models",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/system-prompts-and-models-of-ai-tools",
      "Stars: " + "0"
    ],
  },
  {
    name: "ThingsBoard---Bot",
    year: "2025",
    role: "Developer",
    stack: ["Python"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/ThingsBoard---Bot",
      "Stars: " + "0"
    ],
  },
  {
    name: "pookies-future-predicter",
    year: "2025",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/pookies-future-predicter",
      "Stars: " + "0"
    ],
  },
  {
    name: "ml-predicter",
    year: "2026",
    role: "Developer",
    stack: ["Python"],
    summary: "Core Features:  Astrology Engine: Calculates birth charts and daily horoscopes. ML Predictions: Performs time-series forecasting, classification, and clustering. Vector Embeddings: Powers AI-based article recommendations. Confidence Scoring: Combines astrology and ML results for more robust predictions.",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/ml-predicter",
      "Stars: " + "1"
    ],
  },
  {
    name: "Local_Service_Finder-v.1",
    year: "2026",
    role: "Developer",
    stack: ["JavaScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Local_Service_Finder-v.1",
      "Stars: " + "1"
    ],
  },
  {
    name: "Local_Service_Finder",
    year: "2026",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Local_Service_Finder",
      "Stars: " + "1"
    ],
  },
  {
    name: "MGNREGA-Tracker",
    year: "2025",
    role: "Developer",
    stack: ["JavaScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/MGNREGA-Tracker",
      "Stars: " + "0"
    ],
  },
  {
    name: "pookies-banter-zone",
    year: "2026",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/pookies-banter-zone",
      "Stars: " + "1"
    ],
  },
  {
    name: "driver_centre",
    year: "2026",
    role: "Developer",
    stack: ["JavaScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/driver_centre",
      "Stars: " + "1"
    ],
  },
  {
    name: "calculator",
    year: "2026",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/calculator",
      "Stars: " + "1"
    ],
  },
  {
    name: "checkmate-arena-ai",
    year: "2026",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/checkmate-arena-ai",
      "Stars: " + "1"
    ],
  },
  {
    name: "docs",
    year: "2026",
    role: "Developer",
    stack: ["MDX"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/docs",
      "Stars: " + "0"
    ],
  },
  {
    name: "blogisphere-connect-75",
    year: "2026",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/blogisphere-connect-75",
      "Stars: " + "1"
    ],
  },
  {
    name: "interactive-portfolio-oasis",
    year: "2025",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/interactive-portfolio-oasis",
      "Stars: " + "0"
    ],
  },
  {
    name: "personal-colour-picker",
    year: "2026",
    role: "Developer",
    stack: ["JavaScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/personal-colour-picker",
      "Stars: " + "1"
    ],
  },
  {
    name: "chessverse-battlefield",
    year: "2026",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/chessverse-battlefield",
      "Stars: " + "0"
    ],
  },
  {
    name: "HawkEye-Drone",
    year: "2026",
    role: "Developer",
    stack: [],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/HawkEye-Drone",
      "Stars: " + "1"
    ],
  },
  {
    name: "Security-Engineers-Pvt.-Ltd.-Website",
    year: "2026",
    role: "Developer",
    stack: [],
    summary: "A company website built using Zoho and custom CSS.",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Security-Engineers-Pvt.-Ltd.-Website",
      "Stars: " + "1"
    ],
  },
  {
    name: "Bohemian-optical",
    year: "2026",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Bohemian-optical",
      "Stars: " + "1"
    ],
  },
  {
    name: "node-ytdl-core",
    year: "2024",
    role: "Developer",
    stack: ["JavaScript"],
    summary: "YouTube video downloader in javascript.",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/node-ytdl-core",
      "Stars: " + "0"
    ],
  },
  {
    name: "Ak_news",
    year: "2026",
    role: "Developer",
    stack: ["JavaScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Ak_news",
      "Stars: " + "1"
    ],
  },
  {
    name: "Ak_quize",
    year: "2026",
    role: "Developer",
    stack: ["JavaScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Ak_quize",
      "Stars: " + "1"
    ],
  },
  {
    name: "Animated_cube018",
    year: "2022",
    role: "Developer",
    stack: ["HTML"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Animated_cube018",
      "Stars: " + "0"
    ],
  },
  {
    name: "animated",
    year: "2022",
    role: "Developer",
    stack: [],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/animated",
      "Stars: " + "0"
    ],
  },
  {
    name: "tic-tac-toee",
    year: "2022",
    role: "Developer",
    stack: ["JavaScript"],
    summary: "GitHub Repository",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/tic-tac-toee",
      "Stars: " + "0"
    ],
  }
] as const;`,
  },
  {
    name: "skills.json",
    path: "src/skills.json",
    language: "json",
    content: `{
  "frontend": [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Design systems"
  ],
  "backend": [
    "Node.js",
    "PostgreSQL",
    "GraphQL",
    "REST APIs",
    "Redis",
    "Auth flows"
  ],
  "ai_and_data": [
    "OpenAI integrations",
    "Retrieval UX",
    "Prompt systems",
    "Realtime streaming",
    "Analytics instrumentation"
  ],
  "tooling": [
    "Cursor workflows",
    "GitHub Actions",
    "DX automation",
    "Testing strategy",
    "Performance budgets"
  ]
}`,
  },
  {
    name: "about.tsx",
    path: "src/about.tsx",
    language: "tsx",
    content: `export default function Bio() {
  /*
   * Nyla Verma — Senior Full-stack Engineer, Bengaluru.
   *
   * I work across product strategy, frontend architecture, and systems
   * design with a bias toward interfaces that make complex workflows
   * feel calm.
   *
   * Focus: AI copilots · DX tools · realtime collaboration · design-forward
   * product engineering.
   */

  return (
    <section>
      <h2>About Nyla</h2>
      <p>
        Based in Bengaluru. Working globally across product, engineering,
        and design boundaries.
      </p>
      <p>
        I believe that great developer tools are what unlock team potential —
        and I build them with that lens.
      </p>
    </section>
  );
}`,
  },
  {
    name: "experience.ts",
    path: "src/experience.ts",
    language: "ts",
    content: `export const timeline = [
  {
    company: "Northstar Labs",
    role: "Senior Full-stack Engineer",
    period: "2023 - Present",
    location: "Remote",
    focus: "AI-assisted developer tooling — product, QA, and support surfaces",
    wins: [
      "Rebuilt workspace shell with 70% fewer interaction bugs.",
      "Typed content model aligned product, marketing, and docs.",
      "Set up latency budgets across critical workflows.",
    ],
  },
  {
    company: "Helio Cloud",
    role: "Product Engineer",
    period: "2021 - 2023",
    location: "Bengaluru",
    focus: "Internal platforms: release management, incident triage, customer insight",
    wins: [
      "Delivered the first company-wide command palette across four tools.",
      "Standardized React patterns and component contracts across teams.",
    ],
  },
  {
    company: "Independent",
    role: "Frontend Consultant",
    period: "2019 - 2021",
    location: "Remote",
    focus: "Launch experiences, product redesigns, design-system implementation",
    wins: [
      "Prototypes converted directly into production code at seed-stage startups.",
      "Defined design tokens and accessibility baselines from scratch.",
    ],
  },
] as const;`,
  },
  {
    name: "contact.ts",
    path: "src/contact.ts",
    language: "ts",
    content: `export const CONTACT_INFO = {
  email: "nyla@cursorfolio.dev",
  github: "nylaverma",
  linkedin: "nylaverma",
  x: "@nylaverma",
  calendly: "cal.com/nyla-verma",
  status: "Usually replies within 24 hours.",
} as const;

export function connect() {
  console.log("Ready for high-impact opportunities.");
  console.log(\`Reach out at: \${CONTACT_INFO.email}\`);
}`,
  },
];

export const defaultFilePath = "src/home.tsx";

export function getPortfolioFile(path: string): IDEFile | undefined {
  return portfolioFiles.find((f) => f.path === path);
}
