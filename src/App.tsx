import React from 'react';
import { ProjectProvider, useProject } from './context/ProjectContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { SettingsModal } from './components/layout/SettingsModal';
import { IntakeAndIntentView } from './components/views/IntakeAndIntentView';
import { AssumptionFirewallView } from './components/views/AssumptionFirewallView';
import { RolesAndWorkflowsView } from './components/views/RolesAndWorkflowsView';
import { SystemArchitectureView } from './components/views/SystemArchitectureView';
import { UxSecurityComplianceView } from './components/views/UxSecurityComplianceView';
import { EconomicsAndTestingView } from './components/views/EconomicsAndTestingView';
import { BuildContractAndHandoffView } from './components/views/BuildContractAndHandoffView';

const AppContent: React.FC = () => {
  const { activeCategory } = useProject();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#070a12] text-slate-100 antialiased font-sans select-none">
      {/* 31-Layer Sidebar Navigation */}
      <Sidebar />

      {/* Main App Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Top Header */}
        <Header />

        {/* Dynamic Category View Container */}
        <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden bg-[#090d16]">
          {activeCategory === 'intake_intent' && <IntakeAndIntentView />}
          {activeCategory === 'truth_governance' && <AssumptionFirewallView />}
          {activeCategory === 'behavior_roles' && <RolesAndWorkflowsView />}
          {activeCategory === 'architecture_system' && <SystemArchitectureView />}
          {activeCategory === 'ux_security' && <UxSecurityComplianceView />}
          {activeCategory === 'economics_testing' && <EconomicsAndTestingView />}
          {activeCategory === 'build_drift' && <BuildContractAndHandoffView />}
        </main>
      </div>

      {/* Global Settings Modal */}
      <SettingsModal />
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
