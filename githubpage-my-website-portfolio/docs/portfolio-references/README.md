# Portfolio reference library

Design references, handoff notes, performance baselines, and historical screenshots copied from `/Users/devness/Documents/Portfolio` on October 20, 2026. Originals remain in place.

## Find a reference

| Need | Location |
| --- | --- |
| Portfolio polish handoff | [Handoff notes](references/Portfolio-Polish-Handoff.rtf) |
| Theme control prototype | [Open HTML prototype](references/mockups/theme-controls.html) |
| Verified header mockup | [Header image](references/mockups/redesign-header-verified.jpg) |
| Apple design patient preview | [Preview image](references/mockups/apple-design-patient-preview.jpg) |
| Desktop performance baseline | [Lighthouse HTML](references/lighthouse/2026-10-19/devness-2026-10-19-desktop.html) · [JSON](references/lighthouse/2026-10-19/devness-2026-10-19-desktop.json) |
| Mobile performance baseline | [Lighthouse HTML](references/lighthouse/2026-10-19/devness-2026-10-19-mobile.html) · [JSON](references/lighthouse/2026-10-19/devness-2026-10-19-mobile.json) |
| Earlier v2 design screenshots | [v2 history](archive/2026-10-20/design-history/v2-devness/) |
| Earlier v3 design screenshots | [v3 history](archive/2026-10-20/design-history/v3-devness/) |
| Older Lighthouse screenshots | [Screenshot archive](archive/2026-10-20/lighthouse-screenshots/) |

## Organization and provenance

`references/` holds the curated collection. `archive/2026-10-20/` preserves historical screenshots with their original names and version groupings. The archive is included here so it can be versioned with this repository.

[The manifest](archive/2026-10-20/manifest.json) lists original paths, current paths, and SHA-256 checksums for all 25 original reference files. Its `current_path` values are relative to this library folder. Every copied file was checked against the source by SHA-256. `.DS_Store` metadata was excluded.

For future additions, put current mockups in `references/mockups/`, dated Lighthouse reports in `references/lighthouse/YYYY-MM-DD/`, and superseded material in a dated archive directory. Update this index when adding a new category.
