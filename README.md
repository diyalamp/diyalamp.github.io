# 🪔 diyalamp

An open-source Markdown editor for macOS. Local files, rendered editing, tabs, and split view.

This repository hosts [diyalamp.com](https://diyalamp.com/). The website retains licensed components from the [Velora SaaS template](https://github.com/ColorlibHQ/velora-ui), retaining its MIT notice in `website/VELORA-LICENSE`. The product source lives in [diyalamp/diyalamp](https://github.com/diyalamp/diyalamp).

## Website

The production source is `website/`: Next.js, React, Tailwind CSS, Radix/shadcn-style controls, and Tiptap. The presentation is static and component-led; decorative particles, animated illustrations, and scroll reveals have been removed. The site uses the lamp mark, self-hosted Inter, and the JRXNA black, white, and #EE0000 palette. Real macOS screenshots show the editor, search, tabs, and Connections panel with fictional sample notes.

The desktop app uses JavaFX, AtlantaFX CupertinoDark, and RichTextFX. Normal mode shares one charcoal surface, and Focus uses black. Its unified macOS toolbar aligns with the native window buttons and shows one clickable workspace path. The resizable file sidebar contains search and creation controls. Search matches filenames or Markdown text, with case, whole-word, regular-expression, and include/exclude filters. Note rows offer split view, inline rename, and recoverable deletion. Dialogs and animated dropdowns use the same dark palette. Body text and controls use 16 px Inter. The first three rendered heading levels have distinct sizes, and code uses Menlo. Connect local notes with `[[Note name]]` or relative Markdown links and inspect them with SmartGraph. Focus fades text around the current line and dims the surrounding workspace and inactive split pane. The toolbar Pomodoro shows the Focus or Break countdown and supports custom durations, one cycle, and continuous repeat. The Help menu provides explicit update checks, and save conflicts prevent update installation. Apple silicon and Intel installers include a runtime.

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
