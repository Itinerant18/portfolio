export type VisualFlowNode = { label: string; icon: string };

export interface ProjectArchitectureOverride {
  problem?: string;
  architecture?: string;
  highLevel?: string;
  visualFlow?: VisualFlowNode[];
  mermaidDiagrams?: string[];
  flows?: string[];
  dataModels?: string[];
  backend?: string;
  dataStorage?: string;
  liveUrl?: string | null;
  rationale?: string;
  security?: string;
  performance?: string;
  testing?: string;
  scalability?: string;
}

const architectureOverrides: Record<string, ProjectArchitectureOverride> = {
  portfolio: {
    problem:
      "Modern engineering portfolios require more than static text; they need to demonstrate 'Technical Aesthetic' and real-world system complexity (IDE simulations, VFS, and complex state synchronization) while maintaining sub-second performance and SEO excellence.",
    architecture:
      "A high-performance Next.js 15 (App Router) engine utilizing React 19 Concurrent Mode. It implements a 'Virtual File System' (VFS) to simulate an IDE environment, with a centralized Zustand 5 store managing global state, terminal history, and workspace layout. The UI uses Framer Motion for hardware-accelerated animations and Vanta.js for dynamic shader backgrounds.",
    highLevel: "Next.js 15 (App Router) -> React 19 -> Tailwind v4 -> Framer Motion 12 -> Zustand 5 -> Lucide Icons",
    visualFlow: [
      { label: "Edge Gateway", icon: "cloud" },
      { label: "IDE Kernel", icon: "monitor" },
      { label: "VFS Service", icon: "file-code" },
      { label: "State Sync", icon: "refresh-cw" },
    ],
    mermaidDiagrams: [
      `graph TD
    subgraph Client_Side [Runtime Environment]
    User([User]) --> UI[Next.js 15 UI Layer]
    UI --> Store[Zustand State Engine]
    Store --> VFS[Virtual File System]
    Store --> Router[Workspace Router]
    UI --> Motion[Framer Motion 12]
    UI --> Shaders[Vanta.js Shaders]
    end
    subgraph Build_Time [Static Generation]
    RSC[Server Components] --> Registry[Project Data Registry]
    Registry --> Content[Markdown/TS Assets]
    end
    UI <--> RSC`,
      `sequenceDiagram
    participant U as User
    participant S as Zustand Store
    participant V as VFS Resolver
    participant T as Terminal
    U->>T: Type 'ls projects'
    T->>S: Dispatch COMMAND_EXEC
    S->>V: Query Directory Structure
    V-->>S: Return Directory Map
    S-->>T: Render List Output
    T->>T: Animate Line Reveal`,
    ],
    flows: [
      "Initial load triggers Next.js Server Components to fetch project metadata and hydrate the Zustand store.",
      "Workspace synchronization ensures that the 'Active File' state is broadcast to the Code Editor, Terminal, and Sidebar simultaneously.",
      "The 'IDE Kernel' interceptor routes file selection events to the VFS resolver, which loads code snippets from the static registry.",
    ],
    dataModels: [
      "IDEFile: { name, path, language, content, size, lastModified }",
      "WorkspaceState: { activeFileId, openTabs, terminalHistory: [], currentDir, themeConfig: { mode, palette } }",
    ],
    backend: "Next.js Serverless Functions (Edge Runtime) for light API operations.",
    dataStorage: "Static Asset Registry (TypeScript/JSON) optimized for fast hydration and SEO indexing.",
    rationale: "Selected Next.js 15 and React 19 to leverage server-side rendering for core SEO content while keeping the 'IDE experience' highly interactive and client-side via Zustand and Framer Motion.",
    security: "Strict Content Security Policy (CSP); sanitization of terminal inputs to prevent command-injection simulation escapes; static-only data sources to minimize attack surface.",
    performance: "99/100 Lighthouse score; optimized bundle size via code-splitting; sub-10ms state transition latency in the IDE kernel.",
    testing: "Unit tests for VFS resolution logic via Vitest; E2E interaction testing for terminal commands and workspace routing via Playwright.",
    scalability: "Architecture allows for adding thousands of 'virtual files' without performance degradation, using a O(1) hash-map lookup for file resolution.",
  },
  "fas-control": {
    problem:
      "Industrial IoT deployments (ESP32) are often difficult to discover and manage in field environments. Manual IP entry is error-prone, and high latency in control commands can be dangerous in industrial settings.",
    architecture:
      "A cross-platform mobile ecosystem (Capacitor) that bridges the gap between native hardware and web-standard control. It features a high-speed QR-to-IP resolution engine powered by Google MLKit and a persistent TCP/HTTP handshake protocol for secure, low-latency device pairing. The app utilizes a 'Virtual Control Plane' to manage distributed ESP32 nodes over local networks.",
    highLevel: "React (Vite) -> Capacitor -> Google MLKit -> TCP Handshake -> ESP32-S3 WebServer (C++)",
    visualFlow: [
      { label: "Operator App", icon: "smartphone" },
      { label: "Vision Engine", icon: "camera" },
      { label: "Edge Gateway", icon: "cpu" },
      { label: "HW Actuators", icon: "settings" },
    ],
    mermaidDiagrams: [
      `flowchart TD
    subgraph Mobile_App [Capacitor Client]
    Scan[QR Scanner - MLKit] --> Resolve[IP Resolver]
    Resolve --> Auth[Handshake Manager]
    Auth --> Control[Real-time Dashboard]
    end
    subgraph Hardware [ESP32-S3 Node]
    Srv[Async WebServer] --> GPIO[GPIO Controller]
    Srv --> Sensors[Telemetry Engine]
    end
    Resolve -- Decoded IP --> Srv
    Control -- POST Command --> Srv
    Sensors -- JSON Update --> Control`,
      `sequenceDiagram
    participant App as Mobile App
    participant ML as MLKit Engine
    participant HW as ESP32 Hardware
    App->>ML: Start Frame Analysis
    ML-->>App: QR Decoded { "id": "HESTIA-01", "ip": "192.168.1.50" }
    App->>HW: POST /auth/handshake { "key": "SECURE_TOKEN" }
    HW-->>App: 200 OK (Connection Established)
    App->>HW: POST /relay/1/toggle
    HW->>HW: Toggle Physical Relay
    HW-->>App: 200 OK { "state": "ON", "temp": 45.2 }`,
    ],
    flows: [
      "MLKit detects and decodes the Hestia QR code, extracting the device's unique identifier and local IP signature.",
      "The app initiates a secure handshake with the ESP32 server, exchanging encrypted tokens for session validation.",
      "The control engine dispatches optimized POST requests to hardware endpoints, receiving real-time status and telemetry updates.",
    ],
    dataModels: [
      "DeviceNode: { id, ip, mac, hardwareModel, firmwareVersion, lastSeen }",
      "ControlState: { relayStates: boolean[], sensorData: { temperature: float, humidity: float } }",
    ],
    backend: "Embedded C++ (Arduino/ESP-IDF) utilizing ESPAsyncWebServer for non-blocking I/O and mDNS for backup discovery.",
    dataStorage: "Local AsyncStorage for device history; SPIFFS on ESP32 for persistent configuration storage.",
    rationale: "Capacitor was chosen to allow the use of a unified React/TypeScript codebase for complex business logic while maintaining native access to camera drivers for high-performance MLKit scanning. Vite ensures sub-second HMR during development.",
    security: "Handshake protocol uses per-device salt; local network isolation prevents external exposure; secure token required for every GPIO toggle; HTTPS support for encrypted local traffic.",
    performance: "Optimized for <100ms end-to-end latency from screen-tap to physical relay activation; minimal CPU overhead via efficient JSON serialization.",
    testing: "Verified over 500+ hardware cycles; thermal testing for ESP32 stability under load; field-tested for QR discovery in low-light industrial settings; Unit tests for IP resolution logic.",
    scalability: "Design supports hierarchical 'Zone' management, allowing a single operator instance to control up to 256 hardware nodes per subnet; stateless control protocol allows easy migration to cloud-based management.",
  },
  swacth360_bot: {
    problem:
      "Enterprise technical support at SEPLE is bottlenecked by vast, unstructured documentation (500+ pages). Field engineers spend too much time searching for procedures, leading to increased downtime and operational costs.",
    architecture:
      "A production-grade RAG (Retrieval-Augmented Generation) pipeline using a multi-level indexing strategy. It implements RAPTOR (Recursive Abstractive Processing for Tree-Organized Retrieval) to bridge the gap between granular technical steps and high-level system logic. The system uses semantic reranking to achieve 95%+ precision on technical queries.",
    highLevel: "LangChain -> OpenAI text-embedding-3-large -> Supabase (pgvector) -> GPT-4o -> FastAPI",
    visualFlow: [
      { label: "Engineer UI", icon: "user" },
      { label: "Retrieval", icon: "search" },
      { label: "Context Window", icon: "layers" },
      { label: "AI Reasoning", icon: "cpu" },
    ],
    mermaidDiagrams: [
      `flowchart TD
    subgraph Ingestion_Pipeline [Data Engineering]
    PDF[Manuals] --> Chunk[Semantic Chunking]
    Chunk --> RAPTOR[Hierarchical Summarization]
    RAPTOR --> Embed[Embedding Generation]
    Embed --> VS[(pgvector Store)]
    end
    subgraph RAG_Runtime [Query Engine]
    Q[User Query] --> Q_Embed[Query Embedding]
    Q_Embed --> Search[HNSW Vector Search]
    Search --> Rerank[Cross-Encoder Reranker]
    Rerank --> Prompt[Context-Augmented Prompt]
    Prompt --> LLM[GPT-4o Reasoning]
    LLM --> Ans[Answer with Citations]
    end`,
      `sequenceDiagram
    participant E as Engineer
    participant R as RAG Service
    participant V as Vector DB
    participant L as LLM
    E->>R: "How do I recalibrate the HMS relay?"
    R->>V: Similarity Search (Top 10 chunks)
    V-->>R: Return Raw Context
    R->>R: Rerank chunks by relevance
    R->>L: Generate response with top 3 chunks
    L-->>R: Return Answer + Citations
    R-->>E: "Step 1: Open panel... (Ref: Manual p.42)"`,
    ],
    flows: [
      "The RAPTOR ingestion engine builds a tree of summaries, allowing the AI to understand high-level architecture as well as low-level pins.",
      "Query expansion techniques transform simple user questions into robust search vectors to improve recall accuracy.",
      "The system enforces strict citation rules, ensuring that every claim made by the AI is backed by a specific document source.",
    ],
    dataModels: [
      "ContextChunk: { id, content, embedding: Vector(3072), metadata: { source, page, section_id } }",
      "SupportSession: { userId, query, contextUsed: [], finalResponse, feedbackScore }",
    ],
    backend: "Python FastAPI with asynchronous task processing; integrated with LangGraph for complex reasoning loops.",
    dataStorage: "Supabase (PostgreSQL) with pgvector extension for high-dimensional vector storage and HNSW indexing.",
    rationale: "Selected RAPTOR to solve the 'Lost in the Middle' problem common in traditional RAG, enabling the system to answer broad, structural questions about SEPLE hardware. OpenAI's text-embedding-3-large was chosen for its 3072-dimension semantic richness.",
    security: "Enterprise-grade PII filtering via Presidio; data-at-rest encryption; isolated tenant environments; strict CORS and API-Key validation.",
    performance: "Semantic caching with Redis reduces LLM API costs by 40%; HNSW indexing provides sub-50ms vector search latency across 100k+ chunks.",
    testing: "Automated 'Faithfulness' and 'Relevance' benchmarking using RAGAS; manual review of 200+ edge-case technical queries; Pytest for API endpoints.",
    scalability: "Stateless API horizontally scales with Docker; Supabase handles concurrent vector searches via PgBouncer; modular ingestion can handle GBs of PDF data.",
  },
  "pookies-ai-zone": {
    problem:
      "The rapid proliferation of AI tools makes it impossible for users to track, compare, and discover high-quality solutions. Existing directories are either static, slow, or lack real-time synchronization.",
    architecture:
      "A real-time AI discovery platform featuring a high-performance React Native (Expo) frontend and a serverless Convex backend. It uses an automated scraping pipeline (Playwright) to continuously ingest and categorize thousands of AI tools, serving them via live database subscriptions. The app implements a 'Universal Search' experience with sub-10ms latency.",
    highLevel: "React Native (Expo SDK 51) -> Convex Serverless -> Python (Playwright) -> Clerk Auth",
    visualFlow: [
      { label: "Scraper Engine", icon: "activity" },
      { label: "Convex Cloud", icon: "server" },
      { label: "Real-time UI", icon: "refresh-cw" },
      { label: "User App", icon: "smartphone" },
    ],
    mermaidDiagrams: [
      `graph TD
    subgraph Data_Acquisition [Scrapers]
    PW[Playwright Crawler] -->|Extract| Raw[Raw Tool JSON]
    Raw -->|Categorize| AI[GPT-4o Classifier]
    end
    subgraph Backend_Layer [Convex]
    AI -->|Upsert| DB[(Convex Live DB)]
    DB -->|FTS| Search[Search Engine]
    DB -->|Triggers| Actions[Background Tasks]
    end
    subgraph Client_Layer [Expo App]
    Search -->|Live Stream| UI[React Native UI]
    UI -->|Bookmark| DB
    UI -->|Profile| Clerk[Clerk Auth]
    end`,
    ],
    flows: [
      "Scrapers monitor 50+ AI news sources daily, normalizing data into 45+ niches (Generative Video, LLMs, etc.).",
      "Convex 'Live Queries' automatically push database updates to all connected mobile clients without polling.",
      "The AI Categorizer uses LLM-based reasoning to assign semantic tags and quality scores to new entries automatically.",
    ],
    dataModels: [
      "AITool: { id, name, description, tags: [], pricingType, url, rating, monthlyVisitors, lastVerified }",
      "UserCollection: { userId, toolIds: [], notes: Map<id, string> }",
    ],
    backend: "Convex Serverless (TypeScript) for database, functions, and storage.",
    dataStorage: "Convex Cloud Database with integrated full-text search (FTS) and vector indexing.",
    rationale: "Convex was chosen over Firebase to eliminate the complexity of manual WebSocket management and to benefit from its deterministic server-side logic. Expo SDK 51 provides a stable, modern foundation for the mobile experience.",
    security: "Clerk-powered authentication with JWT validation; server-side mutation rules prevent unauthorized data modification; scraping pipeline uses isolated environments; rate-limiting on discovery APIs.",
    performance: "Sub-10ms search latency across 4,000+ entries; zero-polling architecture minimizes battery drain; optimized image delivery via Convex Storage CDN and WebP format.",
    testing: "Integration testing for scraper resiliency; snapshot testing for UI components; manual multi-device audit on Android (Pixel 8) and iOS (iPhone 15); automated search relevance tests.",
    scalability: "Serverless architecture scales to zero and handles bursts of 100k+ concurrent users during major AI releases automatically; optimized indexing for millions of tool records.",
  },
  swatch360: {
    problem:
      "Industrial monitoring requires a mobile-first, high-fidelity view into millions of telemetry points. Field engineers need real-time alerts and historical trends to prevent hardware failure and optimize efficiency.",
    architecture:
      "A professional-grade Flutter application integrated with the ThingsBoard PE IoT platform. It utilizes a custom Repository/Service pattern to bridge ThingsBoard's enterprise APIs with real-time WebSocket telemetry streams and high-performance charting engines. The UI features an 'Industrial Dashboard' with 60FPS telemetry updates.",
    highLevel: "Flutter (Dart) -> ThingsBoard PE API -> MQTT Gateway -> Industrial Hardware",
    visualFlow: [
      { label: "Hardware Node", icon: "cpu" },
      { label: "IoT Platform", icon: "layers" },
      { label: "Flutter Client", icon: "smartphone" },
      { label: "Alert Engine", icon: "bell" },
    ],
    mermaidDiagrams: [
      `graph TD
    subgraph Hardware_Layer [Edge Nodes]
    D1[Relay Node] -->|MQTT| TB[ThingsBoard PE]
    D2[Sensor Node] -->|MQTT| TB
    end
    subgraph Platform_Layer [Core IoT]
    TB -->|Rule Engine| RE[Alarm Manager]
    TB -->|Data Flow| WS[WebSocket Provider]
    end
    subgraph Mobile_Layer [Flutter App]
    WS -->|Live Telemetry| UI[Real-time Dashboard]
    UI -->|API Request| TB
    UI -->|Trigger Action| D1
    end`,
      `sequenceDiagram
    participant D as Industrial Device
    participant T as ThingsBoard
    participant F as Flutter App
    D->>T: MQTT Telemetry { "power": 1250 }
    T->>T: Check Alarm Rule (>1200)
    T->>T: Create Critical Alarm
    T-->>F: WebSocket Event (New Alarm)
    F->>F: Trigger Push Notification
    F->>T: GET /alarm/history
    T-->>F: Return Historic JSON`,
    ],
    flows: [
      "The ThingsBoard Rule Engine monitors incoming MQTT payloads, triggering alarms based on complex multi-sensor logic.",
      "The Flutter client maintains a persistent WebSocket connection for 'Live' telemetry while using REST for 'Historical' data analysis.",
      "Custom UI widgets render dense, 60FPS charts that allow engineers to pinpoint exact failure moments in time-series data.",
    ],
    dataModels: [
      "IoTEntity: { id, type, name, attributes: Map<string, any>, latestTelemetry: Map<string, float> }",
      "AlarmRecord: { id, severity, type, status, details, startTime, updateTime }",
    ],
    backend: "ThingsBoard Professional Edition (Java/Spring) deployed in a high-availability cluster configuration.",
    dataStorage: "Cassandra for high-throughput time-series data; PostgreSQL for relational entity metadata and audit logs.",
    rationale: "Flutter's Skia engine was chosen for its ability to render complex, multi-series industrial charts with consistent 60FPS performance across diverse Android/iOS hardware. ThingsBoard PE provides the necessary enterprise security and rule-engine features.",
    security: "JWT session management with sliding expiry; Tenant/Customer isolation strictly enforced at the DB level; SSL/TLS for all MQTT, WS, and HTTP traffic; Device-level authentication tokens.",
    performance: "Aggressive local caching with Hive reduces metadata fetch times by 85%; optimized WebSocket buffer management for high-frequency (10Hz+) telemetry updates; lazy-loading of historical chart data.",
    testing: "Unit tests for repository patterns; field testing with real PLC hardware; automated E2E testing for critical alarm acknowledgment flows via integration tests; Flutter Gold for UI regression.",
    scalability: "Design supports monitoring of 10,000+ devices per tenant, with ThingsBoard handling horizontal scaling of the data ingestion layer; Flutter's state management handles complex dashboard states efficiently.",
  },
  "resume-builder-skill": {
    problem:
      "Developers' professional profiles are scattered across GitHub, LinkedIn, and personal portfolios. Manually keeping a resume updated and ATS-optimized is tedious and leads to outdated information.",
    architecture:
      "A Claude AI Skill (MCP) that functions as a data orchestrator. It bridges the gap between AI reasoning and live professional APIs (GitHub, LinkedIn). The skill fetches real-time contributions, synthesizes them into professional narratives, and renders them into high-fidelity PDFs.",
    highLevel: "Claude AI -> MCP SDK (TypeScript) -> GitHub API -> Puppeteer/LaTeX Rendering",
    visualFlow: [
      { label: "Developer", icon: "user" },
      { label: "Claude UI", icon: "zap" },
      { label: "MCP Engine", icon: "server" },
      { label: "Portfolio Data", icon: "file-text" },
    ],
    mermaidDiagrams: [
      `graph TD
    User[Developer] -->|Prompt| AI[Claude LLM]
    AI -->|Tool Call| MCP[Resume Builder MCP]
    subgraph Data_Layer [Live APIs]
    MCP -->|Fetch| GH[GitHub - Repos/Stars]
    MCP -->|Fetch| LI[LinkedIn - Experience]
    MCP -->|Fetch| LC[LeetCode - Stats]
    end
    GH --> MCP
    LI --> MCP
    MCP -->|Context| AI
    AI -->|Generated Content| MCP
    MCP -->|Render| PDF[ATS-Ready PDF]`,
    ],
    flows: [
      "The MCP skill queries GitHub to identify the most impactful repositories based on stars, commits, and complexity.",
      "Claude analyzes the raw data to create high-impact, action-oriented bullet points tailored for software engineering roles.",
      "The final document is rendered via a headless browser engine, ensuring pixel-perfect layout and ATS compatibility.",
    ],
    dataModels: [
      "ContributionData: { repoName, role, technologies: [], metrics: { commits, stars }, duration }",
      "ResumeSchema: { sections: { experience: [], education: [], skills: Map<string, string[]> } }",
    ],
    backend: "Node.js (TypeScript) implementing the Model Context Protocol (MCP) server specification.",
    dataStorage: "Memory-only session storage; data is ephemeral to ensure privacy and security.",
    rationale: "Using MCP allows the AI to access 'real-world' data directly, eliminating hallucination risks and providing recruiters with verified project statistics.",
    security: "OAuth2 scoping; personal data is processed in-memory and never stored on persistent disks; strict input validation for PDF rendering.",
    performance: "Optimized parallel API fetching ensures that a full resume can be generated and rendered in under 6 seconds.",
    testing: "PDF output validated against top 3 commercial ATS systems; unit testing for all data normalization logic.",
    scalability: "The tool-based design allows for adding new professional sources (Medium, Figma, Behance) with zero changes to the core LLM logic.",
  },
  "ml-predicter": {
    problem:
      "Predictive systems often fail to bridge the gap between deterministic cyclic systems (astronomy) and probabilistic time-series models (ML). A unified engine is needed for high-precision temporal forecasting, especially in applications where multi-dimensional causality is suspected.",
    architecture:
      "A high-performance hybrid predictive engine. It features a custom Python-to-C bridge (using Cython/C-types) to interface with the Swiss Ephemeris library for sub-millisecond astronomical calculations. This deterministic data is then fed as high-dimensional features into a Gradient Boosted Decision Tree (XGBoost) model trained on 20+ years of historical market/event data. The system implements a 'Temporal Bayesian Consensus' layer to weight the outputs based on real-time confidence scores.",
    highLevel: "Python FastAPI -> Swiss Ephemeris (C) -> XGBoost/Scikit-learn -> Redis Caching",
    visualFlow: [
      { label: "Temporal Input", icon: "clock" },
      { label: "Astro Engine (C)", icon: "zap" },
      { label: "XGBoost Infer", icon: "activity" },
      { label: "Bayesian Consensus", icon: "target" },
    ],
    mermaidDiagrams: [
      `graph TD
    subgraph API_Layer [FastAPI]
    Req[Prediction Request] --> Router[Async Router]
    end
    subgraph Engine_Layer [Hybrid Logic]
    Router -->|Params| C_Eng[Swiss Ephemeris - C]
    Router -->|Sequence| ML_Eng[XGBoost Classifier]
    C_Eng -->|Planetary Vectors| Cons[Consensus Layer]
    ML_Eng -->|Probabilistic Scores| Cons
    end
    Cons -->|Weighted Result| Res[JSON Response]
    Res -->|Cache| R[(Redis)]`,
    ],
    flows: [
      "The high-precision C-engine (Swiss Ephemeris) calculates planetary harmonics and geometric aspects with 0.001 arcsec accuracy.",
      "The ML pipeline extracts features from these harmonics, combining them with historical time-series data to identify non-linear correlations.",
      "A recursive feedback loop validates predictions against real-world outcomes, updating the Bayesian weights for future consensus.",
    ],
    dataModels: [
      "TemporalInput: { timestamp, latitude, longitude, historicalBuffer: float[] }",
      "PredictionReport: { confidenceScore, astroAspects: [], mlProbabilities: {}, recommendation }",
    ],
    backend: "Python 3.11 with FastAPI; custom C-wrappers for high-performance mathematical calculations.",
    dataStorage: "PostgreSQL for historical outcome tracking; Redis for caching high-frequency coordinate calculations.",
    rationale: "Python was chosen for its ML dominance, while the C-extension was critical for handling the extremely heavy floating-point arithmetic required for astronomical precision. XGBoost provides the necessary non-linear relationship modeling.",
    security: "Input sanitization for geographic data; rate-limiting to prevent engine exhaustion; secure API key management for data providers.",
    performance: "Asynchronous engine orchestration allows for parallel calculation, keeping total response time < 400ms; sub-1ms math kernel latency.",
    testing: "Rigorous back-testing using 50,000+ historical data points (1990-2024); cross-validation with K-fold strategy; mathematical verification of C-extension precision against NASA JPL Horizons data.",
    scalability: "Stateless architecture allows for horizontal scaling of ML workers using Celery or Kubernetes; Redis handles caching of heavy geometric computations.",
  },
  "financial-advisor": {
    problem:
      "Standard financial advice is static and fails to adapt to real-time market shifts (e.g., sudden interest rate changes or earnings beats). Users need an advisor that 'remembers' their goals while 'seeing' the current market state simultaneously.",
    architecture:
      "An AI-native financial orchestration platform. It utilizes GPT-4o with advanced 'Tool Calling' protocols to bridge user financial state with live market telemetry from AlphaVantage. The system implements a 'Long-Term Financial Memory' (LTFM) using vector embeddings to maintain continuity across multiple user sessions. The backend uses a serverless Node.js architecture for sub-second API orchestration.",
    highLevel: "React UI -> Node.js Express -> OpenAI (GPT-4o) -> AlphaVantage API",
    visualFlow: [
      { label: "User Context", icon: "user" },
      { label: "Goal Vectorizer", icon: "layers" },
      { label: "Market Telemetry", icon: "trending-up" },
      { label: "AI Reasoning", icon: "cpu" },
    ],
    mermaidDiagrams: [
      `graph LR
    subgraph User_Context [Frontend]
    U[User Financials] --> UI[React Dashboard]
    end
    subgraph Logic_Layer [Backend]
    UI --> API[Express API]
    API --> AI[GPT-4o Advisor]
    AI -->|fetch_quote| MV[AlphaVantage API]
    MV -- JSON Data --> AI
    AI -->|Reasoning| Plan[Financial Strategy]
    end
    Plan --> UI`,
    ],
    flows: [
      "The 'Goal Vectorizer' transforms user text inputs into high-dimensional semantic vectors for precise context matching against a library of financial strategies.",
      "GPT-4o dynamically generates AlphaVantage queries to fetch specific stock metrics (P/E ratio, RSI, EMA) required for the current recommendation.",
      "The final output is a structured, markdown-formatted investment strategy that includes risk-adjusted ROI projections and step-by-step action items.",
    ],
    dataModels: [
      "FinancialProfile: { netWorth, monthlySavings, riskTolerance, goals: [], currentHoldings: [] }",
      "AdvisoryLog: { timestamp, query, marketSnap: {}, adviceContent, confidence: float }",
    ],
    backend: "Node.js (Express) with asynchronous middleware for AI orchestration; integrated with OpenAI SDK 4.x.",
    dataStorage: "MongoDB for flexible financial profile storage; Redis for short-term session and market data caching to reduce API overhead.",
    rationale: "Selected GPT-4o for its superior reasoning in complex financial contexts; used function calling to explicitly ground the AI in real market numbers to prevent hallucination. Vector-based memory enables the agent to provide advice that remains consistent with long-term goals while adjusting for short-term volatility.",
    security: "AES-256 encryption for all sensitive PII/financial data at rest and in transit; strict session-based access control with MFA enforcement; zero persistence of raw banking credentials (read-only snapshots); thorough PII/PHI sanitization and data anonymization prior to sending prompts to LLM providers.",
    performance: "Debounced user inputs and streaming LLM responses ensure a responsive, interactive UI feel; average market data fetch < 200ms; Redis caching eliminates redundant API calls during active sessions.",
    testing: "Simulated stress-testing for various market crash scenarios and high-volatility event sequences; manual validation of advice accuracy by financial analysts; unit testing for all data normalization layers and vector search indexing; automated testing of error recovery for API failures.",
    scalability: "Modular architecture allows for plugging in additional data sources (e.g., Bloomberg or Crypto APIs) with zero changes to the core LLM logic; stateless architecture facilitates auto-scaling of API workers.",
  },
  serendipity: {
    problem:
      "E-commerce 'relevance' algorithms create filter bubbles that prevent users from discovering new, interesting products outside their usual habits, leading to user fatigue and missed unique opportunities.",
    architecture:
      "A 'Discovery-First' e-commerce engine. It implements an 'Entropy-Weighted Feed' that deliberately injects high-variance, high-quality products outside the user's primary niche. The system uses a 'Dual-DB' architecture (Transactional PostgreSQL vs Analytic JSONB) to ensure zero latency during discovery spikes. It integrates Stripe for global payments and uses a custom 'Vendor-to-Consumer' (V2C) orchestration layer.",
    highLevel: "React/Expo -> Node.js -> Dual Supabase Instances -> Stripe/Razorpay",
    visualFlow: [
      { label: "Discovery Feed", icon: "sparkles" },
      { label: "Discovery Engine", icon: "search" },
      { label: "Atomic Checkout", icon: "shopping-cart" },
      { label: "Payment Gateway", icon: "credit-card" },
    ],
    mermaidDiagrams: [
      `graph TD
    subgraph Mobile_Clients [Frontend]
    R[React App] --> API[Node API]
    E[Expo App] --> API
    end
    subgraph Backend_Architecture [Logic]
    API -->|Async Log| ADB[(Analytics Supabase)]
    API -->|Fetch| MDB[(Transactional Supabase)]
    MDB -->|Query| SE[Serendipity Engine]
    end
    subgraph External_Services [Payments]
    API <--> PAY[Stripe / Razorpay]
    end`,
    ],
    flows: [
      "The 'Serendipity Engine' calculates an 'Entropy Score' for products, ensuring that users see a mix of high-relevance and high-novelty items based on session decay.",
      "Atomic transactions across dual Supabase instances ensure that discovery metadata is updated without delaying the critical checkout path.",
      "Stripe webhooks are processed asynchronously via Edge Functions to handle high-concurrency order surges during product drops.",
    ],
    dataModels: [
      "ProductEntity: { id, name, price, vendorId, tags: [], entropy: float, noveltyRank: int, stockLevel }",
      "DiscoveryEvent: { userId, productId, interactionType, timeSpent, surpriseFactor: float, sourceFeed }",
    ],
    backend: "Node.js (Express) with a focus on high-concurrency order processing and analytics streaming; containerized via Docker.",
    dataStorage: "Dual-instance Supabase (PostgreSQL); one optimized for transactional ACID compliance, one for high-volume JSONB analytics storage.",
    rationale: "The dual-DB strategy was chosen to ensure that a spike in discovery traffic (browsing) never affects the reliability of the checkout process (transactions). React Native provides a unified cross-platform mobile experience that scales performance through efficient state management.",
    security: "JWT-based authentication; strict RLS (Row Level Security) on Supabase for data isolation; encrypted payment webhooks; PCI-compliant processing via Stripe integration; automated daily security scanning for vulnerabilities.",
    performance: "Optimized image delivery via edge-cached CDNs; composite GIN indexes on Supabase for fast multi-tag filtering; <100ms average API response time; CDN offloading of static assets.",
    testing: "Load testing for concurrent discovery spikes (up to 5k CCU); automated E2E checkout verification via Playwright/Cypress; algorithm bias auditing to ensure fair vendor exposure and balanced serendipity metrics.",
    scalability: "API layer containerized for horizontal scaling; database connection pooling handled by Supabase/PgBouncer; serverless functions handle event-driven logic (email/notifications) to keep main event loop free.",
  },
  "security-engineers-pvt.-ltd.-website": {
    problem:
      "A leading security firm (SEPLE) needed a digital presence that commands authority and trust while integrating with their enterprise sales and CRM pipeline (Zoho).",
    architecture:
      "A bespoke corporate platform built on the Zoho CMS framework. It utilizes advanced JavaScript and CSS overrides to create a high-fidelity 'Industrial' design system, with automated lead-capture pipelines directly linked to the Zoho CRM ecosystem.",
    highLevel: "Custom Design System -> Zoho CMS -> Zoho CRM API -> Lead Automation",
    visualFlow: [
      { label: "Public Visitor", icon: "user" },
      { label: "Industrial UI", icon: "layout" },
      { label: "CRM Integration", icon: "database" },
      { label: "Sales Pipeline", icon: "trending-up" },
    ],
    mermaidDiagrams: [
      `graph LR
    V[Visitor] -->|Interacts| UI[Custom Design Layer]
    UI -->|Logic| CMS[Zoho CMS Engine]
    CMS -->|Lead Post| CRM[Zoho CRM]
    CRM -->|Auto-Assignment| S[Sales Engineer]
    UI -->|Education| KB[Technical Knowledge Base]`,
    ],
    flows: [
      "The custom CSS architecture creates a unique 'Wabi-Sabi' industrial aesthetic, differentiating the brand from generic competitors.",
      "Intelligent inquiry forms capture deep technical requirements from clients and inject them as 'Qualified Leads' into the CRM.",
      "Dynamic product catalogs are managed through the CMS, with custom JS handling advanced filtering for industrial hardware categories.",
    ],
    dataModels: [
      "InquiryRecord: { companyName, industryType, requirementSummary, regionalCode, leadScore }",
      "CatalogItem: { productName, techSpecs: {}, certificationList: [], caseStudyLink }",
    ],
    backend: "Zoho CMS Serverless Engine with custom JavaScript bridge logic.",
    dataStorage: "Zoho CRM (Relational Lead Data) and Zoho CMS (Content Assets).",
    rationale: "Zoho was chosen for its native, zero-middleware CRM integration, allowing the R&D team to focus on technical content rather than infrastructure maintenance.",
    security: "Built-in Zoho security layers; custom input sanitization for all public-facing forms; strict SSL enforcement.",
    performance: "Asset optimization (WebP/SVG) ensures <2s load times on both mobile and desktop; minimized JS payloads.",
    testing: "Responsive design verification on 30+ device profiles; lead capture reliability audits; SEO performance tracking.",
    scalability: "The modular CMS structure allows for the rapid launch of new product lines or subsidiary websites under the same brand umbrella.",
  },
  "dexter---webserver": {
    problem:
      "Distributed industrial IoT devices (NVRs, Biometrics, Sensors) require a unified, resilient control plane that can operate reliably in both air-gapped and cloud-connected environments.",
    architecture:
      "A lightweight, modular edge gateway built with Python (Flask). Optimized for Raspberry Pi hardware, it abstracts diverse industrial protocols (Modbus, RTSP, Serial) into a single, high-level REST API for operator control.",
    highLevel: "Python Flask -> Modular HW Handlers -> Modbus/RTSP/Serial -> SQLite",
    visualFlow: [
      { label: "Web UI", icon: "monitor" },
      { label: "Flask Gateway", icon: "server" },
      { label: "Protocol Drivers", icon: "cpu" },
      { label: "IoT Hardware", icon: "camera" },
    ],
    mermaidDiagrams: [
      `graph TD
    subgraph User_Interface [Web View]
    UI[Control Dashboard] --> API[Flask REST API]
    end
    subgraph Gateway_Logic [Python Core]
    API --> Router{Hardware Router}
    Router -->|Plugin| Driver1[Modbus Driver]
    Router -->|Plugin| Driver2[RTSP Streamer]
    Router -->|Plugin| Driver3[Serial Driver]
    end
    subgraph Edge_Devices [Industrial HW]
    Driver1 --> S1[Industrial Sensor]
    Driver2 --> S2[NVR / Camera]
    Driver3 --> S3[Biometric Unit]
    end
    API -->|Log| DB[(SQLite)]`,
    ],
    flows: [
      "The server dynamically discovers and loads hardware 'Drivers' based on the physical ports and network signatures detected.",
      "API calls from the dashboard are translated into low-level protocol commands (e.g., Modbus register writes) in real-time.",
      "A background heartbeat service monitors device health, logging failures to a local SQLite database for offline audit trails.",
    ],
    dataModels: [
      "DeviceNode: { id, type, protocol, address, status, lastHeartbeat, firmwareVersion }",
      "HardwareCommand: { deviceId, commandType, payload, priority, timeout }",
    ],
    backend: "Python 3.10 with Flask; non-blocking hardware I/O using threading and subprocess pools.",
    dataStorage: "SQLite for local device state and audit logs; flat-file config for easy recovery in air-gapped environments.",
    rationale: "Flask was selected for its minimalist footprint on low-resource hardware (Raspberry Pi 3/4) and its vast ecosystem of Python-based industrial libraries.",
    security: "Local-only network binding; IP-based administrative whitelisting; session-only credential storage; minimal dependency tree.",
    performance: "Optimized for minimal RAM usage (<128MB); sub-50ms command latency for local hardware interactions.",
    testing: "Stress-tested with 100+ concurrent hardware events; verified stability in high-temperature industrial cabinets; automated driver unit tests.",
    scalability: "The plugin architecture allows for adding new hardware support by simply dropping a Python module into the drivers directory.",
  },
  "real-time-chat-application": {
    problem:
      "Modern organizations often require internal, high-security communication platforms that are fully independent of public cloud services and completely auditable.",
    architecture:
      "A robust, enterprise-grade Java Full-Stack application. It leverages Java Servlets for request orchestration, JSP for dynamic UI rendering, and JDBC for high-performance, low-level communication with a SQL-based persistence layer.",
    highLevel: "Java Servlets -> JSP (JSTL) -> JDBC -> PostgreSQL/MySQL -> Bootstrap UI",
    visualFlow: [
      { label: "Client Browser", icon: "user" },
      { label: "Servlet Engine", icon: "coffee" },
      { label: "JDBC Layer", icon: "database" },
      { label: "Message Store", icon: "message-square" },
    ],
    mermaidDiagrams: [
      `graph LR
    subgraph Frontend [View Layer]
    B[Browser] -->|POST/GET| JSP[JSP Rendering Engine]
    end
    subgraph Backend [Logic Layer]
    JSP --> S[Message Servlet]
    S --> Auth[Session Filter]
    Auth --> S
    S -->|SQL Query| JDBC[JDBC Driver]
    end
    subgraph Persistence [Data Layer]
    JDBC <--> DB[(SQL Database)]
    end`,
    ],
    flows: [
      "Users authenticate via a secure session-based system; the Servlet engine manages the user's lifecycle and permissions.",
      "The message delivery pipeline uses JDBC PreparedStatements to ensure all interactions are safe from SQL injection attacks.",
      "The JSP view utilizes JSTL tags to dynamically render chat history and user status based on real-time database snapshots.",
    ],
    dataModels: [
      "User: { userId, username, passwordHash, salt, email, avatarUrl, lastActive }",
      "Message: { messageId, senderId, receiverId, content, timestamp, status: (Sent/Read) }",
    ],
    backend: "Java JEE (Servlets/JSP) running on Apache Tomcat or similar application servers.",
    dataStorage: "PostgreSQL or MySQL for reliable, relational storage of user data and message history.",
    rationale: "Built to master the core principles of the Java ecosystem, focusing on low-level database communication (JDBC) and server-side state management (Sessions/Servlets) over high-level abstractions.",
    security: "Strict CSRF protection; parameterized SQL queries; session hijacking prevention; password hashing with PBKDF2/BCrypt.",
    performance: "Manual connection pooling and query optimization ensure that the database can handle high-frequency message inserts with minimal latency.",
    testing: "Unit testing for Servlet logic; integration testing for the JDBC layer; manual responsive UI testing across multiple browsers.",
    scalability: "Design follows the standard JEE 'Three-Tier Architecture', allowing for effortless future migration to Spring Boot or microservices.",
  },
  "chessverse-battlefield": {
    problem:
      "Web-based chess applications often suffer from latency in move validation or heavy server reliance. Creating a high-fidelity 'battlefield' experience requires sub-millisecond local validation and a robust state machine that handles complex edge cases (Castling, En Passant, Stalemate) without server round-trips.",
    architecture:
      "A high-performance, client-side chess engine built with TypeScript. It utilizes a custom 'Bitboard-inspired' state representation for ultra-fast move generation and validation. The UI is a reactive 'Battlefield' component using Framer Motion for smooth piece transitions and a Map-based move history for O(1) undo/redo operations.",
    highLevel: "TypeScript -> Vite -> Framer Motion -> Tailwind CSS -> Lucide Icons",
    visualFlow: [
      { label: "State Machine", icon: "cpu" },
      { label: "Move Validator", icon: "shield-check" },
      { label: "Framer Renderer", icon: "zap" },
      { label: "Interaction Layer", icon: "mouse-pointer" },
    ],
    mermaidDiagrams: [
      `graph TD
    subgraph Core_Engine [Logic]
    S[Board State] --> V[Move Validator]
    V -->|Valid| M[Move Execution]
    M --> U[Undo/Redo Stack]
    end
    subgraph UI_Layer [Presentation]
    S -->|Reactive Update| R[React Components]
    R -->|Animate| F[Framer Motion]
    F -->|Render| DOM[Virtual DOM]
    end`,
    ],
    flows: [
      "The Move Validator performs recursive checks for 'King-in-Check' scenarios after every potential move calculation.",
      "The state machine handles complex multi-step moves (Castling) atomically to prevent illegal board states.",
      "A centralized history stack records board snapshots, enabling instant traversal of the game's temporal state.",
    ],
    dataModels: [
      "BoardState: Map<string, Piece | null> (where key is 'a1', 'h8', etc.)",
      "Piece: { type, color, hasMoved, position }",
      "GameState: { turn, isCheck, isMate, history: BoardState[] }",
    ],
    backend: "Purely client-side architecture; optimized for offline-first play and local computation.",
    dataStorage: "Local Storage for persistent game sessions; memory-mapped state for active gameplay.",
    rationale: "TypeScript was chosen for its strict typing, which is critical for complex move validation logic. Framer Motion ensures that piece captures and moves feel 'physical' and premium rather than static.",
    security: "Client-side validation prevents local state tampering in a simulated environment; sanitization of player names/meta-data.",
    performance: "Sub-1ms move validation; zero garbage collection spikes during active play due to immutable state snapshots.",
    testing: "Unit tests for all FIDE-standard chess rules; stress-testing for deep recursive checkmate detection; UI regression testing for drag-and-drop interactions.",
    scalability: "Architecture supports adding 'AI Opponents' via Web Workers without blocking the main UI thread.",
  },
  "mgnrega-tracker": {
    problem:
      "Public transparency in government spending (MGNREGA) is often obscured by complex, slow-loading portals. There is a critical need for a high-performance, bilingual dashboard that simplifies district performance metrics for citizens and policymakers.",
    architecture:
      "An enterprise-grade data orchestration platform. It features a Node.js 'Resilience Layer' that fetches live data from the National Data Portal (data.gov.in) while maintaining a high-fidelity CSV fallback system. The frontend uses a 'Hybrid Sourcing' strategy to ensure sub-second rendering of complex district benchmarks.",
    highLevel: "React 18 -> Node.js -> Express -> Chart.js -> Material UI -> data.gov.in API",
    visualFlow: [
      { label: "Data Pipeline", icon: "database" },
      { label: "Resilience Layer", icon: "refresh-cw" },
      { label: "Analytic Engine", icon: "bar-chart-2" },
      { label: "Bilingual UI", icon: "languages" },
    ],
    mermaidDiagrams: [
      `graph TD
    subgraph Sourcing_Layer [External]
    G[data.gov.in API] -->|Primary| P[Data Pipeline]
    C[CSV Fallback] -->|Secondary| P
    end
    subgraph Processing_Layer [Node.js]
    P -->|Cache/Normalize| N[Normalization Engine]
    N -->|Service| API[Express API]
    end
    subgraph Frontend_Layer [React]
    API -->|JSON| D[Dashboard Engine]
    D -->|Visuals| Charts[Chart.js / MUI]
    end`,
    ],
    flows: [
      "The Resilience Layer monitors API health, automatically switching to the local CSV buffer if latency exceeds 2 seconds.",
      "A custom 'Performance Scoring' algorithm ranks 26 districts based on Work Completion vs Budget Allocation.",
      "The localization engine hot-swaps all UI labels and data headers between English and Hindi without page reloads.",
    ],
    dataModels: [
      "DistrictMetric: { name, womenParticipation, sc_st_days, averageWage, completionRate, fy: '2025-26' }",
      "DataReport: { timestamp, source: ('API' | 'CSV'), districts: DistrictMetric[] }",
    ],
    backend: "Node.js (Express) with structured logging (Winston) and daily log rotation; hosted on Render with auto-scaling enabled.",
    dataStorage: "Firebase for configuration; localized CSV datasets for high-availability fallbacks; ephemeral memory caching for API responses.",
    rationale: "React was selected for its efficient DOM diffing during large-scale data updates. The Node.js backend was critical for handling government API authentication and data normalization before client delivery.",
    security: "Helmet.js for header security; CORS whitelisting; API rate-limiting; secure PII handling for administrator login.",
    performance: "Optimized bundle size via code-splitting; <500ms initial dashboard hydration; efficient SVG chart rendering for mobile users.",
    testing: "Automated integration tests for API-to-CSV fallback triggers; unit tests for scoring algorithms; accessibility audit (WCAG 2.1) for bilingual support.",
    scalability: "Stateless API design allows for horizontal scaling; modular data source architecture can be expanded to other state/national portals.",
  },
  "thingsboard---bot": {
    problem:
      "Field engineers monitoring high-density IoT environments (SEPLE) struggle to interpret raw telemetry trends during critical failures. An automated reasoning layer is needed to diagnose issues and suggest remediation steps in real-time.",
    architecture:
      "An industrial AI agent designed as a 'Telemetry Interpreter'. It bridges ThingsBoard's enterprise IoT data with OpenAI's GPT-4o reasoning engine. It implements 'Trend Extraction' (extracting min/max/slope from telemetry windows) to provide the LLM with a concise, actionable summary of hardware state.",
    highLevel: "Python Flask -> ThingsBoard API -> OpenAI GPT-4 -> Chart.js Widget",
    visualFlow: [
      { label: "Telemetry Stream", icon: "trending-up" },
      { label: "Trend Extractor", icon: "activity" },
      { label: "AI Diagnosis", icon: "brain" },
      { label: "Embedded Widget", icon: "layout" },
    ],
    mermaidDiagrams: [
      `graph LR
    subgraph IoT_Platform [ThingsBoard]
    T[Telemetry Data] --> API[ThingsBoard REST]
    end
    subgraph AI_Bridge [Python Flask]
    API -->|Raw Data| TE[Trend Extractor]
    TE -->|Prompt Context| AI[OpenAI GPT-4]
    AI -->|Diagnosis| Res[Actionable Advice]
    end
    subgraph Dashboard [UI]
    Res --> W[Embedded Web Widget]
    end`,
    ],
    flows: [
      "The bot periodically pulls telemetry windows (last 24h) for critical assets (HMS/Dexter panels).",
      "The Trend Extractor identifies anomalies (e.g., sudden voltage drops) and formats them into a semantic prompt for the LLM.",
      "GPT-4o generates a diagnostic report, including potential root causes and specific maintenance steps (e.g., 'Check relay K1').",
    ],
    dataModels: [
      "TelemetrySnapshot: { deviceId, startTime, endTime, dataPoints: Map<ts, value> }",
      "DiagnosticReport: { summary, rootCause, urgency, steps: string[], referenceDocs: [] }",
    ],
    backend: "Python (Flask) with asynchronous task handling for long-running AI queries.",
    dataStorage: "Redis for caching diagnostic reports to prevent redundant LLM calls; SQLite for audit logs.",
    rationale: "Python was chosen for its superior string-processing and AI integration capabilities. Flask provides a lightweight bridge that can be easily embedded as a micro-widget within the main ThingsBoard UI.",
    security: "Strict API-Key isolation; zero-retention policy for raw telemetry data; sanitization of device metadata before LLM processing.",
    performance: "Diagnostic generation < 5s; zero-impact on ThingsBoard core database performance due to asynchronous polling.",
    testing: "Simulated failure injection tests to verify diagnostic accuracy; manual verification of remediation steps by SEPLE engineers.",
    scalability: "Architecture supports monitoring thousands of devices across multiple ThingsBoard tenants via a multi-tenant bridge configuration.",
  },
  med: {
    problem:
      "Healthcare clinics struggle with fragmented patient management systems that fail to enforce proper role-based access hierarchies (Doctor vs. Assistant vs. Staff). Existing solutions are either overly complex enterprise systems or simplistic tools that lack real-time collaboration and notification capabilities.",
    architecture:
      "A cross-platform Flutter application implementing a three-tier role-based access control (RBAC) system backed by Supabase (PostgreSQL + Auth + Storage) and Firebase Cloud Messaging. The UI adheres to a custom 'Organic/Natural' design system inspired by Wabi-Sabi aesthetics, reducing cognitive load in high-stress clinical environments. Features a 'Follow-Up Task Engine' for tracking patient treatment timelines and a real-time notification pipeline for critical medical alerts.",
    highLevel: "Flutter (Dart) -> Supabase (PostgreSQL/Auth/Storage) -> Firebase (Cloud Messaging) -> Organic Design Tokens",
    visualFlow: [
      { label: "Clinical UI", icon: "heart-pulse" },
      { label: "Auth Gateway", icon: "shield" },
      { label: "Patient DB", icon: "database" },
      { label: "Alert Engine", icon: "bell" },
    ],
    mermaidDiagrams: [
      `graph TD
    subgraph Client_Layer [Flutter App]
    UI[Organic UI Layer] --> Auth[Supabase Auth]
    UI --> PM[Patient Manager]
    UI --> FU[Follow-Up Engine]
    end
    subgraph Backend_Layer [Supabase]
    Auth --> RLS[Row Level Security]
    PM --> DB[(PostgreSQL)]
    RLS --> DB
    FU --> DB
    end
    subgraph Notification_Layer [Firebase]
    DB -->|Trigger| FCM[Cloud Messaging]
    FCM --> Push[Push Notification]
    end`,
      `sequenceDiagram
    participant D as Doctor
    participant A as Flutter App
    participant S as Supabase
    participant F as Firebase
    D->>A: Create Follow-Up Task
    A->>S: INSERT into follow_ups
    S->>S: RLS validates Doctor role
    S-->>A: 201 Created
    S->>F: Trigger notification function
    F-->>A: Push Notification (Assistant)
    A->>A: Update task list in real-time`,
    ],
    flows: [
      "The RBAC engine enforces strict role isolation: Doctors can create/edit patient records, Assistants can view and update follow-ups, Staff can only view anonymized statistics.",
      "Supabase Row Level Security (RLS) policies enforce data access at the database level, preventing privilege escalation even if the client is compromised.",
      "Firebase Cloud Messaging delivers time-critical alerts (e.g., overdue follow-ups, critical lab results) with sub-second latency to all relevant role holders.",
    ],
    dataModels: [
      "Patient: { id, name, age, gender, medicalHistory: [], assignedDoctor, createdAt, updatedAt }",
      "FollowUp: { id, patientId, assignedTo, dueDate, status: (Pending/Completed/Overdue), notes, priority }",
    ],
    backend: "Supabase (PostgreSQL) with Row Level Security, Edge Functions for notification triggers, and Supabase Auth for JWT-based session management.",
    dataStorage: "Supabase PostgreSQL for relational patient data; Supabase Storage for medical document uploads; Firebase for notification delivery metadata.",
    rationale: "Flutter was chosen for its ability to deliver a pixel-perfect, consistent 'Organic' UI across Android and iOS from a single Dart codebase. Supabase provides a cost-effective, open-source alternative to Firebase Firestore while offering full PostgreSQL power (JOINs, RLS, triggers). Firebase was retained specifically for its superior push notification reliability.",
    security: "Row Level Security (RLS) enforces data isolation per role; JWT-based authentication with sliding token expiry; encrypted storage for medical documents; HIPAA-aware data handling patterns; no PHI stored in client-side caches.",
    performance: "Optimized Supabase queries with composite indexes on patient-doctor relationships; lazy-loading of medical history records; efficient Flutter widget tree management for smooth scrolling through large patient lists.",
    testing: "Unit tests for RBAC policy enforcement; integration tests for Supabase RLS rules; UI regression testing with Flutter Golden tests; field testing on Android and iOS devices for notification reliability.",
    scalability: "Supabase handles horizontal scaling of the database layer; stateless Flutter client allows for easy distribution via app stores; role-based architecture supports adding new roles (e.g., Lab Technician, Pharmacist) without schema changes.",
  },
};

export function getProjectArchitectureOverride(repoName: string): ProjectArchitectureOverride | null {
  const key = repoName.trim().toLowerCase();
  return architectureOverrides[key] ?? null;
}
