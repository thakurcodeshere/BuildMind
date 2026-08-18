import React from 'react';
import { X, Sparkles, AlertCircle, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';
import { DynamicQuestion } from '../../types/specification';

interface WhyExplainModalProps {
  question: DynamicQuestion | null;
  onClose: () => void;
}

export const WhyExplainModal: React.FC<WhyExplainModalProps> = ({ question, onClose }) => {
  if (!question) return null;

  const { whyExplanation, aiRecommendation, question: qText } = question;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-view-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-sky-400">
              Architectural Explainability Engine (Why?)
            </span>
            <h3 className="text-lg font-bold text-white leading-tight">
              {qText}
            </h3>
          </div>
        </div>

        {/* Recommendation Box */}
        <div className="p-4 mb-6 rounded-xl bg-slate-950/60 border border-sky-500/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-400 uppercase tracking-wide font-semibold">AI Recommendation</span>
            <span className="px-2 py-0.5 text-xs font-semibold rounded bg-sky-500/20 text-sky-300">
              Complexity: {whyExplanation.complexityLevel}
            </span>
          </div>
          <p className="text-base font-semibold text-sky-200">
            {aiRecommendation}
          </p>
        </div>

        {/* Rationale & Core Logic */}
        <div className="space-y-4 mb-6 text-sm">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Technical Rationale
            </h4>
            <p className="text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
              {whyExplanation.rationale}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tradeoffs */}
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                Key Trade-offs
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {whyExplanation.tradeoffs.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alternatives Considered */}
            <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Alternatives Considered
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {whyExplanation.alternatives.map((alt, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                    <span>{alt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cost Impact */}
          <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Estimated Cost Impact:</span>
              <p className="text-xs text-slate-200">{whyExplanation.costImpact}</p>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="btn-primary w-full sm:w-auto"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
