import React, { useState } from 'react';
import {
  Layout,
  Activity,
  Shield,
  FileText,
  Smartphone,
  Eye,
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { LayerId } from '../../types';

export const UxSecurityComplianceView: React.FC = () => {
  const { project, activeLayer, setActiveLayer } = useProject();

  const [selectedScreenIdx, setSelectedScreenIdx] = useState(0);
  const activeScreen = project.screens[selectedScreenIdx] || project.screens[0];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#090d16] text-slate-100">
      {/* Sub-header Navigation */}
      <div className="px-6 py-3 border-b border-white/[0.08] bg-[#070a12] flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'ui_ux_engineering' as LayerId, num: 13, label: 'UI / UX & Screens' },
            { id: 'motion_interaction' as LayerId, num: 14, label: 'Motion & Micro-interactions' },
            { id: 'security_engineering' as LayerId, num: 15, label: 'Security & STRIDE' },
            { id: 'privacy_compliance' as LayerId, num: 16, label: 'Privacy & Compliance' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLayer(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeLayer === tab.id
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <span className="text-[10px] font-mono px-1 rounded bg-white/10">{tab.num}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
          <span>Interface & Security Group</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* ======================================================== */}
        {/* LAYER 13: UI/UX ENGINEERING & SCREEN ARCHITECTURE */}
        {/* ======================================================== */}
        {activeLayer === 'ui_ux_engineering' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-rose-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 13 • UI/UX Engineering Layer
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Screen Architecture & 4-State UI Matrix
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Information architecture, user journey steps, component hierarchy, responsive breakpoints, and the complete 4-state lifecycle (Empty, Loading, Error, Success).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Screen List */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase font-mono px-1">
                  Screens ({project.screens.length})
                </div>
                {project.screens.map((scr, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedScreenIdx(idx)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedScreenIdx === idx
                        ? 'bg-rose-950/40 border-rose-500/50 text-rose-200 shadow-md'
                        : 'bg-[#0b0f19] border-white/10 hover:border-white/20 text-slate-300'
                    }`}
                  >
                    <span className="font-bold text-xs text-slate-100 block">{scr.screenName}</span>
                    <span className="text-[10px] text-cyan-400 font-mono block mt-0.5">{scr.route}</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Actor: {scr.primaryActor}</span>
                  </div>
                ))}
              </div>

              {/* Screen Detail */}
              {activeScreen && (
                <div className="md:col-span-2 p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <div>
                      <h4 className="font-bold text-base text-white">{activeScreen.screenName}</h4>
                      <span className="text-xs font-mono text-cyan-400">{activeScreen.route}</span>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 font-semibold">
                      {activeScreen.userJourneyStage}
                    </span>
                  </div>

                  {/* 4-State Lifecycle Matrix */}
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-2">
                      4-State UI Lifecycle Matrix
                    </span>
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">1. Empty State</span>
                        <p className="text-slate-300 text-[11px]">{activeScreen.states.empty}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-1">
                        <span className="text-[10px] font-mono text-blue-400 uppercase font-bold block">2. Loading State</span>
                        <p className="text-slate-300 text-[11px]">{activeScreen.states.loading}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                        <span className="text-[10px] font-mono text-rose-400 uppercase font-bold block">3. Error State</span>
                        <p className="text-slate-300 text-[11px]">{activeScreen.states.error}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">4. Success State</span>
                        <p className="text-slate-300 text-[11px]">{activeScreen.states.success}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Key Components</span>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {activeScreen.keyComponents.map((comp, i) => (
                          <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-cyan-300">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Accessibility (A11y)</span>
                      <p className="text-slate-300 text-[11px] mt-1">{activeScreen.accessibilityStandards}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 14: MOTION & INTERACTION LAYER */}
        {/* ======================================================== */}
        {activeLayer === 'motion_interaction' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-rose-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 14 • Motion & Interaction Layer
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Intentional Micro-interactions & Motion Hierarchy
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                State transitions, optimistic UI feedback, GPU frame budgets, and reduced motion accessibility alternatives.
              </p>
            </div>

            <div className="space-y-3.5">
              {project.motionSpecs.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#0b0f19] border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-100 text-sm">{m.interactionName}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                      {m.motionType} ({m.durationMs}ms)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-slate-400 block font-mono">Trigger:</span>
                      <span className="text-slate-200">{m.trigger}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-slate-400 block font-mono">Easing Curve:</span>
                      <span className="text-cyan-400 font-mono">{m.easing}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-slate-400 block font-mono">Performance Budget:</span>
                      <span className="text-emerald-400 font-mono font-bold">{m.performanceBudget}</span>
                    </div>
                  </div>

                  <div className="p-2 rounded bg-black/40 border border-white/10 text-[10px] font-mono text-slate-300">
                    <strong className="text-amber-400">A11y Reduced Motion:</strong> {m.accessibilityAlternative}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 15: SECURITY ENGINEERING LAYER (STRIDE) */}
        {/* ======================================================== */}
        {activeLayer === 'security_engineering' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-rose-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 15 • Security Engineering Layer
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Continuous Threat Modeling (STRIDE Analysis)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Systematic analysis of attack surfaces across Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege.
              </p>
            </div>

            <div className="space-y-4">
              {project.securityThreats.map((t, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-rose-400" />
                      <span className="font-bold text-sm text-slate-100">{t.surface}</span>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      STRIDE: {t.strideCategory}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">{t.threatDescription}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                        Mitigation Control
                      </span>
                      <p className="text-slate-300 text-[11px]">{t.mitigationControl}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-1">
                      <span className="text-[10px] font-mono text-blue-400 uppercase font-bold block">
                        Automated Verification Test
                      </span>
                      <p className="text-slate-300 text-[11px] font-mono">{t.verificationTest}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 16: PRIVACY & COMPLIANCE LAYER */}
        {/* ======================================================== */}
        {activeLayer === 'privacy_compliance' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-rose-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 16 • Privacy & Compliance Layer
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Regulatory Compliance, Consent & Data Rights
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                GDPR, CCPA, SOC 2, HIPAA data retention windows, cookie categorization, and automated data deletion/export APIs.
              </p>
            </div>

            <div className="space-y-4">
              {project.complianceRules.map((cr, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span className="font-bold text-sm text-slate-100">{cr.standard} Regulatory Standard</span>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      Active Compliance
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">{cr.requirement}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Data Handling Policy</span>
                      <p className="text-slate-300 text-[11px] mt-1">{cr.dataHandlingPolicy}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Consent Mechanism</span>
                      <p className="text-slate-300 text-[11px] mt-1">{cr.consentMechanism}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Retention Window</span>
                      <p className="text-cyan-400 font-mono font-bold text-[11px] mt-1">{cr.retentionWindow}</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-emerald-400 flex items-center gap-2">
                    <span className="text-slate-400 font-bold">Data Subject Rights (Export / Deletion):</span>
                    <span>{cr.exportDeletionSupport}</span>
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
