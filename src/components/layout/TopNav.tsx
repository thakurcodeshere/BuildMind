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
  Cpu
} from 'lucide-react';

interface TabItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  badgeCount?: number;
}

export const TopNav: React.FC<{ onOpenAskAI: () => void }> = ({ onOpenAskAI }) => {
  const { project, activeTab, setActiveTab, switchProject, stats } = useProject();

  const tabs: TabItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'idea', label: 'Idea DNA', icon: Sparkles },
    { id: 'discovery', label: 'Discovery', icon: Compass, badgeCount: stats.openQuestionsCount },
    { id: 'requirements', label: 'Requirements', icon: FileText, badgeCount: stats.unconfirmedAssumptionsCount },
    { id: 'actors-workflows', label: 'Actors & Workflows', icon: Workflow },
    { id: 'dependencies', label: 'Dependencies & Blast Radius', icon: Share2 },
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'database', label: 'Database Blueprint', icon: Database },
    { id: 'apis', label: 'API Contracts', icon: Terminal },
    { id: 'ux-ui', label: 'UX/UI & Motion', icon: Palette },
    { id: 'security', label: 'Security & Edge Cases', icon: ShieldAlert },
    { id: 'integrations', label: 'Integrations & Cost', icon: DollarSign },
    { id: 'testing', label: 'Testing Matrix', icon: CheckCircle2 },
    { id: 'risks', label: 'Red Flags', icon: Radio, badgeCount: stats.criticalBlockersCount },
    { id: 'build-contract', label: 'Build Contract', icon: FileCode2 },
    { id: 'verify', label: 'Code Verification', icon: GitBranch },
    { id: 'memory-graph', label: 'AI Memory & Graph', icon: Cpu }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      {/* Top Header Row */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand & Project Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 via-sky-600 to-indigo-700 p-0.5 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-sky-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight font-display text-white">
                  Intent<span className="text-sky-400">Forge</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
                  Level 7 Loop
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Software Intent Compiler</p>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800 hidden md:block" />

          {/* Project Switcher Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={project.id}
              onChange={(e) => switchProject(e.target.value)}
              aria-label="Select active project specification"
              className="bg-slate-900 border border-slate-700/70 text-slate-200 text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:border-sky-500 transition-colors cursor-pointer"
            >
              <option value="proj_logistics_truck_booking">🚚 HaulStream (Fleet Logistics & Truck Booking)</option>
              <option value="proj_healthtech_telemedicine">🏥 CuraLink (Telehealth & HIPAA EHR Platform)</option>
            </select>

            {/* Spec Lock Status */}
            <div className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium border ${
              project.isLocked 
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}>
              {project.isLocked ? <Lock className="w-3 h-3 text-emerald-400" /> : <Unlock className="w-3 h-3 text-amber-400" />}
              <span>{project.version}</span>
            </div>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-3">
          {/* Ask AI Trigger */}
          <button
            onClick={onOpenAskAI}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-semibold transition-all hover:scale-[1.02] shadow-sm shadow-sky-500/10"
          >
            <Bot className="w-4 h-4 text-sky-400 animate-pulse" />
            <span>Ask AI State Compiler</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-slate-800 text-slate-300 rounded border border-slate-700">
              Cmd+K
            </kbd>
          </button>
        </div>
      </div>

      {/* Domain Navigation Tabs (Horizontal Scrollable) */}
      <div className="w-full border-t border-slate-800/60 overflow-x-auto scrollbar-none">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 flex items-center gap-1 py-1 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-slate-800/90 text-white font-semibold shadow-inner border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold font-mono ${
                    tab.id === 'risks' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {tab.badgeCount}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-sky-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
