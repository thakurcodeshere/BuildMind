import React, { useState } from 'react';
import { X, Key, Cpu, Sparkles, Check, Shield } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const SettingsModal: React.FC = () => {
  const { activeModal, setActiveModal, settings, updateSettings } = useProject();

  const [formState, setFormState] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (activeModal !== 'settings') return null;

  const handleSave = () => {
    updateSettings(formState);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveModal(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#090d16] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100">IntentOS Engine & AI Settings</h3>
              <p className="text-[11px] text-slate-400">Configure LLM inference providers and API keys</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Active Model Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
              Default Reasoning Engine
            </label>
            <select
              value={formState.selectedModel}
              onChange={(e) => setFormState({ ...formState, selectedModel: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
            >
              <option value="Claude 3.7 Sonnet (Thinking Engine)" className="bg-[#090d16]">
                Claude 3.7 Sonnet (Thinking Engine)
              </option>
              <option value="Gemini 2.5 Pro (Deep Research)" className="bg-[#090d16]">
                Gemini 2.5 Pro (Deep Research)
              </option>
              <option value="GPT-4o Omnimodal" className="bg-[#090d16]">
                GPT-4o Omnimodal
              </option>
              <option value="Built-in Zero-Config Heuristic Engine" className="bg-[#090d16]">
                Built-in Zero-Config Heuristic Engine (Offline / Instant)
              </option>
            </select>
          </div>

          {/* API Keys Section */}
          <div className="space-y-3 pt-2 border-t border-white/[0.08]">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 uppercase tracking-wider font-mono">
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span>Direct Provider API Keys (Optional)</span>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Anthropic Claude API Key</label>
              <input
                type="password"
                placeholder="sk-ant-api03-..."
                value={formState.apiKeyAnthropic}
                onChange={(e) => setFormState({ ...formState, apiKeyAnthropic: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Google Gemini API Key</label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={formState.apiKeyGemini}
                onChange={(e) => setFormState({ ...formState, apiKeyGemini: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">OpenAI API Key</label>
              <input
                type="password"
                placeholder="sk-proj-..."
                value={formState.apiKeyOpenAI}
                onChange={(e) => setFormState({ ...formState, apiKeyOpenAI: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200 focus:outline-none focus:border-cyan-400 font-mono text-xs"
              />
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-start gap-2 text-[11px] text-cyan-300">
            <Shield className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              All API keys are strictly saved in your browser&apos;s local storage and never sent to any intermediary server.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/[0.08] bg-[#060810] flex items-center justify-between">
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors text-xs font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
