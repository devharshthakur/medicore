# @medcore/web

Nuxt 4 based client app for MedCore HMS, built with Nuxt UI, Tailwind CSS, and TanStack Vue Query.

## Scripts

Run from the repository root with `vp run '@medcore/web#<script>'`.

| Script      | Description                                        |
| ----------- | -------------------------------------------------- |
| `dev`       | Start the dev server on `http://localhost:5173`    |
| `build`     | Build the app for production                       |
| `generate`  | Generate a static site                             |
| `preview`   | Build and serve the app on `http://localhost:4173` |
| `clean`     | Remove generated Nuxt files                        |
| `lint`      | Lint with ESLint (`lint:fix` to apply fixes)       |
| `typecheck` | Type-check with `nuxt typecheck`                   |
| `format`    | Format with Prettier (`format:check` to verify)    |

## Structure

- `app/`: pages, components, plugins, and client utilities
- `server/api/`: Nitro routes; `[...path].ts` proxies `/api/*` to the API
- `public/`: static files

The proxy target is set by `NUXT_API_ORIGIN` (default `http://localhost:8000`). Configure it in the root `.env`. See the [setup guide](../../docs/setup.md).
