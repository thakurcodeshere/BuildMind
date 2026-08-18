import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { generatePostgreSqlDDL } from '../../utils/buildContractGenerator';
import {
  Database,
  Key,
  Link,
  Shield,
  Copy,
  Check,
  Code,
  Layers,
  FileText
} from 'lucide-react';

export const DatabaseView: React.FC = () => {
  const { project } = useProject();
  const [selectedEntityId, setSelectedEntityId] = useState<string>(project.databaseEntities[0]?.id || 'db_organizations');
  const [copiedSQL, setCopiedSQL] = useState(false);
  const [viewMode, setViewMode] = useState<'visual' | 'sql'>('visual');

  const selectedEntity = project.databaseEntities.find(e => e.id === selectedEntityId) || project.databaseEntities[0];
  const ddlSql = generatePostgreSqlDDL(project);

  const handleCopySQL = () => {
    navigator.clipboard.writeText(ddlSql);
    setCopiedSQL(true);
    setTimeout(() => setCopiedSQL(false), 2000);
  };

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                STAGE 18
              </span>
              <span className="text-xs text-slate-400 font-medium">Database Blueprint Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              Relational Schema, Entities & DDL Studio
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              Deterministic database models compiled with primary/foreign keys, spatial GIST indexes, soft-deletion policies, and PostgreSQL Row-Level Security isolation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('visual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'visual' ? 'bg-sky-500 text-white' : 'btn-secondary'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Entity Visualizer</span>
            </button>
            <button
              onClick={() => setViewMode('sql')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'sql' ? 'bg-sky-500 text-white' : 'btn-secondary'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Generated SQL DDL</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'visual' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Table Directory Sidebar */}
          <div className="glass-panel p-4 space-y-2 lg:col-span-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block px-2 mb-2">
              Database Entities ({project.databaseEntities.length})
            </span>
            {project.databaseEntities.map((entity) => (
              <button
                key={entity.id}
                onClick={() => setSelectedEntityId(entity.id)}
                className={`w-full p-3 rounded-xl text-left text-xs font-semibold transition-all flex items-center justify-between ${
                  selectedEntityId === entity.id
                    ? 'bg-sky-500/20 text-white border border-sky-500/40 shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Database className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                  <span className="truncate">{entity.tableName}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  {entity.fields.length} cols
                </span>
              </button>
            ))}
          </div>

          {/* Selected Entity Schema Inspector */}
          <div className="glass-panel p-6 lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-sky-400 uppercase">Table:</span>
                  <h3 className="text-xl font-bold font-mono text-white">
                    {selectedEntity.tableName}
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mt-1">{selectedEntity.description}</p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className={`px-2.5 py-1 rounded-md border ${
                  selectedEntity.softDelete
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {selectedEntity.softDelete ? '✓ Soft Delete (deleted_at)' : 'Hard Delete'}
                </span>
              </div>
            </div>

            {/* Fields Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                    <th className="py-2.5 px-3">Column Name</th>
                    <th className="py-2.5 px-3">Data Type</th>
                    <th className="py-2.5 px-3 text-center">Nullable</th>
                    <th className="py-2.5 px-3">Key / Relation</th>
                    <th className="py-2.5 px-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {selectedEntity.fields.map((field, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-bold text-white flex items-center gap-1.5">
                        {field.isPrimary && <Key className="w-3 h-3 text-amber-400" />}
                        <span>{field.name}</span>
                      </td>
                      <td className="py-2.5 px-3 text-sky-300">{field.type}</td>
                      <td className="py-2.5 px-3 text-center">
                        {field.isNullable ? (
                          <span className="text-slate-400">NULL</span>
                        ) : (
                          <span className="text-rose-400 font-bold">NOT NULL</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-indigo-300">
                        {field.isPrimary ? (
                          <span className="text-amber-400 font-bold">PRIMARY KEY</span>
                        ) : field.foreignKey ? (
                          <span className="flex items-center gap-1">
                            <Link className="w-3 h-3" />
                            <span>-&gt; {field.foreignKey.table}.{field.foreignKey.field}</span>
                          </span>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 font-sans text-slate-300">{field.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Indexes & Retention Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-800">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-1">
                  Database Indexes:
                </span>
                <ul className="space-y-1 font-mono text-[11px] text-sky-300">
                  {selectedEntity.indexes.map((idx, i) => (
                    <li key={i}>{idx}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-1">
                  Data Retention & Compliance Policy:
                </span>
                <p className="text-slate-300 text-xs">
                  {selectedEntity.dataRetentionPolicy}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SQL DDL Code View */
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white font-mono">
                PostgreSQL 16+ DDL Schema Script
              </h3>
              <p className="text-xs text-slate-400">
                Includes Table Definitions, UUID Extensions, PostGIS Spatial Types, and Row-Level Security Policies.
              </p>
            </div>
            <button
              onClick={handleCopySQL}
              className="btn-primary text-xs px-3.5 py-1.5"
            >
              {copiedSQL ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSQL ? 'Copied DDL!' : 'Copy SQL Schema'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800/80">
            {ddlSql}
          </pre>
        </div>
      )}
    </div>
  );
};
