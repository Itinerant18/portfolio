"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import type { ProjectDetail, ProjectShape } from "./ProjectData";
import { SectionLabel, FlowDiagram } from "./ProjectUI";

function parseTechCategories(techStack: string[] = []) {
  const categories = new Map<string, string[]>();
  techStack.forEach((t) => {
    const low = t.toLowerCase();
    let cat = "Tools";
    if (["react", "next", "vue", "html", "css", "tailwind", "framer", "ui", "dom"].some((x) => low.includes(x))) cat = "Frontend";
    else if (["node", "express", "python", "go", "java", "django", "fastapi", "spring"].some((x) => low.includes(x))) cat = "Backend";
    else if (["tensorflow", "pytorch", "ai", "ml", "pandas", "scikit", "opencv"].some((x) => low.includes(x))) cat = "AI";
    else if (["arduino", "raspberry", "iot", "mqtt", "esp32"].some((x) => low.includes(x))) cat = "IoT";
    else if (["aws", "gcp", "vps", "docker", "kubernetes", "cloud", "firebase", "supabase", "azure"].some((x) => low.includes(x))) cat = "Cloud";
    else if (["sql", "mongo", "postgres", "redis", "db"].some((x) => low.includes(x))) cat = "Database";

    if (!categories.has(cat)) categories.set(cat, []);
    categories.get(cat)!.push(t);
  });
  return Array.from(categories.entries());
}

function DependencyGraph({ project }: { project: ProjectShape }) {
  const shouldReduceMotion = useReducedMotion();
  const cats = parseTechCategories(project.techStack);
  if (!cats.length) return null;

  const cx = 200;
  const cy = 200;
  const radius = 120;

  return (
    <div className="flex justify-center items-center py-8 w-full overflow-hidden">
      <svg viewBox="0 0 400 400" className="w-full max-w-[400px] h-auto overflow-visible">
        {/* Draw edges */}
        {cats.map((_, i) => {
          const angle = (i / cats.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          return (
            <motion.line
              key={`line-${i}`}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="var(--border-default)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
            />
          );
        })}
        {/* Orbiting nodes */}
        {cats.map(([cat, items], i) => {
          const angle = (i / cats.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          return (
            <motion.g
              key={`node-${i}`}
              initial={shouldReduceMotion ? { scale: 1, x, y } : { scale: 0, x: cx, y: cy }}
              whileInView={{ scale: 1, x, y }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.4 + i * 0.1, stiffness: 200, damping: 15 }}
            >
              <circle cx={0} cy={0} r={36} fill="var(--bg-muted)" stroke="var(--border-default)" strokeWidth="1.5" />
              <text x={0} y={-4} textAnchor="middle" fontSize="10" fill="var(--text-primary)" fontWeight="bold">
                {cat}
              </text>
              <text x={0} y={12} textAnchor="middle" fontSize="8" fill="var(--text-disabled)" className="uppercase tracking-wider">
                {items.length} deps
              </text>
            </motion.g>
          );
        })}
        {/* Center node */}
        <motion.g
          initial={shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <circle cx={cx} cy={cy} r={44} fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="2" />
          <text x={cx} y={cy + 1} textAnchor="middle" fontSize="11" fill="var(--accent)" fontWeight="bold" dominantBaseline="middle">
            {project.name.substring(0, 10)}
            {project.name.length > 10 ? "..." : ""}
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

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

        <div className="mt-8 sm:mt-12">
          <SectionLabel label="Dependency Graph" />
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-sm"
          >
            <DependencyGraph project={project} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
