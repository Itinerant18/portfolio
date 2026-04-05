"use client";

import { portfolioFiles, IDEFile } from "@/data/files";
import { contactDetails } from "@/data/content";
import { useIDEStore } from "@/store/useIDEStore";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  VscChevronRight, VscChevronDown, VscFiles, VscSearch, 
  VscSourceControl, VscExtensions, VscEllipsis,
  VscCollapseAll,
  VscJson, VscFile
} from "react-icons/vsc";
import { 
  FaHtml5, FaJs, FaPython, FaReact, FaCss3Alt, FaMarkdown 
} from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

// --- Icons ---
function getFileIcon(name: string) {
  const ext = name.split('.').pop()?.toLowerCase() || '';

  if (ext === 'html') {
    return <FaHtml5 className="shrink-0" size={14} style={{ color: "var(--file-html)" }} />;
  }
  if (name === 'package-lock.json' || ext === 'json') {
    return <VscJson className="shrink-0" size={14} style={{ color: "var(--file-json)" }} />;
  }
  if (ext === 'ts') {
    return <SiTypescript className="shrink-0" size={13} style={{ color: "var(--file-typescript)" }} />;
  }
  if (ext === 'js') {
    return <FaJs className="shrink-0" size={14} style={{ color: "var(--file-javascript)" }} />;
  }
  if (ext === 'py') {
    return <FaPython className="shrink-0" size={14} style={{ color: "var(--file-python)" }} />;
  }
  if (ext === 'tsx' || ext === 'jsx' || ext === 'react') {
    return <FaReact className="shrink-0" size={14} style={{ color: "var(--file-react)" }} />;
  }
  if (ext === 'css') {
    return <FaCss3Alt className="shrink-0" size={14} style={{ color: "var(--file-css)" }} />;
  }
  if (ext === 'md') {
    return <FaMarkdown className="shrink-0" size={14} style={{ color: "var(--file-markdown)" }} />;
  }

  return <VscFile className="text-[var(--text-muted)] shrink-0" size={14} />;
}

// Tree generation
type FileNode = {
  name: string;
  type: "file";
  file: IDEFile;
};

type FolderNode = {
  name: string;
  type: "folder";
  children: TreeNode[];
};

type TreeNode = FileNode | FolderNode;

function buildTree(files: IDEFile[]): TreeNode[] {
  const root: TreeNode[] = [];

  for (const file of files) {
    const parts = file.path.split("/");
    let currentLevel = root;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      if (isFile) {
        currentLevel.push({ name: part, type: "file", file });
      } else {
        let existingFolder = currentLevel.find((node) => node.name === part && node.type === "folder") as FolderNode;
        if (!existingFolder) {
          existingFolder = { name: part, type: "folder", children: [] };
          currentLevel.push(existingFolder);
        }
        currentLevel = existingFolder.children;
      }
    }
  }

  const sortNodes = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => {
      if (a.name === '.vscode' || a.name === 'node_modules') return -1;
      if (b.name === '.vscode' || b.name === 'node_modules') return 1;
      
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === "folder" ? -1 : 1;
    });
    nodes.forEach(n => {
      if (n.type === "folder") {
        sortNodes(n.children);
      }
    });
  };
  sortNodes(root);

  return root;
}

function ActionIcon({ children, onClick, title }: { children: React.ReactNode, onClick?: (e: React.MouseEvent) => void, title?: string }) {
  return (
    <button 
      type="button" 
      onClick={onClick}
      title={title}
      className="flex h-6 w-6 items-center justify-center rounded-md text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-overlay)] hover:text-[var(--text-primary)]"
    >
      {children}
    </button>
  );
}

function ActivityIcon({ icon: Icon, title, active = false, onClick }: { icon: any, title: string, active?: boolean, onClick?: () => void }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`relative flex h-11 w-11 items-center justify-center transition-colors ${
        active 
          ? "text-[var(--text-primary)]" 
          : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
      }`}
    >
      {active && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--accent)]" />}
      <Icon size={24} />
    </button>
  );
}

export default function FileExplorer() {
  const activeFile = useIDEStore((state) => state.activeFile);
  const openFile = useIDEStore((state) => state.openFile);
  const toggleMobileSidebar = useIDEStore((state) => state.toggleMobileSidebar);
  const openCommandPalette = useIDEStore((state) => state.openCommandPalette);
  const openSkillsTab = () => openFile("src/skills.json");
  const openExternal = (value: string) => {
    const href = value.startsWith("http") ? value : `https://${value}`;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const tree = useMemo(() => buildTree(portfolioFiles), []);

  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    "src": true,
  });

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const recursiveRender = (nodes: TreeNode[], currentPath = "", depth = 0) => {
    return nodes.map((node) => {
      const nodePath = currentPath ? `${currentPath}/${node.name}` : node.name;
      
      if (node.type === "folder") {
        const isExpanded = expandedFolders[nodePath];
        return (
          <div key={nodePath} className="w-full">
            <button
               type="button"
               onClick={() => toggleFolder(nodePath)}
               className="group flex h-6 w-full items-center px-1 transition-colors hover:bg-[var(--bg-muted)]"
               style={{ paddingLeft: `${depth * 12 + 4}px` }}
            >
              <div className="shrink-0 flex items-center justify-center w-5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">
                {isExpanded ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
              </div>
              <span className="ml-0.5 truncate text-[12px] font-medium tracking-tight text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                {node.name}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isExpanded ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="relative w-full overflow-hidden"
              >
                <div 
                  className="absolute left-[13px] top-0 bottom-0 border-l border-[var(--border-default)] z-0" 
                  style={{ left: `${depth * 12 + 13}px` }}
                />
                <div className="relative z-10 w-full">
                  {recursiveRender(node.children, nodePath, depth + 1)}
                </div>
              </motion.div>
            ) : null}
            </AnimatePresence>
          </div>
        );
      }

      // File
      const isActive = activeFile === node.file.path;
      return (
        <button
          key={nodePath}
          type="button"
          onClick={() => {
            openFile(node.file.path);
            if (window.innerWidth < 1024) toggleMobileSidebar();
          }}
          className={`group relative flex h-6 w-full items-center gap-2 transition-colors ${isActive ? "bg-[var(--bg-muted)] text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]"}`}
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
        >
          {isActive ? <span className="absolute left-0 top-0 h-full w-px bg-[var(--accent)]" /> : null}
          <div className="flex h-full w-4 items-center justify-center shrink-0">
             {getFileIcon(node.name)}
          </div>
          <span className="truncate text-[12px] font-medium tracking-tight">{node.name}</span>
        </button>
      );
    });
  };

  const collapseAll = () => setExpandedFolders({});

  return (
    <div className="flex h-full min-h-0 w-full bg-[var(--bg-elevated)] text-[13px] font-sans select-none border-l border-[var(--border-default)]">
      
      {/* Activity Bar (Vertical) */}
      <div className="flex w-11 flex-col items-center border-r border-[var(--border-default)] bg-[var(--bg-elevated)] py-2">
        <ActivityIcon icon={VscFiles} title="Explorer" active={true} />
        <ActivityIcon icon={VscSearch} title="Search" onClick={() => openCommandPalette("files")} />
        <ActivityIcon icon={VscSourceControl} title="Source Control" onClick={() => openExternal(contactDetails.github)} />
        <ActivityIcon icon={VscExtensions} title="Extensions" onClick={openSkillsTab} />
        <div className="mt-auto">
          <ActivityIcon icon={VscEllipsis} title="More" />
        </div>
      </div>

      {/* Explorer Content */}
      <div className="flex flex-1 flex-col min-h-0">
        <div className="flex h-9 shrink-0 items-center px-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">Explorer</span>
        </div>

        <div className="flex flex-1 flex-col min-h-0">
          <div className="group flex h-7 items-center justify-between border-y border-[var(--border-default)] bg-[var(--bg-muted)] px-1.5" onClick={() => toggleFolder('root_portfolio')}>
            <div className="flex items-center gap-[2px] text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--text-primary)]">
              <span className="opacity-80 group-hover:opacity-100 transition-opacity">
                {expandedFolders['root_portfolio'] !== false ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
              </span>
              <span className="mt-[1px]">PORTFOLIO</span>
            </div>
            
            <div className="flex items-center gap-0.5 px-1 opacity-0 transition-opacity group-hover:opacity-100">
              <ActionIcon title="Collapse Folders" onClick={(e) => { e.stopPropagation(); collapseAll(); }}>
                <VscCollapseAll size={15} />
              </ActionIcon>
            </div>
          </div>

          <div className="ide-scrollbar min-h-0 flex-1 overflow-y-auto w-full overflow-x-hidden pt-1">
            {expandedFolders['root_portfolio'] !== false && (
              <div className="pb-4 w-full">
                {recursiveRender(tree, "", 0)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
