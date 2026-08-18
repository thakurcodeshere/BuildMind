import { ProjectSpecification } from '../types/specification';

export const initialHealthTechProject: ProjectSpecification = {
  id: 'proj_healthtech_telemedicine',
  name: 'CuraLink Telehealth & Clinical EHR Platform',
  tagline: 'HIPAA-Compliant Encrypted Telehealth, E-Prescriptions & Clinical EHR Suite',
  lastUpdated: '2026-08-18 11:30:00 UTC',
  version: 'v1.0',
  isLocked: true,
  activeMode: 'SPECIFICATION',
  ideaRawInput: `I want to build a secure HIPAA-compliant telehealth platform where patients can book video appointments with licensed physicians, receive electronic prescriptions sent directly to local pharmacies, and manage their clinical health records. The system must feature end-to-end encrypted video calls, granular role-based access for clinic staff, automatic insurance copay processing, and full FHIR API interoperability for laboratory test results.`,
  
  ideaDNA: {
    problem: 'Patients face long clinic wait times and fragmented medical records, while doctors struggle with clunky EHR software that lacks integrated video and secure prescription workflows.',
    users: [
      'Patients (Mobile / Web)',
      'Licensed Physicians / Clinicians',
      'Clinic Receptionists / Medical Assistants',
      'Pharmacy Dispensary Staff',
      'Clinical Compliance & HIPAA Audit Officers'
    ],
    solution: 'Unified HIPAA-ready clinical portal with WebRTC encrypted video, automated SureScripts e-prescription routing, and HL7/FHIR compliant health record management.',
    coreWorkflow: 'Patient Intake & Insurance Check → Physician Video Consultation → Clinical Note & Diagnosis → E-Prescription Dispatch → Automated Copay Settlement',
    businessModel: '$199/physician monthly SaaS subscription + $2.50 per verified e-prescription routing transaction.',
    platform: ['Web Clinical Dashboard', 'Patient Mobile App (iOS / Android)', 'Pharmacy Dispense Portal'],
    primaryGoal: 'Deliver zero-friction 1080p encrypted clinical consultations with sub-second prescription generation.',
    secondaryGoals: [
      '100% HIPAA and HITECH compliance certification',
      'Instant HL7 FHIR laboratory record sync',
      'Zero-knowledge encrypted clinical notes storage'
    ],
    knownConstraints: [
      'Strict HIPAA Business Associate Agreement (BAA) requirements on all cloud services',
      'State-specific medical licensing boundaries for physicians',
      'Mandatory two-factor authentication for all clinical staff'
    ],
    unknownRequirements: [
      'Will patients require offline access to historical prescription records?',
      'Does the clinic require automated Medicare / Medicaid claims submission?'
    ],
    potentialRisks: [
      'Accidental PHI (Protected Health Information) data leak via unencrypted logs',
      'Doctor prescribing medication across state lines without verified license'
    ]
  },

  selectedDomains: [
    'Product', 'Users', 'Authentication', 'Authorization', 'UI/UX',
    'Motion', 'Frontend', 'Backend', 'Database', 'Storage',
    'Payments', 'Communication', 'AI', 'Security', 'Observability',
    'Infrastructure', 'DevOps', 'Testing', 'Compliance'
  ],

  questions: [
    {
      id: 'q_hipaa_01',
      category: 'Compliance',
      question: 'How should Protected Health Information (PHI) be encrypted at rest and in transit?',
      technicalContext: 'HIPAA requires AES-256 encryption at rest with customer-managed keys (AWS KMS) and TLS 1.3 in transit.',
      aiRecommendation: 'Envelope Encryption with AWS KMS (Dedicated Key per Clinic Organization)',
      whyExplanation: {
        rationale: 'Envelope encryption guarantees complete cryptographic separation of health records between different clinic organizations.',
        tradeoffs: ['Slight encryption overhead on database reads/writes', 'Requires strict KMS key rotation policies'],
        alternatives: ['Standard database-level encryption only', 'Client-side zero knowledge encryption'],
        costImpact: '$1/month per KMS key + $0.03 per 10k cryptographic operations',
        complexityLevel: 'High'
      },
      options: [
        'Envelope Encryption with AWS KMS (Per-Org Key)',
        'Standard RDS TDE (Transparent Data Encryption)',
        'Application-level PGP encryption for all medical records'
      ],
      selectedOption: 'Envelope Encryption with AWS KMS (Per-Org Key)',
      status: 'answered',
      impactsDownstreamCount: 12
    }
  ],

  requirements: [
    {
      id: 'req_hipaa_phi_01',
      code: 'HIPAA-001',
      category: 'Security',
      title: 'Zero-Leakage PHI Sanitization in Application Logs',
      description: 'Ensure no patient identifiers, clinical diagnoses, or prescription details are ever output to standard application logs or APM monitors.',
      classification: 'CONFIRMED',
      confidenceScore: 99,
      source: 'User',
      status: 'Confirmed',
      technicalSpec: 'Implement custom structured logger middleware (Pino/Winston) with regex redaction masks on SSN, DOB, Patient Names, and Medication fields.',
      dependencies: ['User', 'PatientRecord'],
      downstreamImpacts: ['Observability', 'All API Endpoints', 'Audit Engine']
    }
  ],

  actors: [
    {
      id: 'actor_doctor',
      name: 'Licensed Physician',
      type: 'Human',
      description: 'Medical doctor conducting virtual consultations, documenting diagnoses, and prescribing treatment.',
      capabilities: ['Start video consult', 'Write clinical EHR notes', 'Issue e-prescriptions', 'Order lab tests'],
      securityLevel: 'Privileged'
    },
    {
      id: 'actor_patient',
      name: 'Patient',
      type: 'Human',
      description: 'Individual seeking care, booking consultations, and viewing personal health records.',
      capabilities: ['Book appointment', 'Join video call', 'Pay copay', 'View personal health summaries'],
      securityLevel: 'Authenticated'
    }
  ],

  permissionMatrix: [
    {
      resource: 'Patient Medical EHR Records',
      permissions: {
        actor_doctor: 'Full',
        actor_patient: 'Own'
      }
    }
  ],

  workflows: [
    {
      id: 'wf_telehealth_consult',
      name: 'Patient Virtual Clinical Consultation & E-Prescribe',
      actor: 'Licensed Physician',
      summary: 'Patient joins waiting room → Doctor initiates encrypted WebRTC session → Doctor issues e-prescription to pharmacy.',
      preconditions: ['Patient completed intake form and copay authorization', 'Physician license verified in patient state'],
      steps: [
        {
          stepNumber: 1,
          actorId: 'actor_doctor',
          actionTitle: 'Launch Encrypted Consultation Room',
          description: 'Physician admits patient from virtual waiting room and establishes peer-to-peer WebRTC session.',
          inputs: ['consultation_id', 'physician_jwt'],
          systemAction: 'Generate ephemeral WebRTC tokens with DTLS-SRTP encryption, start session timer.',
          output: 'Live 1080p video stream with zero recording on central servers.',
          validationRules: ['Physician state license matches patient state of residence'],
          failureCondition: 'WebRTC ICE connection failure or firewall block',
          recoveryPath: 'Fallback to TURN relay server over port 443 with TLS fallback.',
          databaseEvent: 'UPDATE consultations SET status = "IN_PROGRESS"',
          notificationTriggered: 'Push notification to patient: "Doctor is ready"',
          auditLogEvent: 'TELEHEALTH_SESSION_STARTED'
        }
      ],
      happyPathSummary: 'Instant video handshake → Encrypted consult → Seamless digital prescription dispatch.',
      failurePathSummary: 'Network degradation switches from P2P to secure TURN relay.',
      recoveryPathSummary: 'Automated fallback to cellular phone consult with instant SMS link.'
    }
  ],

  featureContracts: [
    {
      id: 'feat_eprescribe',
      code: 'FEAT-MED-01',
      featureName: 'SureScripts E-Prescription Dispatch',
      purpose: 'Generate and transmit cryptographically signed e-prescriptions to National Council for Prescription Drug Programs (NCPDP) certified pharmacies.',
      actor: 'Licensed Physician',
      preconditions: ['Physician has valid DEA / NPI registration on file', 'Patient has selected preferred pharmacy'],
      inputs: ['medication_ndc_code', 'dosage', 'frequency', 'quantity', 'refills_allowed', 'pharmacy_ncpdp_id'],
      validation: ['Dosage within standard FDA guidelines', 'Refills <= 5 for Schedule III-V drugs', 'Zero refills for Schedule II'],
      systemAction: 'Sign prescription payload with physician private key, transmit XML/NCPDP SCRIPT standard message via SureScripts gateway.',
      database: 'INSERT INTO prescriptions (...) VALUES (...)',
      events: ['clinical.prescription.dispatched'],
      notifications: ['SMS notification to patient', 'EDI message to pharmacy'],
      failureCases: ['Pharmacy NCPDP network timeout', 'Invalid drug-drug interaction alert'],
      securityBoundary: 'Only verified physicians with active state licensing can sign prescriptions.',
      auditTrail: 'Log DEA number, NPI number, client IP, timestamp, and signature digest.',
      acceptanceCriteria: [
        'Receipt confirmation from SureScripts within 3 seconds',
        'Automatic drug-drug interaction safety warning check prior to signing'
      ]
    }
  ],

  databaseEntities: [
    {
      id: 'db_patient_records',
      tableName: 'patient_health_records',
      description: 'Core clinical EHR records containing diagnoses, allergies, vitals, and physician notes.',
      fields: [
        { name: 'id', type: 'UUID', isPrimary: true, description: 'Record unique identifier' },
        { name: 'patient_id', type: 'UUID', isNullable: false, description: 'Foreign key to patients' },
        { name: 'doctor_id', type: 'UUID', isNullable: false, description: 'Physician who authored record' },
        { name: 'encrypted_clinical_notes', type: 'BYTEA', isNullable: false, description: 'AES-256-GCM encrypted notes payload' },
        { name: 'kms_key_id', type: 'VARCHAR(255)', isNullable: false, description: 'AWS KMS key reference' },
        { name: 'created_at', type: 'TIMESTAMPTZ', isNullable: false, description: 'Creation timestamp' }
      ],
      indexes: ['CREATE INDEX idx_patient_ehr ON patient_health_records(patient_id)'],
      constraints: [],
      softDelete: true,
      dataRetentionPolicy: 'Retain for minimum 7 years (adults) or 7 years past age of majority (pediatric).'
    }
  ],

  apiEndpoints: [
    {
      id: 'api_prescriptions',
      method: 'POST',
      path: '/api/v1/prescriptions',
      summary: 'Issue a new certified electronic prescription',
      actorRequired: 'Licensed Physician',
      authStrategy: 'Bearer JWT (MFA Verified + DEA Verified)',
      rateLimit: '30 req/min per physician',
      responseSuccessSchema: `{"status": "dispatched", "prescription_id": "rx_8941029"}`,
      errorCodes: [{ code: 403, reason: 'Physician DEA credentials unverified' }],
      auditLogged: true
    }
  ],

  screens: [
    {
      id: 'screen_clinical_charting',
      name: 'Physician EHR Charting & Video Portal',
      route: '/app/physician/consult/:id',
      purpose: 'Side-by-side video consult and clinical EHR note taking interface.',
      targetActors: ['Licensed Physician'],
      components: ['WebRTC Video Viewport', 'ICD-10 Diagnostic Auto-Complete', 'Rx Drug Interaction Scanner'],
      states: {
        loading: 'Connecting secure WebRTC media stream...',
        empty: 'Patient not yet in waiting room.',
        success: 'Active consultation with live audio/video indicators.',
        error: 'Video stream disconnected. Switching to audio fallback.',
        offline: 'Offline charting mode: notes cached locally in secure memory.',
        permissionDenied: 'Physician licensing verification required.'
      },
      responsiveBreakpoints: {
        mobile: 'Not supported for physician charting (minimum tablet viewport).',
        tablet: 'Split view video on top, notes on bottom.',
        desktop: 'Side-by-side 50/50 dual pane view.'
      }
    }
  ],

  designSystem: {
    themeName: 'CuraLink Clinical Teal',
    visualLanguage: 'Clean, calming clinical aesthetic with deep oceanic teal accents and high contrast text for long charting sessions.',
    typography: {
      headingFont: 'Space Grotesk, sans-serif',
      bodyFont: 'Plus Jakarta Sans, sans-serif',
      codeFont: 'JetBrains Mono, monospace',
      scale: [
        { name: 'Display XL', size: '2.5rem', weight: '700', tracking: '-0.02em' }
      ]
    },
    colorPalette: [
      { name: 'Background Primary', token: '--bg-primary', hsl: 'hsl(215, 28%, 8%)', hex: '#0f1724', usage: 'Main background' },
      { name: 'Clinical Teal', token: '--accent-teal', hsl: 'hsl(175, 84%, 40%)', hex: '#14b8a6', usage: 'Primary buttons and verified badges' }
    ],
    spacingTokens: [{ name: 'space-md', value: '16px' }],
    interactionPrinciples: ['Zero distraction interface during live patient consultation.'],
    motionPrinciples: [
      {
        animation: 'Consultation Alert Pulse',
        trigger: 'Patient enters waiting room',
        duration: '300ms',
        easing: 'ease-in-out',
        purpose: 'Discreet visual notification to physician',
        accessibilityFallback: 'Static badge icon'
      }
    ]
  },

  edgeCases: [
    {
      id: 'ec_hipaa_audit_breach',
      title: 'Attempted Unauthorized Access to Medical Record by Colleague',
      category: 'Security',
      whatIfQuestion: 'What happens if a physician attempts to view patient records of an individual who is not under their direct clinical care?',
      happyPath: 'Physician accesses records for their assigned active patient.',
      failurePath: 'Physician attempts to query unassigned patient ID.',
      recoveryPath: 'System blocks access unless physician clicks "Break-Glass Emergency Access". If clicked, access is granted for 60 minutes and immediate critical alert is dispatched to Chief Compliance Officer for audit review.',
      preventionMechanism: 'Break-Glass Emergency Protocol with automated compliance audit log.'
    }
  ],

  integrations: [
    {
      id: 'int_surescripts',
      name: 'SureScripts E-Prescribing Network',
      category: 'Identity',
      purpose: 'Electronic prescription transmission to 65,000+ national retail and mail-order pharmacies.',
      authMethod: 'Mutual TLS (mTLS) + Digital X.509 Certificate',
      dataFlow: 'EHR Service → SureScripts Gateway → Pharmacy Dispense Software',
      failureFallback: 'Generate secure encrypted PDF with barcode for patient manual pharmacy presentation.',
      estimatedCostUnit: '$0.35 per dispatched prescription.',
      securityControls: ['FIPS 140-2 Level 3 Hardware Security Module (HSM) signing']
    }
  ],

  costEstimates: {
    1000: {
      activeUsers: 1000,
      monthlyTotalCostUsd: 420,
      breakdown: { database: 90, compute: 110, storage: 40, bandwidth: 80, externalApis: 70, aiInference: 30 },
      assumptions: ['HIPAA BAA signed AWS RDS cluster', 'WebRTC TURN server traffic']
    },
    10000: {
      activeUsers: 10000,
      monthlyTotalCostUsd: 1950,
      breakdown: { database: 450, compute: 550, storage: 200, bandwidth: 350, externalApis: 280, aiInference: 120 },
      assumptions: ['Multi-region HIPAA compliant deployment', 'Automated Daily Backups with WORM retention']
    },
    100000: {
      activeUsers: 100000,
      monthlyTotalCostUsd: 12400,
      breakdown: { database: 2900, compute: 3600, storage: 1200, bandwidth: 2100, externalApis: 1800, aiInference: 800 },
      assumptions: ['10,000 concurrent encrypted video streams', 'Multi-tenant KMS encryption key hierarchy']
    },
    1000000: {
      activeUsers: 1000000,
      monthlyTotalCostUsd: 68000,
      breakdown: { database: 15000, compute: 21000, storage: 7000, bandwidth: 12000, externalApis: 9000, aiInference: 4000 },
      assumptions: ['Global health system deployment with regional data residency partitions']
    }
  },

  testingDimensions: [
    {
      id: 'test_hipaa_access_logs',
      layer: 'Security',
      targetComponent: 'AuditLoggingService',
      coverageTarget: '100% EHR Endpoints',
      scenario: 'Every single read or write of patient medical records must record timestamp, user ID, IP address, and patient ID.',
      passCriteria: 'Zero unlogged PHI accesses detected during automated security penetration run.'
    }
  ],

  redFlags: [
    {
      id: 'rf_medicare_claims',
      severity: 'WARNING',
      category: 'Compliance',
      title: 'Automated Insurance Claims Submission Underspecified',
      explanation: 'Medicare 837P EDI electronic billing workflow is not fully mapped in the current version.',
      actionRequired: 'Clarify whether clearinghouse integration (Change Healthcare / Availity) is in MVP scope.',
      resolved: false
    }
  ],

  aiMemory: [
    {
      id: 'mem_cura_prod_01',
      tier: 'Product Memory',
      key: 'HIPAA Compliance Mandate',
      content: 'CuraLink must adhere to zero-knowledge PHI storage with BAA-backed cloud infrastructure and cryptographic audit logs.',
      timestamp: '2026-08-18 11:30:00 UTC',
      immutable: true
    }
  ],

  versions: [
    {
      version: 'v1.0',
      timestamp: '2026-08-18 11:30:00 UTC',
      author: 'Clinical Architect & AI Engine',
      summary: 'Verified HIPAA telehealth specification with e-prescriptions and envelope encryption.',
      changesCount: { requirements: 1, database: 1, apis: 1, screens: 1 },
      locked: true
    }
  ],

  verificationAudits: []
};
