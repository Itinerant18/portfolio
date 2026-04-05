"use client";

import AboutTab from "@/components/AboutTab";
import ContactTab from "@/components/ContactTab";
import EditorTabs from "@/components/EditorTabs";
import ExperienceTab from "@/components/ExperienceTab";
import HomeTab from "@/components/HomeTab";
import ProjectsTab from "@/components/ProjectsTab";
import ReadmeTab from "@/components/ReadmeTab";
import SkillsTab from "@/components/SkillsTab";
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

  const renderCustomTab = () => {
    if (!file) return null;
    switch (file.name) {
      case "home.tsx":
        return <HomeTab />;
      case "projects.ts":
        return <ProjectsTab />;
      case "skills.json":
        return <SkillsTab />;
      case "experience.ts":
        return <ExperienceTab />;
      case "contact.css":
        return <ContactTab />;
      case "README.md":
        return <ReadmeTab />;
      case "about.html":
        return <AboutTab />;
      default:
        return null;
    }
  };

  const isCustomTab = file && [
    "home.tsx",
    "projects.ts",
    "skills.json",
    "experience.ts",
    "contact.css",
    "README.md",
    "about.html",
  ].includes(file.name);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--bg-surface)] text-[var(--text-primary)]">
      <EditorTabs />

      <div className="min-h-0 flex-1 overflow-hidden">
        {!file || !activeFile ? (
          <div className="flex h-full items-center justify-center px-6 text-center text-[13px] text-[var(--text-disabled)] italic font-medium">
            Select a file from the explorer to view its contents.
          </div>
        ) : (
          <div className="h-full">
            {isCustomTab ? (
              renderCustomTab()
            ) : (
              <div className="ide-scrollbar h-full overflow-auto bg-[var(--bg-surface)]">
                <div
                  data-ide-editor-content="true"
                  className="min-w-max py-4 text-[13px]"
                >
                  {highlightedLines.map((line, index) => {
                    const isActive = activeLine === index + 1;

                    return (
                      <div
                        key={`${file.path}-${index + 1}`}
                        onClick={() => setActiveLine(index + 1)}
                        className={`grid min-h-6 grid-cols-[48px_minmax(0,1fr)] items-start transition-colors ${
                          isActive ? "bg-[var(--accent-subtle)] border-l-[2px] border-l-[var(--accent)]" : "border-l-[2px] border-l-transparent hover:bg-[var(--bg-muted)]/30"
                        }`}
                      >
                        <div
                          className={`select-none px-3 text-right text-[12px] leading-6 font-mono font-medium ${
                            isActive
                              ? "text-[var(--text-primary)]"
                              : "text-[var(--text-disabled)]"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <pre className="m-0 overflow-visible px-4">
                          <code
                            className="block whitespace-pre text-[13px] leading-6 text-[var(--text-secondary)] font-mono"
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
        )}
      </div>
    </div>
  );
}
