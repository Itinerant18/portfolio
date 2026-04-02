export default function ReadmeTab() {
  const stack = {
    Languages: ["Python", "TypeScript", "SQL", "JavaScript", "Java"],
    "AI / ML": ["PyTorch", "LangChain", "HuggingFace", "scikit-learn", "TensorFlow"],
    Backend: ["FastAPI", "Flask", "Django", "PostgreSQL", "Redis"],
    DevOps: ["Docker", "AWS", "Linux", "Git"],
  };

  const connect = [
    { label: "Email", value: "aahanabobade@gmail.com" },
    { label: "GitHub", value: "aahanabobade" },
    { label: "LinkedIn", value: "aahana-bobade" },
    { label: "Tableau", value: "aahana.bobade" },
  ];

  return (
    <div className="flex flex-col overflow-auto bg-[var(--panel)] text-[#c9d1d9] font-mono text-[14px] ide-scrollbar h-full w-full p-10 pb-32">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1
            className="text-[48px] font-extrabold tracking-tight text-[#f0f6fc]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Aahana Bobade
          </h1>
          <div className="text-[#8b949e]">
            Junior Software Developer @ EduVanceAI · India <span className="align-middle">🇮🇳</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="flex items-center gap-1.5 rounded border border-[#30363d] bg-[#0d1117] px-2.5 py-1 text-[12px] text-[#58a6ff]">
              <div className="w-2 h-2 rounded-full bg-[#58a6ff]"></div> Python
            </span>
            <span className="flex items-center gap-1.5 rounded border border-[#30363d] bg-[#0d1117] px-2.5 py-1 text-[12px] text-[#58a6ff]">
              <div className="w-2 h-2 rotate-45 bg-[#58a6ff]"></div> TypeScript
            </span>
            <span className="flex items-center gap-1.5 rounded border border-[#30363d] bg-[#0d1117] px-2.5 py-1 text-[12px] text-[#e5c07b]">
              <span>⚡</span> FastAPI
            </span>
            <span className="flex items-center gap-1.5 rounded border border-[#30363d] bg-[#0d1117] px-2.5 py-1 text-[12px] text-[#ff7b72]">
              💬 LangChain
            </span>
            <span className="flex items-center gap-1.5 rounded border border-[#30363d] bg-[#0d1117] px-2.5 py-1 text-[12px] text-[#ff7b72]">
              🔥 PyTorch
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2
            className="text-[24px] font-bold text-[#f0f6fc] flex items-center gap-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            💜 About
          </h2>
          <p className="text-[#8b949e] leading-relaxed text-[15px] mb-2 max-w-[85ch]">
            Hi, Aahana on this side! I am an aspiring computer engineer and am curious to learn new things about life every day! Perfection is something I always aim for. Being big on integrity and authenticity is something I always believe in. I enjoy painting, photography, designing, and editing. Growing up, I have always loved spending quality time making music on the keyboard. Glad to see you, cheers!
          </p>
          <ul className="flex flex-col gap-2.5 text-[#8b949e] ml-2">
            <li className="flex items-start gap-3">
              <span>🔭</span>
              <span>
                Building <strong className="text-[#c9d1d9] font-semibold">scalable AI integrations</strong> at EduVanceAI
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>🤖</span>
              <span>NLP, LLMs, RAG pipelines, Vector DBs</span>
            </li>
            <li className="flex items-start gap-3">
              <span>⚡</span>
              <span>
                Making <strong className="text-[#c9d1d9] font-semibold">data stories non-data people get</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>✨</span>
              <span>
                <strong className="text-[#e5c07b] font-semibold">Always learning, always shipping</strong>
              </span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h2
            className="text-[24px] font-bold text-[#f0f6fc]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Stack
          </h2>
          <div className="flex flex-col gap-4">
            {Object.entries(stack).map(([category, items]) => (
              <div key={category} className="flex flex-row items-baseline gap-4">
                <span className="text-[#c9d1d9] font-semibold min-w-[100px]">{category}:</span>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-[#30363d] bg-[#21262d] px-2 py-0.5 text-[13px] text-[#8b949e]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2
            className="text-[24px] font-bold text-[#f0f6fc]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Connect
          </h2>
          <div className="flex flex-col gap-2 ml-4">
            {connect.map(({ label, value }) => (
              <div key={label} className="flex flex-row gap-2 text-[#8b949e]">
                <span className="text-[#58a6ff] w-20">{label}:</span>
                <span className="text-[#c9d1d9]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center text-[#8b949e] text-[13px]">
          Made with 🤍 by Aahana · 2026
        </div>
      </div>
    </div>
  );
}
