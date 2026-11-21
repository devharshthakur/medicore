import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['.output/**', '.nitro/**', '.data/**', 'public/**'],
  },
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
);
