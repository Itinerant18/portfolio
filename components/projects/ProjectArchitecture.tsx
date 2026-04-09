"use client";

import { motion } from "framer-motion";
import type { ProjectDetail, ProjectShape } from "./ProjectData";
import { SectionLabel, FlowDiagram } from "./ProjectUI";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function ProjectArchitecture({ project, detail }: { project: ProjectShape; detail: ProjectDetail }) {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <SectionLabel label="Operational Architecture" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 rounded-sm border border-[var(--border-default)] bg-[var(--bg-base)] p-6 md:p-10 shadow-inner"
        >
          <div className="flex items-center gap-4 text-[11px] text-[var(--info)] font-mono mb-8">
            <span className="font-bold opacity-80 animate-pulse">$ arch --inspect --verbose</span>
            <div className="h-[1px] flex-1 bg-[var(--border-default)] opacity-30" />
          </div>
          
          <div className="flex flex-col gap-10">
            <FlowDiagram project={project} />
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                { label: "Logic Layer", value: detail.backend.split(".")[0], accent: "var(--info)" },
                { label: "Persistence", value: detail.storage.split(".")[0], accent: "var(--success)" },
                { label: "Discovery", value: "Optimized for steady iteration and explicit flow.", accent: "var(--accent)" }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={cardVariants}
                  whileHover={{ y: -4, borderLeftColor: item.accent }}
                  className="rounded-sm border border-[var(--border-default)] border-l-2 bg-[var(--bg-elevated)] p-6 shadow-sm transition-all hover:shadow-md"
                  style={{ borderLeftColor: "transparent" }}
                >
                  <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">{item.label}</div>
                  <div className="text-[13px] font-medium leading-relaxed text-[var(--text-secondary)]">{item.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section>
        <SectionLabel label="Data Schema Preview" />
        <div className="mt-4 space-y-6">
          {detail.dataModels.slice(0, 2).map((model: string, index: number) => (
            <motion.div
              key={`${project.id}-model-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="group relative overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-lg transition-all hover:border-[var(--accent-muted)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--bg-muted)]/50 px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Schema Definition {index + 1}</span>
                </div>
                <div className="flex gap-1.5 opacity-40">
                  <div className="h-2 w-2 rounded-full bg-[var(--border-default)]" />
                  <div className="h-2 w-2 rounded-full bg-[var(--border-default)]" />
                </div>
              </div>
              <pre className="ide-scrollbar p-6 text-[12.5px] font-mono leading-relaxed text-[var(--info)] bg-[var(--bg-base)] selection:bg-[var(--accent-muted)] overflow-x-auto">
                {model}
              </pre>
              <div className="absolute bottom-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--accent)] opacity-50">Read Only</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
