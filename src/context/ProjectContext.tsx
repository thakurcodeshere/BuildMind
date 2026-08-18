import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProjectSpecification,
  NavigationTab,
  ProductMode,
  RequirementItem,
  DynamicQuestion,
  CodeVerificationResult
} from '../types/specification';
import { initialLogisticsProject } from '../mockData/logisticsProject';
import { initialHealthTechProject } from '../mockData/healthTechProject';
import { runSpecificationVerificationScan } from '../utils/codeVerificationEngine';

export interface ProjectStats {
  buildReadinessScore: number; // 0 - 100
  requirementCoverage: number; // %
  architectureConfidence: number; // %
  securityReadiness: number; // %
  uxCompleteness: number; // %
  openQuestionsCount: number;
  criticalBlockersCount: number;
  unconfirmedAssumptionsCount: number;
  totalDependenciesCount: number;
}

interface ProjectContextType {
  project: ProjectSpecification;
  activeTab: NavigationTab;
  activeMode: ProductMode;
  stats: ProjectStats;
  setActiveTab: (tab: NavigationTab) => void;
  setActiveMode: (mode: ProductMode) => void;
  switchProject: (projectId: string) => void;
  answerQuestion: (questionId: string, answer: string) => void;
  updateRequirementStatus: (reqId: string, status: RequirementItem['status']) => void;
  confirmAssumption: (reqId: string) => void;
  resolveRedFlag: (flagId: string) => void;
  freezeSpecification: (versionLabel: string, summary: string) => void;
  runVerificationScan: (codeSnippet: string, fileName: string) => CodeVerificationResult;
  executeAskAICommand: (promptText: string) => { reply: string; actionApplied?: string };
  resetProjectToDefault: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<ProjectSpecification>(() => {
    const saved = localStorage.getItem('intentforge_active_project');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached project', e);
      }
    }
    return initialLogisticsProject;
  });

  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [activeMode, setActiveMode] = useState<ProductMode>('SPECIFICATION');

  useEffect(() => {
    try {
      localStorage.setItem('intentforge_active_project', JSON.stringify(project));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [project]);

  // Compute live real-time stats
  const calculateStats = (): ProjectStats => {
    const totalQuestions = project.questions.length;
    const answeredQuestions = project.questions.filter(q => q.status === 'answered').length;
    const reqs = project.requirements;
    const confirmedReqs = reqs.filter(r => r.status === 'Confirmed').length;
    const unconfirmedAssumptions = reqs.filter(r => r.classification === 'ASSUMED' || r.classification === 'CONFLICT').length;
    const criticalBlockers = project.redFlags.filter(f => f.severity === 'BLOCKER' && !f.resolved).length;

    const requirementCoverage = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 90;
    const securityReadiness = reqs.some(r => r.category === 'Security' && r.status === 'Confirmed') ? 92 : 70;
    const architectureConfidence = project.databaseEntities.length >= 3 && project.apiEndpoints.length >= 2 ? 94 : 75;
    const uxCompleteness = project.screens.length >= 2 ? 88 : 65;

    // Weighted Build Readiness (0 - 100)
    let score = Math.round(
      requirementCoverage * 0.3 +
      securityReadiness * 0.25 +
      architectureConfidence * 0.25 +
      uxCompleteness * 0.2
    );

    if (criticalBlockers > 0) {
      score = Math.max(10, score - (criticalBlockers * 12));
    }
    if (unconfirmedAssumptions > 0) {
      score = Math.max(10, score - (unconfirmedAssumptions * 4));
    }

    return {
      buildReadinessScore: Math.min(100, Math.max(0, score)),
      requirementCoverage,
      architectureConfidence,
      securityReadiness,
      uxCompleteness,
      openQuestionsCount: totalQuestions - answeredQuestions,
      criticalBlockersCount: criticalBlockers,
      unconfirmedAssumptionsCount: unconfirmedAssumptions,
      totalDependenciesCount: reqs.reduce((acc, r) => acc + (r.dependencies.length + r.downstreamImpacts.length), 0) + 24
    };
  };

  const stats = calculateStats();

  const switchProject = (projectId: string) => {
    if (projectId === 'proj_healthtech_telemedicine') {
      setProject(initialHealthTechProject);
    } else {
      setProject(initialLogisticsProject);
    }
    setActiveTab('dashboard');
  };

  const answerQuestion = (questionId: string, answer: string) => {
    setProject(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === questionId ? { ...q, selectedOption: answer, status: 'answered' } : q
      ),
      lastUpdated: new Date().toISOString()
    }));
  };

  const updateRequirementStatus = (reqId: string, status: RequirementItem['status']) => {
    setProject(prev => ({
      ...prev,
      requirements: prev.requirements.map(r =>
        r.id === reqId ? { ...r, status } : r
      ),
      lastUpdated: new Date().toISOString()
    }));
  };

  const confirmAssumption = (reqId: string) => {
    setProject(prev => ({
      ...prev,
      requirements: prev.requirements.map(r =>
        r.id === reqId ? { ...r, classification: 'CONFIRMED', status: 'Confirmed', confidenceScore: 95 } : r
      ),
      lastUpdated: new Date().toISOString()
    }));
  };

  const resolveRedFlag = (flagId: string) => {
    setProject(prev => ({
      ...prev,
      redFlags: prev.redFlags.map(f =>
        f.id === flagId ? { ...f, resolved: true } : f
      ),
      lastUpdated: new Date().toISOString()
    }));
  };

  const freezeSpecification = (versionLabel: string, summary: string) => {
    setProject(prev => {
      const newVersionHistory = [
        {
          version: versionLabel,
          timestamp: new Date().toISOString(),
          author: 'Lead Architect & Human Founder',
          summary: summary || 'Locked and approved specification for autonomous build.',
          changesCount: {
            requirements: prev.requirements.length,
            database: prev.databaseEntities.length,
            apis: prev.apiEndpoints.length,
            screens: prev.screens.length
          },
          locked: true
        },
        ...prev.versions
      ];

      return {
        ...prev,
        version: versionLabel,
        isLocked: true,
        versions: newVersionHistory,
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const runVerificationScan = (codeSnippet: string, fileName: string) => {
    const result = runSpecificationVerificationScan(codeSnippet, fileName, project);
    setProject(prev => ({
      ...prev,
      verificationAudits: [result, ...prev.verificationAudits]
    }));
    return result;
  };

  const executeAskAICommand = (promptText: string) => {
    const lower = promptText.toLowerCase();

    // Smart Intent Conversion
    if (lower.includes('member') || lower.includes('invite') || lower.includes('employee') || lower.includes('team')) {
      const newReq: RequirementItem = {
        id: `req_org_members_${Date.now()}`,
        code: 'AUTHZ-008',
        category: 'Authorization',
        title: 'Team Invitations & Member Delegation System',
        description: 'Allow organization administrators to invite colleagues via email with custom RBAC role assignments.',
        classification: 'CONFIRMED',
        confidenceScore: 92,
        source: 'User',
        status: 'Confirmed',
        technicalSpec: 'Add organization_invitations table with 7-day HMAC expiry token. Implement POST /api/v1/organizations/:id/invites endpoint.',
        dependencies: ['AUTH-001', 'Organization'],
        downstreamImpacts: ['Organization View', 'User Management API', 'Email Notifications']
      };

      setProject(prev => ({
        ...prev,
        requirements: [newReq, ...prev.requirements],
        aiMemory: [
          {
            id: `mem_user_${Date.now()}`,
            tier: 'Requirement Memory',
            key: 'Team Member Invitations Added',
            content: `User instructed: "${promptText}". Generated AUTHZ-008 Requirement with DB schema update.`,
            timestamp: new Date().toISOString(),
            immutable: false
          },
          ...prev.aiMemory
        ]
      }));

      return {
        reply: `I have compiled your instruction into structured project state:
1. Created new Requirement **[AUTHZ-008] Team Invitations & Member Delegation**.
2. Linked downstream blast radius to Email Service, User DB, and API contracts.
3. Appended decision context into Requirement Memory tier.`,
        actionApplied: 'Requirement AUTHZ-008 Created'
      };
    }

    if (lower.includes('lock') || lower.includes('freeze')) {
      freezeSpecification('v1.1-FROZEN', 'Manual specification freeze triggered via conversational intent.');
      return {
        reply: 'Specification has been locked into immutable Version v1.1-FROZEN with state change audit trail.',
        actionApplied: 'Specification Locked'
      };
    }

    return {
      reply: `I have analyzed: "${promptText}". 
Based on the Level 7 Engineering rules, this maps to your current Architecture and Data Model. You can refine this directly in the Requirements or Database studio.`,
      actionApplied: 'Analyzed & Context Updated'
    };
  };

  const resetProjectToDefault = () => {
    setProject(initialLogisticsProject);
    setActiveTab('dashboard');
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        activeTab,
        activeMode,
        stats,
        setActiveTab,
        setActiveMode,
        switchProject,
        answerQuestion,
        updateRequirementStatus,
        confirmAssumption,
        resolveRedFlag,
        freezeSpecification,
        runVerificationScan,
        executeAskAICommand,
        resetProjectToDefault
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
