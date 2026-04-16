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
}

const architectureOverrides: Record<string, ProjectArchitectureOverride> = {
  portfolio: {
    problem:
      "Build a modern portfolio site that clearly presents projects and technical profile in a fast, interactive web experience.",
    architecture:
      "Next.js + TypeScript + Tailwind CSS portfolio application, with Supabase listed in the README tech stack for backend/data integration.",
    highLevel: "Web UI -> Next.js App -> Supabase",
    visualFlow: [
      { label: "Web UI", icon: "monitor" },
      { label: "Next.js", icon: "server" },
      { label: "Data", icon: "database" },
    ],
    flows: [
      "Visitor opens portfolio routes rendered by Next.js.",
      "Frontend sections/components present project and profile content.",
      "Supabase-backed data can be fetched where dynamic content is required.",
    ],
    dataModels: [
      "ProjectContent: { title, summary, links, tags[] }",
      "ProfileContent: { intro, skills[], contact }",
    ],
    backend: "Next.js application runtime.",
    dataStorage: "Supabase integration (as listed in README) plus static frontend content.",
  },
  "fas-control": {
    problem:
      "Local IoT control is unreliable when users must manually discover devices and network addresses. The app shortens discovery-to-control latency with scan-first onboarding.",
    architecture:
      "Capacitor-based Android app (React + TypeScript + Vite + Tailwind) that connects to and controls Hestia devices via ESP32 web servers.",
    highLevel: "Android App -> Capacitor Runtime -> ESP32 Web Server",
    visualFlow: [
      { label: "Mobile", icon: "smartphone" },
      { label: "Capacitor", icon: "layers" },
      { label: "ESP32", icon: "cpu" },
    ],
    flows: [
      "User opens the Android app and connects to a target Hestia/ESP32 device.",
      "Capacitor-hosted UI sends control requests to ESP32 web endpoints.",
      "Device responses are reflected in the app control interface.",
    ],
    dataModels: [
      "DeviceTarget: { host, port, name }",
      "ControlCommand: { route, method, payload }",
    ],
    backend: "ESP32-hosted web server endpoints for device control.",
    dataStorage: "Primarily device/app runtime state (README focuses on build/runtime).",
  },
  "ml-predicter": {
    problem:
      "Forecasting pipelines are often fragmented across notebooks and scripts, which makes reproducibility and model comparison difficult.",
    architecture:
      "Python FastAPI-based machine learning service for hybrid predictions, with pytest testing and Docker packaging support.",
    highLevel: "Client Request -> FastAPI Service -> ML Inference -> Prediction Response",
    visualFlow: [
      { label: "API", icon: "server" },
      { label: "ML", icon: "cpu" },
      { label: "Result", icon: "check" },
    ],
    flows: [
      "Request reaches FastAPI prediction endpoints.",
      "Service executes ML logic for hybrid prediction output.",
      "Result is returned as API response and can be validated with pytest.",
    ],
    dataModels: [
      "PredictionRequest: { features..., context }",
      "PredictionResponse: { value, confidence?, metadata? }",
    ],
    backend: "Python FastAPI service runtime.",
    dataStorage: "Service artifacts/dependencies from Python environment and optional Docker image layers.",
  },
  "local_service_finder": {
    problem:
      "Users struggle to discover reliable local services quickly due to poor filtering, inconsistent profiles, and low trust signals.",
    architecture:
      "Supabase-centered app architecture with AuthContext-based session management, role-aware screens, and typed data access through a shared Supabase client.",
    highLevel: "Client App -> AuthContext -> Supabase Auth/DB -> Role-based Screens",
    visualFlow: [
      { label: "Client", icon: "monitor" },
      { label: "Auth", icon: "user" },
      { label: "Supabase", icon: "database" },
      { label: "Screens", icon: "layers" },
    ],
    flows: [
      "User signs in/up through Supabase Auth and receives session/JWT context.",
      "AuthContext resolves role-specific navigation and screen access.",
      "Client reads/writes typed models via lib/supabase.ts.",
      "Booking/provider/customer flows persist through Supabase tables.",
    ],
    dataModels: [
      "User: { id, role, profile }",
      "Booking: { id, customerId, providerId, status }",
      "ServiceProfile: { id, category, availability, location }",
    ],
    backend: "Supabase Auth + database layer (with Realtime and Maps noted as planned integrations).",
    dataStorage: "Supabase tables defined in project schema documentation.",
  },
  "finance-gpt": {
    problem:
      "README currently does not publish architecture details, so the portfolio avoids inventing internals for this repo.",
    architecture:
      "Architecture details are not documented in the available README content.",
    highLevel: "Architecture not documented in README",
    visualFlow: [
      { label: "Repo", icon: "box" },
      { label: "Docs", icon: "terminal" },
      { label: "Pending", icon: "activity" },
    ],
    flows: [
      "Repository is listed, but README currently lacks implementation/architecture sections.",
      "Add architecture docs in repo README to unlock factual architecture rendering.",
    ],
    dataModels: [],
    backend: "Not documented in README.",
    dataStorage: "Not documented in README.",
  },
  "checkmate-arena-ai": {
    problem:
      "Repository README could not be found from GitHub raw endpoint, so architecture details are currently unavailable.",
    architecture:
      "Architecture details unavailable (README not found).",
    highLevel: "Architecture unavailable",
    visualFlow: [
      { label: "Repo", icon: "box" },
      { label: "README", icon: "terminal" },
      { label: "Missing", icon: "activity" },
    ],
    flows: [
      "README endpoint returned not found.",
      "Architecture tab intentionally avoids speculative implementation details.",
    ],
    dataModels: [],
    backend: "Not documented.",
    dataStorage: "Not documented.",
  },
  "swatch360": {
    problem:
      "Industrial monitoring teams need one consistent mobile interface for telemetry visibility, alerting, and operator action.",
    architecture:
      "Flutter mobile client for ThingsBoard with platform-specific Android/iOS build pipelines and environment-driven runtime configuration.",
    highLevel: "Mobile App -> Telemetry API -> Rule Engine -> Operator Actions",
    visualFlow: [
      { label: "Mobile", icon: "smartphone" },
      { label: "Telemetry", icon: "activity" },
      { label: "Rules", icon: "settings" },
      { label: "Ops", icon: "user" },
    ],
    flows: [
      "Flutter app is configured via configs.json and built for Android/iOS.",
      "Client communicates with configured ThingsBoard endpoint.",
      "Operational telemetry is rendered in mobile screens.",
    ],
    dataModels: [
      "TelemetryPoint: { deviceId, key, value, timestamp }",
      "Alert: { id, severity, status, source, acknowledgedBy }",
    ],
    backend: "ThingsBoard API/backend endpoint integration.",
    dataStorage: "ThingsBoard-side telemetry and app configuration inputs.",
  },
  "swacth360_bot": {
    problem:
      "Support teams need faster access to operation knowledge than manual document lookup can provide.",
    architecture:
      "Layered monolithic enterprise RAG system with Flutter client, Next.js serverless API edge, retrieval/intelligence libraries, and Supabase pgvector data layer.",
    highLevel: "User Query -> Retriever -> Context Builder -> LLM Response",
    visualFlow: [
      { label: "Query", icon: "user" },
      { label: "Retrieve", icon: "database" },
      { label: "Compose", icon: "layers" },
      { label: "Respond", icon: "terminal" },
    ],
    mermaidDiagrams: [
      `flowchart TD
    %% ── Client Tier ──────────────────────────────────────────
    subgraph CLIENT["🖥️  Client Tier"]
        WEB["Next.js Web App\n(React 19 + TailwindCSS v4)"]
        MOB["Flutter Mobile App\n(SAI — Android / iOS / Web)"]
    end

    %% ── Edge / API Gateway ───────────────────────────────────
    subgraph EDGE["⚡  Edge / API Gateway  (Netlify Functions)"]
        MW["middleware.ts\nSupabase SSR Session Refresh"]
        RL["Rate Limiter\n(Upstash Redis • IP + UserID)"]
        CHAT["/api/chat/route.ts\nMain Orchestrator"]
        DIAG["/api/diagram/route.ts\nMermaid Generator"]
        CONV["/api/conversations/*\nCRUD"]
        ADMIN["/api/admin/*\nIngestion · Analytics · Settings"]
    end

    %% ── Intelligence / RAG Layer ─────────────────────────────
    subgraph RAG["🧠  Intelligence Layer  (src/lib)"]
        direction TB
        PIPE["pipeline.ts\nTop-level orchestrator"]

        subgraph QUERY["Query Intelligence"]
            QP["queryProcessor.ts\nKeyword + Entity Extract"]
            IC["intentClassifier.ts\nFactual / Procedural / Diagnostic"]
            QD["query-decomposer.ts\nComplex → Sub-queries"]
            QE["query-expansion.ts\nSynonym Expansion"]
            HYDE["hydeGenerator.ts\nHypothetical Doc Embedding"]
            CR["conversation-retrieval.ts\nFollow-up Rewriting"]
        end

        subgraph ROUTING["Routing"]
            LR["logical-router.ts\nVector vs Relational vs Hybrid"]
            SR["router.ts\nSemantic Route → Prompt Template"]
        end

        subgraph RETRIEVAL["Retrieval"]
            RE["rag-engine.ts\nMulti-Vector Retrieval + MMR"]
            HS["hybrid-search.ts\nBM25 + Dense Vector"]
            RAPT["raptor-retrieval.ts\nHierarchical (RAPTOR)"]
            KG["knowledge-graph.ts\nEntity Graph Boost"]
        end

        subgraph RERANK["Ranking & Scoring"]
            RR["reranker.ts\nCross-Encoder Reranking"]
            FR["feedback-reranker.ts\nUser Feedback Boost"]
            CONF["confidence.ts\nAdaptive Threshold"]
            CTX["contextRanker.ts\nContext Window Builder"]
        end

        subgraph GENERATION["Generation"]
            LLM["llm.ts\nGPT-4o / GPT-4o-mini"]
            RF["responseFormatter.ts\nMarkdown + Diagram Format"]
        end

        subgraph CACHE["Caching"]
            C1["cache.ts\nTier-1: Exact Match (Redis)"]
            SC["semanticCache.ts\nTier-2: Semantic (pgvector)"]
        end
    end

    %% ── Data Layer ───────────────────────────────────────────
    subgraph DATA["🗄️  Data Layer"]
        SB["Supabase\nPostgreSQL + pgvector + Auth"]
        PC["Pinecone\nVector DB (scale)"]
        RD["Upstash Redis\nExact Cache + Rate Limits"]
        EM["OpenAI\ntext-embedding-3-small/large"]
    end

    %% ── Observability ────────────────────────────────────────
    subgraph OBS["📊  Observability"]
        LOG["logger.ts\nChat Logs + Failures"]
        MET["pipelineMetrics.ts\nStage Timings"]
        EVAL["rag-evaluator.ts\nAuto Quality Scoring"]
    end

    %% ── External Services ────────────────────────────────────
    subgraph EXT["☁️  External Services"]
        OAI["OpenAI API\nGPT-4o + Embeddings"]
        GEM["Google Gemini\nFallback LLM"]
        RES["Resend\nEmail Notifications"]
    end

    %% ── Connections ──────────────────────────────────────────
    WEB -->|HTTPS / SSE stream| MW
    MOB -->|HTTPS REST| MW
    MW --> RL
    RL --> CHAT
    RL --> DIAG
    RL --> CONV
    CHAT --> PIPE
    PIPE --> QUERY
    PIPE --> ROUTING
    PIPE --> CACHE
    ROUTING --> RETRIEVAL
    RETRIEVAL --> RERANK
    RERANK --> GENERATION
    GENERATION -->|stream| CHAT
    RETRIEVAL <--> SB
    RETRIEVAL <--> PC
    CACHE <--> RD
    CACHE <--> SB
    EM <--> SB
    LLM <--> OAI
    LLM -.->|fallback| GEM
    ADMIN --> SB
    LOG --> SB
    MET --> SB
    EVAL -.->|async| OAI
    ADMIN --> RES`,
      `flowchart LR
    A([🟢 User Input\nEN / BN / HI]) --> B{Rate Limit\nCheck}
    B -->|Blocked| Z1([🔴 429 Too Many Requests])
    B -->|Allowed| C[Auth + Session\nResolution]
    C --> D{Language\nDetect}
    D -->|Non-English| E[Translate → EN\nGPT-4o]
    D -->|English| F
    E --> F[Conversation\nRewrite\nResolve pronouns/context]
    F --> G{Diagram\nDetection?}
    G -->|Yes| H[Mermaid\nGenerator\n/api/diagram]
    G -->|No| I{Tier-1\nCache Check\nExact SHA-256}
    H --> Z2([🟦 Stream Diagram Response])
    I -->|HIT| Z3([⚡ Cache Hit Response < 5ms])
    I -->|MISS| J[Intent\nClassification\nfactual / procedural /\ndiagnostic / casual]
    J --> K{Logical\nRoute}
    K -->|relational| L[Structured DB\nQuery\nAnalytics / Counts]
    K -->|vector / hybrid| M[Query\nIntelligence]
    L --> Z4([📊 Relational Answer])
    M --> N[Query\nEmbedding\ntext-embedding-3-small]
    N --> O{Tier-2\nSemantic Cache\ncosine ≥ 0.90}
    O -->|HIT| Z5([⚡ Semantic Cache < 50ms])
    O -->|MISS| P[Query\nDecomposition\nComplex → Sub-queries]
    P --> Q[HYDE\nGeneration\nHypothetical Answer Embed]
    Q --> R[Multi-Vector\nRetrieval\nquery + HYDE + expanded]
    R --> S[RAPTOR\nHierarchical\nSearch]
    S --> T[Hybrid\nSearch\nBM25 + Dense Vector]
    T --> U[Feedback\nBoost\nApply thumbs up/down scores]
    U --> V[Cross-Encoder\nReranking\nTop-30 → Top-5]
    V --> W[Knowledge\nGraph Boost\nEntity Matching]
    W --> X{Confidence\nThreshold > 0.35?}
    X -->|No| Z6([❓ Unknown Question\nStored for Review])
    X -->|Yes| Y[Prompt\nSelection\nSemantic Router]
    Y --> AA[LLM Generation\nGPT-4o]
    AA --> AB[Strip Think Tags\nFormat Response]
    AB --> AC[Store Cache\nBoth Tiers async]
    AC --> AD[Persist to DB\nchat_sessions + messages]
    AD --> AE[Auto-Evaluate\nRAG quality async]
    AE --> Z7([🟢 Stream Response\nto Client])`,
    ],
    flows: [
      "User query enters /api/chat orchestration route.",
      "Pipeline performs multilingual handling, classification, and retrieval.",
      "rag-engine executes multi-vector retrieval + reranking against Supabase pgvector.",
      "LLM response is streamed and chat/evaluation data is persisted.",
    ],
    dataModels: [
      "KnowledgeChunk: { id, source, embedding, text }",
      "ChatTurn: { role, content, citations[] }",
    ],
    backend: "Next.js route handlers on serverless edge (chat, diagram, conversations, admin).",
    dataStorage: "Supabase PostgreSQL + pgvector + Auth + RLS, with Redis cache layer.",
  },
  "dexter---webserver": {
    problem:
      "Local device operations need a lightweight control-plane server that remains reliable on constrained environments.",
    architecture:
      "Raspberry Pi-hosted Flask platform for IoT device management, integration orchestration, and browser-based operations.",
    highLevel: "Client Requests -> Python Router -> Device Handlers -> Status Response",
    visualFlow: [
      { label: "Client", icon: "monitor" },
      { label: "Router", icon: "server" },
      { label: "Device", icon: "cpu" },
      { label: "Status", icon: "check" },
    ],
    flows: [
      "Operator accesses Flask web UI in browser.",
      "Server routes actions to integration modules (camera/NVR/biometric/network).",
      "Runtime scripts and handlers execute device operations and report status.",
    ],
    dataModels: [
      "Command: { id, target, action, params }",
      "HealthStatus: { module, state, lastSeen, latencyMs }",
    ],
    backend: "Flask web server with integration scripts and device-facing handlers.",
    dataStorage: "SQLite database files and local runtime configuration/state.",
  },
  "pookies-ai-zone": {
    problem:
      "AI tool discovery is fragmented, making it hard to compare capabilities, pricing, and fit across categories.",
    architecture:
      "Cross-platform catalog app with frontend clients, Convex backend/storage, FastAPI proxy services, and automated daily ingestion pipelines.",
    highLevel: "Client Apps -> Convex/FastAPI Backend -> Ingestion Pipelines -> Tool Catalog",
    visualFlow: [
      { label: "Clients", icon: "monitor" },
      { label: "Backend", icon: "server" },
      { label: "Ingestion", icon: "activity" },
      { label: "Catalog", icon: "database" },
    ],
    flows: [
      "Frontend clients query categorized AI tools and comparison data.",
      "Convex and FastAPI layers provide data access and server logic.",
      "Daily Python jobs refresh tool data from external sources.",
      "Updated datasets are merged back into the tool catalog for clients.",
    ],
    dataModels: [
      "AITool: { id, name, category, pricing, features[] }",
      "ComparisonSet: { toolIds[], criteria[] }",
    ],
    backend: "Convex serverless backend + FastAPI proxy layer.",
    dataStorage: "Convex database/storage with cached external-source ingestion outputs.",
  },
  serendipity: {
    problem:
      "Recommendation feeds are often repetitive; users miss novel products and discovery moments.",
    architecture:
      "Full-stack marketplace platform with React web and Expo mobile frontends sharing a Node/Express REST API, dual Supabase databases, and payment integrations.",
    highLevel: "Web/Mobile Clients -> Express API -> Supabase (Main + Seller) -> Payments",
    visualFlow: [
      { label: "Clients", icon: "monitor" },
      { label: "API", icon: "server" },
      { label: "Data", icon: "database" },
      { label: "Payments", icon: "check" },
    ],
    flows: [
      "Client apps call Express REST APIs for auth, products, cart, and orders.",
      "API layer orchestrates business logic and integrates Supabase resources.",
      "Marketplace transactions flow through Razorpay and Stripe integrations.",
      "Notifications and support channels complete operational workflows.",
    ],
    dataModels: [
      "UserSignal: { userId, event, productId, timestamp }",
      "FeedItem: { productId, score, novelty, category }",
    ],
    backend: "Node.js/Express API with JWT auth, role APIs, and marketplace endpoints.",
    dataStorage: "Dual Supabase databases plus Supabase storage buckets and analytics tables.",
  },
};

export function getProjectArchitectureOverride(repoName: string): ProjectArchitectureOverride | null {
  const key = repoName.trim().toLowerCase();
  return architectureOverrides[key] ?? null;
}
