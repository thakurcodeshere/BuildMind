import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { CheckCircle2, ShieldCheck, Activity, Terminal, Lock, Flame } from 'lucide-react';

export const TestingView: React.FC = () => {
  const { project } = useProject();

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                STAGE 29
              </span>
              <span className="text-xs text-slate-400 font-medium">8-Layer Quality Engineering Matrix</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              Automated Testing & Acceptance Criteria Studio
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              Test specifications are generated directly from requirements contracts across Unit, Integration, API, E2E, Security, Performance, Regression, and User Acceptance dimensions.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>{project.testingDimensions.length} Test Suites Mapped</span>
          </div>
        </div>
      </div>

      {/* Test Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.testingDimensions.map((test) => (
          <div key={test.id} className="glass-panel p-6 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  {test.layer} Test
                </span>
                <h4 className="text-sm font-bold text-white">{test.targetComponent}</h4>
              </div>
              <span className="text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {test.coverageTarget}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-1">
                Scenario:
              </span>
              <p className="text-xs text-slate-300">{test.scenario}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 block mb-0.5">
                Pass / Validation Criteria:
              </span>
              <p className="text-xs font-mono text-slate-300">{test.passCriteria}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
