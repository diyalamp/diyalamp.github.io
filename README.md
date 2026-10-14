# 🪔 Diya Lamp website

## Current position

**One mission. Many agents. Built to keep going.**

Diya Lamp is being developed as an **open-source persistent AI agent orchestrator**
for coordinated work that can span months or years. The product is about shared
missions, dependencies, durable checkpoints, handoffs and worker recovery.
It is not positioned as personal file storage or an AI drive.

CockroachDB is the intended system of record for all orchestrator data: goals,
agent state, shared context, dependencies, checkpoints, outputs and execution
history. Multi-region replication and configurable survival goals are the
resilience foundation. No deployed regional failover, service availability,
months-long execution, exactly-once external effects or recovery SLA is claimed.

The existing public [foundation](https://github.com/diyalamp/diyalamp) contains
persisted review-workflow primitives. It does not yet implement the general
multi-agent orchestrator. This update changes the website, not the runtime.

## Public illustration

A fictional 90-day database-driver mission follows Research, Build and Verify.
Visitors can inspect handoffs and simulate a worker restart. All state is local
to the page; no model, worker or database is contacted. Keyboard arrows and
Home/End select agents. Reduced-motion preferences disable animation.
The pilot invitation opens an email draft and sends nothing automatically.

## Build and publish

GitHub Pages deploys `dist` on a push to `main`. Edit `dist/style.css`, then run
`python3 scripts/inline-styles.py`; the deployment verifies generated inline CSS.
Check JavaScript syntax and inspect desktop/mobile layout and interactions.
Keep secrets and private customer data outside this repository.

Earlier writing-product and personal-workspace audit records remain historical
artifacts. Their Lighthouse scores do not establish scores for this release.
See [the current brand specification](docs/DIYA_LAMP_BRAND_SPEC.md).
