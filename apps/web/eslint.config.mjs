// @ts-check
/// <reference types="node" /> // types import.meta.dirname (Node >=20.11); generated tsconfigs use types: []
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default withNuxt(
  {
    ignores: ['.nuxt/**', '.output/**', '.nitro/**', '.cache/**', 'dist/**', 'public/**']
  },
  {
    // Explicit tsconfigRootDir: typescript-eslint records the directory of every
    // eslint.config.* file that accesses tseslint.configs.* in one process-global
    // candidate set, and parsing fails when more than one is present (e.g. IDE runs
    // that also load apps/api and packages/db configs). Mirrors those packages.
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    // Nuxt's env.d.ts uses empty interfaces for runtime config augmentation.
    files: ['env.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off'
    }
  },
  eslintConfigPrettier
)
