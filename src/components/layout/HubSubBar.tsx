import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { NavigationTab } from '../../types/specification';
import { PrimaryHub } from './TopNav';
import {
  Sparkles,
  Cpu,
  Compass,
  FileText,
  Radio,
  Database,
  Terminal,
  Workflow,
  Share2,
  Layers,
  Palette,
  ShieldAlert,
  DollarSign,
  CheckCircle2,
  FileCode2,
  GitBranch
} from 'lucide-react';

interface HubSubBarProps {
  activeHub: PrimaryHub;
}

interface SubTabItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  count?: number;
}

export const HubSubBar: React.FC<HubSubBarProps> = ({ activeHub }) => {
  const { activeTab, setActiveTab, stats } = useProject();

  if (activeHub === 'overview') {
    return null;
  }

  const getSubTabs = (): SubTabItem[] => {
    switch (activeHub) {
      case 'intent':
        return [
          { id: 'idea', label: 'Idea Intake & DNA', icon: Sparkles },
          { id: 'memory-graph', label: '7-Tier AI Memory & Knowledge Graph', icon: Cpu }
        ];
      case 'requirements':
        return [
          { id: 'discovery', label: '100-Question Discovery', icon: Compass, count: stats.openQuestionsCount },
          { id: 'requirements', label: 'Assumption Firewall', icon: FileText, count: stats.unconfirmedAssumptionsCount },
          { id: 'risks', label: 'Architectural Red Flags', icon: Radio, count: stats.criticalBlockersCount }
        ];
      case 'architecture':
        return [
          { id: 'database', label: 'Database Blueprint & ERD', icon: Database },
          { id: 'apis', label: 'API Contracts Studio', icon: Terminal },
          { id: 'actors-workflows', label: 'Workflows & RBAC Matrix', icon: Workflow },
          { id: 'dependencies', label: 'Blast Radius Graph', icon: Share2 },
          { id: 'architecture', label: 'System Topology', icon: Layers }
        ];
      case 'experience':
        return [
          { id: 'ux-ui', label: 'UX/UI & 6-State Mockups', icon: Palette },
          { id: 'security', label: 'Security & Edge Cases', icon: ShieldAlert },
          { id: 'integrations', label: 'Integrations & Cost Calculator', icon: DollarSign },
          { id: 'testing', label: 'Testing Matrix', icon: CheckCircle2 }
        ];
      case 'build':
        return [
          { id: 'build-contract', label: 'Build Contract & Exporters', icon: FileCode2 },
          { id: 'verify', label: 'Specification → Code Verification', icon: GitBranch }
        ];
    }
  };

  const subTabs = getSubTabs();

  return (
    <div className="w-full bg-slate-900/60 border-b border-slate-800/80 py-2 px-4 sm:px-6">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mr-2">
            Section:
          </span>
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-sky-500/20 text-sky-200 border border-sky-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
