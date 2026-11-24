import { defineNitroPlugin } from 'nitropack/runtime';
import { useRuntimeConfig } from 'nuxt/server';
import { z } from 'zod';
import { envSchema } from '../utils/env';

export default defineNitroPlugin(() => {
  const result = envSchema.safeParse(useRuntimeConfig());

  if (!result.success) {
    throw new Error(`Invalid runtime configuration:\n\n${z.prettifyError(result.error)}`);
  }
});
