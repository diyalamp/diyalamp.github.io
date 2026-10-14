> Historical concept, superseded by the owner-approved persistent multi-agent orchestration pitch. See DIYA_LAMP_BRAND_SPEC.md for current positioning.

# Bounded executive debrief: a personal home for your AI

October 14, 2026. This is a landing-page concept, not an application build.
The owner rejected opportunity tracking and requested a larger open-source
consumer/computer-science direction; all implementation work remains stopped.

## Chosen pitch

**Stop starting over with every AI.** Diya Lamp proposes a user-owned personal
agent workspace: selected context with provenance, scoped access, inspectable
proposed actions and task checkpoints. A person can see what a compatible agent
receives and what remains unfinished before handing work onward.

First persona hypothesis: curious individuals/builders who use multiple AI tools
and repeatedly explain preferences and reconstruct project state. Urgent job:
continue real work without rebuilding context or granting an assistant access to
everything. Long-term ambition: user-owned personal agent runtime across tools
and devices. None of the integrations are promised as available today.

## Debate and tradeoffs

- Generic assistant: large opportunity, but 'do everything' hides permission,
  support, compute and action-reliability problems. Reject an unlimited promise.
- News/opportunity tracker: easier to demonstrate but explicitly rejected by
  the owner; do not publish that prepared intermediate concept.
- Personal agent home: fits ownership, durable state and technical depth, but
  memory portability alone is not a moat. The hypothesized advantage is a usable
  permission/checkpoint workflow that people can understand and trust.

Adversarial objections: OpenClaw and memory platforms already exist; consumers
may prefer bundled vendor memory, compatibility may be limited, permissions are
hard to explain, and synchronization increases security/cost obligations. A
polished illustration does not answer these objections. Compare task completion
and setup against existing tools before claiming superior value.

## Primary sources, not endorsements

[Paul Graham's startup-idea essay](https://www.paulgraham.com/startupideas.html)
argues for real problems one understands. Repeated context loss in this owner's
own work is a starting problem, not proof of a market.
[YC Requests for Startups](https://www.ycombinator.com/rfs) identifies consumer
AI as an area of interest. [a16z's consumer research](https://a16z.com/consumer/)
and [consumer retention discussion](https://a16z.com/podcast/what-makes-a-consumer-ai-product-stick-josh-elman/)
provide context for recurring personal value. No affiliation or funding claimed.
[OpenClaw's source](https://github.com/openclaw/openclaw) and
[memory documentation](https://docs.openclaw.ai/concepts/memory) establish strong
existing open-source competition. We cannot claim memory or openness is novel.
[Readwise pricing](https://readwise.io/pricing/reader) supplies a paid personal
information-tool benchmark ($12.99 monthly / $9.99 monthly equivalent annual), not
willingness to pay for Diya Lamp or a selected selling price.

## Technical direction and business gates

Potential core: provenance-tagged context, scoped capabilities, a versioned action
journal, optimistic concurrency and recoverable checkpoints. Proposed
CockroachDB synchronization holds account-owned context/permissions/task state;
its SQL transaction boundaries are relevant to durable state, not magical AI
correctness. Local-first storage and encryption need explicit designs and tests.
[Multi-region capabilities](https://www.cockroachlabs.com/docs/stable/multiregion-overview)
are a future option for measured locality/survival needs, not an excuse to spend
on idle infrastructure. No database or paid service is activated here.

Open-source proposed runtime; paid managed operation/sync/support with bounded
usage. All hosted customers pay before using the service. No activated plan,
merchant or subscription. Keep provider usage explicit, measure cost + payment
fees + support before pricing, and require positive delivered contribution.

Before a build: observe 5–10 actual cross-tool restarts, identify compatible
integration boundaries, test a concrete paid offer. Before selling: verify
permissions/revocation, source integrity, recovery, privacy/deletion and real
customer task completion; demonstrate an advantage against existing assistants.
The immediate owner objective is JRXNA real-order readiness; finish this page
and transfer all four roles there. No ongoing research loop or backend revival.
