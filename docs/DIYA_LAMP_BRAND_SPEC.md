# Diya Lamp: coordination for long-running AI workflows

## Owner-approved position

**Independent agents. Collective progress.**

An open-source coordination layer for long-running AI workflows, implemented
in Java. Use workflow for the overall process, workstream for parallel efforts,
and task for individual assignments. Do not use mission language.

Sell shared-state coordination: task ownership, versioned context, explicit
handoffs, durable checkpoints, current approvals and recovery after interruption.
The immediate implementation scope is the open-source Java core, not a hosted
console, authentication, billing or cloud dashboard.

## Public copy and design

Keep the Notion-inspired paper surfaces, Inter semibold 600, 14px body/controls,
compact rectangular controls and restrained accessible motion. Only the hero
headline scales. Use 🪔 **Diya Lamp** in prose.

Mention CockroachDB once in the public FAQ. Keep database/vendor references out
of the hero, diagram, SEO metadata and sharing artwork; remove the architecture
link. The product should sell the coordination experience, not the database brand.

## Architecture and truthfulness

The intended system of record is CockroachDB for workflow data. Appropriate
multi-region topology and configured survival goals are needed for regional
resilience. Database transactions alone do not make external calls exactly-once.
The existing public code has persisted review-workflow primitives; new coordination
capabilities must be described according to their actual tested scope.

## Acceptance

Publish only after layout, keyboard and example interaction checks. Measure
performance, accessibility, best practices and SEO with standard mobile and
desktop Lighthouse audits. Record exact version, URL, scope and category scores;
do not copy historical results or guarantee scores on all networks/devices.
