export default function ProjectsTab() {
  const projects = [
    {
      emoji: "🤍",
      tags: "FULL STACK · NGO · SOCIAL IMPACT",
      tagColor: "text-[#ff7b72]",
      buttonText: "Live ↗",
      title: "Little Angel Foundation",
      description: "Official website for my mom's NGO, built from scratch. Little Angel Foundation supports underprivileged children through education and care, founded by Priyanka Bobade 9 years ago. Revamped and developed the entire site as my way of giving back to something I've believed in for years.",
      techs: ["React", "JavaScript", "Neon DB", "Cloudinary"],
    },
    {
      emoji: "🛡️",
      tags: "MOBILE · AI · SAFETY TECH",
      tagColor: "text-[#ff7b72]",
      buttonText: "GitHub ↗",
      title: "Safe Yatra - Women's Safety App",
      description: "Mobile app with 100% route tracking and voice-triggered emergency alerts. Integrated TensorFlow.js for voice emotion recognition with 70% distress detection accuracy. Won 1st Prize at SILS GST Innovations 2024.",
      techs: ["TensorFlow.js", "Python", "React Native", "NLP", "Voice AI"],
    },
    {
      emoji: "🧠",
      tags: "AI · GRAPHRAG · FULL STACK",
      tagColor: "text-[#79c0ff]",
      buttonText: "GitHub ↗",
      buttonText2: "Live ↗",
      title: "OrgMind - Company Intelligence Assistant",
      description: "Hybrid GraphRAG system combining Neo4j knowledge graph traversal with Pinecone vector search. Answers org questions standard RAG can't, like 'Who owns this project and what have they written about security?'. Built with FastAPI, React, and GPT-4o.",
      techs: ["Neo4j", "Pinecone", "GPT-4o", "FastAPI", "React", "LangChain", "GraphRAG"],
    },
    {
      emoji: "🕉️",
      tags: "FULL STACK · NLP · GENAI",
      tagColor: "text-[#7ee787]",
      buttonText: "GitHub ↗",
      title: "Gita-GPT",
      description: "Web app that suggests Bhagavad Gita verses based on user emotion. Integrated Hume AI for empathetic chatbot support, boosted engagement by 60%. Won 1st Prize at Cognition Technical Fest 2023.",
      techs: ["TypeScript", "Hume AI", "LangChain", "NLP", "Next.js"],
    },
    {
      emoji: "⚡",
      tags: "BACKEND · API · ML",
      tagColor: "text-[#79c0ff]",
      buttonText: "GitHub ↗",
      title: "Smart Resource Tracker",
      description: "LRU Cache with TTL, eviction metrics, FastAPI backend, and React frontend. Production-grade resource management system with real-time monitoring.",
      techs: ["FastAPI", "React", "JavaScript", "Python", "LRU Cache"],
    },
    {
      emoji: "🧊",
      tags: "MLOPS · DOCKER · API",
      tagColor: "text-[#d2a8ff]",
      buttonText: "GitHub ↗",
      title: "Dockerized ML Prediction API",
      description: "Containerized ML model serving with FastAPI and Docker. Demonstrates production MLOps patterns: clean REST API, containerization, and ML inference pipelines.",
      techs: ["Docker", "FastAPI", "Python", "MLOps", "scikit-learn"],
    },
    {
      emoji: "🤖",
      tags: "TYPESCRIPT · DEVTOOLS · AI",
      tagColor: "text-[#e5c07b]",
      buttonText: "GitHub ↗",
      title: "AI Code Review Bot",
      description: "Automated AI-powered code review bot built in TypeScript. Integrates into developer workflows to provide intelligent, context-aware code feedback.",
      techs: ["TypeScript", "AI", "DevTools", "Automation"],
    },
    {
      emoji: "📡",
      tags: "MONITORING · HTML · DEVOPS",
      tagColor: "text-[#ffa657]",
      buttonText: "GitHub ↗",
      title: "API Health Monitor",
      description: "Lightweight API health monitoring dashboard. Tracks endpoint availability, response times, and status codes, giving developers real-time visibility into their services.",
      techs: ["HTML", "JavaScript", "DevOps", "Monitoring"],
    },
  ];

  return (
    <div className="flex flex-col overflow-auto bg-[var(--panel)] text-[var(--text-primary)] font-mono text-[13px] ide-scrollbar h-full w-full p-8 pb-32">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8 font-mono text-[#98c379]">
          // projects.js : things I've built & shipped
        </div>

        <div className="mb-12">
          <h1
            className="text-[40px] font-extrabold tracking-wide text-[#fffae8] mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Projects
          </h1>
          <div className="text-[#8b949e]">
            <span className="text-[#c678dd]">const</span>{" "}
            <span className="text-[#e5c07b]">projects</span>{" "}
            <span className="text-[#56b6c2]">=</span> [ ...shipped, ...building ]
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <div key={idx} className="border border-[#30363d] rounded-lg p-6 bg-[#0d1117] flex flex-col gap-4">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[20px]">{project.emoji}</div>
              </div>
              <div className="flex justify-between items-center mb-1">
                <div className={`text-[11px] font-bold tracking-[0.1em] ${project.tagColor}`}>
                  {project.tags}
                </div>
                <div className="flex gap-2">
                  {project.buttonText2 && (
                     <button className="rounded border border-[#30363d] px-2.5 py-1 text-[11px] text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d] transition-colors flex items-center">
                       {project.buttonText2}
                     </button>
                  )}
                  <button className="rounded border border-[#30363d] px-2.5 py-1 text-[11px] text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d] transition-colors flex items-center gap-1">
                    {project.buttonText}
                  </button>
                </div>
              </div>
              
              <h2 className="text-[20px] font-extrabold text-[#f0f6fc]" style={{ fontFamily: "'Inter', sans-serif" }}>
                {project.title}
              </h2>
              
              <p className="text-[#8b949e] leading-relaxed text-[12px] flex-1">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {project.techs.map(tech => (
                  <span key={tech} className="rounded border border-[#30363d] bg-[#21262d] px-2 py-0.5 text-[11px] text-[#8b949e]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
