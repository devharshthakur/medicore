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

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set. Copy .env.example to .env before using @medcore/db.');
}

export const { client, db } = createDatabaseClient(connectionString);

export { schema };
export * from './relations';
export * from './schema';

export type Database = typeof db;
