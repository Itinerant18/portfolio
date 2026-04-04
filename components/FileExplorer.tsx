"use client";

import { portfolioFiles, IDEFile } from "@/data/files";
import { useIDEStore } from "@/store/useIDEStore";
import { useState, useMemo } from "react";
import { 
  VscChevronRight, VscChevronDown, VscFiles, VscSearch, 
  VscSourceControl, VscExtensions, VscEllipsis,
  VscNewFile, VscNewFolder, VscRefresh, VscCollapseAll,
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
    return <FaHtml5 className="text-[#e34f26] shrink-0" size={14} />;
  }
  if (name === 'package-lock.json' || ext === 'json') {
    return <VscJson className="text-[#cbcb41] shrink-0" size={14} />;
  }
  if (ext === 'ts') {
    return <SiTypescript className="text-[#3178c6] shrink-0" size={13} />;
  }
  if (ext === 'js') {
    return <FaJs className="text-[#f7df1e] shrink-0" size={14} />;
  }
  if (ext === 'py') {
    return <FaPython className="text-[#3572A5] shrink-0" size={14} />;
  }
  if (ext === 'tsx' || ext === 'jsx' || ext === 'react') {
    return <FaReact className="text-[#61dafb] shrink-0" size={14} />;
  }
  if (ext === 'css') {
    return <FaCss3Alt className="text-[#1572B6] shrink-0" size={14} />;
  }
  if (ext === 'md') {
    return <FaMarkdown className="text-[#519aba] shrink-0" size={14} />;
  }

  return <VscFile className="text-[#a8a8b8] shrink-0" size={14} />;
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

  // Sort folders first, then alphabetically
  const sortNodes = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => {
      // Keep .vscode and node_modules at top if they exist
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

function ActionIcon({ children, onClick }: { children: React.ReactNode, onClick?: (e: React.MouseEvent) => void }) {
  return (
    <button 
      type="button" 
      onClick={onClick}
      className="flex h-[22px] w-[22px] items-center justify-center rounded-[3px] text-[#cccccc] hover:bg-[#2a2a32] hover:text-[#ffffff] transition-colors"
    >
      {children}
    </button>
  );
}

export default function FileExplorer() {
  const activeFile = useIDEStore((state) => state.activeFile);
  const openFile = useIDEStore((state) => state.openFile);
  const toggleMobileSidebar = useIDEStore((state) => state.toggleMobileSidebar);
  const openCommandPalette = useIDEStore((state) => state.openCommandPalette);

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
               className="flex h-[22px] w-full items-center px-[2px] cursor-pointer hover:bg-[#2a2a32] transition-colors group"
               style={{ paddingLeft: `${depth * 10 + 2}px` }}
            >
              <div className="shrink-0 flex items-center justify-center w-5 opacity-80 group-hover:opacity-100">
                {isExpanded ? <VscChevronDown size={15} /> : <VscChevronRight size={15} />}
              </div>
              <span className="truncate text-[13px] text-[#cccccc] tracking-tight ml-0.5">
                {node.name}
              </span>
            </button>
            {isExpanded && (
              <div className="w-full relative">
                {/* Indentation line */}
                <div 
                  className="absolute left-[10px] top-0 bottom-0 border-l border-[#2a2a32] z-0" 
                  style={{ left: `${depth * 10 + 12}px` }}
                />
                <div className="relative z-10 w-full">
                  {recursiveRender(node.children, nodePath, depth + 1)}
                </div>
              </div>
            )}
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
          className={`flex h-[22px] w-full items-center gap-[6px] transition-colors ${isActive ? "bg-[#37373d] text-[#ffffff]" : "text-[#cccccc] hover:bg-[#2a2a32]"}`}
          style={{ paddingLeft: `${depth * 10 + 10}px` }}
        >
          <div className="flex h-full w-[16px] items-center justify-center font-bold shrink-0">
             {getFileIcon(node.name)}
          </div>
          <span className="truncate text-[13px] tracking-tight">{node.name}</span>
        </button>
      );
    });
  };

  const collapseAll = () => setExpandedFolders({});

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[#18181a] text-[13px] font-sans select-none border-r border-[#1e1e24]">
      
      {/* Explorer Header / Activity Bar */}
      <div className="flex shrink-0 items-center gap-[6px] px-4 pt-3 pb-2 border-b border-transparent">
        <button
          title="Explorer"
          className="flex h-[28px] w-[32px] items-center justify-center rounded-[6px] transition-colors bg-[#2a2d31] text-[#cccccc]"
        >
          <VscFiles size={18} />
        </button>

        <button
          title="Search"
          onClick={() => openCommandPalette("files")}
          className="flex h-[28px] w-[32px] items-center justify-center rounded-[6px] transition-colors text-[#8b8b9e] hover:bg-[#2a2d31] hover:text-[#cccccc]"
        >
          <VscSearch size={16} />
        </button>

        <button
          title="Source Control"
          className="flex h-[28px] w-[32px] items-center justify-center rounded-[6px] transition-colors text-[#8b8b9e] hover:bg-[#2a2d31] hover:text-[#cccccc]"
        >
          <VscSourceControl size={16} />
        </button>

        <button
          title="Extensions"
          className="flex h-[28px] w-[32px] items-center justify-center rounded-[6px] transition-colors text-[#8b8b9e] hover:bg-[#2a2d31] hover:text-[#cccccc]"
        >
          <VscExtensions size={16} />
        </button>

        <button
          title="More"
          className="flex h-[28px] w-[20px] items-center justify-center rounded-[6px] transition-colors text-[#8b8b9e] hover:bg-[#2a2d31] hover:text-[#cccccc] ml-1"
        >
          <VscEllipsis size={18} />
        </button>
      </div>

      <div className="flex flex-1 flex-col min-h-0">
        <div className="group flex h-[22px] items-center justify-between px-1 hover:bg-[#2a2a32] cursor-pointer" onClick={() => toggleFolder('root_portfolio')}>
          <div className="flex items-center gap-[2px] font-bold text-[11px] text-[#cccccc] tracking-[0.05em] uppercase">
            <span className="opacity-80 group-hover:opacity-100 transition-opacity">
              {expandedFolders['root_portfolio'] !== false ? <VscChevronDown size={14} /> : <VscChevronRight size={14} />}
            </span>
            <span className="mt-[1px]">PORTFOLIO</span>
          </div>
          
          {/* Action Icons right side */}
          <div className="flex items-center px-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* New File */}
            <ActionIcon>
              <VscNewFile size={15} />
            </ActionIcon>
            {/* New Folder */}
            <ActionIcon>
              <VscNewFolder size={15} />
            </ActionIcon>
            {/* Refresh */}
            <ActionIcon>
              <VscRefresh size={15} />
            </ActionIcon>
            {/* Collapse All */}
            <ActionIcon onClick={(e) => { e.stopPropagation(); collapseAll(); }}>
              <VscCollapseAll size={15} />
            </ActionIcon>
          </div>
        </div>

        <div className="ide-scrollbar min-h-0 flex-1 overflow-y-auto w-full overflow-x-hidden">
          {expandedFolders['root_portfolio'] !== false && (
            <div className="pb-4 w-full">
              {recursiveRender(tree, "", 1)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
