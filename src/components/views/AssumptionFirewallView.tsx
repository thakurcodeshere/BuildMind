import React, { useState } from 'react';
import {
  Flame,
  CheckSquare,
  AlertTriangle,
  CheckCircle,
  Plus,
  Trash2,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  XCircle,
  Clock,
  Sparkles,
  Link2,
  Check
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { LayerId, AssumptionStatus, AssumptionItem, RequirementItem } from '../../types';

export const AssumptionFirewallView: React.FC = () => {
  const {
    project,
    activeLayer,
    setActiveLayer,
    updateAssumptionStatus,
    addAssumption,
    deleteAssumption,
    updateRequirementPriority,
    addRequirement,
    resolveBlocker
  } = useProject();

  const [newAsmText, setNewAsmText] = useState('');
  const [newAsmCategory, setNewAsmCategory] = useState('Architecture');
  const [newAsmStatus, setNewAsmStatus] = useState<AssumptionStatus>('assumed');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newReqTitle, setNewReqTitle] = useState('');
  const [newReqDesc, setNewReqDesc] = useState('');
  const [newReqDomain, setNewReqDomain] = useState('Core Product');
  const [newReqPriority, setNewReqPriority] = useState<RequirementItem['priority']>('P1 - Core');

  const columns: { id: AssumptionStatus; label: string; badgeColor: string; description: string }[] = [
    { id: 'confirmed', label: 'Confirmed (Human)', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', description: 'Explicitly verified by product owner' },
    { id: 'inferred', label: 'Inferred (High Conf)', badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40', description: 'Deduced logically with high confidence' },
    { id: 'assumed', label: 'Assumed (Requires Signoff)', badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40', description: 'AI heuristic assumption needing validation' },
    { id: 'unknown', label: 'Unknown (Missing Spec)', badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40', description: 'Critical parameter undefined' },
    { id: 'conflicting', label: 'Conflicting (Tension)', badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40', description: 'Contradicts another requirement' },
    { id: 'pending', label: 'Pending Triage', badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/40', description: 'Recently detected item' },
    { id: 'rejected', label: 'Rejected / Out-of-Scope', badgeColor: 'bg-red-950/40 text-red-400 border-red-500/30', description: 'Explicitly rejected from build contract' }
  ];

  const handleCreateAssumption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsmText.trim()) return;
    addAssumption(newAsmText, newAsmCategory, newAsmStatus, newAsmStatus === 'confirmed' ? 95 : 70);
    setNewAsmText('');
    setShowAddModal(false);
  };

  const handleCreateRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReqTitle.trim()) return;
    addRequirement(newReqTitle, newReqDesc, newReqDomain, newReqPriority);
    setNewReqTitle('');
    setNewReqDesc('');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#090d16] text-slate-100">
      {/* Sub-header Navigation */}
      <div className="px-6 py-3 border-b border-white/[0.08] bg-[#070a12] flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'assumption_firewall' as LayerId, num: 5, label: 'Assumption Firewall' },
            { id: 'requirement_confidence' as LayerId, num: 6, label: 'Requirements & Traceability' },
            { id: 'cross_domain_validation' as LayerId, num: 23, label: 'Cross-Domain Validation' },
            { id: 'risk_blockers' as LayerId, num: 25, label: 'Risk & Blocker Engine' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLayer(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeLayer === tab.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <span className="text-[10px] font-mono px-1 rounded bg-white/10">{tab.num}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
          <span>Truth & Governance Layer</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* ======================================================== */}
        {/* LAYER 5: ASSUMPTION FIREWALL (INTERACTIVE 7-COLUMN KANBAN) */}
        {/* ======================================================== */}
        {activeLayer === 'assumption_firewall' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Header / Philosophy Alert */}
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Flame className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm text-amber-300">
                    Core Rule 1: No Silent Assumptions
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5 max-w-3xl leading-relaxed">
                    AI cannot silently turn an assumption into an official requirement. Every architectural premise must be triaged, validated, and promoted to <strong>Confirmed</strong> before specification freeze.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Assumption</span>
              </button>
            </div>

            {/* Kanban Columns Overflow Wrapper */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3 overflow-x-auto min-h-[500px]">
              {columns.map((col) => {
                const colItems = project.assumptions.filter((a) => a.status === col.id);

                return (
                  <div
                    key={col.id}
                    className="flex flex-col rounded-xl bg-[#0b0f19] border border-white/10 p-3 min-w-[240px] space-y-2.5"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                      <div>
                        <span className="font-bold text-xs text-slate-200 block truncate">{col.label}</span>
                        <span className="text-[10px] text-slate-400 block font-mono">{colItems.length} items</span>
                      </div>
                    </div>

                    {/* Column Items */}
                    <div className="flex-1 space-y-2.5 overflow-y-auto">
                      {colItems.length === 0 ? (
                        <div className="h-24 flex items-center justify-center text-[11px] text-slate-400 italic">
                          No {col.id} items
                        </div>
                      ) : (
                        colItems.map((item) => (
                          <div
                            key={item.id}
                            className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all space-y-2 text-xs group"
                          >
                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                              <span className="px-1.5 py-0.2 rounded bg-white/10 text-slate-300 font-semibold">
                                {item.category}
                              </span>
                              <span className="text-cyan-400 font-bold">{item.confidence}%</span>
                            </div>

                            <p className="text-slate-200 leading-snug font-sans text-xs">{item.statement}</p>

                            <p className="text-[10px] text-slate-400 italic line-clamp-2">
                              Source: {item.source}
                            </p>

                            {/* Triage Promotion Actions */}
                            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-1">
                              {col.id !== 'confirmed' && (
                                <button
                                  onClick={() => updateAssumptionStatus(item.id, 'confirmed')}
                                  className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/40 border border-emerald-500/40 font-mono font-bold transition-colors"
                                  title="Confirm & Promote to Official Requirement"
                                >
                                  Confirm ✓
                                </button>
                              )}
                              {col.id !== 'rejected' && (
                                <button
                                  onClick={() => updateAssumptionStatus(item.id, 'rejected')}
                                  className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/15 text-red-300 hover:bg-red-500/30 font-mono transition-colors"
                                  title="Reject assumption"
                                >
                                  Reject ✗
                                </button>
                              )}
                              <button
                                onClick={() => deleteAssumption(item.id)}
                                className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-400 transition-opacity ml-auto"
                                title="Delete"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Add Modal */}
            {showAddModal && (
              <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-[#090d16] border border-white/15 rounded-2xl p-5 space-y-4">
                  <h3 className="font-bold text-sm text-white">Add New Assumption to Firewall</h3>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Assumption Statement</label>
                    <textarea
                      rows={3}
                      value={newAsmText}
                      onChange={(e) => setNewAsmText(e.target.value)}
                      placeholder="e.g., The system assumes external payment webhooks arrive with valid HMAC signatures..."
                      className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Category</label>
                      <input
                        type="text"
                        value={newAsmCategory}
                        onChange={(e) => setNewAsmCategory(e.target.value)}
                        className="w-full p-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Status</label>
                      <select
                        value={newAsmStatus}
                        onChange={(e) => setNewAsmStatus(e.target.value as AssumptionStatus)}
                        className="w-full p-2 rounded-xl bg-[#090d16] border border-white/10 text-slate-200 text-xs font-mono"
                      >
                        <option value="assumed">Assumed</option>
                        <option value="inferred">Inferred</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="unknown">Unknown</option>
                        <option value="conflicting">Conflicting</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="px-3 py-1.5 rounded-xl hover:bg-white/10 text-slate-400 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateAssumption}
                      className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                    >
                      Add to Firewall
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 6: REQUIREMENT CONFIDENCE & TRACEABILITY */}
        {/* ======================================================== */}
        {activeLayer === 'requirement_confidence' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
                  Layer 06 • Requirement Confidence & Traceability
                </div>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  End-to-End Requirement Lineage
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Every requirement has a confidence score, source provenance, impact mapping, and validation state.
                </p>
              </div>

              <span className="text-xs font-mono text-cyan-300 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/40">
                {project.requirements.length} Traceable Requirements
              </span>
            </div>

            {/* Quick Add Requirement Form */}
            <form onSubmit={handleCreateRequirement} className="p-4 rounded-xl bg-[#0b0f19] border border-white/10 space-y-3">
              <span className="text-[11px] font-bold text-slate-300 font-mono uppercase">
                Add Explicit Requirement
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Requirement Title"
                  value={newReqTitle}
                  onChange={(e) => setNewReqTitle(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200"
                />
                <input
                  type="text"
                  placeholder="Engineering Domain (e.g., Security, Database)"
                  value={newReqDomain}
                  onChange={(e) => setNewReqDomain(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200"
                />
                <select
                  value={newReqPriority}
                  onChange={(e) => setNewReqPriority(e.target.value as any)}
                  className="px-3 py-2 rounded-xl bg-[#090d16] border border-white/10 text-xs text-slate-200 font-mono"
                >
                  <option value="P0 - Blocker">P0 - Blocker</option>
                  <option value="P1 - Core">P1 - Core</option>
                  <option value="P2 - Secondary">P2 - Secondary</option>
                </select>
              </div>
              <textarea
                rows={2}
                placeholder="Detailed requirement specification and validation criteria..."
                value={newReqDesc}
                onChange={(e) => setNewReqDesc(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 font-mono"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Register Requirement
                </button>
              </div>
            </form>

            {/* Requirements Table */}
            <div className="rounded-2xl border border-white/10 bg-[#0b0f19] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03] text-[10px] uppercase font-mono text-slate-400">
                      <th className="p-3">ID & Title</th>
                      <th className="p-3">Domain</th>
                      <th className="p-3">Priority</th>
                      <th className="p-3">Confidence</th>
                      <th className="p-3">Source</th>
                      <th className="p-3">Impacted Layers</th>
                      <th className="p-3">Validation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {project.requirements.map((req) => (
                      <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3 max-w-xs">
                          <span className="font-mono text-[10px] text-cyan-400 block">{req.id}</span>
                          <span className="font-semibold text-slate-200 block mt-0.5">{req.title}</span>
                          <span className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{req.description}</span>
                        </td>
                        <td className="p-3 font-mono text-slate-300">{req.domain}</td>
                        <td className="p-3">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                              req.priority.startsWith('P0')
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : req.priority.startsWith('P1')
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            {req.priority}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-emerald-400 font-bold">{req.confidenceScore}%</td>
                        <td className="p-3 text-[11px] text-slate-400">{req.source}</td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {req.impactedLayers.map((layer, i) => (
                              <span key={i} className="text-[9px] font-mono px-1 py-0.2 rounded bg-white/5 text-slate-400">
                                {layer}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
                            {req.validationState}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 23: CROSS-DOMAIN VALIDATION ENGINE */}
        {/* ======================================================== */}
        {activeLayer === 'cross_domain_validation' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 23 • Cross-Domain Validation Engine
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                8-Axis Contradiction & Coherence Detector
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Continuous sanity engine checking: <strong>Requirements ↔ UX ↔ Architecture ↔ Database ↔ API ↔ Security ↔ Infrastructure ↔ Testing</strong>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-sm text-slate-100">Cross-Domain Coherence Status</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  {project.contradictions.length === 0 ? '0 Contradictions Detected' : `${project.contradictions.length} Contradictions`}
                </span>
              </div>

              {project.contradictions.length === 0 ? (
                <div className="p-6 rounded-xl bg-emerald-950/10 border border-emerald-500/20 text-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-sm text-slate-200">Full Cross-Domain Alignment Verified</h4>
                  <p className="text-xs text-slate-400 max-w-lg mx-auto">
                    All API endpoints, data models, security threat mitigations, and user journeys align with zero conflicting requirements.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {project.contradictions.map((c) => (
                    <div key={c.id} className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-400 font-mono">{c.axis}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                          {c.severity}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200">{c.description}</p>
                      <p className="text-[11px] text-cyan-300 font-mono">Fix: {c.proposedResolution}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 25: RISK & BLOCKER ENGINE */}
        {/* ======================================================== */}
        {activeLayer === 'risk_blockers' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 25 • Risk & Blocker Engine
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Pre-Implementation Hard Gates
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Development cannot proceed automatically while critical blockers remain unresolved.
              </p>
            </div>

            {project.blockers.length === 0 ? (
              <div className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Zero Critical Blockers</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Specification satisfies all pre-implementation gate criteria. The project is cleared for build contract freeze.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {project.blockers.map((b) => (
                  <div
                    key={b.id}
                    className={`p-5 rounded-2xl border space-y-3 ${
                      b.resolved
                        ? 'bg-white/[0.02] border-white/10 opacity-60'
                        : 'bg-rose-950/30 border-rose-500/40 shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span className="font-bold text-sm text-slate-100">{b.title}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                        {b.type}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{b.description}</p>

                    <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-xs">
                      <span className="font-bold text-slate-300 text-[11px] font-mono">Mitigation Checklist:</span>
                      <ul className="mt-1 space-y-1 text-slate-400 text-[11px]">
                        {b.mitigationSteps.map((step, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-cyan-400" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {!b.resolved && (
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => resolveBlocker(b.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
                        >
                          Mark Blocker Resolved ✓
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
