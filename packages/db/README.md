# @medcore/db

Drizzle ORM schema, database client, migrations, and local PostgreSQL for MedCore HMS.

## Local setup

1. Create the repository-root environment file if it does not exist:

   ```sh
   cp -n .env.example .env
   ```

2. Start PostgreSQL with Docker. Pass the root `.env` explicitly, because this
   compose file sits in `packages/db/` and would otherwise read nothing:

   ```sh
   docker compose --env-file .env -f packages/db/compose.yaml up -d
   ```

3. Apply the committed migrations:

   ```sh
   vp run db:migrate
   ```

The database is available at the `DATABASE_URL` in the root `.env`. The defaults are the `medcore` user and the `medcore-db` database on `127.0.0.1:5432`. Use `127.0.0.1` rather than `localhost`: with Colima, `localhost` can resolve to `::1`, where the published port is not reachable. Keep `POSTGRES_DB` and the database in `DATABASE_URL` in sync, and change `POSTGRES_PORT` and `DATABASE_URL` together if the default port is taken.

## Scripts

| Command                             | Purpose                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `vp run db:generate`                | Generate a SQL migration from schema changes.                             |
| `vp run db:migrate`                 | Apply pending migrations to the database.                                 |
| `vp run db:push`                    | Push the schema directly to the database (development).                   |
| `vp run db:pull`                    | Introspect the database into the schema.                                  |
| `vp run db:studio`                  | Start Drizzle Studio; the UI is served at `https://local.drizzle.studio`. |
| `vp run db:check`                   | Check the migration history for conflicts.                                |
| `vp run db:up`                      | Upgrade an older migrations folder format.                                |
| `vp run '@medcore/db#lint'`         | Lint the package.                                                         |
| `vp run '@medcore/db#typecheck'`    | Type-check the package.                                                   |
| `vp run '@medcore/db#format'`       | Format the package.                                                       |
| `vp run '@medcore/db#format:check'` | Check formatting.                                                         |

Generate a migration after every schema change, review the SQL under `drizzle/`, and commit it with the schema change. Do not edit `snapshot.json` by hand; regenerate the migration instead. Use `db:push` only for disposable local databases.

## Schema

- `src/schema/users.ts` — `users`
- `src/schema/sessions.ts` — `sessions`, with a cascading foreign key to `users`
- `src/relations.ts` — Drizzle v1 relations for the relational query API

## Usage

```ts
import { db, schema } from '@medcore/db';

const allUsers = await db.select().from(schema.users);

const usersWithSessions = await db.query.users.findMany({
  with: {
    sessions: true,
  },
});
```

`@medcore/db` reads `DATABASE_URL` from the process environment. The API's `scripts/run.ts` and `drizzle.config.ts` both load the root `.env`, so no per-package file is needed.

## API health check

`GET /api/db/health` executes `select 1` through the shared client. A reachable database returns:

```json
{ "status": "ok", "database": "postgresql" }
```
