import React, { useState } from 'react';
import {
  Users,
  GitBranch,
  FileCheck,
  AlertOctagon,
  Shield,
  Key,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Check
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { LayerId } from '../../types';

export const RolesAndWorkflowsView: React.FC = () => {
  const { project, activeLayer, setActiveLayer } = useProject();

  const [selectedRoleIdx, setSelectedRoleIdx] = useState(0);
  const [selectedWorkflowIdx, setSelectedWorkflowIdx] = useState(0);

  const activeRole = project.roles[selectedRoleIdx] || project.roles[0];
  const activeWorkflow = project.workflows[selectedWorkflowIdx] || project.workflows[0];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#090d16] text-slate-100">
      {/* Sub-header Navigation */}
      <div className="px-6 py-3 border-b border-white/[0.08] bg-[#070a12] flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'role_permission' as LayerId, num: 7, label: 'Roles & RBAC/ABAC' },
            { id: 'workflow_engineering' as LayerId, num: 8, label: 'Workflow Engine' },
            { id: 'feature_contracts' as LayerId, num: 9, label: 'Feature Contracts' },
            { id: 'error_edge_cases' as LayerId, num: 20, label: 'Error & Edge Cases' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLayer(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeLayer === tab.id
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <span className="text-[10px] font-mono px-1 rounded bg-white/10">{tab.num}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
          <span>Behavior & Workflows Group</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* ======================================================== */}
        {/* LAYER 7: ROLE & PERMISSION ENGINE */}
        {/* ======================================================== */}
        {activeLayer === 'role_permission' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-purple-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 07 • Role & Permission Engine
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Granular RBAC / ABAC Permission Architecture
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Explicit definition of system actors, organizational boundaries, resource capabilities, and rate-limits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Roles Selector Column */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase font-mono px-1">
                  Defined Roles & Personas ({project.roles.length})
                </div>
                {project.roles.map((role, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedRoleIdx(idx)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedRoleIdx === idx
                        ? 'bg-purple-950/40 border-purple-500/50 text-purple-200 shadow-md'
                        : 'bg-[#0b0f19] border-white/10 hover:border-white/20 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-100">{role.role}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/10 font-mono text-slate-400">
                        {role.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{role.description}</p>
                  </div>
                ))}
              </div>

              {/* Role Detail & Permission Matrix */}
              {activeRole && (
                <div className="md:col-span-2 p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <div>
                      <h4 className="font-bold text-base text-white">{activeRole.role}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{activeRole.description}</p>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30 font-bold">
                      {activeRole.organizationBoundary}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Ownership Model</span>
                      <p className="text-slate-300 mt-1">{activeRole.ownershipRules}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Rate Limit SLA</span>
                      <p className="text-cyan-400 font-mono font-bold mt-1">{activeRole.rateLimit}</p>
                    </div>
                  </div>

                  {/* Permissions Table */}
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-2">
                      Resource Action Matrix ({activeRole.permissions.length} rules)
                    </span>
                    <div className="rounded-xl border border-white/10 overflow-hidden">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 bg-white/[0.03] text-[10px] uppercase font-mono text-slate-400">
                            <th className="p-2.5">Resource Domain</th>
                            <th className="p-2.5">Permitted Actions</th>
                            <th className="p-2.5">Conditions & Scopes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.06]">
                          {activeRole.permissions.map((p, i) => (
                            <tr key={i} className="hover:bg-white/[0.02]">
                              <td className="p-2.5 font-mono text-cyan-300 font-semibold">{p.resource}</td>
                              <td className="p-2.5">
                                <div className="flex flex-wrap gap-1">
                                  {p.actions.map((act, j) => (
                                    <span
                                      key={j}
                                      className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                    >
                                      {act}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="p-2.5 text-[11px] text-slate-400">{p.conditions || 'Unrestricted within Tenant'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 8: WORKFLOW ENGINEERING ENGINE */}
        {/* ======================================================== */}
        {activeLayer === 'workflow_engineering' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-purple-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 08 • Workflow Engineering Engine
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Structured 13-Attribute Workflow Modeler
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every functional capability is engineered as a deterministic workflow node with trigger, inputs, validation, state mutations, recovery, and audit tracking.
              </p>
            </div>

            {project.workflows.map((wf) => (
              <div key={wf.id} className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{wf.id}</span>
                    <h4 className="font-bold text-base text-white mt-0.5">{wf.name}</h4>
                  </div>
                  <span className="text-xs font-mono text-purple-300 px-3 py-1 rounded bg-purple-500/15 border border-purple-500/30 font-semibold">
                    Actor: {wf.actor}
                  </span>
                </div>

                {/* Flow Progression Banner */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-2 overflow-x-auto text-xs font-mono">
                  {wf.stateChanges.map((st, i) => (
                    <React.Fragment key={i}>
                      <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-bold">
                        <span>{i + 1}.</span>
                        <span>{st}</span>
                      </div>
                      {i < wf.stateChanges.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                    </React.Fragment>
                  ))}
                </div>

                {/* Structured Breakdown Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">1. Trigger & Input</span>
                    <p className="text-slate-300"><strong>Trigger:</strong> {wf.trigger}</p>
                    <p className="text-slate-300"><strong>Input:</strong> {wf.input}</p>
                    <p className="text-cyan-400 font-mono text-[11px]"><strong>Validation:</strong> {wf.validation}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">2. System Action & Output</span>
                    <p className="text-slate-300"><strong>System Action:</strong> {wf.systemAction}</p>
                    <p className="text-slate-300"><strong>Output:</strong> {wf.output}</p>
                    <p className="text-emerald-400 font-mono text-[11px]"><strong>Data Ops:</strong> {wf.dataOperations}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
                    <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">3. Failure & Recovery Paths</span>
                    <p className="text-slate-300"><strong>Failure Conditions:</strong> {wf.failureConditions}</p>
                    <p className="text-emerald-300"><strong>Recovery:</strong> {wf.recoveryConditions}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-1.5">
                    <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">4. Auditing & Telemetry</span>
                    <p className="text-slate-300"><strong>Notifications:</strong> {wf.notifications.join(', ')}</p>
                    <p className="text-cyan-300 font-mono text-[11px]"><strong>Audit Events:</strong> {wf.auditEvents}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 9: FEATURE CONTRACT ENGINE */}
        {/* ======================================================== */}
        {activeLayer === 'feature_contracts' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-purple-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 09 • Feature Contract Engine
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Implementation-Independent Feature Contracts
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Formal engineering contracts with preconditions, input schemas, business invariants, failure states, and acceptance criteria.
              </p>
            </div>

            {project.featureContracts.map((fc) => (
              <div key={fc.id} className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{fc.id}</span>
                    <h4 className="font-bold text-base text-white mt-0.5">{fc.featureName}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{fc.purpose}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Preconditions & Invariants</span>
                    <ul className="space-y-1 text-slate-300 text-[11px]">
                      {fc.preconditions.map((p, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Business Invariant Rules</span>
                    <ul className="space-y-1 text-slate-300 text-[11px]">
                      {fc.businessRules.map((r, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Acceptance Criteria */}
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2 text-xs">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                    Acceptance Criteria (Definition of Done)
                  </span>
                  <ul className="space-y-1 text-slate-200 text-[11px]">
                    {fc.acceptanceCriteria.map((ac, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{ac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 20: ERROR & EDGE-CASE ENGINE */}
        {/* ======================================================== */}
        {activeLayer === 'error_edge_cases' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-purple-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 20 • Error & Edge-Case Engine
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Happy Path ➔ Failure Path ➔ Recovery Path Matrix
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every workflow is systematically stressed against network drops, race conditions, partial failures, idempotency breaches, and data anomalies.
              </p>
            </div>

            <div className="space-y-4">
              {project.edgeCases.map((ec) => (
                <div key={ec.id} className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-3.5 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 text-amber-400" />
                      <h4 className="font-bold text-sm text-slate-100">{ec.scenario}</h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {ec.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">1. Happy Path</span>
                      <p className="text-slate-300 text-[11px]">{ec.happyPath}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                      <span className="text-[10px] font-mono text-rose-400 uppercase font-bold block">2. Failure Path</span>
                      <p className="text-slate-300 text-[11px]">{ec.failurePath}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-1">
                      <span className="text-[10px] font-mono text-blue-400 uppercase font-bold block">3. Recovery Path</span>
                      <p className="text-slate-300 text-[11px]">{ec.recoveryPath}</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 font-mono text-[11px] text-cyan-300 flex items-center gap-2">
                    <span className="font-bold text-slate-400">Code Directive:</span>
                    <span>{ec.codeDirective}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
