# 🪔 diyalamp website

**Your agents. Your models. Memory built to last.**

The public landing page for the planned persistent-agent workspace: independent
agent identities, instructions, memory and tasks, with model choice through
OpenRouter and a portable, self-hostable orchestration architecture.

This release presents a target architecture, not an available managed service.
The current public code is an early local TypeScript fixture prototype backed by
SQLite. The planned Java runtime, hosted sign-in, model integration and cloud
persistence have not shipped. The website does not change that status.

## The experience

1. An interactive model-to-memory illustration makes continuity concrete.
2. An interactive console lets visitors select three fictional agents, change
   their model, inspect memory/instructions/tasks, and pause or resume each agent.
   Model changes preserve example records, not identical model behavior.
3. Architecture, project status, qualified storage plans and a pilot invitation
   distinguish the open-source core from the future managed cloud.

All body text uses self-hosted Inter at weight 600 and 14px. The original Apple
lamp favicon is preserved. Flat paper surfaces have no gradients or cursor lighting. Motion confirms model
changes, is user-pausable and is disabled for
reduced-motion preferences. Agent monograms and consistent stroke SVG controls
replace decorative icon collections.

All demo state is ephemeral and browser-local. No account, model, browser agent
or cloud worker is connected. The page never requests or stores API keys and
never uses the preview to authorize an external action. Arrow keys and Home/End
work in the agent, model and record selection groups.

## Build and publish

The existing GitHub Pages workflow publishes `dist` from `main` to
https://diyalamp.com/. Edit `dist/style.css`, then regenerate the inline stylesheet:

```sh
node scripts/inline-styles.mjs
node --check dist/app.js
```

Verify desktop and phone layouts, independent agent state, preserved records on
model changes, keyboard controls, pause/resume, motion preferences, links and
sharing assets before publishing. Keep credentials and private customer data out
of Git. Preserve the Apple lamp favicon.

Historical audit files apply to earlier releases, not this redesigned page.
Do not carry forward their Lighthouse scores without measuring this release.
