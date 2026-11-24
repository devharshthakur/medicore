# Local setup

For the self-hosted production-mode Docker stack, see [Docker setup](docker.md).

## Prerequisites

- Node.js and pnpm versions listed in the root `package.json` (`devEngines`).
- [Vite+](https://viteplus.dev/guide/) and Docker with Compose.

Run commands from the repository root.

## Install and configure

```bash
vp install
cp -n .env.example .env
```

All settings live in the root `.env`. Set `BETTER_AUTH_SECRET` to a value generated with `openssl rand -base64 32`. The example database credentials are for local development only. `DATABASE_URL` must match the `POSTGRES_*` values in the same file.

## Start

```bash
docker compose --env-file .env -f packages/db/compose.yaml up -d
vp run db:migrate
vp run dev
```

Open the web app at http://localhost:5173. The API runs at http://localhost:8000.

Change ports and the API proxy target (`NUXT_API_ORIGIN`) in the root `.env`. Process environment variables take precedence.

## Checks

```bash
vp run lint
vp run typecheck
vp run format:check
```
