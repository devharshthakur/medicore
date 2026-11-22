import { defineHandler } from 'nitro';

import { auth } from '#utils/auth.ts';

export default defineHandler((event) => auth.handler(event.req));
