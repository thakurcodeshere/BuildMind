import React, { useState } from 'react';
import { DependencyNode } from '../../types';
import { ZoomIn, ZoomOut, RotateCcw, Layers, ArrowRight } from 'lucide-react';

interface NodeGraphCanvasProps {
  nodes: DependencyNode[];
  onSelectNode?: (node: DependencyNode) => void;
}

export const NodeGraphCanvas: React.FC<NodeGraphCanvasProps> = ({ nodes, onSelectNode }) => {
  const [zoom, setZoom] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const typeColors: Record<DependencyNode['type'], { bg: string; border: string; text: string; dot: string }> = {
    Requirement: { bg: 'bg-blue-950/40', border: 'border-blue-500/50', text: 'text-blue-300', dot: 'bg-blue-400' },
    Feature: { bg: 'bg-indigo-950/40', border: 'border-indigo-500/50', text: 'text-indigo-300', dot: 'bg-indigo-400' },
    Role: { bg: 'bg-purple-950/40', border: 'border-purple-500/50', text: 'text-purple-300', dot: 'bg-purple-400' },
    Screen: { bg: 'bg-cyan-950/40', border: 'border-cyan-500/50', text: 'text-cyan-300', dot: 'bg-cyan-400' },
    API: { bg: 'bg-emerald-950/40', border: 'border-emerald-500/50', text: 'text-emerald-300', dot: 'bg-emerald-400' },
    Database: { bg: 'bg-amber-950/40', border: 'border-amber-500/50', text: 'text-amber-300', dot: 'bg-amber-400' },
    Integration: { bg: 'bg-rose-950/40', border: 'border-rose-500/50', text: 'text-rose-300', dot: 'bg-rose-400' },
    Infra: { bg: 'bg-teal-950/40', border: 'border-teal-500/50', text: 'text-teal-300', dot: 'bg-teal-400' }
  };

  const handleNodeClick = (node: DependencyNode) => {
    setSelectedNodeId(node.id);
    if (onSelectNode) onSelectNode(node);
  };

  return (
    <div className="relative w-full h-full min-h-[420px] bg-[#06080f] rounded-xl border border-white/10 overflow-hidden flex flex-col select-none">
      {/* Canvas Controls Toolbar */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 p-1 rounded-lg bg-slate-900/90 border border-white/10 backdrop-blur-md shadow-lg">
        <button
          onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
          className="p-1.5 rounded hover:bg-white/10 text-slate-300 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.7, z - 0.1))}
          className="p-1.5 rounded hover:bg-white/10 text-slate-300 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setZoom(1)}
          className="p-1.5 rounded hover:bg-white/10 text-slate-300 transition-colors text-[11px] font-mono px-1"
          title="Reset Zoom"
        >
          {Math.round(zoom * 100)}%
        </button>
      </div>

      {/* Canvas Visual Grid Layer */}
      <div
        className="flex-1 p-8 overflow-auto flex items-center justify-center"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
          transition: 'transform 0.15s ease-out'
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-6 max-w-4xl">
          {nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const style = typeColors[node.type] || typeColors.Requirement;

            return (
              <div
                key={node.id}
                onClick={() => handleNodeClick(node)}
                className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer shadow-md ${style.bg} ${style.border} ${
                  isSelected ? 'ring-2 ring-cyan-400 scale-105 shadow-cyan-500/20' : 'hover:scale-[1.03]'
                }`}
                style={{ width: '220px' }}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] uppercase font-bold font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                    {node.type}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">{node.domain}</span>
                </div>

                <h4 className="font-semibold text-xs text-slate-100 line-clamp-1 mb-1">{node.name}</h4>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-2 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400">Up:</span>
                    <span className="font-bold text-slate-200">{node.upstreamIds.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400">Down:</span>
                    <span className="font-bold text-cyan-400">{node.downstreamIds.length}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="px-4 py-2 border-t border-white/10 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive Cross-Domain Dependency Graph • {nodes.length} connected entities</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-[10px]">Req</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <span className="text-[10px]">Feature</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[10px]">API</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-[10px]">DB</span>
          </div>
        </div>
      </div>
    </div>
  );
};
