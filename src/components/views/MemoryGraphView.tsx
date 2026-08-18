import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { AIMemoryTier } from '../../types/specification';
import {
  Cpu,
  Brain,
  Layers,
  Lock,
  History,
  Sparkles,
  Shield,
  ArrowRight,
  Database,
  FileCode2
} from 'lucide-react';

export const MemoryGraphView: React.FC = () => {
  const { project } = useProject();
  const [selectedTier, setSelectedTier] = useState<string>('ALL');

  const tiersList: AIMemoryTier['tier'][] = [
    'Product Memory',
    'Decision Memory',
    'Requirement Memory',
    'Constraint Memory',
    'Architecture Memory',
    'User Preference Memory',
    'Change Memory'
  ];

  const filteredMemories = selectedTier === 'ALL'
    ? project.aiMemory
    : project.aiMemory.filter(m => m.tier === selectedTier);

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                STAGES 37 & 38
              </span>
              <span className="text-xs text-slate-400 font-medium">Knowledge Graph & 7-Tier Memory Architecture</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              Project Knowledge Graph & AI Memory Tiers
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              AI maintains a persistent 7-tier memory architecture to preserve product decisions, regulatory constraints, and architectural invariants across all prompt sessions.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 self-start lg:self-auto">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Memory Integrity</span>
              <span className="text-xs font-mono font-bold text-emerald-400">100% Immutable WORM</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Brain className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Stage 37: Knowledge Graph Architecture Cascade */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white font-display">
              Stage 37: Unified Project Knowledge Graph Hierarchy
            </h3>
            <p className="text-xs text-slate-400">
              Every software entity is connected via bi-directional relational graph edges.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
          <span className="p-2 rounded bg-sky-500/20 text-sky-300 font-bold">1. Human Idea</span>
          <ArrowRight className="w-4 h-4 text-slate-600" />
          <span className="p-2 rounded bg-indigo-500/20 text-indigo-300 font-bold">2. Requirements</span>
          <ArrowRight className="w-4 h-4 text-slate-600" />
          <span className="p-2 rounded bg-emerald-500/20 text-emerald-300 font-bold">3. Features</span>
          <ArrowRight className="w-4 h-4 text-slate-600" />
          <span className="p-2 rounded bg-amber-500/20 text-amber-300 font-bold">4. Workflows</span>
          <ArrowRight className="w-4 h-4 text-slate-600" />
          <span className="p-2 rounded bg-rose-500/20 text-rose-300 font-bold">5. Screens</span>
          <ArrowRight className="w-4 h-4 text-slate-600" />
          <span className="p-2 rounded bg-sky-500/20 text-sky-300 font-bold">6. APIs</span>
          <ArrowRight className="w-4 h-4 text-slate-600" />
          <span className="p-2 rounded bg-emerald-500/20 text-emerald-300 font-bold">7. Database</span>
          <ArrowRight className="w-4 h-4 text-slate-600" />
          <span className="p-2 rounded bg-indigo-500/20 text-indigo-300 font-bold">8. Tests</span>
        </div>
      </div>

      {/* Stage 38: 7 AI Memory Tiers Inspector */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Cpu className="w-4 h-4 text-sky-400" />
            <span>Stage 38: 7-Tier AI Memory Inspector</span>
          </h3>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedTier('ALL')}
              className={`px-2.5 py-1 rounded text-xs font-semibold ${
                selectedTier === 'ALL' ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Tiers ({project.aiMemory.length})
            </button>
            {tiersList.map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-2.5 py-1 rounded text-xs font-medium ${
                  selectedTier === tier
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMemories.map((mem) => (
            <div key={mem.id} className="glass-panel p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                    {mem.tier}
                  </span>
                  <h4 className="text-sm font-bold text-white">{mem.key}</h4>
                </div>
                {mem.immutable && (
                  <span className="flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <Lock className="w-3 h-3" />
                    <span>Immutable</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-lg border border-slate-800 font-mono">
                {mem.content}
              </p>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                <span>Timestamp: {mem.timestamp}</span>
                <span>Node Ref: {mem.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
