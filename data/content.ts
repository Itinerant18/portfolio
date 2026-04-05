export const portfolioProfile = {
  name: "Aniket Karmakar",
  role: "Software Engineer | Full-Stack | AI/ML | Cloud",
  location: "Kolkata, West Bengal, India",
  headline:
    "Building full-stack applications, AI/ML systems, IoT automation, and cloud infrastructure.",
  availability: "Open to Generative AI, full-stack, and software development roles.",
  summary:
    "Software Engineer with experience in full-stack development, AI/ML systems, IoT, and cloud infrastructure. Proficient in Java, TypeScript, and Python, with a record of shipping real products across startup and enterprise settings.",
  focusAreas: [
    "Full-stack development and API architecture",
    "AI/ML integrations and Generative AI",
    "IoT automation and embedded systems",
    "Cloud infrastructure and deployment",
  ],
  links: {
    github: "github.com/Itinerant18",
    linkedin: "linkedin.com/in/aniket-karmakar",
    email: "aniketkarmakar018@gmail.com",
    website: "cursorfolio.dev",
  },
} as const;

export const portfolioProjects = [
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
    name: "Serendipity",
    year: "2025",
    role: "Developer",
    stack: ["TypeScript"],
    summary: "Discovery E-commerce product for surfacing unexpected, interesting content.",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Serendipity",
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
] as const;

export const skillMatrix = {
  frontend: [
    "React",
    "JSP",
    "Flutter",
    "Capacitor",
    "HTML/CSS",
  ],
  backend: [
    "Node.js",
    "REST APIs",
    "Firebase",
    "WebSockets",
    "Java",
    "Python",
  ],
  aiAndData: [
    "Computer Vision",
    "Gesture Recognition",
    "Time-Series ML",
    "Vector Embeddings",
  ],
  tooling: [
    "AWS (S3, Lambda)",
    "ESP32",
    "MQTT",
    "Git/GitHub",
    "Zoho Creator",
    "MLKit",
    "Agile/Scrum",
  ],
} as const;

export const experienceTimeline = [
  {
    company: "Security Engineers Pvt. Ltd. (SEPL)",
    role: "Junior Executive Engineer, R&D",
    period: "Dec 2024 - Present",
    location: "Kolkata",
    summary:
      "Building FAS-Control app, internal R&D tools, company website, and IoT automation workflows.",
    wins: [
      "Built FAS-Control: React + TypeScript Capacitor app using MLKit for QR-based ESP32 server management.",
      "Developed internal R&D tools in Java and JavaScript; built the company website using Zoho and custom CSS.",
      "Engineered IoT automation workflows integrating embedded hardware with cloud services.",
    ],
  },
  {
    company: "Ospider & Jspider Technologies",
    role: "Full-Stack Development Intern",
    period: "Mar 2024 - Jul 2024",
    location: "Kolkata",
    summary:
      "Delivered real-time chat applications, procedural dungeon-generation game, and participated in Agile sprints.",
    wins: [
      "Delivered a real-time chat application end-to-end using Java and JSP.",
      "Built a procedural dungeon-generation game in Java with automated environment testing.",
      "Participated in Agile sprints; collaborated across design and development cycles.",
    ],
  },
  {
    company: "Edu Skill",
    role: "AI & Machine Learning Intern",
    period: "Jun 2023 - Aug 2023",
    location: "Remote",
    summary:
      "Developed facial recognition algorithm and AI hand-gesture mouse-control system.",
    wins: [
      "Developed a facial recognition algorithm achieving 80% accuracy using Python and OpenCV.",
      "Built an AI hand-gesture mouse-control system enabling touchless computer interaction.",
    ],
  },
  {
    company: "Amazon AWS",
    role: "Cloud Computing Intern",
    period: "Jan 2023 - Jun 2023",
    location: "Remote",
    summary:
      "Deployed data pipelines in cloud-native AWS environments and contributed to AI-based projects.",
    wins: [
      "Deployed and maintained data pipelines using S3 and Lambda.",
      "Contributed to AI-based projects improving algorithm accuracy and cloud-side performance.",
    ],
  },
] as const;

export const contactDetails = {
  email: "aniketkarmakar018@gmail.com",
  github: "github.com/Itinerant18",
  linkedin: "linkedin.com/in/aniket-karmakar",
  phone: "7602676448",
  status: "Usually replies within 24 hours.",
} as const;

export const starterMessages = [
  {
    id: "welcome-assistant",
    role: "assistant" as const,
    content:
      "Ask about projects, skills, or professional experience. I'm Aniket's portfolio copilot.",
  },
] as const;

export function buildAIResponse(
  prompt: string,
  activeFileName?: string,
  _agentId?: string,
) {
  const normalized = prompt.toLowerCase();

  if (normalized.includes("project")) {
    return `Featured work: ${portfolioProjects
      .map((project) => `${project.name} (${project.year})`)
      .join(", ")}. I focus on building full-stack applications, AI/ML systems, and IoT solutions.`;
  }

  if (
    normalized.includes("stack") ||
    normalized.includes("skill") ||
    normalized.includes("technology")
  ) {
    const coreStack = [...skillMatrix.frontend, ...skillMatrix.backend];

    return `Core stack: ${coreStack
      .slice(0, 8)
      .join(", ")}. I specialize in full-stack development, AI/ML, IoT, and cloud infrastructure.`;
  }

  if (
    normalized.includes("contact") ||
    normalized.includes("hire") ||
    normalized.includes("reach")
  ) {
    return `You can reach Aniket at ${contactDetails.email}. His GitHub is ${contactDetails.github} and LinkedIn is ${contactDetails.linkedin}.`;
  }

  if (
    normalized.includes("experience") ||
    normalized.includes("career") ||
    normalized.includes("background")
  ) {
    return `Currently a ${experienceTimeline[0].role} at ${experienceTimeline[0].company}. Aniket has a strong background in electronics & communication engineering with a focus on full-stack and AI/ML.`;
  }

  if (
    normalized.includes("about") ||
    normalized.includes("who are you") ||
    normalized.includes("bio")
  ) {
    return `${portfolioProfile.name} is a ${portfolioProfile.role} based in ${portfolioProfile.location}. ${portfolioProfile.summary}`;
  }

  return `I can walk through ${activeFileName ?? "the portfolio"} in detail, explain the projects, or summarize Aniket's skills and experience.`;
}
