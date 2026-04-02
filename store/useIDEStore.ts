"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { defaultFilePath } from "@/data/files";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface IDEState {
  // File & Editor State
  openFiles: string[];
  activeFile: string;
  openFile: (file: string) => void;
  closeFile: (file: string) => void;
  setActiveFile: (file: string) => void;

  // Panel States
  sidebarOpen: boolean;
  aiPanelOpen: boolean;
  terminalOpen: boolean;
  splitView: boolean;
  toggleSidebar: () => void;
  toggleAIPanel: () => void;
  toggleTerminal: () => void;
  toggleSplitView: () => void;
  setAIPanel: (val: boolean) => void;

  // Modals
  commandPaletteOpen: boolean;
  paletteMode: "commands" | "files";
  openCommandPalette: (mode?: "commands" | "files") => void;
  closeCommandPalette: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // AI Chat State
  chatMessages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  clearChat: () => void;
}

export const useIDEStore = create<IDEState>()(
  persist(
    (set) => ({
      openFiles: [defaultFilePath],
      activeFile: defaultFilePath,
      sidebarOpen: true,
      aiPanelOpen: true,
      terminalOpen: true,
      splitView: false,
      commandPaletteOpen: false,
      paletteMode: "files",
      searchQuery: "",
      chatMessages: [
        {
          id: "welcome",
          role: "assistant",
          content: "Hello! I am your AI portfolio assistant. Ask me anything about this developer's projects or skills.",
        },
      ],

      openFile: (file) =>
        set((state) => ({
          activeFile: file,
          openFiles: state.openFiles.includes(file)
            ? state.openFiles
            : [...state.openFiles, file],
        })),
      
      closeFile: (file) =>
        set((state) => {
          const remaining = state.openFiles.filter((f) => f !== file);
          let newActive = state.activeFile;
          if (state.activeFile === file) {
            newActive = remaining[remaining.length - 1] || "";
          }
          return { openFiles: remaining, activeFile: newActive };
        }),

      setActiveFile: (file) => set({ activeFile: file }),
      
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      toggleAIPanel: () => set((state) => ({ aiPanelOpen: !state.aiPanelOpen })),
      toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
      toggleSplitView: () => set((state) => ({ splitView: !state.splitView })),
      setAIPanel: (val) => set({ aiPanelOpen: val }),

      openCommandPalette: (mode = "files") =>
        set({ commandPaletteOpen: true, paletteMode: mode, searchQuery: "" }),
      closeCommandPalette: () => set({ commandPaletteOpen: false, searchQuery: "" }),
      setSearchQuery: (q) => set({ searchQuery: q }),

      addMessage: (msg) => set((state) => ({ chatMessages: [...state.chatMessages, msg] })),
      clearChat: () => set({ chatMessages: [] }),
    }),
    {
      name: "cursor-portfolio-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        openFiles: state.openFiles,
        activeFile: state.activeFile,
        sidebarOpen: state.sidebarOpen,
        aiPanelOpen: state.aiPanelOpen,
        terminalOpen: state.terminalOpen,
      }),
    }
  )
);
