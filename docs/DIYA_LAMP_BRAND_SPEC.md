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

Carry the hero's subtle animated gold/slate gradient through the entire page as one continuous backdrop, including the closing section and footer. Avoid separate background panels that introduce sudden changes while scrolling. Marketing calls to action all use the same compact rounded-rectangle `Button` as “Explore on GitHub” in the open-source section, with a subtle shine and hover lift. Do not use pill-shaped CTA buttons. Keep workspace and accordion controls appropriate to their functions.

Latest refinements: the background motif is sparse nodes connecting to a warm dot of light, with gentle scroll-responsive movement and progressive connections; no square grid. Remove pill shapes from labels too, including the hero descriptor and Java/macOS/license tags. Those use the same compact rectangular dimensions, while remaining non-interactive labels. Keep the wordmark modest (20px text, 23px lamp), and use a consistent 16px body/control size instead of tiny metadata; headings and subheadings can be larger. Preserve Inter 600 everywhere and responsive wrapping.

Owner's latest visual direction: an ambitious modern landing page, with meaningful scroll-driven scenes and transitions rather than ordinary reveal effects alone. Use one coherent stroke-icon system, consistent UI type sizes and generous aligned padding. Preserve simple reading and writing inside the demo. Do not hijack scrolling or put essential content behind animations.

Reference study: Craft (https://www.craft.do/) for a substantial visual canvas and prominent product composition; Linear (https://linear.app/) for disciplined hierarchy and detailed product UI; Reflect (https://reflect.app/) for atmospheric depth. These are composition references, not templates or sources of reusable artwork. Keep the lamp, warm gold path, slate and paper treatment original.

The browser workspace is useful local functionality, not the Java desktop binary. The existing Java repository contains earlier work; it does not establish that the newly described desktop editor shipped. Use a concise availability note and source links rather than fabricated downloads, compatibility badges, testimonials, adoption counts, or integration success states.

No sign-in or secret collection. Describe browser persistence/export accurately. Render user Markdown safely without executing embedded HTML or scripts.

## Publication

Owner authorized redesign and publication to diyalamp/diyalamp.github.io at https://diyalamp.com/. GitHub Pages builds the Next.js project in `website/` and publishes its static `website/out/` export from main. The old `dist/` custom page is no longer the publication target. Preserve third-party and Inter license notices. Record actual UI and deployment evidence; a preview or commit alone does not prove the public site is live.


## October 25 owner refinements
Use continuous ambient Aurora and official tsParticles proximity connections, blue link flashes, gold node pulses, and sparse Oracle Red accents. No legacy grid or fixed cursor constellation. Compact header, footer and FAQ; consistent section rails. Translucent glass cards. Shared rectangular primary and translucent secondary controls, text before icon. Shine only on hover; no lift. Footer: GitHub, Bluesky, Reddit. All Inter Semibold.

### Final typography and neural motion revision
Owner replaced the all-Semibold instruction: use normal400 copy and Semibold600 headings, normal16px text everywhere including wordmark/navigation/buttons. Major hero/section headings share48px desktop/32px mobile. Card/FAQ/product UI labels use normal size. Curved quadratic neural links with traveling Slate50 gradients now reuse Velora AnimatedBeam geometry and Motion rather than straight tsParticles links. Pointer range280px, dynamic adjacency, reduced-motion static mode. Shine only, no hover lift.
