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

All settings live in the root `.env`. Set `BETTER_AUTH_SECRET` to a value generated with `openssl rand -base64 32`. Set `POSTGRES_PASSWORD` to a value generated with `openssl rand -hex 32` and copy it into `DATABASE_URL`: the Docker stack rejects passwords under 16 characters, and the local database uses the same value. The example credentials are for local development only, and `DATABASE_URL` must match the `POSTGRES_*` values in the same file.

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
vp run typecheck:scripts
vp run db:check
vp run format:check
```
