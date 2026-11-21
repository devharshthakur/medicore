import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['.output/**', '.nitro/**', '.cache/**', '.turbo/**', 'dist/**', 'coverage/**'],
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
);
