# 🪔 diyalamp

An open-source Markdown editor for macOS. Local files, rendered editing, tabs, and split view.

This repository hosts [diyalamp.com](https://diyalamp.com/). The website retains licensed components from the [Velora SaaS template](https://github.com/ColorlibHQ/velora-ui), retaining its MIT notice in `website/VELORA-LICENSE`. The product source lives in [diyalamp/diyalamp](https://github.com/diyalamp/diyalamp).

## Website

The production source is `website/`: Next.js, React, Tailwind CSS, Radix/shadcn-style controls, and Tiptap. The presentation is static and component-led; decorative particles, animated illustrations, and scroll reveals have been removed. The website and embedded browser notebook retain the lamp mark, self-hosted Inter, and dark black, white, and #EE0000 JRXNA styling. The browser notebook supports rendered Markdown, slash commands, closable tabs, split notes, browser-local persistence, and Markdown export. It does not upload notes or require an account. Export important work: browser storage can be cleared.

The desktop product is separate from the browser notebook. Version **1.1.1** provides a light-only JavaFX workspace with AtlantaFX and RichTextFX components, installed macOS system text, Menlo code, a local folder explorer, closable tabs, split view, and a visible accent picker. Users explicitly check for updates and approve download and installation from the Help menu. Save conflicts prevent update installation. Apple silicon and Intel installers include a runtime and remain unsigned and not Apple-notarized. Cloud services and AI are outside this desktop release.

Desktop release links are centralized in `website/src/lib/desktop-release.ts`. Keep them aligned with the published assets before deploying. Do not reuse old installer-size figures; current GitHub release assets provide actual sizes and checksums. The under-5-MB installed target is not achieved.

## Development

Use Node.js 24 and pnpm 12.5.1:

```sh
cd website
pnpm install --frozen-lockfile
pnpm dev
```

Build the static site with `pnpm build`; output is `website/out/`. GitHub Pages deploys that output from `main` using `.github/workflows/pages.yml`. The custom domain remains diyalamp.com. The older `dist/` site is retained as legacy source and is not the publication target.

## Brand and release notes

See `docs/DIYA_LAMP_BRAND_SPEC.md` for owner direction and `docs/RELEASE_REVIEW.md` for actual validation evidence. Do not claim a deployment is live merely because a build or push succeeded. Keep planned integrations and desktop availability accurate. Never include credentials in public sources or browser builds.

The browser notebook shell uses adapted shadcn/ui sidebar-07 components, Tiptap, and Lucide. Inter is bundled locally for the website and browser writing surface. Desktop typography is provided by macOS; the light desktop workspace is not the dark browser demonstration shown on the site.
