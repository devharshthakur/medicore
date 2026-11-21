// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default withNuxt(
  {
    ignores: ['.nuxt/**', '.output/**', '.nitro/**', '.cache/**', 'dist/**', 'public/**'],
  },
  {
    // Nuxt's env.d.ts uses empty interfaces for runtime config augmentation.
    files: ['env.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  eslintConfigPrettier,
);
