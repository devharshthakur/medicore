# @medcore/db

Drizzle ORM schema, database client, migrations, and local PostgreSQL for MedCore HMS.

## Table of contents

- [Local database](#local-database)
- [Scripts](#scripts)
- [Migrations](#migrations)
- [Schema](#schema)
- [Usage](#usage)
- [Project structure](#project-structure)

## Local database

Run these from the repository root. Setup uses the root `.env`; see the [setup guide](../../docs/setup.md).

```sh
cp -n .env.example .env
docker compose up -d db
vp run db:migrate
```

By default, `DATABASE_URL` points to `127.0.0.1:5432`.

> [!TIP]
> Use `127.0.0.1`, not `localhost`. With Colima, `localhost` can resolve to `::1`, where the published port is unreachable.

Keep `POSTGRES_DB` and the database name in `DATABASE_URL` in sync. To change the port, update `POSTGRES_PORT` and `DATABASE_URL` together.

## Scripts

Run from the repository root.

| Command                             | Purpose                                                     |
| ----------------------------------- | ----------------------------------------------------------- |
| `vp run db:generate`                | Generate a SQL migration from schema changes                |
| `vp run db:migrate`                 | Apply pending migrations                                    |
| `vp run db:push`                    | Push the schema directly to the database (development only) |
| `vp run db:pull`                    | Introspect the database into the schema                     |
| `vp run db:studio`                  | Start Drizzle Studio at `https://local.drizzle.studio`      |
| `vp run db:check`                   | Check the migration history for conflicts                   |
| `vp run db:up`                      | Upgrade an older migrations folder format                   |
| `vp run '@medcore/db#lint'`         | Lint the package                                            |
| `vp run '@medcore/db#typecheck'`    | Type-check the package                                      |
| `vp run '@medcore/db#format'`       | Format the package                                          |
| `vp run '@medcore/db#format:check'` | Check formatting                                            |

## Migrations

1. Change the schema in `src/schema/`.
2. Run `vp run db:generate`.
3. Review the SQL in `drizzle/`.
4. Commit the migration with the schema change.

> [!IMPORTANT]
> Do not edit `snapshot.json` by hand. Regenerate the migration instead. Use `db:push` only on disposable local databases.

## Schema

| File                    | Tables                                             |
| ----------------------- | -------------------------------------------------- |
| `src/schema/auth.ts`    | `user`, `session`, `account`, `verification`       |
| `src/relations/auth.ts` | Relations between `user`, `session`, and `account` |

## Usage

`@medcore/db` reads `DATABASE_URL` from the environment.

```ts
import { db, schema } from '@medcore/db';

const users = await db.select().from(schema.user);

const usersWithSessions = await db.query.user.findMany({
  with: {
    sessions: true,
  },
});
```

The API health route `GET /api/db/health` runs `select 1` through this client. A reachable database returns:

```json
{ "status": "ok", "database": "postgresql" }
```

## Project structure

```text
packages/db/
├── drizzle/
│   ├── 20261121113058_init/
│   │   ├── migration.sql
│   │   └── snapshot.json
│   └── 20261122194025_rapid_clint_barton/
│       ├── migration.sql
│       └── snapshot.json
├── src/
│   ├── relations/
│   │   ├── auth.ts
│   │   └── index.ts
│   ├── schema/
│   │   ├── auth.ts
│   │   └── index.ts
│   └── index.ts
├── drizzle.config.ts
├── eslint.config.mjs
├── package.json
├── prettier.config.js
├── README.md
└── tsconfig.json
```
