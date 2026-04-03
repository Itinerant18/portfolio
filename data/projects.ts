import repoMetadataRaw from "@/repos.json";

export interface ProjectLinks {
  github: string;
  demo?: string | null;
  apk?: string | null;
  docs?: string | null;
}

interface RepoMetadata {
  name: string;
  updatedAt?: string;
  fork?: boolean;
}

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  problem: string;
  type: string;
  primaryTech: string;
  techStack: string[];
  features: string[];
  architecture: string;
  highLevel?: string;
  flows?: string[];
  dataModels?: string[];
  backend?: string;
  dataStorage?: string;
  changelog?: string[];
  links: ProjectLinks;
  topics?: string[];
  updatedAt?: string;
  isFork?: boolean;
}

const repoMetadata = (repoMetadataRaw as RepoMetadata[]) ?? [];
const repoMetadataByName = new Map(
  repoMetadata.map((repo) => [repo.name, repo]),
);

const DEFAULT_CHANGELOG = [
  "Initial release and repository setup.",
  "Integrated core features and tech stack foundations.",
  "Optimized performance and UI responsiveness.",
  "Applied 'Cursor-Pro' IDE theme refinements."
];

// Offline fallback dataset used when live GitHub sync is unavailable.
export const fallbackProjects: Project[] = [
  {
    id: "Bohemian-optical",
    name: "Bohemian Optical",
    shortDescription: "Optical brand web presence built in TypeScript.",
    problem: "Gives an optical business a modern online showcase.",
    type: "Website",
    primaryTech: "TypeScript [CONFIRM framework]",
    techStack: [
      "TypeScript [CONFIRM framework]"
    ],
    features: [
      "UI pages",
      "Responsive layout"
    ],
    architecture: "Frontend-only website.",
    highLevel: "Visitor -> Web UI -> Static Content",
    flows: [
      "Browse products -> contact CTA"
    ],
    dataModels: [
      "Product: name, description"
    ],
    backend: "None [CONFIRM]",
    dataStorage: "Static content",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/Bohemian-optical",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "personal-colour-picker",
    name: "Personal Colour Picker",
    shortDescription: "Personal color palette tool built in JavaScript.",
    problem: "Helps users build and reuse color palettes quickly.",
    type: "Web tool",
    primaryTech: "JavaScript",
    techStack: [
      "JavaScript"
    ],
    features: [
      "Color picker UI",
      "Palette generator"
    ],
    architecture: "Frontend-only tool.",
    highLevel: "User -> Web UI -> Local State -> Palette Output",
    flows: [
      "Pick color -> generate palette -> copy"
    ],
    dataModels: [
      "Palette: colors[], name"
    ],
    backend: "None",
    dataStorage: "Local palette state",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/personal-colour-picker",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "calculator",
    name: "Calculator",
    shortDescription: "TypeScript calculator app with a clean UI.",
    problem: "Provides quick arithmetic in a friendly interface.",
    type: "Web tool",
    primaryTech: "TypeScript",
    techStack: [
      "TypeScript"
    ],
    features: [
      "Calculator UI",
      "Calculation logic"
    ],
    architecture: "Frontend-only tool.",
    highLevel: "User -> Web UI -> Local State -> Result",
    flows: [
      "Input values -> compute -> display"
    ],
    dataModels: [
      "None (local state)"
    ],
    backend: "None",
    dataStorage: "None (local state)",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/calculator",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "Dexter---webserver",
    name: "Dexter Webserver",
    shortDescription: "Python webserver backend foundation.",
    problem: "Provides a backend server layer for apps and APIs.",
    type: "Backend/API server",
    primaryTech: "Python",
    techStack: [
      "Python"
    ],
    features: [
      "HTTP server",
      "Routing/handlers"
    ],
    architecture: "Client requests -> Python server -> handlers.",
    highLevel: "Client -> Python Server -> Request Handlers -> Response",
    flows: [
      "Request received -> routed to handler",
      "Handler returns response"
    ],
    dataModels: [
      "Request: method, path, payload"
    ],
    backend: "Python HTTP server",
    dataStorage: "Request/response handlers",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/Dexter---webserver",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "pookie-s-fortune-teller",
    name: "Pookie's Fortune Teller",
    shortDescription: "Interactive fortune teller experience.",
    problem: "Generates playful predictions for end users.",
    type: "AI tool",
    primaryTech: "TypeScript [CONFIRM framework]",
    techStack: [
      "TypeScript [CONFIRM framework]"
    ],
    features: [
      "UI",
      "Prompt generator"
    ],
    architecture: "Frontend UI -> prompt logic.",
    highLevel: "User -> Web UI -> Prompt Logic -> Response",
    flows: [
      "User input -> generate fortune"
    ],
    dataModels: [
      "Prompt: text, category"
    ],
    backend: "[CONFIRM]",
    dataStorage: "Prompts + responses",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/pookie-s-fortune-teller",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "driver_centre",
    name: "Driver Centre",
    shortDescription: "Driver management UI for operations.",
    problem: "Centralizes driver data and workflows.",
    type: "Web app",
    primaryTech: "JavaScript",
    techStack: [
      "JavaScript"
    ],
    features: [
      "Driver list UI",
      "Search/filter"
    ],
    architecture: "Frontend-only interface.",
    highLevel: "User -> Web UI -> Data Source -> Results",
    flows: [
      "Search driver -> view details"
    ],
    dataModels: [
      "Driver: id, name, status"
    ],
    backend: "[CONFIRM]",
    dataStorage: "Driver profiles",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/driver_centre",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "HawkEye-Drone",
    name: "HawkEye Drone",
    shortDescription: "Drone monitoring and control project.",
    problem: "Supports drone oversight and telemetry workflows.",
    type: "IoT project",
    primaryTech: "[CONFIRM]",
    techStack: [
      "[CONFIRM]"
    ],
    features: [
      "Control interface",
      "Telemetry processor"
    ],
    architecture: "Controller -> drone device -> telemetry (inferred).",
    highLevel: "Operator -> Controller -> Drone -> Telemetry Feed",
    flows: [
      "Control command -> device action"
    ],
    dataModels: [
      "Telemetry: id, value, timestamp"
    ],
    backend: "[CONFIRM]",
    dataStorage: "Telemetry",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/HawkEye-Drone",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "pookies-ai-zone",
    name: "Pookies AI Zone",
    shortDescription: "AI playground for interactive prompts.",
    problem: "Lets users explore AI interactions quickly.",
    type: "Mobile app (AI tools directory)",
    primaryTech: "React Native + Expo",
    techStack: [
      "React Native + Expo",
      "TypeScript"
    ],
    features: [
      "Expo Router screens",
      "Convex queries/mutations",
      "Data ingestion scripts"
    ],
    architecture: "Frontend UI -> AI logic (inferred).",
    highLevel: "User -> Mobile UI -> Convex Client -> Convex Cloud; Automation -> Sources -> Processing -> Convex Sync",
    flows: [
      "Search -> query Convex -> render",
      "Daily sync -> update catalog -> realtime refresh"
    ],
    dataModels: [
      "Tool: id, name, category, features, updatedAt"
    ],
    backend: "Convex",
    dataStorage: "Tool catalog + categories",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/pookies-ai-zone",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "Local_Service_Finder-v.1",
    name: "Local Service Finder v1",
    shortDescription: "Local services discovery app (v1).",
    problem: "Helps users find local services quickly.",
    type: "Web app",
    primaryTech: "JavaScript",
    techStack: [
      "JavaScript"
    ],
    features: [
      "Listings UI",
      "Search/filter"
    ],
    architecture: "Frontend-only app.",
    highLevel: "User -> Web UI -> Listings -> Results",
    flows: [
      "Search -> show matching services"
    ],
    dataModels: [
      "Service: name, category, location"
    ],
    backend: "[CONFIRM]",
    dataStorage: "Service listings",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/Local_Service_Finder-v.1",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "pookies-banter-zone",
    name: "Pookies Banter Zone",
    shortDescription: "Lightweight chat and banter interface.",
    problem: "Enables quick conversational exchanges.",
    type: "Web app (chat UI)",
    primaryTech: "TypeScript [CONFIRM framework]",
    techStack: [
      "TypeScript [CONFIRM framework]"
    ],
    features: [
      "Chat UI",
      "Message store"
    ],
    architecture: "Frontend-only chat UI.",
    highLevel: "User -> Web UI -> [CONFIRM backend] -> Messages",
    flows: [
      "Send message -> store -> render"
    ],
    dataModels: [
      "Message: id, user, content, timestamp"
    ],
    backend: "[CONFIRM]",
    dataStorage: "Messages",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/pookies-banter-zone",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "SWatch360",
    name: "SWatch360",
    shortDescription: "Mobile monitoring experience built with Flutter.",
    problem: "Provides a 360-style monitoring workflow on mobile.",
    type: "Mobile app",
    primaryTech: "Flutter",
    techStack: [
      "Flutter",
      "Dart"
    ],
    features: [
      "Mobile UI screens",
      "Data fetching layer"
    ],
    architecture: "Mobile client application.",
    highLevel: "User -> Flutter App -> [CONFIRM backend/data source]",
    flows: [
      "Load dashboard -> fetch monitoring data"
    ],
    dataModels: [
      "Metric: id, value, timestamp"
    ],
    backend: "[CONFIRM]",
    dataStorage: "Monitoring data",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/SWatch360",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "blogisphere-connect-75",
    name: "Blogisphere Connect",
    shortDescription: "Blog publishing platform in TypeScript.",
    problem: "Organizes posts and reader experiences.",
    type: "Web app (blog)",
    primaryTech: "TypeScript [CONFIRM framework]",
    techStack: [
      "TypeScript [CONFIRM framework]"
    ],
    features: [
      "Post listing UI",
      "Reader view"
    ],
    architecture: "Frontend-only (inferred).",
    highLevel: "User -> Web UI -> Posts Store -> Render",
    flows: [
      "Browse posts -> read content"
    ],
    dataModels: [
      "Post: id, title, body, tags"
    ],
    backend: "[CONFIRM]",
    dataStorage: "Posts + categories",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/blogisphere-connect-75",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "ml-predicter",
    name: "ML Predicter",
    shortDescription: "Astrology + ML prediction engine.",
    problem: "Combines astrology with ML forecasting for insights.",
    type: "AI/ML system",
    primaryTech: "Python",
    techStack: [
      "Python"
    ],
    features: [
      "Feature engineering",
      "Model inference",
      "Result formatting"
    ],
    architecture: "Input -> ML models -> prediction output.",
    highLevel: "Input -> Feature Prep -> ML Models -> Predictions",
    flows: [
      "Input data -> forecast -> output result"
    ],
    dataModels: [
      "Prediction: target, value, confidence"
    ],
    backend: "ML inference pipeline",
    dataStorage: "Time-series + embeddings",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/ml-predicter",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "checkmate-arena-ai",
    name: "Checkmate Arena AI",
    shortDescription: "Chess arena with AI opponent.",
    problem: "Gives players a chess experience with AI.",
    type: "Game (AI chess)",
    primaryTech: "TypeScript [CONFIRM framework]",
    techStack: [
      "TypeScript [CONFIRM framework]"
    ],
    features: [
      "Chess UI",
      "Move validation",
      "AI opponent"
    ],
    architecture: "Frontend UI -> AI logic (inferred).",
    highLevel: "User -> Game UI -> AI Logic -> Move Result",
    flows: [
      "Player move -> validate -> AI response"
    ],
    dataModels: [
      "GameState: board, turn, history"
    ],
    backend: "[CONFIRM]",
    dataStorage: "Game state",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/checkmate-arena-ai",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "FAS-Control",
    name: "FAS Control",
    shortDescription: "Capacitor app using MLKit QR scanning for ESP32 control.",
    problem: "Manages local ESP32 web servers from mobile.",
    type: "Mobile + IoT control app",
    primaryTech: "React",
    techStack: [
      "React",
      "TypeScript",
      "Capacitor"
    ],
    features: [
      "QR scanner",
      "Device connection manager",
      "Control UI"
    ],
    architecture: "Mobile app -> ESP32 local web server.",
    highLevel: "User -> Mobile App -> QR Scan -> ESP32 Web Server",
    flows: [
      "Scan device QR -> connect -> control device"
    ],
    dataModels: [
      "Device: id, name, ip, status"
    ],
    backend: "ESP32 local web server",
    dataStorage: "Device metadata + QR scans",
    changelog: [
      "Initial Capacitor project scaffold.",
      "Implemented MLKit QR scanning bridge.",
      "Added local network device discovery logic.",
      "Developed ESP32 command control UI."
    ],
    links: {
      "github": "https://github.com/Itinerant18/FAS-Control",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "Serendipity",
    name: "Serendipity",
    shortDescription: "Discovery experience for unexpected finds.",
    problem: "Encourages serendipitous discoveries.",
    type: "Web app (discovery experience)",
    primaryTech: "JavaScript [CONFIRM framework]",
    techStack: [
      "JavaScript [CONFIRM framework]"
    ],
    features: [
      "UI views",
      "Discovery logic",
      "Content data source"
    ],
    architecture: "Frontend-only app.",
    highLevel: "User -> Web UI -> Content/Discovery Logic -> Results",
    flows: [
      "User triggers discovery -> returns suggestion"
    ],
    dataModels: [
      "Item: id, title, description, tags"
    ],
    backend: "[CONFIRM]",
    dataStorage: "Discovery content",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/Serendipity",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "Local_Service_Finder",
    name: "Local Service Finder",
    shortDescription: "Improved local service discovery in TypeScript.",
    problem: "Makes local service discovery faster and cleaner.",
    type: "Web app",
    primaryTech: "TypeScript",
    techStack: [
      "TypeScript"
    ],
    features: [
      "Listings UI",
      "Search/filter"
    ],
    architecture: "Frontend-only (inferred).",
    highLevel: "User -> Web UI -> Listings -> Results",
    flows: [
      "Search -> show matching services"
    ],
    dataModels: [
      "Service: name, category, location"
    ],
    backend: "[CONFIRM]",
    dataStorage: "Service listings",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/Local_Service_Finder",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "Security-Engineers-Pvt.-Ltd.-Website",
    name: "Security Engineers Pvt. Ltd.",
    shortDescription: "Company website built with Zoho and custom CSS.",
    problem: "Delivers a professional company web presence.",
    type: "Website",
    primaryTech: "Zoho + CSS",
    techStack: [
      "Zoho + CSS"
    ],
    features: [
      "Page templates",
      "CMS content"
    ],
    architecture: "CMS + custom styling.",
    highLevel: "Visitor -> Website UI -> CMS Content",
    flows: [
      "Visit page -> read services info"
    ],
    dataModels: [
      "Page: title, sections"
    ],
    backend: "CMS",
    dataStorage: "Static pages",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/Security-Engineers-Pvt.-Ltd.-Website",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "Ak_news",
    name: "Ak News",
    shortDescription: "News reader app in JavaScript.",
    problem: "Aggregates and displays news content.",
    type: "Web app",
    primaryTech: "JavaScript",
    techStack: [
      "JavaScript"
    ],
    features: [
      "Feed UI",
      "API client"
    ],
    architecture: "Frontend-only app.",
    highLevel: "User -> Web UI -> News API -> Articles",
    flows: [
      "Load feed -> fetch articles -> render list"
    ],
    dataModels: [
      "Article: title, source, url"
    ],
    backend: "[CONFIRM]",
    dataStorage: "News feeds",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/Ak_news",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "Ak_quize",
    name: "Ak Quize",
    shortDescription: "Quiz app for learning and practice.",
    problem: "Creates interactive quizzes for learners.",
    type: "Web app (quiz)",
    primaryTech: "JavaScript",
    techStack: [
      "JavaScript"
    ],
    features: [
      "Quiz UI",
      "Scoring logic"
    ],
    architecture: "Frontend-only quiz.",
    highLevel: "User -> Quiz UI -> Local Questions -> Score",
    flows: [
      "Start quiz -> answer questions -> show score"
    ],
    dataModels: [
      "Question: text, options, answer"
    ],
    backend: "None [CONFIRM]",
    dataStorage: "Quiz questions",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/Ak_quize",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "Itinerant18",
    name: "Itinerant18 Profile",
    shortDescription: "GitHub profile repository.",
    problem: "Summarizes developer identity and highlights.",
    type: "Profile/Documentation repo",
    primaryTech: "Markdown",
    techStack: [
      "Markdown"
    ],
    features: [
      "Profile README",
      "Links and badges"
    ],
    architecture: "Static profile content.",
    highLevel: "Reader -> GitHub README content",
    flows: [
      "Visitor loads profile -> reads summary"
    ],
    dataModels: [
      "None (static content)"
    ],
    backend: "None",
    dataStorage: "README content",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/Itinerant18",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "Financial-Advisor",
    name: "Financial Advisor",
    shortDescription: "Finance advisor experience in TypeScript.",
    problem: "Provides finance insights and recommendations.",
    type: "Web app",
    primaryTech: "TypeScript [CONFIRM framework]",
    techStack: [
      "TypeScript [CONFIRM framework]"
    ],
    features: [
      "UI for insights",
      "Recommendation logic"
    ],
    architecture: "Frontend-only (inferred).",
    highLevel: "User -> Web UI -> Advisor Logic -> Recommendations",
    flows: [
      "Input data -> generate recommendation"
    ],
    dataModels: [
      "Profile: income, goals, risk"
    ],
    backend: "[CONFIRM]",
    dataStorage: "Finance insights",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/Financial-Advisor",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "tic-tac-toee",
    name: "Tic Tac Toee",
    shortDescription: "Classic tic-tac-toe game.",
    problem: "Delivers a simple, fun browser game.",
    type: "Game",
    primaryTech: "JavaScript",
    techStack: [
      "JavaScript"
    ],
    features: [
      "Game board UI",
      "Win logic"
    ],
    architecture: "Frontend-only game.",
    highLevel: "User -> Game UI -> Local Game Logic",
    flows: [
      "Player move -> check win -> update board"
    ],
    dataModels: [
      "GameState: board, turn"
    ],
    backend: "None",
    dataStorage: "Game state",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/tic-tac-toee",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "finance-gpt",
    name: "Finance GPT",
    shortDescription: "Finance Q&A tool (AI inferred).",
    problem: "Explains finance questions quickly.",
    type: "AI tool",
    primaryTech: "JavaScript [CONFIRM framework]",
    techStack: [
      "JavaScript [CONFIRM framework]"
    ],
    features: [
      "Chat UI",
      "LLM integration"
    ],
    architecture: "Frontend UI -> AI logic (inferred).",
    highLevel: "User -> Web UI -> Chat API -> LLM -> Response",
    flows: [
      "Ask question -> fetch answer -> render"
    ],
    dataModels: [
      "Message: role, content, createdAt"
    ],
    backend: "[CONFIRM]",
    dataStorage: "Finance Q&A",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/finance-gpt",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "Swacth360_bot",
    name: "Swacth360 Bot",
    shortDescription: "Automation bot in TypeScript.",
    problem: "Automates monitoring or workflow tasks.",
    type: "Automation bot",
    primaryTech: "TypeScript [CONFIRM framework]",
    techStack: [
      "TypeScript [CONFIRM framework]"
    ],
    features: [
      "Bot runner",
      "API integrations",
      "Output handler"
    ],
    architecture: "Bot -> API/event sources (inferred).",
    highLevel: "Scheduler/Event -> Bot Logic -> External APIs -> Output/Notifications",
    flows: [
      "Trigger received -> run automation",
      "Call external API -> return output"
    ],
    dataModels: [
      "Event: id, type, timestamp, payload"
    ],
    backend: "[CONFIRM]",
    dataStorage: "Bot events/logs",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/Swacth360_bot",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "Animated_cube018",
    name: "Animated Cube 018",
    shortDescription: "HTML/CSS animation demo.",
    problem: "Showcases 3D animation techniques in the browser.",
    type: "Frontend experiment",
    primaryTech: "HTML/CSS",
    techStack: [
      "HTML/CSS"
    ],
    features: [
      "CSS animations",
      "Demo UI"
    ],
    architecture: "Static HTML/CSS.",
    highLevel: "User -> HTML/CSS -> Animation",
    flows: [
      "Load page -> animation renders"
    ],
    dataModels: [
      "None"
    ],
    backend: "None",
    dataStorage: "None",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/Animated_cube018",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "pookies-future-predicter",
    name: "Pookies Future Predicter",
    shortDescription: "Prediction app with a playful UI.",
    problem: "Delivers prediction-style outputs for users.",
    type: "AI tool",
    primaryTech: "TypeScript [CONFIRM framework]",
    techStack: [
      "TypeScript [CONFIRM framework]"
    ],
    features: [
      "UI",
      "Prompt generator"
    ],
    architecture: "Frontend UI -> logic (inferred).",
    highLevel: "User -> Web UI -> Prompt Logic -> Response",
    flows: [
      "User input -> generate prediction"
    ],
    dataModels: [
      "Prompt: text, category"
    ],
    backend: "[CONFIRM]",
    dataStorage: "Prompts + responses",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/pookies-future-predicter",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "MGNREGA-Tracker",
    name: "MGNREGA Tracker",
    shortDescription: "Tracker for MGNREGA data.",
    problem: "Surfaces program data in a clear UI.",
    type: "Web app",
    primaryTech: "JavaScript",
    techStack: [
      "JavaScript"
    ],
    features: [
      "Tracker UI",
      "Data fetcher"
    ],
    architecture: "Frontend-only tracker.",
    highLevel: "User -> Web UI -> Data Source -> Visuals",
    flows: [
      "Load dashboard -> fetch records -> render"
    ],
    dataModels: [
      "Record: id, amount, status, date"
    ],
    backend: "[CONFIRM]",
    dataStorage: "Program tracking data",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/MGNREGA-Tracker",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "animated",
    name: "Animated Experiments",
    shortDescription: "Animation experiments repository.",
    problem: "Explores animation techniques and motion.",
    type: "Frontend experiments",
    primaryTech: "[CONFIRM]",
    techStack: [
      "[CONFIRM]"
    ],
    features: [
      "Animation demos"
    ],
    architecture: "Static frontend demos.",
    highLevel: "User -> Frontend Demos -> Visuals",
    flows: [
      "Load demo -> render motion"
    ],
    dataModels: [
      "None"
    ],
    backend: "None",
    dataStorage: "None",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/animated",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "ThingsBoard---Bot",
    name: "ThingsBoard Bot",
    shortDescription: "Automation bot for ThingsBoard.",
    problem: "Automates tasks and alerts in ThingsBoard.",
    type: "Automation/IoT bot",
    primaryTech: "Python",
    techStack: [
      "Python"
    ],
    features: [
      "Bot runner",
      "API client",
      "Notification handler"
    ],
    architecture: "Bot -> ThingsBoard API (inferred).",
    highLevel: "Scheduler/Event -> Bot -> ThingsBoard API -> Alerts/Actions",
    flows: [
      "Poll/receive event -> trigger action"
    ],
    dataModels: [
      "DeviceMetric: deviceId, value, timestamp"
    ],
    backend: "ThingsBoard API",
    dataStorage: "Device metrics + alerts",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/ThingsBoard---Bot",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "docs",
    name: "Docs",
    shortDescription: "MDX documentation repository.",
    problem: "Centralizes documentation content.",
    type: "Documentation",
    primaryTech: "MDX",
    techStack: [
      "MDX"
    ],
    features: [
      "MDX pages",
      "Content structure"
    ],
    architecture: "Static docs.",
    highLevel: "Reader -> MDX content",
    flows: [
      "Read docs -> navigate sections"
    ],
    dataModels: [
      "Page: title, body, updatedAt"
    ],
    backend: "None",
    dataStorage: "Content pages",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/docs",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "portfolio",
    name: "Portfolio IDE",
    shortDescription: "IDE-style portfolio built with Next.js.",
    problem: "Showcases skills in an interactive experience.",
    type: "Web app",
    primaryTech: "Next.js",
    techStack: [
      "Next.js",
      "React",
      "TypeScript"
    ],
    features: [
      "App shell layout",
      "Code viewer + tabs",
      "Local data store"
    ],
    architecture: "Next.js app -> client-side UI.",
    highLevel: "User -> Next.js UI -> Client State (Zustand) -> Static Data (JSON)",
    flows: [
      "Open file -> render content",
      "Terminal command -> simulated output"
    ],
    dataModels: [
      "IDEFile: name, path, language, content"
    ],
    backend: "None",
    dataStorage: "Local JSON + Zustand state",
    changelog: [
      "Initial Project Conception.",
      "Built Core IDE Layout & Shell.",
      "Implemented Command Palette & Store.",
      "Redesigned Projects Marketplace to 'Pro Cursor' theme."
    ],
    links: {
      "github": "https://github.com/Itinerant18/portfolio",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "resume-builder-skill",
    name: "Resume Builder Skill",
    shortDescription: "Resume builder tool (inferred).",
    problem: "Generates resumes faster with structured inputs.",
    type: "Automation/AI tool",
    primaryTech: "[CONFIRM]",
    techStack: [
      "[CONFIRM]"
    ],
    features: [
      "Template definitions",
      "Input parser",
      "Output generator"
    ],
    architecture: "Input -> template generation (inferred).",
    highLevel: "User Input -> Template Engine -> Resume Output",
    flows: [
      "User provides details -> generate resume"
    ],
    dataModels: [
      "Profile: name, experience, skills, education"
    ],
    backend: "[CONFIRM]",
    dataStorage: "Resume templates + user inputs",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/resume-builder-skill",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "interactive-portfolio-oasis",
    name: "Interactive Portfolio Oasis",
    shortDescription: "Interactive portfolio experience.",
    problem: "Presents portfolio content in a dynamic UI.",
    type: "Web app (portfolio)",
    primaryTech: "TypeScript [CONFIRM framework]",
    techStack: [
      "TypeScript [CONFIRM framework]"
    ],
    features: [
      "UI sections",
      "Animation layer"
    ],
    architecture: "Frontend-only (inferred).",
    highLevel: "User -> Web UI -> Static Content",
    flows: [
      "Navigate sections -> view content"
    ],
    dataModels: [
      "None (static)"
    ],
    backend: "None [CONFIRM]",
    dataStorage: "Static content",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/interactive-portfolio-oasis",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "skills-introduction-to-github",
    name: "Skills Introduction to GitHub",
    shortDescription: "Learning repository for GitHub skills.",
    problem: "Tracks onboarding and practice steps.",
    type: "Learning repo",
    primaryTech: "Markdown",
    techStack: [
      "Markdown"
    ],
    features: [
      "README and exercises"
    ],
    architecture: "Docs/learning repo.",
    highLevel: "Reader -> GitHub docs content",
    flows: [
      "Reader follows steps -> completes tasks"
    ],
    dataModels: [
      "None (static content)"
    ],
    backend: "None",
    dataStorage: "Learning steps/content",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/skills-introduction-to-github",
      "demo": null,
      "apk": null,
      "docs": null
    },
  },
  {
    id: "chessverse-battlefield",
    name: "Chessverse Battlefield",
    shortDescription: "Chess game arena in TypeScript.",
    problem: "Lets users play chess in a modern UI.",
    type: "Game",
    primaryTech: "TypeScript [CONFIRM framework]",
    techStack: [
      "TypeScript [CONFIRM framework]"
    ],
    features: [
      "Chess UI",
      "Game rules"
    ],
    architecture: "Frontend-only game.",
    highLevel: "User -> Game UI -> Local Game Logic",
    flows: [
      "Player move -> update board"
    ],
    dataModels: [
      "GameState: board, turn"
    ],
    backend: "None [CONFIRM]",
    dataStorage: "Game state",
    changelog: DEFAULT_CHANGELOG,
    links: {
      "github": "https://github.com/Itinerant18/chessverse-battlefield",
      "demo": null,
      "apk": null,
      "docs": null
    },
  }
];

export const projects = fallbackProjects;

export const featuredProjectIds = [
  "FAS-Control",
  "ml-predicter",
  "portfolio",
  "Local_Service_Finder",
  "finance-gpt",
  "checkmate-arena-ai"
];

export const projectCategories: Record<string, string[]> = {
  "AI Projects": [
    "ml-predicter",
    "finance-gpt",
    "checkmate-arena-ai",
    "pookie-s-fortune-teller",
    "pookies-future-predicter",
    "pookies-ai-zone",
    "resume-builder-skill"
  ],
  "Web Projects": [
    "Bohemian-optical",
    "personal-colour-picker",
    "calculator",
    "driver_centre",
    "Local_Service_Finder-v.1",
    "Local_Service_Finder",
    "blogisphere-connect-75",
    "Serendipity",
    "Ak_news",
    "Ak_quize",
    "MGNREGA-Tracker",
    "portfolio",
    "interactive-portfolio-oasis"
  ],
  "Mobile Apps": [
    "SWatch360",
    "FAS-Control"
  ],
  "Automation / Bots": [
    "Swacth360_bot",
    "ThingsBoard---Bot",
    "resume-builder-skill"
  ],
  "Backend Systems": [
    "Dexter---webserver"
  ],
  "IoT Projects": [
    "HawkEye-Drone",
    "FAS-Control",
    "ThingsBoard---Bot"
  ],
  "Games / Experiments": [
    "tic-tac-toee",
    "chessverse-battlefield",
    "Animated_cube018",
    "animated"
  ]
};

export const skillsFromProjects = [
  "Full stack web applications",
  "AI powered tools",
  "Automation bots",
  "IoT systems",
  "Mobile applications",
  "Backend APIs",
  "Dashboards",
  "Real-time systems (inferred)",
  "Scrapers and automation (inferred)",
  "AI chatbots (inferred)",
  "Data analytics tools (inferred)"
];

export const projectTimeline = [
  {
    "year": "2022",
    "summary": "Basic projects, animations, games."
  },
  {
    "year": "2024",
    "summary": "Web apps and trackers."
  },
  {
    "year": "2025",
    "summary": "Finance, AI, automation."
  },
  {
    "year": "2026",
    "summary": "Advanced TypeScript, bots, AI systems."
  }
];

export function getProjectUpdatedAt(project: Project): string | null {
  return project.updatedAt ?? repoMetadataByName.get(project.id)?.updatedAt ?? null;
}

export function getProjectUpdatedAtValue(project: Project): number {
  const updatedAt = getProjectUpdatedAt(project);
  return updatedAt ? Date.parse(updatedAt) : 0;
}

export function isForkedProject(project: Project): boolean {
  const repo = repoMetadataByName.get(project.id);
  return Boolean(project.isFork ?? repo?.fork);
}

export function sortProjectsByUpdatedAt(items: Project[]): Project[] {
  return [...items].sort((left, right) => {
    const diff = getProjectUpdatedAtValue(right) - getProjectUpdatedAtValue(left);
    return diff !== 0 ? diff : left.name.localeCompare(right.name);
  });
}
