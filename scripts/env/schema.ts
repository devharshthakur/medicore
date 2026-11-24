// Environment variable rules for the whole repository.
//
// This file only describes what is valid. scripts/env/index.ts loads the root
// .env and applies these rules. Add or change a variable here and in .env.example
// together.
//
// Each group lists only the variables its command needs, so running the web app
// alone never fails on a missing database setting.

import { z } from 'zod';

// --- Reusable value rules ---------------------------------------------------

// A TCP port written as plain digits, 1-65535.
const port = z.string().refine((value) => /^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 65535, 'must be a whole number between 1 and 65535');

// Optional because the launchers fall back to a default port when it is unset.
const optionalPort = port.optional();

const httpUrl = z.url({ protocol: /^https?$/, error: 'must be an http or https URL' });

const postgresUrl = z.url({ protocol: /^postgres(ql)?$/, error: 'must be a postgres:// or postgresql:// URL' });

// Signing secrets must be long enough to resist guessing.
const secret = z.string().min(32, 'must be at least 32 characters (generate one with `openssl rand -base64 32`)');

// A database password that is long enough for the Docker stack. Local development
// shares the same value, so it must satisfy this everywhere.
const databasePassword = z.string().min(16, 'must be at least 16 characters (generate one with `openssl rand -hex 32`)');

// --- Groups -----------------------------------------------------------------

export const groups = {
  // Nuxt dev and preview servers.
  web: {
    WEB_DEV_PORT: optionalPort,
    WEB_PREVIEW_PORT: optionalPort,
    NUXT_API_ORIGIN: httpUrl.optional(),
  },

  // API server and Better Auth.
  api: {
    API_PORT: optionalPort,
    BETTER_AUTH_URL: httpUrl,
    BETTER_AUTH_SECRET: secret,
    DATABASE_URL: postgresUrl,
  },

  // Drizzle Kit and the local PostgreSQL container.
  db: {
    DATABASE_URL: postgresUrl,
    POSTGRES_USER: z.string().min(1, 'must not be empty'),
    POSTGRES_DB: z.string().min(1, 'must not be empty'),
    POSTGRES_PORT: port,
  },

  // The Docker Compose stack. A weak database password is rejected, so the value
  // must be strong in local development too.
  docker: {
    WEB_PORT: port,
    BETTER_AUTH_URL: httpUrl,
    BETTER_AUTH_SECRET: secret,
    POSTGRES_USER: z.string().min(1, 'must not be empty'),
    POSTGRES_DB: z.string().min(1, 'must not be empty'),
    POSTGRES_PASSWORD: databasePassword,
  },
} satisfies Record<string, z.ZodRawShape>;

export type GroupName = keyof typeof groups;
