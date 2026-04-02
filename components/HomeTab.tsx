import React from "react";

export default function HomeTab() {
  return (
    <div className="flex flex-col overflow-auto bg-[var(--panel)] text-[var(--text-primary)] font-mono text-[13px] ide-scrollbar h-full w-full p-8 md:p-12 pb-32">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-10">
        
        <div className="mb-2 font-mono text-[#e5c07b]">
          // hello world !! Welcome to my portfolio
        </div>

        <div className="flex flex-col mb-4">
          <h1
            className="text-[80px] leading-[0.9] font-black tracking-tight text-[#fffae8]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Aahana
          </h1>
          <h1
            className="text-[80px] leading-[0.9] font-black tracking-tight text-[#ff5a4f]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Bobade
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-md border border-[#30363d] bg-[rgba(22,27,34,0.5)] px-3 py-1.5 text-[12px] text-[#8b949e]">
            <div className="w-2 h-2 rounded-full bg-[#56b6c2]"></div>
            Backend Engineer
          </div>
          <div className="flex items-center gap-2 rounded-md border border-[#30363d] bg-[rgba(22,27,34,0.5)] px-3 py-1.5 text-[12px] text-[#8b949e]">
            <div className="w-2 h-2 rounded-full bg-[#c678dd]"></div>
            AI / ML Dev
          </div>
          <div className="flex items-center gap-2 rounded-md border border-[#30363d] bg-[rgba(22,27,34,0.5)] px-3 py-1.5 text-[12px] text-[#8b949e]">
            <div className="w-2 h-2 rounded-full bg-[#58a6ff]"></div>
            Data Scientist
          </div>
          <div className="flex items-center gap-2 rounded-md border border-[#30363d] bg-[rgba(22,27,34,0.5)] px-3 py-1.5 text-[12px] text-[#e06c75]">
            <div className="w-2 h-2 rounded-full bg-[#e06c75]"></div>
            @ EduVanceAI
          </div>
        </div>

        <div className="mt-2 text-[#8b949e] text-[15px]">
          Building intelligent backend systems 🚀<span className="text-[#e06c75] font-bold animate-pulse">|</span>
        </div>

        <div className="max-w-[65ch] text-[#6e7681] text-[15px] leading-relaxed">
          I live at the crossroads of <span className="text-[#c9d1d9] font-medium">backend engineering</span>, <span className="text-[#c9d1d9] font-medium">AI/ML</span>, and <span className="text-[#c9d1d9] font-medium">data science</span>. I build systems that are genuinely <span className="text-[#c9d1d9] font-medium">intelligent and scalable</span>.
        </div>

        <div className="flex flex-wrap gap-4 mt-2">
          <button className="flex items-center gap-2 rounded border border-[#e5c07b] bg-[#e5c07b] px-6 py-2 text-[12px] font-bold text-[#0d1117] hover:bg-[#d1b071] transition-colors">
            <span className="opacity-70">📁</span> Projects
          </button>
          <button className="flex items-center gap-2 rounded border border-[#30363d] bg-transparent px-6 py-2 text-[12px] font-medium text-[#c9d1d9] hover:bg-[#21262d] transition-colors">
            <span className="text-[#c678dd]">👤</span> About Me
          </button>
          <button className="flex items-center gap-2 rounded border border-[#30363d] bg-transparent px-6 py-2 text-[12px] font-medium text-[#c9d1d9] hover:bg-[#21262d] transition-colors">
            <span className="text-[#8b949e]">✉️</span> Contact
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 border border-[#30363d] rounded-lg overflow-hidden bg-[#0d1117]">
          <div className="flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#30363d]">
            <div className="text-[28px] font-black text-[#f0f6fc] tracking-tight mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>3+</div>
            <div className="text-[10px] tracking-[0.2em] text-[#6e7681] font-semibold">YEARS</div>
          </div>
          <div className="flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#30363d]">
            <div className="text-[28px] font-black text-[#f0f6fc] tracking-tight mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>10+</div>
            <div className="text-[10px] tracking-[0.2em] text-[#6e7681] font-semibold">PROJECTS</div>
          </div>
          <div className="flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#30363d]">
            <div className="text-[28px] font-black text-[#f0f6fc] tracking-tight mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>∞</div>
            <div className="text-[10px] tracking-[0.2em] text-[#6e7681] font-semibold">CURIOSITY</div>
          </div>
          <div className="flex flex-col items-center justify-center p-6">
            <div className="text-[24px] font-black text-[#f0f6fc] tracking-tight mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>↑</div>
            <div className="text-[10px] tracking-[0.2em] text-[#6e7681] font-semibold">ALWAYS LEARNING</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          {[
            { name: "GitHub", icon: "cat", color: "text-[#f0f6fc]" },
            { name: "LinkedIn", icon: "in", color: "text-[#58a6ff]" },
            { name: "Medium", icon: "M", color: "text-[#8b949e]" },
            { name: "Tableau", icon: "t", color: "text-[#d19a66]" },
            { name: "LeetCode", icon: "</>", color: "text-[#e5c07b]" },
            { name: "Instagram", icon: "ig", color: "text-[#c678dd]" },
            { name: "Email", icon: "@", color: "text-[#56b6c2]" },
            { name: "Youtube", icon: "▶", color: "text-[#f25f5c]" }
          ].map(social => (
            <button key={social.name} className="flex items-center gap-2 rounded border border-[#30363d] bg-transparent px-3 py-1.5 text-[12px] text-[#8b949e] hover:bg-[#21262d] hover:text-[#c9d1d9] transition-colors">
              <span className={`font-bold ${social.color}`}>{social.name === 'LinkedIn' ? 'in' : social.name === 'GitHub' ? <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg> : social.name === 'Medium' ? 'M' : social.name === 'Tableau' ? '▤' : social.name === 'LeetCode' ? '{/}' : social.name === 'Instagram' ? '◎' : social.name === 'Email' ? '✉' : social.icon}</span> {social.name}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
