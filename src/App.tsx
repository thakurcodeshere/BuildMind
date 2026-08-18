import React, { useState } from 'react';
import { ProjectProvider, useProject } from './context/ProjectContext';
import { TopNav, PrimaryHub } from './components/layout/TopNav';
import { HubSubBar } from './components/layout/HubSubBar';
import { HeaderKPIs } from './components/layout/HeaderKPIs';
import { AskAIDrawer } from './components/layout/AskAIDrawer';
import { WhyExplainModal } from './components/common/WhyExplainModal';
import { DynamicQuestion } from './types/specification';

// Views
import { DashboardView } from './components/views/DashboardView';
import { IdeaCaptureView } from './components/views/IdeaCaptureView';
import { DiscoveryView } from './components/views/DiscoveryView';
import { RequirementsView } from './components/views/RequirementsView';
import { ActorsWorkflowsView } from './components/views/ActorsWorkflowsView';
import { DependenciesView } from './components/views/DependenciesView';
import { ArchitectureView } from './components/views/ArchitectureView';
import { DatabaseView } from './components/views/DatabaseView';
import { APIContractView } from './components/views/APIContractView';
import { UXDesignView } from './components/views/UXDesignView';
import { EdgeCasesSecurityView } from './components/views/EdgeCasesSecurityView';
import { IntegrationsCostView } from './components/views/IntegrationsCostView';
import { TestingView } from './components/views/TestingView';
import { BuildContractView } from './components/views/BuildContractView';
import { VerificationView } from './components/views/VerificationView';
import { MemoryGraphView } from './components/views/MemoryGraphView';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useProject();
  const [activeHub, setActiveHub] = useState<PrimaryHub>('overview');
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);
  const [selectedWhyQuestion, setSelectedWhyQuestion] = useState<DynamicQuestion | null>(null);

  // Sync activeHub with activeTab if user clicks outside
  const syncHubWithTab = (tab: typeof activeTab) => {
    if (tab === 'dashboard') setActiveHub('overview');
    else if (tab === 'idea' || tab === 'memory-graph') setActiveHub('intent');
    else if (tab === 'discovery' || tab === 'requirements' || tab === 'risks') setActiveHub('requirements');
    else if (tab === 'database' || tab === 'apis' || tab === 'actors-workflows' || tab === 'dependencies' || tab === 'architecture') setActiveHub('architecture');
    else if (tab === 'ux-ui' || tab === 'security' || tab === 'integrations' || tab === 'testing') setActiveHub('experience');
    else if (tab === 'build-contract' || tab === 'verify') setActiveHub('build');
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    syncHubWithTab(tab);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onNavigateToHub={(hub, tab) => { setActiveHub(hub); setActiveTab(tab); }} />;
      case 'idea':
        return <IdeaCaptureView />;
      case 'discovery':
        return <DiscoveryView onOpenWhyModal={(q) => setSelectedWhyQuestion(q)} />;
      case 'requirements':
        return <RequirementsView />;
      case 'actors-workflows':
        return <ActorsWorkflowsView />;
      case 'dependencies':
        return <DependenciesView />;
      case 'architecture':
        return <ArchitectureView />;
      case 'database':
        return <DatabaseView />;
      case 'apis':
        return <APIContractView />;
      case 'ux-ui':
        return <UXDesignView />;
      case 'security':
      case 'risks':
        return <EdgeCasesSecurityView />;
      case 'integrations':
      case 'infrastructure':
        return <IntegrationsCostView />;
      case 'testing':
        return <TestingView />;
      case 'build-contract':
        return <BuildContractView />;
      case 'verify':
        return <VerificationView />;
      case 'memory-graph':
        return <MemoryGraphView />;
      default:
        return <DashboardView onNavigateToHub={(hub, tab) => { setActiveHub(hub); setActiveTab(tab); }} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      {/* User-Friendly Top Navigation */}
      <TopNav
        onOpenAskAI={() => setIsAskAIOpen(true)}
        activeHub={activeHub}
        setActiveHub={setActiveHub}
      />

      {/* Second-Tier Sub-Bar */}
      <HubSubBar activeHub={activeHub} />

      {/* Main Container */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 sm:px-6">
        {/* Executive Header Banner */}
        <HeaderKPIs onNavigateToTab={handleTabChange} />

        {/* Dynamic Viewport Container */}
        <div className="mt-4">
          {renderActiveView()}
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 py-5 px-6 text-center text-xs text-slate-400 mt-12">
        <div className="max-w-[1700px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white font-display">IntentForge</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Level 7 Developer-Curated Software Intent Compiler</span>
          </div>
          <span className="font-mono text-[11px] text-slate-500">
            52-Stage Verified Architecture | Production Ready
          </span>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <AskAIDrawer
        isOpen={isAskAIOpen}
        onClose={() => setIsAskAIOpen(false)}
      />

      <WhyExplainModal
        question={selectedWhyQuestion}
        onClose={() => setSelectedWhyQuestion(null)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  );
};

export default App;
