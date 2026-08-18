import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Mic,
  MicOff,
  FileText,
  UploadCloud,
  Layers,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Code2,
  Download,
  User,
  ShieldCheck
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { LayerId } from '../../types';

export const IntakeAndIntentView: React.FC = () => {
  const {
    project,
    activeLayer,
    setActiveLayer,
    userRoleMode,
    setUserRoleMode,
    setActiveCategory,
    isProcessing,
    synthesizeNewProject,
    answerQuestion,
    toggleDomain
  } = useProject();

  const [inputIdea, setInputIdea] = useState(project.rawIdea);
  const [customTitle, setCustomTitle] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceTimer, setVoiceTimer] = useState(0);
  const [activeTab, setActiveTab] = useState<'text' | 'voice' | 'documents' | 'context'>('text');

  const handleSynthesize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputIdea.trim()) return;
    synthesizeNewProject(inputIdea, customTitle || undefined);
  };

  const handleToggleVoice = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setVoiceTimer(1);
      const interval = setInterval(() => {
        setVoiceTimer((t) => {
          if (t >= 5) {
            clearInterval(interval);
            setIsRecordingVoice(false);
            setInputIdea((prev) =>
              prev
                ? `${prev} Also enforce strict multi-tenant isolation, real-time telemetry, and rate-limiting.`
                : 'Build an autonomous agent workflow engine with isolated sandboxes, vector memory, and human-in-the-loop signoff.'
            );
            return 0;
          }
          return t + 1;
        });
      }, 1000);
    } else {
      setIsRecordingVoice(false);
      setVoiceTimer(0);
    }
  };

  // In user mode: only 3 layers. In developer mode: include Layer 4 (Adaptive Q&A)
  const availableTabs = userRoleMode === 'user'
    ? [
        { id: 'idea_intake' as LayerId, num: 1, label: 'Idea Intake Layer' },
        { id: 'intent_understanding' as LayerId, num: 2, label: 'AI Intent Engine' },
        { id: 'domain_matrix' as LayerId, num: 3, label: 'Dynamic Domain Matrix' }
      ]
    : [
        { id: 'idea_intake' as LayerId, num: 1, label: 'Idea Intake Layer' },
        { id: 'intent_understanding' as LayerId, num: 2, label: 'AI Intent Engine' },
        { id: 'domain_matrix' as LayerId, num: 3, label: 'Dynamic Domain Matrix' },
        { id: 'adaptive_discovery' as LayerId, num: 4, label: 'Adaptive Q&A System' }
      ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#090d16] text-slate-100">
      {/* Sub-header Layer Navigation Tabs */}
      <div className="px-6 py-3 border-b border-white/[0.08] bg-[#070a12] flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto">
          {availableTabs.map((tab) => (
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
          {userRoleMode === 'user' ? (
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <User className="w-3.5 h-3.5" />
              <span>User Studio (First 3 Layers)</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
              <Code2 className="w-3.5 h-3.5" />
              <span>Developer Engineering Studio</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* ======================================================== */}
        {/* LAYER 1: IDEA INTAKE LAYER */}
        {/* ======================================================== */}
        {activeLayer === 'idea_intake' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
            {/* Header Hero Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/20 to-slate-900 border border-cyan-500/20 relative overflow-hidden">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono mb-2">
                <Compass className="w-4 h-4" />
                <span>Layer 01 • Multimodal Idea Intake</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Explain Your Software Idea Naturally
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
                Describe your vision in plain language, record a voice thought memo, or attach existing specifications. BuildMind decomposes your intent and builds a developer-ready engineering contract across all 31 system layers.
              </p>
            </div>

            {/* Input Mode Selector */}
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2">
              <button
                onClick={() => setActiveTab('text')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'text' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Natural Text Prompt</span>
              </button>
              <button
                onClick={() => setActiveTab('voice')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'voice' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Voice Speech Memo</span>
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'documents' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Specs & Documents</span>
              </button>
            </div>

            {/* Input Form Box */}
            <form onSubmit={handleSynthesize} className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-4 shadow-xl">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                  Project Title (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Autonomous Multi-Agent Fabric, Real-Time Cross-Border Clearing"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-100 placeholder-slate-400 text-xs focus:outline-none focus:border-cyan-400 font-medium"
                />
              </div>

              {activeTab === 'text' && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Describe what you want to build
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Describe your software system, users, core workflows, database entities, security needs, integrations, performance expectations..."
                    value={inputIdea}
                    onChange={(e) => setInputIdea(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-slate-100 placeholder-slate-400 text-xs leading-relaxed focus:outline-none focus:border-cyan-400 font-mono resize-y"
                  />
                </div>
              )}

              {activeTab === 'voice' && (
                <div className="p-6 rounded-xl border border-dashed border-cyan-500/30 bg-cyan-950/10 flex flex-col items-center justify-center text-center space-y-3">
                  <button
                    type="button"
                    onClick={handleToggleVoice}
                    className={`p-4 rounded-full transition-all shadow-lg ${
                      isRecordingVoice
                        ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/40'
                        : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/30'
                    }`}
                  >
                    {isRecordingVoice ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                  </button>
                  <div>
                    <h4 className="font-bold text-sm text-slate-200">
                      {isRecordingVoice ? `Recording voice memo... (${voiceTimer}s)` : 'Click to record thought memo'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Speech-to-intent engine transcribes audio and extracts core functional requirements.
                    </p>
                  </div>
                  {inputIdea && (
                    <div className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-left font-mono text-xs text-slate-300 mt-2">
                      <span className="text-cyan-400 font-bold">Transcript: </span> {inputIdea}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="p-6 rounded-xl border border-dashed border-white/15 bg-white/[0.02] flex flex-col items-center justify-center text-center space-y-2">
                  <UploadCloud className="w-8 h-8 text-slate-400" />
                  <h4 className="font-bold text-xs text-slate-200">Drop PDF, Markdown, PRD, or OpenAPI specs</h4>
                  <p className="text-[11px] text-slate-400">
                    Supports .md, .pdf, .json, .yaml, .txt. System extracts domains, schemas, and endpoints automatically.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setInputIdea(
                        'Imported Spec: Multi-tenant logistics dispatch platform with real-time GPS telemetry, FMCSA HOS compliance, and automated Stripe billing.'
                      );
                    }}
                    className="mt-2 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-slate-300 transition-colors"
                  >
                    Load Sample Document: Fleet_Spec.md
                  </button>
                </div>
              )}

              {/* Submit / Synthesize Button */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-slate-400 font-mono">
                  Engine: <span className="text-cyan-400 font-semibold">Intent Decomposition Matrix</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || !inputIdea.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Synthesizing Intent...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Synthesize Intent & Analyze</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Extracted Intake Artifacts */}
            <div className="p-4 rounded-xl bg-[#0b0f19] border border-white/[0.08] space-y-3">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center justify-between">
                <span>Active Intake Sources</span>
                <span className="text-cyan-400">{project.intake.multimodalInputs.length} sources attached</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.intake.multimodalInputs.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/[0.03] border border-white/10 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{item.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-slate-400 mt-1 text-[11px] line-clamp-2">{item.contentSnippet}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 2: AI INTENT UNDERSTANDING ENGINE */}
        {/* ======================================================== */}
        {activeLayer === 'intent_understanding' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div>
                  <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
                    Layer 02 • AI Intent Understanding Engine
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">Semantic Intent Decomposition</h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono">
                  {project.domainCategory}
                </span>
              </div>

              {/* Problem & Goals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    Core Problem Statement
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {project.intentAnalysis.problemStatement}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    Extracted Core Goals
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {project.intentAnalysis.coreGoals.map((g, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actors & Business Rules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    Identified Actors & Personas
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {project.intentAnalysis.primaryActors.map((actor, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                        <span>{actor}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    Business Invariants & Rules
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {project.intentAnalysis.businessRules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Unknowns, Ambiguities, Conflicts */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono uppercase">
                  <AlertCircle className="w-4 h-4" />
                  <span>Ambiguities & Tension Points Detected</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="font-bold text-amber-300 text-[11px] font-mono">Unknowns:</span>
                    <ul className="mt-1 space-y-1 text-slate-300 text-[11px]">
                      {project.intentAnalysis.unknowns.map((u, i) => (
                        <li key={i}>• {u}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-amber-300 text-[11px] font-mono">Ambiguities:</span>
                    <ul className="mt-1 space-y-1 text-slate-300 text-[11px]">
                      {project.intentAnalysis.ambiguities.map((a, i) => (
                        <li key={i}>• {a}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-amber-300 text-[11px] font-mono">Architectural Conflicts:</span>
                    <ul className="mt-1 space-y-1 text-slate-300 text-[11px]">
                      {project.intentAnalysis.conflicts.map((c, i) => (
                        <li key={i}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Progression Action */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setActiveLayer('idea_intake')}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-semibold"
                >
                  ← Edit Intent Prompt
                </button>

                <button
                  onClick={() => setActiveLayer('domain_matrix')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
                >
                  <span>Proceed to Layer 3: Dynamic Domain Matrix</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 3: DYNAMIC REQUIREMENT ENGINEERING DOMAINS (40+) */}
        {/* ======================================================== */}
        {activeLayer === 'domain_matrix' && (
          <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
                  Layer 03 • Dynamic Engineering Domain Matrix
                </div>
                <h3 className="text-xl font-bold text-white mt-0.5">Active Engineering Domains (40+)</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  The system automatically configures which engineering disciplines are relevant to your project.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-300 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/40">
                  {project.domains.filter((d) => d.isActive).length}/{project.domains.length} Domains Active
                </span>
              </div>
            </div>

            {/* Domains Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {project.domains.map((domain) => (
                <div
                  key={domain.id}
                  className={`p-4 rounded-xl border transition-all ${
                    domain.isActive
                      ? 'bg-[#0b0f19] border-white/10 hover:border-cyan-500/40'
                      : 'bg-black/40 border-white/5 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                      {domain.category}
                    </span>
                    <button
                      onClick={() => toggleDomain(domain.id)}
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-colors ${
                        domain.isActive
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-white/5 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {domain.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </div>

                  <h4 className="font-bold text-xs text-slate-100 mt-1">{domain.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{domain.description}</p>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.06] text-[10px] font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <span>
                        Comp: <strong className="text-slate-200">{domain.complexityScore}/10</strong>
                      </span>
                      <span>
                        Risk: <strong className="text-amber-400">{domain.riskScore}/10</strong>
                      </span>
                    </div>
                    <span className="text-cyan-400 font-semibold">{domain.answeredCount} Specs Ready</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Developer Handoff Card for User */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-[#0b0f19] border border-purple-500/30 space-y-4 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 shrink-0">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white">
                      User Intake Complete • Specification Ready for Engineers
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                      You have completed the 3 User Layers! The remaining 28 engineering layers (Architecture Diagrams, Database Schemas, OpenAPI Contracts, Threat Models, and Test Suites) have been compiled automatically in the background.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => {
                      setUserRoleMode('developer');
                      setActiveCategory('build_drift');
                      setActiveLayer('build_contract');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-slate-200 font-semibold text-xs transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Build Contract</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserRoleMode('developer');
                      setActiveCategory('truth_governance');
                      setActiveLayer('assumption_firewall');
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-purple-500/20 cursor-pointer"
                  >
                    <span>Open 28 Developer Layers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* LAYER 4: ADAPTIVE Q&A SYSTEM (DEVELOPER MODE) */}
        {/* ======================================================== */}
        {activeLayer === 'adaptive_discovery' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-purple-400 text-xs font-bold uppercase tracking-wider font-mono">
                Layer 04 • Adaptive Discovery Engine (Developer View)
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Progressive Q&A ($Complexity \times Risk \times Dependency \times Importance$)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                The depth and progression of questions dynamically adapt based on previously selected architectural choices.
              </p>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {project.discoveryQuestions.map((q) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-4 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-slate-400 mb-1">
                        <span className="px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                          {q.domainId}
                        </span>
                        <span className="text-amber-400 font-bold">{q.importance}</span>
                        <span>•</span>
                        <span className="text-slate-400">Formula: {q.depthFormula}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-100">{q.question}</h4>
                      <p className="text-xs text-slate-400 mt-1">{q.description}</p>
                    </div>

                    <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-white/5 text-purple-300 border border-white/10 shrink-0">
                      Score: {q.depthScore}
                    </span>
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {q.options.map((opt) => {
                      const isSelected = q.selectedOptionId === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => answerQuestion(q.id, opt.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-purple-950/40 border-purple-500/60 text-purple-100 shadow-sm'
                              : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs text-slate-100">{opt.label}</span>
                            {opt.recommended && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">{opt.description}</p>
                          {opt.tradeoffs && (
                            <p className="text-[10px] text-amber-400/80 mt-1 font-mono">Trade-offs: {opt.tradeoffs}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {q.aiRationale && (
                    <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[11px] text-purple-300/90 font-mono flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>AI Rationale: {q.aiRationale}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
