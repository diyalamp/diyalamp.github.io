# 🪔 diyalamp: website

**Defensible writing with AI in Notion.**

AI that helps you test your argument and sharpen your writing. In Notion. With evidence, explicit assumptions, and edits you approve.

This repository contains the public website and an animated concept preview of the writing workflow: argument mapping, stress-testing, assumption checking, decision framing, and final structure. The preview illustrates reasoning review, author-supplied evidence, and an approved revision; it does not call AI or connect to Notion.

## Links

- [Live website](https://diyalamp.github.io/)
- [Java application source](https://github.com/diyalamp/diyalamp)
- [Paul Graham: Good Writing](https://paulgraham.com/goodwriting.html)

## Preview locally

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173/. The site uses plain HTML, CSS, and JavaScript, with no build step. The review panel moves through the five phases, stops for author approval, and respects reduced-motion preferences. Sidebar buttons are decorative. The layout adapts to mobile screens.

## Publishing

Changes pushed to main are deployed to GitHub Pages by the workflow in .github/workflows/pages.yml. Published assets live in dist. The previous hypothesis-model design remains recoverable through the archived-site-design tag and Git history.

## Product direction

A hosted, Notion-first writing workflow for product managers and enterprises. Customers would connect Notion, request the five phases from the writing workspace, supply evidence, and approve results. The website presents this direction, not a live subscription service.

The page includes a decision-document example, sourced methods, a short attributed Paul Graham quote, an interactive enterprise control preview, and proposed Free, Personal, and Enterprise plans. Prices and allowances are unvalidated proposals. Setup and sales buttons open an explanatory dialog with a public GitHub inquiry link; they do not connect accounts, collect cards, submit forms, or start reviews.

The existing Java release supports local Codex reviews and Notion import/publication. Hosted OAuth onboarding, company-funded AI calls, billing and usage gates, and enterprise administration are planned. Cloud and model portability is an architecture direction; broader support will be advertised only after validation. The writing engine, review prompts, model adapters, and Notion connector form the open core. Hosted accounts, billing, usage controls, administration, and production operations belong to the private managed service. Operating credentials and customer data stay private.

## Verification

Check desktop, tablet, and phone layouts; the five-phase review action; enterprise preview tabs (including keyboard navigation); dialog opening and closing; reduced-motion behavior; and new-tab link targets. This static site has no customer data or service credentials.

## Credits

JRXNA. Typography uses Inter via Google Fonts. Branding uses the literal 🪔 emoji; its appearance depends on the platform. See THIRD_PARTY_NOTICES.md for asset attribution.
