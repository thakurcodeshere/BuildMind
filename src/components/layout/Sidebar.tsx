import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Layers,
  HelpCircle,
  Flame,
  CheckSquare,
  Users,
  GitBranch,
  FileCheck,
  Server,
  Database,
  Globe,
  Layout,
  Activity,
  Shield,
  FileText,
  Boxes,
  Cpu,
  DollarSign,
  AlertOctagon,
  TestTube,
  Network,
  CheckCircle,
  Gauge,
  AlertTriangle,
  History,
  Lock,
  FileCode2,
  Bot,
  GitPullRequest,
  RefreshCw,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { LayerId, EngineeringCategory } from '../../types';

interface CategoryGroup {
  id: EngineeringCategory;
  name: string;
  badge?: string;
  layers: {
    id: LayerId;
    layerNumber: number;
    name: string;
    icon: React.ReactNode;
  }[];
}

export const Sidebar: React.FC = () => {
  const {
    project,
    activeCategory,
    activeLayer,
    setActiveCategory,
    setActiveLayer
  } = useProject();

  const [expandedCategories, setExpandedCategories] = useState<Record<EngineeringCategory, boolean>>({
    intake_intent: true,
    truth_governance: true,
    behavior_roles: true,
    architecture_system: true,
    ux_security: true,
    economics_testing: true,
    build_drift: true
  });

  const toggleCategory = (cat: EngineeringCategory) => {
    setExpandedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const categoryGroups: CategoryGroup[] = [
    {
      id: 'intake_intent',
      name: 'Intake & Intent Discovery',
      layers: [
        { id: 'idea_intake', layerNumber: 1, name: 'Idea Intake Layer', icon: <Compass className="w-3.5 h-3.5" /> },
        { id: 'intent_understanding', layerNumber: 2, name: 'AI Intent Engine', icon: <Sparkles className="w-3.5 h-3.5" /> },
        { id: 'domain_matrix', layerNumber: 3, name: 'Dynamic Domain Matrix', icon: <Layers className="w-3.5 h-3.5" /> },
        { id: 'adaptive_discovery', layerNumber: 4, name: 'Adaptive Q&A System', icon: <HelpCircle className="w-3.5 h-3.5" /> }
      ]
    },
    {
      id: 'truth_governance',
      name: 'Truth & Governance',
      layers: [
        { id: 'assumption_firewall', layerNumber: 5, name: 'Assumption Firewall', icon: <Flame className="w-3.5 h-3.5 text-amber-400" /> },
        { id: 'requirement_confidence', layerNumber: 6, name: 'Requirements & Lineage', icon: <CheckSquare className="w-3.5 h-3.5 text-cyan-400" /> },
        { id: 'cross_domain_validation', layerNumber: 23, name: 'Cross-Domain Validator', icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> },
        { id: 'risk_blockers', layerNumber: 25, name: 'Risk & Blocker Engine', icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> }
      ]
    },
    {
      id: 'behavior_roles',
      name: 'Behavior & Workflows',
      layers: [
        { id: 'role_permission', layerNumber: 7, name: 'Roles & RBAC/ABAC', icon: <Users className="w-3.5 h-3.5" /> },
        { id: 'workflow_engineering', layerNumber: 8, name: 'Workflow Engine', icon: <GitBranch className="w-3.5 h-3.5" /> },
        { id: 'feature_contracts', layerNumber: 9, name: 'Feature Contracts', icon: <FileCheck className="w-3.5 h-3.5" /> },
        { id: 'error_edge_cases', layerNumber: 20, name: 'Error & Edge Cases', icon: <AlertOctagon className="w-3.5 h-3.5" /> }
      ]
    },
    {
      id: 'architecture_system',
      name: 'System Architecture',
      layers: [
        { id: 'architecture_engine', layerNumber: 10, name: 'System Architecture', icon: <Server className="w-3.5 h-3.5" /> },
        { id: 'data_engineering', layerNumber: 11, name: 'Data & Schema Layer', icon: <Database className="w-3.5 h-3.5" /> },
        { id: 'api_engineering', layerNumber: 12, name: 'API Engineering Layer', icon: <Globe className="w-3.5 h-3.5" /> },
        { id: 'integration_layer', layerNumber: 17, name: '3rd-Party Integrations', icon: <Boxes className="w-3.5 h-3.5" /> },
        { id: 'infrastructure_compute', layerNumber: 18, name: 'Infra & Cloud Sizing', icon: <Cpu className="w-3.5 h-3.5" /> }
      ]
    },
    {
      id: 'ux_security',
      name: 'Interface & Security',
      layers: [
        { id: 'ui_ux_engineering', layerNumber: 13, name: 'UI / UX & Screens', icon: <Layout className="w-3.5 h-3.5" /> },
        { id: 'motion_interaction', layerNumber: 14, name: 'Motion & Interaction', icon: <Activity className="w-3.5 h-3.5" /> },
        { id: 'security_engineering', layerNumber: 15, name: 'Security & STRIDE', icon: <Shield className="w-3.5 h-3.5" /> },
        { id: 'privacy_compliance', layerNumber: 16, name: 'Privacy & Compliance', icon: <FileText className="w-3.5 h-3.5" /> }
      ]
    },
    {
      id: 'economics_testing',
      name: 'Economics & Testing',
      layers: [
        { id: 'cost_scalability', layerNumber: 19, name: 'Cost & Scalability Engine', icon: <DollarSign className="w-3.5 h-3.5" /> },
        { id: 'testing_layer', layerNumber: 21, name: 'Testing Engineering Layer', icon: <TestTube className="w-3.5 h-3.5" /> },
        { id: 'dependency_graph', layerNumber: 22, name: 'Cross-Domain Graph', icon: <Network className="w-3.5 h-3.5" /> }
      ]
    },
    {
      id: 'build_drift',
      name: 'Build, Handoff & Drift',
      badge: 'SSOT',
      layers: [
        { id: 'build_readiness', layerNumber: 24, name: 'Build Readiness Radar', icon: <Gauge className="w-3.5 h-3.5 text-cyan-400" /> },
        { id: 'spec_versioning', layerNumber: 26, name: 'Spec Version History', icon: <History className="w-3.5 h-3.5" /> },
        { id: 'spec_freeze', layerNumber: 27, name: 'Spec Freeze & Sign-Off', icon: <Lock className="w-3.5 h-3.5 text-emerald-400" /> },
        { id: 'build_contract', layerNumber: 28, name: 'Build Contract Generator', icon: <FileCode2 className="w-3.5 h-3.5 text-cyan-300" /> },
        { id: 'ai_handoff', layerNumber: 29, name: 'AI Development Handoff', icon: <Bot className="w-3.5 h-3.5 text-indigo-300" /> },
        { id: 'implementation_verify', layerNumber: 30, name: 'Implementation Drift', icon: <GitPullRequest className="w-3.5 h-3.5 text-amber-400" /> },
        { id: 'continuous_loop', layerNumber: 31, name: 'Continuous Spec Loop', icon: <RefreshCw className="w-3.5 h-3.5 text-blue-400" /> }
      ]
    }
  ];

  return (
    <aside className="w-72 bg-[#070a12] border-r border-white/[0.08] flex flex-col h-full select-none shrink-0 z-20">
      {/* Brand Header */}
      <div className="p-3.5 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-black text-xs tracking-wider">
            OS
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-100 tracking-tight text-sm">IntentOS</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-mono font-bold">
                31-LAYER
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Software Intent Engineering</p>
          </div>
        </div>
      </div>

      {/* Layer Navigation Accordion List */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-3">
        {categoryGroups.map((group) => {
          const isExpanded = expandedCategories[group.id];
          const isGroupActive = activeCategory === group.id;

          return (
            <div key={group.id} className="space-y-1">
              {/* Category Accordion Header */}
              <button
                onClick={() => {
                  toggleCategory(group.id);
                  setActiveCategory(group.id);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isGroupActive ? 'text-cyan-300 bg-cyan-950/20' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                  <span className="truncate tracking-wide">{group.name}</span>
                </div>
                {group.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                    {group.badge}
                  </span>
                )}
              </button>

              {/* Child Layers */}
              {isExpanded && (
                <div className="pl-3 space-y-0.5 border-l border-white/[0.06] ml-2.5">
                  {group.layers.map((layer) => {
                    const isLayerActive = activeLayer === layer.id;

                    return (
                      <button
                        key={layer.id}
                        onClick={() => {
                          setActiveCategory(group.id);
                          setActiveLayer(layer.id);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                          isLayerActive
                            ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 font-semibold shadow-sm'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[9px] font-mono text-slate-400 w-3.5 text-right shrink-0">
                            {layer.layerNumber}
                          </span>
                          <span className="shrink-0">{layer.icon}</span>
                          <span className="truncate">{layer.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer System Status */}
      <div className="p-3 border-t border-white/[0.06] bg-[#05070d] flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">Assumption Firewall</span>
        </div>
        <span className="text-cyan-400 font-bold">
          {project.assumptions.filter((a) => a.status === 'confirmed').length}/{project.assumptions.length} Confirmed
        </span>
      </div>
    </aside>
  );
};
