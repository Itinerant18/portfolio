import {
  contactDetails,
  portfolioProfile,
  portfolioProjects,
} from "@/data/content";
import { portfolioFiles, type IDEFile } from "@/data/files";

export interface CommandDescriptor {
  id: string;
  title: string;
  description: string;
  shortcut: string;
  run: () => void;
}

export interface CommandContext {
  toggleTheme: () => void;
  toggleTerminal: () => void;
  focusAIPanel: () => void;
  openFileSearch: () => void;
  closeAllTabs: () => void;
}

export interface TerminalContext {
  openFile: (path: string) => void;
}

export interface TerminalResult {
  clear?: boolean;
  lines: string[];
}

export function createCommandDescriptors(
  context: CommandContext,
): CommandDescriptor[] {
  return [
    {
      id: "open-file",
      title: "Open File",
      description: "Search the workspace files.",
      shortcut: "Ctrl+P",
      run: context.openFileSearch,
    },
    {
      id: "toggle-terminal",
      title: "Toggle Terminal",
      description: "Show or hide the terminal panel.",
      shortcut: "Ctrl+`",
      run: context.toggleTerminal,
    },
    {
      id: "focus-ai",
      title: "Focus AI Panel",
      description: "Focus the left AI panel input.",
      shortcut: "Ctrl+Shift+A",
      run: context.focusAIPanel,
    },
    {
      // BUG FIX #1: Was showing "Ctrl+K" which is mapped to openCommandPalette in AppShell — conflict!
      id: "toggle-theme",
      title: "Toggle Theme",
      description: "Switch between dark and light themes.",
      shortcut: "Ctrl+Shift+T",
      run: context.toggleTheme,
    },
    {
      id: "close-tabs",
      title: "Close All Tabs",
      description: "Close every open editor tab.",
      shortcut: "Shift+Alt+W",
      run: context.closeAllTabs,
    },
  ];
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function fuzzyScore(query: string, target: string) {
  const q = normalize(query);
  const t = normalize(target);

  if (!q) {
    return 1;
  }

  let queryIndex = 0;
  let gaps = 0;
  let lastMatch = -1;

  for (let targetIndex = 0; targetIndex < t.length; targetIndex += 1) {
    if (t[targetIndex] === q[queryIndex]) {
      if (lastMatch >= 0) {
        gaps += targetIndex - lastMatch - 1;
      }

      lastMatch = targetIndex;
      queryIndex += 1;

      if (queryIndex === q.length) {
        break;
      }
    }
  }

  if (queryIndex !== q.length) {
    return null;
  }

  const startBonus = t.startsWith(q) ? 20 : 0;
  return 100 + startBonus - gaps - t.length * 0.1;
}

export function searchPortfolioFiles(query: string, files: IDEFile[] = portfolioFiles) {
  const q = normalize(query);

  return files
    .map((file) => {
      const score = Math.max(
        fuzzyScore(q, file.name) ?? Number.NEGATIVE_INFINITY,
        fuzzyScore(q, file.path) ?? Number.NEGATIVE_INFINITY,
      );

      return { file, score };
    })
    .filter((entry) => (!q ? true : entry.score > Number.NEGATIVE_INFINITY))
    .sort((left, right) => right.score - left.score || left.file.name.localeCompare(right.file.name))
    .map((entry) => entry.file);
}

export function executeTerminalCommand(
  input: string,
  context: TerminalContext,
): TerminalResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { lines: [] };
  }

  const [command, ...args] = trimmed.split(/\s+/);
  const normalized = command.toLowerCase();

  if (normalized === "clear") {
    return { clear: true, lines: [] };
  }

  if (normalized === "help") {
    return {
      lines: [
        "help               show available commands",
        "about              show portfolio summary",
        "projects           list featured projects",
        "clear              clear terminal output",
        "open <filename>    open a file in the editor",
      ],
    };
  }

  if (normalized === "about") {
    return {
      lines: [
        `${portfolioProfile.name} // ${portfolioProfile.role}`,
        portfolioProfile.summary,
        `Contact: ${contactDetails.email}`,
      ],
    };
  }

  if (normalized === "projects") {
    return {
      lines: portfolioProjects.map(
        (project) => `${project.name} (${project.year}) ${project.summary}`,
      ),
    };
  }

  if (normalized === "open") {
    const requested = args.join(" ");

    if (!requested) {
      return { lines: ['Usage: open <filename>'] };
    }

    const requestedLower = requested.toLowerCase();
    const matched = portfolioFiles.find((file) => {
      const pathLower = file.path.toLowerCase();
      const nameLower = file.name.toLowerCase();
      return pathLower === requestedLower || nameLower === requestedLower;
    });

    if (!matched) {
      return { lines: [`File not found: ${requested}`] };
    }

    context.openFile(matched.path);
    return { lines: [`Opened ${matched.path}`] };
  }

  return {
    lines: [`Unknown command: ${command}. Run "help" for available commands.`],
  };
}
