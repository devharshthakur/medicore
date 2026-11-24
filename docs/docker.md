# Self-hosting with Docker

Runs the web app, API, and PostgreSQL as production builds on one machine.

> [!WARNING]
> MedCore HMS is under active development. This stack is not a complete or secure hospital deployment. Do not use real patient data without a security, privacy, backup, and compliance review.
>
> The web app listens on `127.0.0.1` only, over unencrypted HTTP. Do not expose it to the internet or untrusted networks. Public deployment needs an HTTPS reverse proxy, a domain, and operational and security controls.

## Table of contents

- [Prerequisites](#prerequisites)
- [Configure](#configure)
- [Start and stop](#start-and-stop)
- [Updates and backups](#updates-and-backups)
- [Troubleshooting](#troubleshooting)

## Prerequisites

| Requirement                          | Notes                                                                   |
| ------------------------------------ | ----------------------------------------------------------------------- |
| Docker Engine with Compose           | Docker must be running. Check with `docker info`.                       |
| Docker Buildx plugin                 | Check with `docker buildx version`.                                     |
| [Vite+](https://viteplus.dev/guide/) | Optional. Runs the `vp run docker:up` and `vp run docker:down` scripts. |
| `openssl`                            | Generates secrets.                                                      |
| Disk space                           | Enough for image builds and the PostgreSQL data volume.                 |

Run all commands from the repository root.

## Configure

The stack reads the root `.env`.

1. Create the file without overwriting an existing one:

   ```sh
   cp -n .env.example .env
   ```

2. Set these values before the first start:

   | Variable             | Value                                                       |
   | -------------------- | ----------------------------------------------------------- |
   | `POSTGRES_USER`      | Database user. Default `medcore`.                           |
   | `POSTGRES_DB`        | Database name. Default `medcore-db`.                        |
   | `POSTGRES_PASSWORD`  | `openssl rand -hex 32`. At least 16 characters.             |
   | `BETTER_AUTH_SECRET` | `openssl rand -hex 32`. At least 32 characters.             |
   | `BETTER_AUTH_URL`    | `http://localhost:3000`, or the origin your browser uses.   |
   | `WEB_PORT`           | `3000`, or another free port. Must match `BETTER_AUTH_URL`. |

3. Keep `.env` private and back it up securely. Do not commit it.

`vp run docker:up` checks these values first and stops if one is invalid. The rules are in [`scripts/env/schema.ts`](../scripts/env/schema.ts).

> [!CAUTION]
> `POSTGRES_USER`, `POSTGRES_DB`, and `POSTGRES_PASSWORD` apply only when the `postgres-data` volume is created. Later changes do not alter the existing database. Do not delete the volume to fix a mismatch, because it holds your data.

> [!NOTE]
> Local development ([setup guide](setup.md)) uses the same `.env` and the same `postgres-data` volume, so both modes share one database. Its `BETTER_AUTH_URL` is `http://localhost:5173`. Change `BETTER_AUTH_URL` and `WEB_PORT` when you switch between modes.

## Start and stop

Start the stack:

```sh
vp run docker:up
```

Without Vite+:

```sh
DOCKER_BUILDKIT=1 docker compose -f compose.yaml up --build -d
```

The first build can take several minutes. Compose starts PostgreSQL, waits until it is healthy, applies migrations, then starts the API and the web app.

Open <http://localhost:3000>.

Check status and logs:

```sh
docker compose -f compose.yaml ps -a
docker compose -f compose.yaml logs --tail=100
```

Stop the stack and keep data:

```sh
docker compose -f compose.yaml down
```

Stop the stack and delete data:

```sh
vp run docker:down
```

> [!CAUTION]
> `vp run docker:down` runs `docker compose down --volumes`. It deletes the `postgres-data` volume and all database data. Back up first. Recovery is not possible without a backup.

## Updates and backups

Back up the database and `.env` before every update. Test restores on a separate installation.

Update the source, then run `vp run docker:up`. Images are rebuilt and pending migrations apply automatically. A migration can change the schema, so rolling back an image alone does not roll back the database.

### Back up

With the stack running:

```sh
docker compose -f compose.yaml exec -T db \
  sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' > medcore-backup.dump
```

> [!WARNING]
> The dump contains sensitive data. Encrypt it, restrict access, and store a copy off the host. Confirm the command succeeded and the file is not empty.

### Restore

Restore into a separate, empty PostgreSQL database with `pg_restore` and a compatible PostgreSQL version. Verify the restored data before you replace any installation. Restoring over live data can destroy it.

## Troubleshooting

| Symptom                | Action                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| Compose cannot connect | Start Docker, then check `docker info`.                                                        |
| Missing variable error | Add the variable to `.env` and run the start command again.                                    |
| Port 3000 is in use    | Set another `WEB_PORT` and update `BETTER_AUTH_URL` to match.                                  |
| Startup fails          | Read the logs. A failed migration stops the API. Do not delete the database to bypass it.      |
| Users are signed out   | Check that `BETTER_AUTH_SECRET` is unchanged. A different value invalidates existing sessions. |
