# diyalamp website direction

The brand is always **diyalamp**, lowercase, with the Apple 🪔 emoji as its mark.

## Position

One task. Many agents. No crossed wires.

A user-owned browser workspace where agents coordinate visibly on a shared task.
The problem is specific: browser contention, agents waiting for tabs, stale
approvals, unclear ownership, lost context and human effort relaying updates.
An agent has a responsibility and acquires tabs as needed. It is not a permanent
expensive autonomous loop assigned to a single tab.

## Architecture direction, not shipped functionality

TypeScript for the console, coordinator and browser workers. Browser execution
can use Playwright / Stagehand as appropriate. Replaceable model and hosting
adapters are intended; universal compatibility is not claimed.

The open-source scope is local execution, messaging, task state, ownership,
pause/resume and recovery. Hosted managed browsers, team supervision and scheduled
operations are a future commercial hypothesis. No hosted service, public sign-in
or price is available. Earlier Java code in the public repository is explicitly
identified as earlier work, not the new TypeScript implementation.

## Interface and motion

Simple white Notion-inspired surfaces, Inter in weights 500 and 600, aligned
content widths, restrained green/neutral accents and clear ownership indicators.
The hero has one dominant headline. The interactive workspace has a hierarchy of
shared task, agent responsibilities, owned browser tabs and coordination record.
Motion highlights state changes, never replaces status text. Background motion
has a pause control and respects the operating system's reduced-motion preference.

## Illustration

Three independent moments from a fictional Shopify / Printify / domain workflow:
shared currency, product handoff and a human sign-in request. Each is interactive
but changes only local illustration state. No provider integration, actual account,
credential entry, customer information or live agent is used.

Keep the page to three main sections. No fabricated social proof or promises of
exactly-once browser actions. Vendor architecture belongs in the FAQ, not the pitch.
