# Architecture

Layered architecture: presentation, business logic, data access. The backend exposes a REST API consumed by the web frontend and, later, mobile clients.

## Components

```text
Browser / PWA  ←→  Web frontend
                      ↕  HTTPS / REST + WebSocket
Reverse proxy  ←→  API server
                      ↕  ORM
PostgreSQL   Cache (Redis)   Object storage (S3 / Cloudinary)
Real-time server  ←→  Event bus
```

## Multi-tenancy

Each hospital is a tenant, with row-level tenancy. All hospital-specific tables carry a `hospitalId` foreign key. Middleware validates it on every request, so no tenant can access another tenant's data, even by guessing a record ID.

Super Admins operate across tenants. All other roles are scoped to a single hospital at authentication time.

## Caching

A cache (Redis in the original brief) serves three purposes:

1. Session storage for refresh tokens and device tracking.
2. Short-lived caches for expensive read queries: doctor availability slots and medicine inventory counts.
3. Rate-limiting counters for public endpoints.

Cache only data that is read far more often than written. Doctor availability changes often, so use a TTL around 60 seconds.

## Other capabilities needed

- Background jobs: email, SMS, PDF generation, reports, reminders, nightly expiry scan
- File uploads with image optimisation
- Real-time events for in-app notifications
- Error tracking and performance monitoring from the start
