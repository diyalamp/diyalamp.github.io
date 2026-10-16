# 🪔 diyalamp website

**One task. Many agents. No crossed wires.**

The public landing page for a user-owned, coordinated browser-agent workspace.
Agents own responsibilities, acquire the tabs they need, share decisions and
hand off dependencies under human control. A tab is a resource, not a permanent
agent or an always-running model loop.

The new direction is TypeScript throughout the console, coordinator and browser
workers, with Playwright / Stagehand considered for browser execution. This
website change does not implement that application. The linked public repository
still includes earlier Java experiments; the page says so explicitly.

## Three sections

1. The problem and value: fewer tab conflicts and less manual relay between agents.
2. An interactive, fictional storefront launch: a shared USD decision invalidates
   an outdated approval, Merch hands products to Commerce and releases its tab,
   and Domain waits for a human sign-in handoff. Conflicting requests never take
   over an owned tab in the illustration.
3. Open-source direction and a clearly future managed-cloud hypothesis. No fake
   sign-up, shipped integrations, prices, adoption numbers or reliability claims.

All demo state is local and ephemeral. No Shopify, Printify, domain provider,
model or remote browser is contacted. Keyboard arrows and Home/End select
scenarios and tabs. Ambient motion can be paused and honors reduced motion.

## Build and publish

The existing GitHub Pages workflow publishes `dist` from `main` to
https://diyalamp.com/. Edit `dist/style.css`, then regenerate the inline stylesheet:

```sh
python3 scripts/inline-styles.py
node --check dist/app.js
```

Verify desktop and phone layouts, scenario actions, keyboard controls, motion
preferences, links and sharing assets before publishing. Keep credentials and
private customer information out of Git. Preserve the Apple 🪔 emoji favicon.

Earlier audit records describe older releases. The current release is
`coordinated-workspace`; only its own recorded measurements apply to this page.

The published release scores **100 in all four standard Lighthouse categories**
on mobile and desktop in the recorded lab runs. See the
[current audit](quality/coordinated-workspace-audit.json) for exact scope and
metrics; these measurements are not a guarantee for every device or network.
