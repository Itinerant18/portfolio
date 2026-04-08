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
import { AnimatePresence, motion } from "framer-motion";
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
  const shortcuts = [
    ["Open file palette", "Ctrl+P"],
    ["Open command palette", "Ctrl+K"],
    ["Toggle terminal", "Ctrl+`"],
    ["Toggle AI panel", "Ctrl+Shift+A"],
    ["Toggle sidebar", "Ctrl+B"],
    ["Zoom", "Ctrl +/-"],
  ];

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--bg-surface)] text-[var(--text-primary)]">
      <EditorTabs />

      <div className="min-h-0 flex-1 overflow-hidden">
        {!file || !activeFile ? (
          <div className="flex h-full items-center justify-center px-6 pb-16 text-[var(--text-primary)]">
            <div className="w-full max-w-3xl rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 md:p-8">
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Welcome
              </div>
              <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.04em] md:text-[28px]">
                Keyboard shortcuts
              </h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {shortcuts.map(([label, combo]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] px-4 py-3"
                  >
                    <span className="text-[13px] text-[var(--text-secondary)]">{label}</span>
                    <kbd className="rounded border border-[var(--border-default)] bg-[var(--bg-elevated)] px-2 py-1 text-[11px] text-[var(--text-primary)]">
                      {combo}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full">

            <AnimatePresence mode="wait">
              <motion.div
                key={file.path}
                className="h-[calc(100%-33px)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
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
                              isActive ? "border-l-[2px] border-l-[var(--accent)] bg-[var(--accent-subtle)]" : "border-l-[2px] border-l-transparent hover:bg-[var(--bg-muted)]/30"
                            }`}
                          >
                            <div
                              className={`select-none px-3 text-right text-[12px] font-mono font-medium leading-6 ${
                                isActive
                                  ? "text-[var(--text-primary)]"
                                  : "text-[var(--text-disabled)]"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <pre className="m-0 overflow-visible px-4">
                              <code
                                className="block whitespace-pre font-mono text-[13px] leading-6 text-[var(--text-secondary)]"
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
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
