# @medcore/web

Nuxt 4 client app for MedCore HMS, built with Nuxt UI, Tailwind CSS, and TanStack Vue Query.

## Scripts

Run from the repository root with `vp run '@medcore/web#<script>'`.

| Script      | Description                                     |
| ----------- | ----------------------------------------------- |
| `dev`       | Dev server on `http://localhost:5173`           |
| `build`     | Build the app for production                    |
| `generate`  | Generate a static site                          |
| `preview`   | Build, then serve on `http://localhost:4173`    |
| `clean`     | Remove generated Nuxt files                     |
| `lint`      | Lint with ESLint (`lint:fix` to apply fixes)    |
| `typecheck` | Type-check with `nuxt typecheck`                |
| `format`    | Format with Prettier (`format:check` to verify) |

## Routing to the API

`server/api/[...path].ts` forwards every `/api/*` request to the API server. The target is set by `NUXT_API_ORIGIN`.

## Configuration

Set these in the root `.env`. See the [setup guide](../../docs/setup.md).

| Variable           | Default                 | Purpose                         |
| ------------------ | ----------------------- | ------------------------------- |
| `WEB_DEV_PORT`     | `5173`                  | Dev server port                 |
| `WEB_PREVIEW_PORT` | `4173`                  | Preview server port             |
| `NUXT_API_ORIGIN`  | `http://localhost:8000` | API origin for the `/api` proxy |

## Project structure

```text
apps/web/
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css
│   ├── pages/
│   │   └── index.vue
│   ├── plugins/
│   │   └── vue-query.ts
│   ├── utils/
│   │   └── auth-client.ts
│   └── app.vue
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── scripts/
│   └── run.ts
├── server/
│   └── api/
│       └── [...path].ts
├── env.d.ts
├── eslint.config.mjs
├── nuxt.config.ts
├── package.json
├── prettier.config.js
├── README.md
└── tsconfig.json
```
