"use client";

import { defaultFilePath } from "@/data/files";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemeMode =
  | "aniket-dark"
  | "synthwave"
  | "dracula"
  | "light"
  | "cursor-warm"
  | "rose-pine"
  | "tokyo-night"
  | "catppuccin"
  | "nord"
  | "gruvbox";
export type PaletteMode = "commands" | "files";
export type IDEMode = "editor" | "agent";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface IDEState {
  hasHydrated: boolean;
  openFiles: string[];
  activeFile: string;
  sidebarOpen: boolean;
  aiPanelOpen: boolean;
  mobileSidebarOpen: boolean;
  mobileAIPanelOpen: boolean;
  terminalOpen: boolean;
  terminalResetKey: number;
  currentMode: IDEMode;
  theme: ThemeMode;
  settingsOpen: boolean;
  commandPaletteOpen: boolean;
  paletteMode: PaletteMode;
  searchQuery: string;
  chatMessages: ChatMessage[];
  openFile: (file: string) => void;
  closeFile: (file: string) => void;
  closeActiveTab: () => void;
  setActiveFile: (file: string) => void;
  toggleSidebar: () => void;
  toggleAIPanel: () => void;
  toggleMobileSidebar: () => void;
  toggleMobileAIPanel: () => void;
  closeMobilePanels: () => void;
  toggleTerminal: () => void;
  resetTerminal: () => void;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleSettings: () => void;
  closeSettings: () => void;
  openCommandPalette: (mode?: PaletteMode) => void;
  closeCommandPalette: () => void;
  setSearchQuery: (query: string) => void;
  closeAllTabs: () => void;
  toggleMode: () => void;
  focusAIPanel: () => void;
  addMessage: (message: ChatMessage) => void;
  clearChat: () => void;
  zoomLevel: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  setHasHydrated: (value: boolean) => void;
}

const themeOrder: ThemeMode[] = [
  "aniket-dark",
  "synthwave",
  "dracula",
  "light",
  "cursor-warm",
  "rose-pine",
  "tokyo-night",
  "catppuccin",
  "nord",
  "gruvbox",
];

const initialMessages: ChatMessage[] = [
  {
    id: "assistant-welcome",
    role: "assistant",
    content: "Session ready. Ask about projects, architecture, or experience.",
  },
];

function triggerResumeDownload() {
  if (typeof document === "undefined") return;
  const link = document.createElement("a");
  link.href = "/Aniket_resume_updated.pdf";
  link.download = "resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const useIDEStore = create<IDEState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      openFiles: [defaultFilePath],
      activeFile: defaultFilePath,
      sidebarOpen: true,
      aiPanelOpen: true,
      mobileSidebarOpen: false,
      mobileAIPanelOpen: false,
      terminalOpen: true,
      terminalResetKey: 0,
      currentMode: "editor",
      theme: "aniket-dark",
      settingsOpen: false,
      commandPaletteOpen: false,
      paletteMode: "commands",
      searchQuery: "",
      chatMessages: initialMessages,
      openFile: (file) =>
        set((state) => {
          if (file.toLowerCase().endsWith("resume.pdf")) {
            triggerResumeDownload();
            return {};
          }

          return {
            activeFile: file,
            openFiles: state.openFiles.includes(file)
              ? state.openFiles
              : [...state.openFiles, file],
          };
        }),
      closeFile: (file) =>
        set((state) => {
          const remaining = state.openFiles.filter((entry) => entry !== file);
          const nextActive =
            state.activeFile === file
              ? remaining[remaining.length - 1] ?? ""
              : state.activeFile;

          return {
            openFiles: remaining,
            activeFile: nextActive,
          };
        }),
      closeActiveTab: () =>
        set((state) => {
          if (!state.activeFile) {
            return state;
          }

          const remaining = state.openFiles.filter(
            (entry) => entry !== state.activeFile,
          );

          return {
            openFiles: remaining,
            activeFile: remaining[remaining.length - 1] ?? "",
          };
        }),
      setActiveFile: (file) => set({ activeFile: file }),
      toggleSidebar: () =>
        set((state) => ({
          sidebarOpen: !state.sidebarOpen,
        })),
      toggleAIPanel: () =>
        set((state) => ({
          aiPanelOpen: !state.aiPanelOpen,
        })),
      toggleMobileSidebar: () =>
        set((state) => ({
          mobileSidebarOpen: !state.mobileSidebarOpen,
        })),
      toggleMobileAIPanel: () =>
        set((state) => ({
          mobileAIPanelOpen: !state.mobileAIPanelOpen,
        })),
      closeMobilePanels: () =>
        set({
          mobileSidebarOpen: false,
          mobileAIPanelOpen: false,
        }),
      toggleTerminal: () =>
        set((state) => ({
          terminalOpen: !state.terminalOpen,
        })),
      toggleMode: () =>
        set((state) => ({
          currentMode: state.currentMode === "editor" ? "agent" : "editor",
        })),
      resetTerminal: () =>
        set((state) => ({
          terminalOpen: true,
          terminalResetKey: state.terminalResetKey + 1,
        })),
      toggleTheme: () =>
        set((state) => {
          const THEME_CYCLE: ThemeMode[] = [
            "aniket-dark",
            "synthwave",
            "dracula",
            "light",
            "cursor-warm",
            "rose-pine",
            "tokyo-night",
            "catppuccin",
            "nord",
            "gruvbox",
          ];
          const idx = THEME_CYCLE.indexOf(state.theme);
          return { theme: THEME_CYCLE[(idx + 1) % THEME_CYCLE.length] };
        }),
      setTheme: (theme) => set({ theme }),
      toggleSettings: () => set((state) => ({ settingsOpen: !state.settingsOpen })),
      closeSettings: () => set({ settingsOpen: false }),
      openCommandPalette: (mode = "commands") =>
        set({
          commandPaletteOpen: true,
          paletteMode: mode,
          searchQuery: "",
        }),
      closeCommandPalette: () =>
        set({
          commandPaletteOpen: false,
          searchQuery: "",
        }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      closeAllTabs: () =>
        set({
          openFiles: [],
          activeFile: "",
        }),
      focusAIPanel: () =>
        set({
          aiPanelOpen: true,
          mobileAIPanelOpen: true,
        }),
      addMessage: (message) =>
        set((state) => ({
          chatMessages: [...state.chatMessages, message],
        })),
      clearChat: () =>
        set({
          chatMessages: initialMessages,
        }),
      zoomLevel: 1,
      zoomIn: () =>
        set((state) => ({
          zoomLevel: Math.min(state.zoomLevel + 0.1, 2.5),
        })),
      zoomOut: () =>
        set((state) => ({
          zoomLevel: Math.max(state.zoomLevel - 0.1, 0.5),
        })),
      resetZoom: () =>
        set({
          zoomLevel: 1,
        }),
      setHasHydrated: (value) =>
        set({
          hasHydrated: value,
        }),
    }),
    {
      name: "cursor-portfolio-v6",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

