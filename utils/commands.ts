import { portfolioFiles } from "@/data/files";

interface CommandOptions {
  openFile: (path: string) => void;
}

export function executeTerminalCommand(
  input: string,
  options: CommandOptions
): { lines: string[]; clear?: boolean } {
  const [cmd, ...args] = input.trim().split(/\s+/);
  const command = cmd.toLowerCase();

  switch (command) {
    case "help":
      return {
        lines: [
          "Available commands:",
          "  help          Show this message",
          "  clear         Clear terminal output",
          "  about         About this developer",
          "  projects      List featured projects",
          "  skills        Technical stack",
          "  open <file>   Open a file in the editor (e.g., open src/home.tsx)",
          "  ls            List all files",
        ],
      };

    case "clear":
      return { lines: [], clear: true };

    case "ls":
      return {
        lines: portfolioFiles.map((f) => f.path),
      };

    case "about":
      return {
        lines: [
          "John Doe - Senior Frontend Engineer & UI Architect",
          "Over 8 years experience building high-performance web apps.",
          "Check out src/about.tsx for a deep dive.",
        ],
      };

    case "projects":
      return {
        lines: [
          "Featured Projects:",
          "  - Project Alpha: lead-ui, Next.js, Dashboards",
          "  - CodeFlow SDK: Author, TS/Rust, IDE-tooling",
          "Type 'open src/projects.ts' to see full data structure.",
        ],
      };

    case "skills":
      return {
        lines: [
          "Core Tech Stack:",
          "  - React, Next.js, TypeScript, Node.js",
          "  - Tailwind CSS, Framer Motion, Design Systems",
          "  - Docker, K8s, CI/CD",
        ],
      };

    case "open": {
      const path = args[0];
      if (!path) return { lines: ["Usage: open <file_path>"] };

      const file = portfolioFiles.find(
        (f) => f.path === path || f.name === path
      );
      if (file) {
        options.openFile(file.path);
        return { lines: [`Opening ${file.path}...`] };
      }
      return { lines: [`File not found: ${path}. Try 'ls' to see available files.`] };
    }

    case "contact":
      return {
        lines: [
          "Email: hello@johndoe.dev",
          "GitHub: johndoe",
          "LinkedIn: johndoe-dev",
        ],
      };

    default:
      return {
        lines: [`Command not found: ${command}. Type 'help' for assistance.`],
      };
  }
}
