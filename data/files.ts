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
    summary: "IoT control app: QR-scan to manage ESP32 web servers over local network.",
    association: "SEPLE",
    impact: [
      "Published on Google Play Store",
      "Forks: " + "1"
    ],
  },
  {
    name: "Dexter Bot (RAG System)",
    year: "2026",
    role: "Developer",
    stack: ["Node.js", "React.js", "Tailwind CSS", "LangChain", "pgvector", "RAG"],
    summary: "Cloud-native AI assistant for SEPLE HMS/Dexter Industrial Control Panels.",
    association: "SEPLE",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Swacth360_bot",
    ],
  },
  {
    name: "Pookies AI Zone",
    year: "2024",
    role: "Developer",
    stack: ["Node.js", "Java JDK 21", "Android SDK", "Convex", "Git"],
    summary: "AI tools directory — 3,500+ tools across 45 categories with side-by-side comparison.",
    impact: [
      "View on GitHub: " + "https://github.com/itineranti18/pookies-ai-zone",
    ],
  },
  {
    name: "Real-Time Chat Application",
    year: "2024",
    role: "Developer",
    stack: ["JSP", "Java", "CSS", "React.js", "SQL", "JDBC", "HTML5"],
    summary: "End-to-end real-time chatting application with Java full-stack.",
    association: "Jspider",
    impact: [
      "Delivered end-to-end using Java and JSP",
    ],
  },
  {
    name: "SWatch360",
    year: "2026",
    role: "Developer",
    stack: ["Dart", "Flutter"],
    summary: "Cross-platform companion app on ThingsBoard PE platform.",
    association: "SEPLE",
    impact: [
      "Published on Google Play Store",
    ],
  },
  {
    name: "Resume Builder — Claude Skill",
    year: "2025",
    role: "Developer",
    stack: ["Claude AI", "PDF Generation", "API Integration"],
    summary: "ATS-optimized resume builder pulling from GitHub, LinkedIn, LeetCode, Figma.",
    impact: [
      "Generates polished PDF in seconds",
    ],
  },
  {
    name: "ML Predicter",
    year: "2025",
    role: "Developer",
    stack: ["Python", "ML", "Vector Embeddings"],
    summary: "Astrology engine + ML forecasting: time-series prediction, clustering.",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/ML-Predicter",
    ],
  },
  {
    name: "SEPL Website",
    year: "2025",
    role: "Developer",
    stack: ["HTML", "CSS", "Zoho"],
    summary: "Official company website for Security Engineers Pvt. Ltd.",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/SEPL-Website",
    ],
  },
  {
    name: "Dexter Webserver",
    year: "2025",
    role: "Developer",
    stack: ["Python"],
    summary: "Python-based local web server for IoT device communication and automation.",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Dexter-Webserver",
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
    "ESP32",
    "MQTT",
    "Cloud Pipelines"
  ],
  "tooling": [
    "Git",
    "GitHub",
    "Zoho Creator",
    "MLKit",
    "Agile/Scrum",
    "Docker",
    "GitHub Actions"
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
- Dexter Tech Support AI (RAG · Sarvam-M)
- SWatch360 Flutter mobile client

## Leveling Up
- System Design & Distributed Systems
- Kafka · CQRS · Kubernetes
- Multi-Agent AI · LLM Fine-tuning`,
  },
];

export const defaultFilePath = "src/home.tsx";

export function getPortfolioFile(path: string): IDEFile | undefined {
  return portfolioFiles.find((f) => f.path === path);
}
