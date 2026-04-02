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
    name: "Patchbay",
    year: "2025",
    role: "Lead Engineer",
    stack: ["Next.js", "TypeScript", "Node.js", "Postgres", "OpenAI"],
    summary: "A pull-request workspace with AI summarization and branch-aware quality checks.",
    impact: [
      "Cut reviewer ramp-up time by 42% across cross-functional PRs.",
      "Shipped keyboard-first flows modeled around power-user habits.",
    ],
  },
  {
    name: "Signal Deck",
    year: "2024",
    role: "Staff Product Engineer",
    stack: ["React", "GraphQL", "Go", "Redis", "Framer Motion"],
    summary: "A revenue operations dashboard for live pipeline diagnostics and triage.",
    impact: [
      "Reduced dashboard load times from 5.4s to 1.8s.",
      "Introduced typed design tokens shared between app and docs.",
    ],
  },
  {
    name: "Orbit Notes",
    year: "2023",
    role: "Founding Engineer",
    stack: ["Next.js", "Supabase", "Tailwind", "WebSockets", "Vercel"],
    summary: "A collaborative workspace merging documentation, snippets, and async discussion.",
    impact: [
      "Shipped architecture and MVP in 8 weeks.",
      "Implemented multiplayer editing presence with structured notes search.",
    ],
  },
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
