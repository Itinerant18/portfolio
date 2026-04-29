export interface IDEFile {
  name: string;
  path: string;
  language: "css" | "tsx" | "ts" | "json" | "md";
  content: string;
}

export const portfolioFiles: IDEFile[] = [
  {
    name: "home.tsx",
    path: "src/home.tsx",
    language: "tsx",
    content: `import React from 'react';

/**
 * @name AniketKarmakar
 * @pronouns He/Him
 * @role Front-end UI Developer | React.js | Web Designer
 * @headline Front-end UI Developer | React.js | Web Designer
 * @current Junior Software Engineer in R&D @ SEPLE
 * @education NSHM College of Management and Technology
 */

export const Hero = () => {
  return (
    <div className="portfolio">
      <h1>Front-end UI Developer | React.js | Web Designer</h1>
      <p>Full-Stack | AI/ML | IoT | Cloud Infrastructure</p>
      <div className="status">
        Currently: Junior Software Engineer, R&D @ SEPLE, Noida
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
    name: "FAS-Control",
    year: "2025",
    role: "Developer",
    stack: ["TypeScript", "React", "Capacitor", "MLKit"],
    summary: "Industrial IoT control app: QR-to-IP discovery for ESP32 nodes.",
    association: "Security Engineers Pvt. Ltd. (SEPLE)",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/FAS-Control",
      "Published on Google Play Store",
      "Secure per-device handshake protocol",
      "Sub-100ms control latency"
    ],
  },
  {
    name: "Dexter Bot (RAG System)",
    year: "2026",
    role: "Developer",
    stack: ["Node.js", "LangChain", "pgvector", "FastAPI"],
    summary: "Enterprise RAG pipeline for 500+ pages of industrial docs using RAPTOR hierarchical indexing.",
    association: "Security Engineers Pvt. Ltd. (SEPLE)",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/Swacth360_bot",
      "95%+ precision on technical queries",
      "Automated citation verification",
      "LangGraph reasoning loops"
    ],
  },
  {
    name: "Chessverse Battlefield",
    year: "2025",
    role: "Developer",
    stack: ["TypeScript", "Vite", "Framer Motion"],
    summary: "High-performance client-side chess engine with O(1) move validation and battlefield animations.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/chessverse-battlefield",
      "Zero-dependency validation engine",
      "Reactive state machine",
      "Sub-1ms evaluation latency"
    ],
  },
  {
    name: "MGNREGA Tracker",
    year: "2025",
    role: "Developer",
    stack: ["React 18", "Node.js", "Chart.js"],
    summary: "Transparency dashboard for government data with real-time API and hybrid CSV failovers.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/MGNREGA-Tracker",
      "Bilingual support (EN/HI)",
      "District performance benchmarking",
      "Automated API fallback"
    ],
  },
  {
    name: "ThingsBoard AI Bot",
    year: "2026",
    role: "Developer",
    stack: ["Python", "OpenAI", "ThingsBoard"],
    summary: "Industrial AI agent for automated failure diagnosis and telemetry trend analysis.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/ThingsBoard---Bot",
      "Real-time telemetry interpretation",
      "Diagnostic report generation",
      "Seamless IoT platform bridge"
    ],
  },
  {
    name: "Pookies AI Zone",
    year: "2024",
    role: "Developer",
    stack: ["React Native", "Convex", "Playwright"],
    summary: "AI tools directory with 3,500+ items and automated daily scraping pipeline.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/pookies-ai-zone",
      "Live database subscriptions",
      "Automated categorization engine",
      "Mobile-first discovery UI"
    ],
  },
  {
    name: "SWatch360",
    year: "2026",
    role: "Developer",
    stack: ["Flutter", "MQTT", "WebSockets"],
    summary: "Industrial IoT companion app with 60FPS telemetry dashboards and alarm management.",
    association: "Security Engineers Pvt. Ltd. (SEPLE)",
    impact: [
      "Published on Google Play Store",
      "View on GitHub: https://github.com/Itinerant18/SWatch360",
      "Real-time industrial charts",
      "Push-notification alarm triggers"
    ],
  },
  {
    name: "ML Predicter",
    year: "2025",
    role: "Developer",
    stack: ["Python", "XGBoost", "FastAPI"],
    summary: "Hybrid engine combining planetary harmonics (C) with time-series ML for forecasting.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/ml-predicter",
      "C-bridge for astronomical precision",
      "Temporal Bayesian consensus",
      "20+ years back-tested data"
    ],
  },
  {
    name: "Resume Builder",
    year: "2025",
    role: "Developer",
    stack: ["Claude MCP", "GitHub API", "LaTeX"],
    summary: "AI orchestrator that builds ATS-optimized resumes from live professional data.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/resume-builder-skill",
      "Live metric synthesis",
      "PDF generation in <6s",
      "Built on MCP protocol"
    ],
  },
  {
    name: "Real-Time Chat",
    year: "2024",
    role: "Developer",
    stack: ["Java JEE", "JSP", "JDBC"],
    summary: "Hardened internal communication platform with zero cloud dependencies.",
    impact: [
      "Three-tier Java architecture",
      "PBKDF2/BCrypt security",
      "Connection pool optimization",
      "Independent SQL persistence"
    ],
  }
] as const;`,
  },
  {
    name: "skills.json",
    path: "src/skills.json",
    language: "json",
    content: `{
  "languages": [
    "Java",
    "TypeScript",
    "Python",
    "JavaScript",
    "Dart",
    "SQL"
  ],
  "frontend": [
    "React",
    "JSP",
    "Flutter",
    "Capacitor",
    "HTML/CSS"
  ],
  "backend": [
    "Node.js",
    "REST APIs",
    "Firebase",
    "WebSockets"
  ],
  "ai_ml": [
    "Computer Vision",
    "Gesture Recognition",
    "Time-Series ML",
    "Vector Embeddings",
    "RAG",
    "LangChain"
  ],
  "cloud_iot": [
    "AWS (S3, Lambda)",
    "ESP32-S3 (C++)",
    "ThingsBoard PE",
    "MQTT / WebSockets",
    "Modbus / RTSP",
    "Edge Gateway Design"
  ],
  "tooling": [
    "Git / GitHub Actions",
    "Docker / Kubernetes (K8s)",
    "MCP (Model Context Protocol)",
    "Zoho Creator / CRM",
    "MLKit / Google Vision",
    "Agile / SCRUM"
  ]
}`,
  },
  {
    name: "about.html",
    path: "src/about.html",
    language: "tsx",
    content: `<!-- about.html -->
<section>
  <h1>About Aniket Karmakar (He/Him)</h1>
  <p>Front-end UI Developer | React.js | Web Designer</p>
  <p>Software Engineer specialized in Full-Stack Development, AI/ML, IoT, and Cloud Infrastructure.</p>
  <p>B.Tech ECE — NSHM Knowledge Campus, Kolkata — CGPA: 8.6</p>
</section>`,
  },
  {
    name: "experience.ts",
    path: "src/experience.ts",
    language: "ts",
    content: `export const experience = [
  {
    company: "Security Engineers Pvt. Ltd. (SEPLE)",
    role: "Junior Software Engineer in R&D",
    period: "Oct 2024 - Present",
    type: "Full-time",
    location: "Noida, Uttar Pradesh"
  },
  {
    company: "Jspiders",
    role: "Internship - Java Full Stack Developer",
    period: "May 2024 - Oct 2024"
  },
  {
    company: "Qspiders",
    role: "Internship - Software Testing",
    period: "Apr 2024 - Oct 2024"
  },
  {
    company: "Cisco",
    role: "Internship - Cloud Computing",
    period: "Jan 2024 - May 2024"
  }
];`,
  },
  {
    name: "contact.css",
    path: "src/contact.css",
    language: "css",
    content: `.contact {
  email: "aniketkarmakar018@gmail.com";
  github: "Itinerant18";
  linkedin: "aniket-karmakar";
  phone: "7602676448";
}`,
  },
  {
    name: "resume.pdf",
    path: "resume.pdf",
    language: "md",
    content: `# Resume
Selecting this file downloads the latest resume as \`resume.pdf\`.`,
  },
  {
    name: "README.md",
    path: "README.md",
    language: "md",
    content: `# Aniket Karmakar

> Systems Architect | AI/ML Engineer | Full-Stack Developer

Junior Executive Engineer — R&D @ Security Engineers Pvt. Ltd.
Kolkata, India 🇮🇳

## Focus Areas
- Enterprise RAG & LLM pipelines
- Full-stack · Next.js + Spring Boot
- Industrial IoT · ThingsBoard
- AI-native product development

## Currently Building
- Dexter Tech Support AI (RAG · RAPTOR · LangGraph)
- SWatch360 Flutter mobile client (ThingsBoard PE)
- MGNREGA Transparency Dashboard (Node.js · Government Data Portal)

## Leveling Up
- System Design & Distributed Systems (Kafka · CQRS)
- AI Agentic Workflows (Multi-Agent Systems · LLM Fine-tuning)
- Industrial Edge Computing (K8s at the Edge)`,
  },
];

export const defaultFilePath = "src/home.tsx";

export function getPortfolioFile(path: string): IDEFile | undefined {
  return portfolioFiles.find((f) => f.path === path);
}
