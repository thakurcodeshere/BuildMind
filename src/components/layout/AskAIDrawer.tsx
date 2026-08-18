import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { Bot, Send, X, Sparkles, CheckCircle2, ArrowRight, CornerDownLeft } from 'lucide-react';

interface AskAIDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AskAIDrawer: React.FC<AskAIDrawerProps> = ({ isOpen, onClose }) => {
  const { executeAskAICommand, project } = useProject();
  const [inputPrompt, setInputPrompt] = useState('');
  const [history, setHistory] = useState<{
    id: string;
    sender: 'user' | 'ai';
    text: string;
    actionApplied?: string;
  }[]>([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: `Hello! I am your Software Intent Compiler. 
You can describe new product capabilities in plain language (e.g. "I think customers should be able to invite teammates", "Add SMS OTP for drivers", or "Freeze specification v1.1"). 
I will automatically convert your intent into structured engineering artifacts, database tables, and permission rules.`
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!inputPrompt.trim() || isProcessing) return;

    const userText = inputPrompt;
    setInputPrompt('');

    const newMsgId = `msg_${Date.now()}`;
    setHistory(prev => [...prev, { id: newMsgId, sender: 'user', text: userText }]);
    setIsProcessing(true);

    setTimeout(() => {
      const result = executeAskAICommand(userText);
      setHistory(prev => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: result.reply,
          actionApplied: result.actionApplied
        }
      ]);
      setIsProcessing(false);
    }, 450);
  };

  const samplePrompts = [
    'I think customers should be able to invite employees to their company account.',
    'Add an automated FMCSA compliance check before drivers accept loads.',
    'Freeze and lock the specification into Version v1.1.'
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl h-full bg-slate-900 border-l border-slate-700/80 shadow-2xl flex flex-col animate-view-in">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Ask AI State Compiler</h3>
                <span className="px-2 py-0.2 text-[10px] font-mono font-bold rounded bg-sky-500/20 text-sky-300">
                  Stage 47
                </span>
              </div>
              <p className="text-xs text-slate-400">Conversational intent to structured engineering state</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {history.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-br-none shadow-md shadow-sky-600/20'
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-bl-none'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-sky-400 mb-1.5">
                    <Sparkles className="w-3 h-3" />
                    Intent Compiler
                  </div>
                )}
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.actionApplied && (
                  <div className="mt-2.5 pt-2 border-t border-slate-700 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>State Modified: {msg.actionApplied}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl text-xs text-sky-300 animate-pulse border border-slate-700">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Analyzing intent & compiling engineering dependencies...</span>
            </div>
          )}
        </div>

        {/* Quick Sample Prompts */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
            Suggested Intent Prompts:
          </span>
          <div className="flex flex-col gap-1.5">
            {samplePrompts.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => setInputPrompt(sample)}
                className="text-left text-xs text-slate-300 hover:text-sky-300 bg-slate-800/40 hover:bg-slate-800 p-2 rounded-lg border border-slate-700/50 transition-colors flex items-center justify-between group"
              >
                <span className="truncate">{sample}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your idea or product decision..."
            rows={2}
            className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 resize-none"
          />
          <button
            onClick={handleSend}
            disabled={!inputPrompt.trim() || isProcessing}
            className="btn-primary h-full px-4 rounded-xl flex items-center justify-center disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
