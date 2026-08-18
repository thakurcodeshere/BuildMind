import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { calculateBlastRadius, BlastRadiusResult } from '../../utils/blastRadiusEngine';
import {
  Share2,
  AlertTriangle,
  Flame,
  ArrowRight,
  Database,
  Terminal,
  Layers,
  FileCheck2,
  ShieldAlert,
  Sparkles,
  Zap,
  Activity,
  Filter,
  RefreshCw
} from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  type: 'Requirement' | 'Database' | 'API' | 'Screen' | 'Test';
  category?: string;
  x: number;
  y: number;
}

export const DependenciesView: React.FC = () => {
  const { project } = useProject();
  const [selectedNodeId, setSelectedNodeId] = useState<string>(project.requirements[0]?.id || 'req_auth_01');
  const [simulationActive, setSimulationActive] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'Requirement' | 'Database' | 'API' | 'Screen'>('ALL');

  const blastResult: BlastRadiusResult = calculateBlastRadius(project, selectedNodeId);

  const handleSimulateChange = () => {
    setSimulationActive(true);
    setTimeout(() => {
      setSimulationActive(false);
    }, 4500);
  };

  // Generate node coordinates for interactive SVG Graph
  const nodes: GraphNode[] = [
    // Column 1: Requirements
    ...project.requirements.map((r, idx) => ({
      id: r.id,
      label: `[${r.code}] ${r.title.slice(0, 22)}...`,
      type: 'Requirement' as const,
      category: r.category,
      x: 80,
      y: 60 + idx * 85
    })),
    // Column 2: Database Entities
    ...project.databaseEntities.map((d, idx) => ({
      id: d.id,
      label: `table: ${d.tableName}`,
      type: 'Database' as const,
      x: 360,
      y: 75 + idx * 105
    })),
    // Column 3: API Endpoints
    ...project.apiEndpoints.map((a, idx) => ({
      id: a.id,
      label: `${a.method} ${a.path.slice(0, 20)}...`,
      type: 'API' as const,
      x: 640,
      y: 85 + idx * 115
    })),
    // Column 4: Screens & Tests
    ...project.screens.map((s, idx) => ({
      id: s.id,
      label: `UI: ${s.name.slice(0, 22)}...`,
      type: 'Screen' as const,
      x: 920,
      y: 70 + idx * 120
    }))
  ];

  const filteredNodes = activeFilter === 'ALL'
    ? nodes
    : nodes.filter(n => n.type === activeFilter);

  // Check if a node is impacted by current blast radius
  const isNodeImpacted = (nodeId: string) => {
    if (nodeId === selectedNodeId) return true;
    return blastResult.downstreamImpacts.some(imp => imp.id === nodeId);
  };

  const getNodeColor = (type: GraphNode['type'], isSelected: boolean, isImpacted: boolean) => {
    if (isSelected) return 'border-sky-400 bg-sky-500/20 text-sky-200 shadow-lg shadow-sky-500/30 ring-2 ring-sky-400';
    if (simulationActive && isImpacted) return 'border-rose-500 bg-rose-500/20 text-rose-200 shadow-lg shadow-rose-500/30 animate-pulse';
    
    switch (type) {
      case 'Requirement': return 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300 hover:border-indigo-400';
      case 'Database': return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:border-emerald-400';
      case 'API': return 'border-amber-500/40 bg-amber-500/10 text-amber-300 hover:border-amber-400';
      case 'Screen': return 'border-sky-500/40 bg-sky-500/10 text-sky-300 hover:border-sky-400';
      default: return 'border-slate-700 bg-slate-800 text-slate-300';
    }
  };

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                STAGE 16
              </span>
              <span className="text-xs text-slate-400 font-medium">Dependency Graph & Blast Radius Simulator</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              Dependency Graph & Blast Radius Visualizer
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              Every requirement possesses dependency awareness. Click any node or trigger a simulated modification to trace cascading ripple effects through Database tables, API endpoints, UI screens, and test suites.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 self-start lg:self-auto shadow-inner">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Graph Topology</span>
              <span className="text-base font-bold font-mono text-sky-400">
                {nodes.length} Connected Nodes
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <Share2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Control & Filter Bar */}
      <div className="glass-panel p-5 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Target Selector */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/30 flex-shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                Selected Focus Entity:
              </span>
              <select
                value={selectedNodeId}
                onChange={(e) => setSelectedNodeId(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:border-sky-500 w-full cursor-pointer"
              >
                <optgroup label="Requirements">
                  {project.requirements.map((r) => (
                    <option key={r.id} value={r.id}>
                      [{r.code}] {r.title}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Database Tables">
                  {project.databaseEntities.map((d) => (
                    <option key={d.id} value={d.id}>
                      Table: {d.tableName}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="flex items-center gap-2 self-end lg:self-auto">
            <button
              onClick={handleSimulateChange}
              disabled={simulationActive}
              className={`btn-primary text-xs px-4 py-2 flex items-center gap-2 ${
                simulationActive ? 'bg-rose-600 border-rose-400 animate-pulse' : ''
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${simulationActive ? 'animate-bounce text-yellow-300' : ''}`} />
              <span>{simulationActive ? 'Simulating Blast Radius Wave...' : 'Simulate Change Blast Radius'}</span>
            </button>
          </div>
        </div>

        {/* Live Blast Radius Result Card */}
        <div className={`p-4 rounded-xl border transition-all duration-300 ${
          simulationActive
            ? 'bg-rose-950/30 border-rose-500/60 shadow-xl shadow-rose-500/10'
            : 'bg-slate-950/70 border-slate-800'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${simulationActive ? 'text-rose-400 animate-bounce' : 'text-amber-400'}`} />
              <span className="text-xs font-bold text-white">
                {blastResult.warningMessage}
              </span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold self-start sm:self-auto border ${
              simulationActive
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}>
              Impact Score: {blastResult.impactScore}/100
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Visual Graph Canvas */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400 block">
              Interactive Topology Canvas
            </span>
            <h3 className="text-base font-bold text-white">
              Visual Cross-Domain Dependency Architecture
            </h3>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <span className="flex items-center gap-1 text-indigo-300"><span className="w-2 h-2 rounded-full bg-indigo-400" /> Requirements</span>
            <span className="flex items-center gap-1 text-emerald-300"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Database</span>
            <span className="flex items-center gap-1 text-amber-300"><span className="w-2 h-2 rounded-full bg-amber-400" /> APIs</span>
            <span className="flex items-center gap-1 text-sky-300"><span className="w-2 h-2 rounded-full bg-sky-400" /> UI Screens</span>
          </div>
        </div>

        {/* SVG Graph Viewport */}
        <div className="relative w-full overflow-x-auto bg-slate-950/90 rounded-xl p-4 border border-slate-800/80 min-h-[480px]">
          <svg className="w-[1080px] h-[520px]">
            {/* Grid background markers */}
            <defs>
              <pattern id="graph-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#1e293b" />
              </pattern>
              <linearGradient id="line-active-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#graph-grid)" />

            {/* Connecting Bezier Splines */}
            {project.requirements.map((r, rIdx) => {
              const rNode = nodes.find(n => n.id === r.id);
              if (!rNode) return null;

              return (
                <g key={`splines-${r.id}`}>
                  {project.databaseEntities.map((db, dIdx) => {
                    const dbNode = nodes.find(n => n.id === db.id);
                    if (!dbNode) return null;
                    const isSelected = r.id === selectedNodeId;
                    const isDownstream = isNodeImpacted(db.id) && isSelected;

                    const startX = rNode.x + 140;
                    const startY = rNode.y + 18;
                    const endX = dbNode.x;
                    const endY = dbNode.y + 18;
                    const c1X = startX + (endX - startX) * 0.5;
                    const c1Y = startY;
                    const c2X = startX + (endX - startX) * 0.5;
                    const c2Y = endY;

                    return (
                      <path
                        key={`edge-req-db-${r.id}-${db.id}`}
                        d={`M ${startX} ${startY} C ${c1X} ${c1Y}, ${c2X} ${c2Y}, ${endX} ${endY}`}
                        fill="none"
                        stroke={
                          simulationActive && isDownstream
                            ? 'url(#line-active-grad)'
                            : isSelected
                            ? 'rgba(56, 189, 248, 0.6)'
                            : 'rgba(148, 163, 184, 0.12)'
                        }
                        strokeWidth={simulationActive && isDownstream ? 2.5 : isSelected ? 2 : 1}
                        className={simulationActive && isDownstream ? 'animate-flow-line' : ''}
                      />
                    );
                  })}

                  {project.apiEndpoints.map((api, aIdx) => {
                    const apiNode = nodes.find(n => n.id === api.id);
                    const dbNode = nodes.find(n => n.id === project.databaseEntities[0]?.id);
                    if (!apiNode || !dbNode) return null;
                    const isSelected = r.id === selectedNodeId;

                    const startX = dbNode.x + 140;
                    const startY = dbNode.y + 18;
                    const endX = apiNode.x;
                    const endY = apiNode.y + 18;

                    return (
                      <path
                        key={`edge-db-api-${api.id}`}
                        d={`M ${startX} ${startY} C ${startX + 50} ${startY}, ${endX - 50} ${endY}, ${endX} ${endY}`}
                        fill="none"
                        stroke={simulationActive ? 'rgba(244, 63, 94, 0.4)' : 'rgba(148, 163, 184, 0.1)'}
                        strokeWidth={1.5}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>

          {/* HTML Interactive Node Overlay */}
          <div className="absolute inset-0 p-4 pointer-events-none">
            {nodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isImpacted = isNodeImpacted(node.id);

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    position: 'absolute'
                  }}
                  className={`pointer-events-auto w-48 p-2.5 rounded-xl border text-xs cursor-pointer transition-all duration-200 ${getNodeColor(
                    node.type,
                    isSelected,
                    isImpacted
                  )}`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase opacity-75">
                      {node.type}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-sky-400 status-dot-pulse" />
                    )}
                  </div>
                  <div className="font-semibold truncate font-mono text-[11px]">
                    {node.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
