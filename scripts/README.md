# Scripts

Root tooling that is not a workspace package. The only script today validates the environment before the root commands start.

## Environment validation

`scripts/env/` checks the root `.env` against the rules in `schema.ts`. The root `dev`, `build`, `preview`, `docker:up`, and `db:*` scripts run it first and stop with an error if a value is invalid.

```sh
vpx scripts/env/index.ts <group> [<group> ...]
```

| Group    | Variables                                                                                                | Used by                   |
| -------- | -------------------------------------------------------------------------------------------------------- | ------------------------- |
| `web`    | `WEB_DEV_PORT`, `WEB_PREVIEW_PORT`, `NUXT_API_ORIGIN`                                                    | `dev`, `build`, `preview` |
| `api`    | `API_PORT`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `DATABASE_URL`                                      | `dev`, `build`, `preview` |
| `db`     | `DATABASE_URL`, `POSTGRES_USER`, `POSTGRES_DB`, `POSTGRES_PORT`                                          | `db:*`                    |
| `docker` | `WEB_PORT`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `POSTGRES_USER`, `POSTGRES_DB`, `POSTGRES_PASSWORD` | `docker:up`               |

Rules:

- Ports are whole numbers from 1 to 65535.
- URLs are `http` or `https`. `DATABASE_URL` is `postgres://` or `postgresql://`.
- `BETTER_AUTH_SECRET` is at least 32 characters.
- `POSTGRES_PASSWORD` is at least 16 characters.
- `POSTGRES_USER` and `POSTGRES_DB` are not empty.

Values already set in the shell override the file. Package-qualified commands such as `vp run '@medcore/web#dev'` skip validation.

## Adding a variable

1. Add the rule to the matching group in `scripts/env/schema.ts`.
2. Add the variable with a comment to `.env.example`.

Change both in the same commit.

## Type-check

```sh
vp run typecheck:scripts
```

## Project structure

```text
scripts/
├── env/
│   ├── index.ts     # CLI: loads .env, validates the selected groups
│   └── schema.ts    # Variable groups and validation rules
├── README.md
└── tsconfig.json
```
