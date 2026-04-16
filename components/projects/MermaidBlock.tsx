"use client";

import { useEffect, useId, useState } from "react";

type MermaidModule = {
  initialize: (config: { startOnLoad?: boolean; securityLevel?: "strict" | "loose" }) => void;
  render: (id: string, text: string) => Promise<{ svg: string }>;
};

export function MermaidBlock({ chart, title }: { chart: string; title?: string }) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1.2);
  const [fullscreen, setFullscreen] = useState(false);
  const id = useId().replace(/:/g, "-");

  useEffect(() => {
    let cancelled = false;

    async function renderChart() {
      try {
        const mod = (await import("mermaid")) as unknown as { default: MermaidModule };
        const mermaid = mod.default;
        mermaid.initialize({ startOnLoad: false, securityLevel: "loose" });
        const result = await mermaid.render(`mermaid-${id}`, chart);
        if (!cancelled) {
          setSvg(result.svg);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to render Mermaid diagram. Showing source instead.");
        }
      }
    }

    void renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  const DiagramPanel = ({ panelClassName = "" }: { panelClassName?: string }) => (
    <div className={`rounded-md border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 sm:p-5 ${panelClassName}`}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h4 className="type-sys-micro text-[var(--text-muted)]">{title ?? "Architecture Diagram"}</h4>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setZoom((prev) => Math.max(0.8, Number((prev - 0.1).toFixed(2))))}
            className="rounded border border-[var(--border-default)] px-2 py-1 text-[11px] text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => setZoom(1.2)}
            className="rounded border border-[var(--border-default)] px-2 py-1 text-[11px] text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]"
            aria-label="Reset zoom"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            type="button"
            onClick={() => setZoom((prev) => Math.min(2.2, Number((prev + 0.1).toFixed(2))))}
            className="rounded border border-[var(--border-default)] px-2 py-1 text-[11px] text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => setFullscreen((prev) => !prev)}
            className="rounded border border-[var(--border-default)] px-2 py-1 text-[11px] text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]"
          >
            {fullscreen ? "Exit Full" : "Full Screen"}
          </button>
        </div>
      </div>

      {svg ? (
        <div className="overflow-auto rounded-sm border border-[var(--border-default)] bg-[var(--bg-base)] p-3">
          <div style={{ transform: `scale(${zoom})`, transformOrigin: "top left", width: `${100 / zoom}%` }}>
            <div className="min-w-[1200px] [&_svg]:h-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
          </div>
        </div>
      ) : (
        <pre className="overflow-auto rounded-sm border border-[var(--border-default)] bg-[var(--bg-base)] p-3 text-[11px] leading-relaxed text-[var(--text-secondary)]">
          {chart}
        </pre>
      )}
      {error ? <p className="mt-3 text-[11px] text-[var(--error)]">{error}</p> : null}
    </div>
  );

  return (
    <>
      <DiagramPanel />
      {fullscreen ? (
        <div className="fixed inset-0 z-[70] bg-black/70 p-4 backdrop-blur-sm sm:p-8">
          <div className="mx-auto h-full w-full max-w-[1600px] overflow-hidden">
            <DiagramPanel panelClassName="h-full" />
          </div>
        </div>
      ) : null}
    </>
  );
}
