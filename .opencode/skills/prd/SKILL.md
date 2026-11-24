---
name: prd
description: Use when a task needs MedCore product requirements — what features to build, roles, business rules, entities, workflows, API shape, or acceptance. Load before planning or implementing any feature or module.
---

# MedCore PRD

The product requirements live in `references/` next to this file, split by topic.

1. Read `references/README.md` first. It has the product summary, cross-cutting rules, and a topic-to-file index.
2. Read only the files that match the task, for example `references/modules/billing.md` for invoices. Do not load the whole folder.
3. Treat the PRD as **what** to build. The repo decides **how**: root `AGENTS.md`, package manifests, and current library docs. The PRD's original stack (Next.js, NestJS, Prisma, Passport) is superseded by the project's own stack.
4. Never read `prd/source/`. It holds the original assignment brief for humans.
5. Ask the user when a requirement is ambiguous, incomplete, or conflicts with the repo. Do not guess or silently pick one.
6. Do not edit `references/` as incidental work. Report needed PRD changes instead.
