# GentleScreen contributor guide

## Product guardrails

- GentleScreen is a parent-reviewed, low-stimulation video platform for intentional screen time.
- Children never authenticate independently. Parent settings and child-mode exit require a parent PIN.
- The child catalog contains only manually approved, embeddable YouTube videos.
- Use the official YouTube embedded player. Never download, proxy, transform, recolor, desaturate, cover, frame, or obscure any portion of the player.
- Put timers, navigation, and controls outside the player boundary.
- Do not add unrestricted search, autoplay chains, infinite scrolling, comments, ads, social features, or child-facing external navigation.
- GentleScreen ratings must be explicitly named and never represented as YouTube ratings or medical advice.

## Engineering rules

- Work in small vertical slices and update tests and documentation with each slice.
- Keep the backend a Spring Boot modular monolith using Java 21, constructor injection, immutable DTOs where practical, and feature-oriented packages.
- Never expose JPA entities from controllers or accept a client-supplied parent identity as authorization.
- Use PostgreSQL constraints and a new Flyway migration for every schema change. Never edit an applied migration.
- Keep TypeScript strict and avoid `any`. Store tokens only in Expo SecureStore.
- Never commit credentials, API keys, tokens, passwords, PINs, or production data.
- Run backend tests and the mobile typecheck, lint, and tests before considering a phase complete.

