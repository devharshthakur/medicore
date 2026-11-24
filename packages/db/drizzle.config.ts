import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'drizzle-kit';

// Drizzle Kit loads this file directly, not through the API launcher, so it loads
// the repository-root .env itself. Variables already set in the shell still win,
// because process.loadEnvFile never overwrites an existing variable.
const rootEnvFile = fileURLToPath(new URL('../../.env', import.meta.url));
if (existsSync(rootEnvFile)) {
  process.loadEnvFile(rootEnvFile);
}

// DATABASE_URL is validated once by the root scripts/env/ (the root db:* scripts run it first).
const databaseUrl = process.env.DATABASE_URL as string;

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema/index.ts',
  out: './drizzle',
  dbCredentials: {
    url: databaseUrl,
  },
  verbose: true,
});
