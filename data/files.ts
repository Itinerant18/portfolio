export interface IDEFile {
  name: string;
  path: string;
  language: "tsx" | "ts" | "json";
  content: string;
}

export const portfolioFiles: IDEFile[] = [
  {
    name: "home.tsx",
    path: "src/home.tsx",
    language: "tsx",
    content: `import React from 'react';

/**
 * @name JohnDoePortfolio
 * @role Senior Frontend Engineer
 * @description Building high-performance, developer-first interfaces.
 */

export const Hero = () => {
  return (
    <div className="portfolio">
      <h1>Senior Frontend Engineer & UI Architect</h1>
      <p>Specializing in Next.js, TypeScript, and Design Systems.</p>
      <div className="status">
        Currently: Optimizing developer workflows @ TechGlobal
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
  "core": [
    "TypeScript",
    "React / Next.js",
    "Tailwind CSS",
    "Node.js"
  ],
  "tooling": [
    "Docker",
    "Kubernetes",
    "CI/CD Pipelines",
    "Cursor IDE Mastery"
  ],
  "soft_skills": [
    "Architectural Design",
    "Technical Mentorship",
    "Performance Optimization"
  ]
}`,
  },
  {
    name: "about.html",
    path: "src/about.html",
    language: "tsx",
    content: `<!-- about.html -->`,
  },
  {
    name: "experience.ts",
    path: "src/experience.ts",
    language: "ts",
    content: `// experience`,
  },
  {
    name: "contact.css",
    path: "src/contact.css",
    language: "ts",
    content: `/* contact */`,
  },
  {
    name: "README.md",
    path: "README.md",
    language: "ts",
    content: `# README`,
  },
];

export const defaultFilePath = "src/home.tsx";

export function getPortfolioFile(path: string): IDEFile | undefined {
  return portfolioFiles.find((f) => f.path === path);
}
