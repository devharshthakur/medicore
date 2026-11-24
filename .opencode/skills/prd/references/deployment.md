# Deployment

Product-level expectations. Concrete tooling follows the repo.

## Environments

- Development: containerised PostgreSQL and Redis (and optionally the apps and a reverse proxy) so dev and prod match.
- Production: containerised services behind a reverse proxy with SSL termination; managed PostgreSQL; object storage; frontend on an edge host.
- Never commit `.env`. Provide `.env.example` with placeholders and document every variable.

## CI/CD

- On every pull request: lint, type-check, unit tests.
- On merge to main: build images, run integration tests against a staging database.
- On release tag: deploy to production with a health-check gate (blue-green).
- Protect main: CI must pass, no direct pushes.

## Demo data

Seed realistic but invented data: at least 2 hospitals, 8 doctors across specialisations, 30 patients, and 2 weeks of appointment history.
