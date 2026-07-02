# Post-V1 Enhancement Handoff

This handoff is for work after the first public launch of the Dr. Sadaf Ijaz MD website. V1 should stay focused on getting the correct site live at the correct domain. These items improve security, speed, search visibility, reliability, and long-term maintainability once the production domain is stable.

## Launch Baseline

- Confirm the production domain resolves over HTTPS.
- Confirm `https://sadafijazmd.com/` is the canonical public URL.
- Confirm whether `www.sadafijazmd.com` should redirect to the root domain or be used as the primary domain.
- Confirm all contact links, booking links, images, videos, favicon files, `robots.txt`, and `sitemap.xml` work on the production domain.
- Submit the production sitemap to Google Search Console after launch.

## Priority 1: Security Headers

Add a Cloudflare-compatible `_headers` file after the production domain is working. The goal is to reduce browser security risks without breaking the site.

Recommended first-pass headers:

```text
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```

Add a `Content-Security-Policy` only after testing because it can break inline scripts, videos, third-party booking links, analytics, or embedded content if too strict.

Done when:

- Headers are visible in browser DevTools or an online header checker.
- Pages still render correctly.
- Mobile navigation, video controls, and contact links still work.

## Priority 2: Domain Routing And Canonical Redirects

Choose one public URL and make every other version point to it.

Recommended primary URL:

```text
https://sadafijazmd.com/
```

Redirect these to the primary URL:

```text
http://sadafijazmd.com/
http://www.sadafijazmd.com/
https://www.sadafijazmd.com/
```

Done when:

- All domain variations end at one HTTPS URL.
- Canonical tags match the final URL.
- `sitemap.xml` uses the same final URL.

## Priority 3: Performance And Latency

The largest performance wins for this site will come from media optimization, not JavaScript changes.

Recommended work:

- Compress and resize large images to the actual display sizes needed.
- Keep WebP or AVIF versions for key images where quality allows.
- Audit the hero video size and duration.
- Consider a smaller mobile-specific hero video or poster-first mobile treatment.
- Add explicit `width` and `height` attributes to important images to reduce layout shift.
- Use lazy loading for below-the-fold images.

Done when:

- Lighthouse performance is stable on mobile.
- Largest Contentful Paint is improved.
- The hero area loads quickly on cellular connections.
- The page does not jump while images load.

## Priority 4: Browser Cache Policy

Use conservative cache rules first. The current assets are not fingerprinted, so aggressive one-year caching can make updates harder to see.

Recommended approach:

- Keep HTML pages on short or default cache behavior.
- Cache images, videos, CSS, and JS more strongly only after deciding an update strategy.
- If long-term caching is added, rename changed assets when replacing them.

Done when:

- Repeat visits feel faster.
- Content updates still appear predictably after deployment.
- There is a documented process for replacing cached images or videos.

## Priority 5: Analytics And Monitoring

Enable privacy-conscious analytics after launch so decisions are based on real usage.

Recommended setup:

- Enable Cloudflare Web Analytics.
- Track top pages, device mix, countries or regions, referrers, and load experience.
- Avoid tools that collect sensitive health information.
- Do not add forms or trackers that collect symptoms, diagnoses, medications, insurance details, or patient messages without privacy and compliance review.

Done when:

- Traffic is visible in analytics.
- No sensitive patient data is collected by the website.
- The privacy policy reflects any analytics or tracking that is active.

## Priority 6: SEO Follow-Up

After the production domain has been live for a few days, validate search visibility.

Recommended work:

- Add the site to Google Search Console.
- Submit `https://sadafijazmd.com/sitemap.xml`.
- Inspect the homepage and each indexable page.
- Confirm Open Graph previews for social sharing.
- Validate structured data.
- Review page titles and descriptions after seeing real search impressions.

Done when:

- Google can fetch the sitemap.
- No major indexing errors appear.
- Search snippets accurately describe the practice.

## Priority 7: Accessibility QA

Run a focused accessibility pass after launch, especially on mobile.

Recommended checks:

- Keyboard navigation.
- Visible focus states.
- Color contrast.
- Reduced-motion mode.
- Image alt text.
- Heading order.
- Link text clarity.
- Mobile menu behavior with screen readers.

Done when:

- Keyboard users can reach all important content and calls to action.
- Automated accessibility checks show no critical issues.
- Manual mobile navigation feels predictable.

## Priority 8: Privacy And Medical-Site Governance

Because this is a medical practice website, keep the public site intentionally low-risk.

Recommended rules:

- Avoid patient intake forms on the static site unless the full workflow is reviewed.
- Keep direct contact methods simple: phone, email, and approved booking platform links.
- Review privacy policy wording with the client or legal counsel.
- Keep license, credentials, services, state availability, and booking links current.

Done when:

- No sensitive health data is collected directly by the static site.
- The privacy policy matches the actual tools and workflows in use.
- Client-approved clinical and service language is documented.

## Priority 9: Reliability And Release Process

Make future updates easy to deploy and easy to undo.

Recommended work:

- Keep the Dr. Sadaf Ijaz site in its own repository.
- Use Cloudflare preview deployments before merging large updates.
- Add a simple `404.html`.
- Document the deployment settings in `README.md`.
- Tag important releases in Git, such as `v1.0.0`.
- Keep a short change log for public content updates.

Done when:

- The production site can be redeployed from GitHub.
- A bad deployment can be rolled back quickly.
- Future contributors understand where content, styles, scripts, and deployment settings live.

## Suggested Order

1. Fix domain routing and canonical redirects.
2. Add basic security headers.
3. Optimize large images and hero video.
4. Enable analytics and Search Console.
5. Run SEO, accessibility, and privacy follow-up checks.
6. Add reliability polish: `404.html`, release tags, and deployment notes.

