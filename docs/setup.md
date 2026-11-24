# Local setup

## Prerequisites

- Node.js and pnpm versions listed in the root `package.json` (`devEngines`).
- [Vite+](https://viteplus.dev/guide/) and Docker with Compose.

Run commands from the repository root.

## Install and configure

```bash
vp install
cp -n packages/db/.env.example packages/db/.env
cp -n apps/api/.env.example apps/api/.env
cp -n apps/web/.env.example apps/web/.env
```

Set `BETTER_AUTH_SECRET` in `apps/api/.env` to a value generated with `openssl rand -base64 32`. Keep `DATABASE_URL` in `apps/api/.env` and `packages/db/.env` identical and consistent with the PostgreSQL settings in `packages/db/.env`. The example credentials are for local development only.

## Start

```bash
docker compose -f packages/db/compose.yaml up -d
vp run '@medcore/db#db:migrate'
vp run dev
```

Open the web app at http://localhost:5173. The API runs at http://localhost:8000.

Ports and the API proxy target can be changed in the app `.env` files. Process environment variables take precedence.

## Checks

```bash
vp run lint
vp run typecheck
vp run format:check
```
