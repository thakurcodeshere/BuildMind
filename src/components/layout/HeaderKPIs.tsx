import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { ReadinessMeter } from '../common/ReadinessMeter';
import {
  FileText,
  AlertTriangle,
  Flame,
  Share2,
  Lock,
  Unlock,
  ShieldCheck,
  CheckCircle2,
  Terminal
} from 'lucide-react';

export const HeaderKPIs: React.FC = () => {
  const { project, stats, setActiveTab } = useProject();

  return (
    <div className="max-w-[1700px] mx-auto px-4 sm:px-6 pt-6 pb-2">
      {/* Title & Tagline Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              {project.name}
            </h1>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
              project.isLocked 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}>
              {project.version}
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1 font-medium max-w-3xl">
            {project.tagline}
          </p>
        </div>

        {/* Global Readiness Gauge Widget */}
        <div className="flex items-center gap-6 p-3 px-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl self-start lg:self-auto">
          <ReadinessMeter score={stats.buildReadinessScore} />
        </div>
      </div>

      {/* Metric Chips Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        {/* Metric 1: Requirement Coverage */}
        <div 
          onClick={() => setActiveTab('requirements')}
          className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-400">Coverage</span>
            <FileText className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-white">{stats.requirementCoverage}%</span>
            <span className="text-[10px] text-slate-500">{project.requirements.length} rules</span>
          </div>
        </div>

        {/* Metric 2: Architecture Confidence */}
        <div 
          onClick={() => setActiveTab('architecture')}
          className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-400">Architecture</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-white">{stats.architectureConfidence}%</span>
            <span className="text-[10px] text-slate-500">{project.databaseEntities.length} entities</span>
          </div>
        </div>

        {/* Metric 3: Critical Blockers */}
        <div 
          onClick={() => setActiveTab('risks')}
          className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-rose-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-400">Blockers</span>
            <Flame className={`w-4 h-4 ${stats.criticalBlockersCount > 0 ? 'text-rose-400 animate-pulse' : 'text-slate-500'}`} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-xl font-bold font-mono ${stats.criticalBlockersCount > 0 ? 'text-rose-400' : 'text-slate-200'}`}>
              {stats.criticalBlockersCount}
            </span>
            <span className="text-[10px] text-slate-500">unresolved</span>
          </div>
        </div>

        {/* Metric 4: Assumptions Pending */}
        <div 
          onClick={() => setActiveTab('requirements')}
          className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-400">Assumptions</span>
            <AlertTriangle className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-amber-300">{stats.unconfirmedAssumptionsCount}</span>
            <span className="text-[10px] text-slate-500">pending</span>
          </div>
        </div>

        {/* Metric 5: Tracked Dependencies */}
        <div 
          onClick={() => setActiveTab('dependencies')}
          className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-sky-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-400">Dependencies</span>
            <Share2 className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-white">{stats.totalDependenciesCount}</span>
            <span className="text-[10px] text-slate-500">graph nodes</span>
          </div>
        </div>

        {/* Metric 6: Spec Version & Lock */}
        <div 
          onClick={() => setActiveTab('build-contract')}
          className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-400">Spec Lock</span>
            {project.isLocked ? <Lock className="w-4 h-4 text-emerald-400" /> : <Unlock className="w-4 h-4 text-amber-400" />}
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold font-mono text-white truncate">{project.version}</span>
            <span className={`text-[10px] font-semibold ${project.isLocked ? 'text-emerald-400' : 'text-amber-400'}`}>
              {project.isLocked ? 'LOCKED' : 'DRAFT'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
