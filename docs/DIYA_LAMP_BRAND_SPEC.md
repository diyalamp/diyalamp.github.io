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

Owner latest correction: retain the two text sizes but restore Inter600/Semibold across all text. All beam gradients must use Gold #F1B13F and Slate50 #C2D4D4; remove upstream purple/cyan defaults. Nodes should drift clearly and independently, with visible traveling Slate50 impulses.

### Angular firing and rendered notebook follow-up
Latest owner direction replaces curved background paths with horizontal/60-degree routes (hexagon120-degree corners). Pulse arrival drives destination flash, expanding ripple, and a bounded set of temporary daughter nodes. Bright brandgold pointer dot overlays content without capturing input. Shared header/footer artwork baseline adjusted3px down. Illustration beams terminate at box edges and whole boxes glow. Tightened desktop section spacing48px/mobile32px, cards24px/mobile20px, gaps16px. Owner requested rendered editing/slash commands, multiple closable note tabs, cleaner sidebar, and removal of preview/reset labels.

Latest final direction: background returns to a darker gold/slate pointer-reactive gradient with official tsParticles straight proximity links and cursor attraction. Illustration retains angular edge-to-edge paths with softer ripples and darker boxes. Shared8px spacing unit (8/16/24),8px radius, unified dark slate glass for outer cards/labels/secondary actions, baseline-aligned footer,14px window dots. No zoom on feature-card hover.

Final spacing adjustment: base12px with24px/36px multiples; owner requested slightly more air than the8px pass. Shared8px corner radius. Notebook fixed640px height with internal scrolling; tabs and actions use36px height and12px horizontal padding. Gradient restored to darker gold/slate per latest instruction, with cursor-reactive movement. Native window dots14px with standard red/yellow/green.

Notebook navigation: panel-left sidebar toggle beside native window controls, animated collapse with reduced-motion fallback; drag rows to reorder, drag into writing/right reference areas to open panes. Keep keyboard menu alternatives. Search content separates the available browser notebook from the macOS Java roadmap. Use genuine audit results; never claim unmeasured perfect scores.

## November 4 owner direction — authoritative current palette and release scope

Use dark mode only in the website, browser prototype, and desktop app. The identity now uses JRXNA black #000000, white #FFFFFF, and red #EE0000. Writing areas and app demonstrations may use soothing dark gray surfaces. No light theme or appearance toggle. Preserve the fixed lamp artwork and current Inter typography. Use the approved JRXNA logotype in the footer credit, “A JRXNA production.”

Lead with technical product facts: Markdown editor for macOS, live formatting, local .md files, no sign-up, tabs, and split view. Java is a contributor attribute, not the main pitch. Never claim a sub-10 MB installed footprint without measurement. Current bundled package measurements are materially larger.

The desktop product is local writing. Cloud databases, account services, AI agents, and direct publication are outside this release. Website presentation and the existing Radix/shadcn-style components establish the app's visual direction. Keep installer availability truthful until assets are published.

Owner's final November 4 refinement: simplify the presentation. Clean, elegant, sophisticated components take priority over decorative animation. Remove particles, scroll sequences, and neural illustrations from the marketing page. Keep Radix/shadcn-style controls and the functional Tiptap prototype. Use simple navigation, technical copy, consistent panels, a concise FAQ, and the JRXNA footer credit.

## November 5 desktop refinement — authoritative current app facts

The installed macOS app is now **light mode only**; this supersedes the earlier dark-only desktop instruction. Use the installed macOS system font for prose and controls, and Menlo for code. Do not bundle Inter in the desktop app. The writing area uses soft off-white surfaces, neutral text, and a user-selectable accent visible in the tab bar. The desktop shell uses JavaFX, AtlantaFX, and RichTextFX components, with native macOS window controls, a folder explorer showing Markdown extensions, closable tabs, and split view.

Version 1.1.1 release references are prepared in the website's shared desktop-release module. Publish those website references only after matching Apple silicon and Intel assets exist. In-app update checks are explicit under Help; checking does not download or install an update. Installation follows a user-selected verified download and a save check, and save conflicts prevent restart. This remains an unsigned, non-notarized community release.

Keep the **website and browser notebook dark**, with the existing Inter typography and JRXNA palette. Label the browser notebook as a separate browser-local demonstration, not as a screenshot or exact reproduction of the desktop app. Browser storage does not sync with desktop folders. Preserve the approved lamp geometry; the desktop icon adds only a subtle rounded backplate, edge lighting, and shadow.

Do not carry installer measurements from 1.0.2 into the JavaFX release. Use the actual release asset byte counts when available, distinguish downloaded and installed size, and keep the under-5-MB target explicitly unachieved.
