# Diya Lamp: persistent AI agent orchestration

## Owner-approved position

**One mission. Many agents. Built to keep going.**

Open-source persistent AI agent orchestration for coordinated work that can take
months or years. Sell continuity of a mission across agents, sessions, handoffs
and worker interruption. Do not describe a personal drive, generic memory vault,
AI storage wrapper or another chat interface.

## Architecture direction

All orchestrator data belongs in CockroachDB: goals, agent state, shared context,
dependencies, checkpoints, outputs and execution history. Cross-region replication
and configured survival goals support the resilience direction. Database durability
alone does not implement worker recovery, safe external retries or coordination.

Sources: [multi-region overview](https://docs.cockroachlabs.com/docs/stable/multiregion-overview)
and [survival goals](https://docs.cockroachlabs.com/docs/stable/multiregion-survival-goals).
Region survival requires a suitable topology/configuration; do not promise it by default.

## Website experience

Calm Notion-inspired surfaces; Inter semibold 600, body/control 14px, hero scales.
Use 🪔 **Diya Lamp** in prose. Show a mission, specialist agents, explicit handoffs
and durable checkpoints. The public scripted example is not an executing runtime.
No invented uptime, exactly-once effects, productivity metrics or tested years-long runs.

Existing public code is a persisted review-workflow foundation. General multi-agent
orchestration and regional recovery are in development, not verified delivery.
Website-only scope: publish this positioning without resuming app/backend work.
