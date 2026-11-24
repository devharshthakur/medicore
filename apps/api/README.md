# @medcore/api

Nitro v3 API server for MedCore HMS, built on H3 v2.

## Scripts

Run from the repository root with `vp run '@medcore/api#<script>'`.

| Script      | Description                                       |
| ----------- | ------------------------------------------------- |
| `dev`       | Start the dev server on `http://localhost:8000`   |
| `build`     | Bundle the server into `.output/`                 |
| `preview`   | Build and run the server locally                  |
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

Routes live in `server/api/`. File paths map to URLs, for example `server/api/users/[id].get.ts` serves `GET /api/users/:id`.

Test a route against the sources, without a build:

```bash
npx nitro fetch /api/hello
```

## Configuration

Set `API_PORT` (default `8000`) and the other variables in the root `.env`. See the [setup guide](../../docs/setup.md).
