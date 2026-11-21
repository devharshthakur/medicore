import { defineConfig } from 'vite-plus';

export default defineConfig({
  // Linting and formatting are handled by ESLint and Prettier.
  check: {
    fmt: false,
    lint: false,
  },
  staged: {
    'apps/web/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,vue}': ['eslint --fix', 'prettier --config apps/web/prettier.config.js --ignore-path apps/web/.prettierignore --write'],
    'apps/api/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}': ['eslint --fix', 'prettier --config apps/api/prettier.config.js --ignore-path apps/api/.prettierignore --write'],
    'apps/shared/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}': ['eslint --fix', 'prettier --config apps/shared/prettier.config.js --ignore-path apps/shared/.prettierignore --write'],
    'apps/web/**/*.{json,jsonc,md,css,scss,html,yml,yaml}': 'prettier --config apps/web/prettier.config.js --ignore-path apps/web/.prettierignore --write',
    'apps/api/**/*.{json,jsonc,md,css,scss,html,yml,yaml}': 'prettier --config apps/api/prettier.config.js --ignore-path apps/api/.prettierignore --write',
    'apps/shared/**/*.{json,jsonc,md,css,scss,html,yml,yaml}': 'prettier --config apps/shared/prettier.config.js --ignore-path apps/shared/.prettierignore --write',
    './*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}': 'prettier --config prettier.config.js --ignore-path .prettierignore --write',
    './*.{json,jsonc,md,css,scss,html,yml,yaml}': 'prettier --config prettier.config.js --ignore-path .prettierignore --write',
    '.vscode/*.json': 'prettier --config prettier.config.js --ignore-path .prettierignore --write',
  },
});
