"use client";

import EditorTabs from "@/components/EditorTabs";
import { getPortfolioFile } from "@/data/files";
import { useIDEStore } from "@/store/useIDEStore";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import { useEffect, useMemo, useState } from "react";

export default function CodeEditor() {
  const activeFile = useIDEStore((state) => state.activeFile);
  const file = activeFile ? getPortfolioFile(activeFile) : undefined;
  const [activeLine, setActiveLine] = useState(1);

  const highlightedLines = useMemo(() => {
    if (!file) {
      return [];
    }

    const language =
      file.language === "json"
        ? "json"
        : file.language === "tsx"
          ? "tsx"
          : "typescript";

    const grammar =
      Prism.languages[language] ??
      Prism.languages.tsx ??
      Prism.languages.typescript ??
      Prism.languages.json;

    return Prism.highlight(file.content, grammar, language).split("\n");
  }, [file]);

  useEffect(() => {
    if (!file) {
      setActiveLine(1);
      return;
    }

    const index = file.content
      .split("\n")
      .findIndex((line) => line.trim().length > 0);

    setActiveLine(index >= 0 ? index + 1 : 1);
  }, [file]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--panel)] text-[var(--text-primary)]">
      <EditorTabs />

      <div className="min-h-0 flex-1 overflow-hidden">
        {!file || !activeFile ? (
          <div className="flex h-full items-center justify-center px-3 text-[12px] text-[var(--text-muted)]">
            Open a file from the explorer to start browsing the workspace.
          </div>
        ) : (
          <div className="ide-scrollbar h-full overflow-auto bg-[var(--panel)]">
            <div data-ide-editor-content="true" className="min-w-max py-2 text-[13px]">
              {highlightedLines.map((line, index) => {
                const isActive = activeLine === index + 1;

                return (
                  <div
                    key={`${file.path}-${index + 1}`}
                    onClick={() => setActiveLine(index + 1)}
                    className={`grid min-h-6 grid-cols-[44px_minmax(0,1fr)] items-start ${
                      isActive ? "bg-[rgba(124,58,237,0.15)]" : ""
                    }`}
                  >
                    <div
                      className={`select-none px-2 text-right text-[12px] leading-6 ${
                        isActive ? "text-[var(--text)]" : "text-[var(--text-muted)]"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <pre className="m-0 overflow-visible px-3">
                      <code
                        className="block whitespace-pre text-[13px] leading-6 text-[var(--text)]"
                        dangerouslySetInnerHTML={{
                          __html: line.length ? line : "&nbsp;",
                        }}
                      />
                    </pre>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
