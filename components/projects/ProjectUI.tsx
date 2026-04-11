"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  FaDesktop, FaMobile, FaServer, FaDatabase, FaMicrochip,
  FaBolt, FaChartLine, FaLayerGroup, FaEye, FaWifi, FaUser,
  FaTerminal, FaPlay, FaCheck, FaPowerOff, FaBox, FaGear, FaShareNodes,
  FaRegCircleQuestion
} from "react-icons/fa6";
import { VscSync } from "react-icons/vsc";
import type { ProjectShape, TechGroupItem } from "./ProjectData";

const hexagonClipPath =
  "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

export function SectionLabel({ label }: { label: string }) {
  return (
    <div
      className="flex items-center gap-3 mb-4 pb-2 border-b"
      style={{ borderColor: "var(--border-default)" }}
    >
      <span
        className="type-sys-micro gradient-text"
        style={{ color: "var(--accent)" }}
      >
        {label}
      </span>
      <div
        className="h-px flex-1 opacity-20"
        style={{ background: "var(--border-default)" }}
      />
      <span
        className="led-dot h-1.5 w-1.5 rounded-full flex-shrink-0"
        style={{ background: "var(--accent)" }}
      />
    </div>
  );
}

export function CategoryBar({
  label,
  count,
  maxCount,
  color,
}: {
  label: string;
  count: number;
  maxCount: number;
  color: string;
}) {
  const width = maxCount > 0 ? Math.max((count / maxCount) * 100, 8) : 0;

  return (
    <div className="grid grid-cols-[84px_minmax(0,1fr)_auto] items-center gap-3">
      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
        {label}
      </span>
      <div className="h-1 rounded-full bg-[var(--bg-muted)]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${width}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="rounded-full border border-[var(--border-default)] px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.08em] text-[var(--text-muted)]">
        {count}
      </span>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="flex h-full items-center justify-center bg-[var(--bg-base)] p-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[620px] overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-[var(--shadow-card)]"
      >
        <div className="border-b border-[var(--border-default)] bg-[var(--bg-muted)] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
          sync status
        </div>
        <div className="space-y-4 p-6">
          <div className="flex items-center gap-2 text-[12px] text-[var(--text-secondary)]">
            <VscSync className="animate-spin text-[var(--accent)]" size={14} />
            fetching project registry...
          </div>
          <div className="space-y-3">
            <div className="h-3 w-[34%] animate-pulse rounded-full bg-[var(--border-default)]" />
            <div className="h-3 w-[82%] animate-pulse rounded-full bg-[var(--border-default)]" />
            <div className="h-3 w-[76%] animate-pulse rounded-full bg-[var(--border-default)]" />
            <div className="h-3 w-[54%] animate-pulse rounded-full bg-[var(--border-default)]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectRowSkeleton({ index }: { index: number }) {
  return (
    <div
      className={`grid grid-cols-[38px_minmax(0,1fr)_auto] items-center gap-3 border-b border-[var(--border-default)] px-3 py-3 ${
        index === 0 ? "border-t border-[var(--border-default)]" : ""
      }`}
    >
      <div className="h-[38px] w-[38px] animate-pulse rounded-md bg-[var(--bg-muted)]" />
      <div className="min-w-0 space-y-2">
        <div className="h-2.5 w-[62%] animate-pulse rounded-full bg-[var(--bg-muted)]" />
        <div className="h-2 w-[48%] animate-pulse rounded-full bg-[var(--border-default)]" />
        <div className="h-2 w-[88%] animate-pulse rounded-full bg-[var(--border-default)]" />
      </div>
      <div className="h-4 w-12 animate-pulse rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)]" />
    </div>
  );
}

export function TechPill({ item }: { item: TechGroupItem }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="group flex items-center gap-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-muted)] px-2.5 py-1.5 text-[11px] text-[var(--text-primary)] transition-all hover:border-[var(--accent-muted)] hover:bg-[var(--bg-elevated)]"
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.c }} />
      <span className="font-semibold">{item.n}</span>
      <span className="text-[10px] text-[var(--text-muted)] font-mono">{item.v}</span>
    </motion.div>
  );
}

export function StatCell({
  label,
  value,
  icon,
  className = "",
}: {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div 
      whileHover={{ backgroundColor: "var(--bg-muted)" }}
      className={`group flex min-w-0 flex-1 flex-col gap-1.5 bg-[var(--bg-elevated)]/95 px-4 py-4 transition-colors sm:px-5 ${className}`}
    >
      <div className="flex items-center gap-2">
        {icon && <div className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">{icon}</div>}
        <motion.span 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[13px] font-bold tracking-tight text-[var(--text-primary)] sm:text-[14px]"
        >
          {value}
        </motion.span>
      </div>
      <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
        {label}
      </span>
    </motion.div>
  );
}

export function VisualBadge({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ y: -2, scale: 1.01 }}
      className="glow-card group flex items-center gap-3 border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3 rounded-sm text-[11px] font-bold text-[var(--text-primary)] transition-all"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-[var(--bg-muted)] text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
        {icon}
      </div>
      <span className="truncate">{label}</span>
    </motion.div>
  );
}

export function IconMapper({ name, size = 20 }: { name: string; size?: number }) {
  const n = name.toLowerCase();
  if (n === "monitor") return <FaDesktop size={size} />;
  if (n === "smartphone") return <FaMobile size={size} />;
  if (n === "server") return <FaServer size={size} />;
  if (n === "database") return <FaDatabase size={size} />;
  if (n === "cpu") return <FaMicrochip size={size} />;
  if (n === "zap") return <FaBolt size={size} />;
  if (n === "activity") return <FaChartLine size={size} />;
  if (n === "layers") return <FaLayerGroup size={size} />;
  if (n === "eye") return <FaEye size={size} />;
  if (n === "wifi") return <FaWifi size={size} />;
  if (n === "user") return <FaUser size={size} />;
  if (n === "terminal") return <FaTerminal size={size} />;
  if (n === "play") return <FaPlay size={size} />;
  if (n === "check") return <FaCheck size={size} />;
  if (n === "power") return <FaPowerOff size={size} />;
  if (n === "box") return <FaBox size={size} />;
  if (n === "settings") return <FaGear size={size} />;
  if (n === "share") return <FaShareNodes size={size} />;
  return <FaRegCircleQuestion size={size} />;
}

export function FlowNode({
  label,
  icon,
  isLast,
  protocol,
  vertical = false,
}: {
  label: string;
  icon: string;
  isLast?: boolean;
  protocol?: string;
  vertical?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="group flex shrink-0 items-center gap-2 sm:gap-3">
      <div className="flex flex-col items-center gap-2">
        <motion.div
          whileHover={shouldReduceMotion ? undefined : { scale: 1.15, rotate: 3 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative flex h-11 w-11 items-center justify-center transition-shadow duration-300 sm:h-12 sm:w-12"
        >
          <div
            className="absolute inset-0 border border-[var(--accent-muted)] bg-[linear-gradient(135deg,var(--bg-elevated),var(--bg-overlay))]"
            style={{ clipPath: hexagonClipPath }}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full text-[var(--accent-muted)] opacity-70"
          >
            <polygon
              points="25,0 75,0 100,50 75,100 25,100 0,50"
              fill="currentColor"
              fillOpacity="0.08"
              stroke="currentColor"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div
            className="absolute inset-[5px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              clipPath: hexagonClipPath,
              background:
                "radial-gradient(circle at center, var(--accent-muted), transparent 70%)",
            }}
          />
          <span className="relative z-10 text-[var(--accent)]">
            <IconMapper name={icon} size={18} />
          </span>
        </motion.div>
        <motion.span
          initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-[72px] text-center text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--accent)]"
        >
          {label}
        </motion.span>
      </div>
      {!isLast &&
        (vertical ? (
          <div className="mb-1 flex h-10 flex-col items-center justify-start gap-1 opacity-50">
            {protocol ? (
              <motion.span
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="typewriter-text inline-block max-w-[120px] text-center text-[7px] font-bold uppercase tracking-widest text-[var(--text-muted)]"
              >
                {protocol}
              </motion.span>
            ) : null}
            <div className="relative flex h-7 items-center">
              <div className="h-full w-px border-l border-dashed border-[var(--accent-muted)]" />
              {!shouldReduceMotion ? (
                <motion.span
                  className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--accent)]"
                  animate={{ y: [0, 14, 22], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />
              ) : null}
            </div>
          </div>
        ) : (
          <div className="mb-4 flex flex-col items-center gap-1 opacity-50">
            {protocol ? (
              <motion.span
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="typewriter-text inline-block max-w-[56px] text-center text-[7px] font-bold uppercase tracking-widest text-[var(--text-muted)] sm:max-w-[72px]"
              >
                {protocol}
              </motion.span>
            ) : null}
            <div className="relative flex w-4 items-center sm:w-6 lg:w-8">
              <div className="h-px w-full border-t border-dashed border-[var(--accent-muted)]" />
              {!shouldReduceMotion ? (
                <motion.span
                  className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--accent)]"
                  animate={{ x: [0, 12, 20], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />
              ) : null}
            </div>
          </div>
        ))}
    </div>
  );
}

export function FlowDiagram({ project }: { project: ProjectShape }) {
  const [isMobileFlow, setIsMobileFlow] = useState(false);
  const flow = project.visualFlow ?? [
    { label: "Input", icon: "box" },
    { label: "Process", icon: "settings" },
    { label: "Output", icon: "share" }
  ];

  const highLevel = project.highLevel ?? "";
  const protocols = highLevel.includes("->")
    ? highLevel.split("->").map((p: string) => p.trim())
    : [];

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsMobileFlow(window.innerWidth < 900);
    const handler = () => setIsMobileFlow(window.innerWidth < 900);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div className="mt-3 rounded-sm border border-[var(--border-default)] bg-[linear-gradient(180deg,var(--bg-base),var(--bg-elevated))] px-3 py-6 shadow-[var(--shadow-ambient)] sm:px-4 sm:py-8">
      <div
        className={`mx-auto flex ${isMobileFlow ? "w-full flex-col items-center gap-0" : "w-full flex-wrap items-start justify-center gap-3 sm:gap-4"}`}
      >
        {flow.map((node, index) => (
          <FlowNode
            key={`${project.id}-flow-${index}`}
            label={node.label}
            icon={node.icon}
            isLast={index === flow.length - 1}
            protocol={protocols[index + 1]?.split(" ")[0]}
            vertical={isMobileFlow}
          />
        ))}
      </div>
    </div>
  );
}

const TECH_STACK_MAP: Record<string, string> = {
  "next.js": "nextjs/nextjs-original",
  "nextjs": "nextjs/nextjs-original",
  "react": "react/react-original",
  "typescript": "typescript/typescript-original",
  "javascript": "javascript/javascript-original",
  "python": "python/python-original",
  "supabase": "supabase/supabase-original",
  "tailwindcss": "tailwindcss/tailwindcss-original",
  "tailwind": "tailwindcss/tailwindcss-original",
  "mongodb": "mongodb/mongodb-original",
  "postgresql": "postgresql/postgresql-original",
  "postgres": "postgresql/postgresql-original",
  "firebase": "firebase/firebase-plain",
  "docker": "docker/docker-original",
  "zustand": "redux/redux-original",
  "framer motion": "framer/framer-original",
  "framer-motion": "framer/framer-original",
  "prisma": "prisma/prisma-original",
  "openai": "apache/apache-original",
  "flutter": "flutter/flutter-original",
  "fastapi": "fastapi/fastapi-original",
  "nodejs": "nodejs/nodejs-original",
  "node.js": "nodejs/nodejs-original",
  "express": "express/express-original",
  "django": "django/django-plain",
  "flask": "flask/flask-original",
  "sqlite": "sqlite/sqlite-original",
  "redis": "redis/redis-original",
  "mysql": "mysql/mysql-original",
  "aws": "amazonwebservices/amazonwebservices-original-wordmark",
  "git": "git/git-original",
  "github": "github/github-original",
  "vercel": "vercel/vercel-original",
  "netlify": "netlify/netlify-original",
  "capacitor": "capacitor/capacitor-original",
  "arduino": "arduino/arduino-original",
  "google cloud": "googlecloud/googlecloud-original",
  "azure": "azure/azure-original",
  "kubernetes": "kubernetes/kubernetes-plain",
  "linux": "linux/linux-original",
  "java": "java/java-original",
  "c++": "cplusplus/cplusplus-original",
  "c": "c/c-original",
  "go": "go/go-original",
  "rust": "rust/rust-plain",
  "php": "php/php-original",
  "swift": "swift/swift-original",
  "kotlin": "kotlin/kotlin-original",
  "dart": "dart/dart-original",
  "three.js": "threejs/threejs-original",
  "socket.io": "socketio/socketio-original",
  "graphql": "graphql/graphql-plain",
  "apollo": "graphql/graphql-plain",
};

export function TechIcon({ name, size = 20 }: { name: string; size?: number }) {
  let slugStr = TECH_STACK_MAP[name.toLowerCase()];
  if (!slugStr) slugStr = `${name.toLowerCase()}/${name.toLowerCase()}-original`;
  const url = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slugStr}.svg`;

  return (
    <img
      src={url}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      style={{ width: size, height: size, objectFit: "contain" }}
      onError={(e) => {
        e.currentTarget.outerHTML = `<div style="width: ${size}px; height: ${size}px;" class="flex items-center justify-center rounded-sm bg-[var(--bg-muted)] text-[9px] font-bold text-[var(--text-muted)]">${name.slice(0, 1).toUpperCase()}</div>`;
      }}
    />
  );
}

export function TechBadge({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const shouldReduceMotion = useReducedMotion();
  const compact = size === "sm";

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: compact ? -2 : -6, scale: 1.08 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
      className={`group relative flex items-center justify-center ${compact ? "h-9 w-9" : "h-11 w-11 sm:h-12 sm:w-12"}`}
    >
      <div
        className="absolute inset-[-4px] rounded-full border border-[var(--accent-muted)] opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
        style={{
          animation: shouldReduceMotion ? undefined : "spin-slow 4s linear infinite",
        }}
      />
      <div
        className={`flex items-center justify-center rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-[var(--shadow-ambient)] transition-all duration-300 group-hover:border-[var(--accent)] ${compact ? "h-8 w-8" : "h-9 w-9 sm:h-10 sm:w-10"}`}
      >
        <TechIcon name={name} size={compact ? 16 : 22} />
      </div>
      <div
        className={`pointer-events-none absolute left-1/2 z-50 hidden -translate-x-1/2 whitespace-nowrap sm:block ${compact ? "-top-9" : "-top-10"}`}
      >
        <div className="relative rounded-sm border border-[var(--accent-muted)] bg-[var(--bg-overlay)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--accent)] opacity-0 transition-all duration-200 group-hover:opacity-100">
          <span className="absolute left-0 top-0 h-1 w-1 border-l border-t border-[var(--accent)]" />
          <span className="absolute right-0 top-0 h-1 w-1 border-r border-t border-[var(--accent)]" />
          <span className="absolute bottom-0 left-0 h-1 w-1 border-b border-l border-[var(--accent)]" />
          <span className="absolute bottom-0 right-0 h-1 w-1 border-b border-r border-[var(--accent)]" />
          {name}
        </div>
      </div>
    </motion.div>
  );
}

export function SidebarKeyValue({
  label,
  value,
  delay = 0,
}: {
  label: string;
  value: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const isYearValue = /^\d{4}$/.test(value.trim());
  const [displayedValue, setDisplayedValue] = useState(
    isYearValue && !shouldReduceMotion ? "0" : value,
  );

  useEffect(() => {
    if (!isYearValue || shouldReduceMotion) {
      setDisplayedValue(value);
      return;
    }

    const target = Number.parseInt(value, 10);
    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 24));
      intervalId = window.setInterval(() => {
        current = Math.min(target, current + increment);
        setDisplayedValue(String(current));

        if (current >= target) {
          if (intervalId) {
            window.clearInterval(intervalId);
          }
        }
      }, 28);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [delay, isYearValue, shouldReduceMotion, value]);

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay / 1000, duration: 0.35 }}
      className="flex items-start justify-between gap-3 border-b border-[var(--border-default)] py-2 last:border-b-0 sm:items-center"
    >
      <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">{label}</span>
      {isYearValue ? (
        <span
          className="min-w-0 max-w-[58%] text-right text-[11px] font-semibold text-[var(--text-secondary)] [animation:counter-up_0.35s_ease-out_both] sm:max-w-[70%]"
          style={{ animationDelay: `${delay}ms` }}
        >
          {displayedValue}
        </span>
      ) : (
        <span
          className="typewriter-text inline-block max-w-[58%] truncate text-right text-[11px] font-semibold text-[var(--text-secondary)] sm:max-w-[70%]"
          style={{ animationDelay: `${delay}ms, ${delay}ms` }}
        >
          {value}
        </span>
      )}
    </motion.div>
  );
}
