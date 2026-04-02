"use client";

import { useIDEStore } from "@/store/useIDEStore";
import { getPortfolioFile } from "@/data/files";
import Prism from "prismjs";

// Force Prism to be global for components to register correctly
if (typeof window !== "undefined") {
  (window as any).Prism = Prism;
}

import "prismjs/components/prism-markup";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import { useEffect, useMemo, useState } from "react";

export default function CodeEditor() {
  const activeFile = useIDEStore((state) => state.activeFile);
  const file = getPortfolioFile(activeFile);
  const [activeLine, setActiveLine] = useState(1);

  const highlightedLines = useMemo(() => {
    if (!file) return [];
    
    const lang = file.language === "json" ? "json" : "tsx";
    const grammar = Prism.languages[lang] || Prism.languages.tsx;
    const highlighted = Prism.highlight(file.content, grammar, lang);
    return highlighted.split("\n");
  }, [file]);

  useEffect(() => {
    setActiveLine(1);
  }, [file]);

  if (!file) {
    return (
      <div className="flex h-full items-center justify-center bg-[var(--bg-editor)] text-[var(--text-muted)] text-[11px] font-medium tracking-tight">
        Select a file to view its content
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-[var(--bg-editor)] font-mono text-[12px] leading-[1.5] select-text">
      {/* Breadcrumbs - Denser */}
      <div className="flex items-center px-3 h-[24px] border-b border-[var(--border-muted)] text-[10px] text-[var(--text-muted)] select-none shrink-0 bg-[#0D1117]">
        <span className="hover:text-[var(--text)] cursor-pointer">portfolio</span>
        <span className="mx-1 opacity-50">/</span>
        <span className="text-[var(--text)] font-semibold">{file.name}</span>
      </div>

      {/* Editor Content - Higher Density */}
      <div className="flex-1 overflow-auto no-scrollbar py-1">
        {highlightedLines.map((line, i) => {
          const isSelected = activeLine === i + 1;
          return (
            <div
              key={`${file.path}-${i}`}
              onClick={() => setActiveLine(i + 1)}
              className={`flex hover:bg-[var(--bg-hover)] cursor-text min-h-[18px] ${isSelected ? "bg-[var(--accent-muted)]" : ""}`}
            >
              <div className={`w-10 shrink-0 pr-3 text-right text-[10px] text-[var(--text-muted)] opacity-40 select-none ${isSelected ? "opacity-100 text-[var(--accent)] font-bold" : ""}`}>
                {i + 1}
              </div>
              <pre className="m-0 overflow-visible">
                <code
                  className="block whitespace-pre text-[var(--text)]"
                  dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
                />
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
}
