// ============================================================================
// INTENTFORGE: SPECIFICATION DATA MODELS (STAGES 00 - 52)
// ============================================================================

export type DomainCategory = 
  | 'Product'
  | 'Users'
  | 'Authentication'
  | 'Authorization'
  | 'UI/UX'
  | 'Motion'
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Storage'
  | 'Payments'
  | 'Communication'
  | 'AI'
  | 'GPU / Compute'
  | 'Security'
  | 'Observability'
  | 'Infrastructure'
  | 'DevOps'
  | 'Testing'
  | 'Compliance';

export type ProductMode = 
  | 'IDEA'
  | 'DISCOVERY'
  | 'SPECIFICATION'
  | 'ARCHITECTURE'
  | 'DESIGN'
  | 'BUILD'
  | 'VERIFY';

export type NavigationTab = 
  | 'dashboard'
  | 'idea'
  | 'discovery'
  | 'requirements'
  | 'actors-workflows'
  | 'architecture'
  | 'database'
  | 'apis'
  | 'ux-ui'
  | 'security'
  | 'integrations'
  | 'infrastructure'
  | 'testing'
  | 'risks'
  | 'dependencies'
  | 'build-contract'
  | 'verify'
  | 'memory-graph';

export type AssumptionClassification = 
  | 'CONFIRMED'
  | 'INFERRED'
  | 'ASSUMED'
  | 'UNKNOWN'
  | 'CONFLICT';

export type RequirementStatus = 
  | 'Confirmed'
  | 'Pending'
  | 'Rejected'
  | 'Needs Clarification'
  | 'Deprecated';

export type RequirementSource = 
  | 'User'
  | 'AI Inference'
  | 'Existing Documentation'
  | 'Imported Repository'
  | 'Template'
  | 'Industry Pattern';

export interface IdeaDNA {
  problem: string;
  users: string[];
  solution: string;
  coreWorkflow: string;
  businessModel: string;
  platform: string[];
  primaryGoal: string;
  secondaryGoals: string[];
  knownConstraints: string[];
  unknownRequirements: string[];
  potentialRisks: string[];
}

export interface DynamicQuestion {
  id: string;
  category: DomainCategory;
  question: string;
  technicalContext: string;
  aiRecommendation: string;
  whyExplanation: {
    rationale: string;
    tradeoffs: string[];
    alternatives: string[];
    costImpact: string;
    complexityLevel: 'Low' | 'Medium' | 'High' | 'Enterprise';
  };
  options: string[];
  selectedOption: string;
  userCustomAnswer?: string;
  status: 'answered' | 'unanswered' | 'flagged';
  impactsDownstreamCount: number;
}

export interface RequirementItem {
  id: string;
  code: string; // e.g. "AUTH-001"
  category: DomainCategory;
  title: string;
  description: string;
  classification: AssumptionClassification;
  confidenceScore: number; // 0 - 100
  source: RequirementSource;
  status: RequirementStatus;
  userFacingQuestion?: string;
  technicalSpec: string;
  dependencies: string[]; // List of requirement IDs or entity IDs it depends on
  downstreamImpacts: string[]; // IDs of items affected if this changes
  conflictReason?: string;
}

export interface ActorRole {
  id: string;
  name: string;
  type: 'Human' | 'System' | 'AI Agent' | 'Partner';
  description: string;
  capabilities: string[];
  securityLevel: 'Public' | 'Authenticated' | 'Privileged' | 'SuperAdmin';
}

export interface PermissionMatrixRow {
  resource: string;
  permissions: Record<string, 'Full' | 'Own' | 'Limited' | 'No'>; // roleId -> permission
}

export interface WorkflowStep {
  stepNumber: number;
  actorId: string;
  actionTitle: string;
  description: string;
  inputs: string[];
  systemAction: string;
  output: string;
  validationRules: string[];
  failureCondition: string;
  recoveryPath: string;
  databaseEvent: string;
  notificationTriggered?: string;
  auditLogEvent: string;
}

export interface WorkflowModel {
  id: string;
  name: string;
  actor: string;
  summary: string;
  preconditions: string[];
  steps: WorkflowStep[];
  happyPathSummary: string;
  failurePathSummary: string;
  recoveryPathSummary: string;
}

export interface FeatureContract {
  id: string;
  code: string;
  featureName: string;
  purpose: string;
  actor: string;
  preconditions: string[];
  inputs: string[];
  validation: string[];
  systemAction: string;
  database: string;
  events: string[];
  notifications: string[];
  failureCases: string[];
  securityBoundary: string;
  auditTrail: string;
  acceptanceCriteria: string[];
}

export interface DatabaseField {
  name: string;
  type: string;
  isPrimary?: boolean;
  isNullable?: boolean;
  isUnique?: boolean;
  foreignKey?: { table: string; field: string };
  description: string;
}

export interface DatabaseEntity {
  id: string;
  tableName: string;
  description: string;
  fields: DatabaseField[];
  indexes: string[];
  constraints: string[];
  softDelete: boolean;
  dataRetentionPolicy: string;
}

export interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  summary: string;
  actorRequired: string;
  authStrategy: string;
  rateLimit: string;
  requestBodySchema?: string;
  responseSuccessSchema: string;
  errorCodes: { code: number; reason: string }[];
  auditLogged: boolean;
}

export interface ScreenSpec {
  id: string;
  name: string;
  route: string;
  purpose: string;
  targetActors: string[];
  components: string[];
  states: {
    loading: string;
    empty: string;
    success: string;
    error: string;
    offline: string;
    permissionDenied: string;
  };
  responsiveBreakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export interface DesignSystemSpec {
  themeName: string;
  visualLanguage: string;
  typography: {
    headingFont: string;
    bodyFont: string;
    codeFont: string;
    scale: { name: string; size: string; weight: string; tracking: string }[];
  };
  colorPalette: {
    name: string;
    token: string;
    hsl: string;
    hex: string;
    usage: string;
  }[];
  spacingTokens: { name: string; value: string }[];
  interactionPrinciples: string[];
  motionPrinciples: {
    animation: string;
    trigger: string;
    duration: string;
    easing: string;
    purpose: string;
    accessibilityFallback: string;
  }[];
}

export interface EdgeCaseScenario {
  id: string;
  title: string;
  category: 'Network' | 'Payment' | 'Concurrency' | 'Data Loss' | 'Security' | 'AI Hallucination';
  whatIfQuestion: string;
  happyPath: string;
  failurePath: string;
  recoveryPath: string;
  preventionMechanism: string;
}

export interface ThirdPartyIntegration {
  id: string;
  name: string;
  category: 'Payment' | 'Communication' | 'Maps/Location' | 'Cloud Storage' | 'AI / LLM' | 'Identity';
  purpose: string;
  authMethod: string;
  dataFlow: string;
  failureFallback: string;
  estimatedCostUnit: string;
  securityControls: string[];
}

export interface ScaleCostEstimate {
  activeUsers: number;
  monthlyTotalCostUsd: number;
  breakdown: {
    database: number;
    compute: number;
    storage: number;
    bandwidth: number;
    externalApis: number;
    aiInference: number;
  };
  assumptions: string[];
}

export interface TestingDimension {
  id: string;
  layer: 'Unit' | 'Integration' | 'API' | 'E2E' | 'Security' | 'Performance' | 'Regression' | 'Acceptance';
  targetComponent: string;
  coverageTarget: string;
  scenario: string;
  passCriteria: string;
}

export interface RedFlagItem {
  id: string;
  severity: 'BLOCKER' | 'WARNING' | 'ASSUMPTION' | 'RISK' | 'OPTIMIZATION';
  category: DomainCategory;
  title: string;
  explanation: string;
  actionRequired: string;
  resolved: boolean;
}

export interface AIMemoryTier {
  id: string;
  tier: 
    | 'Product Memory'
    | 'Decision Memory'
    | 'Requirement Memory'
    | 'Constraint Memory'
    | 'Architecture Memory'
    | 'User Preference Memory'
    | 'Change Memory';
  key: string;
  content: string;
  timestamp: string;
  immutable: boolean;
}

export interface SpecVersionHistory {
  version: string;
  timestamp: string;
  author: string;
  summary: string;
  changesCount: {
    requirements: number;
    database: number;
    apis: number;
    screens: number;
  };
  locked: boolean;
}

export interface CodeVerificationResult {
  fileAnalyzed: string;
  timestamp: string;
  overallStatus: 'PASSED' | 'WARNING' | 'SECURITY_DEVIATION_DETECTED';
  findings: {
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
    ruleId: string;
    requirementCodeRef: string;
    message: string;
    lineSnippet: string;
    recommendedFix: string;
  }[];
}

export interface ProjectSpecification {
  id: string;
  name: string;
  tagline: string;
  lastUpdated: string;
  version: string;
  isLocked: boolean;
  activeMode: ProductMode;
  ideaRawInput: string;
  ideaDNA: IdeaDNA;
  selectedDomains: DomainCategory[];
  questions: DynamicQuestion[];
  requirements: RequirementItem[];
  actors: ActorRole[];
  permissionMatrix: PermissionMatrixRow[];
  workflows: WorkflowModel[];
  featureContracts: FeatureContract[];
  databaseEntities: DatabaseEntity[];
  apiEndpoints: APIEndpoint[];
  screens: ScreenSpec[];
  designSystem: DesignSystemSpec;
  edgeCases: EdgeCaseScenario[];
  integrations: ThirdPartyIntegration[];
  costEstimates: Record<number, ScaleCostEstimate>;
  testingDimensions: TestingDimension[];
  redFlags: RedFlagItem[];
  aiMemory: AIMemoryTier[];
  versions: SpecVersionHistory[];
  verificationAudits: CodeVerificationResult[];
}
