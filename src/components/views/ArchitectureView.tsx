import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import {
  Layers,
  Server,
  Database,
  Globe,
  Shield,
  Cpu,
  ArrowDown,
  ArrowRight,
  Radio,
  Zap
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const { project } = useProject();
  const [selectedLayer, setSelectedLayer] = useState<string>('services');

  return (
    <div className="space-y-8 animate-view-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                STAGE 17
              </span>
              <span className="text-xs text-slate-400 font-medium">Multi-Tier System Architecture</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              System, Component & Service Architecture
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              Full architectural topology compiled from verified requirements. Defines the boundary layers across Edge Clients, API Gateway, Application Microservices, Event Buses, and Polyglot Persistence.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <Zap className="w-4 h-4" />
            <span>Architecture Confidence: 94%</span>
          </div>
        </div>
      </div>

      {/* Multi-Tier Interactive Flow Diagram */}
      <div className="glass-panel p-6 space-y-6">
        <h3 className="text-base font-bold text-white font-display">
          Multi-Tier Distributed Service Topology
        </h3>

        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Layer 1: Client Interfaces */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-sky-500/40 shadow-md shadow-sky-500/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono font-bold text-sky-300 uppercase">
                  Tier 1: Client Interface Layer
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">PWA / React / Vite</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {project.screens.map((screen) => (
                <div key={screen.id} className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <span className="font-bold text-white block">{screen.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">{screen.route}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-slate-600 animate-bounce" />
          </div>

          {/* Layer 2: API Gateway & Security Firewall */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/40 shadow-md shadow-indigo-500/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-mono font-bold text-indigo-300 uppercase">
                  Tier 2: API Gateway & Security Firewall
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">TLS 1.3 / JWT / Rate-Limiting / RLS Proxy</span>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
              OAuth2 / JWT Token Validation → Tenant Isolation Router (`app.current_org_id`) → Redis Token Bucket Rate Limiter (60 req/min)
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-slate-600 animate-bounce" />
          </div>

          {/* Layer 3: Application Services */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/40 shadow-md shadow-emerald-500/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-emerald-300 uppercase">
                  Tier 3: Core Application Services & State Machines
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Node.js / Express / Docker / ECS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <strong className="text-white block">Booking Dispatch Service</strong>
                <span className="text-[10px] text-slate-400">Spot pricing & carrier matching</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <strong className="text-white block">Telemetry Ingestion Engine</strong>
                <span className="text-[10px] text-slate-400">Sub-second PostGIS geofencing</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <strong className="text-white block">Settlement & Escrow Service</strong>
                <span className="text-[10px] text-slate-400">Stripe Connect & 2-phase capture</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-slate-600 animate-bounce" />
          </div>

          {/* Layer 4: Persistence & Storage */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/40 shadow-md shadow-amber-500/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                  Tier 4: Storage & Data Persistence
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">PostgreSQL (ACID) + TimescaleDB + S3 WORM</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <strong className="text-amber-300 font-mono block">PostgreSQL + PostGIS</strong>
                <span className="text-[10px] text-slate-400">Organizations, Bookings, Users, Audits</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <strong className="text-amber-300 font-mono block">AWS S3 Object Lock</strong>
                <span className="text-[10px] text-slate-400">Signed e-POD PDFs (7-year WORM compliance)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
