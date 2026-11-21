import { db } from '@medcore/db';
import { sql } from 'drizzle-orm';
import { defineHandler } from 'nitro';

export default defineHandler(async () => {
  await db.execute(sql`select 1`);

  return {
    status: 'ok',
    database: 'postgresql',
  };
});
