"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import type { ProjectDetail, ProjectShape } from "./ProjectData";
import { SectionLabel, FlowDiagram } from "./ProjectUI";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -10 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const characterVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const schemaLineVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: (lineIndex: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: lineIndex * 0.08,
      duration: 0.24,
      staggerChildren: 0.002,
      delayChildren: lineIndex * 0.02,
    },
  }),
};

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const shouldReduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(shouldReduceMotion ? text : "");
  const [done, setDone] = useState(shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    let index = 0;
    let intervalId: number | undefined;
    setDisplayed("");
    setDone(false);

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));

        if (index >= text.length) {
          setDone(true);
          if (intervalId) {
            window.clearInterval(intervalId);
          }
        }
      }, 35);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [delay, shouldReduceMotion, text]);

  return (
    <span className="font-mono text-[11px] text-[var(--info)]">
      {displayed}
      {!done ? (
        <span className="ml-0.5 inline-block h-3 w-[2px] bg-[var(--accent)] animate-[blink_1s_step-end_infinite]" />
      ) : null}
    </span>
  );
}

export function ProjectArchitecture({ project, detail }: { project: ProjectShape; detail: ProjectDetail }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <section>
        <SectionLabel label="Operational Architecture" />
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 rounded-sm border border-[var(--border-default)] bg-[var(--bg-base)] p-4 shadow-inner sm:p-6 lg:p-10"
        >
          <div className="mb-6 flex flex-col gap-3 text-[11px] font-mono text-[var(--info)] sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
            <TypewriterText text="$ arch --inspect --verbose" delay={200} />
            <div className="h-[1px] flex-1 bg-[var(--border-default)] opacity-30" />
          </div>
          
          <div className="flex flex-col gap-8 sm:gap-10">
            <FlowDiagram project={project} />
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
              style={{ perspective: "900px" }}
            >
              {[
                { label: "Logic Layer", value: detail.backend.split(".")[0], accent: "var(--info)" },
                { label: "Persistence", value: detail.storage.split(".")[0], accent: "var(--success)" },
                { label: "Discovery", value: "Optimized for steady iteration and explicit flow.", accent: "var(--accent)" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -6, rotateX: 4 }}
                  className="crt-panel group relative rounded-sm border border-[var(--border-default)] border-l-2 bg-[var(--bg-elevated)] p-4 shadow-sm transition-all hover:shadow-md sm:p-6"
                  style={{ borderLeftColor: "transparent", transformStyle: "preserve-3d" }}
                >
                  <span
                    className="absolute inset-y-4 left-0 w-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: item.accent, boxShadow: `0 0 12px ${item.accent}` }}
                  />
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
        <div className="mt-4 space-y-4 sm:space-y-6">
          {detail.dataModels.slice(0, 2).map((model: string, index: number) => (
            <motion.div
              key={`${project.id}-model-${index}`}
              initial={shouldReduceMotion ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="group relative overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-lg transition-all hover:border-[var(--accent-muted)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--bg-muted)]/50 px-3 py-2 sm:px-4 sm:py-2.5">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[var(--accent)] [animation:neon-pulse_2.2s_ease-in-out_infinite]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Schema Definition {index + 1}</span>
                </div>
                <div className="flex gap-1.5 opacity-40">
                  <div className="h-2 w-2 rounded-full bg-[var(--border-default)]" />
                  <div className="h-2 w-2 rounded-full bg-[var(--border-default)]" />
                </div>
              </div>
              <div className="ide-scrollbar relative overflow-x-auto bg-[var(--bg-base)] p-4 text-[11px] font-mono leading-relaxed text-[var(--info)] selection:bg-[var(--accent-muted)] sm:p-6 sm:text-[12.5px]">
                <span className="pointer-events-none absolute right-3 top-3 text-[18px] font-bold uppercase tracking-[0.3em] text-[var(--text-primary)] opacity-[0.03] sm:right-4 sm:top-4 sm:text-[28px]">
                  READONLY
                </span>
                {model.split("\n").map((line, lineIndex) => (
                  <motion.div
                    key={`${project.id}-model-${index}-line-${lineIndex}`}
                    custom={lineIndex}
                    variants={schemaLineVariants}
                    initial={shouldReduceMotion ? false : "hidden"}
                    whileInView="show"
                    viewport={{ once: true, margin: "-40px" }}
                    className="whitespace-pre"
                  >
                    {line.split("").map((char, charIndex) => (
                      <motion.span
                        key={`${project.id}-model-${index}-char-${lineIndex}-${charIndex}`}
                        variants={characterVariants}
                        transition={{ duration: 0.12, delay: charIndex * 0.002 }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
