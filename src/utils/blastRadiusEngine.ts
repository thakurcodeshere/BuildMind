import { ProjectSpecification } from '../types/specification';

export interface BlastRadiusResult {
  sourceId: string;
  sourceType: 'Requirement' | 'Database' | 'API' | 'Workflow';
  sourceTitle: string;
  impactScore: number; // 0 - 100
  downstreamImpacts: {
    type: 'Requirement' | 'Database' | 'API' | 'Screen' | 'Workflow' | 'Test';
    id: string;
    title: string;
    description: string;
    severity: 'High' | 'Medium' | 'Low';
  }[];
  warningMessage: string;
}

export function calculateBlastRadius(
  project: ProjectSpecification,
  targetId: string
): BlastRadiusResult {
  const req = project.requirements.find(r => r.id === targetId || r.code === targetId);
  const db = project.databaseEntities.find(d => d.id === targetId || d.tableName === targetId);
  const api = project.apiEndpoints.find(a => a.id === targetId || a.path === targetId);
  const wf = project.workflows.find(w => w.id === targetId);

  const impacts: BlastRadiusResult['downstreamImpacts'] = [];

  if (req) {
    // Check database entities that reference this requirement
    project.databaseEntities.forEach(entity => {
      impacts.push({
        type: 'Database',
        id: entity.id,
        title: `Table: ${entity.tableName}`,
        description: `Schema constraints and indexes for ${entity.tableName} depend on ${req.code}.`,
        severity: 'High'
      });
    });

    // Check API endpoints
    project.apiEndpoints.forEach(endpoint => {
      impacts.push({
        type: 'API',
        id: endpoint.id,
        title: `${endpoint.method} ${endpoint.path}`,
        description: `Request validation and permission logic for ${endpoint.path} must reflect ${req.code}.`,
        severity: 'Medium'
      });
    });

    // Check Screens
    project.screens.forEach(screen => {
      impacts.push({
        type: 'Screen',
        id: screen.id,
        title: screen.name,
        description: `UI components on ${screen.route} require state & input updates.`,
        severity: 'Medium'
      });
    });

    // Check Tests
    project.testingDimensions.forEach(test => {
      impacts.push({
        type: 'Test',
        id: test.id,
        title: `${test.layer} Test: ${test.targetComponent}`,
        description: `Test assertions must be revalidated against updated ${req.code} logic.`,
        severity: 'High'
      });
    });

    return {
      sourceId: req.id,
      sourceType: 'Requirement',
      sourceTitle: `${req.code}: ${req.title}`,
      impactScore: Math.min(100, impacts.length * 15),
      downstreamImpacts: impacts,
      warningMessage: `Modifying requirement "${req.title}" impacts ${impacts.length} downstream components across Database, API, UX, and Testing layers.`
    };
  }

  if (db) {
    project.apiEndpoints.forEach(endpoint => {
      impacts.push({
        type: 'API',
        id: endpoint.id,
        title: `${endpoint.method} ${endpoint.path}`,
        description: `Endpoint relies on table ${db.tableName} structure.`,
        severity: 'High'
      });
    });

    return {
      sourceId: db.id,
      sourceType: 'Database',
      sourceTitle: `Entity: ${db.tableName}`,
      impactScore: 75,
      downstreamImpacts: impacts,
      warningMessage: `Database schema changes to table "${db.tableName}" trigger required migrations and API contract updates.`
    };
  }

  return {
    sourceId: targetId,
    sourceType: 'Requirement',
    sourceTitle: 'Target Component',
    impactScore: 30,
    downstreamImpacts: impacts,
    warningMessage: 'Standard isolated component modification.'
  };
}
