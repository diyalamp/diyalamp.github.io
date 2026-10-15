# 🪔 Diya Lamp website

## Current position

**Give an agent a browser. Keep control.**

An open-source browser-agent project in Java. The intended loop is observe,
propose, act and verify, with an explicit action policy and an inspectable run
record. Browser only: no desktop control or shell execution.

Cloud-agnostic and model-agnostic describe the architecture: separate runtime,
browser and model interfaces. They do not mean every provider is integrated.
Concrete adapters and an end-to-end browser runtime are in development.

The public Java repository already contains experimental transactional task
coordination primitives. The site distinguishes those from the browser-agent
prototype and the planned paid managed cloud with a supervision console. No
hosted service, working provider integration, pricing or sign-up is advertised.

Database architecture appears once in the FAQ. The project is sold on the
browser experience, not a vendor logo. See the current brand specification.

## Public illustration

Observe, Propose, Act and Verify illustrate one fictional public-page task.
Visitors inspect each record or play an example action. All state is local to
the page: no browser tool, remote website, model or database is contacted.
The example price is fictional. Keyboard arrows and Home/End select stages.
Reduced motion disables animation. The contact invitation opens an email draft;
nothing is sent automatically.

## Build and publish

GitHub Pages deploys `dist` on a push to `main`. Edit `dist/style.css`, then run
`python3 scripts/inline-styles.py`; deployment verifies generated inline CSS.
Check JavaScript syntax and inspect desktop/mobile layout and interactions.
Keep secrets and private customer data outside this repository.

Historical audit records and old product debriefs describe earlier releases.
They do not establish scores or product behavior for the current browser-agent
page. See [the current brand specification](docs/DIYA_LAMP_BRAND_SPEC.md).

The browser-agent page scores 100 in performance, accessibility, best practices
and SEO in fresh standard local mobile and desktop Lighthouse 13.5.0 runs.
See [the current audit](quality/browser-agent-audit.json) for measured scope and
metrics. These lab results do not guarantee every device or network.
