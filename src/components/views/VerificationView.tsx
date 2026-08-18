import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { CodeVerificationResult } from '../../types/specification';
import {
  GitBranch,
  ShieldCheck,
  Flame,
  AlertTriangle,
  Play,
  FileCode2,
  CheckCircle2,
  Bug,
  Terminal,
  Sparkles,
  Wrench,
  RotateCcw
} from 'lucide-react';

const sampleVulnerableCode = `// Express endpoint handler for retrieving invoices
app.get('/api/v1/invoices/:id', async (req, res) => {
  // BUG 1: Missing organization_id tenant filter (Breaches AUTHZ-002)
  const invoice = await db.invoices.findById(req.params.id);
  
  if (!invoice) {
    return res.status(404).json({ error: 'Invoice not found' });
  }

  // BUG 2: Unhandled external payment call without idempotency key or try/catch (Breaches PAY-006)
  await stripe.paymentIntents.capture(invoice.paymentIntentId);

  res.json({ status: 'success', data: invoice });
});`;

const sampleSecureCode = `// Secure implementation with tenant isolation and idempotency
app.get('/api/v1/invoices/:id', authenticateToken, async (req, res) => {
  try {
    // ENFORCED: Tenant isolation check
    const invoice = await db.invoices.findOne({
      where: {
        id: req.params.id,
        organizationId: req.user.organizationId
      }
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // ENFORCED: Idempotent payment capture with try/catch
    await stripe.paymentIntents.capture(invoice.paymentIntentId, {
      idempotencyKey: \`cap_\${invoice.id}_\${invoice.hash}\`
    });

    res.json({ status: 'success', data: invoice });
  } catch (error) {
    logger.error('Failed to capture invoice payment', { error, invoiceId: req.params.id });
    res.status(500).json({ error: 'Payment settlement failed' });
  }
});`;

export const VerificationView: React.FC = () => {
  const { project, runVerificationScan } = useProject();
  const [codeSnippet, setCodeSnippet] = useState<string>(sampleVulnerableCode);
  const [fileName, setFileName] = useState<string>('src/controllers/invoiceController.ts');
  const [lastResult, setLastResult] = useState<CodeVerificationResult | null>(project.verificationAudits[0] || null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [justFixed, setJustFixed] = useState(false);

  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      const result = runVerificationScan(codeSnippet, fileName);
      setLastResult(result);
      setIsAuditing(false);
    }, 400);
  };

  const handleApplyFix = () => {
    setCodeSnippet(sampleSecureCode);
    setJustFixed(true);
    setTimeout(() => {
      const result = runVerificationScan(sampleSecureCode, fileName);
      setLastResult(result);
      setJustFixed(false);
    }, 300);
  };

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                STAGE 35
              </span>
              <span className="text-xs text-slate-400 font-medium">Specification → Code Verification Loop</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              Continuous Code Verification & Drift Engine
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              Audits AI-generated code against approved Build Contracts. Detects tenant isolation bypasses, missing idempotency keys, unhandled error boundaries, and API schema drift in real time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCodeSnippet(sampleVulnerableCode);
                setFileName('src/controllers/invoiceController.ts');
                handleRunAudit();
              }}
              className="btn-secondary text-xs px-3 py-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Load Vulnerable Code</span>
            </button>
            <button
              onClick={handleApplyFix}
              className="btn-primary text-xs px-3.5 py-1.5 flex items-center gap-1.5"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Auto-Fix All Deviations</span>
            </button>
          </div>
        </div>
      </div>

      {/* Code Input & Auditor Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Code Editor Container */}
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-sky-400" />
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-xs font-mono text-white px-2.5 py-1 rounded"
              />
            </div>
            <button
              onClick={handleRunAudit}
              disabled={isAuditing}
              className="btn-primary text-xs px-4 py-1.5 flex items-center gap-1.5"
            >
              <Play className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
              <span>{isAuditing ? 'Auditing Code...' : 'Run Spec Audit'}</span>
            </button>
          </div>

          <div className="relative">
            <textarea
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              rows={18}
              className={`w-full bg-slate-950 text-slate-200 font-mono text-xs p-4 rounded-xl border focus:outline-none focus:border-sky-500 leading-relaxed resize-y transition-all ${
                justFixed ? 'border-emerald-500 bg-emerald-950/20' : 'border-slate-800'
              }`}
            />
          </div>
        </div>

        {/* Right: Verification Findings */}
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                Verification Audit Engine
              </span>
              <h3 className="text-base font-bold text-white">Live Compliance Findings</h3>
            </div>

            {lastResult && (
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                lastResult.overallStatus === 'SECURITY_DEVIATION_DETECTED'
                  ? 'bg-rose-500/10 text-rose-300 border-rose-500/30 animate-pulse'
                  : lastResult.overallStatus === 'WARNING'
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              }`}>
                {lastResult.overallStatus}
              </span>
            )}
          </div>

          {lastResult && lastResult.findings.length > 0 ? (
            <div className="space-y-3">
              {lastResult.findings.map((finding, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border space-y-2 text-xs ${
                    finding.severity === 'CRITICAL'
                      ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                      : 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-rose-400" />
                      <span className="font-bold font-mono">[{finding.ruleId}]</span>
                      <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-slate-900 border border-slate-700">
                        Ref: {finding.requirementCodeRef}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-[10px] uppercase text-rose-400">
                      {finding.severity}
                    </span>
                  </div>

                  <p className="text-slate-200 font-semibold">{finding.message}</p>

                  <div className="p-2 rounded bg-slate-950/90 font-mono text-[11px] text-slate-300">
                    <span className="text-slate-500 block text-[9px] uppercase">Offending Snippet:</span>
                    <code>{finding.lineSnippet}</code>
                  </div>

                  <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/30 font-mono text-[11px] text-emerald-300 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-emerald-400 block text-[9px] uppercase font-bold">Recommended Fix:</span>
                      <code>{finding.recommendedFix}</code>
                    </div>
                    <button
                      onClick={handleApplyFix}
                      className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[10px] flex-shrink-0"
                    >
                      Apply Fix
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center space-y-3 rounded-xl bg-slate-950/40 border border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Zero Deviations Detected</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                The analyzed code complies with all approved tenant isolation rules, error handling specifications, and database invariants.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
