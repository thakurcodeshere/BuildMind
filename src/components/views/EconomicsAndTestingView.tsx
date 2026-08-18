import React, { useState } from 'react';
import {
  DollarSign,
  TestTube,
  Network,
  TrendingUp,
  Sliders,
  CheckCircle2,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { LayerId } from '../../types';
import { NodeGraphCanvas } from '../common/NodeGraphCanvas';

export const EconomicsAndTestingView: React.FC = () => {
  const { project, activeLayer, setActiveLayer } = useProject();

  const [simulatedScaleMultiplier, setSimulatedScaleMultiplier] = useState(1);

  const mvp = project.costScalability.mvpArchitecture;
  const scale = project.costScalability.scaleArchitecture;

  // Dynamic calculated estimate
  const currentTotal = Math.round(
    mvp.monthlyTotal + (scale.monthlyTotal - mvp.monthlyTotal) * ((simulatedScaleMultiplier - 1) / 9)
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#090d16] text-slate-100">
      {/* Sub-header Navigation */}
      <div className="px-6 py-3 border-b border-white/[0.08] bg-[#070a12] flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'cost_scalability' as LayerId, num: 19, label: 'Cost & Scalability Calculator' },
            { id: 'testing_layer' as LayerId, num: 21, label: 'Testing Engineering Layer' },
            { id: 'dependency_graph' as LayerId, num: 22, label: 'Cross-Domain Graph' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLayer(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeLayer === tab.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <span className="text-[10px] font-mono px-1 rounded bg-white/10">{tab.num}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
          <span>Economics & Testing Group</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* ======================================================== */}
        {/* LAYER 19: COST & SCALABILITY ENGINE */}
        {/* ======================================================== */}
        {activeLayer === 'cost_scalability' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 19 • Cost & Scalability Engine
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Interactive MVP vs Scale Architecture Cost Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Estimates operational unit costs across compute, database, vector storage, LLM token consumption, bandwidth, and identifies architectural bottlenecks.
              </p>
            </div>

            {/* Interactive Scale Slider */}
            <div className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-xs text-slate-200 uppercase font-mono">
                    Scale Simulation Slider
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-300">
                  Multiplier: <strong className="text-cyan-400 font-bold">{simulatedScaleMultiplier}x</strong> Scale
                </div>
              </div>

              <input
                type="range"
                min={1}
                max={10}
                value={simulatedScaleMultiplier}
                onChange={(e) => setSimulatedScaleMultiplier(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />

              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>1x: {mvp.targetScale}</span>
                <span>10x: {scale.targetScale}</span>
              </div>
            </div>

            {/* Cost Cards Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* MVP Cost Card */}
              <div className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-3">
                <span className="text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  MVP Architecture
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black font-mono text-white">${mvp.monthlyTotal}</span>
                  <span className="text-xs text-slate-400 font-mono">/ mo</span>
                </div>
                <p className="text-[11px] text-slate-400">{mvp.targetScale}</p>

                <div className="space-y-1.5 pt-2 border-t border-white/[0.06] text-xs font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Compute:</span>
                    <span>${mvp.computeCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Database:</span>
                    <span>${mvp.dbCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">AI / LLM Tokens:</span>
                    <span className="text-purple-300">${mvp.aiTokenCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bandwidth & 3rd Party:</span>
                    <span>${mvp.bandwidthCost + mvp.thirdPartyCost}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Simulated Live Card */}
              <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/40 space-y-3 shadow-lg shadow-cyan-500/10">
                <span className="text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Simulated Scale ({simulatedScaleMultiplier}x)
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black font-mono text-cyan-300">${currentTotal}</span>
                  <span className="text-xs text-slate-400 font-mono">/ mo</span>
                </div>
                <p className="text-[11px] text-cyan-200">Live interpolated infrastructure spend</p>

                <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-[11px] text-slate-300 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span>Est. Cost per 1k Trans:</span>
                    <span className="text-emerald-400 font-bold">${(currentTotal / 50).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>P99 Target Latency:</span>
                    <span className="text-cyan-400">&lt; 180ms</span>
                  </div>
                </div>
              </div>

              {/* Scale Architecture Card */}
              <div className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-3">
                <span className="text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Scale Architecture
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black font-mono text-white">${scale.monthlyTotal}</span>
                  <span className="text-xs text-slate-400 font-mono">/ mo</span>
                </div>
                <p className="text-[11px] text-slate-400">{scale.targetScale}</p>

                <div className="space-y-1.5 pt-2 border-t border-white/[0.06] text-xs font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Compute:</span>
                    <span>${scale.computeCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Database:</span>
                    <span>${scale.dbCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">AI / LLM Tokens:</span>
                    <span className="text-purple-300">${scale.aiTokenCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bandwidth & 3rd Party:</span>
                    <span>${scale.bandwidthCost + scale.thirdPartyCost}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Identified Scaling Bottlenecks */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase block">
                Identified Scaling Bottlenecks & Architectural Mitigations:
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {project.costScalability.scalingBottlenecks.map((b, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 21: TESTING ENGINEERING LAYER */}
        {/* ======================================================== */}
        {activeLayer === 'testing_layer' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 21 • Testing Engineering Layer
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Automatically Derived Test Suite Matrix
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Derived Unit, Integration, API contract, Security penetration, and End-to-End tests tied directly to traceable requirements.
              </p>
            </div>

            <div className="space-y-3.5">
              {project.testCases.map((tc) => (
                <div key={tc.id} className="p-4 rounded-xl bg-[#0b0f19] border border-white/10 space-y-2.5 text-xs shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {tc.suiteType} Test
                      </span>
                      <span className="font-bold text-slate-100">{tc.targetComponent}</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400">
                      Traceable: {tc.traceableRequirementId}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-1">
                    <p className="text-slate-300"><strong>Scenario:</strong> {tc.testScenario}</p>
                    <p className="text-emerald-400 font-mono text-[11px]"><strong>Expected Output:</strong> {tc.expectedResult}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 22: CROSS-DOMAIN DEPENDENCY GRAPH */}
        {/* ======================================================== */}
        {activeLayer === 'dependency_graph' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 22 • Cross-Domain Dependency Graph
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Interactive Cross-System Traceability Graph
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every requirement, feature contract, API endpoint, database table, and cloud component is connected. The impact of any future modification is computed instantly.
              </p>
            </div>

            {/* Visual Node Graph Canvas */}
            <NodeGraphCanvas nodes={project.dependencyNodes} />
          </div>
        )}
      </div>
    </div>
  );
};
