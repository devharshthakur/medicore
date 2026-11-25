// Extend the shared Prettier defaults; add package-specific overrides here.
import baseConfig from '@medcore/prettier-config'

export default {
  ...baseConfig,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 300,
  singleAttributePerLine: false,
  vueIndentScriptAndStyle: true,
  experimentalTernaries: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './app/assets/css/main.css'
}
