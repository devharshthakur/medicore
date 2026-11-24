# Testing requirements

## Pyramid

| Test type   | Scope                                                                           |
| ----------- | ------------------------------------------------------------------------------- |
| Unit        | Pure functions, service methods, schemas, utilities — target 80%+ coverage      |
| Integration | API endpoints against a real test database, all happy and error paths           |
| Component   | UI components in isolation: form validation, conditional rendering              |
| E2E         | Critical journeys: registration, book appointment, pay invoice, download report |

Tooling follows the repo (Vitest via `vp test`), not the original Jest list.

## Mandatory scenarios

- A doctor cannot access another hospital's patient records (tenancy isolation).
- A patient cannot view another patient's medical records.
- Booking two appointments in the same slot at the same time: only one succeeds.
- A refresh token cannot be reused after rotation.
- An expired medicine cannot be dispensed; pharmacy raises a validation error.
- An invoice total matches the sum of its line items.
- A simulated payment webhook is verified by signature.

Run tenancy isolation tests in CI. A failure is a critical incident and blocks merging.
