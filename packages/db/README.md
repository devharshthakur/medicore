# @medcore/db

Drizzle ORM schema, database client, migrations, and local PostgreSQL for MedCore HMS.

## Local setup

1. Create the local environment file:

   ```sh
   cp -n packages/db/.env.example packages/db/.env
   ```

2. Start PostgreSQL with Docker:

   ```sh
   docker compose -f packages/db/compose.yaml up -d
   ```

3. Apply the committed migrations:

   ```sh
   pnpm --filter @medcore/db db:migrate
   ```

The database is available at the `DATABASE_URL` in `.env`. Local defaults are `medcore:medcore@localhost:5432/medcore`; change `POSTGRES_PORT` and `DATABASE_URL` together if the default port is taken.

## Scripts

| Command                                  | Purpose                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------- |
| `pnpm --filter @medcore/db db:generate`  | Generate a SQL migration from schema changes.                             |
| `pnpm --filter @medcore/db db:migrate`   | Apply pending migrations to the database.                                 |
| `pnpm --filter @medcore/db db:push`      | Push the schema directly to the database (development).                   |
| `pnpm --filter @medcore/db db:pull`      | Introspect the database into the schema.                                  |
| `pnpm --filter @medcore/db db:studio`    | Start Drizzle Studio; the UI is served at `https://local.drizzle.studio`. |
| `pnpm --filter @medcore/db db:check`     | Check the migration history for conflicts.                                |
| `pnpm --filter @medcore/db db:up`        | Upgrade an older migrations folder format.                                |
| `pnpm --filter @medcore/db lint`         | Lint the package.                                                         |
| `pnpm --filter @medcore/db typecheck`    | Type-check the package.                                                   |
| `pnpm --filter @medcore/db format`       | Format the package.                                                       |
| `pnpm --filter @medcore/db format:check` | Check formatting.                                                         |

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

`@medcore/db` reads `DATABASE_URL` from the process environment. The API's `scripts/run.ts` loads `apps/api/.env`, so set the same `DATABASE_URL` there for the API.

## API health check

`GET /api/db/health` executes `select 1` through the shared client. A reachable database returns:

```json
{ "status": "ok", "database": "postgresql" }
```
