import { CodeVerificationResult, ProjectSpecification } from '../types/specification';

export function runSpecificationVerificationScan(
  code: string,
  fileName: string,
  _project: ProjectSpecification
): CodeVerificationResult {
  const findings: CodeVerificationResult['findings'] = [];

  // Rule 1: Multi-Tenant Isolation Check
  if (
    (code.includes('findById') || code.includes('SELECT * FROM') || code.includes('invoices') || code.includes('bookings')) &&
    !code.includes('organizationId') &&
    !code.includes('organization_id') &&
    !code.includes('current_setting')
  ) {
    findings.push({
      severity: 'CRITICAL',
      ruleId: 'SEC-TENANT-ISOLATION-01',
      requirementCodeRef: 'AUTHZ-002',
      message: 'Database query accesses records without tenant isolation filter (missing organizationId check). Risk of cross-tenant data leakage.',
      lineSnippet: code.split('\n').find(l => l.includes('findById') || l.includes('SELECT') || l.includes('invoices')) || 'Query execution line',
      recommendedFix: 'Filter by organizationId: { where: { id: req.params.id, organizationId: req.user.organizationId } }'
    });
  }

  // Rule 2: Payment Idempotency & Error Handling
  if (
    (code.includes('stripe.') || code.includes('paymentIntents') || code.includes('transfer')) &&
    !code.includes('idempotencyKey') &&
    !code.includes('idempotency_key')
  ) {
    findings.push({
      severity: 'HIGH',
      ruleId: 'PAY-IDEMPOTENCY-MISSING',
      requirementCodeRef: 'PAY-006',
      message: 'Financial transfer / payment capture invocation lacks an explicit idempotencyKey. Network retry risks double-charging.',
      lineSnippet: code.split('\n').find(l => l.includes('stripe') || l.includes('paymentIntents')) || 'Payment invocation line',
      recommendedFix: 'Pass { idempotencyKey: `pay_${booking.id}_${eventHash}` } in the Stripe request options.'
    });
  }

  // Rule 3: Missing Try/Catch on External API calls
  if (
    (code.includes('await fetch') || code.includes('await axios') || code.includes('await stripe')) &&
    !code.includes('try {') &&
    !code.includes('.catch(')
  ) {
    findings.push({
      severity: 'MEDIUM',
      ruleId: 'ERR-UNHANDLED-EXTERNAL-API',
      requirementCodeRef: 'TEL-004',
      message: 'Asynchronous external service call is not wrapped in a try/catch error boundary or recovery path handler.',
      lineSnippet: code.split('\n').find(l => l.includes('await fetch') || l.includes('await axios') || l.includes('await stripe')) || 'External API call',
      recommendedFix: 'Wrap in try/catch block with fallback state recovery and notification logging.'
    });
  }

  // Rule 4: Hardcoded Secrets / API Keys
  if (
    code.includes('sk_live_') ||
    code.includes('sk_test_51') ||
    code.includes('AIzaSy') ||
    code.includes('postgres://')
  ) {
    findings.push({
      severity: 'CRITICAL',
      ruleId: 'SEC-HARDCODED-SECRET',
      requirementCodeRef: 'AUTH-001',
      message: 'Detected hardcoded production secret or database connection string in source code.',
      lineSnippet: code.split('\n').find(l => l.includes('sk_') || l.includes('AIzaSy') || l.includes('postgres://')) || 'Secret line',
      recommendedFix: 'Move sensitive credentials to environment variables (`process.env.STRIPE_SECRET_KEY`).'
    });
  }

  const overallStatus = findings.some(f => f.severity === 'CRITICAL')
    ? 'SECURITY_DEVIATION_DETECTED'
    : findings.length > 0
    ? 'WARNING'
    : 'PASSED';

  return {
    fileAnalyzed: fileName,
    timestamp: new Date().toISOString(),
    overallStatus,
    findings
  };
}
