# @medcore/api

Nitro v3 API server for MedCore HMS, built on H3 v2. Authentication uses Better Auth; database access uses the shared `@medcore/db` client.

## Scripts

Run from the repository root with `vp run '@medcore/api#<script>'`.

| Script      | Description                                       |
| ----------- | ------------------------------------------------- |
| `dev`       | Dev server on `http://localhost:8000`             |
| `build`     | Bundle the server into `.output/`                 |
| `preview`   | Build, then run the server locally                |
| `start`     | Run the built server (`.output/server/index.mjs`) |
| `lint`      | Lint with ESLint (`lint:fix` to apply fixes)      |
| `typecheck` | Type-check with `tsc`                             |
| `format`    | Format with Prettier (`format:check` to verify)   |

## Routes

| Route                | Description           |
| -------------------- | --------------------- |
| `GET /api/hello`     | Sample route          |
| `GET /api/db/health` | Database health check |
| `/api/auth/**`       | Better Auth handler   |

Routes live in `server/api/`. A file path maps to a URL: `server/api/users/[id].get.ts` serves `GET /api/users/:id`.

Send a request to the sources without a build:

```sh
npx nitro fetch /api/hello
```

Imports are explicit: `defineHandler` and `HTTPError` come from `nitro`, and H3 helpers such as `getQuery` come from `nitro/h3`.

## Configuration

Set these in the root `.env`. See the [setup guide](../../docs/setup.md).

| Variable             | Purpose                       |
| -------------------- | ----------------------------- |
| `API_PORT`           | Server port. Default `8000`.  |
| `BETTER_AUTH_URL`    | Public origin of the web app. |
| `BETTER_AUTH_SECRET` | Better Auth signing secret.   |
| `DATABASE_URL`       | PostgreSQL connection string. |

## Project structure

```text
apps/api/
├── public/
│   └── index.html
├── scripts/
│   └── run.ts
├── server/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...all].ts
│   │   ├── db/
│   │   │   └── health.ts
│   │   └── hello.ts
│   └── utils/
│       └── auth.ts
├── AGENTS.md
├── eslint.config.mjs
├── nitro.config.ts
├── package.json
├── prettier.config.js
├── README.md
└── tsconfig.json
```
