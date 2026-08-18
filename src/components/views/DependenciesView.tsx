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
  ShieldAlert
} from 'lucide-react';

export const DependenciesView: React.FC = () => {
  const { project } = useProject();
  const [selectedNodeId, setSelectedNodeId] = useState<string>(project.requirements[0]?.id || 'req_auth_01');
  const [simulationActive, setSimulationActive] = useState<boolean>(false);

  const blastResult: BlastRadiusResult = calculateBlastRadius(project, selectedNodeId);

  const handleSimulateChange = () => {
    setSimulationActive(true);
    setTimeout(() => {
      setSimulationActive(false);
    }, 4000);
  };

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                STAGE 16
              </span>
              <span className="text-xs text-slate-400 font-medium">Dependency Graph & Blast Radius Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              Dependency Graph & Blast Radius Simulator
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              Every requirement has dependency awareness. Changing a single business rule calculates its cascading ripple effect across Database tables, API endpoints, UI screens, and test suites to prevent specification drift.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 self-start lg:self-auto">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Graph Nodes</span>
              <span className="text-base font-bold font-mono text-sky-400">
                {project.requirements.length + project.databaseEntities.length + project.apiEndpoints.length + project.screens.length} Connected Entities
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <Share2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Simulator Control Panel */}
      <div className="glass-panel p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Blast Radius Target Selector
            </span>
            <h3 className="text-lg font-bold text-white">
              Select an Entity to Simulate Architectural Modification
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedNodeId}
              onChange={(e) => setSelectedNodeId(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg px-3.5 py-2 focus:outline-none focus:border-sky-500"
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

            <button
              onClick={handleSimulateChange}
              className={`btn-primary text-xs px-4 py-2 ${simulationActive ? 'animate-pulse bg-rose-600' : ''}`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Simulate Change Blast Radius</span>
            </button>
          </div>
        </div>

        {/* Live Blast Radius Result Card */}
        <div className={`p-5 rounded-xl border transition-all ${
          simulationActive
            ? 'bg-rose-950/20 border-rose-500/60 shadow-xl shadow-rose-500/10 animate-view-in'
            : 'bg-slate-950/60 border-slate-800'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className={`w-5 h-5 ${simulationActive ? 'text-rose-400 animate-bounce' : 'text-amber-400'}`} />
              <h4 className="text-base font-bold text-white">
                {blastResult.warningMessage}
              </h4>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Impact Score: {blastResult.impactScore}/100
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
              Directly Affected Downstream Components ({blastResult.downstreamImpacts.length}):
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {blastResult.downstreamImpacts.map((imp, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border text-xs flex items-start gap-3 ${
                    simulationActive
                      ? 'bg-rose-500/10 border-rose-500/40 text-rose-200'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="p-1.5 rounded bg-slate-800 text-sky-400 mt-0.5">
                    {imp.type === 'Database' && <Database className="w-3.5 h-3.5" />}
                    {imp.type === 'API' && <Terminal className="w-3.5 h-3.5" />}
                    {imp.type === 'Screen' && <Layers className="w-3.5 h-3.5" />}
                    {imp.type === 'Test' && <FileCheck2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{imp.title}</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-800 text-slate-400">
                        {imp.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{imp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
