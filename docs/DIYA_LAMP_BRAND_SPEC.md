# Diya Lamp: an open-source browser agent

## Current direction

**Give an agent a browser. Keep control.**

A Java browser-agent runtime with a small, inspectable loop: observe the page,
propose an action, check policy, execute through a browser adapter, and verify
the result. Browser only. Desktop apps and shell execution are out of scope.

Cloud-agnostic and model-agnostic are architecture goals. Separate interfaces
must not be marketed as working integrations. Supported adapters will be
identified only after implementation and testing.

Self-hosting locally or on the user's cloud is the intended first deployment.
A paid managed cloud and advanced supervision console are planned future
options. Sell inspectable runs, explicit boundaries and human oversight. Do not
claim a hosted product, sign-in, pricing or a complete browser integration.

## Existing code and truthful claims

The public repository has experimental Java task-coordination primitives:
transactional claims, fenced leases, versioned checkpoints, approvals and
ordered history. These are reusable foundations, not proof of an end-to-end
browser agent, model connection, browser recovery or months-long run.

The browser runtime prototype is in development. The website's Observe,
Propose, Act and Verify example is scripted and fictional, and makes no remote
browser, model or database calls. A simulated click is not a real tool action.

Mention CockroachDB once in the FAQ, in the context of existing task-state
storage. Browser observation storage and recovery need their own verified
implementation. Do not imply universal cross-region resilience.

## Design and acceptance

Preserve paper surfaces, Inter semibold 600, 14px body and controls, compact
rectangular controls, and purposeful motion. Only the hero headline scales.
Use 🪔 **Diya Lamp** in prose. Avoid generic AI hype or fake customer proof.

The animated connector expresses the browser loop. Stage changes and example
actions use short positional transitions; reduced motion disables animation.
No text relies on low opacity. Test keyboard navigation, example reset,
responsive layout and the contact link before publication. Record fresh
Lighthouse results for the current release, rather than reusing old scores.
