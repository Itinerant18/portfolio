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
    title: "Project Alpha",
    role: "Lead UI Developer",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    url: "https://alpha.example.com",
    summary: "A real-time data visualization dashboard."
  },
  {
    title: "CodeFlow SDK",
    role: "Author",
    tech: ["TypeScript", "Rust", "WASM"],
    url: "https://codeflow.sdk",
    summary: "High-performance processing library for web IDEs."
  }
];`,
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
    name: "about.tsx",
    path: "src/about.tsx",
    language: "tsx",
    content: `export default function Bio() {
  /*
   * With over 8 years of experience in product engineering,
   * I focus on the intersection of design and performance.
   * I believe that great developer tools are the key to 
   * unlocking team potential.
   */
  
  return (
    <section>
      <h2>Background</h2>
      <p>Based in San Francisco, working globally.</p>
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
    company: "TechGlobal",
    role: "Senior Staff Engineer",
    period: "2021 - Present",
    focus: "Product UI & Design Systems"
  },
  {
    company: "Innovate Solutions",
    role: "Senior Software Engineer",
    period: "2018 - 2021",
    focus: "Cloud Dashboards"
  }
];`,
  },
  {
    name: "contact.ts",
    path: "src/contact.ts",
    language: "ts",
    content: `export const CONTACT_INFO = {
  email: "hello@johndoe.dev",
  github: "johndoe",
  linkedin: "johndoe-dev",
  twitter: "@johndoe_ui"
} as const;

export function connect() {
  console.log("Ready for high-impact opportunities.");
}`,
  },
];

export const defaultFilePath = "src/home.tsx";

export function getPortfolioFile(path: string): IDEFile | undefined {
  return portfolioFiles.find((f) => f.path === path);
}
