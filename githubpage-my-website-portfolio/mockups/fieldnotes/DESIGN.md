# Fieldnotes integration mockups

Two review-only directions. The existing homepage is unchanged. Portfolio previews are snapshots of the current homepage with one inserted card; they must not become a second maintained homepage.

## Recommendation
A: Board first. It exposes the product immediately and makes changes easy to compare. B: Focus first provides a gentler guided entry, at the cost of hiding the overview lower in the page. Both preserve the site's green tokens, system font, radii, and editorial hierarchy. Existing production case study stays first; Fieldnotes follows it. Each card links to a dedicated page and source.

## Apple design approach
Purposeful hierarchy, instant press feedback, clear return navigation, explicit stage controls, and a single primary action in the focused direction. No ornamental glass or forced spring animation: these mockups use selects rather than gesture-driven elements. Reduced motion removes scaling; high contrast strengthens boundaries. Mobile stacks lanes instead of shrinking a desktop board. The native selects preserve keyboard and touch behavior.

## Modules and maintenance
- model.mjs: pure state transitions, stages, progress, and sample fixture.
- demo.js: DOM rendering and event delegation; both directions share the model.
- fieldnotes.css: scoped demo styles layered on existing site tokens.
- demo-a.html / demo-b.html: alternative page shells, not two production destinations.
- portfolio-a.html / portfolio-b.html: review snapshots only.

For production choose one direction, insert one card into the real homepage, and retain one demo shell. Use an explicit storage adapter if browser persistence is later wanted; this prototype resets on reload. Local discovery and Git context are not simulated as working features. Rendering uses fixed sample strings; accept user-entered text only through textContent/DOM construction in a future editor.

## Validation
Run `node --test mockups/fieldnotes/model.test.mjs`. Test task moves, invalid transitions, immutability, completion progress, and reset isolation. Browser review: both directions at desktop and 390px; follow card to demo and back; complete tasks and reset; keyboard-only operation and visible focus; live status; dark appearance; reduced motion; 200% zoom; no horizontal scrolling; no failed asset requests. Automated model tests do not establish accessibility conformance or replace browser review.

## Deliberate prototype scope
Working stage changes, completion percentages, focus workflow, reset, and appearance toggle. No server, account, drag physics, local folder access, persistent edits, or analytics added to the demo. Portfolio snapshots retain the existing site's own behavior. Screenshots and browser validation are recorded separately when performed.
