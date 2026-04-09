"use client";

import { useIDEStore, ThemeMode } from "@/store/useIDEStore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  VscClose,
  VscCheck,
  VscColorMode,
  VscTerminal,
  VscSearch,
  VscSettingsGear,
  VscCode,
  VscSymbolMethod,
} from "react-icons/vsc";

const THEMES: { color: string; id: ThemeMode; label: string; tones: [string, string, string] }[] = [
  { id: "aniket-dark", label: "Aniket Dark", color: "#A05EF8", tones: ["#0b0b0b", "#1c1c1c", "#A05EF8"] },
  { id: "light", label: "Light", color: "#A05EF8", tones: ["#ffffff", "#f3f3f3", "#A05EF8"] },
  { id: "rose-pine", label: "Rosé Pine", color: "#ebbcba", tones: ["#191724", "#26233a", "#ebbcba"] },
  { id: "tokyo-night", label: "Tokyo Night", color: "#7aa2f7", tones: ["#1a1b26", "#24283b", "#7aa2f7"] },
  { id: "catppuccin", label: "Catppuccin", color: "#cba6f7", tones: ["#1e1e2e", "#313244", "#cba6f7"] },
  { id: "nord", label: "Nord", color: "#88c0d0", tones: ["#2e3440", "#4c566a", "#88c0d0"] },
  { id: "gruvbox", label: "Gruvbox", color: "#fabd2f", tones: ["#282828", "#3c3836", "#fabd2f"] },
];

export default function SettingsOverlay() {
  const settingsOpen = useIDEStore((state) => state.settingsOpen);
  const closeSettings = useIDEStore((state) => state.closeSettings);
  const theme = useIDEStore((state) => state.theme);
  const setTheme = useIDEStore((state) => state.setTheme);
  const toggleTerminal = useIDEStore((state) => state.toggleTerminal);
  const openCommandPalette = useIDEStore((state) => state.openCommandPalette);
  const [hoveredTheme, setHoveredTheme] = useState<ThemeMode | null>(null);
  const [flashActive, setFlashActive] = useState(false);
  const [flashKey, setFlashKey] = useState(0);
  const timerRef = useRef<number[]>([]);

  const clearThemeTimers = () => {
    for (const timerId of timerRef.current) {
      window.clearTimeout(timerId);
    }
    timerRef.current = [];
  };

  useEffect(() => () => clearThemeTimers(), []);

  useEffect(() => {
    if (!settingsOpen) {
      setHoveredTheme(null);
    }
  }, [settingsOpen]);

  const shortcuts = [
    { label: "Command Palette", keys: "Ctrl+K" },
    { label: "File Search", keys: "Ctrl+P" },
    { label: "Toggle Theme", keys: "Ctrl+Shift+T" },
    { label: "Toggle Terminal", keys: "Ctrl+`" },
    { label: "Toggle AI Panel", keys: "Ctrl+Shift+A" },
    { label: "Toggle Sidebar", keys: "Ctrl+B" },
    { label: "Zoom In/Out", keys: "Ctrl +/-" },
  ];
  const previewTheme =
    THEMES.find((entry) => entry.id === (hoveredTheme ?? theme)) ?? THEMES[0];

  const handleThemeSelect = (nextTheme: ThemeMode) => {
    if (nextTheme === theme) {
      return;
    }

    clearThemeTimers();
    setFlashActive(true);
    setFlashKey((current) => current + 1);
    timerRef.current.push(window.setTimeout(() => setTheme(nextTheme), 150));
    timerRef.current.push(window.setTimeout(() => setFlashActive(false), 300));
  };

  return (
    <AnimatePresence>
      {settingsOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSettings}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[1px]"
          />

          <AnimatePresence>
            {flashActive ? (
              <motion.div
                key={flashKey}
                className="pointer-events-none fixed inset-0 z-[102] bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.15, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            ) : null}
          </AnimatePresence>

          {/* Settings Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[101] w-full max-w-[320px] border-l border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-2xl md:max-w-[380px]"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--border-default)] px-4 py-3">
                <div className="flex items-center gap-2">
                  <VscSettingsGear className="text-[var(--text-muted)]" size={16} />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    Settings
                  </span>
                </div>
                <button
                  onClick={closeSettings}
                  className="rounded-sm p-1 text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
                >
                  <VscClose size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="ide-scrollbar flex-1 overflow-y-auto px-4 py-6">
                {/* Color Theme */}
                <section className="mb-8">
                  <h3 className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    <VscColorMode size={14} />
                    Color Theme
                  </h3>
                  <div className="mb-4 rounded-sm border border-[var(--border-default)] bg-[var(--bg-surface)] p-3">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      <span>Accent Preview</span>
                      <span className="text-[var(--text-primary)]">{previewTheme.label}</span>
                    </div>
                    <motion.div
                      animate={{
                        backgroundColor: previewTheme.color,
                        boxShadow: `0 0 16px ${previewTheme.color}66`,
                      }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 h-2 rounded-full"
                    />
                  </div>
                  <div className="grid gap-2">
                    {THEMES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleThemeSelect(t.id)}
                        onMouseEnter={() => setHoveredTheme(t.id)}
                        onMouseLeave={() => setHoveredTheme(null)}
                        className={`group flex items-center justify-between rounded-sm border px-3 py-2.5 text-[13px] transition-all ${
                          theme === t.id
                            ? "border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--text-primary)]"
                            : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--accent-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`relative flex h-10 w-16 overflow-hidden rounded-sm border ${
                              theme === t.id ? "neon-border" : "border-black/10"
                            }`}
                          >
                            {t.tones.map((tone, index) => (
                              <span
                                key={`${t.id}-${index}`}
                                className="flex-1"
                                style={{ backgroundColor: tone }}
                              />
                            ))}
                            <span className="absolute inset-0 bg-[linear-gradient(135deg,transparent,rgba(255,255,255,0.14))]" />
                          </div>
                          <div className="flex flex-col items-start">
                            <span>{t.label}</span>
                            <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                              {t.id}
                            </span>
                          </div>
                        </div>
                        {theme === t.id && (
                          <VscCheck className="text-[var(--accent)]" size={16} />
                        )}
                        {theme !== t.id && (
                          <span
                            className="h-2.5 w-2.5 rounded-full transition-all duration-200"
                            style={{
                              backgroundColor: t.color,
                              boxShadow:
                                hoveredTheme === t.id
                                  ? `0 0 10px ${t.color}`
                                  : "none",
                            }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Quick Actions */}
                <section className="mb-8">
                  <h3 className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    <VscSymbolMethod size={14} />
                    Quick Actions
                  </h3>
                  <div className="grid gap-2">
                    <button
                      onClick={() => {
                        toggleTerminal();
                        closeSettings();
                      }}
                      className="flex items-center gap-3 rounded-sm border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3 text-[13px] text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                    >
                      <VscTerminal size={18} className="text-[var(--accent)]" />
                      <div className="flex flex-1 flex-col items-start leading-none">
                        <span className="font-medium">Toggle Terminal</span>
                        <span className="mt-1 text-[11px] text-[var(--text-muted)]">Open/close IDE console</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        openCommandPalette("commands");
                        closeSettings();
                      }}
                      className="flex items-center gap-3 rounded-sm border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3 text-[13px] text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                    >
                      <VscCode size={18} className="text-[var(--info)]" />
                      <div className="flex flex-1 flex-col items-start leading-none">
                        <span className="font-medium">Command Palette</span>
                        <span className="mt-1 text-[11px] text-[var(--text-muted)]">Run IDE commands</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        openCommandPalette("files");
                        closeSettings();
                      }}
                      className="flex items-center gap-3 rounded-sm border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3 text-[13px] text-[var(--text-secondary)] transition-all hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                    >
                      <VscSearch size={18} className="text-[var(--warning)]" />
                      <div className="flex flex-1 flex-col items-start leading-none">
                        <span className="font-medium">Search Files</span>
                        <span className="mt-1 text-[11px] text-[var(--text-muted)]">Quickly open any file</span>
                      </div>
                    </button>
                  </div>
                </section>

                {/* Shortcuts */}
                <section>
                  <h3 className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    <VscCode size={14} />
                    Keyboard Shortcuts
                  </h3>
                  <div className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden">
                    {shortcuts.map((s, idx) => (
                      <div
                        key={s.label}
                        className={`flex items-center justify-between px-4 py-2.5 text-[12px] ${
                          idx !== shortcuts.length - 1 ? "border-b border-[var(--border-default)]" : ""
                        }`}
                      >
                        <span className="text-[var(--text-secondary)]">{s.label}</span>
                        <kbd className="rounded border border-[var(--border-default)] bg-[var(--bg-elevated)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-primary)]">
                          {s.keys}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Footer */}
              <div className="border-t border-[var(--border-default)] bg-[var(--bg-surface)] px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[var(--text-primary)]">Aniket IDE</span>
                    <span className="text-[10px] text-[var(--text-muted)]">Version 1.4.0-stable</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-[var(--text-muted)]">Made with 💜 by</span>
                    <span className="text-[11px] font-medium text-[var(--text-primary)]">Aniket Karmakar</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
