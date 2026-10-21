# Performance verification — October 20, 2026

Lighthouse 13.5.0, Chrome 156, default simulated mobile throttling and desktop preset. Each scan uses a fresh browser profile.

| Target | Before (live devness.dev) | After (local compressed preview) | After FCP | After LCP | After CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Mobile portfolio | 98 | 100 | 1.3 s | 1.4 s | 0 |
| Desktop seasonal intro | 77 | 100 | 0.5 s | 0.8 s | 0 |

The final reports target localhost:8013 with gzip for HTML, CSS, JavaScript and SVG, matching GitHub Pages text compression. Local latency differs from the public host. These are local lab scores, not a verified post-deployment PageSpeed Insights result; scores can vary with network and host conditions. HTML and JSON reports retain all measured values and settings.

Changes:

- Convert both full-screen intro scenes to 1600px WebP and the small pumpkin sprite to 112px WebP: 5.8 MB of source PNGs becomes about 425 KB of published artwork. Original PNGs remain available as source assets.
- Choose the intro season or bypass in the document head. Mobile and returning visits request no intro artwork; seasonal visits request only the selected scene.
- Apply mobile navigation layout and seasonal panel dimensions before first paint, eliminating measured layout shifts.
- Preload the theme and intro modules to shorten their dependency chain.

All 20 existing Node tests pass. Browser checks cover mobile and returning bypass, both seasonal backgrounds, and skipping the intro.
