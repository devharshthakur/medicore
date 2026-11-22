import { drizzleAdapter } from '@better-auth/drizzle-adapter/relations-v2';
import { db, schema } from '@medcore/db';
import { betterAuth } from 'better-auth';
import { admin } from 'better-auth/plugins/admin';

const webOrigin = process.env.BETTER_AUTH_URL ?? 'http://localhost:5173';

export const auth = betterAuth({
  baseURL: webOrigin,
  trustedOrigins: [webOrigin],
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    database: {
      joins: true,
    },
  },
  plugins: [admin()],
});
