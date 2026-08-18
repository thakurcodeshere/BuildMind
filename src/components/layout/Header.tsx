import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  Unlock,
  ShieldCheck,
  Download,
  Settings,
  ChevronDown,
  Layers,
  Plus,
  Compass,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { FLAGSHIP_PROJECTS } from '../../data/flagshipProjects';

export const Header: React.FC = () => {
  const {
    project,
    history,
    loadProject,
    createNewDraft,
    setActiveModal,
    setActiveCategory,
    setActiveLayer
  } = useProject();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="h-14 bg-[#070a12] border-b border-white/[0.08] px-4 flex items-center justify-between shrink-0 select-none z-30">
      {/* Left: Project Selector & Status */}
      <div className="flex items-center gap-3">
        {/* Project Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20 transition-all group"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <div className="text-left">
              <div className="text-xs font-bold text-slate-100 truncate max-w-[200px] group-hover:text-cyan-300 transition-colors">
                {project.title}
              </div>
              <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                <span>{project.currentVersion}</span>
                <span>•</span>
                <span className="text-cyan-400">{project.domainCategory}</span>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-transform ml-1" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-80 bg-[#0a0e1a] border border-white/15 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-xl">
              <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">
                Flagship Project Templates
              </div>
              <div className="space-y-1 mt-1">
                {FLAGSHIP_PROJECTS.map((fp) => (
                  <button
                    key={fp.id}
                    onClick={() => {
                      loadProject(fp.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex flex-col ${
                      project.id === fp.id ? 'bg-cyan-950/40 border border-cyan-500/30 text-cyan-200' : 'hover:bg-white/[0.06] text-slate-300'
                    }`}
                  >
                    <span className="font-semibold text-slate-100">{fp.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">{fp.domainCategory}</span>
                  </button>
                ))}
              </div>

              <div className="border-t border-white/[0.08] my-2 pt-2">
                <button
                  onClick={() => {
                    createNewDraft();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Custom Intent Specification</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Spec Freeze Status Pill */}
        <button
          onClick={() => {
            setActiveCategory('build_drift');
            setActiveLayer('spec_freeze');
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border transition-all ${
            project.isSpecFrozen
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/40'
              : 'bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-900/40'
          }`}
          title="Click to manage Specification Freeze & Sign-Off"
        >
          {project.isSpecFrozen ? (
            <>
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>SPEC FROZEN (SSOT)</span>
            </>
          ) : (
            <>
              <Unlock className="w-3 h-3 text-amber-400" />
              <span>DRAFT (UNFROZEN)</span>
            </>
          )}
        </button>
      </div>

      {/* Right: Score Radar, Export, Settings */}
      <div className="flex items-center gap-2.5">
        {/* Readiness Score Quick Pill */}
        <button
          onClick={() => {
            setActiveCategory('build_drift');
            setActiveLayer('build_readiness');
          }}
          className="flex items-center gap-2 px-3 py-1 rounded-xl bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-300 text-xs font-mono font-bold transition-all shadow-sm"
        >
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>{project.readiness.overallScore}% Ready</span>
        </button>

        {/* Export Build Contract Button */}
        <button
          onClick={() => {
            setActiveCategory('build_drift');
            setActiveLayer('build_contract');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 hover:border-cyan-400 text-cyan-200 text-xs font-semibold hover:bg-cyan-500/30 transition-all shadow-sm"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>Build Contract</span>
        </button>

        {/* AI Settings Modal Toggle */}
        <button
          onClick={() => setActiveModal('settings')}
          className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors"
          title="AI Engine & Workspace Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
