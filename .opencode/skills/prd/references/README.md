# MedCore HMS — Product Requirements

MedCore HMS is a multi-tenant hospital management platform. It digitises clinical and administrative workflows across hospital branches: registration, appointments, medical records, prescriptions, lab, pharmacy, billing, and notifications. Target tenants range from 30-bed clinics to 800-bed multi-speciality centres, all served from one SaaS deployment. The product is HIPAA-aware.

## How to use these files

- This folder says **what** to build: features, roles, business rules, entities, API shape, security, and tests.
- It does **not** decide **how**. The tech stack is defined by the repo (root `AGENTS.md`, `package.json` files, and library docs).
- Read this README, then only the files that match the task. Do not load the whole folder.
- Do not read `prd/source/` at the repo root. It holds the original assignment brief (docx, pdf, txt, md) for humans only.
- If a requirement is ambiguous or conflicts with the repo, ask the user. Do not guess.

## Stack note (supersedes the original PRD)

The original PRD mandated Next.js, NestJS, Prisma, Passport.js, shadcn, Zustand, BullMQ, and a Jest toolchain. The project mentor allowed a different stack. The project uses Nuxt 4, Nitro 3, Drizzle ORM, Better Auth, Nuxt UI, and TanStack Vue Query. Treat any tool name in these files as an example of intent, not an instruction. Where a file says "JWT" or "refresh token", the behaviour is required but the mechanism is the project's choice.

## Cross-cutting rules

- **Multi-tenancy:** every hospital-specific table carries `hospitalId`. Every request is checked so one tenant can never read another's data, even with a guessed ID. Super Admin works across tenants. All other roles are scoped to one hospital at authentication.
- **Soft delete:** Patient, Doctor, and Appointment use a `deletedAt` timestamp.
- **Medical records are never permanently deleted.** EMR entries are append-only.
- **Audit log:** every create, update, and delete records userId, IP, and timestamp.
- **Roles:** 9 roles, enforced on every endpoint. See `roles.md`.
- **Response envelope:** one success, error, and paginated shape. See `api.md`.

## Index

| Topic                                         | File                       |
| --------------------------------------------- | -------------------------- |
| In-scope and out-of-scope features            | `scope.md`                 |
| Architecture, multi-tenancy, caching          | `architecture.md`          |
| Entities, relationships, design questions     | `data-model.md`            |
| The 9 roles                                   | `roles.md`                 |
| Auth, registration, OTP, sessions             | `modules/auth.md`          |
| Scheduling, availability, booking concurrency | `modules/appointments.md`  |
| Medical records                               | `modules/emr.md`           |
| Prescriptions and PDF                         | `modules/prescriptions.md` |
| Lab orders and results                        | `modules/lab.md`           |
| Medicine inventory and dispensing             | `modules/pharmacy.md`      |
| Invoices and payments                         | `modules/billing.md`       |
| Notification triggers and channels            | `modules/notifications.md` |
| REST conventions and endpoint summary         | `api.md`                   |
| Dashboards and UI requirements                | `frontend.md`              |
| Security checklist                            | `security.md`              |
| Test strategy and mandatory scenarios         | `testing.md`               |
| Environments and CI/CD                        | `deployment.md`            |

## Build priority

Build the core journey end to end first: Auth, Appointments, EMR, Billing. Layer on other modules after. Depth over breadth.
