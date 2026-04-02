"use client";

import { useIDEStore } from "@/store/useIDEStore";

const menuItems = ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"];

export default function TopBar() {
  const toggleSidebar = useIDEStore((state) => state.toggleSidebar);
  const toggleAIPanel = useIDEStore((state) => state.toggleAIPanel);
  const toggleSplitView = useIDEStore((state) => state.toggleSplitView);
  const openCommandPalette = useIDEStore((state) => state.openCommandPalette);

  return (
    <header className="flex h-[32px] w-full items-center justify-between border-b border-[var(--border)] bg-[var(--bg-app)] px-2 shrink-0 select-none">
      {/* Left Menu - Dense */}
      <div className="flex items-center gap-0.5">
        <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-[2px] bg-[var(--accent)] text-[9px] font-black text-white">
          C
        </div>
        <div className="flex items-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item}
              className="px-1.5 py-1 text-[11px] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)] transition-all"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Center Title - Small & Precise */}
      <div className="absolute left-1/2 -translate-x-1/2 text-[11px] text-[var(--text-muted)] font-medium pointer-events-none truncate max-w-[30%]">
        cursor-portfolio — index.tsx
      </div>

      {/* Right Actions - Functional */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => openCommandPalette("files")}
          className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]"
          title="Search Files (Ctrl+P)"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
        <button
          onClick={toggleSplitView}
          className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]"
          title="Toggle Split Editor"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="3" x2="12" y2="21"></line></svg>
        </button>
        <button
          onClick={toggleSidebar}
          className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]"
          title="Toggle Explorer"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="15" y1="3" x2="15" y2="21"></line></svg>
        </button>
        <button
          onClick={toggleAIPanel}
          className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]"
          title="Toggle AI Panel"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </button>
        <div className="ml-1 flex h-5 w-5 items-center justify-center bg-[var(--bg-active)] text-[9px] font-bold border border-[var(--border)]">
          JD
        </div>
      </div>
    </header>
  );
}
