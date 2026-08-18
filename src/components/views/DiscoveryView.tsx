import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { DomainCategory, DynamicQuestion } from '../../types/specification';
import {
  Compass,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Share2,
  ArrowRight,
  Filter,
  Sliders
} from 'lucide-react';

interface DiscoveryViewProps {
  onOpenWhyModal: (question: DynamicQuestion) => void;
}

const all20Domains: DomainCategory[] = [
  'Product', 'Users', 'Authentication', 'Authorization', 'UI/UX',
  'Motion', 'Frontend', 'Backend', 'Database', 'Storage',
  'Payments', 'Communication', 'AI', 'GPU / Compute', 'Security',
  'Observability', 'Infrastructure', 'DevOps', 'Testing', 'Compliance'
];

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({ onOpenWhyModal }) => {
  const { project, answerQuestion, setActiveTab } = useProject();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredQuestions = selectedCategory === 'ALL'
    ? project.questions
    : project.questions.filter(q => q.category === selectedCategory);

  const answeredCount = project.questions.filter(q => q.status === 'answered').length;

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                STAGES 03, 04, 08 & 09
              </span>
              <span className="text-xs text-slate-400 font-medium">Domain Segments & Adaptive Questioning</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              The 100-Question Principle & Explainability Engine
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              Technical decisions are translated into understandable questions. The AI dynamically adapts question depth from <strong>Complexity × Risk × Dependency × Business Criticality</strong>. Every recommendation provides an explainable <strong>“Why?”</strong> breakdown.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 self-start lg:self-auto">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Discovery Progress</span>
              <span className="text-base font-bold font-mono text-emerald-400">
                {answeredCount} / {project.questions.length} Answered
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Stage 03: 20 Engineering Domain Selector Pills */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Stage 03: Software Engineering Domain Segments (20 Domains)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {project.selectedDomains.length} Active Domains
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            All Domains ({project.questions.length})
          </button>
          {all20Domains.map((domain) => {
            const isSelected = project.selectedDomains.includes(domain);
            const count = project.questions.filter(q => q.category === domain).length;
            return (
              <button
                key={domain}
                onClick={() => setSelectedCategory(domain)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  selectedCategory === domain
                    ? 'bg-sky-500 text-white'
                    : isSelected
                    ? 'bg-slate-900 text-slate-200 border border-slate-700/80 hover:border-slate-600'
                    : 'bg-slate-950/40 text-slate-500 border border-slate-800/60'
                }`}
              >
                <span>{domain}</span>
                {count > 0 && (
                  <span className="px-1 py-0.2 rounded text-[10px] font-mono bg-slate-800 text-sky-300">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage 04 & 09: Adaptive Questions Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-400" />
            <span>Adaptive Fill-in-the-Blank Discovery Questions</span>
          </h3>
          <span className="text-xs text-slate-400">
            Click "Why?" to inspect architectural rationale and trade-offs.
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="glass-panel p-6 hover:border-slate-700 transition-all space-y-4"
            >
              {/* Question Header & Domain Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-sky-500/10 text-sky-300 border border-sky-500/20">
                    {q.category}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {q.question}
                  </h4>
                </div>

                {/* Downstream Impact & Why Trigger */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    <Share2 className="w-3 h-3" />
                    Impacts {q.impactsDownstreamCount} specs
                  </span>
                  <button
                    onClick={() => onOpenWhyModal(q)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-semibold border border-sky-500/40 transition-all hover:scale-105"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                    <span>Why?</span>
                  </button>
                </div>
              </div>

              {/* Technical Context */}
              <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                <span className="font-semibold text-slate-400 mr-1.5">Context:</span>
                {q.technicalContext}
              </p>

              {/* AI Recommendation Banner */}
              <div className="p-3 rounded-lg bg-sky-500/5 border border-sky-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span className="text-xs text-slate-300">
                    AI Recommendation: <strong className="text-sky-200">{q.aiRecommendation}</strong>
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Complexity: {q.whyExplanation.complexityLevel}
                </span>
              </div>

              {/* Selectable Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {q.options.map((opt, idx) => {
                  const isSelected = q.selectedOption === opt;
                  return (
                    <button
                      key={idx}
                      onClick={() => answerQuestion(q.id, opt)}
                      className={`p-3 rounded-xl text-left text-xs font-semibold transition-all border flex items-center justify-between ${
                        isSelected
                          ? 'bg-sky-500/20 text-white border-sky-500 shadow-md shadow-sky-500/10'
                          : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <span className="leading-snug">{opt}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
