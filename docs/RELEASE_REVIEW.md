# Markdown-writing website release review

Review scope: public landing page for the new diyalamp direction. The owner’s
25 October 2026 brief supersedes the earlier agents/orchestration marketing brief.
This review does not implement or validate a desktop application or cloud service.

## Product evidence and copy boundaries

- Brand: lowercase **diyalamp**, Apple 🪔 mark, Inter, owner-supplied gray/yellow
  palette. The older repository brand document describes a superseded product.
- The existing `diya-lamp-app` repository contains Java browser orchestration,
  task coordination and a writing-review CLI, plus a TypeScript fixture workspace.
  It does not establish an available Java Markdown desktop editor.
- No JavaFX/Swing Markdown editor, signed macOS Markdown-app distribution,
  Substack publishing client, or notes-to-Cockroach sync was found in that review.
- Its Apache-2.0 license is present. An open-source CTA may point to the real
  repository, but should not imply the existing source already implements the
  newly described editor.
- The embedded browser editor may be fully functional and presented prominently.
  Its local interactions, persistence, download and formatting behavior should be
  explained accurately. It must not request service credentials.
- Preferred primary CTA: **Try the workspace**, pointing to the actual preview.
  Secondary CTA: **Explore the source**. Avoid a macOS download CTA unless a
  working relevant release is available.
- Desktop Java/macOS, Substack handoff, optional owner-controlled Cockroach
  storage and later semantic search can retain confident product direction while
  their availability is disclosed once, cleanly, rather than repeated caveats.

## Substack evidence

Official Substack support documents imports and manual copy/paste into its editor:
https://support.substack.com/hc/en-us/articles/360037830351-How-do-I-import-my-posts-from-another-platform-such-as-Mailchimp-WordPress-Medium-or-Ghost

The referenced Developer API support URL returned 404 during review. A public
write/publish API was not verified. Do not advertise an active one-click publishing
integration on the basis of the website preview. A real copy/export handoff is a
suitable current browser interaction; publishing integration belongs in the plan.

## Release checks still required

- Inspect final HTML/JS/CSS after design and interaction handoff.
- Browser-check notes, editing, single/split views, add note, export/reset,
  keyboard/focus and reduced-motion behavior at desktop and narrow widths.
- Ensure Markdown input cannot execute HTML or unsafe links.
- Replace legacy social cards, agent-oriented metadata and stale sign-in route.
- Run `node scripts/inline-styles.mjs` before committing the generated homepage.
- No old Lighthouse or publication results are evidence for this release.

## Implemented landing-page static audit

- Bundled Node syntax check passed for `dist/app.js`.
- Parsed final HTML: no duplicate IDs; all nonempty fragment links resolve; all
  literal JavaScript control IDs are present in the document.
- Markdown rendering uses created DOM nodes and `textContent`, not user HTML.
  Generated links allow only HTTP(S) and mailto schemes and use opener isolation.
- Editing, notes, pane selection, split/focus toggles and Markdown export have
  concrete local implementations; there are no cloud-service requests in preview.
- Roadmap labels and desktop availability copy distinguish functioning preview
  from unimplemented Java/macOS distribution and future integrations.
- Mobile readability issue identified and fixed by designer: final CSS overrides
  stack split panes at narrow widths and keep document text at 14px. Small paper
  text contrast was changed to Slate 150. Browser verification is still required.
- Persistence issue identified: the original restore cap was lower than permitted
  saved content. Sent to interaction owner for correction before release.

No subjective desktop/mobile visual inspection or live deployment was performed
by this reviewer. Those belong to the browser/release owner.

## Persistence repair reviewed

The interaction owner corrected the persistence mismatch. The restore cap is now
12,000,000 serialized characters, covering 30 notes of 60,000 characters even with
JSON escaping overhead. Per-note validation remains; duplicate IDs are rejected.
A failed/invalid restore preserves prior storage rather than overwriting it with
samples, and a visible status asks the user to export new changes. Explicit reset
still requires confirmation. The textarea has a 60,000-character limit and input
clamping is visible. Storage-quota failure reports the unsaved state.

Post-repair Node syntax check passed. No remaining blocking issue was identified
in this static review. Browser behavior, responsive visual quality and actual
GitHub Pages deployment still require the release owner's verification.

## Shipping foundation changed to Velora / Next.js

The custom `dist` design and its audit below are historical only. The selected
shipping implementation now lives in `website/` and exports to `website/out`.
It requires a new final audit and deployment verification; earlier custom-page
checks do not establish readiness of this replacement.

`website/VELORA-LICENSE` was compared byte for byte with the retrieved upstream
Velora source license and matches. It is MIT, copyright 2026 Aigars Silkalns.
The complete notice must remain with the adapted source. Static export is
configured in `website/next.config.ts`.

The copied module set generally uses reduced-motion hooks or motion-safe CSS.
The final page should use the large blurred Aurora and RetroGrid layers with
restraint; actual rendering cost and mobile animation smoothness remain browser
checks. Final content must avoid invented customers, testimonials, paid plans,
download availability, or implemented cloud/publishing claims.

### New Next page and React workspace audit

The new hero explicitly identifies macOS and places the Java-in-development
availability note beside the primary action. Invented template customer logos,
statistics, testimonials, pricing, and sign-up claims were removed. Future
integrations remain marked planned, optional, or future. Global styling sets
Inter 600; authored labels use sentence case. The designer corrected imperative
CTA scrolling to honor reduced motion and removed an unconditional saved-status
claim outside the workspace.

`WorkspaceDemo` uses React text nodes for Markdown and a protocol allowlist for
links, with opener isolation. Persistence retains the original failed restore,
validates unique IDs and note/content budgets, and reports unsaved quota errors.
Reset requires confirmation. Read/edit, note selection, new notes, split panes,
focus and export have real handlers. The phone layout stacks split documents and
uses 14px document text. Small muted-text contrast was sent to the component
owner for correction; app build and browser behavior remain release checks.

The component owner applied the contrast correction using Slate 150 for small
muted labels and added long-text wrapping. The owner reports TypeScript passing;
the release owner owns the final production build and Chrome verification.

Final icon/type polish rechecked: all 15 shared SVG symbol IDs are present, local
and SVG fragment references resolve, there are no duplicate IDs, generated icons
use namespaced DOM creation, and toolbar state changes preserve icon markup.
Post-polish Node syntax check passed. Final CSS further increases preview and
marketing type sizes without changing the static review outcome.

## Second design pass: composition criteria

The first visual direction was rejected by the owner as ordinary. The earlier
static results establish implementation checks, not approval of its appearance.
The replacement design requires a fresh final-file and browser review.

Primary reference pages consulted: [Reflect](https://reflect.app/),
[Obsidian](https://obsidian.md/), [Linear](https://linear.app/), and
[Craft Learn](https://www.craft.do/learn). Craft's homepage timed out. These were
content retrievals, not rendered animation inspections. The following are design
inferences for the release owner to assess in Chrome:

1. A distinctive hero with one dominant promise and a large, readable product
   scene containing actual notes. The product proof should carry the composition.
2. Three visually distinct chapters demonstrating writing, comparing notes, and
   ownership/export. Motion should explain a state change, with an equally clear
   reduced-motion version and no scroll trap.
3. Deliberate desktop and phone compositions: coherent spacing and type rhythm,
   readable documents, usable controls, and one focal point per scene. A phone
   should not receive a tiny scaled-down desktop editor.

## Rebuilt design and reusable motion: static review

The replacement HTML has no duplicate IDs, missing local/SVG fragment targets,
or missing literal JavaScript control IDs. Both `app.js` and `product-motion.js`
pass the bundled Node syntax check. Availability and planned-feature labels
remain present, with browser storage behavior explained in the FAQ.

The reusable product reveal adapts the official Inspira UI Container Scroll
component from <https://registry.inspira-ui.com/container-scroll.json>, whose
component files were retrieved and inspected. The repository's
[MIT license](https://raw.githubusercontent.com/unovue/inspira-ui/main/LICENSE)
was verified; the complete notice is retained in the adapted JavaScript. No
restricted Aceternity template source was used by this reviewer.

The adaptation keeps rotation/scale/title interpolation while using clamped
viewport coordinates. Mobile, short viewports, and reduced-motion preferences
flatten the reveal. It schedules scroll updates through animation frames,
supports observer/event cleanup, and does not read or modify editor state.
No blocking static issue was found. Visual impact, layout, and actual interaction
in Chrome remain the release owner's checks, not claims established here.

## Final production checks — Next.js / Velora adaptation

The earlier custom HTML design was superseded by the owner's explicit request for a complete free Next.js template. Production now builds `website/` and publishes `website/out/`. The upstream Velora source was reviewed at commit a07bcc129b45eeed3fc070357a6a74b876d96159; its MIT license is retained in source and public notices.

- Optimized Next.js static production build and TypeScript check passed. Webpack is used for deterministic local/CI compilation; the initial Turbopack attempt could not bind its local compilation helper in the restricted environment.
- Chrome desktop: hero and animated feature compositions rendered; workspace navigation, note selection, creation, editing, safe Markdown rendering, split view, focus mode and Markdown export exercised. Chrome reported the test export complete.
- Chrome responsive preview at 390 × 844: text and editor controls remained readable and within the viewport. Sidebar becomes a horizontal note strip. A created note and its content survived a full reload.
- Literal HTML was displayed as text in a test note. Storage remains browser-local; no backend or third-party API connection was added.
- Global Inter 600 was confirmed in Chrome's style panel. No all-caps label styling is authored. The hero explicitly identifies the macOS writing-app direction and includes a compact desktop-development note.
- Fixed Apple-style artwork is loaded from `lamp.svg` through a shared component, not an operating-system emoji font. SVG viewBox excludes the original bitmap's transparent bottom margin. Source artwork is unchanged.
- Reduced-motion behavior was checked in source; an OS-level reduced-motion browser session was not separately exercised. No Lighthouse score is claimed.

Publication confirmation is recorded separately after the GitHub Pages deployment succeeds.

## October 25 refinement release
- Production Next.js/TypeScript/static export passes; git diff whitespace check passes.
- Official locally bundled tsParticles slim + twinkle replaces the old fixed background; window proximity interactions, reduced-motion and cleanup paths checked in source.
- Shared rectangle controls, translucent cards, compact section rhythm and rails, social SVGs, fixed lamp branding and Inter Semibold retained.
- Removed hover lift per latest owner direction; retained shine.
- Added truthful website/source structured data and indexable alternatives FAQ. Existing sitemap and robots remain canonical.
- Chrome accessibility snapshot confirms new controls, alternatives FAQ and the three correct footer social destinations. Screenshot requests subsequently timed out; final dynamic motion and new spacing were not visually confirmed in this pass.

## Curved neural / two-style follow-up
Production build and TypeScript pass. Chrome local screenshot confirms unified16px normal copy/navigation/wordmark,48px major heading, curved paths and brighter curved connections converging on the cursor; no straight particle network. Motion gradients carry Slate50 pulses. Sidebar New control explicitly keeps its trailing icon inline. Reduced-motion static rendering and visibility pause are implemented. Public deployment confirmation follows the new commit.
