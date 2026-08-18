import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { RequirementItem, AssumptionClassification } from '../../types/specification';
import { AssumptionTag, ConfidenceBadge, StatusBadge } from '../common/Badges';
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Filter,
  Share2,
  Plus,
  RefreshCw
} from 'lucide-react';

export const RequirementsView: React.FC = () => {
  const { project, updateRequirementStatus, confirmAssumption } = useProject();
  const [filterClassification, setFilterClassification] = useState<string>('ALL');

  const filteredRequirements = filterClassification === 'ALL'
    ? project.requirements
    : project.requirements.filter(r => r.classification === filterClassification);

  const assumptionsCount = project.requirements.filter(r => r.classification === 'ASSUMED').length;
  const conflictsCount = project.requirements.filter(r => r.classification === 'CONFLICT').length;

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                STAGES 10, 11 & 12
              </span>
              <span className="text-xs text-slate-400 font-medium">Assumption Firewall & Provenance Scorer</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              The Assumption Firewall & Unknown Detection Engine
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              AI must never silently convert guesses into specifications. Every requirement is explicitly tagged as <strong>CONFIRMED</strong>, <strong>INFERRED</strong>, <strong>ASSUMED</strong>, <strong>UNKNOWN</strong>, or <strong>CONFLICT</strong> with full audit provenance.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 self-start lg:self-auto">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Firewall Status</span>
              <span className="text-xs font-mono font-bold text-white">
                {assumptionsCount} Assumed | {conflictsCount} Conflict
              </span>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
              conflictsCount > 0
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            }`}>
              {conflictsCount > 0 ? <Flame className="w-5 h-5 animate-pulse" /> : <ShieldCheck className="w-5 h-5" />}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Classification Bar */}
      <div className="glass-panel p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Filter Classification:
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {['ALL', 'CONFIRMED', 'INFERRED', 'ASSUMED', 'UNKNOWN', 'CONFLICT'].map((cls) => (
            <button
              key={cls}
              onClick={() => setFilterClassification(cls)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterClassification === cls
                  ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-4">
        {filteredRequirements.map((req) => (
          <div
            key={req.id}
            className={`glass-panel p-6 border transition-all ${
              req.classification === 'CONFLICT'
                ? 'border-rose-500/50 bg-rose-950/10'
                : req.classification === 'ASSUMED'
                ? 'border-amber-500/40 bg-amber-950/10'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-slate-800 text-sky-300 border border-slate-700">
                  {req.code}
                </span>
                <h3 className="text-base font-bold text-white">
                  {req.title}
                </h3>
                <span className="px-2 py-0.2 rounded text-[11px] font-medium bg-slate-900 text-slate-400 border border-slate-800">
                  {req.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <ConfidenceBadge score={req.confidenceScore} />
                <AssumptionTag classification={req.classification} />
                <StatusBadge status={req.status} />
              </div>
            </div>

            {/* Conflict Banner if present */}
            {req.classification === 'CONFLICT' && (
              <div className="p-3.5 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span className="text-xs text-rose-200 font-medium">
                    <strong>Conflict Detected:</strong> {req.conflictReason}
                  </span>
                </div>
                <button
                  onClick={() => confirmAssumption(req.id)}
                  className="px-3 py-1 rounded bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition-colors self-end sm:self-auto"
                >
                  Resolve & Confirm
                </button>
              </div>
            )}

            {/* Description */}
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              {req.description}
            </p>

            {/* Technical Specification Box */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 mb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Technical Specification & Verification Criteria:
              </span>
              <p className="text-xs font-mono text-slate-300">
                {req.technicalSpec}
              </p>
            </div>

            {/* Dependencies and Downstream Blast Radius */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800/80">
              <div>
                <span className="text-slate-400 font-semibold mr-1.5">Depends On:</span>
                <span className="text-slate-200 font-mono">
                  {req.dependencies.join(', ') || 'None (Root)'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:justify-end">
                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-400 font-semibold">Downstream Impact:</span>
                <span className="text-amber-300 font-mono font-bold">
                  {req.downstreamImpacts.join(', ') || 'Isolated'}
                </span>
              </div>
            </div>

            {/* Assumption Approval Action */}
            {req.classification === 'ASSUMED' && (
              <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between bg-amber-500/5 -mx-6 -mb-6 p-4 rounded-b-xl">
                <span className="text-xs text-amber-300 flex items-center gap-1.5 font-medium">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  This requirement was inferred by AI. Confirm or reject to enforce Assumption Firewall.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateRequirementStatus(req.id, 'Rejected')}
                    className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => confirmAssumption(req.id)}
                    className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                  >
                    Approve & Confirm
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
