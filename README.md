# 🪔 diya lamp — website

**Write a decision you can defend.**

AI that helps you test your argument and sharpen your writing. In Notion. With evidence, explicit assumptions, and edits you approve.

This repository contains the public website and an animated concept preview of the writing workflow: draft, examine, respond, and revise. The preview illustrates reasoning review, author-supplied evidence, and an approved revision; it does not call AI or connect to Notion.

## Links

- [Live website](https://diyalamp.github.io/)
- [Java application source](https://github.com/diyalamp/diyalamp)
- [Paul Graham: Good Writing](https://paulgraham.com/goodwriting.html)

## Preview locally

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173/. The site uses plain HTML, CSS, and JavaScript, with no build step. The animation supports pause, replay, and reduced-motion preferences. The layout adapts to mobile screens.

## Publishing

Changes pushed to main are deployed to GitHub Pages by the workflow in .github/workflows/pages.yml. Published assets live in dist. The previous hypothesis-model design remains recoverable through the archived-site-design tag and Git history.

## Product direction

The application is in development. It will read selected Notion drafts, help inspect claims, evidence, assumptions, and objections, and propose individually approved revisions. Reviews support judgment; they do not certify truth.

Hosted AI provider API billing is separate from chat subscriptions. Provider keys belong in local credential storage, outside Notion documents and the repository.

## Credits

JRXNA. Typography uses Inter via Google Fonts. Branding uses the literal 🪔 emoji; its appearance depends on the platform. See THIRD_PARTY_NOTICES.md for asset attribution.
