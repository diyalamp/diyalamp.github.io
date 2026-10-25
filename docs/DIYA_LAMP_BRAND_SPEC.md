# diyalamp — product and website direction

Owner direction, 25 October 2026. Supersedes the earlier agent-workspace website direction.

## Identity

**diyalamp** is lowercase, with the existing Apple-style lamp artwork. A tool for the mind: light the path forward. Never use a Unicode emoji for the displayed logo: other operating systems draw it differently. Use the shared `LampMark` component and `website/public/lamp.svg`, which embeds the original approved Apple artwork with its transparent bottom padding excluded from the viewBox. It should look like an inline emoji, aligned to the text baseline with deliberate spacing. The favicon uses the same fixed asset. Self-hosted Inter throughout.

Palette: Brand Yellow `#F1B13F`, Slate 150 `#3C4545`, Slate 100 `#697778`, Slate 50 `#C2D4D4`, Neutral 30 `#F1EFED`, Oracle Red `#C74634`. Calm paper surfaces, dark slate typography, restrained gold emphasis. Ensure readable contrast and do not communicate state through color alone.

## Product

A lightweight, open-source, focused Markdown writing workspace. Clean Notion-like reading and writing, visible `.md` file tree, single-note and side-by-side views. No account required for local writing. Intended desktop application: Java including its UI, targeting macOS.

The owner removed general code-file and text-file viewing from scope. Do not turn this into a code IDE, agent dashboard, model picker, or collaboration suite.

Optional future workflows: Substack publishing, notes in a user-controlled CockroachDB Cloud account, and semantic retrieval over study notes. Distinguish plans from available capabilities. Do not provision clusters, incur costs, request credentials, or claim connected integrations through an illustration.

## Website

Polished product story with an actual editable browser workspace. Clear hierarchy, careful spacing, responsive layouts, reduced-motion support, keyboard access, visible focus.

Latest owner requirements supersede earlier custom layouts: use a complete free, open-source Next.js startup template. Selected foundation is Velora UI's full SaaS page (MIT), adapted in `website/`. Keep its coordinated component structure and motion rather than substituting another handmade page. Make “An open-source writing app for macOS” prominent in the hero, with a compact accurate development-status note. Use Inter Semibold (600) throughout, and never use all-caps labels or uppercase text styling.

Owner's latest visual direction: an ambitious modern landing page, with meaningful scroll-driven scenes and transitions rather than ordinary reveal effects alone. Use one coherent stroke-icon system, consistent UI type sizes and generous aligned padding. Preserve simple reading and writing inside the demo. Do not hijack scrolling or put essential content behind animations.

Reference study: Craft (https://www.craft.do/) for a substantial visual canvas and prominent product composition; Linear (https://linear.app/) for disciplined hierarchy and detailed product UI; Reflect (https://reflect.app/) for atmospheric depth. These are composition references, not templates or sources of reusable artwork. Keep the lamp, warm gold path, slate and paper treatment original.

The browser workspace is useful local functionality, not the Java desktop binary. The existing Java repository contains earlier work; it does not establish that the newly described desktop editor shipped. Use a concise availability note and source links rather than fabricated downloads, compatibility badges, testimonials, adoption counts, or integration success states.

No sign-in or secret collection. Describe browser persistence/export accurately. Render user Markdown safely without executing embedded HTML or scripts.

## Publication

Owner authorized redesign and publication to diyalamp/diyalamp.github.io at https://diyalamp.com/. GitHub Pages builds the Next.js project in `website/` and publishes its static `website/out/` export from main. The old `dist/` custom page is no longer the publication target. Preserve third-party and Inter license notices. Record actual UI and deployment evidence; a preview or commit alone does not prove the public site is live.
