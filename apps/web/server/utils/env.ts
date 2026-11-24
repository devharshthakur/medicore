import { z } from 'zod';

export const envSchema = z.object({
  apiOrigin: z.url({ protocol: /^https?$/ }),
});
