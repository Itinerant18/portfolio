export function calcHealth(project: { updatedAt?: string; techStack?: string[]; topics?: string[] }): { score: number; label: string; color: string } {
  const days = project.updatedAt ? (Date.now() - new Date(project.updatedAt).getTime()) / 86400000 : 365;
  const recency = Math.max(0, 100 - days * 0.3);
  const richness = Math.min(100, ((project.techStack?.length ?? 0) * 8 + (project.topics?.length ?? 0) * 5));
  const score = Math.round(recency * 0.6 + richness * 0.4);
  const label = score > 75 ? "Active" : score > 45 ? "Stable" : "Legacy";
  const color = score > 75 ? "var(--success)" : score > 45 ? "var(--warning)" : "var(--text-muted)";
  return { score, label, color };
}
