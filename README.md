# 🪔 diyalamp website

A decision-memo review workspace for product managers preparing roadmap, launch, or investment recommendations for leadership. The public promise is “Defensive Writing for product decisions,” with the concrete benefit to investigate: finding weak claims before leadership review.

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
