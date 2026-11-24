import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { relations } from './relations';
import * as schema from './schema';

export function createDatabaseClient(connectionString: string) {
  const client = postgres(connectionString, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });

  const db = drizzle({ client, relations });

  return { client, db };
}

// DATABASE_URL is validated once by the root scripts/env/ before any command starts.
export const { client, db } = createDatabaseClient(process.env.DATABASE_URL as string);

export { schema };
export * from './relations';
export * from './schema';

export type Database = typeof db;
