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
    name: "FAS-Control",
    year: "2025",
    role: "Developer",
    stack: ["TypeScript", "React", "Capacitor", "MLKit"],
    summary: "IoT control app: QR-scan to manage ESP32 web servers over local network.",
    association: "Security Engineers Pvt. Ltd. (SEPLE)",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/FAS-Control",
      "Published on Google Play Store",
      "Forks: " + "1"
    ],
  },
  {
    name: "Dexter Bot (RAG System)",
    year: "2026",
    role: "Developer",
    stack: ["Node.js", "React.js", "Tailwind CSS", "LangChain", "pgvector", "RAG", "GitHub Actions"],
    summary: "Professional-grade, cloud-native AI assistant for SEPLE HMS/Dexter Industrial Control Panels using Retrieval-Augmented Generation.",
    association: "Security Engineers Pvt. Ltd. (SEPLE)",
    impact: [
      "View on GitHub: " + "https://github.com/Itinerant18/Swacth360_bot",
      "Stars: " + "0"
    ],
  },
  {
    name: "Pookies AI Zone",
    year: "2024",
    role: "Developer",
    stack: ["Node.js", "Java JDK 21", "Android SDK", "Convex", "Git"],
    summary: "Personal AI tools directory — a mobile app with 3,500+ AI tools across 45 categories with side-by-side comparison.",
    impact: [
      "View on GitHub: " + "https://github.com/itineranti18/pookies-ai-zone",
      "Stars: " + "0"
    ],
  },
  {
    name: "Real-Time Chat Application",
    year: "2024",
    role: "Developer",
    stack: ["JSP", "Java", "CSS", "React.js", "SQL", "JDBC", "Core Java", "HTML5"],
    summary: "End-to-end real-time chatting application built with Java full-stack technologies.",
    association: "Jspider",
    impact: [
      "Delivered end-to-end using Java and JSP",
    ],
  },
  {
    name: "SWatch360",
    year: "2026",
    role: "Developer",
    stack: ["Flutter", "Dart"],
    summary: "Cross-platform companion mobile app for SWatch360, built on the ThingsBoard PE platform.",
    association: "Security Engineers Pvt. Ltd. (SEPLE)",
    impact: [
      "Published on Google Play Store",
      "View on GitHub: " + "https://github.com/Itinerant18/SWatch360",
      "Stars: " + "1"
    ],
  },
  {
    name: "Resume Builder — Claude Skill",
    year: "2025",
    role: "Developer",
    stack: ["Claude AI", "PDF Generation", "API Integration"],
    summary: "A Claude skill that builds ATS-optimized, recruiter-ready resumes by pulling data from GitHub, LinkedIn, LeetCode, Figma, and personal portfolio.",
    impact: [
      "Generates polished PDF in seconds",
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
    name: "SEPL Website",
    year: "2025",
    role: "Developer",
    stack: ["HTML", "CSS", "Zoho"],
    summary: "Official company website for Security Engineers Pvt. Ltd.",
    association: "Security Engineers Pvt. Ltd. (SEPLE)",
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
  },
] as const;

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
    location: "Noida, Uttar Pradesh, India · On-site",
    type: "Full-time",
    summary:
      "Building FAS-Control app, internal R&D tools, company website, SWatch360 mobile app, and IoT automation workflows.",
    wins: [
      "Built FAS-Control: React + TypeScript Capacitor app using MLKit for QR-based ESP32 server management.",
      "Developed Dexter Tech Support AI — a cloud-native RAG system for industrial control panels.",
      "Built SWatch360 Flutter mobile app on ThingsBoard PE platform.",
      "Developed internal R&D tools in Java and JavaScript; built the company website using Zoho and custom CSS.",
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
    company: "Cisco",
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
    location: "Kolkata, West Bengal",
  },
  {
    institution: "NSHM Knowledge Campus",
    degree: "Bachelor of Technology, Electronics and Communication Engineering",
    period: "Aug 2021 - Aug 2024",
    location: "Kolkata, West Bengal",
  },
  {
    institution: "Maulana Abul Kalam Azad University of Technology, West Bengal (WBUT)",
    degree: "Affiliated University",
    period: "2021 - 2024",
    location: "West Bengal",
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
