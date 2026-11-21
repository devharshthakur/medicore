---
name: Project Defaults
description: Apply MedCore project defaults for UI work, documentation, package commands, and documentation updates.
---

# Project defaults

Apply these defaults to project work unless a higher-priority instruction or an explicit user request says otherwise. They do not grant permission for edits, installs, delegation, or other operations.

## UI

- Use Nuxt UI components for interface controls and other UI elements whenever available. Do not introduce another UI component library by default.
- Semantic HTML, Vue components, and Tailwind are permitted for layout, composition, and needs Nuxt UI does not cover. Preserve accessibility.
- For design examples, load the `sitemaps` skill and select the relevant official Nuxt UI template reference. Treat examples as inspiration, not project requirements, and check licensing before copying.

## Documentation and commands

- Before fetching documentation, load `library-docs` and follow its source-routing protocol where applicable. Respect any higher-priority source restrictions.
- Prefer `vp` for package management and tooling. Use `vp run <script>` for project scripts rather than similarly named built-in commands. Use `pnpm` when `vp` is insufficient, including project-specific exceptions.
- Do not edit project documentation as incidental work. Documentation changes are allowed for `/update:docs` or an explicit documentation-only request, subject to the normal approval and permission gates. Report documentation that needs a separate update.
