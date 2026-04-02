export const portfolioProfile = {
  name: "Nyla Verma",
  role: "Senior Full-stack Engineer",
  location: "Bengaluru, India",
  headline:
    "I build AI-native products, internal tools, and frontend systems that feel deliberate under pressure.",
  availability: "Open to staff-level, platform, and founding engineer opportunities.",
  summary:
    "I work across product strategy, frontend architecture, and systems design, with a bias toward interfaces that make complex workflows feel calm.",
  focusAreas: [
    "AI copilots and chat surfaces",
    "Developer experience and workflow tools",
    "Realtime collaboration systems",
    "Design-forward product engineering",
  ],
  links: {
    github: "github.com/nylaverma",
    linkedin: "linkedin.com/in/nylaverma",
    email: "nyla@cursorfolio.dev",
    website: "cursorfolio.dev",
  },
} as const;

export const portfolioProjects = [
  {
    name: "Patchbay",
    year: "2025",
    role: "Lead Engineer",
    stack: ["Next.js", "TypeScript", "Node.js", "Postgres", "OpenAI"],
    summary:
      "A pull-request workspace with review context, AI summarization, and branch-aware quality checks.",
    impact: [
      "Cut reviewer ramp-up time by 42% across cross-functional PRs.",
      "Added inline model-assisted release notes and risk summaries.",
      "Shipped keyboard-first flows modeled around power-user habits.",
    ],
  },
  {
    name: "Signal Deck",
    year: "2024",
    role: "Staff Product Engineer",
    stack: ["React", "GraphQL", "Go", "Redis", "Framer Motion"],
    summary:
      "A revenue operations dashboard for live pipeline diagnostics and guided triage.",
    impact: [
      "Reduced dashboard load times from 5.4s to 1.8s.",
      "Built a progressive disclosure UI for complex drill-downs.",
      "Introduced typed design tokens shared between app and docs.",
    ],
  },
  {
    name: "Orbit Notes",
    year: "2023",
    role: "Founding Engineer",
    stack: ["Next.js", "Supabase", "Tailwind", "WebSockets", "Vercel"],
    summary:
      "A collaborative workspace that merges documentation, snippets, and async discussion.",
    impact: [
      "Designed the initial system architecture and shipped MVP in 8 weeks.",
      "Implemented multiplayer editing presence and structured notes search.",
      "Raised activation by simplifying first-run setup and empty states.",
    ],
  },
] as const;

export const skillMatrix = {
  frontend: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Design systems",
  ],
  backend: [
    "Node.js",
    "PostgreSQL",
    "GraphQL",
    "REST APIs",
    "Redis",
    "Auth flows",
  ],
  aiAndData: [
    "OpenAI integrations",
    "Retrieval UX",
    "Prompt systems",
    "Realtime streaming",
    "Analytics instrumentation",
  ],
  tooling: [
    "Cursor workflows",
    "GitHub Actions",
    "DX automation",
    "Testing strategy",
    "Performance budgets",
  ],
} as const;

export const experienceTimeline = [
  {
    company: "Northstar Labs",
    role: "Senior Full-stack Engineer",
    period: "2023 - Present",
    location: "Remote",
    summary:
      "Led the frontend and platform layer for AI-assisted developer tooling used by product, QA, and support teams.",
    wins: [
      "Rebuilt the shared workspace shell with 70% fewer interaction bugs.",
      "Created a typed content model that aligned product, marketing, and docs.",
      "Set up latency budgets and instrumentation across critical workflows.",
    ],
  },
  {
    company: "Helio Cloud",
    role: "Product Engineer",
    period: "2021 - 2023",
    location: "Bengaluru",
    summary:
      "Built internal platforms for release management, incident triage, and customer insight aggregation.",
    wins: [
      "Delivered the first company-wide command palette used in four internal tools.",
      "Standardized React patterns and component contracts across teams.",
      "Improved bundle health and reduced regressions with targeted test coverage.",
    ],
  },
  {
    company: "Independent",
    role: "Frontend Consultant",
    period: "2019 - 2021",
    location: "Remote",
    summary:
      "Partnered with startups on launch experiences, product redesigns, and design-system implementation.",
    wins: [
      "Built shipping-quality prototypes that converted directly into production code.",
      "Defined design tokens and accessibility baselines for seed-stage products.",
      "Helped teams move from static mockups to interactive product reviews.",
    ],
  },
] as const;

export const contactDetails = {
  email: "nyla@cursorfolio.dev",
  calendly: "cal.com/nyla-verma",
  github: "github.com/nylaverma",
  linkedin: "linkedin.com/in/nylaverma",
  x: "x.com/nylaverma",
  status: "Usually replies within 24 hours.",
} as const;

export const starterMessages = [
  {
    id: "welcome-assistant",
    role: "assistant" as const,
    content:
      "Ask about projects, architecture decisions, DX workflows, or the file you have open. I'll respond like a portfolio copilot.",
  },
  {
    id: "welcome-user",
    role: "user" as const,
    content: "What kind of engineer are you?",
  },
  {
    id: "welcome-answer",
    role: "assistant" as const,
    content:
      "A product-minded full-stack engineer. I care about code quality, interface precision, and shipping systems people actually want to keep using.",
  },
] as const;

// BUG FIX #7: Added agentId parameter so agent selection actually affects the response.
export function buildAIResponse(
  prompt: string,
  activeFileName?: string,
  agentId: "default" | "projects" | "systems" = "default",
) {
  const normalized = prompt.toLowerCase();

  // Systems agent: architecture, tooling, DX questions
  if (agentId === "systems") {
    if (normalized.includes("stack") || normalized.includes("technology") || normalized.includes("tool")) {
      const allSkills = [
        ...skillMatrix.frontend,
        ...skillMatrix.backend,
        ...skillMatrix.aiAndData,
        ...skillMatrix.tooling,
      ];
      return `Systems view: ${allSkills.join(", ")}. The architecture philosophy is thin server + rich client, with typed APIs at the boundary.`;
    }
    if (normalized.includes("ai") || normalized.includes("model") || normalized.includes("llm")) {
      return `AI tooling stack: ${skillMatrix.aiAndData.join(", ")}. I lean toward streaming UI patterns, typed prompt systems, and RAG retrieval surfaces over black-box integrations.`;
    }
    return `Systems agent active. Ask about architecture decisions, DX tooling, performance patterns, or tech stack choices.`;
  }

  // Projects agent: delivery, impact, timelines
  if (agentId === "projects") {
    if (normalized.includes("project") || normalized.includes("ship") || normalized.includes("deliver")) {
      return portfolioProjects
        .map((p) => `${p.name} (${p.year}) — ${p.role}: ${p.impact[0]}`)
        .join(" | ");
    }
    if (normalized.includes("impact") || normalized.includes("result") || normalized.includes("outcome")) {
      const allImpacts = portfolioProjects.flatMap((p) => p.impact);
      return `Key outcomes: ${allImpacts.slice(0, 3).join(" ")}`;
    }
    return `Projects agent active — covering Patchbay (2025), Signal Deck (2024), and Orbit Notes (2023). Ask about delivery timelines, stack choices, or impact metrics.`;
  }

  // Default agent: general portfolio questions
  if (normalized.includes("project")) {
    return `Featured work: ${portfolioProjects
      .map((project) => `${project.name} (${project.year})`)
      .join(", ")}. The common thread is workflow-heavy software with strong interaction design.`;
  }

  if (
    normalized.includes("stack") ||
    normalized.includes("skill") ||
    normalized.includes("technology")
  ) {
    const coreStack = [...skillMatrix.frontend, ...skillMatrix.backend];

    return `Core stack: ${coreStack
      .slice(0, 8)
      .join(", ")}. I usually pair strong frontend architecture with dependable platform plumbing.`;
  }

  if (
    normalized.includes("contact") ||
    normalized.includes("hire") ||
    normalized.includes("reach")
  ) {
    return `The cleanest path is ${contactDetails.email}. GitHub is ${contactDetails.github} and LinkedIn is ${contactDetails.linkedin}. ${contactDetails.status}`;
  }

  if (
    normalized.includes("experience") ||
    normalized.includes("career") ||
    normalized.includes("background")
  ) {
    return `${experienceTimeline[0].role} at ${experienceTimeline[0].company} right now. Before that I built internal platforms at ${experienceTimeline[1].company} and consulted for early-stage product teams.`;
  }

  if (
    normalized.includes("about") ||
    normalized.includes("who are you") ||
    normalized.includes("bio")
  ) {
    return `${portfolioProfile.name} is a ${portfolioProfile.role} based in ${portfolioProfile.location}. ${portfolioProfile.summary}`;
  }

  return `I can walk through ${activeFileName ?? "the portfolio"} in detail, explain the underlying architecture, or summarize Nyla's work through projects, experience, and contact routes.`;
}
