import React, { useState } from 'react';
import { Copy, Check, Terminal, Download } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  maxHeight?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  filename,
  maxHeight = 'max-h-96'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `spec-contract.${language === 'prisma' ? 'prisma' : language === 'markdown' ? 'md' : 'json'}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#060911] overflow-hidden flex flex-col font-mono text-xs shadow-xl">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.03] border-b border-white/[0.06] text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-slate-200">{filename || language.toUpperCase()}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-400 border border-white/10">
            {code.split('\n').length} lines
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleDownload}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 text-[11px] px-2 py-0.5"
            title="Download file"
          >
            <Download className="w-3 h-3" />
            <span>Save</span>
          </button>
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 text-[11px] px-2 py-0.5"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <pre className={`p-3.5 overflow-x-auto overflow-y-auto text-slate-300 leading-relaxed ${maxHeight} selection:bg-cyan-500/30 selection:text-white`}>
        <code>{code}</code>
      </pre>
    </div>
  );
};
