import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import {
  ShieldAlert,
  AlertTriangle,
  Lock,
  FileCheck2,
  CheckCircle2,
  RefreshCw,
  EyeOff,
  Flame
} from 'lucide-react';

export const EdgeCasesSecurityView: React.FC = () => {
  const { project } = useProject();
  const [activeSubTab, setActiveSubTab] = useState<'edgeCases' | 'security' | 'privacy'>('edgeCases');

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                STAGES 23, 24 & 25
              </span>
              <span className="text-xs text-slate-400 font-medium">Error Paths, Security Spec & Privacy Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              Error, Edge-Case & Security Engine
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              Mandatory engineering safety layer. Every workflow generates explicit <strong>Happy Path + Failure Path + Recovery Path</strong> contracts to eliminate AI hallucination on runtime edge conditions.
            </p>
          </div>

          {/* Sub-tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start lg:self-auto">
            <button
              onClick={() => setActiveSubTab('edgeCases')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'edgeCases' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Edge Cases ({project.edgeCases.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('security')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'security' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Security Architecture</span>
            </button>
            <button
              onClick={() => setActiveSubTab('privacy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'privacy' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Privacy & Retention</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-view 1: Edge Cases (Happy, Failure, Recovery) */}
      {activeSubTab === 'edgeCases' && (
        <div className="space-y-6">
          {project.edgeCases.map((ec) => (
            <div key={ec.id} className="glass-panel p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    Category: {ec.category}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display">
                    {ec.title}
                  </h3>
                </div>
              </div>

              {/* What If Question */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                <span className="text-[10px] font-mono font-bold uppercase text-sky-400 block mb-1">
                  What Happens If? (Boundary Condition):
                </span>
                <p className="text-slate-200 font-semibold italic">"{ec.whatIfQuestion}"</p>
              </div>

              {/* Tri-Path Resolution Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 block">1. Happy Path</span>
                  <p className="text-slate-300 leading-relaxed">{ec.happyPath}</p>
                </div>

                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-rose-400 block">2. Failure Path</span>
                  <p className="text-slate-300 leading-relaxed">{ec.failurePath}</p>
                </div>

                <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-sky-400 block">3. Recovery & Self-Healing Path</span>
                  <p className="text-slate-300 leading-relaxed">{ec.recoveryPath}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  <strong className="text-slate-300">Automated Prevention Mechanism:</strong> {ec.preventionMechanism}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  ✓ Verified Boundary
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub-view 2: Security Architecture */}
      {activeSubTab === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-panel p-5 space-y-3">
            <div className="flex items-center gap-2 text-sky-400">
              <Lock className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white">Multi-Tenant Data Isolation (RLS)</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every database query enforces PostgreSQL Row-Level Security (RLS) policies scoped by <code className="text-sky-300 font-mono">current_setting('app.current_org_id')</code> to prevent cross-tenant data leakage.
            </p>
          </div>

          <div className="glass-panel p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white">Cryptographic Signature Verification</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Webhook endpoints verify HMAC-SHA256 signatures with replay protection timestamps. e-POD files generate immutable SHA-256 digests prior to S3 WORM upload.
            </p>
          </div>

          <div className="glass-panel p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white">Rate-Limiting & Abuse Prevention</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Redis Token Bucket rate limiters on API Gateway restrict endpoints to 60 req/min per organization and 20 req/min per driver token, preventing scraping and DDoS.
            </p>
          </div>

          <div className="glass-panel p-5 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400">
              <FileCheck2 className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white">Immutable Audit Logging</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Financial payouts, booking state changes, and permission modifications are appended to an immutable append-only audit trail with IP address and client hashes.
            </p>
          </div>
        </div>
      )}

      {/* Sub-view 3: Privacy & Retention */}
      {activeSubTab === 'privacy' && (
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-base font-bold text-white font-display">
            Regulatory Compliance & Data Retention Policies
          </h3>
          <p className="text-xs text-slate-300">
            Automated lifecycle rules for data deletion, export, and legal archival compliance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase text-sky-400 block mb-1">Signed Bills of Lading</span>
              <p className="text-slate-200 font-bold mb-1">7-Year WORM Storage</p>
              <p className="text-slate-400 text-[11px]">AWS S3 Object Lock prevents deletion for 7 years per USDOT regulations.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase text-indigo-400 block mb-1">GPS Telemetry Points</span>
              <p className="text-slate-200 font-bold mb-1">90-Day High Resolution</p>
              <p className="text-slate-400 text-[11px]">Raw 15-second telemetry downsampled to hourly summaries after 90 days.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 block mb-1">GDPR / CCPA Erasure</span>
              <p className="text-slate-200 font-bold mb-1">30-Day Automated Wipe</p>
              <p className="text-slate-400 text-[11px]">User deactivations cascade soft-deletes and anonymize PII within 30 days.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
