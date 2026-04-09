"use client";

import { motion } from "framer-motion";
import { 
  FaDesktop, FaMobile, FaServer, FaDatabase, FaMicrochip,
  FaBolt, FaChartLine, FaLayerGroup, FaEye, FaWifi, FaUser,
  FaTerminal, FaPlay, FaCheck, FaPowerOff, FaBox, FaGear, FaShareNodes,
  FaChevronRight, FaRegQuestionCircle
} from "react-icons/fa6";
import { VscSync } from "react-icons/vsc";
import { TechGroupItem } from "./ProjectData";

export const LABEL_CLASS =
  "border-b border-[var(--border-default)] pb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]";

export function SectionLabel({ label }: { label: string }) {
  return (
    <div className={`${LABEL_CLASS} mb-3 flex items-center gap-2`}>
      <span className="gradient-text">{label}</span>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="flex h-full items-center justify-center bg-[var(--bg-base)] p-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[620px] overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-md"
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

export function StatCell({ label, value, icon }: { label: string; value: number | string; icon?: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ backgroundColor: "var(--bg-muted)" }}
      className="group flex min-w-0 flex-1 flex-col gap-1.5 border-r border-[var(--border-default)] px-4 py-4 transition-colors last:border-r-0"
    >
      <div className="flex items-center gap-2">
        {icon && <div className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">{icon}</div>}
        <motion.span 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[14px] font-bold tracking-tight text-[var(--text-primary)]"
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
  return <FaRegQuestionCircle size={size} />;
}

export function FlowNode({ label, icon, isLast, protocol }: { label: string; icon: string; isLast?: boolean; protocol?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center gap-2">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--accent)] shadow-sm transition-all hover:border-[var(--accent-muted)] hover:bg-[var(--bg-muted)]"
        >
          <IconMapper name={icon} />
        </motion.div>
        <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">{label}</span>
      </div>
      {!isLast && (
        <div className="mb-4 flex flex-col items-center gap-1 opacity-40">
          {protocol && <span className="text-[7px] font-medium uppercase tracking-widest text-[var(--accent)]">{protocol}</span>}
          <div className="flex items-center gap-1">
            <div className="h-[1px] w-8 bg-gradient-to-r from-[var(--accent)] to-[var(--border-default)]" />
            <FaChevronRight className="text-[var(--accent)] -ml-1 text-[8px]" />
          </div>
        </div>
      )}
    </div>
  );
}

export function FlowDiagram({ project }: { project: any }) {
  const flow = project.visualFlow || [
    { label: "Input", icon: "box" },
    { label: "Process", icon: "settings" },
    { label: "Output", icon: "share" }
  ];

  const highLevel = project.highLevel || "";
  const protocols = highLevel.includes("->")
    ? highLevel.split("->").map((p: string) => p.trim())
    : [];

  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-4 rounded-sm border border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-8 shadow-inner">
      {flow.map((node: any, index: number) => (
        <FlowNode
          key={`${project.id}-flow-${index}`}
          label={node.label}
          icon={node.icon}
          isLast={index === flow.length - 1}
          protocol={protocols[index + 1]?.split(" ")[0]}
        />
      ))}
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
      style={{ width: size, height: size, objectFit: "contain" }}
      onError={(e) => {
        e.currentTarget.outerHTML = `<div style="width: ${size}px; height: ${size}px;" class="flex items-center justify-center rounded-sm bg-[var(--bg-muted)] text-[9px] font-bold text-[var(--text-muted)]">${name.slice(0, 1).toUpperCase()}</div>`;
      }}
    />
  );
}

export function TechBadge({ name }: { name: string }) {
  return (
    <motion.div 
      whileHover={{ y: -3, scale: 1.05 }}
      className="group relative flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] backdrop-blur-sm transition-all hover:border-[var(--accent-muted)] hover:bg-[var(--bg-muted)] hover:shadow-lg"
    >
      <TechIcon name={name} size={22} />
      <div className="absolute -top-8 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-sm border border-[var(--border-default)] bg-[var(--bg-overlay)] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[var(--text-primary)] opacity-0 transition-opacity pointer-events-none group-hover:opacity-100">
        {name}
      </div>
    </motion.div>
  );
}

export function SidebarKeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[var(--border-default)] py-2 last:border-b-0">
      <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">{label}</span>
      <span className="text-right text-[11px] font-semibold text-[var(--text-secondary)]">{value}</span>
    </div>
  );
}
