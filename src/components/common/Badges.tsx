import React from 'react';
import { AssumptionClassification, RequirementStatus } from '../../types/specification';
import { ShieldCheck, HelpCircle, AlertTriangle, Flame, CheckCircle2 } from 'lucide-react';

export const AssumptionTag: React.FC<{ classification: AssumptionClassification }> = ({ classification }) => {
  switch (classification) {
    case 'CONFIRMED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3" />
          CONFIRMED
        </span>
      );
    case 'INFERRED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
          <ShieldCheck className="w-3 h-3" />
          INFERRED
        </span>
      );
    case 'ASSUMED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse">
          <AlertTriangle className="w-3 h-3" />
          ASSUMED (NEEDS APPROVAL)
        </span>
      );
    case 'UNKNOWN':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/20 text-slate-300 border border-slate-500/30">
          <HelpCircle className="w-3 h-3" />
          UNKNOWN
        </span>
      );
    case 'CONFLICT':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
          <Flame className="w-3 h-3" />
          CONFLICT DETECTED
        </span>
      );
  }
};

export const ConfidenceBadge: React.FC<{ score: number }> = ({ score }) => {
  let color = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  if (score < 70) color = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  else if (score < 90) color = 'text-amber-400 bg-amber-500/10 border-amber-500/30';

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium border ${color}`}>
      <span>{score}%</span>
      <span className="text-[10px] text-slate-400">conf.</span>
    </span>
  );
};

export const StatusBadge: React.FC<{ status: RequirementStatus }> = ({ status }) => {
  switch (status) {
    case 'Confirmed':
      return <span className="px-2 py-0.5 text-xs rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">Confirmed</span>;
    case 'Pending':
      return <span className="px-2 py-0.5 text-xs rounded bg-amber-950/80 text-amber-300 border border-amber-800">Pending Review</span>;
    case 'Needs Clarification':
      return <span className="px-2 py-0.5 text-xs rounded bg-rose-950/80 text-rose-300 border border-rose-800">Clarification Required</span>;
    case 'Rejected':
      return <span className="px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-400 border border-slate-700">Rejected</span>;
    default:
      return <span className="px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-300">{status}</span>;
  }
};
