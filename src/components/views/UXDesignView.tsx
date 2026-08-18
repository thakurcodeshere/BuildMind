import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import {
  Palette,
  Layout,
  Play,
  Monitor,
  Tablet,
  Smartphone,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';

export const UXDesignView: React.FC = () => {
  const { project } = useProject();
  const [activeSubTab, setActiveSubTab] = useState<'screens' | 'designSystem' | 'motion'>('screens');
  const [selectedScreenId, setSelectedScreenId] = useState<string>(project.screens[0]?.id || 'screen_shipper_dashboard');

  const selectedScreen = project.screens.find(s => s.id === selectedScreenId) || project.screens[0];
  const { designSystem } = project;

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                STAGES 20, 21 & 22
              </span>
              <span className="text-xs text-slate-400 font-medium">UI/UX, Design Intent & Motion Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              Interface Specification, Design System & Motion Studio
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              Zero placeholder guesswork. Every screen defines its 6 mandatory lifecycle states (Loading, Empty, Success, Error, Offline, Denied) and responsive breakpoints, paired with purposeful motion choreography.
            </p>
          </div>

          {/* Sub-tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 self-start lg:self-auto">
            <button
              onClick={() => setActiveSubTab('screens')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'screens' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Screens ({project.screens.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('designSystem')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'designSystem' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Design System</span>
            </button>
            <button
              onClick={() => setActiveSubTab('motion')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'motion' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Motion Engine</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-view 1: Screen Specs & 6-State Matrix */}
      {activeSubTab === 'screens' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Screen List Sidebar */}
          <div className="glass-panel p-4 space-y-2 lg:col-span-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block px-2 mb-2">
              Application Screens
            </span>
            {project.screens.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedScreenId(s.id)}
                className={`w-full p-3 rounded-xl text-left transition-all space-y-1 ${
                  selectedScreenId === s.id
                    ? 'bg-sky-500/20 text-white border border-sky-500/40 shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-xs font-bold text-white block">{s.name}</span>
                <span className="text-[10px] font-mono text-slate-500 block">{s.route}</span>
              </button>
            ))}
          </div>

          {/* Screen Details & State Matrix */}
          <div className="glass-panel p-6 lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold text-sky-400 uppercase">Screen Specification</span>
                <h3 className="text-xl font-bold text-white font-display">{selectedScreen.name}</h3>
                <p className="text-xs text-slate-300 mt-1">{selectedScreen.purpose}</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-sky-300 font-mono text-xs border border-slate-700">
                Route: {selectedScreen.route}
              </span>
            </div>

            {/* Components Tree */}
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-2">
                Core UI Component Tree:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedScreen.components.map((comp, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span className="text-slate-200 font-semibold">{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6 Mandatory UI States Matrix */}
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-3">
                Mandatory 6-State UI Behavior Matrix:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-sky-500/20">
                  <span className="text-[10px] font-mono font-bold uppercase text-sky-400 block mb-1">Loading State</span>
                  <p className="text-slate-300">{selectedScreen.states.loading}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-1">Empty State</span>
                  <p className="text-slate-300">{selectedScreen.states.empty}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 block mb-1">Success / Live State</span>
                  <p className="text-slate-300">{selectedScreen.states.success}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-rose-500/20">
                  <span className="text-[10px] font-mono font-bold uppercase text-rose-400 block mb-1">Error State</span>
                  <p className="text-slate-300">{selectedScreen.states.error}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-amber-500/20">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-400 block mb-1">Offline State</span>
                  <p className="text-slate-300">{selectedScreen.states.offline}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-indigo-500/20">
                  <span className="text-[10px] font-mono font-bold uppercase text-indigo-400 block mb-1">Denied / 403 State</span>
                  <p className="text-slate-300">{selectedScreen.states.permissionDenied}</p>
                </div>
              </div>
            </div>

            {/* Responsive Breakpoints */}
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-3">
                Responsive Breakpoints Behavior:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                  <Smartphone className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white block">Mobile (&lt; 640px)</strong>
                    <p className="text-slate-400 text-[11px] mt-0.5">{selectedScreen.responsiveBreakpoints.mobile}</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                  <Tablet className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white block">Tablet (640px - 1024px)</strong>
                    <p className="text-slate-400 text-[11px] mt-0.5">{selectedScreen.responsiveBreakpoints.tablet}</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                  <Monitor className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-white block">Desktop (&gt; 1024px)</strong>
                    <p className="text-slate-400 text-[11px] mt-0.5">{selectedScreen.responsiveBreakpoints.desktop}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-view 2: Design System Tokens */}
      {activeSubTab === 'designSystem' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">{designSystem.themeName}</h3>
                <p className="text-xs text-slate-300">{designSystem.visualLanguage}</p>
              </div>
            </div>

            {/* Curated HSL Color Tokens */}
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-3">
                Curated Harmonious Color Palette Tokens:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {designSystem.colorPalette.map((color, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div
                      className="w-full h-10 rounded-lg border border-white/10 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <span className="text-xs font-bold text-white block truncate">{color.name}</span>
                      <span className="text-[10px] font-mono text-slate-400 block">{color.hex}</span>
                      <span className="text-[9px] text-slate-500 block truncate mt-1">{color.usage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Scale */}
            <div className="pt-4 border-t border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-3">
                Typography Scale & Font Hierarchies:
              </span>
              <div className="space-y-2">
                {designSystem.typography.scale.map((type, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">{type.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">Size: {type.size} | Weight: {type.weight} | Tracking: {type.tracking}</span>
                    </div>
                    <span className="font-display text-base text-sky-200">The quick brown fox</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-view 3: Motion Engine */}
      {activeSubTab === 'motion' && (
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Stage 22: Purposeful Motion & Micro-Animation Choreography
              </h3>
              <p className="text-xs text-slate-300">
                Motion must communicate state, hierarchy or feedback—never decorative fluff alone.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {designSystem.motionPrinciples.map((motion, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Play className="w-3.5 h-3.5 text-sky-400" />
                    <span>{motion.animation}</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/30">
                    Duration: {motion.duration}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono pt-1">
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">Trigger</span>
                    <span className="text-slate-300">{motion.trigger}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">Easing Curve</span>
                    <span className="text-indigo-300">{motion.easing}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase">Accessibility Fallback</span>
                    <span className="text-emerald-300">{motion.accessibilityFallback}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 pt-1 border-t border-slate-900">
                  <strong className="text-slate-400">Purpose:</strong> {motion.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
