import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { ReadinessMeter } from '../common/ReadinessMeter';
import {
  generateMarkdownBuildContract,
  generatePostgreSqlDDL,
  generateAIAgentPromptPack
} from '../../utils/buildContractGenerator';
import confetti from 'canvas-confetti';
import {
  FileCode2,
  Lock,
  Unlock,
  Copy,
  Check,
  Download,
  Flame,
  ShieldCheck,
  Bot,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const BuildContractView: React.FC = () => {
  const { project, stats, freezeSpecification } = useProject();
  const [exportFormat, setExportFormat] = useState<'markdown' | 'prompt' | 'sql' | 'json'>('markdown');
  const [copied, setCopied] = useState(false);
  const [showFreezeModal, setShowFreezeModal] = useState(false);
  const [freezeVersionInput, setFreezeVersionInput] = useState('v1.0-FROZEN');
  const [freezeSummaryInput, setFreezeSummaryInput] = useState('Approved build specification ready for AI coding agents.');

  const markdownContract = generateMarkdownBuildContract(project);
  const sqlDdl = generatePostgreSqlDDL(project);
  const aiPrompt = generateAIAgentPromptPack(project);
  const rawJson = JSON.stringify(project, null, 2);

  const getExportContent = () => {
    switch (exportFormat) {
      case 'markdown': return markdownContract;
      case 'prompt': return aiPrompt;
      case 'sql': return sqlDdl;
      case 'json': return rawJson;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = getExportContent();
    const extension = exportFormat === 'markdown' ? 'md' : exportFormat === 'sql' ? 'sql' : exportFormat === 'json' ? 'json' : 'txt';
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BUILD_CONTRACT_${project.name.replace(/\s+/g, '_')}_${project.version}.${extension}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExecuteFreeze = () => {
    freezeSpecification(freezeVersionInput, freezeSummaryInput);
    setShowFreezeModal(false);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const isReadyForBuild = stats.buildReadinessScore >= 80 && stats.criticalBlockersCount === 0;

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                STAGES 30 - 34
              </span>
              <span className="text-xs text-slate-400 font-medium">Build Readiness, Spec Lock & AI Handoff</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              Executable Build Contract & Coding Agent Handoff
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              The single source of truth for AI coding agents. Only approved specifications with resolved red flags are exported into executable contracts.
            </p>
          </div>

          {/* Spec Freeze Trigger */}
          <div className="flex items-center gap-3 self-start lg:self-auto">
            {project.isLocked ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                <Lock className="w-4 h-4" />
                <span>SPECIFICATION LOCKED ({project.version})</span>
              </div>
            ) : (
              <button
                onClick={() => setShowFreezeModal(true)}
                disabled={!isReadyForBuild}
                className={`btn-primary text-xs px-4 py-2.5 flex items-center gap-2 ${!isReadyForBuild ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Lock className="w-4 h-4" />
                <span>Freeze & Lock Spec ({project.version})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stage 30: AI Build Readiness Audit Card */}
      <div className="glass-panel p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <ReadinessMeter score={stats.buildReadinessScore} size="lg" />

          {/* Readiness Breakdown Sub-scores */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto text-xs">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 text-[10px] block uppercase">Requirements</span>
              <span className="text-base font-bold font-mono text-sky-400">{stats.requirementCoverage}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 text-[10px] block uppercase">Architecture</span>
              <span className="text-base font-bold font-mono text-emerald-400">{stats.architectureConfidence}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 text-[10px] block uppercase">Security</span>
              <span className="text-base font-bold font-mono text-indigo-400">{stats.securityReadiness}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 text-[10px] block uppercase">UX & Motion</span>
              <span className="text-base font-bold font-mono text-amber-400">{stats.uxCompleteness}%</span>
            </div>
          </div>
        </div>

        {!isReadyForBuild && (
          <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-xs text-rose-200">
            <Flame className="w-5 h-5 text-rose-400 flex-shrink-0 animate-pulse" />
            <span>
              <strong>Build Blocked:</strong> You must resolve all critical blockers and unconfirmed assumptions before autonomous AI code generation is permitted.
            </span>
          </div>
        )}
      </div>

      {/* Stage 33 & 34: Export & Handoff Studio */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-slate-400">Export Format:</span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setExportFormat('markdown')}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${exportFormat === 'markdown' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Markdown PRD/TRD
              </button>
              <button
                onClick={() => setExportFormat('prompt')}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${exportFormat === 'prompt' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                AI Agent Prompt Pack
              </button>
              <button
                onClick={() => setExportFormat('sql')}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${exportFormat === 'sql' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                PostgreSQL DDL
              </button>
              <button
                onClick={() => setExportFormat('json')}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${exportFormat === 'json' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Raw JSON Schema
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="btn-secondary text-xs px-3.5 py-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Contract'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="btn-primary text-xs px-3.5 py-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Contract Code Preview */}
        <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-[500px] leading-relaxed border border-slate-800/80">
          {getExportContent()}
        </pre>
      </div>

      {/* Freeze Specification Modal */}
      {showFreezeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4 animate-view-in">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Freeze Specification & Lock Version</h3>
                <p className="text-xs text-slate-400">Creates an immutable single source of truth version snapshot</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Version Label:</label>
                <input
                  type="text"
                  value={freezeVersionInput}
                  onChange={(e) => setFreezeVersionInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Release / Freeze Summary:</label>
                <textarea
                  value={freezeSummaryInput}
                  onChange={(e) => setFreezeSummaryInput(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-sans"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowFreezeModal(false)}
                className="btn-secondary text-xs px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteFreeze}
                className="btn-primary text-xs px-4 py-2"
              >
                Confirm & Lock Specification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
