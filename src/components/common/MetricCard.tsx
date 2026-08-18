import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: React.ReactNode;
  variant?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'indigo';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  sublabel,
  icon,
  variant = 'cyan',
  onClick
}) => {
  const variantStyles = {
    cyan: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-400',
    emerald: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400',
    amber: 'border-amber-500/30 bg-amber-950/20 text-amber-400',
    rose: 'border-rose-500/30 bg-rose-950/20 text-rose-400',
    indigo: 'border-indigo-500/30 bg-indigo-950/20 text-indigo-400'
  };

  return (
    <div
      onClick={onClick}
      className={`p-3.5 rounded-xl border bg-[#0b0f19] transition-all relative overflow-hidden ${
        onClick ? 'cursor-pointer hover:border-white/30 hover:scale-[1.01]' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider font-mono">{label}</span>
        {icon && <div className={`p-1.5 rounded-lg border ${variantStyles[variant]}`}>{icon}</div>}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold font-mono tracking-tight text-white">{value}</span>
      </div>

      {sublabel && <p className="mt-1 text-[11px] text-slate-400">{sublabel}</p>}
    </div>
  );
};
