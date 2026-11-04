# 🪔 diyalamp

A tool for the mind. An open-source writing app for macOS, in development.

This repository hosts [diyalamp.com](https://diyalamp.com/). The website retains licensed components from the [Velora SaaS template](https://github.com/ColorlibHQ/velora-ui), retaining its MIT notice in `website/VELORA-LICENSE`. The product source lives in [diyalamp/diyalamp](https://github.com/diyalamp/diyalamp).

## Website

The production source is `website/`: Next.js, React, Tailwind CSS, Radix/shadcn-style controls, and Tiptap. The current presentation is intentionally static and component-led; decorative particles, animated illustrations, and scroll reveals have been removed. It preserves diyalamp's lamp mark, Inter Semibold, dark-only black, white and #EE0000 JRXNA palette, with darker gray writing surfaces. The embedded browser workspace supports Markdown notes, read/edit views, split notes, focus mode, local browser persistence and Markdown export. It does not upload notes or require an account. Export important work: browser storage can be cleared.

The Java desktop Markdown app is not yet released. This release focuses on local Markdown writing; cloud services and AI are outside its scope. The site labels these separately from the working browser preview.

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
