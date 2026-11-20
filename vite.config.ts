import { defineConfig } from 'vite-plus';

export default defineConfig({
  // Linting and formatting are handled by ESLint and Prettier.
  check: {
    fmt: false,
    lint: false,
  },
  staged: {
    '*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,vue}': ['eslint --fix', 'prettier --write'],
    '*.{json,jsonc,md,css,scss,html,yml,yaml}': 'prettier --write',
  },
});
