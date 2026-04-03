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
  // ... more projects
] as const;`,
  },
  {
    name: "projects.json",
    path: "src/projects.json",
    language: "json",
    content: `{
  "status": "synchronized",
  "source": "supabase",
  "owner": "Itinerant18",
  "last_sync": "2026-04-03",
  "projects_count": 42
}`,
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
