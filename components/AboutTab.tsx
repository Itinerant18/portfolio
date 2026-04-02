export default function AboutTab() {
  return (
    <div className="flex flex-col overflow-auto bg-[var(--panel)] text-[var(--text-primary)] font-mono text-[13px] ide-scrollbar h-full w-full p-8 pb-32">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-8 font-mono text-[#6e7681]">
          {"<!-- about.html - Aahana Bobade -->"}
        </div>

        <div className="mb-12">
          <h1
            className="text-[40px] font-extrabold tracking-wide text-[#f0f6fc] mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            About Me
          </h1>
          <div className="text-[#8b949e]">
            // who I am · what I do · where I build
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="border border-[#30363d] rounded-lg p-6 bg-[#0d1117] text-[#8b949e] leading-relaxed text-[14px]">
            Hi! I'm <span className="text-[#58a6ff] font-medium">Aahana Bobade</span>, a software developer living at the crossroads of <span className="text-[#58a6ff] font-medium">backend engineering</span>, <span className="text-[#58a6ff] font-medium">AI/ML</span>, and <span className="text-[#58a6ff] font-medium">data science</span>. I love building systems that are not just functional but genuinely <span className="text-[#58a6ff] font-medium">intelligent and scalable</span>. Currently a <span className="text-[#58a6ff] font-medium">Junior Software Developer at EduVanceAI</span>, building AI integrations and backend systems that power learning experiences for thousands of users daily.
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-[14px] font-semibold tracking-[0.2em] text-[#56b6c2] mb-1">
              CURRENT FOCUS
            </h2>
            <div className="border border-[#30363d] rounded-lg p-6 bg-[#0d1117] grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-[#8b949e]">
              <div className="flex items-start gap-3">
                <span className="shrink-0">🔭</span>
                <span>Building scalable backend systems & AI integrations at EduVanceAI</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0">🧠</span>
                <span>Deep interest in NLP, LLMs & ML pipelines</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0">🪴</span>
                <span>Currently exploring RAG, MLOps & Vector Databases</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0">💬</span>
                <span>Talk to me about Python, APIs, Data Science</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0">⚡</span>
                <span>Making data stories non-data people actually get</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0">✨</span>
                <span>Always learning, always shipping</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-[14px] font-semibold tracking-[0.2em] text-[#56b6c2] mb-1">
              EDUCATION
            </h2>
            <div className="flex flex-col gap-4">
              <div className="border border-[#30363d] rounded-lg p-6 bg-[#0d1117] flex justify-between items-start">
                <div className="flex flex-col gap-1.5 text-[#8b949e]">
                  <h3 className="text-[#f0f6fc] text-[16px] font-semibold flex items-center gap-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <span className="text-[16px]">🎓</span> SIES Graduate School of Technology
                  </h3>
                  <div className="text-[13px] text-[#6e7681]">University of Mumbai</div>
                  <div className="text-[#58a6ff] font-medium mt-1">Bachelor of Engineering in Computer Engineering</div>
                  <div className="text-[13px]">Minors: Artificial Intelligence & Machine Learning (AI/ML)</div>
                  <div className="text-[#56b6c2] text-[13px] mt-1 font-medium">GPA: 9.28</div>
                </div>
                <div className="text-[#8b949e] text-[13px]">2021 - 2025</div>
              </div>

              <div className="border border-[#30363d] rounded-lg p-6 bg-[#0d1117] flex justify-between items-start">
                <div className="flex flex-col gap-1.5 text-[#8b949e]">
                  <h3 className="text-[#f0f6fc] text-[16px] font-semibold flex items-center gap-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <span className="text-[16px]">🏫</span> New Horizon Public School, Airoli
                  </h3>
                  <div className="text-[#58a6ff] font-medium mt-2">Higher Secondary Education</div>
                  <div className="text-[13px]">Class 12th: 89.6% | Class 10th: 91.8%</div>
                </div>
                <div className="text-[#8b949e] text-[13px]">2007 - 2021</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
