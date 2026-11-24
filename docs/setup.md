# Local setup

Run the web app and API with hot reload. PostgreSQL runs in Docker.

For the production-mode stack, see the [Docker guide](docker.md).

## Table of contents

- [Prerequisites](#prerequisites)
- [Install](#install)
- [Configure](#configure)
- [Start](#start)
- [Checks](#checks)

## Prerequisites

| Requirement                          | Version or notes                                                 |
| ------------------------------------ | ---------------------------------------------------------------- |
| Node.js                              | `26.13.1`, see `devEngines` in [`package.json`](../package.json) |
| pnpm                                 | `12.22.0`, see `devEngines` in [`package.json`](../package.json) |
| [Vite+](https://viteplus.dev/guide/) | Provides the `vp` command                                        |
| Docker with Compose                  | Runs the local PostgreSQL database                               |

All commands run from the repository root.

## Install

```sh
vp install
cp -n .env.example .env
```

## Configure

All settings live in the root `.env`.

Set these values before you start:

| Variable             | Generate with                                                   |
| -------------------- | --------------------------------------------------------------- |
| `BETTER_AUTH_SECRET` | `openssl rand -base64 32`                                       |
| `POSTGRES_PASSWORD`  | `openssl rand -hex 32`, then copy the value into `DATABASE_URL` |

> [!NOTE]
> The values in `.env.example` are for local development only. `DATABASE_URL` must match `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, and `POSTGRES_PORT`.

Optional ports and proxy target:

| Variable          | Default                 | Purpose                              |
| ----------------- | ----------------------- | ------------------------------------ |
| `WEB_DEV_PORT`    | `5173`                  | Web dev server                       |
| `API_PORT`        | `8000`                  | API server                           |
| `NUXT_API_ORIGIN` | `http://localhost:8000` | Where the web server forwards `/api` |

Process environment variables override values in `.env`.

## Start

Start PostgreSQL, apply migrations, then start both apps:

```sh
docker compose up -d db
vp run db:migrate
vp run dev
```

| Service | URL                   |
| ------- | --------------------- |
| Web     | http://localhost:5173 |
| API     | http://localhost:8000 |

## Checks

```sh
vp run lint
vp run typecheck
vp run typecheck:scripts
vp run db:check
vp run format:check
```
