import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import {
  DollarSign,
  Layers,
  Server,
  Database,
  Radio,
  Sliders,
  CheckCircle2,
  ExternalLink,
  Shield,
  ArrowRight
} from 'lucide-react';

export const IntegrationsCostView: React.FC = () => {
  const { project } = useProject();
  const [selectedUserScale, setSelectedUserScale] = useState<number>(10000);
  const [activeSubTab, setActiveSubTab] = useState<'costs' | 'integrations' | 'scalability'>('costs');

  const costEstimate = project.costEstimates[selectedUserScale] || project.costEstimates[10000];

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                STAGES 26, 27 & 28
              </span>
              <span className="text-xs text-slate-400 font-medium">3rd-Party Integrations, Scalability & Monthly Cost Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              Operating Cost Estimator & Scalability Strategy
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              Deterministic infrastructure and external API cost modeling across 1,000 to 1,000,000 active users. Balances MVP development speed with scalable cloud migration paths.
            </p>
          </div>

          {/* Sub-tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start lg:self-auto">
            <button
              onClick={() => setActiveSubTab('costs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'costs' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Cost Calculator</span>
            </button>
            <button
              onClick={() => setActiveSubTab('integrations')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'integrations' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Integrations ({project.integrations.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('scalability')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'scalability' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>MVP vs Scale Strategy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-view 1: Monthly Cost Calculator */}
      {activeSubTab === 'costs' && (
        <div className="space-y-6">
          {/* Scale Slider / Selector */}
          <div className="glass-panel p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-sky-400 block">
                  Interactive Scalability Horizon
                </span>
                <h3 className="text-lg font-bold text-white">
                  Simulate Monthly Active Users (MAU) Scale
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {[1000, 10000, 100000, 1000000].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => setSelectedUserScale(scale)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      selectedUserScale === scale
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {scale >= 1000000 ? '1M' : scale >= 1000 ? `${scale / 1000}k` : scale} Users
                  </button>
                ))}
              </div>
            </div>

            {/* Total Monthly Cost Display Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-slate-400 block">
                  Estimated Total Monthly Infrastructure & API Cost:
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">
                    ${costEstimate.monthlyTotalCostUsd.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400">/ month (USD)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Per User Operating Cost:</span>
                <span className="font-mono font-bold text-sky-300">
                  ${(costEstimate.monthlyTotalCostUsd / selectedUserScale).toFixed(3)} / active user
                </span>
              </div>
            </div>

            {/* Breakdown Grid */}
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-3">
                Granular Component Cost Breakdown:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[10px] uppercase">Database</span>
                  <span className="text-lg font-bold font-mono text-white">${costEstimate.breakdown.database}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[10px] uppercase">Compute / ECS</span>
                  <span className="text-lg font-bold font-mono text-white">${costEstimate.breakdown.compute}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[10px] uppercase">S3 Storage</span>
                  <span className="text-lg font-bold font-mono text-white">${costEstimate.breakdown.storage}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[10px] uppercase">Bandwidth / CDN</span>
                  <span className="text-lg font-bold font-mono text-white">${costEstimate.breakdown.bandwidth}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[10px] uppercase">3rd-Party APIs</span>
                  <span className="text-lg font-bold font-mono text-white">${costEstimate.breakdown.externalApis}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[10px] uppercase">AI Inference</span>
                  <span className="text-lg font-bold font-mono text-white">${costEstimate.breakdown.aiInference}</span>
                </div>
              </div>
            </div>

            {/* Assumptions List */}
            <div className="pt-3 border-t border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-2">
                Cost Modeling Assumptions:
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {costEstimate.assumptions.map((assump, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{assump}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Sub-view 2: Integrations */}
      {activeSubTab === 'integrations' && (
        <div className="space-y-4">
          {project.integrations.map((int) => (
            <div key={int.id} className="glass-panel p-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                    {int.category}
                  </span>
                  <h4 className="text-base font-bold text-white">{int.name}</h4>
                </div>
                <span className="text-xs font-mono text-amber-300">{int.estimatedCostUnit}</span>
              </div>

              <p className="text-xs text-slate-300">{int.purpose}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] font-mono pt-2">
                <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-500 block text-[9px] uppercase">Auth Strategy</span>
                  <span className="text-sky-300">{int.authMethod}</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-500 block text-[9px] uppercase">Data Flow</span>
                  <span className="text-indigo-300">{int.dataFlow}</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-500 block text-[9px] uppercase">Failure Fallback</span>
                  <span className="text-rose-300">{int.failureFallback}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub-view 3: Scalability Strategy */}
      {activeSubTab === 'scalability' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* MVP Architecture */}
          <div className="glass-panel p-6 space-y-4 border-sky-500/30">
            <span className="text-[10px] font-mono font-bold uppercase text-sky-400 block">
              Phase 1: MVP Architecture (0 - 10,000 MAU)
            </span>
            <h3 className="text-lg font-bold text-white">Monolithic & Fast Time-to-Market</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5" />
                <span>Single managed AWS RDS PostgreSQL with PostGIS & TimescaleDB extension.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5" />
                <span>Containerized Node.js API hosted on AWS ECS Fargate behind Application Load Balancer.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5" />
                <span>Cloudflare CDN caching for static assets and API edge caching.</span>
              </li>
            </ul>
          </div>

          {/* Scale Architecture */}
          <div className="glass-panel p-6 space-y-4 border-indigo-500/30">
            <span className="text-[10px] font-mono font-bold uppercase text-indigo-400 block">
              Phase 2: Scale Architecture (100,000+ MAU)
            </span>
            <h3 className="text-lg font-bold text-white">Distributed Event-Driven Multi-Region</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5" />
                <span>Apache Kafka / AWS MSK event backbone streaming 100k writes/sec telemetry points.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5" />
                <span>Distributed ClickHouse analytical cluster for high-speed fleet telemetry queries.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5" />
                <span>Multi-region Aurora PostgreSQL with global read replicas and active-active failover.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
