import React, { useState, useEffect } from "react";
import {
  Folder,
  FileCode,
  FileText,
  Copy,
  Check,
  Download,
  ChevronRight,
  ChevronDown,
  Code2,
  FileJson,
  Layers,
} from "lucide-react";

interface ProjectFile {
  path: string;
  name: string;
  extension: string;
}

export const ProjectExplorer: React.FC = () => {
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>("src/App.tsx");
  const [fileContent, setFileContent] = useState<string>("// Loading file content...");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Fetch file list
  useEffect(() => {
    fetch("/api/project-files")
      .then((res) => res.json())
      .then((data) => {
        if (data.files) {
          setFiles(data.files);
          if (data.files.length > 0 && !data.files.some((f: any) => f.path === "src/App.tsx")) {
            setSelectedFile(data.files[0].path);
          }
        }
      })
      .catch((err) => console.error("Failed to load project files:", err));
  }, []);

  // Fetch content when selected file changes
  useEffect(() => {
    if (!selectedFile) return;
    setLoading(true);
    fetch(`/api/project-file-content?path=${encodeURIComponent(selectedFile)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.content) {
          setFileContent(data.content);
        } else {
          setFileContent("// Unable to read file content");
        }
      })
      .catch((err) => {
        setFileContent(`// Error loading file: ${err.message}`);
      })
      .finally(() => setLoading(false));
  }, [selectedFile]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFileIcon = (ext: string, name: string) => {
    if (name.endsWith(".gradle.kts") || name.endsWith(".gradle")) return <Layers className="w-4 h-4 text-amber-400" />;
    if (ext === "kt") return <FileCode className="w-4 h-4 text-purple-400" />;
    if (ext === "xml") return <Code2 className="w-4 h-4 text-sky-400" />;
    if (ext === "yml" || ext === "yaml") return <FileJson className="w-4 h-4 text-emerald-400" />;
    return <FileText className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-2xl flex flex-col h-[720px]">
      {/* Explorer Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Folder className="w-5 h-5 text-emerald-400" />
            <span>GitHub Repository Explorer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            د پروژې ټول فایلونه او کوډونه - چمتو د GitHub خپرولو لپاره.
          </p>
        </div>

        <a
          href="/api/download-project"
          className="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-sky-500/20 flex items-center gap-2 transition-all shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download Project (.ZIP)</span>
        </a>
      </div>

      {/* Explorer Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden">
        {/* Left Directory Tree */}
        <div className="lg:col-span-4 bg-slate-950/80 rounded-xl border border-slate-800/80 p-3 overflow-y-auto scrollbar-thin">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-2 flex items-center justify-between">
            <span>Project Files ({files.length})</span>
          </div>

          <div className="space-y-0.5 font-mono text-xs">
            {files.map((file) => {
              const isSelected = selectedFile === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file.path)}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors truncate ${
                    isSelected
                      ? "bg-sky-500/15 text-sky-300 font-semibold border border-sky-500/30"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  }`}
                  title={file.path}
                >
                  {getFileIcon(file.extension, file.name)}
                  <span className="truncate">{file.path}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Code Viewer */}
        <div className="lg:col-span-8 bg-slate-950/90 rounded-xl border border-slate-800/80 flex flex-col overflow-hidden">
          {/* File Header Bar */}
          <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-sky-400 truncate">
              {selectedFile}
            </span>

            <button
              onClick={handleCopy}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* File Content Body */}
          <div className="flex-1 p-4 overflow-auto font-mono text-xs text-slate-200 leading-relaxed scrollbar-thin bg-[#0D1117]">
            {loading ? (
              <div className="flex items-center justify-center h-full text-slate-500">
                Loading source code...
              </div>
            ) : (
              <pre className="whitespace-pre">
                <code>{fileContent}</code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
