---
name: Project Defaults
description: Apply MedCore project defaults per task type: required Vue, Nuxt, and Nuxt UI skills, latest library documentation, package commands, and documentation updates.
---

# Project defaults

Apply these defaults to project work unless a higher-priority instruction or an explicit user request says otherwise. They do not grant permission for edits, installs, delegation, or other operations.

## Documentation first

Before any task that writes code or uses a third-party library, fetch current documentation first by following the `library-docs` skill. Load that skill before fetching any docs; it selects the source and route. Treat the selected documentation as the source of information, not memory, and check the installed version when relevant.

## Task types

### Product and project information

- When a task needs information about the product or project being built, such as features, requirements, roles, business rules, entities, or workflows, load the `prd` skill before planning or writing code. Read only the reference files it points to for the task.
- The PRD says what to build. It does not set the stack; the repo's `AGENTS.md` and package manifests do.

### Vue and Nuxt code

- Before writing or changing any Vue code, load the `vue-best-practices` skill.
- This is a Nuxt project, so also load the `nuxt` skill before writing or changing Nuxt code.
- Follow the loaded skills and use their recommended patterns. Write idiomatic Composition API with `<script setup>` and TypeScript.
- Fetch current documentation first as required above before relying on an API or behavior.

### UI

- Use Nuxt UI components for interface controls and other UI elements whenever available. Load the `nuxt-ui` skill and fetch current docs first as required above. Do not introduce another UI component library by default.
- Semantic HTML, Vue components, and Tailwind are permitted for layout, composition, and needs Nuxt UI does not cover. Preserve accessibility.
- For design examples, read `references/nuxt-ui-templates/index.md` and select the relevant official Nuxt UI template reference. Treat examples as inspiration, not project requirements, and check licensing before copying.

### Libraries

- Before using or adding a third-party library, fetch current documentation first as required above.
- Do not rely on remembered APIs or unreviewed snippets.

### Documentation and commands

- Prefer `vp` for package management and tooling. Use `vp run <script>` for project scripts rather than similarly named built-in commands. Use `pnpm` when `vp` is insufficient, including project-specific exceptions.
- Do not edit project documentation as incidental work. Documentation changes are allowed for `/update:docs` or an explicit documentation-only request, subject to the normal approval and permission gates. Report documentation that needs a separate update.
