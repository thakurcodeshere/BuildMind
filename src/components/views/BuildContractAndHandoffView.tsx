import React, { useState } from 'react';
import {
  Gauge,
  History,
  Lock,
  Unlock,
  FileCode2,
  Bot,
  GitPullRequest,
  RefreshCw,
  Download,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Terminal,
  FileText
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { LayerId } from '../../types';
import { RadarChart } from '../common/RadarChart';
import { CodeBlock } from '../common/CodeBlock';

export const BuildContractAndHandoffView: React.FC = () => {
  const {
    project,
    activeLayer,
    setActiveLayer,
    toggleSpecFreeze,
    createSpecVersion,
    resolveDrift,
    simulateDriftScan,
    isProcessing
  } = useProject();

  const [contractTab, setContractTab] = useState<'markdown' | 'openapi' | 'prisma' | 'json' | 'mermaid'>('markdown');
  const [handoffTab, setHandoffTab] = useState<'cursor' | 'claude' | 'antigravity'>('cursor');
  const [signOffName, setSignOffName] = useState('');
  const [versionSummary, setVersionSummary] = useState('');

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#090d16] text-slate-100">
      {/* Sub-header Navigation */}
      <div className="px-6 py-3 border-b border-white/[0.08] bg-[#070a12] flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'build_readiness' as LayerId, num: 24, label: 'Build Readiness Radar' },
            { id: 'spec_versioning' as LayerId, num: 26, label: 'Spec Version History' },
            { id: 'spec_freeze' as LayerId, num: 27, label: 'Spec Freeze & Sign-Off' },
            { id: 'build_contract' as LayerId, num: 28, label: 'Build Contract Generator' },
            { id: 'ai_handoff' as LayerId, num: 29, label: 'AI Development Handoff' },
            { id: 'implementation_verify' as LayerId, num: 30, label: 'Implementation Drift' },
            { id: 'continuous_loop' as LayerId, num: 31, label: 'Continuous Spec Loop' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLayer(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                activeLayer === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <span className="text-[10px] font-mono px-1 rounded bg-white/10">{tab.num}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
          <span>Build, Handoff & Drift Group</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* ======================================================== */}
        {/* LAYER 24: BUILD READINESS RADAR & SCORECARD */}
        {/* ======================================================== */}
        {activeLayer === 'build_readiness' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 24 • Build Readiness Engine
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                9-Vector Readiness Radar & Completeness Scorecard
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluates whether specification clarity across all 9 vectors is mathematically sufficient before AI coding begins.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Visual SVG Radar Chart */}
              <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/10 flex flex-col items-center justify-center shadow-xl">
                <RadarChart dimensions={project.readiness.dimensions} overallScore={project.readiness.overallScore} size={340} />
              </div>

              {/* 9 Dimensions Breakdown */}
              <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                  <span className="text-xs font-bold text-slate-200 uppercase font-mono">Vector Completeness</span>
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded ${
                      project.readiness.overallScore >= 90
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {project.readiness.overallScore >= 90 ? 'BUILD READY (CLEARED)' : 'BLOCKERS DETECTED'}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {Object.entries(project.readiness.dimensions).map(([key, val]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-300 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-cyan-400 font-bold">{val}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            val >= 90 ? 'bg-cyan-400' : val >= 75 ? 'bg-amber-400' : 'bg-rose-400'
                          }`}
                          style={{ width: `${val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 26: SPECIFICATION VERSIONING */}
        {/* ======================================================== */}
        {activeLayer === 'spec_versioning' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 26 • Specification Versioning & Diff History
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Semver Release History & Downstream Impact Diff
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every approved product change is versioned with cryptographic commit hashes and downstream dependency impact logs.
              </p>
            </div>

            {/* Create New Version */}
            <div className="p-4 rounded-xl bg-[#0b0f19] border border-white/10 flex items-center gap-3">
              <input
                type="text"
                placeholder="Describe new specification change summary..."
                value={versionSummary}
                onChange={(e) => setVersionSummary(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200"
              />
              <button
                onClick={() => {
                  if (versionSummary.trim()) {
                    createSpecVersion(versionSummary, 'Lead Architect');
                    setVersionSummary('');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shrink-0"
              >
                Tag & Cut Release
              </button>
            </div>

            {/* Version List */}
            <div className="space-y-3">
              {project.versions.map((ver, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#0b0f19] border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-cyan-400">{ver.version}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-slate-300">
                        hash: {ver.commitHash}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{ver.releaseDate}</span>
                  </div>

                  <p className="text-slate-200">{ver.changeSummary}</p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                    <span>Author: {ver.author}</span>
                    {ver.signedOffBy && <span className="text-emerald-400">Signed Off by: {ver.signedOffBy}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 27: SPECIFICATION FREEZE & SIGN-OFF */}
        {/* ======================================================== */}
        {activeLayer === 'spec_freeze' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 27 • Specification Freeze & Sign-Off
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Single Source of Truth (SSOT) Cryptographic Lock
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Once approved, IntentOS creates an immutable cryptographic snapshot of the specification. AI coding tools cannot modify the spec without formal revision gates.
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl border space-y-5 shadow-2xl ${
                project.isSpecFrozen
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : 'bg-amber-950/20 border-amber-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {project.isSpecFrozen ? (
                    <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      <Lock className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                      <Unlock className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-base text-white">
                      {project.isSpecFrozen
                        ? 'SPECIFICATION LOCKED & FROZEN'
                        : 'SPECIFICATION IN DRAFT (UNFROZEN)'}
                    </h4>
                    <p className="text-xs text-slate-300">
                      {project.isSpecFrozen
                        ? 'Active Single Source of Truth for AI and human engineering teams.'
                        : 'Unfrozen draft. Changes may still alter architectural requirements.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleSpecFreeze(signOffName || 'Lead Architect & CISO')}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg ${
                    project.isSpecFrozen
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                  }`}
                >
                  {project.isSpecFrozen ? 'Unlock for Revision' : 'Sign-Off & Freeze Spec'}
                </button>
              </div>

              {project.isSpecFrozen && (
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cryptographic Hash:</span>
                    <span className="text-cyan-300 font-bold truncate max-w-sm">{project.freezeRecord.hash}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sign-Off Party:</span>
                    <span className="text-slate-200">{project.freezeRecord.signOffParty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Locked At:</span>
                    <span className="text-slate-200">{project.freezeRecord.lockedAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ed25519 Signature:</span>
                    <span className="text-emerald-400 truncate max-w-sm">
                      {project.freezeRecord.verificationSignature}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 28: BUILD CONTRACT GENERATOR */}
        {/* ======================================================== */}
        {activeLayer === 'build_contract' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
                  Layer 28 • Build Contract Generator
                </div>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Multi-Format Build Contract Artifacts
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Exportable, developer-ready contracts for human teams and AI coding agents.
                </p>
              </div>
            </div>

            {/* Export Tabs */}
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2 text-xs">
              <button
                onClick={() => setContractTab('markdown')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  contractTab === 'markdown' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Developer Markdown Spec
              </button>
              <button
                onClick={() => setContractTab('openapi')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  contractTab === 'openapi' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                OpenAPI 3.1 JSON
              </button>
              <button
                onClick={() => setContractTab('prisma')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  contractTab === 'prisma' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Prisma Database Schema
              </button>
              <button
                onClick={() => setContractTab('json')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  contractTab === 'json' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                JSON Schema
              </button>
              <button
                onClick={() => setContractTab('mermaid')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  contractTab === 'mermaid' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Mermaid Architecture
              </button>
            </div>

            {/* Code Output Viewer */}
            {contractTab === 'markdown' && (
              <CodeBlock code={project.buildContract.markdownSpec} language="markdown" filename="BUILD_CONTRACT.md" maxHeight="max-h-[500px]" />
            )}
            {contractTab === 'openapi' && (
              <CodeBlock code={project.buildContract.openapi3Json} language="json" filename="openapi.json" maxHeight="max-h-[500px]" />
            )}
            {contractTab === 'prisma' && (
              <CodeBlock code={project.buildContract.prismaSchema} language="prisma" filename="schema.prisma" maxHeight="max-h-[500px]" />
            )}
            {contractTab === 'json' && (
              <CodeBlock code={project.buildContract.jsonSchema} language="json" filename="schema.json" maxHeight="max-h-[500px]" />
            )}
            {contractTab === 'mermaid' && (
              <CodeBlock code={project.buildContract.mermaidDiagram} language="mermaid" filename="architecture.mmd" maxHeight="max-h-[500px]" />
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 29: AI DEVELOPMENT HANDOFF */}
        {/* ======================================================== */}
        {activeLayer === 'ai_handoff' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 29 • AI Development Handoff
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                AI Coding Agent Directives & Task Breakdown
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Controlled input bundles for Claude, Cursor (.cursorrules), Google Antigravity, and GitHub Copilot.
              </p>
            </div>

            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2 text-xs">
              <button
                onClick={() => setHandoffTab('cursor')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  handoffTab === 'cursor' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Cursor (.cursorrules)
              </button>
              <button
                onClick={() => setHandoffTab('claude')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  handoffTab === 'claude' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Claude 3.7 / LLM Prompt
              </button>
              <button
                onClick={() => setHandoffTab('antigravity')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  handoffTab === 'antigravity' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Antigravity Agent Task Plan
              </button>
            </div>

            {handoffTab === 'cursor' && (
              <CodeBlock code={project.aiHandoff.cursorRules} language="markdown" filename=".cursorrules" maxHeight="max-h-[500px]" />
            )}
            {handoffTab === 'claude' && (
              <CodeBlock code={project.aiHandoff.claudePrompt} language="markdown" filename="CLAUDE_PROMPT.md" maxHeight="max-h-[500px]" />
            )}
            {handoffTab === 'antigravity' && (
              <div className="space-y-3">
                {project.aiHandoff.antigravityTaskBreakdown.map((t, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0b0f19] border border-white/10 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-cyan-400 font-mono">{t.phase}</span>
                      <span className="text-slate-200 font-semibold">{t.title}</span>
                    </div>
                    <p className="text-slate-300 font-mono text-[11px] p-2.5 rounded bg-black/40 border border-white/10">
                      {t.prompt}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 30: IMPLEMENTATION VERIFICATION & DRIFT */}
        {/* ======================================================== */}
        {activeLayer === 'implementation_verify' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
                  Layer 30 • Implementation Verification Engine
                </div>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Code Conformance & Specification Drift Detector
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Compares running code and pull requests against the frozen Build Contract to detect unauthorized functionality or architectural deviations.
                </p>
              </div>

              <button
                onClick={simulateDriftScan}
                disabled={isProcessing}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
                <span>Run Drift Audit Scan</span>
              </button>
            </div>

            {project.driftAudit.length === 0 ? (
              <div className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-2">
                <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Zero Specification Drift</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Code implementation strictly satisfies all frozen contracts with 100% adherence to schemas, security policies, and invariants.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {project.driftAudit.map((d) => (
                  <div key={d.id} className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-3 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GitPullRequest className="w-4 h-4 text-amber-400" />
                        <span className="font-mono font-bold text-xs text-slate-200">{d.fileOrEndpoint}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                          {d.driftType}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            d.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {d.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">Expected Contract</span>
                        <p className="text-slate-300 text-[11px]">{d.expectedSpec}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                        <span className="text-[10px] font-mono text-rose-400 uppercase font-bold block">Actual Code Implementation</span>
                        <p className="text-slate-300 text-[11px]">{d.actualImplementation}</p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-cyan-300 flex items-center justify-between">
                      <div>
                        <strong className="text-slate-400">Corrective Action: </strong>
                        <span>{d.correctiveAction}</span>
                      </div>
                      {d.status !== 'Resolved' && (
                        <button
                          onClick={() => resolveDrift(d.id)}
                          className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-bold transition-colors shrink-0 ml-2"
                        >
                          Mark Fixed ✓
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 31: CONTINUOUS SPECIFICATION-TO-CODE LOOP */}
        {/* ======================================================== */}
        {activeLayer === 'continuous_loop' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 31 • Continuous Specification-to-Code Loop
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Continuous Intent Orchestration Pipeline
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                The continuous lifecycle from raw idea to understanding, specification, modeling, validation, building, verification, and live evolution.
              </p>
            </div>

            {/* 16-Stage Interactive Visual Flow */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-6 shadow-xl">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs font-mono text-center">
                {[
                  'Idea',
                  'Understand',
                  'Discover',
                  'Question',
                  'Specify',
                  'Model',
                  'Validate',
                  'Approve',
                  'Build',
                  'Verify',
                  'Detect Drift',
                  'Correct',
                  'Test',
                  'Release',
                  'Observe',
                  'Update Spec'
                ].map((step, idx) => {
                  const isCurrent = project.continuousLoopState.currentStage === step;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-bold scale-105 shadow-md shadow-cyan-500/20'
                          : 'bg-white/[0.02] border-white/10 text-slate-300'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400 block mb-1">Step {idx + 1}</span>
                      <span className="block truncate">{step}</span>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-cyan-300">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>
                    Core Equation: <strong>Human Intent → Structured Requirements → Engineering Model → Build Contract → Software → Verification</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
