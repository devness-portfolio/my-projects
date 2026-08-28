# GentleScreen implementation plan

Each phase is a reviewable vertical slice. A phase is complete only after its tests, validation, and documentation are updated.

## Phase 1 — Foundation (this baseline)

- Monorepo structure, contributor guardrails, and architecture documentation
- Java 21 / Spring Boot API with Flyway, PostgreSQL, safe health endpoint, and test profile
- Expo Router / strict TypeScript mobile shell with calm parent and child entry points
- Docker Compose, backend image, environment template, Render blueprint, EAS configuration, and CI

## Phase 2 — Parent authentication

- Parent registration and login
- Short-lived access JWTs and rotating, opaque, hashed refresh tokens
- Logout, logout-all, password-reset-ready and email-verification-ready boundaries
- Hashed parent PIN with throttled verification and ownership authorization

## Phase 3 — Profiles and curated catalog

- Parent-owned child profiles and PIN-protected settings
- Categories, videos, age bands, pagination, and catalog filters
- Admin submission, YouTube metadata service, reviewer assessment, and moderator approval
- Catalog invariant: `embeddable = true` and `catalog_status = APPROVED`

## Phase 4 — Playback and timed sessions

- Official YouTube embedded player with no overlay, filter, frame, or touch interception
- Timer and controls outside the player boundary
- Playback event recording, time-limit enforcement, and calm session-ended flow

## Phase 5 — Saved content and ratings

- Favorites, playlists and ordering, recently watched, watch history
- Parent ratings and separately labeled GentleScreen rating summaries
- Configurable derived stimulation-level calculation

## Phase 6 — Moderation and reports

- Reviewer queue, assessments, moderation state transitions, conflict handling
- Parent reports, resolution workflow, video disablement, and audit records

## Phase 7 — Production readiness

- Rate limiting, structured request logs, data export/deletion, retention controls
- Accessibility, privacy, legal, threat-model, and dependency reviews
- Render/Neon production verification and EAS release setup

