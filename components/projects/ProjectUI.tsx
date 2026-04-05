"use client";

import React from "react";
import { 
  FaDesktop, FaMobileScreen, FaServer, FaDatabase, FaMicrochip,
  FaBolt, FaChartLine, FaLayerGroup, FaEye, FaWifi, FaUser,
  FaTerminal, FaPlay, FaCheck, FaPowerOff, FaBox, FaGear, FaShareNodes,
  FaChevronRight, FaRegCircleQuestion
} from "react-icons/fa6";
import { ProjectShape, TechGroupItem, TechGroup } from "./ProjectData";

export const LABEL_CLASS =
  "border-b border-[var(--border-default)] pb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]";

export function SectionLabel({ label }: { label: string }) {
  return <div className={`${LABEL_CLASS} mb-3`}>{label}</div>;
}

export function LoadingState() {
  return (
    <div className="flex h-full items-center justify-center bg-[var(--bg-base)] p-8 font-sans">
      <div className="w-full max-w-[620px] overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-md">
        <div className="border-b border-[var(--border-default)] bg-[var(--bg-muted)] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
          sync status
        </div>
        <div className="space-y-4 p-6">
          <div className="flex items-center gap-2 text-[12px] text-[var(--text-secondary)]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--success)]" />
            fetching project registry...
          </div>
          <div className="space-y-3">
            <div className="h-3 w-[34%] animate-pulse rounded-full bg-[var(--border-default)]" />
            <div className="h-3 w-[82%] animate-pulse rounded-full bg-[var(--border-default)]" />
            <div className="h-3 w-[76%] animate-pulse rounded-full bg-[var(--border-default)]" />
            <div className="h-3 w-[54%] animate-pulse rounded-full bg-[var(--border-default)]" />
          </div>
        </div>
      </div>
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
    <div className="group flex items-center gap-2 rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)] px-2.5 py-1.5 text-[11px] text-[var(--text-primary)] transition-all hover:border-[var(--border-hover)] hover:bg-[var(--bg-overlay)]">
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.c }} />
      <span className="font-semibold">{item.n}</span>
      <span className="text-[10px] text-[var(--text-muted)] font-mono">{item.v}</span>
    </div>
  );
}

export function StatCell({ label, value, icon }: { label: string; value: number | string; icon?: React.ReactNode }) {
  return (
    <div className="group flex min-w-0 flex-1 flex-col gap-1.5 border-r border-[var(--border-default)] px-4 py-4 transition-all hover:bg-[var(--bg-muted)] last:border-r-0">
      <div className="flex items-center gap-2">
        {icon && <div className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">{icon}</div>}
        <span className="text-[14px] font-semibold tracking-tight text-[var(--text-primary)]">{value}</span>
      </div>
      <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
        {label}
      </span>
    </div>
  );
}

export function VisualBadge({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="group flex items-center gap-3 border border-[var(--border-default)] bg-[var(--bg-muted)] px-4 py-3 rounded-lg text-[11px] font-bold text-[var(--text-primary)] transition-all hover:border-[var(--accent)]/40 hover:bg-[var(--bg-overlay)] shadow-sm">
      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--bg-elevated)] text-[var(--text-muted)] group-hover:text-[var(--accent)]">
        {icon}
      </div>
      <span className="truncate">{label}</span>
    </div>
  );
}

export function IconMapper({ name, size = 20 }: { name: string; size?: number }) {
  const n = name.toLowerCase();
  if (n === "monitor") return <FaDesktop size={size} />;
  if (n === "smartphone") return <FaMobileScreen size={size} />;
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

export function FlowNode({ label, icon, isLast, protocol }: { label: string; icon: string; isLast?: boolean; protocol?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--accent)] shadow-sm transition-all hover:border-[var(--accent)]/50 hover:bg-[var(--bg-muted)]">
          <IconMapper name={icon} />
        </div>
        <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">{label}</span>
      </div>
      {!isLast && (
        <div className="mb-4 flex flex-col items-center gap-1 opacity-40">
          {protocol && <span className="text-[7px] font-black uppercase tracking-widest text-[var(--accent)]">{protocol}</span>}
          <div className="flex items-center gap-1">
            <div className="h-[1px] w-8 bg-gradient-to-r from-[var(--accent)] to-[var(--border-default)]" />
            <FaChevronRight className="text-[var(--accent)] -ml-1 text-[8px]" />
          </div>
        </div>
      )}
    </div>
  );
}

export function FlowDiagram({ project }: { project: ProjectShape }) {
  const flow = project.visualFlow || [
    { label: "Input", icon: "box" },
    { label: "Process", icon: "settings" },
    { label: "Output", icon: "share" }
  ];

  const protocols = project.highLevel?.includes("->")
    ? project.highLevel.split("->").map(p => p.trim())
    : [];

  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-4 border border-[var(--border-default)] bg-[var(--bg-base)] py-8 px-4 rounded-xl shadow-inner">
      {flow.map((node, index) => (
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
        (e.target as any).outerHTML = `<div style="width: ${size}px; height: ${size}px;" class="flex items-center justify-center rounded-sm bg-[var(--bg-muted)] text-[9px] font-bold text-[var(--text-muted)]">${name.slice(0, 1).toUpperCase()}</div>`;
      }}
    />
  );
}

export function TechBadge({ name }: { name: string }) {
  return (
    <div className="group relative flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] backdrop-blur-sm transition-all hover:border-[var(--accent)]/50 hover:bg-[var(--bg-muted)] hover:shadow-[0_0_15px_var(--accent-subtle)]">
      <TechIcon name={name} size={22} />
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none z-50 whitespace-nowrap rounded border border-[var(--border-default)] bg-[var(--bg-overlay)] px-2 py-1 text-[9px] font-black uppercase tracking-wider text-[var(--text-primary)] opacity-0 transition-opacity group-hover:opacity-100">
        {name}
      </div>
    </div>
  );
}

export function SidebarKeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[var(--border-default)] py-2 last:border-b-0">
      <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">{label}</span>
      <span className="text-right text-[11px] font-medium text-[var(--text-secondary)]">{value}</span>
    </div>
  );
}
