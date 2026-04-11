"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ProjectShape } from "./ProjectData";
import { SectionLabel } from "./ProjectUI";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectReadme({ project }: { project: ProjectShape }) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState("");

  useEffect(() => {
    const username = "Itinerant18";
    const branch = "main";
    fetch(`https://raw.githubusercontent.com/${username}/${project.id}/${branch}/README.md`)
      .then((r) => r.ok ? r.text() : Promise.reject())
      .then((text) => { setContent(text); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [project.id]);

  if (loading) return (
    <div className="flex items-center gap-3 py-20 text-[var(--text-muted)]">
      <div className="h-4 w-4 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
      <span className="type-mono-sm tracking-wider">Fetching README.md...</span>
    </div>
  );

  if (error) return (
    <div className="py-20 text-center">
      <p className="type-body text-[var(--text-muted)]">No README found for this repository.</p>
    </div>
  );

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="prose prose-invert max-w-none min-w-0 overflow-hidden"
      style={{
        "--tw-prose-body": "var(--text-secondary)",
        "--tw-prose-headings": "var(--text-primary)",
        "--tw-prose-code": "var(--accent)",
        "--tw-prose-pre-bg": "var(--bg-elevated)",
      } as React.CSSProperties}
    >
      <SectionLabel label="README.md" />
      <div className="mt-6 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 md:p-8 overflow-hidden min-w-0">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="type-hero gradient-text mb-6">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="type-section text-[var(--text-primary)] mb-4 mt-8 border-b border-[var(--border-default)] pb-2">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="type-sub text-[var(--text-primary)] mb-3 mt-6">{children}</h3>
            ),
            code({ className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");
              if (match) {
                return (
                  <div className="relative my-4 rounded-sm overflow-hidden border border-[var(--border-default)]">
                    <div className="flex items-center justify-between bg-[var(--bg-muted)] px-4 py-2 border-b border-[var(--border-default)]">
                      <span className="type-mono-sm text-[var(--accent)] uppercase tracking-wider">{match[1]}</span>
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"/>
                        <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"/>
                        <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]"/>
                      </div>
                    </div>
                    <SyntaxHighlighter
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ margin: 0, background: "var(--bg-base)", padding: "1.25rem", overflowX: "auto" }}
                      wrapLines={true}
                      wrapLongLines={true}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                );
              }
              return <code className="type-mono-sm rounded px-1.5 py-0.5 text-[var(--accent)] bg-[var(--accent-subtle)] break-words">{children}</code>;
            },
            img: ({ src, alt }: any) => (
              <img src={`/api/proxy-image?url=${encodeURIComponent(src as string || "")}`} alt={alt as string} className="rounded-sm border border-[var(--border-default)] max-w-full my-4" />
            ),
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">{children}</a>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[var(--accent)] bg-[var(--accent-subtle)] pl-4 py-2 my-4 italic text-[var(--text-secondary)] rounded-r-sm">{children}</blockquote>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-4 max-w-full">
                <table className="w-full text-[12px] border-collapse">{children}</table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border border-[var(--border-default)] bg-[var(--bg-muted)] px-3 py-2 text-left font-semibold text-[var(--text-primary)]">{children}</th>
            ),
            td: ({ children }) => (
              <td className="border border-[var(--border-default)] px-3 py-2 text-[var(--text-secondary)]">{children}</td>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </motion.article>
  );
}
