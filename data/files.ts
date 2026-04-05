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
 * @name AniketKarmakar
 * @role Software Engineer | Full-Stack | AI/ML | Cloud
 * @description Building full-stack apps, AI/ML systems, IoT, and cloud infrastructure.
 */

export const Hero = () => {
  return (
    <div className="portfolio">
      <h1>Software Engineer | Full-Stack | AI/ML | Cloud</h1>
      <p>Specializing in Java, TypeScript, Python, and IoT Integrations.</p>
      <div className="status">
        Currently: Junior Executive Engineer, R&D @ SEPL, Kolkata
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
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/FAS-Control",
      "Forks: " + "1"
    ],
  },
  {
    name: "Dexter Bot",
    year: "2026",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "Intelligent automation bot; actively developed and maintained.",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Dexter-Bot",
      "Stars: " + "0"
    ],
  },
  {
    name: "ML Predicter",
    year: "2025",
    role: "Developer",
    stack: ["Python", "ML", "Vector Embeddings"],
    summary: "Astrology engine + ML forecasting: time-series prediction, clustering, AI vector embeddings.",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/ML-Predicter",
      "Stars: " + "0"
    ],
  },
  {
    name: "Financial-Advisor",
    year: "2025",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "AI-assisted financial advisory application with data-driven recommendation engine.",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Financial-Advisor",
      "Stars: " + "0"
    ],
  },
  {
    name: "SWatch360",
    year: "2026",
    role: "Developer",
    stack: ["Dart", "Flutter"],
    summary: "Cross-platform companion app targeting Android and iOS.",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/SWatch360",
      "Stars: " + "1"
    ],
  },
  {
    name: "Pookies AI Zone",
    year: "2025",
    role: "Developer",
    stack: ["React Native", "Expo"],
    summary: "Cross-platform AI zone app targeting Android and iOS.",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Pookies-AI-Zone",
      "Stars: " + "0"
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
      "Stars: " + "0"
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
      "Stars: " + "0"
    ],
  }
] as const;`,
  },
  {
    name: "projects.json",
    path: "src/projects.json",
    language: "json",
    content: `{
  "status": "synchronized",
  "source": "github",
  "owner": "Itinerant18",
  "last_sync": "2026-04-05",
  "projects_count": 8
}`,
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
    "Vector Embeddings"
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
    "Agile/Scrum"
  ]
}`,
  },
  {
    name: "about.html",
    path: "src/about.html",
    language: "tsx",
    content: `<!-- about.html -->
<section>
  <h1>About Aniket Karmakar</h1>
  <p>Software Engineer specialized in Full-Stack Development, AI/ML, IoT, and Cloud Infrastructure.</p>
</section>`,
  },
  {
    name: "experience.ts",
    path: "src/experience.ts",
    language: "ts",
    content: `export const experience = [
  {
    company: "Security Engineers Pvt. Ltd. (SEPL)",
    role: "Junior Executive Engineer, R&D",
    period: "Dec 2024 - Present"
  },
  {
    company: "Ospider & Jspider Technologies",
    role: "Full-Stack Development Intern",
    period: "Mar 2024 - Jul 2024"
  },
  {
    company: "Edu Skill",
    role: "AI & Machine Learning Intern",
    period: "Jun 2023 - Aug 2023"
  },
  {
    company: "Amazon AWS",
    role: "Cloud Computing Intern",
    period: "Jan 2023 - Jun 2023"
  }
];`,
  },
  {
    name: "contact.css",
    path: "src/contact.css",
    language: "ts",
    content: `.contact {
  email: "aniketkarmakar018@gmail.com";
  github: "Itinerant18";
  linkedin: "aniket-karmakar";
  phone: "7602676448";
}`,
  },
];

export const defaultFilePath = "src/home.tsx";

export function getPortfolioFile(path: string): IDEFile | undefined {
  return portfolioFiles.find((f) => f.path === path);
}
