export const portfolioProfile = {
  name: "Aniket Karmakar",
  pronouns: "He/Him",
  role: "Front-end UI Developer | React.js | Web Designer",
  headline: "Front-end UI Developer | React.js | Web Designer",
  location: "Kolkata, West Bengal, India",
  currentStatus: "Junior Software Engineer in R&D @ Security Engineers Pvt. Ltd. (SEPLE)",
  availability: "Open to software engineering internship & full-time opportunities.",
  summary:
    "Software Engineer with experience in full-stack development, AI/ML systems, IoT, and cloud infrastructure. Proficient in Java, TypeScript, and Python, with a record of shipping real products across startup and enterprise settings. Targeting Generative AI and software development roles.",
  about:
    "Pursuing a Bachelor of Technology in Electronics and Communication Engineering at NSHM Knowledge Campus, with a strong passion for Front-end UI Development and Full-stack Web Development. Actively working on building technical skills in Python and Java as core software, and a solid grip of HTML and CSS for web frontend. A passionate Web Developer with a strong foundation in Front-End Web Dev with competitive programming. Committed to leveraging technology to build scalable, unique software solutions. With a proven track record of rapidly understanding new technologies.",
  focusAreas: [
    "Full-stack development and API architecture",
    "AI/ML integrations and Generative AI",
    "IoT automation and embedded systems",
    "Cloud infrastructure and deployment",
    "Front-end UI/UX development with React.js",
  ],
  services: [
    "Web Design",
    "Software Testing",
    "Web Development",
    "Application Development",
    "Cloud Application Development",
  ],
  links: {
    github: "github.com/Itinerant18",
    linkedin: "linkedin.com/in/aniket-karmakar",
    email: "aniketkarmakar018@gmail.com",
    phone: "7602676448",
    website: "aniket.site",
  },
} as const;

export const portfolioProjects = [

  {
    name: "Chessverse Battlefield",
    year: "2025",
    role: "Developer",
    stack: ["TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
    summary: "High-performance, purely client-side chess engine and battlefield with advanced move validation and real-time state synchronization.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/chessverse-battlefield",
      "Zero-dependency move validation engine",
      "Sub-1ms engine evaluation latency",
      "Last Updated: April 2026"
    ],
  },
  {
    name: "MGNREGA Tracker",
    year: "2025",
    role: "Developer",
    stack: ["React 18", "Node.js", "Express", "Firebase", "Chart.js", "data.gov.in API"],
    summary: "Transparency platform for tracking MGNREGA performance across 26 districts, featuring real-time government API integration and hybrid CSV failovers.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/MGNREGA-Tracker",
      "Processes 26+ district datasets in real-time",
      "Bilingual support (English/Hindi)",
      "Automated fallback to localized CSV datasets"
    ],
  },
  {
    name: "ThingsBoard AI Bot",
    year: "2026",
    role: "Developer",
    stack: ["Python", "Flask", "OpenAI GPT-4", "ThingsBoard API", "Chart.js"],
    summary: "Industrial AI agent that bridges ThingsBoard IoT telemetry with generative reasoning for automated failure diagnosis and trend analysis.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/ThingsBoard---Bot",
      "Real-time telemetry trend analysis",
      "Automated industrial failure diagnosis",
      "Seamless embedded widget integration"
    ],
  },
  {
    name: "ML Predicter",
    year: "2025",
    role: "Developer",
    stack: ["Python", "Swiss Ephemeris", "XGBoost", "FastAPI", "Redis"],
    summary: "Hybrid predictive engine combining deterministic planetary harmonics (C-engine) with probabilistic time-series ML for high-precision forecasting.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/ml-predicter",
      "Sub-millisecond astronomical precision via C-bridge",
      "Temporal Bayesian Consensus layer",
      "Back-tested on 20+ years of historical data"
    ],
  },
  {
    name: "Financial-Advisor",
    year: "2025",
    role: "Developer",
    stack: ["Node.js", "OpenAI GPT-4o", "AlphaVantage API", "Vector Memory"],
    summary: "AI-native financial orchestration platform with long-term financial memory and real-time market telemetry grounding.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/Financial-Advisor",
      "Zero-hallucination market grounding",
      "AES-256 encrypted financial PII",
      "Long-term goal persistence via vector embeddings"
    ],
  },
  {
    name: "Serendipity",
    year: "2025",
    role: "Developer",
    stack: ["Next.js", "Dual-DB Supabase", "Stripe", "Framer Motion"],
    summary: "Discovery-first e-commerce engine using entropy-weighted feeds to surface unique, high-novelty products outside user filter bubbles.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/Serendipity",
      "Dual-DB architecture (Transactional vs Analytic)",
      "Entropy-weighted discovery algorithm",
      "Atomic checkout with zero-latency discovery"
    ],
  },
  {
    name: "SEPL Website",
    year: "2025",
    role: "Developer",
    stack: ["Zoho CMS", "Custom CSS/JS", "Zoho CRM API"],
    summary: "Official corporate platform for Security Engineers Pvt. Ltd. featuring an 'Industrial' design system and automated lead-capture pipeline.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/Security-Engineers-Pvt.-Ltd.-Website",
      "Integrated with Zoho CRM pipeline",
      "High-fidelity industrial design language",
      "Automated lead-scoring engine"
    ],
  },
  {
    name: "Dexter Webserver",
    year: "2025",
    role: "Developer",
    stack: ["Python Flask", "Modbus", "RTSP", "Raspberry Pi"],
    summary: "Resilient edge gateway for industrial IoT, abstracting Modbus, RTSP, and Serial protocols into a unified REST control plane.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/Dexter---webserver",
      "Plugin-based hardware driver architecture",
      "Optimized for air-gapped industrial edge",
      "Sub-50ms hardware command latency"
    ],
  },
  {
    name: "FAS-Control",
    year: "2025",
    role: "Developer",
    stack: ["TypeScript", "Capacitor", "React", "MLKit"],
    summary: "Industrial QR-to-IP control ecosystem for managing distributed ESP32 nodes over local networks with zero manual config.",
    association: "Security Engineers Pvt. Ltd. (SEPLE)",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/FAS-Control",
      "Published on Google Play Store",
      "High-speed MLKit QR resolution",
      "Secure per-device handshake protocol"
    ],
  },
  {
    name: "Dexter Bot (RAG System)",
    year: "2026",
    role: "Developer",
    stack: ["LangChain", "OpenAI", "pgvector", "FastAPI"],
    summary: "Enterprise RAG pipeline using RAPTOR hierarchical indexing to navigate 500+ pages of industrial technical documentation.",
    association: "Security Engineers Pvt. Ltd. (SEPLE)",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/Swacth360_bot",
      "RAPTOR-based hierarchical summarization",
      "95%+ precision on technical queries",
      "Integrated with LangGraph for reasoning loops"
    ],
  },
  {
    name: "Pookies AI Zone",
    year: "2024",
    role: "Developer",
    stack: ["React Native", "Convex Serverless", "Clerk", "Playwright"],
    summary: "Real-time AI discovery platform with automated scraping and LLM-based categorization of 3,500+ AI tools.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/pookies-ai-zone",
      "Live database subscriptions via Convex",
      "Automated daily scraping pipeline",
      "Categorization across 45+ semantic niches"
    ],
  },
  {
    name: "SWatch360",
    year: "2026",
    role: "Developer",
    stack: ["Flutter", "ThingsBoard PE", "MQTT", "WebSockets"],
    summary: "Industrial IoT companion app featuring 60FPS telemetry dashboards and real-time critical alarm management.",
    association: "Security Engineers Pvt. Ltd. (SEPLE)",
    impact: [
      "Published on Google Play Store",
      "View on GitHub: https://github.com/Itinerant18/SWatch360",
      "60FPS real-time industrial charts",
      "Zero-latency MQTT alarm integration"
    ],
  },
  {
    name: "Resume Builder — Claude Skill",
    year: "2025",
    role: "Developer",
    stack: ["Claude MCP", "Puppeteer", "GitHub API", "LaTeX"],
    summary: "AI-powered professional identity orchestrator that synthesizes live contributions into ATS-optimized PDF documents.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/resume-builder-skill",
      "Generates ATS-ready PDFs in <6s",
      "Live GitHub metric synthesis",
      "Built on Model Context Protocol (MCP)"
    ],
  },
  {
    name: "Real-Time Chat Application",
    year: "2024",
    role: "Developer",
    stack: ["Java JEE", "Servlets", "JSP", "JDBC", "PostgreSQL"],
    summary: "High-security internal communication platform built on a hardened Three-Tier Java architecture with zero cloud dependencies.",
    association: "Jspider",
    impact: [
      "Hardened Three-Tier architecture",
      "Zero-dependency on public cloud",
      "PBKDF2/BCrypt security layers",
      "Optimized JDBC connection pooling"
    ],
  },
  {
    name: "MediFlow",
    year: "2026",
    role: "Developer",
    stack: ["Flutter", "Supabase", "Firebase", "Dart"],
    summary: "Healthcare management platform with three-tier RBAC, real-time patient data management, and an 'Organic/Natural' Wabi-Sabi design system.",
    impact: [
      "View on GitHub: https://github.com/Itinerant18/med",
      "Three-tier role system (Doctor/Assistant/Staff)",
      "Organic 'Wabi-Sabi' design language",
      "Real-time push notifications via Firebase"
    ],
  },
];


export const skillMatrix = {
  languages: [
    "Java",
    "TypeScript",
    "Python",
    "JavaScript",
    "Dart",
    "SQL",
  ],
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
  ],
  aiAndData: [
    "Computer Vision",
    "Gesture Recognition",
    "Time-Series ML",
    "Vector Embeddings",
    "RAG",
    "LangChain",
  ],
  tooling: [
    "AWS (S3, Lambda)",
    "ESP32",
    "MQTT",
    "Git/GitHub",
    "Zoho Creator",
    "MLKit",
    "Agile/Scrum",
    "Docker",
    "GitHub Actions",
  ],
} as const;

export const experienceTimeline = [
  {
    company: "Security Engineers Pvt. Ltd. (SEPLE)",
    role: "Junior Software Engineer in R&D department",
    period: "Oct 2024 - Present",
    location: "Kolkata, West Bengal, India · On-site",
    type: "Full-time",
    summary:
      "Building FAS-Control app, internal R&D tools, company website, SWatch360 mobile app, and IoT automation workflows.",
    wins: [
      "Built FAS-Control: React + TypeScript Capacitor app using MLKit for QR-based ESP32 server management.",
      "Developed Dexter Tech Support AI — a cloud-native RAG system for industrial control panels.",
      "Built SWatch360 Flutter mobile app on ThingsBoard PE platform.",
      "Developed internal R&D tools in Python and JavaScript; built the company website using Zoho and custom CSS.",
      "Engineered IoT automation workflows integrating embedded hardware with cloud services.",
    ],
  },
  {
    company: "Jspiders",
    role: "Internship - Java Full Stack Developer program",
    period: "May 2024 - Oct 2024",
    location: "India",
    type: "Internship",
    summary:
      "Full-stack development using Java, JSP, and modern web technologies.",
    wins: [
      "Delivered a real-time chat application end-to-end using Java and JSP.",
      "Built a procedural dungeon-generation game in Java with automated environment testing.",
      "Participated in Agile sprints; collaborated across design and development cycles.",
    ],
  },
  {
    company: "Qspiders",
    role: "Internship - Software Testing",
    period: "Apr 2024 - Oct 2024",
    location: "India",
    type: "Internship",
    summary:
      "Software testing methodologies and quality assurance practices.",
    wins: [
      "Gained expertise in software testing methodologies and automation testing.",
      "Worked on test case design, execution, and defect tracking.",
    ],
  },
  {
    company: "Edu Skills",
    role: "Internship - Cloud Computing",
    period: "Jan 2024 - May 2024",
    location: "Remote",
    type: "Internship",
    summary:
      "Cloud computing fundamentals and infrastructure management with Cisco technologies.",
    wins: [
      "Deployed and maintained cloud infrastructure and services.",
      "Gained hands-on experience with cloud-native environments and networking.",
    ],
  },
] as const;

export const educationTimeline = [
  {
    institution: "NSHM College of Management and Technology",
    degree: "Bachelor of Technology - BTech, Electronics and Communication Engineering",
    period: "Apr 2020 - Aug 2024",
    grade: "8.6",
    location: "Durgapur, West Bengal",
  },
  {
    institution: "Jemo NN High School",
    degree: "Higher Secondary",
    period: "Feb 2018 - Jun 2020",
    location: "India",
  },
] as const;

export const certifications = [
  {
    name: "Cloud Computing",
    issuer: "Amazon AWS",
    date: "Jun 2023",
  },
  {
    name: "AI & Machine Learning",
    issuer: "Edu Skill",
    date: "Aug 2023",
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
