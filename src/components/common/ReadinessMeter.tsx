import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface ReadinessMeterProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const ReadinessMeter: React.FC<ReadinessMeterProps> = ({
  score,
  showDetails = true
}) => {
  let strokeColor = '#10b981'; // emerald-500
  let badgeLabel = 'BUILD READY';

  if (score < 75) {
    strokeColor = '#f43f5e'; // rose-500
    badgeLabel = 'NOT READY (BLOCKERS)';
  } else if (score < 90) {
    strokeColor = '#f59e0b'; // amber-500
    badgeLabel = 'REQUIRES REFINEMENT';
  }

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-4">
      {/* Circular Gauge */}
      <div className="relative flex items-center justify-center w-20 h-20 flex-shrink-0">
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 88 88">
          <circle
            cx="44"
            cy="44"
            r={radius}
            stroke="#1e293b"
            strokeWidth="7"
            fill="transparent"
          />
          <circle
            cx="44"
            cy="44"
            r={radius}
            stroke={strokeColor}
            strokeWidth="7"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{ transition: 'stroke-dashoffset 1s ease-out, stroke 0.4s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xl font-bold font-mono tracking-tight text-white leading-none">{score}</span>
          <span className="text-[9px] font-medium text-slate-400 mt-0.5">/ 100</span>
        </div>
      </div>

      {/* Text Details */}
      {showDetails && (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Build Readiness Score
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {score >= 90 ? (
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            )}
            <span className="text-sm font-bold text-white tracking-tight">
              {badgeLabel}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 max-w-[210px] leading-tight">
            {score >= 90
              ? 'Specification satisfies Level 7 verification criteria for AI code generation.'
              : 'Resolve open red flags and unconfirmed assumptions before build.'}
          </p>
        </div>
      )}
    </div>
  );
};
