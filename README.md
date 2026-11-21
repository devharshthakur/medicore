# MedCore HMS

MedCore HMS is a pnpm workspace orchestrated with Turborepo. Run installs and shared tasks from the repository root.

## Workspace

- `apps/web` — Nuxt 4 web app. It keeps the existing Nuxt UI, Tailwind CSS, Nuxt Icon, Nuxt Fonts, Nuxt Image, and TanStack Vue Query setup.
- `apps/api` — standalone Nitro 3 API server. The scaffold includes the sample `GET /api/hello` endpoint.
- `apps/shared` — private TypeScript package for code shared by the apps. It has an empty `src/index.ts` entry point and local tooling, with no runtime dependency from the apps yet.

## Setup

Use the Node.js and pnpm versions declared in the root `devEngines` block, then install once from the root:

```bash
pnpm install
```

The workspace has one `pnpm-lock.yaml`.

## Commands

Root scripts run through Turbo:

| Command                             | Purpose                                                                                   |
| ----------------------------------- | ----------------------------------------------------------------------------------------- |
| `pnpm dev`                          | Run both apps: web on `http://localhost:5173`, API on `http://localhost:8000`             |
| `pnpm build`                        | Build both apps                                                                           |
| `pnpm preview`                      | Build first, then preview: web on `http://localhost:4173`, API on `http://localhost:8000` |
| `pnpm lint` / `pnpm lint:fix`       | Lint all packages                                                                         |
| `pnpm typecheck`                    | Type-check all packages                                                                   |
| `pnpm format` / `pnpm format:check` | Write or check formatting for all workspace packages and root files                       |

Run a package command directly with its workspace name:

```bash
pnpm --filter @medcore/web typecheck
pnpm --filter @medcore/api dev
pnpm --filter @medcore/api start
pnpm --filter @medcore/shared lint
```

## Environment

Each app reads its local `.env` file, which Git ignores; copy the tracked `.env.example` when you need different values.

- `apps/web/.env` — `WEB_DEV_PORT` (default `5173`) for `dev` and `WEB_PREVIEW_PORT` (default `4173`) for `preview`.
- `apps/api/.env` — `API_PORT` (default `8000`) for `dev`, `preview`, and `start`.

Process environment variables override values from the files. The API `start` command runs the built server from `apps/api/.output/server/index.mjs`; run `pnpm --filter @medcore/api build` first.

## Tooling

- ESLint and Prettier are installed at the root. Each package has its own `eslint.config.mjs`, `prettier.config.js`, and `.prettierignore`; the package Prettier configs extend the root defaults, and the root pair formats root files.
- `.vite-hooks/pre-commit` runs `vp staged`. Staged checks are configured in the root `vite.config.ts` and route each package's files through its local Prettier config and ignore file.
- Keep Vite+, `vp staged`, and the root workspace files at the repository root.
