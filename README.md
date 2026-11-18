# 🪔 diyalamp

An open-source Markdown editor for macOS. Local files, rendered editing, tabs, and split view.

This repository hosts [diyalamp.com](https://diyalamp.com/). The website retains licensed components from the [Velora SaaS template](https://github.com/ColorlibHQ/velora-ui), retaining its MIT notice in `website/VELORA-LICENSE`. The product source lives in [diyalamp/diyalamp](https://github.com/diyalamp/diyalamp).

## Website

The production source is `website/`: Next.js, React, Tailwind CSS, Radix/shadcn-style controls, and Tiptap. The presentation is static and component-led; decorative particles, animated illustrations, and scroll reveals have been removed. The site uses the textured lamp mark, self-hosted Inter, warm paper, and terracotta accents drawn from the app icon. The screenshots use the desktop app with fictional sample notes.

![DiyaLamp 1.4.2 preview showing the light Markdown editor and linked notes](website/public/screenshots/workspace.webp?v=1.4.2-light)

DiyaLamp uses JavaFX, AtlantaFX, and RichTextFX. The 1.4.2 preview adds a warm light workspace, lamp-inspired accents, and continuous PDF scrolling. Focus mode uses a black surface and keeps the current line bright. The website shows the preview alongside the current public Mac downloads.

Desktop release links are centralized in `website/src/lib/desktop-release.ts`. Keep them aligned with the published assets before deploying. Do not reuse old installer-size figures; current GitHub release assets provide actual sizes and checksums. The under-5-MB installed target is not achieved.

## Development

Use Node.js 24 and pnpm 12.5.1:

```sh
cd website
pnpm install --frozen-lockfile
pnpm dev
```

Build the static site with `pnpm build`; output is `website/out/`. The home and alternatives routes use native HTML controls and ship without a browser JavaScript runtime. GitHub Pages deploys that output from `main` using `.github/workflows/pages.yml`. The custom domain remains diyalamp.com. The older `dist/` site is retained as legacy source and is not the publication target.

## Brand and release notes

See `docs/DIYA_LAMP_BRAND_SPEC.md` for owner direction and `docs/RELEASE_REVIEW.md` for actual validation evidence. Do not claim a deployment is live merely because a build or push succeeded. Keep planned integrations and desktop availability accurate. Never include credentials in public sources or browser builds.

The public pages use locally bundled Inter and static markup. The old browser notebook components remain in the source tree and are outside the public page routes.
