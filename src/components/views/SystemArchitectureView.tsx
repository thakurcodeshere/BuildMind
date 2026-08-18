import React, { useState } from 'react';
import {
  Server,
  Database,
  Globe,
  Boxes,
  Cpu,
  Layers,
  Key,
  Shield,
  Clock,
  ArrowRight,
  Code2,
  Terminal
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { LayerId } from '../../types';
import { CodeBlock } from '../common/CodeBlock';

export const SystemArchitectureView: React.FC = () => {
  const { project, activeLayer, setActiveLayer } = useProject();

  const [selectedEntityIdx, setSelectedEntityIdx] = useState(0);
  const [selectedApiIdx, setSelectedApiIdx] = useState(0);

  const activeEntity = project.dataEntities[selectedEntityIdx] || project.dataEntities[0];
  const activeApi = project.apiEndpoints[selectedApiIdx] || project.apiEndpoints[0];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#090d16] text-slate-100">
      {/* Sub-header Navigation */}
      <div className="px-6 py-3 border-b border-white/[0.08] bg-[#070a12] flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'architecture_engine' as LayerId, num: 10, label: 'System Architecture' },
            { id: 'data_engineering' as LayerId, num: 11, label: 'Data & Database Schema' },
            { id: 'api_engineering' as LayerId, num: 12, label: 'API Engineering Layer' },
            { id: 'integration_layer' as LayerId, num: 17, label: '3rd-Party Integrations' },
            { id: 'infrastructure_compute' as LayerId, num: 18, label: 'Infrastructure & Compute' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLayer(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeLayer === tab.id
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <span className="text-[10px] font-mono px-1 rounded bg-white/10">{tab.num}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
          <span>System Architecture Group</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* ======================================================== */}
        {/* LAYER 10: SYSTEM ARCHITECTURE */}
        {/* ======================================================== */}
        {activeLayer === 'architecture_engine' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-blue-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 10 • System Architecture Engine
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Full-Stack Architecture & Runtime Layers
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                System boundaries, data flow topologies, concurrency guarantees, and redundancy invariants.
              </p>
            </div>

            <div className="space-y-4">
              {project.architecture.map((layer, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-3.5 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs font-mono">
                        0{idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{layer.layerName}</h4>
                        <span className="text-xs font-mono text-cyan-400">{layer.technology}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10 font-bold">
                      {layer.pattern}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Primary Responsibilities</span>
                      <ul className="space-y-1 text-slate-300 text-[11px]">
                        {layer.responsibilities.map((r, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-blue-400" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">System Invariants & SLAs</span>
                      <ul className="space-y-1 text-slate-300 text-[11px]">
                        {layer.invariants.map((inv, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-400" />
                            <span>{inv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-500/20 text-[11px] text-blue-300 font-mono flex items-center justify-between">
                    <span>Redundancy Strategy:</span>
                    <span className="font-semibold text-slate-200">{layer.redundancyStrategy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 11: DATA ENGINEERING & SCHEMA LAYER */}
        {/* ======================================================== */}
        {activeLayer === 'data_engineering' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-blue-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 11 • Data Engineering & Schema Modeler
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Relational Entity Modeling & Data Lifecycle
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Normalized database schemas, primary/foreign keys, indexes, retention windows, and row-level audit strategies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Entity Selector */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase font-mono px-1">
                  Database Entities ({project.dataEntities.length})
                </div>
                {project.dataEntities.map((ent, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedEntityIdx(idx)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedEntityIdx === idx
                        ? 'bg-blue-950/40 border-blue-500/50 text-blue-200 shadow-md'
                        : 'bg-[#0b0f19] border-white/10 hover:border-white/20 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-100">{ent.name}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 font-mono text-slate-400">
                        {ent.attributes.length} cols
                      </span>
                    </div>
                    <span className="text-[10px] text-cyan-400 font-mono block mt-0.5">{ent.tableName}</span>
                  </div>
                ))}
              </div>

              {/* Entity Details Table */}
              {activeEntity && (
                <div className="md:col-span-2 p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <div>
                      <h4 className="font-bold text-base text-white">{activeEntity.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{activeEntity.description}</p>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-500/30">
                      Table: {activeEntity.tableName}
                    </span>
                  </div>

                  {/* Columns Table */}
                  <div className="rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.03] text-[10px] uppercase font-mono text-slate-400">
                          <th className="p-2.5">Column Name</th>
                          <th className="p-2.5">SQL Type</th>
                          <th className="p-2.5">Constraints</th>
                          <th className="p-2.5">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        {activeEntity.attributes.map((attr, i) => (
                          <tr key={i} className="hover:bg-white/[0.02]">
                            <td className="p-2.5 font-mono text-cyan-300 font-semibold">{attr.name}</td>
                            <td className="p-2.5 font-mono text-amber-300">{attr.type}</td>
                            <td className="p-2.5">
                              {attr.isPrimary && (
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold mr-1">
                                  PK
                                </span>
                              )}
                              {attr.isUnique && (
                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-bold mr-1">
                                  UQ
                                </span>
                              )}
                            </td>
                            <td className="p-2.5 text-[11px] text-slate-400">{attr.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Indexes & Retention */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Indexes</span>
                      <ul className="mt-1 space-y-0.5 text-cyan-300 font-mono text-[10px]">
                        {activeEntity.indexes.map((idx, i) => (
                          <li key={i}>• {idx}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Retention Policy</span>
                      <p className="text-slate-300 text-[11px] mt-1">{activeEntity.retentionPolicy}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 12: API ENGINEERING LAYER */}
        {/* ======================================================== */}
        {activeLayer === 'api_engineering' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-blue-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 12 • API Engineering Layer
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                OpenAPI 3.1 Endpoint Contracts & Schemas
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Formal REST / GraphQL contracts with request validation schemas, error contracts, and idempotency guarantees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Endpoint List */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase font-mono px-1">
                  Endpoints ({project.apiEndpoints.length})
                </div>
                {project.apiEndpoints.map((ep, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedApiIdx(idx)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedApiIdx === idx
                        ? 'bg-blue-950/40 border-blue-500/50 text-blue-200 shadow-md'
                        : 'bg-[#0b0f19] border-white/10 hover:border-white/20 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          ep.method === 'GET'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : ep.method === 'POST'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {ep.method}
                      </span>
                      <span className="font-mono text-xs text-slate-200 truncate">{ep.path}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{ep.summary}</p>
                  </div>
                ))}
              </div>

              {/* Endpoint Detail */}
              {activeApi && (
                <div className="md:col-span-2 p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        {activeApi.method}
                      </span>
                      <span className="font-mono text-sm font-bold text-white">{activeApi.path}</span>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold">{activeApi.rateLimit}</span>
                  </div>

                  <p className="text-xs text-slate-300">{activeApi.summary}</p>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Auth Strategy</span>
                      <p className="text-slate-300 mt-1 font-mono text-[11px]">{activeApi.authStrategy}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Idempotency Required</span>
                      <p className="text-emerald-400 mt-1 font-mono text-[11px] font-bold">
                        {activeApi.idempotencyRequired ? 'Yes (Idempotency-Key Header)' : 'No (Safe Read / Idempotent)'}
                      </p>
                    </div>
                  </div>

                  {/* Request Schema */}
                  {activeApi.requestSchema && activeApi.requestSchema !== 'N/A' && (
                    <CodeBlock code={activeApi.requestSchema} language="json" filename="Request Payload DTO" />
                  )}

                  {/* Response Schema */}
                  {activeApi.responseSchema && (
                    <CodeBlock code={activeApi.responseSchema} language="json" filename="Response Payload DTO" />
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 17: INTEGRATION ENGINEERING LAYER */}
        {/* ======================================================== */}
        {activeLayer === 'integration_layer' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-blue-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 17 • Integration Engineering Layer
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                3rd-Party Service Dependencies (Purpose ➔ Data ➔ Auth ➔ Dependency ➔ Failure ➔ Cost)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Formal models for every external SaaS, API gateway, LLM provider, and bank connection.
              </p>
            </div>

            <div className="space-y-4">
              {project.integrations.map((integ, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-3.5 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{integ.serviceCategory}</span>
                      <h4 className="font-bold text-base text-white mt-0.5">{integ.providerName}</h4>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {integ.dependencyCriticality}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">{integ.purpose}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Data Exchanged</span>
                      <p className="text-slate-300 mt-1 text-[11px]">{integ.dataExchanged}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Auth Handshake</span>
                      <p className="text-cyan-300 font-mono text-[11px] mt-1">{integ.authMethod}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Estimated Unit Cost</span>
                      <p className="text-amber-400 font-mono font-bold mt-1">{integ.estimatedCostPer10kEvents}</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2">
                    <span className="text-rose-400 font-bold">Failure Recovery:</span>
                    <span>{integ.failureRecovery}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 18: INFRASTRUCTURE & COMPUTE */}
        {/* ======================================================== */}
        {activeLayer === 'infrastructure_compute' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-blue-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 18 • Infrastructure & Compute Layer
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Cloud Topology, Sizing, & Disaster Recovery
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Compute models, GPU requirements, VPC subnets, edge CDNs, and disaster recovery RPO/RTO metrics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-5 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Cloud Provider</span>
                  <span className="text-base font-bold text-white mt-1 block">{project.infrastructure.cloudProvider}</span>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Compute Model</span>
                  <span className="text-base font-bold text-cyan-300 mt-1 block">{project.infrastructure.computeModel}</span>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">GPU / AI Accelerator</span>
                  <span className="text-base font-bold text-purple-300 mt-1 block">{project.infrastructure.gpuRequirement}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Storage & Database</span>
                  <p className="text-slate-200">{project.infrastructure.storageSolution}</p>
                  <p className="text-slate-400 font-mono text-[11px]">Cache: {project.infrastructure.cacheLayer}</p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Networking & CDN</span>
                  <p className="text-slate-200">{project.infrastructure.cdnAndEdge}</p>
                  <p className="text-slate-400 font-mono text-[11px]">VPC: {project.infrastructure.networkingAndVpc}</p>
                </div>
              </div>

              {/* Disaster Recovery Metrics */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-emerald-400 font-bold block">Disaster Recovery Invariants:</span>
                  <span className="text-slate-300">
                    RPO: <strong className="text-white">{project.infrastructure.disasterRecoveryRPO}</strong> • RTO:{' '}
                    <strong className="text-white">{project.infrastructure.disasterRecoveryRTO}</strong>
                  </span>
                </div>
                <div className="text-right text-slate-400">
                  <span>Regions: {project.infrastructure.regions.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
