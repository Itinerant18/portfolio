export default function ContactTab() {
  const links = [
    {
      title: "EMAIL",
      detail: "aahanabobade@gmail.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#79c0ff]">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      color: "bg-[rgba(121,192,255,0.1)]",
    },
    {
      title: "LINKEDIN",
      detail: "linkedin.com/in/aahana-bobade",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#58a6ff]">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      color: "bg-[rgba(88,166,255,0.1)]",
    },
    {
      title: "GITHUB",
      detail: "github.com/aahanabobade",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#f0f6fc]">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
      color: "bg-[rgba(240,246,252,0.1)]",
    },
    {
      title: "MEDIUM",
      detail: "medium.com/@aahanabobade",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#8b949e]">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      ),
      color: "bg-[rgba(139,148,158,0.1)]",
    },
    {
      title: "TABLEAU",
      detail: "Tableau Public Vizzes",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#d19a66]">
          <path d="M18 20V10" />
          <path d="M12 20V4" />
          <path d="M6 20v-6" />
        </svg>
      ),
      color: "bg-[rgba(209,154,102,0.1)]",
    },
    {
      title: "LEETCODE",
      detail: "leetcode.com/aahanabobade",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#e5c07b]">
           <polyline points="16 18 22 12 16 6" />
           <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      color: "bg-[rgba(229,192,123,0.1)]",
    },
    {
      title: "YOUTUBE",
      detail: "youtube.com/@aahanabobade",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#e06c75]">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </svg>
      ),
      color: "bg-[rgba(224,108,117,0.1)]",
    },
    {
      title: "INSTAGRAM",
      detail: "instagram.com/aahanabobade1",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#c678dd]">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
      color: "bg-[rgba(198,120,221,0.1)]",
    },
  ];

  return (
    <div className="flex flex-col overflow-auto bg-[var(--panel)] text-[var(--text-primary)] font-mono text-[13px] ide-scrollbar h-full w-full p-8 pb-32">
      <div className="w-full max-w-5xl mx-auto">
        <div className="mb-8 font-mono text-[#6e7681]">
          /* contact.css - let's build something */
        </div>

        <div className="mb-12">
          <h1
            className="text-[40px] font-extrabold tracking-wide text-[#f0f6fc] mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Contact
          </h1>
          <div className="text-[#8b949e]">
            // open to work, collabs & good conversations
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-6">
            <h2 className="text-[14px] font-semibold tracking-[0.2em] text-[#56b6c2] mb-2">
              FIND ME ON
            </h2>
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <div
                  key={link.title}
                  className="group flex flex-row items-center cursor-pointer border border-[#30363d] rounded-lg p-3 hover:bg-[#21262d] transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-md flex items-center justify-center mr-4 ${link.color}`}
                  >
                    {link.icon}
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[#58a6ff] font-semibold text-[12px] mb-0.5">
                      {link.title}
                    </span>
                    <span className="text-[#c9d1d9] text-[13px]">
                      {link.detail}
                    </span>
                  </div>
                  <div className="text-[#6e7681] group-hover:text-[#c9d1d9] transition-colors pr-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-[14px] font-semibold tracking-[0.2em] text-[#56b6c2] mb-2">
              SEND A MESSAGE
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-[#8b949e] text-[12px]">
                  // YOUR_NAME <span className="text-[#e06c75]">*</span>
                </div>
                <input
                  type="text"
                  placeholder="string"
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2.5 text-[#c9d1d9] outline-none focus:border-[#58a6ff] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-[#8b949e] text-[12px]">
                  // YOUR_EMAIL <span className="text-[#e06c75]">*</span>
                </div>
                <input
                  type="email"
                  placeholder="string"
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2.5 text-[#c9d1d9] outline-none focus:border-[#58a6ff] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-[#8b949e] text-[12px]">
                  // SUBJECT
                </div>
                <input
                  type="text"
                  placeholder="string"
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2.5 text-[#c9d1d9] outline-none focus:border-[#58a6ff] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-[#8b949e] text-[12px]">
                  // MESSAGE <span className="text-[#e06c75]">*</span>
                </div>
                <textarea
                  placeholder="'''your message'''"
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2.5 text-[#e5c07b] outline-none focus:border-[#58a6ff] transition-colors h-32 resize-none"
                />
              </div>
              <button
                type="button"
                className="w-full bg-[#007acc] hover:bg-[#005fb8] text-white rounded p-3 font-semibold mt-2 transition-colors flex justify-left items-center gap-2"
              >
                <span>&#x27A4;</span> send_message()
              </button>
              <div className="text-[#6e7681] text-[12px] mt-2">
                // Powered by Formspree (lands directly in my inbox) :p
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
