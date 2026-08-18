import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface ReadinessMeterProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const ReadinessMeter: React.FC<ReadinessMeterProps> = ({
  score,
  size = 'md',
  showDetails = true
}) => {
  let statusColor = 'text-emerald-400 stroke-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  let badgeLabel = 'BUILD READY';

  if (score < 75) {
    statusColor = 'text-rose-400 stroke-rose-400 bg-rose-500/10 border-rose-500/30';
    badgeLabel = 'NOT READY (BLOCKERS)';
  } else if (score < 90) {
    statusColor = 'text-amber-400 stroke-amber-400 bg-amber-500/10 border-amber-500/30';
    badgeLabel = 'REQUIRES REFINEMENT';
  }

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-4">
      {/* Circular Gauge */}
      <div className="relative flex items-center justify-center">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            className="text-slate-800 fill-transparent"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${statusColor} fill-transparent transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold font-mono tracking-tight text-white">{score}</span>
          <span className="text-[9px] font-medium text-slate-400">/ 100</span>
        </div>
      </div>

      {/* Text Details */}
      {showDetails && (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Build Readiness
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {score >= 90 ? (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            )}
            <span className="text-sm font-bold text-white tracking-tight">
              {badgeLabel}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 max-w-[200px]">
            {score >= 90
              ? 'Specification meets all Level 7 verification criteria for AI code generation.'
              : 'Resolve open red flags and unconfirmed assumptions before autonomous build.'}
          </p>
        </div>
      )}
    </div>
  );
};
