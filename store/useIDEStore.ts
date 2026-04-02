"use client";

import { defaultFilePath } from "@/data/files";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemeMode = "dark" | "light";
export type PaletteMode = "commands" | "files";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface IDEState {
  openFiles: string[];
  activeFile: string;
  sidebarOpen: boolean;
  aiPanelOpen: boolean;
  mobileSidebarOpen: boolean;
  mobileAIPanelOpen: boolean;
  terminalOpen: boolean;
  terminalResetKey: number;
  theme: ThemeMode;
  commandPaletteOpen: boolean;
  paletteMode: PaletteMode;
  searchQuery: string;
  chatMessages: ChatMessage[];
  openFile: (file: string) => void;
  closeFile: (file: string) => void;
  setActiveFile: (file: string) => void;
  toggleSidebar: () => void;
  toggleAIPanel: () => void;
  toggleMobileSidebar: () => void;
  toggleMobileAIPanel: () => void;
  closeMobilePanels: () => void;
  toggleTerminal: () => void;
  resetTerminal: () => void;
  toggleTheme: () => void;
  openCommandPalette: (mode?: PaletteMode) => void;
  closeCommandPalette: () => void;
  setSearchQuery: (query: string) => void;
  closeAllTabs: () => void;
  focusAIPanel: () => void;
  addMessage: (message: ChatMessage) => void;
  clearChat: () => void;
  zoomLevel: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

const initialMessages: ChatMessage[] = [
  {
    id: "assistant-welcome",
    role: "assistant",
    content: "Session ready. Ask about projects, architecture, or experience.",
  },
];

export const useIDEStore = create<IDEState>()(
  persist(
    (set) => ({
      openFiles: [defaultFilePath],
      activeFile: defaultFilePath,
      sidebarOpen: true,
      aiPanelOpen: true,
      mobileSidebarOpen: false,
      mobileAIPanelOpen: false,
      terminalOpen: true,
      terminalResetKey: 0,
      theme: "dark",
      commandPaletteOpen: false,
      paletteMode: "commands",
      searchQuery: "",
      chatMessages: initialMessages,
      openFile: (file) =>
        set((state) => ({
          activeFile: file,
          openFiles: state.openFiles.includes(file)
            ? state.openFiles
            : [...state.openFiles, file],
        })),
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
      resetTerminal: () =>
        set((state) => ({
          terminalOpen: true,
          terminalResetKey: state.terminalResetKey + 1,
        })),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),
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
    }),
    {
      name: "cursor-portfolio-v5",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        openFiles: state.openFiles,
        activeFile: state.activeFile,
        sidebarOpen: state.sidebarOpen,
        aiPanelOpen: state.aiPanelOpen,
        terminalOpen: state.terminalOpen,
        theme: state.theme,
        zoomLevel: state.zoomLevel,
      }),
    },
  ),
);
