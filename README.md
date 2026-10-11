# 🪔 diyalamp: website

**Write clearly. Think for yourself.**

A standalone AI-assisted writing course: short lessons, critique of the learner’s own draft, deliberate revision, and fresh independent practice. The design keeps the quiet document-style branding; the product pitch does not depend on Notion.

## What this site contains

- A clear course outcome and proposed two-week curriculum.
- An interactive, fictional lesson with an original draft, a reasoning critique, a careful revision, and a fresh exercise.
- Illustrative draft assessment criteria, not fabricated customer ratings or validated learning results.
- Proposed Free, Writing Foundations, and Practice Plus offers. Paid enrollment is not available.
- Sources for the established methods informing the open writing engine.

The sample self-check is a local checklist. It does not run AI, grade text, collect drafts, or send data. Enrollment buttons open an availability dialog, not checkout. The hosted application and payment flow still require implementation and validation.

## Links

- [Website](https://diyalamp.com/)
- [Open writing engine](https://github.com/diyalamp/diyalamp)
- [Paul Graham: Good Writing](https://paulgraham.com/goodwriting.html)

## Local preview

```sh
python3 -m http.server 4174 --bind 127.0.0.1 --directory dist
```

The site uses plain HTML, CSS, and JavaScript without a build step. Assets live in `dist`. Main-branch pushes deploy through the existing GitHub Pages workflow.

## Verification

Check the four lesson states, independent exercise and checklist, enrollment dialogs, keyboard focus, phone layout, reduced-motion behavior, and new-tab link targets. All non-hero text uses a consistent base size. No credentials or customer data belong in this repository.

## Business boundary

The engine’s review workflow, prompts, and provider interface are public. Course content, hosted accounts, billing, allowances, and production operations are managed privately. This website describes the selected direction, not a completed paid service.

## Credits

JRXNA. System typography and platform emoji. See THIRD_PARTY_NOTICES.md for existing asset attribution.
