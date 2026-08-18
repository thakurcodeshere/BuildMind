import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  IntentOSProject,
  LayerId,
  EngineeringCategory,
  AssumptionStatus,
  AssumptionItem,
  RequirementItem
} from '../types';
import { FLAGSHIP_PROJECTS } from '../data/flagshipProjects';
import { synthesizeProjectFromIntent } from '../services/aiSynthesizer';

interface UserSettings {
  selectedModel: string;
  apiKeyOpenAI: string;
  apiKeyGemini: string;
  apiKeyAnthropic: string;
  theme: 'dark' | 'light';
  autoValidate: boolean;
}

interface ProjectContextType {
  project: IntentOSProject;
  history: IntentOSProject[];
  activeCategory: EngineeringCategory;
  activeLayer: LayerId;
  userRoleMode: 'user' | 'developer';
  isProcessing: boolean;
  searchQuery: string;
  settings: UserSettings;
  activeModal: string | null;
  
  // Navigation & UI state
  setUserRoleMode: (mode: 'user' | 'developer') => void;
  setActiveCategory: (cat: EngineeringCategory) => void;
  setActiveLayer: (layer: LayerId) => void;
  setSearchQuery: (query: string) => void;
  setActiveModal: (modal: string | null) => void;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  
  // Core Synthesis & Intake
  synthesizeNewProject: (rawIdea: string, customTitle?: string) => void;
  loadProject: (projectId: string) => void;
  deleteProject: (projectId: string) => void;
  createNewDraft: () => void;
  
  // Assumption Firewall Actions
  updateAssumptionStatus: (id: string, newStatus: AssumptionStatus) => void;
  addAssumption: (statement: string, category: string, status: AssumptionStatus, confidence: number) => void;
  deleteAssumption: (id: string) => void;
  
  // Requirements Actions
  updateRequirementPriority: (id: string, priority: RequirementItem['priority']) => void;
  addRequirement: (title: string, description: string, domain: string, priority: RequirementItem['priority']) => void;
  
  // Adaptive Q&A Actions
  answerQuestion: (questionId: string, optionId: string, customText?: string) => void;
  toggleDomain: (domainId: string) => void;
  
  // Governance & Freeze
  toggleSpecFreeze: (signOffParty: string) => void;
  createSpecVersion: (changeSummary: string, author: string) => void;
  resolveBlocker: (blockerId: string) => void;
  resolveDrift: (driftId: string) => void;
  simulateDriftScan: () => void;
}

const STORAGE_KEY_CURRENT = 'intentos_active_project_v3';
const STORAGE_KEY_HISTORY = 'intentos_history_v3';
const STORAGE_KEY_SETTINGS = 'intentos_settings_v3';

const DEFAULT_SETTINGS: UserSettings = {
  selectedModel: 'Claude 3.7 Sonnet (Thinking Engine)',
  apiKeyOpenAI: '',
  apiKeyGemini: '',
  apiKeyAnthropic: '',
  theme: 'dark',
  autoValidate: true
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load Project
  const [project, setProject] = useState<IntentOSProject>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CURRENT);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved IntentOS project state:', e);
      }
    }
    return FLAGSHIP_PROJECTS[0];
  });

  // Load History
  const [history, setHistory] = useState<IntentOSProject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse history:', e);
      }
    }
    return FLAGSHIP_PROJECTS;
  });

  // Load Settings
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (saved) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to parse settings:', e);
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [userRoleMode, setUserRoleMode] = useState<'user' | 'developer'>('user');
  const [activeCategory, setActiveCategory] = useState<EngineeringCategory>('intake_intent');
  const [activeLayer, setActiveLayer] = useState<LayerId>('idea_intake');
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(project));
  }, [project]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const synthesizeNewProject = (rawIdea: string, customTitle?: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const synthesized = synthesizeProjectFromIntent(rawIdea, customTitle);
      setProject(synthesized);
      setHistory((prev) => [synthesized, ...prev.filter((p) => p.id !== synthesized.id)]);
      setIsProcessing(false);
      setActiveCategory('intake_intent');
      setActiveLayer('intent_understanding');
    }, 700);
  };

  const loadProject = (projectId: string) => {
    const found = history.find((p) => p.id === projectId);
    if (found) {
      setProject(found);
    }
  };

  const deleteProject = (projectId: string) => {
    setHistory((prev) => prev.filter((p) => p.id !== projectId));
    if (project.id === projectId) {
      const remaining = history.filter((p) => p.id !== projectId);
      if (remaining.length > 0) {
        setProject(remaining[0]);
      } else {
        setProject(FLAGSHIP_PROJECTS[0]);
      }
    }
  };

  const createNewDraft = () => {
    const draft = synthesizeProjectFromIntent('', 'New Untitled Intent');
    setProject(draft);
    setActiveCategory('intake_intent');
    setActiveLayer('idea_intake');
  };

  const updateAssumptionStatus = (id: string, newStatus: AssumptionStatus) => {
    setProject((prev) => {
      const updated = prev.assumptions.map((a) => {
        if (a.id === id) {
          let conf = a.confidence;
          if (newStatus === 'confirmed') conf = Math.max(90, conf);
          if (newStatus === 'rejected') conf = 0;
          if (newStatus === 'conflicting') conf = 30;
          return {
            ...a,
            status: newStatus,
            confidence: conf,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        }
        return a;
      });

      // Recalculate readiness
      const confirmedCount = updated.filter((a) => a.status === 'confirmed').length;
      const total = updated.length || 1;
      const confidenceAvg = Math.round(updated.reduce((sum, a) => sum + a.confidence, 0) / total);

      return {
        ...prev,
        assumptions: updated,
        readiness: {
          ...prev.readiness,
          dimensions: {
            ...prev.readiness.dimensions,
            requirementCompleteness: Math.min(100, Math.round((confirmedCount / total) * 100))
          }
        },
        updatedAt: new Date().toISOString()
      };
    });
  };

  const addAssumption = (statement: string, category: string, status: AssumptionStatus, confidence: number) => {
    const newAsm: AssumptionItem = {
      id: `asm_${Date.now()}`,
      statement,
      category,
      status,
      confidence,
      source: 'User Prompt',
      impact: 'High',
      rationale: 'User manually specified assumption.',
      dependencies: [],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setProject((prev) => ({
      ...prev,
      assumptions: [newAsm, ...prev.assumptions],
      updatedAt: new Date().toISOString()
    }));
  };

  const deleteAssumption = (id: string) => {
    setProject((prev) => ({
      ...prev,
      assumptions: prev.assumptions.filter((a) => a.id !== id),
      updatedAt: new Date().toISOString()
    }));
  };

  const updateRequirementPriority = (id: string, priority: RequirementItem['priority']) => {
    setProject((prev) => ({
      ...prev,
      requirements: prev.requirements.map((r) => (r.id === id ? { ...r, priority } : r)),
      updatedAt: new Date().toISOString()
    }));
  };

  const addRequirement = (title: string, description: string, domain: string, priority: RequirementItem['priority']) => {
    const newReq: RequirementItem = {
      id: `req_${Date.now()}`,
      title,
      description,
      domain,
      confidenceScore: 90,
      source: 'Human Intent',
      status: 'Validated',
      priority,
      dependencies: [],
      impactedLayers: ['workflow_engineering', 'architecture_engine'],
      validationState: 'Verified'
    };
    setProject((prev) => ({
      ...prev,
      requirements: [newReq, ...prev.requirements],
      updatedAt: new Date().toISOString()
    }));
  };

  const answerQuestion = (questionId: string, optionId: string, customText?: string) => {
    setProject((prev) => {
      const updatedQuestions = prev.discoveryQuestions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            selectedOptionId: optionId,
            customAnswer: customText,
            isAnswered: true
          };
        }
        return q;
      });

      return {
        ...prev,
        discoveryQuestions: updatedQuestions,
        updatedAt: new Date().toISOString()
      };
    });
  };

  const toggleDomain = (domainId: string) => {
    setProject((prev) => ({
      ...prev,
      domains: prev.domains.map((d) => (d.id === domainId ? { ...d, isActive: !d.isActive } : d)),
      updatedAt: new Date().toISOString()
    }));
  };

  const toggleSpecFreeze = (signOffParty: string) => {
    setProject((prev) => {
      const nextFrozen = !prev.isSpecFrozen;
      const hash = nextFrozen
        ? `sha256:${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
        : 'unfrozen_specification_draft';

      return {
        ...prev,
        isSpecFrozen: nextFrozen,
        freezeRecord: {
          isFrozen: nextFrozen,
          hash,
          signOffParty: nextFrozen ? signOffParty || 'Principal Lead & Architect' : 'Pending',
          lockedAt: nextFrozen ? new Date().toISOString() : '',
          verificationSignature: nextFrozen ? `ED25519_SIG_${Math.random().toString(36).substring(2)}` : ''
        },
        updatedAt: new Date().toISOString()
      };
    });
  };

  const createSpecVersion = (changeSummary: string, author: string) => {
    setProject((prev) => {
      const currentParts = prev.currentVersion.replace('v', '').split('.');
      const nextMajor = parseInt(currentParts[0] || '1', 10);
      const nextMinor = parseInt(currentParts[1] || '0', 10) + 1;
      const newVer = `v${nextMajor}.${nextMinor}.0`;

      const newRelease = {
        version: newVer,
        releaseDate: new Date().toISOString().split('T')[0],
        author: author || 'Lead Architect',
        commitHash: Math.random().toString(16).substring(2, 9),
        changeSummary,
        impactedLayers: ['build_contract', 'spec_freeze', 'architecture_engine'],
        isFrozen: true,
        signedOffBy: author || 'Lead Architect',
        frozenTimestamp: new Date().toISOString()
      };

      return {
        ...prev,
        currentVersion: newVer,
        versions: [newRelease, ...prev.versions],
        updatedAt: new Date().toISOString()
      };
    });
  };

  const resolveBlocker = (blockerId: string) => {
    setProject((prev) => ({
      ...prev,
      blockers: prev.blockers.map((b) => (b.id === blockerId ? { ...b, resolved: true } : b)),
      readiness: {
        ...prev.readiness,
        unresolvedBlockerCount: Math.max(0, prev.readiness.unresolvedBlockerCount - 1),
        isBuildReady: prev.readiness.unresolvedBlockerCount - 1 <= 0
      },
      updatedAt: new Date().toISOString()
    }));
  };

  const resolveDrift = (driftId: string) => {
    setProject((prev) => ({
      ...prev,
      driftAudit: prev.driftAudit.map((d) => (d.id === driftId ? { ...d, status: 'Resolved' } : d)),
      updatedAt: new Date().toISOString()
    }));
  };

  const simulateDriftScan = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newDrift = {
        id: `drift_${Date.now()}`,
        fileOrEndpoint: 'src/api/records.ts:L89',
        driftType: 'Security Deviation' as const,
        severity: 'Critical' as const,
        expectedSpec: 'JWT Bearer token verification with RLS tenant context injection.',
        actualImplementation: 'Direct database query without current_setting(\'app.tenant_id\') execution.',
        correctiveAction: 'Inject TenantContextMiddleware before database query execution.',
        status: 'Open Drift' as const
      };
      setProject((prev) => ({
        ...prev,
        driftAudit: [newDrift, ...prev.driftAudit],
        updatedAt: new Date().toISOString()
      }));
      setIsProcessing(false);
    }, 600);
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        history,
        activeCategory,
        activeLayer,
        userRoleMode,
        isProcessing,
        searchQuery,
        settings,
        activeModal,
        setUserRoleMode,
        setActiveCategory,
        setActiveLayer,
        setSearchQuery,
        setActiveModal,
        updateSettings,
        synthesizeNewProject,
        loadProject,
        deleteProject,
        createNewDraft,
        updateAssumptionStatus,
        addAssumption,
        deleteAssumption,
        updateRequirementPriority,
        addRequirement,
        answerQuestion,
        toggleDomain,
        toggleSpecFreeze,
        createSpecVersion,
        resolveBlocker,
        resolveDrift,
        simulateDriftScan
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProject must be used within ProjectProvider');
  return ctx;
};
