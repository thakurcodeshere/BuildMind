import React from 'react';
import { useProject } from '../../context/ProjectContext';
import {
  Sparkles,
  Compass,
  FileCheck2,
  Share2,
  Database,
  Terminal,
  ShieldAlert,
  GitBranch,
  ArrowRight,
  Flame,
  CheckCircle2,
  Layers,
  FileCode2,
  DollarSign
} from 'lucide-react';

export const DashboardView: React.FC<{ onOpenWhyModal: (qId: string) => void }> = () => {
  const { project, stats, setActiveTab, setActiveMode, resolveRedFlag } = useProject();

  const unresolvedFlags = project.redFlags.filter(f => !f.resolved);

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Red Flags Action Banner (if any unresolved) */}
      {unresolvedFlags.length > 0 && (
        <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 backdrop-blur-md">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 mt-0.5">
                <Flame className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">
                    {unresolvedFlags.length} Critical Architectural Red Flag{unresolvedFlags.length > 1 ? 's' : ''} Detected
                  </h3>
                  <span className="px-2 py-0.2 text-[10px] font-mono font-bold rounded bg-rose-500/30 text-rose-200">
                    STAGE 31 RED FLAG ENGINE
                  </span>
                </div>
                <p className="text-xs text-rose-200/90 mt-1 max-w-2xl">
                  Level 7 rules require all critical blockers to be resolved before an executable Build Contract can be generated for AI coding agents.
                </p>
                <div className="mt-3 space-y-2">
                  {unresolvedFlags.map((flag) => (
                    <div key={flag.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-900/80 border border-rose-500/20 text-xs">
                      <div>
                        <span className="font-bold text-rose-300 font-mono mr-2">[{flag.severity}]</span>
                        <span className="text-slate-200 font-semibold">{flag.title}:</span>
                        <span className="text-slate-400 ml-1">{flag.actionRequired}</span>
                      </div>
                      <button
                        onClick={() => resolveRedFlag(flag.id)}
                        className="self-end sm:self-auto px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 font-semibold text-[11px] transition-colors"
                      >
                        Apply Resolution
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('risks')}
              className="btn-secondary text-xs px-3 py-1.5 flex-shrink-0 hidden sm:flex"
            >
              View All Risks
            </button>
          </div>
        </div>
      )}

      {/* The Core Product Thesis & Level 7 Master Loop Visualizer */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400 font-mono">
              Stage 50: The Level 7 Master Loop
            </span>
            <h2 className="text-xl font-bold text-white font-display mt-0.5">
              From Human Intent to Verified Software System
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Continuous Dependency-Aware Feedback Loop Active</span>
          </div>
        </div>

        {/* Interactive Master Pipeline Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {[
            { step: '01', title: 'Capture Idea', mode: 'IDEA', tab: 'idea', icon: Sparkles },
            { step: '02', title: '100 Questions', mode: 'DISCOVERY', tab: 'discovery', icon: Compass },
            { step: '03', title: 'Assumption Firewall', mode: 'SPECIFICATION', tab: 'requirements', icon: FileCheck2 },
            { step: '04', title: 'Blast Radius', mode: 'ARCHITECTURE', tab: 'dependencies', icon: Share2 },
            { step: '05', title: 'DB & API Models', mode: 'ARCHITECTURE', tab: 'database', icon: Database },
            { step: '06', title: 'Security & Costs', mode: 'ARCHITECTURE', tab: 'integrations', icon: DollarSign },
            { step: '07', title: 'Build Contract', mode: 'BUILD', tab: 'build-contract', icon: FileCode2 },
            { step: '08', title: 'Code Verify', mode: 'VERIFY', tab: 'verify', icon: GitBranch }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => {
                  setActiveMode(item.mode as any);
                  setActiveTab(item.tab as any);
                }}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-sky-500/40 hover:bg-slate-800/50 transition-all cursor-pointer group text-center flex flex-col items-center justify-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-900 group-hover:bg-sky-500/20 text-slate-400 group-hover:text-sky-300 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 block">
                    STEP {item.step}
                  </span>
                  <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                    {item.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Domain Quick Launch Matrix */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white font-display">
              Active Software Engineering Domains (20 Segments)
            </h3>
            <p className="text-xs text-slate-400">
              Explore and refine each domain model before triggering autonomous AI build.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('discovery')}
            className="btn-ghost text-xs text-sky-400 hover:text-sky-300"
          >
            Manage Domains & Questions →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Intent & DNA */}
          <div
            onClick={() => setActiveTab('idea')}
            className="glass-panel-interactive p-5 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400">Stages 01-02</span>
              </div>
              <h4 className="text-base font-bold text-white mb-1">Idea Capture & DNA</h4>
              <p className="text-xs text-slate-300 line-clamp-2">
                {project.ideaDNA.problem}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-sky-400 font-semibold">
              <span>{project.ideaDNA.users.length} Personas Extracted</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Requirements & Firewall */}
          <div
            onClick={() => setActiveTab('requirements')}
            className="glass-panel-interactive p-5 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400">Stages 10-12</span>
              </div>
              <h4 className="text-base font-bold text-white mb-1">Assumption Firewall</h4>
              <p className="text-xs text-slate-300">
                Audited requirement contracts with confidence scores, source provenance, and conflict detector.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-300 font-semibold">
              <span>{project.requirements.length} Active Contracts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Database & Relations */}
          <div
            onClick={() => setActiveTab('database')}
            className="glass-panel-interactive p-5 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Database className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400">Stage 18</span>
              </div>
              <h4 className="text-base font-bold text-white mb-1">Database Blueprint</h4>
              <p className="text-xs text-slate-300">
                ACID schema definitions, spatial PostGIS indexes, soft-delete policies, and one-click DDL generator.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>{project.databaseEntities.length} Relational Tables</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: API Contracts Studio */}
          <div
            onClick={() => setActiveTab('apis')}
            className="glass-panel-interactive p-5 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Terminal className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400">Stage 19</span>
              </div>
              <h4 className="text-base font-bold text-white mb-1">API Contract Studio</h4>
              <p className="text-xs text-slate-300">
                REST/GraphQL specifications, request/response schemas, rate limits, and error code matrices.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-300 font-semibold">
              <span>{project.apiEndpoints.length} Endpoint Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 5: Security & Edge Cases */}
          <div
            onClick={() => setActiveTab('security')}
            className="glass-panel-interactive p-5 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400">Stages 23-25</span>
              </div>
              <h4 className="text-base font-bold text-white mb-1">Security & Edge Cases</h4>
              <p className="text-xs text-slate-300">
                Happy, Failure & Recovery path matrices, OWASP Top 10 rules, and privacy compliance.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-rose-300 font-semibold">
              <span>{project.edgeCases.length} Scenarios Mapped</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 6: Build Contract & Code Verification */}
          <div
            onClick={() => setActiveTab('build-contract')}
            className="glass-panel-interactive p-5 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <FileCode2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400">Stages 33-35</span>
              </div>
              <h4 className="text-base font-bold text-white mb-1">Build Contract & Handoff</h4>
              <p className="text-xs text-slate-300">
                Export single source of truth specifications for Claude, Cursor, Copilot, or run live code verification.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-sky-400 font-semibold">
              <span>Export & Verify →</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
