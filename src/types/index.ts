// IntentOS — Comprehensive Type Definitions for 31 Engineering Layers

export type EngineeringCategory = 
  | 'intake_intent'      // Layers 1, 2, 3, 4
  | 'truth_governance'   // Layers 5, 6, 23, 25
  | 'behavior_roles'     // Layers 7, 8, 9, 20
  | 'architecture_system'// Layers 10, 11, 12, 17, 18
  | 'ux_security'        // Layers 13, 14, 15, 16
  | 'economics_testing'  // Layers 19, 21, 22
  | 'build_drift';       // Layers 24, 26, 27, 28, 29, 30, 31

export type LayerId = 
  | 'idea_intake'             // 1
  | 'intent_understanding'    // 2
  | 'domain_matrix'           // 3
  | 'adaptive_discovery'      // 4
  | 'assumption_firewall'     // 5
  | 'requirement_confidence'  // 6
  | 'role_permission'         // 7
  | 'workflow_engineering'    // 8
  | 'feature_contracts'       // 9
  | 'architecture_engine'     // 10
  | 'data_engineering'        // 11
  | 'api_engineering'         // 12
  | 'ui_ux_engineering'       // 13
  | 'motion_interaction'      // 14
  | 'security_engineering'    // 15
  | 'privacy_compliance'      // 16
  | 'integration_layer'       // 17
  | 'infrastructure_compute'  // 18
  | 'cost_scalability'        // 19
  | 'error_edge_cases'        // 20
  | 'testing_layer'           // 21
  | 'dependency_graph'        // 22
  | 'cross_domain_validation' // 23
  | 'build_readiness'         // 24
  | 'risk_blockers'           // 25
  | 'spec_versioning'         // 26
  | 'spec_freeze'             // 27
  | 'build_contract'          // 28
  | 'ai_handoff'              // 29
  | 'implementation_verify'   // 30
  | 'continuous_loop';        // 31

export type AssumptionStatus = 
  | 'confirmed'
  | 'inferred'
  | 'assumed'
  | 'unknown'
  | 'conflicting'
  | 'rejected'
  | 'pending';

export interface AssumptionItem {
  id: string;
  statement: string;
  category: string;
  status: AssumptionStatus;
  confidence: number; // 0 to 100
  source: 'User Prompt' | 'AI Inference' | 'System Default' | 'Domain Heuristic' | 'Imported Spec';
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
  rationale: string;
  dependencies: string[];
  lastUpdated: string;
}

export interface DomainItem {
  id: string;
  name: string;
  category: 'Core Product' | 'Security & Auth' | 'Data & Storage' | 'Interface & Motion' | 'Compute & Infra' | 'Operations & Ops' | 'Compliance & Integrations';
  description: string;
  isActive: boolean;
  complexityScore: number; // 1-10
  riskScore: number; // 1-10
  importanceScore: number; // 1-10
  questionCount: number;
  answeredCount: number;
}

export interface AdaptiveQuestion {
  id: string;
  domainId: string;
  question: string;
  description: string;
  depthFormula: string; // "Complexity (8) x Risk (9) x Dep (7) x Imp (9)"
  depthScore: number;
  importance: 'Critical' | 'Architectural' | 'Optimization';
  options: {
    id: string;
    label: string;
    description: string;
    recommended?: boolean;
    tradeoffs?: string;
  }[];
  selectedOptionId?: string;
  customAnswer?: string;
  isAnswered: boolean;
  aiRationale?: string;
}

export interface RequirementItem {
  id: string;
  title: string;
  description: string;
  domain: string;
  confidenceScore: number; // 0-100
  source: 'Human Intent' | 'Adaptive Discovery' | 'Inferred Architecture';
  status: 'Validated' | 'Under Review' | 'Flagged' | 'Draft';
  priority: 'P0 - Blocker' | 'P1 - Core' | 'P2 - Secondary' | 'P3 - Nice-to-have';
  dependencies: string[];
  impactedLayers: LayerId[];
  validationState: 'Verified' | 'Pending Evidence' | 'Unresolved Conflict';
}

export interface RolePermissionModel {
  role: string;
  description: string;
  type: 'System Actor' | 'Human End-User' | 'Organization Admin' | 'External Service';
  organizationBoundary: 'Multi-Tenant Isolated' | 'Global Platform' | 'Team Scoped';
  permissions: {
    resource: string;
    actions: ('CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'EXECUTE' | 'MANAGE')[];
    conditions?: string;
  }[];
  ownershipRules: string;
  rateLimit: string;
}

export interface WorkflowNode {
  id: string;
  name: string;
  actor: string;
  trigger: string;
  input: string;
  systemAction: string;
  output: string;
  validation: string;
  stateChanges: string[];
  permissions: string[];
  failureConditions: string;
  recoveryConditions: string;
  notifications: string[];
  dataOperations: string;
  auditEvents: string;
}

export interface FeatureContract {
  id: string;
  featureName: string;
  purpose: string;
  scope: string;
  actors: string[];
  preconditions: string[];
  inputs: { name: string; type: string; validation: string }[];
  outputs: { name: string; type: string; guarantees: string }[];
  businessRules: string[];
  failureStates: { error: string; recovery: string }[];
  securityRequirements: string[];
  acceptanceCriteria: string[];
}

export interface ArchitectureLayerSpec {
  layerName: string;
  technology: string;
  pattern: string;
  responsibilities: string[];
  invariants: string[];
  redundancyStrategy: string;
}

export interface DataEntity {
  name: string;
  description: string;
  tableName: string;
  attributes: {
    name: string;
    type: string;
    isPrimary?: boolean;
    isNullable?: boolean;
    isUnique?: boolean;
    description: string;
  }[];
  relations: {
    targetEntity: string;
    type: '1:1' | '1:N' | 'N:M';
    foreignKey: string;
    cascade: 'CASCADE' | 'RESTRICT' | 'SET NULL';
  }[];
  indexes: string[];
  retentionPolicy: string;
  auditStrategy: string;
}

export interface ApiEndpointContract {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  summary: string;
  authStrategy: string;
  requiredPermissions: string[];
  requestHeaders: Record<string, string>;
  requestSchema: string;
  responseSchema: string;
  errorContracts: { statusCode: number; code: string; message: string }[];
  rateLimit: string;
  idempotencyRequired: boolean;
}

export interface UiScreenSpec {
  id: string;
  screenName: string;
  route: string;
  primaryActor: string;
  userJourneyStage: string;
  states: {
    empty: string;
    loading: string;
    error: string;
    success: string;
  };
  responsiveBreakpoints: string[];
  accessibilityStandards: string;
  keyComponents: string[];
}

export interface MotionSpec {
  interactionName: string;
  trigger: string;
  motionType: 'Transition' | 'Micro-interaction' | 'State Feedback' | 'Morph';
  durationMs: number;
  easing: string;
  accessibilityAlternative: string;
  performanceBudget: string;
}

export interface SecurityThreat {
  surface: string;
  strideCategory: 'Spoofing' | 'Tampering' | 'Repudiation' | 'Information Disclosure' | 'Denial of Service' | 'Elevation of Privilege';
  threatDescription: string;
  mitigationControl: string;
  verificationTest: string;
}

export interface ComplianceRule {
  standard: 'GDPR' | 'CCPA' | 'SOC 2 Type II' | 'HIPAA' | 'PCI-DSS' | 'ISO 27001';
  requirement: string;
  dataHandlingPolicy: string;
  consentMechanism: string;
  retentionWindow: string;
  exportDeletionSupport: string;
}

export interface IntegrationContract {
  providerName: string;
  serviceCategory: 'Payment' | 'Auth' | 'AI / LLM' | 'Communication' | 'Cloud Storage' | 'Analytics' | 'Enterprise ERP';
  purpose: string;
  dataExchanged: string;
  authMethod: string;
  dependencyCriticality: 'Hard Dependency' | 'Graceful Degradation' | 'Async Batch';
  failureRecovery: string;
  securityControls: string;
  estimatedCostPer10kEvents: string;
}

export interface InfrastructureTopology {
  cloudProvider: 'AWS' | 'GCP' | 'Azure' | 'Multi-Cloud / Hybrid';
  computeModel: 'Containerized (ECS/K8s)' | 'Serverless (Lambda/Cloud Run)' | 'Edge Functions' | 'Dedicated GPU Cluster';
  gpuRequirement: string;
  storageSolution: string;
  cdnAndEdge: string;
  networkingAndVpc: string;
  queuesAndEventBus: string;
  cacheLayer: string;
  regions: string[];
  disasterRecoveryRPO: string;
  disasterRecoveryRTO: string;
}

export interface CostScalabilityModel {
  mvpArchitecture: {
    monthlyTotal: number;
    computeCost: number;
    dbCost: number;
    aiTokenCost: number;
    bandwidthCost: number;
    thirdPartyCost: number;
    targetScale: string;
  };
  scaleArchitecture: {
    monthlyTotal: number;
    computeCost: number;
    dbCost: number;
    aiTokenCost: number;
    bandwidthCost: number;
    thirdPartyCost: number;
    targetScale: string;
  };
  scalingBottlenecks: string[];
}

export interface EdgeCaseMatrixItem {
  id: string;
  scenario: string;
  category: 'Network & Timeout' | 'Concurrency & Race Condition' | 'Partial Failure' | 'Data Inconsistency' | 'Security Anomaly';
  happyPath: string;
  failurePath: string;
  recoveryPath: string;
  codeDirective: string;
}

export interface DerivedTestCase {
  id: string;
  suiteType: 'Unit' | 'Integration' | 'API Contract' | 'End-to-End' | 'Security & Pen-test' | 'Performance & Load' | 'Accessibility';
  targetComponent: string;
  testScenario: string;
  expectedResult: string;
  traceableRequirementId: string;
}

export interface DependencyNode {
  id: string;
  name: string;
  type: 'Requirement' | 'Feature' | 'Role' | 'Screen' | 'API' | 'Database' | 'Integration' | 'Infra';
  domain: string;
  upstreamIds: string[];
  downstreamIds: string[];
}

export interface ValidationContradiction {
  id: string;
  axis: 'Requirements ↔ UX' | 'UX ↔ API' | 'API ↔ Security' | 'Security ↔ Architecture' | 'Database ↔ Scaling' | 'Integration ↔ Testing';
  severity: 'Blocker' | 'Warning' | 'Suggestion';
  description: string;
  impactedItems: string[];
  proposedResolution: string;
}

export interface BuildReadinessScorecard {
  overallScore: number; // 0 to 100
  dimensions: {
    requirementCompleteness: number;
    uxCompleteness: number;
    architectureReadiness: number;
    securityReadiness: number;
    dataReadiness: number;
    integrationReadiness: number;
    edgeCaseCoverage: number;
    testingReadiness: number;
    dependencyResolution: number;
  };
  isBuildReady: boolean;
  unresolvedBlockerCount: number;
}

export interface RiskBlockerItem {
  id: string;
  type: 'Critical Blocker' | 'Missing Requirement' | 'Unresolved Assumption' | 'Security Risk' | 'Architecture Risk' | 'Cost Spike';
  title: string;
  description: string;
  blocksImplementation: boolean;
  mitigationSteps: string[];
  resolved: boolean;
}

export interface SpecVersionRelease {
  version: string;
  releaseDate: string;
  author: string;
  commitHash: string;
  changeSummary: string;
  impactedLayers: string[];
  isFrozen: boolean;
  signedOffBy?: string;
  frozenTimestamp?: string;
}

export interface ImplementationDriftItem {
  id: string;
  fileOrEndpoint: string;
  driftType: 'Missing Requirement' | 'Incorrect Behavior' | 'Unauthorized Functionality' | 'Security Deviation' | 'Schema Mismatch';
  severity: 'Critical' | 'Moderate' | 'Minor';
  expectedSpec: string;
  actualImplementation: string;
  correctiveAction: string;
  status: 'Open Drift' | 'Resolved' | 'Accepted Exception';
}

export interface IntentOSProject {
  id: string;
  title: string;
  rawIdea: string;
  domainCategory: string;
  createdAt: string;
  updatedAt: string;
  isSpecFrozen: boolean;
  currentVersion: string;
  
  // Layer 1: Idea Intake
  intake: {
    multimodalInputs: { type: 'Text' | 'Voice' | 'Document' | 'Existing Spec'; name: string; contentSnippet: string; date: string }[];
    voiceTranscript?: string;
    extractedKeywords: string[];
  };

  // Layer 2: Intent Understanding
  intentAnalysis: {
    problemStatement: string;
    coreGoals: string[];
    primaryActors: string[];
    businessRules: string[];
    constraints: string[];
    unknowns: string[];
    ambiguities: string[];
    conflicts: string[];
  };

  // Layer 3: Dynamic Domains (40+ domains)
  domains: DomainItem[];

  // Layer 4: Adaptive Discovery Q&A
  discoveryQuestions: AdaptiveQuestion[];

  // Layer 5: Assumption Firewall
  assumptions: AssumptionItem[];

  // Layer 6: Requirement Traceability & Confidence
  requirements: RequirementItem[];

  // Layer 7: Roles & Permissions
  roles: RolePermissionModel[];

  // Layer 8: Workflow Engineering
  workflows: WorkflowNode[];

  // Layer 9: Feature Contracts
  featureContracts: FeatureContract[];

  // Layer 10: System Architecture
  architecture: ArchitectureLayerSpec[];

  // Layer 11: Data Engineering
  dataEntities: DataEntity[];

  // Layer 12: API Engineering
  apiEndpoints: ApiEndpointContract[];

  // Layer 13: UI/UX Engineering
  screens: UiScreenSpec[];

  // Layer 14: Motion & Interaction
  motionSpecs: MotionSpec[];

  // Layer 15: Security Engineering
  securityThreats: SecurityThreat[];

  // Layer 16: Privacy & Compliance
  complianceRules: ComplianceRule[];

  // Layer 17: Integration Layer
  integrations: IntegrationContract[];

  // Layer 18: Infrastructure & Compute
  infrastructure: InfrastructureTopology;

  // Layer 19: Cost & Scalability
  costScalability: CostScalabilityModel;

  // Layer 20: Error & Edge Cases
  edgeCases: EdgeCaseMatrixItem[];

  // Layer 21: Testing Engineering
  testCases: DerivedTestCase[];

  // Layer 22: Dependency Graph
  dependencyNodes: DependencyNode[];

  // Layer 23: Cross-Domain Validation
  contradictions: ValidationContradiction[];

  // Layer 24: Build Readiness Scorecard
  readiness: BuildReadinessScorecard;

  // Layer 25: Risk & Blockers
  blockers: RiskBlockerItem[];

  // Layer 26: Versioning History
  versions: SpecVersionRelease[];

  // Layer 27: Spec Freeze & Sign-Off
  freezeRecord: {
    isFrozen: boolean;
    hash: string;
    signOffParty: string;
    lockedAt: string;
    verificationSignature: string;
  };

  // Layer 28: Build Contract Artifacts
  buildContract: {
    markdownSpec: string;
    openapi3Json: string;
    prismaSchema: string;
    jsonSchema: string;
    mermaidDiagram: string;
  };

  // Layer 29: AI Development Handoff
  aiHandoff: {
    cursorRules: string;
    claudePrompt: string;
    antigravityTaskBreakdown: { phase: string; title: string; prompt: string }[];
  };

  // Layer 30: Implementation Verification & Drift
  driftAudit: ImplementationDriftItem[];

  // Layer 31: Continuous Loop Stages
  continuousLoopState: {
    currentStage: 'Idea' | 'Understand' | 'Discover' | 'Specify' | 'Model' | 'Validate' | 'Approve' | 'Build' | 'Verify' | 'Detect Drift' | 'Release';
    activePipeline: string[];
  };
}
