# MedCore HMS

MedCore HMS is a pnpm workspace orchestrated with Turborepo. The root is the only place to install dependencies and run shared tasks.

## Layout

- `apps/web/` — Nuxt 4 web app. It keeps Nuxt UI, Tailwind CSS, Nuxt Icon, Nuxt Fonts, Nuxt Image, and TanStack Vue Query.
- `apps/api/` — standalone Nitro 3 API server. `server/api/hello.ts` is the scaffold sample.
- `apps/shared/` — private TypeScript package for code shared by the apps. It has an empty `src/index.ts` entry point and local tooling, with no runtime dependency from the apps yet.
- `packages/db/` — private `@medcore/db` package with the Drizzle ORM PostgreSQL schema, relations, client, migrations, and a `compose.yaml` for local PostgreSQL.
- Root files — workspace policy, Turbo tasks, lint/format configuration, and Vite+ hook configuration.

## Product requirements

The product requirements (what to build) live in the `prd` skill (`.opencode/skills/prd/references/`). Load the `prd` skill, then read only the files for the task. The PRD does not set the stack; this file and the package manifests do. Do not read `prd/source/`.

## Commands

Install once from the root with `vp install`; the workspace has one pnpm lockfile. Prefer `vp` commands and fall back to `pnpm` when `vp` is insufficient.

Root scripts run through Turbo:

- `vp run dev` — both apps; web on `http://localhost:5173`, API on `http://localhost:8000`
- `vp run build`
- `vp run preview` — builds first; web on `http://localhost:4173`, API on `http://localhost:8000`
- `vp run lint` / `vp run lint:fix`
- `vp run typecheck`
- `vp run format` / `vp run format:check`

Run a package command with `vp run '@medcore/web#<script>'`, `vp run '@medcore/api#<script>'`, or `vp run '@medcore/shared#<script>'`.

Drizzle lifecycle commands live in `@medcore/db`: `vp run '@medcore/db#db:generate'`, `db:migrate`, `db:push`, `db:pull`, `db:studio`, `db:check`, and `db:up` (use the same package-qualified form for each). Local PostgreSQL is defined in `packages/db/compose.yaml`; create `packages/db/.env` from its example if missing, and set the same `DATABASE_URL` in `apps/api/.env` for the API.

Ports come from each app's ignored `.env`; copy the tracked `.env.example` to change defaults. `WEB_DEV_PORT` (5173) and `WEB_PREVIEW_PORT` (4173) cover web dev and preview; `API_PORT` (8000) covers API dev, preview, and the built-server `start` command. Process environment variables override file values.

## Tooling

- ESLint is installed at the root. Each package with lint rules has its own `eslint.config.mjs`.
- Prettier is installed at the root. Each package has its own `prettier.config.js` and `.prettierignore` extending the root defaults; the root pair formats root files.
- `.vite-hooks/pre-commit` runs `vp staged`. Staged checks in `vite.config.ts` route each package's files through its local Prettier config and ignore file; keep this hook configuration at the root.
- The `dev`, `preview`, and `start` package commands run the TypeScript launchers in `apps/*/scripts/run.ts` with `tsx`, because they forward signals and long-running server ports. This is the only `tsx` exception to the `vpx` guidance below; use `vpx` for other scripts.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

This project does not use Vite+'s bundled Oxlint or Oxfmt. Linting and formatting are handled by ESLint and Prettier: use `vp run lint`, `vp run lint:fix`, `vp run format`, and `vp run format:check`. The `check` block in `vite.config.ts` disables the format and lint steps of `vp check`. Pre-commit hooks run `vp staged`, which applies ESLint and Prettier to staged files.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Running Scripts

Run TypeScript and JavaScript files with `vpx <file>`, for example `vpx ./scripts/seed.ts --dry-run`. It handles enums, decorators, JSX, and tsconfig `paths`, so do not add `tsx` or `ts-node` to run scripts. `vpx --watch <file>` reruns the file when a file it uses changes, in place of `tsx watch`. `vp node <file>` runs plain Node.js.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp run lint` and `vp run format:check` to lint and format-check changes.
- [ ] Run `vp test` to test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
