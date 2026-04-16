"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FaDatabase,
  FaServer,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";
import { VscSymbolStructure } from "react-icons/vsc";
import type { ProjectShape } from "./ProjectData";
import { SectionLabel, FlowDiagram } from "./ProjectUI";
import { MermaidBlock } from "./MermaidBlock";

function ArchCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay }}
      className={`rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 transition-colors hover:border-[var(--border-hover)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function FlowStep({ step, index }: { step: string; index: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="flex gap-3"
    >
      <div className="flex flex-col items-center">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--accent-muted)] bg-[var(--bg-muted)] text-[10px] font-bold text-[var(--accent)]">
          {index + 1}
        </div>
        <div className="mt-1 h-full w-px bg-[var(--border-default)]" />
      </div>
      <p className="type-body pb-4 text-[var(--text-secondary)]">{step}</p>
    </motion.div>
  );
}

function DataModelBlock({ model }: { model: string }) {
  return (
    <div className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] px-3 py-2">
      <code className="type-mono-sm text-[var(--text-secondary)] break-all">{model}</code>
    </div>
  );
}

export function ProjectArchitecture({ project }: { project: ProjectShape }) {
  const architecture = project.architecture?.trim();
  const flows = project.flows ?? [];
  const dataModels = project.dataModels ?? [];
  const backend = (project.backend as string | undefined)?.trim();
  const dataStorage = (project.dataStorage as string | undefined)?.trim();
  const hasVisualFlow = (project.visualFlow?.length ?? 0) > 0;
  const mermaidDiagrams = project.mermaidDiagrams ?? [];
  const hasAnyContent = architecture || hasVisualFlow || mermaidDiagrams.length > 0 || flows.length > 0 || dataModels.length > 0 || backend || dataStorage;

  if (!hasAnyContent) {
    return (
      <div className="flex flex-col gap-6">
        <SectionLabel label="Architecture" />
        <div className="flex flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-[var(--border-default)] bg-[var(--bg-elevated)] px-6 py-16 text-center">
          <VscSymbolStructure size={36} className="text-[var(--text-muted)] opacity-30" />
          <div className="type-body text-[var(--text-muted)]">
            No architecture data published for this repository.
          </div>
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="type-btn inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            View on GitHub
            <FaArrowUpRightFromSquare size={10} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* System Overview */}
      {architecture ? (
        <section>
          <SectionLabel label="System Overview" />
          <ArchCard>
            <p className="type-body max-w-[72ch] text-[var(--text-secondary)]">{architecture}</p>
          </ArchCard>
        </section>
      ) : null}

      {/* Flow Diagram */}
      {hasVisualFlow ? (
        <section>
          <SectionLabel label="System Flow" />
          <FlowDiagram project={project} />
        </section>
      ) : null}

      {/* Mermaid Architecture Diagrams */}
      {mermaidDiagrams.length > 0 ? (
        <section>
          <SectionLabel label="Detailed Architecture" />
          <div className="space-y-4">
            {mermaidDiagrams.map((chart, index) => (
              <MermaidBlock
                key={`mermaid-${project.id}-${index}`}
                chart={chart}
                title={index === 0 ? "System Architecture" : "Request/Processing Pipeline"}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* Execution Flows */}
      {flows.length > 0 ? (
        <section>
          <SectionLabel label="Execution Flow" />
          <ArchCard>
            <div className="flex flex-col">
              {flows.map((step, index) => (
                <FlowStep key={`flow-${index}`} step={step} index={index} />
              ))}
            </div>
          </ArchCard>
        </section>
      ) : null}

      {/* Data Models */}
      {dataModels.length > 0 ? (
        <section>
          <SectionLabel label="Data Models" />
          <ArchCard>
            <div className="space-y-2">
              {dataModels.map((model, index) => (
                <DataModelBlock key={`model-${index}`} model={model} />
              ))}
            </div>
          </ArchCard>
        </section>
      ) : null}

      {/* Backend + Storage */}
      {(backend || dataStorage) ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {backend ? (
            <ArchCard delay={0.05}>
              <div className="mb-3 flex items-center gap-2">
                <FaServer size={14} className="text-[var(--accent)]" />
                <span className="type-sys-micro text-[var(--text-muted)]">Backend</span>
              </div>
              <p className="type-body text-[var(--text-secondary)]">{backend}</p>
            </ArchCard>
          ) : null}
          {dataStorage ? (
            <ArchCard delay={0.1}>
              <div className="mb-3 flex items-center gap-2">
                <FaDatabase size={14} className="text-[var(--accent)]" />
                <span className="type-sys-micro text-[var(--text-muted)]">Data Storage</span>
              </div>
              <p className="type-body text-[var(--text-secondary)]">{dataStorage}</p>
            </ArchCard>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
