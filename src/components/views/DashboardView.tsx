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
  DollarSign,
  Play,
  Cpu,
  Palette,
  ShieldCheck,
  Zap,
  RotateCcw
} from 'lucide-react';

interface DashboardViewProps {
  onOpenWhyModal?: (qId: string) => void;
  onNavigateToHub?: (hub: any, tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = () => {
  const { project, stats, setActiveTab, switchProject, resolveRedFlag } = useProject();

  const unresolvedFlags = project.redFlags.filter(f => !f.resolved);

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* High-Priority Red Flag Banner */}
      {unresolvedFlags.length > 0 && (
        <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 backdrop-blur-md relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 mt-0.5 flex-shrink-0">
                <Flame className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">
                    {unresolvedFlags.length} Critical Blocker{unresolvedFlags.length > 1 ? 's' : ''} Require Resolution
                  </h3>
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded bg-rose-500/30 text-rose-200 uppercase">
                    Stage 31 Red Flag Engine
                  </span>
                </div>
                <p className="text-xs text-rose-200/90 mt-1 max-w-2xl">
                  Autonomous AI code generation is paused until safety conflicts are resolved.
                </p>
                <div className="mt-3 space-y-2">
                  {unresolvedFlags.map((flag) => (
                    <div key={flag.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-slate-950/80 border border-rose-500/20 text-xs">
                      <div>
                        <span className="font-bold text-rose-300 font-mono mr-2">[{flag.severity}]</span>
                        <strong className="text-white">{flag.title}:</strong>
                        <span className="text-slate-300 ml-1">{flag.actionRequired}</span>
                      </div>
                      <button
                        onClick={() => resolveRedFlag(flag.id)}
                        className="self-end sm:self-auto px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition-colors shadow-sm"
                      >
                        Resolve Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('risks')}
              className="btn-secondary text-xs px-3.5 py-2 flex-shrink-0 hidden lg:flex"
            >
              Inspect Risk Matrix →
            </button>
          </div>
        </div>
      )}

      {/* Guided 5-Step Intent Compiler Journey */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400 block">
              Guided 5-Stage Intent Engineering Pipeline
            </span>
            <h2 className="text-xl font-bold text-white font-display">
              From Human Intent to Verified Software System
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Dependency-Aware Loop Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {[
            {
              step: '01',
              title: 'Idea Intake & DNA',
              desc: 'Structured problem, user personas & business model.',
              tab: 'idea',
              status: 'Completed',
              icon: Sparkles,
              accent: 'border-sky-500/30 text-sky-400 bg-sky-500/10'
            },
            {
              step: '02',
              title: '100 Questions',
              desc: 'Adaptive domain discovery with "Why?" explainability.',
              tab: 'discovery',
              status: `${project.questions.filter(q => q.status === 'answered').length}/${project.questions.length} Answered`,
              icon: Compass,
              accent: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10'
            },
            {
              step: '03',
              title: 'Assumption Firewall',
              desc: 'Audited requirement contracts & confidence scores.',
              tab: 'requirements',
              status: `${project.requirements.length} Contracts`,
              icon: FileCheck2,
              accent: 'border-amber-500/30 text-amber-400 bg-amber-500/10'
            },
            {
              step: '04',
              title: 'Architecture & DB',
              desc: 'Relational ERD, spatial indexes & API contract studio.',
              tab: 'database',
              status: `${project.databaseEntities.length} Tables Mapped`,
              icon: Database,
              accent: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
            },
            {
              step: '05',
              title: 'Build Contract',
              desc: 'Executable specification export & code verification.',
              tab: 'build-contract',
              status: project.isLocked ? 'Locked (v1.0)' : 'Draft Ready',
              icon: FileCode2,
              accent: 'border-sky-500/30 text-sky-400 bg-sky-500/10'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => setActiveTab(item.tab as any)}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      STEP {item.step}
                    </span>
                    <div className={`p-1.5 rounded-lg ${item.accent}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono font-semibold text-sky-400">
                  <span>{item.status}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Flagship Interactive Playground Switcher */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
          <div>
            <h3 className="text-base font-bold text-white font-display">
              Pre-Engineered Specification Blueprints
            </h3>
            <p className="text-xs text-slate-400">
              Switch projects to experience different vertical architectures and compliance frameworks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Blueprint 1: Logistics & Freight Booking */}
          <div
            onClick={() => switchProject('proj_logistics_truck_booking')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              project.id === 'proj_logistics_truck_booking'
                ? 'bg-sky-500/15 border-sky-400 shadow-lg shadow-sky-500/10'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <span>🚚 HaulStream Logistics Platform</span>
                {project.id === 'proj_logistics_truck_booking' && (
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-sky-500 text-white font-bold">
                    ACTIVE
                  </span>
                )}
              </span>
              <span className="text-[10px] font-mono text-slate-400">B2B Logistics</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Freight matching marketplace with sub-second PostGIS telemetry, cryptographic e-POD, and 2-phase Stripe Connect escrow settlement.
            </p>
          </div>

          {/* Blueprint 2: Telehealth & HIPAA EHR Platform */}
          <div
            onClick={() => switchProject('proj_healthtech_telemedicine')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              project.id === 'proj_healthtech_telemedicine'
                ? 'bg-sky-500/15 border-sky-400 shadow-lg shadow-sky-500/10'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <span>🏥 CuraLink Telehealth EHR</span>
                {project.id === 'proj_healthtech_telemedicine' && (
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-sky-500 text-white font-bold">
                    ACTIVE
                  </span>
                )}
              </span>
              <span className="text-[10px] font-mono text-slate-400">HIPAA Healthcare</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              HIPAA-compliant encrypted WebRTC consultations, SureScripts e-prescription routing, and AWS KMS envelope encryption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
