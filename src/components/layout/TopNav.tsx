import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { NavigationTab } from '../../types/specification';
import {
  Layers,
  Sparkles,
  Lock,
  Unlock,
  Bot,
  Compass,
  FileCode2,
  Database,
  Terminal,
  ShieldAlert,
  GitBranch,
  FileText,
  Activity,
  Workflow,
  Radio,
  Share2,
  DollarSign,
  Palette,
  CheckCircle2,
  Cpu,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export type PrimaryHub = 'overview' | 'intent' | 'requirements' | 'architecture' | 'experience' | 'build';

interface TopNavProps {
  onOpenAskAI: () => void;
  activeHub: PrimaryHub;
  setActiveHub: (hub: PrimaryHub) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onOpenAskAI, activeHub, setActiveHub }) => {
  const { project, activeTab, setActiveTab, switchProject, stats } = useProject();

  const hubs: { id: PrimaryHub; label: string; defaultTab: NavigationTab; icon: React.ElementType; badge?: number }[] = [
    { id: 'overview', label: 'Dashboard', defaultTab: 'dashboard', icon: Activity },
    { id: 'intent', label: '1. Idea & DNA', defaultTab: 'idea', icon: Sparkles },
    { id: 'requirements', label: '2. Discovery & Spec', defaultTab: 'discovery', icon: Compass, badge: stats.unconfirmedAssumptionsCount },
    { id: 'architecture', label: '3. Architecture & Data', defaultTab: 'database', icon: Layers },
    { id: 'experience', label: '4. UX & Security', defaultTab: 'ux-ui', icon: Palette, badge: stats.criticalBlockersCount },
    { id: 'build', label: '5. Build & Verify', defaultTab: 'build-contract', icon: FileCode2 }
  ];

  const handleHubClick = (hub: typeof hubs[0]) => {
    setActiveHub(hub.id);
    setActiveTab(hub.defaultTab);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-2xl shadow-xl shadow-black/20">
      {/* Top Header Row */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand & Project Selector */}
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setActiveHub('overview');
              setActiveTab('dashboard');
            }}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-400 via-sky-600 to-indigo-700 p-0.5 flex items-center justify-center shadow-lg shadow-sky-500/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-sky-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight font-display text-white">
                  Intent<span className="text-sky-400">Forge</span>
                </span>
                <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/25 font-mono">
                  Level 7 Loop
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Software Intent Compiler</p>
            </div>
          </div>

          <div className="h-7 w-px bg-slate-800 hidden md:block" />

          {/* Project Switcher Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={project.id}
              onChange={(e) => switchProject(e.target.value)}
              aria-label="Select active project specification"
              className="bg-slate-900/90 border border-slate-700/80 text-slate-200 text-xs font-semibold rounded-xl px-3.5 py-2 focus:outline-none focus:border-sky-500 transition-all cursor-pointer hover:border-slate-600 shadow-inner"
            >
              <option value="proj_logistics_truck_booking">🚚 HaulStream (Fleet Logistics & Truck Booking)</option>
              <option value="proj_healthtech_telemedicine">🏥 CuraLink (Telehealth & HIPAA EHR Platform)</option>
            </select>

            {/* Spec Lock Status */}
            <div className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border ${
              project.isLocked 
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}>
              {project.isLocked ? <Lock className="w-3.5 h-3.5 text-emerald-400" /> : <Unlock className="w-3.5 h-3.5 text-amber-400" />}
              <span>{project.version}</span>
            </div>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-3">
          {/* Ask AI Trigger */}
          <button
            onClick={onOpenAskAI}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500/15 to-indigo-500/15 hover:from-sky-500/25 hover:to-indigo-500/25 text-sky-300 border border-sky-500/40 text-xs font-bold transition-all hover:scale-[1.02] shadow-sm shadow-sky-500/10"
          >
            <Bot className="w-4 h-4 text-sky-400 animate-pulse" />
            <span className="hidden sm:inline">Ask AI Compiler</span>
            <span className="sm:hidden">AI</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-slate-800/90 text-slate-300 rounded border border-slate-700">
              Cmd+K
            </kbd>
          </button>
        </div>
      </div>

      {/* 5 Primary Navigation Hubs (Clean, User-Friendly Stepper Hubs) */}
      <div className="w-full border-t border-slate-800/60 bg-slate-950/60 overflow-x-auto scrollbar-none">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-1 py-1.5 min-w-max">
          <div className="flex items-center gap-1.5 w-full justify-between sm:justify-start">
            {hubs.map((hub) => {
              const Icon = hub.icon;
              const isCurrent = activeHub === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() => handleHubClick(hub)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isCurrent
                      ? 'bg-sky-500/20 text-white border border-sky-500/50 shadow-sm shadow-sky-500/15'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isCurrent ? 'text-sky-400' : 'text-slate-500'}`} />
                  <span>{hub.label}</span>
                  {hub.badge !== undefined && hub.badge > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {hub.badge}
                    </span>
                  )}
                  {isCurrent && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-sky-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden xl:flex items-center gap-2 text-xs text-slate-400 pr-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-[11px]">Level 7 Engineered Loop</span>
          </div>
        </div>
      </div>
    </header>
  );
};
