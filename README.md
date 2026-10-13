# 🪔 diyalamp website

An evidence-aware writing workspace for product managers and founders preparing consequential decision memos. The public promise is “Defensive Writing. Stronger decisions.” The concrete benefit to investigate is finding weak claims before someone else does, while keeping the relationship between claim, source, and review visible through revisions.

GitHub Pages publishes `dist`. Hosted AI, subscriptions, and checkout are not advertised as available. The pilot invitation opens an email draft with memo type, deadline, and review bottleneck; it does not send a message or upload a document. Scope, confidentiality, delivery, and pricing must be agreed before a pilot.

## What the example demonstrates

The browser-local, fictional pricing memo shows a claim beside an interview passage. A scoped revision narrows the claim. A later stronger rewrite invalidates the prior check. Undo restores wording but leaves review open; explicit source review is required again. Reset begins a new example. This is scripted, not an AI verdict or independent verification.

The five linked methods inform the proposed workflow. They do not prove the combined product scientifically validated. The Paul Graham quotation and source remain in the hero.

## Positioning evidence and choices

Reviewed October 12, 2026:

- [ChatPRD pricing](https://www.chatprd.ai/pricing) lists Pro at $15/month equivalent billed annually, including document generation, scorecards, saved knowledge, and integrations. This establishes a competing paid offer, not verified sales or willingness to buy our product.
- [Productboard Spark](https://www.productboard.com/product/spark/) describes cited feedback synthesis, source-traceable recommendations, inline change acceptance, and document history. These features alone cannot support a uniqueness claim for diyalamp.
- [PM discussion about documentation and stakeholder review](https://www.reddit.com/r/ProductManagement/comments/1ccpru9) has a search-indexed excerpt describing repeated evidence requests and updating affected documents. The full thread was unavailable on this check. Treat this only as an anecdotal pain signal, not market-size or payment evidence.

The initial reachable persona hypothesis is an individual PM with an upcoming leadership review and a concrete draft, followed by small product teams with recurring memo review. The useful entry point is a bounded review of that memo, rather than requiring a new organization-wide knowledge system. Candidate acquisition routes are a demonstrated fictional before/after review, permission-based PM community participation, and referrals from pilot participants. No outreach has been sent and no paid acquisition is running.

The site replaces three speculative plan cards with roadmap, launch, and investment situations, then one scoped pilot invitation. The intended value to test is catching consequential overclaims and reducing repeated checks through revisions. It does not claim exclusive capabilities, guaranteed approval, or measured time savings. Success requires a real participant who finds a material issue worth resolving and wants a second review; current research has not established that.

## Development

Serve `dist` with a static HTTP server for preview. JavaScript syntax can be checked with `node --check dist/app.js`. Keep credentials and customer documents out of this public repository. Honor reduced-motion preferences; progressive reveal must not hide content when scripts are disabled.

## Conversion and acceptance priorities

The current public funnel is a scripted example followed by a pilot conversation. It is not a self-serve paid product. Public sign-in stays unavailable until the real app has a verified public address and launch approval. The local application's author-recorded source checks must be described as author judgments, not automated verification.

1. **First usable session:** approved public app URL, Google sign-in, clear return path, and no fictional signed-in profile. Acceptance: a new authorized user reaches their own workspace, signs out, and cannot reopen it unauthenticated. Local login alone does not meet public acceptance.
2. **Durable first memo:** paste a sanitized memo and source passage, save, reopen, and confirm tenant isolation. Acceptance: the same user gets the same content after a new session; another user cannot access it. Source upload is not needed for this first slice.
3. **Honest review loop:** anchor a claim to source text, record an author judgment, modify claim or source, and preserve stale status through undo. Acceptance: only an explicit new check marks that revision reviewed; source absence and AI inference remain visible. This is useful workflow, not yet the promised automated critique.
4. **Live AI value gate:** explicit review action, source-grounded findings, scoped proposal, accept/reject/undo, visible model errors, no fabricated citations. Compare findings with the author's existing process on real permitted documents. Do not replace manual labels with AI-reviewed badges until a live run actually succeeds.
5. **Payment gate:** one stated price, included review allowance, taxes/terms, cancellation/refund policy, successful and failed checkout, webhook retries, and entitlement verification. Do not charge for a claim that the acceptance journey cannot fulfill. Confirm service-provider availability for this business before designing checkout around it.
6. **Acquisition gate:** publish a truthful demonstration first. Track example completion, qualified pilot requests, completed reviews, material findings accepted, repeat use, and willingness to pay separately. Record aggregate funnel events without memo/source text; do not equate signups with value.

Pricing hypothesis, not a published offer: compare a bounded $19 single-memo review pack with a $29 monthly pack only after real usage/cost evidence. Price must cover review and rerun costs, payment fees, and support. The recurring option needs repeat memo work; an imminent review deadline may favor a one-off pack. ChatPRD's broader $15/month-equivalent annual offer creates a strong comparison, so cheaper generic critique is a weak strategy. Do not run paid acquisition until activation and second-use evidence exist.

Reachable audience hypothesis: PMs with a decision memo due within two weeks, followed by product leads reviewing several memos. A permitted PM community demo or an introduction from an existing participant can reach this audience. First outreach should ask about a concrete review bottleneck, not claim measured productivity gains. No outreach or social posts are authorized by this document.

Accessibility repair: explicit pause/play for automatic method highlights follows [W3C pause/stop/hide guidance](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html); normal hover and selection still do not pause motion. Reduced-motion preferences remain respected. Replaced feedback controls restore keyboard focus to their result, and the pilot email address remains readable when no email client is configured. These source-level checks are not a full accessibility certification.


## Landing-page refinement release, October 14, 2026

This release contains 18 concrete refinement passes, followed by integrated browser QA. These are documented changes, not claims of conversion lift or 18 separate user studies.

| Pass | Change | Verification |
| --- | --- | --- |
| 1 | Hero offer: Defensive Writing, stronger decisions, a concrete weak-claim benefit | One primary heading; buyer-facing payoff visible above CTA |
| 2 | Demo copy explains evidence drift through revisions | Fictional/scripted label retained; existing hooks preserved |
| 3 | Benefits framed as four consequential review questions | Reduced abstract and repetitive pitch language |
| 4 | PM/founder situations and one-memo pilot scope | Consistent use cases and explicit agreed delivery/pricing |
| 5 | ChatGPT objection, availability FAQ, matching closing invitation | No exclusivity, guaranteed outcome, or false launch claims |
| 6 | Cohesive warm-paper colors, body type, controls and shadows | Desktop render inspected |
| 7 | Compact five-method hero and active-state hierarchy | All five methods preserved; source links remain separate |
| 8 | Document demo and evidence/feedback surfaces | Actual review interaction inspected in browser |
| 9 | Section, card, FAQ and pilot hierarchy | Consistent layout and conversion destination |
| 10 | Responsive, reduced-motion and forced-color treatment | 320px, 390px, 768px and desktop widths checked; no horizontal overflow |
| 11 | Keyboard method navigation and focus recovery | End selects final method; harness checks arrows/Home/End and focus |
| 12 | Feedback entrance and controlled automatic emphasis | Interaction harness covers manual pause, reduced motion and hidden tabs |
| 13 | Explicit recheck and undo correctness | Browser: review, stronger rewrite, undo remains open, explicit confirmation |
| 14 | Crawl scope: robots, canonical homepage sitemap, preview noindex | XML parses; preview excluded from sitemap and marked noindex |
| 15 | Search title/description and truthful structured data | JSON-LD parses; one canonical URL; no invented ratings or offers |
| 16 | Branded social sharing image and metadata | Original SVG rendered to exact 1200×630 PNG and inspected |
| 17 | Keyboard skip link and target | Accessible link and focusable main landmark; visible focus styling |
| 18 | Deferred script and lightweight local assets | No framework/runtime/remote font requests; core HTML+CSS+JS ~14KB gzip equivalent |

Integrated checks: JavaScript syntax, interaction harness, internal anchors, unique IDs, external-tab safety, JSON-LD, sitemap, asset existence, and whitespace validation pass. Browser verification covered desktop and mobile layout, explicit review/recheck, reset, method keyboard selection and pause. Reduced-motion/hidden-tab behavior was verified by the interaction harness and source inspection; this is not a full accessibility audit or a Lighthouse score. No live AI, account creation, payment, tracking, or upload is added to this public demo.

Publishing remains the existing GitHub Pages workflow. `social-card.svg` is the editable source for the sharing image. The sign-in placeholder stays reachable for existing links but is excluded from search indexing.

### Published release verification

The October 14 landing-page release was deployed successfully by the existing
GitHub Pages workflow. Fresh HTTPS requests for the homepage, robots.txt,
sitemap.xml, social-card.png, and sign-in.html all returned 200 with the expected
content types and matched the committed release byte-for-byte. The live browser
render shows the revised headline, all five methods, and the pilot invitation;
no browser console errors were reported during that verification.

The website milestone is complete. Revenue is not yet established: the public
funnel still ends in a pilot discussion, not a usable hosted paid account. The
next revenue gates remain live review acceptance, a verified production app
address with owner launch approval, payment-provider activation and fulfillment,
and an independent customer's completed payment. These are not implied by a
successful website deployment. No backend, writing-desk, account, or payment
changes were made during this landing-page release.

### Writing-desk preview follow-up

The landing-page example now uses the actual private Next.js writing desk as a
visual reference: notebook navigation, a manuscript, and a separate evidence and
review rail. It is an idealized static recreation, not an embedded authenticated
app. The profile, notebook rows and formatting indicators are fictional static
context; they are not account or editing controls. The existing scoped review,
rewrite, undo and explicit recheck controls remain functional.

The focus toggle changes only the preview's palette. Escape leaves focus and
returns keyboard focus to its button. It starts no audio, account, storage or AI
request. The source and review remain readable and interactive. Desktop and
390px mobile review checks pass; 320px and 768px have no horizontal overflow.
A mobile heading word-joining defect found during QA was corrected. Existing
interaction-harness and JavaScript syntax checks pass. Production app launch and
live AI availability are unchanged.
