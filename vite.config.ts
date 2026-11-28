import { defineConfig } from 'vite-plus';

// Vite+ has no supported switch for the standalone Oxc commands: the `check`
// block only affects `vp check`, so `vp lint`, `vp fmt`, and `vp format` still
// run Oxlint/Oxfmt. Vite+ rejects a non-object `fmt`/`lint` value at load time,
// which makes an accidental run fail before it can touch files. ESLint and
// Prettier do lint and format this project: use `vpr lint` / `vpr format`.
const oxcDisabled = false as never;

export default defineConfig({
  // Linting and formatting are handled by ESLint and Prettier.
  check: {
    fmt: false,
    lint: false,
  },
  fmt: oxcDisabled,
  lint: oxcDisabled,
  staged: {
    'apps/web/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,vue}': ['eslint --fix', 'prettier --config apps/web/prettier.config.js --ignore-path apps/web/.prettierignore --write'],
    'apps/api/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}': ['eslint --fix', 'prettier --config apps/api/prettier.config.js --ignore-path apps/api/.prettierignore --write'],
    'apps/shared/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}': ['eslint --fix', 'prettier --config apps/shared/prettier.config.js --ignore-path apps/shared/.prettierignore --write'],
    'packages/db/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}': ['eslint --fix', 'prettier --config packages/db/prettier.config.js --ignore-path packages/db/.prettierignore --write'],
    'apps/web/**/*.{json,jsonc,md,css,scss,html,yml,yaml}': 'prettier --config apps/web/prettier.config.js --ignore-path apps/web/.prettierignore --write',
    'apps/api/**/*.{json,jsonc,md,css,scss,html,yml,yaml}': 'prettier --config apps/api/prettier.config.js --ignore-path apps/api/.prettierignore --write',
    'apps/shared/**/*.{json,jsonc,md,css,scss,html,yml,yaml}': 'prettier --config apps/shared/prettier.config.js --ignore-path apps/shared/.prettierignore --write',
    'packages/db/**/*.{json,jsonc,md,css,scss,html,yml,yaml}': 'prettier --config packages/db/prettier.config.js --ignore-path packages/db/.prettierignore --write',
    'packages/prettier-config/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}': 'prettier --config packages/prettier-config/prettier.config.js --ignore-path packages/prettier-config/.prettierignore --write',
    'packages/prettier-config/**/*.{json,jsonc,md,css,scss,html,yml,yaml}': 'prettier --config packages/prettier-config/prettier.config.js --ignore-path packages/prettier-config/.prettierignore --write',
    './*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}': 'prettier --config prettier.config.js --ignore-path .prettierignore --write',
    './*.{json,jsonc,md,css,scss,html,yml,yaml}': 'prettier --config prettier.config.js --ignore-path .prettierignore --write',
    '.vscode/*.json': 'prettier --config prettier.config.js --ignore-path .prettierignore --write',
  },
});
