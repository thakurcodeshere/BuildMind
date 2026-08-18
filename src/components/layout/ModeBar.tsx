import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { ProductMode, NavigationTab } from '../../types/specification';
import {
  Lightbulb,
  Compass,
  FileCheck2,
  Layers,
  Palette,
  Hammer,
  ShieldCheck
} from 'lucide-react';

interface ModeDefinition {
  mode: ProductMode;
  label: string;
  tagline: string;
  targetTab: NavigationTab;
  icon: React.ElementType;
}

export const ModeBar: React.FC = () => {
  const { activeMode, setActiveMode, setActiveTab } = useProject();

  const modes: ModeDefinition[] = [
    {
      mode: 'IDEA',
      label: '1. Idea Capture',
      tagline: 'Raw concept intake',
      targetTab: 'idea',
      icon: Lightbulb
    },
    {
      mode: 'DISCOVERY',
      label: '2. Discovery',
      tagline: '100-Question breakdown',
      targetTab: 'discovery',
      icon: Compass
    },
    {
      mode: 'SPECIFICATION',
      label: '3. Specification',
      tagline: 'Assumption firewall',
      targetTab: 'requirements',
      icon: FileCheck2
    },
    {
      mode: 'ARCHITECTURE',
      label: '4. Architecture',
      tagline: 'System & DB modeling',
      targetTab: 'architecture',
      icon: Layers
    },
    {
      mode: 'DESIGN',
      label: '5. UI/UX & Motion',
      tagline: 'Screen & interaction specs',
      targetTab: 'ux-ui',
      icon: Palette
    },
    {
      mode: 'BUILD',
      label: '6. Build Contract',
      tagline: 'Executable AI handoff',
      targetTab: 'build-contract',
      icon: Hammer
    },
    {
      mode: 'VERIFY',
      label: '7. Code Verify',
      tagline: 'Spec vs Code drift audit',
      targetTab: 'verify',
      icon: ShieldCheck
    }
  ];

  const handleModeClick = (item: ModeDefinition) => {
    setActiveMode(item.mode);
    setActiveTab(item.targetTab);
  };

  return (
    <div className="w-full bg-slate-900/60 border-b border-slate-800/80 py-1.5 px-4 sm:px-6">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 font-mono hidden xl:inline-block flex-shrink-0">
          Engineering Mode:
        </span>
        <div className="flex items-center gap-1.5 w-full justify-between sm:justify-start">
          {modes.map((item) => {
            const Icon = item.icon;
            const isCurrent = activeMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => handleModeClick(item)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'bg-sky-500/20 text-sky-200 border border-sky-500/40 shadow-sm shadow-sky-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
