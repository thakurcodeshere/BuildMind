import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import {
  Users,
  Workflow,
  Shield,
  FileCode2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Database,
  Bell,
  Lock,
  History
} from 'lucide-react';

export const ActorsWorkflowsView: React.FC = () => {
  const { project } = useProject();
  const [activeSubTab, setActiveSubTab] = useState<'actors' | 'matrix' | 'workflows' | 'contracts'>('workflows');

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                STAGES 13, 14 & 15
              </span>
              <span className="text-xs text-slate-400 font-medium">Actors, RBAC Matrix, Workflows & Feature Contracts</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              The Role, Workflow & Feature Contract Engine
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              Every major feature is decomposed into a strict sequence of steps with explicit preconditions, validations, database state transitions, failure recovery paths, and security boundaries.
            </p>
          </div>

          {/* Sub-tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start lg:self-auto">
            <button
              onClick={() => setActiveSubTab('workflows')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'workflows' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Workflows ({project.workflows.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('contracts')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'contracts' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Feature Contracts ({project.featureContracts.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('matrix')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'matrix' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Permission Matrix</span>
            </button>
            <button
              onClick={() => setActiveSubTab('actors')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'actors' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Actors ({project.actors.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-view 1: Workflows */}
      {activeSubTab === 'workflows' && (
        <div className="space-y-6">
          {project.workflows.map((wf) => (
            <div key={wf.id} className="glass-panel p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400">
                    Workflow Model
                  </span>
                  <h3 className="text-xl font-bold text-white font-display">
                    {wf.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">{wf.summary}</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-slate-800 text-sky-300 border border-slate-700">
                    Primary Actor: {wf.actor}
                  </span>
                </div>
              </div>

              {/* Happy / Failure / Recovery Path Summaries */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="font-bold text-emerald-400 block mb-1">Happy Path:</span>
                  <p className="text-slate-300 leading-relaxed">{wf.happyPathSummary}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <span className="font-bold text-rose-400 block mb-1">Failure Trigger:</span>
                  <p className="text-slate-300 leading-relaxed">{wf.failurePathSummary}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20">
                  <span className="font-bold text-sky-400 block mb-1">Recovery Path:</span>
                  <p className="text-slate-300 leading-relaxed">{wf.recoveryPathSummary}</p>
                </div>
              </div>

              {/* Step-by-Step Flow */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Step-by-Step Lifecycle Execution Timeline:
                </h4>

                <div className="space-y-4">
                  {wf.steps.map((step) => {
                    const actor = project.actors.find(a => a.id === step.actorId);
                    return (
                      <div
                        key={step.stepNumber}
                        className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 font-mono font-bold text-xs flex items-center justify-center border border-sky-500/40">
                              {step.stepNumber}
                            </span>
                            <h5 className="text-sm font-bold text-white">
                              {step.actionTitle}
                            </h5>
                          </div>
                          <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-900 text-slate-300 border border-slate-800 self-start sm:self-auto">
                            Actor: {actor?.name || step.actorId}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed pl-10">
                          {step.description}
                        </p>

                        {/* Step Metadata Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px] font-mono pt-2 pl-10">
                          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                            <span className="text-slate-500 block text-[9px] uppercase font-bold">Inputs</span>
                            <span className="text-sky-300 truncate block">{step.inputs.join(', ')}</span>
                          </div>
                          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                            <span className="text-slate-500 block text-[9px] uppercase font-bold">Database Event</span>
                            <span className="text-emerald-300 truncate block">{step.databaseEvent}</span>
                          </div>
                          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                            <span className="text-slate-500 block text-[9px] uppercase font-bold">Failure / Recovery</span>
                            <span className="text-rose-300 truncate block">{step.failureCondition}</span>
                          </div>
                          <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                            <span className="text-slate-500 block text-[9px] uppercase font-bold">Audit Event</span>
                            <span className="text-indigo-300 truncate block">{step.auditLogEvent}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub-view 2: Feature Contracts */}
      {activeSubTab === 'contracts' && (
        <div className="space-y-6">
          {project.featureContracts.map((fc) => (
            <div key={fc.id} className="glass-panel p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                    {fc.code}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display">
                    {fc.featureName}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">Actor: {fc.actor}</span>
              </div>

              <p className="text-xs text-slate-300">{fc.purpose}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-sky-400 block">Preconditions & Validation</span>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {fc.validation.map((v, idx) => (
                      <li key={idx}>{v}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 block">Acceptance Criteria</span>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {fc.acceptanceCriteria.map((ac, idx) => (
                      <li key={idx}>{ac}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Security Boundary & Audit */}
              <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs flex items-center justify-between">
                <div>
                  <strong className="text-indigo-300 mr-1.5">Security Boundary:</strong>
                  <span className="text-slate-300">{fc.securityBoundary}</span>
                </div>
                <span className="text-indigo-400 font-mono text-[11px] font-bold">Audit Logged</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub-view 3: Permission Matrix */}
      {activeSubTab === 'matrix' && (
        <div className="glass-panel p-6 space-y-4 overflow-x-auto">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Granular RBAC / ABAC Resource Permission Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Resource access boundaries enforced across API Gateway and PostgreSQL Row-Level Security policies.
              </p>
            </div>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                <th className="py-3 px-4">Resource / Entity</th>
                {project.actors.map((actor) => (
                  <th key={actor.id} className="py-3 px-4 text-center">
                    {actor.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {project.permissionMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">
                    {row.resource}
                  </td>
                  {project.actors.map((actor) => {
                    const perm = row.permissions[actor.id] || 'No';
                    let badgeColor = 'bg-slate-800 text-slate-500 border-slate-700';
                    if (perm === 'Full') badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
                    else if (perm === 'Own') badgeColor = 'bg-sky-500/20 text-sky-300 border-sky-500/40';
                    else if (perm === 'Limited') badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';

                    return (
                      <td key={actor.id} className="py-3 px-4 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border ${badgeColor}`}>
                          {perm}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Sub-view 4: Actors */}
      {activeSubTab === 'actors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.actors.map((actor) => (
            <div key={actor.id} className="glass-panel p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">{actor.name}</h4>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  {actor.securityLevel}
                </span>
              </div>
              <p className="text-xs text-slate-300">{actor.description}</p>
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block mb-1">Capabilities:</span>
                <div className="flex flex-wrap gap-1.5">
                  {actor.capabilities.map((c, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
