# Self-hosting with Docker

This setup runs the current MedCore web app, API, and PostgreSQL on one machine.
It builds production-mode applications, but it is not a complete, secure hospital
deployment. The app is still under development. Do not use real patient data
without a security, privacy, backup, and compliance review.

The web app listens only on the host machine at `http://localhost:3000` by
default. HTTP is not encrypted. Do not expose it to the internet or a network
containing untrusted users. Public deployment requires a properly configured HTTPS
reverse proxy, a domain, and additional operational and security controls.

## Prerequisites

- Docker Engine, Docker Compose, and the Docker Buildx plugin, with Docker running.
  Check Buildx with `docker buildx version`. Buildx is required so the
  Dockerfile-specific ignore file excludes local secrets from the build context.
- Vite+ to run the root package script. You can also use Docker Compose directly
  without Vite+.
- `openssl` to generate secrets.
- A checkout of this repository, with enough disk space to build images and store
  PostgreSQL data.

Run the commands below from the repository root.

## Configure

Docker Compose reads the same root `.env` as local development. It has no separate
Docker env file.

1. Create the file if it does not exist, without overwriting an existing one:

   ```sh
   cp -n .env.example .env
   ```

2. Set these values in `.env` before the first start:

   - `POSTGRES_PASSWORD`: run `openssl rand -hex 32`. Use hexadecimal output, because
     the value is embedded in a database URL.
   - `BETTER_AUTH_SECRET`: run `openssl rand -hex 32` again. Use a different value.
   - `BETTER_AUTH_URL=http://localhost:3000` and `WEB_PORT=3000` for the default
     setup. If you change the port, update both so `BETTER_AUTH_URL` matches the
     browser address. It controls authentication origins and callbacks.

   `vp run docker:up` validates these first: it refuses to start if
   `POSTGRES_PASSWORD` is under 16 characters, `BETTER_AUTH_SECRET` is under 32, or a
   URL or port is malformed.

3. Keep `.env` private and back it up securely. Do not commit it.

Local development uses the same file. Its `BETTER_AUTH_URL` is
`http://localhost:5173`, so switching between development and Docker means changing
`BETTER_AUTH_URL` (and `WEB_PORT`) in `.env`. Changing `POSTGRES_PASSWORD` also
affects the local development database: that database keeps the password it was
created with, so update `DATABASE_URL` to match, or keep local development on a
separate copy of the repository.

PostgreSQL uses `POSTGRES_PASSWORD` only when its data volume is first created.
Changing the value later does not change the existing database password. Do not
delete the volume to resolve a password mismatch: it contains your data.

## Start and stop

```sh
vp run docker:up
```

Alternatively, run:

```sh
docker buildx version && DOCKER_BUILDKIT=1 docker compose -f compose.yaml up --build -d
```

Compose reads `.env` from the repository root automatically.

The first build downloads dependencies and can take several minutes. Compose
starts PostgreSQL, waits for it to become healthy, runs committed migrations, and
then starts the API and web app. Open <http://localhost:3000>.

Inspect status and logs:

```sh
docker compose -f compose.yaml ps -a
docker compose -f compose.yaml logs --tail=100
```

Stop the services without deleting database data:

```sh
docker compose -f compose.yaml down
```

Never add `--volumes` to that command unless you intentionally want to delete the
database permanently.

## Updates and backups

Before updating, securely back up the database and `.env`. Test restoration
on a separate installation. Updating the source and running `vp run docker:up`
rebuilds images and runs pending migrations automatically. Migrations may change
the schema; rolling back an image alone may not roll back the database.

To create a logical PostgreSQL backup while the stack is running:

```sh
docker compose -f compose.yaml exec -T postgres \
  pg_dump -U medcore -d medcore -Fc > medcore-backup.dump
```

The backup contains sensitive data. Encrypt it, restrict access, and store a copy
off the host. Check that the command succeeded and the file is nonempty.
For recovery, stop application writes and restore into a separate empty PostgreSQL
database using `pg_restore` with a compatible PostgreSQL version. Verify the
restore before replacing any installation; restoring over live data can destroy it.
Plan and test a recovery procedure appropriate to your environment.

## Troubleshooting

- If Compose cannot connect, start Docker and check `docker info`.
- If Compose reports a missing variable, add it to `.env` and rerun startup.
- If port 3000 is occupied, choose another `WEB_PORT` and update
  `BETTER_AUTH_URL` to match.
- If startup fails, inspect the logs above. A failed migration prevents the API
  from starting; do not delete the database to bypass the error.
- Keep `BETTER_AUTH_SECRET` stable across restarts. Losing it can invalidate
  existing authentication data.
