# IntentForge — Level 7 Software Intent Compiler

> **“Don't ask AI to build your idea. First teach AI exactly what your idea is.”**
>
> *AI Requirements Engineering + Software Architecture layer between human intent and AI coding agents.*

---

## 🌟 Overview

**IntentForge** is an open-source Software Intent Compiler and Requirements Engineering platform built on the **Level 7 Developer-Curated Engineered Loop**.

Before any AI coding agent writes a single line of code, IntentForge transforms raw, ambiguous human ideas into a **complete, structured, dependency-aware, and verified Software Specification / Build Contract**.

```text
Human Thought → Structured Intent → Requirements Graph → Software Model → Architecture → Build Contract → Code → Verification
```

---

## ⚡ The 52-Stage Pipeline

1. **Multi-Modal Idea Capture (Stages 01–02)**: Natural language intake decomposing concepts into structured **IDEA DNA** (Problems, Personas, Workflows, Business Models, Constraints, Risks).
2. **20 Engineering Domain Decomposer (Stage 03)**: Dynamic generation across Product, Users, Auth, Authz, UI/UX, Motion, Frontend, Backend, Database, Storage, Payments, Communication, AI/GPU, Security, Observability, Infra, DevOps, Testing, and Compliance.
3. **Adaptive 100-Question Principle & "Why?" Engine (Stages 04, 08, 09, 48)**: Complexity-weighted adaptive questioning translating technical decisions into plain English with full trade-off explainability.
4. **Assumption Firewall & Unknown Detection (Stages 10–12)**: Mandatory `CONFIRMED`, `INFERRED`, `ASSUMED`, `UNKNOWN`, `CONFLICT` classifications with 0–100% confidence scores and source provenance.
5. **Role, Actor & Permission Engine (Stage 13)**: Interactive RBAC/ABAC permission matrix.
6. **Workflow & Feature Contracts (Stages 14–15)**: Step-by-step lifecycle flow with preconditions, validations, state changes, DB events, and audit logs.
7. **Interactive Dependency Graph & Blast Radius Simulator (Stage 16)**: Real-time calculation of downstream cascading impacts when requirements change.
8. **Database Blueprint & SQL Studio (Stage 18)**: Relational schema models with spatial PostGIS types, soft-deletion policies, and one-click PostgreSQL DDL generator.
9. **API Contract Studio (Stage 19)**: REST / OpenAPI 3.1 endpoint specifications with rate limits and error matrices.
10. **UI/UX & Purposeful Motion Engine (Stages 20–22)**: 6-State UI matrix (`Loading`, `Empty`, `Success`, `Error`, `Offline`, `Denied`) with responsive breakpoint models and state-communicating micro-animations.
11. **Tri-Path Edge-Case Engine (Stage 23)**: Mandatory **Happy Path + Failure Path + Recovery Path** contracts.
12. **Operating Cost Estimator & Scalability Engine (Stages 27–28)**: Multi-tier cost modeling from 1,000 to 1,000,000 users.
13. **Build Readiness Score & Red Flag Engine (Stages 30–31)**: Composite 0–100 readiness audit blocking autonomous AI build until all blockers are resolved.
14. **Specification Freeze & Build Contract Exporter (Stages 32–34)**: Immutable version locks (`v1.0`, `v1.1`) and multi-format exports (Markdown PRD/TRD, PostgreSQL SQL, JSON, YAML, AI Agent Prompt Packs).
15. **Specification → Code Verification Loop (Stage 35)**: Live scanner auditing code against specification rules (detecting tenant leaks, missing idempotency keys, unhandled errors, and hardcoded secrets).
16. **7-Tier AI Memory Architecture & Knowledge Graph (Stages 37–38)**: Persistent memory tiers for Product, Decisions, Requirements, Constraints, Architecture, Preferences, and Changes.

---

## 🛠️ Tech Stack

* **Frontend**: React 18, TypeScript, Vite, Lucide React
* **Styling**: Tailored CSS Design System (Slate Titanium & HSL Tokens)
* **Visualizations**: Interactive SVG/Canvas Graph & Blast Radius Visualizers
* **Deployment**: Vercel

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/thakurcodeshere/IntentForge.git

# Navigate into directory
cd IntentForge

# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build
```

---

## 📄 License

MIT © 2026 IntentForge Team
