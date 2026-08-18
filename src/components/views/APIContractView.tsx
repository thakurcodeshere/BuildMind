import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { APIEndpoint } from '../../types/specification';
import {
  Terminal,
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Code,
  Copy,
  Check
} from 'lucide-react';

export const APIContractView: React.FC = () => {
  const { project } = useProject();
  const [selectedApiId, setSelectedApiId] = useState<string>(project.apiEndpoints[0]?.id || 'api_create_booking');
  const [copiedResponse, setCopiedResponse] = useState(false);

  const selectedApi = project.apiEndpoints.find(a => a.id === selectedApiId) || project.apiEndpoints[0];

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(selectedApi.responseSuccessSchema);
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  const getMethodBadge = (method: APIEndpoint['method']) => {
    switch (method) {
      case 'GET': return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      case 'POST': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'PUT': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'PATCH': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      case 'DELETE': return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    }
  };

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                STAGE 19
              </span>
              <span className="text-xs text-slate-400 font-medium">API Contract Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              API Contracts & Schema Specification Studio
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              Deterministic endpoint contracts defined before implementation. Each route specifies required actor scopes, authentication strategies, rate-limiting budgets, JSON payloads, and error code matrices.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 self-start lg:self-auto">
            <span className="text-xs font-mono text-slate-400">
              {project.apiEndpoints.length} Validated Endpoints
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Endpoint Directory */}
        <div className="glass-panel p-4 space-y-2 lg:col-span-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block px-2 mb-2">
            REST Endpoints
          </span>
          {project.apiEndpoints.map((api) => (
            <button
              key={api.id}
              onClick={() => setSelectedApiId(api.id)}
              className={`w-full p-3 rounded-xl text-left transition-all space-y-1 ${
                selectedApiId === api.id
                  ? 'bg-sky-500/20 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold border ${getMethodBadge(api.method)}`}>
                  {api.method}
                </span>
                <span className="text-xs font-mono font-bold text-white truncate">{api.path}</span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">{api.summary}</p>
            </button>
          ))}
        </div>

        {/* Selected Endpoint Contract Inspector */}
        <div className="glass-panel p-6 lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${getMethodBadge(selectedApi.method)}`}>
                  {selectedApi.method}
                </span>
                <h3 className="text-xl font-bold font-mono text-white">
                  {selectedApi.path}
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1">{selectedApi.summary}</p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-slate-800 text-sky-300 border border-slate-700">
                Actor: {selectedApi.actorRequired}
              </span>
            </div>
          </div>

          {/* Security & Rate Limit Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-1">
                Authentication Strategy
              </span>
              <span className="font-mono text-sky-300">{selectedApi.authStrategy}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-1">
                Rate Limit Budget
              </span>
              <span className="font-mono text-amber-300">{selectedApi.rateLimit}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-1">
                Security Audit Logged
              </span>
              <span className="font-mono text-emerald-300">
                {selectedApi.auditLogged ? '✓ Enabled (WORM Immutable)' : 'Disabled'}
              </span>
            </div>
          </div>

          {/* Request & Response Schemas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            {/* Request Body */}
            {selectedApi.requestBodySchema && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                  Request Body JSON Schema:
                </span>
                <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800/80">
                  {selectedApi.requestBodySchema}
                </pre>
              </div>
            )}

            {/* Response Success */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">
                  Response 200 OK Schema:
                </span>
                <button
                  onClick={handleCopyResponse}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {copiedResponse ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedResponse ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-slate-950 text-emerald-200 font-mono text-xs overflow-x-auto border border-slate-800/80">
                {selectedApi.responseSuccessSchema}
              </pre>
            </div>
          </div>

          {/* Error Codes Matrix */}
          <div className="pt-2">
            <span className="text-[10px] font-mono font-bold uppercase text-rose-400 block mb-2">
              Explicit Error Response Codes & Failures:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {selectedApi.errorCodes.map((err, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-rose-500/5 border border-rose-500/20 flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-rose-500/20 text-rose-300">
                    HTTP {err.code}
                  </span>
                  <span className="text-slate-300">{err.reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
