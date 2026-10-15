# 🪔 Diya Lamp website

## Current position

**Independent agents. Collective progress.**

An open-source coordination layer for long-running AI workflows. The intended
Java core manages workstreams, exclusive task ownership, versioned checkpoints,
explicit handoffs, approval conditions and action records. It complements durable
execution tools rather than claiming persistence alone is novel.

The existing public repository contains earlier review-workflow primitives.
General multi-agent coordination is in development. No hosted console, sign-in,
paid service, production failover or years-long execution is advertised as delivered.

Database architecture appears only once in the public FAQ. No external database
architecture link is shown. See the current brand specification for the full
technical direction and constraints.

## Public illustration

Research, Build and Verify illustrate workstreams and recorded handoffs.
Visitors inspect checkpoints and simulate worker restarts. All demo state is
browser-local; no model, worker or database is contacted. Keyboard arrows and
Home/End select agents. Reduced motion disables animation. The workflow contact
invitation opens an email draft; nothing is sent automatically.

## Build and publish

GitHub Pages deploys `dist` on a push to `main`. Edit `dist/style.css`, then run
`python3 scripts/inline-styles.py`; the deployment verifies generated inline CSS.
Check JavaScript syntax and inspect desktop/mobile layout and interactions.
Keep secrets and private customer data outside this repository.

Earlier writing-product and personal-workspace audit records remain historical
artifacts. Their Lighthouse scores do not establish scores for this release.
See [the current brand specification](docs/DIYA_LAMP_BRAND_SPEC.md).

Current website check: standard local mobile and desktop Lighthouse 13.5.0 runs
each scored 100 performance, accessibility, best practices and SEO. Exact scope
and metrics are in `quality/workflow-coordination-audit.json`. Live deployment
is verified separately; lab scores are not every-device guarantees.
