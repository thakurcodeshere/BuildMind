import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import {
  Sparkles,
  Mic,
  FileText,
  Globe,
  Github,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Layers,
  ArrowRight,
  ShieldAlert,
  AlertCircle
} from 'lucide-react';

export const IdeaCaptureView: React.FC = () => {
  const { project, setActiveTab } = useProject();
  const [rawText, setRawText] = useState(project.ideaRawInput);
  const [isExtracting, setIsExtracting] = useState(false);
  const [activeIntakeType, setActiveIntakeType] = useState<'text' | 'voice' | 'doc' | 'url' | 'github'>('text');

  const handleSimulateIntake = (type: 'text' | 'voice' | 'doc' | 'url' | 'github') => {
    setActiveIntakeType(type);
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
    }, 600);
  };

  const { ideaDNA } = project;

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                STAGE 01 & 02
              </span>
              <span className="text-xs text-slate-400 font-medium">Idea Capture & Intent Extraction</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              Human Idea → Structured IDEA DNA
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              The user explains their vision in unstructured natural language. IntentForge converts it into a formal, structured <strong>IDEA DNA</strong> specification before any engineering domains are generated.
            </p>
          </div>

          {/* Multi-Modal Intake Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start lg:self-auto">
            <button
              onClick={() => handleSimulateIntake('text')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeIntakeType === 'text' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Text Dump</span>
            </button>
            <button
              onClick={() => handleSimulateIntake('voice')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeIntakeType === 'voice' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Voice</span>
            </button>
            <button
              onClick={() => handleSimulateIntake('doc')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeIntakeType === 'doc' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PDF / PRD</span>
            </button>
            <button
              onClick={() => handleSimulateIntake('github')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeIntakeType === 'github' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Raw Idea Capture Workspace (Stage 01) */}
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Stage 01: Raw Natural Language Input
            </h3>
            <span className="text-xs text-slate-400">(No technical jargon required)</span>
          </div>
          <button
            onClick={() => handleSimulateIntake(activeIntakeType)}
            disabled={isExtracting}
            className="btn-secondary text-xs px-3 py-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isExtracting ? 'animate-spin text-sky-400' : ''}`} />
            <span>Re-Extract Intent DNA</span>
          </button>
        </div>

        <textarea
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          rows={5}
          className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 font-sans leading-relaxed transition-colors resize-y"
          placeholder="Explain your software idea in your own words. Do not worry about technical architecture..."
        />
      </div>

      {/* Stage 02: Extracted IDEA DNA Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <h3 className="text-lg font-bold text-white font-display">
                Stage 02: Structured IDEA DNA Output
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Deterministic intermediate representation compiled by the AI Intent Extraction Engine.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('discovery')}
            className="btn-primary text-xs px-4 py-2"
          >
            <span>Proceed to 20-Domain Discovery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Problem */}
          <div className="glass-panel p-5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-400 block mb-1">
              Problem Statement
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              {ideaDNA.problem}
            </p>
          </div>

          {/* Card 2: Solution */}
          <div className="glass-panel p-5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-1">
              Proposed Solution
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              {ideaDNA.solution}
            </p>
          </div>

          {/* Card 3: Target Users */}
          <div className="glass-panel p-5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400 block mb-1">
              Target User Personas
            </span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {ideaDNA.users.map((user, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-800 text-sky-200 border border-slate-700">
                  {user}
                </span>
              ))}
            </div>
          </div>

          {/* Card 4: Core Workflow */}
          <div className="glass-panel p-5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400 block mb-1">
              Core Workflow
            </span>
            <p className="text-xs text-slate-200 leading-relaxed font-mono">
              {ideaDNA.coreWorkflow}
            </p>
          </div>

          {/* Card 5: Business Model */}
          <div className="glass-panel p-5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 block mb-1">
              Business Model
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              {ideaDNA.businessModel}
            </p>
          </div>

          {/* Card 6: Platforms */}
          <div className="glass-panel p-5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400 block mb-1">
              Target Platforms
            </span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {ideaDNA.platform.map((p, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/30">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Card 7: Primary & Secondary Goals */}
          <div className="glass-panel p-5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-1">
              Goals & KPIs
            </span>
            <p className="text-xs font-semibold text-white mb-2">
              🎯 {ideaDNA.primaryGoal}
            </p>
            <ul className="space-y-1 text-xs text-slate-300">
              {ideaDNA.secondaryGoals.map((g, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="text-emerald-400">•</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 8: Known Constraints */}
          <div className="glass-panel p-5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 block mb-1">
              Known Hard Constraints
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300 mt-2">
              {ideaDNA.knownConstraints.map((c, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 9: Potential Risks */}
          <div className="glass-panel p-5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-400 block mb-1">
              Potential Risks
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300 mt-2">
              {ideaDNA.potentialRisks.map((r, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
