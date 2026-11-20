// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 5,
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  components: {
    dirs: [],
  },
  imports: {
    scan: false,
  },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/fonts'],
  fonts: {
    families: [{ name: 'Inter Variable', provider: 'npm', global: true }],
  },
  css: ['~/assets/css/main.css'],
  ui: {
    eslint: true,
  },
});
