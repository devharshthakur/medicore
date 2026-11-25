// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 5
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    apiOrigin: 'http://localhost:8000'
  },
  typescript: {
    nodeTsConfig: {
      include: ['../scripts/**/*.ts'],
      compilerOptions: {
        types: ['node']
      }
    }
  },
  components: {
    dirs: []
  },
  imports: {
    scan: false
  },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/icon', '@nuxt/fonts', '@nuxt/image'],
  fonts: {
    families: [{ name: 'Inter Variable', provider: 'npm', global: true }]
  },
  icon: {
    clientBundle: {
      scan: true
    }
  },
  css: ['~/assets/css/main.css'],
  ui: {
    eslint: true
  },
  vite: {
    optimizeDeps: {
      include: ['@tanstack/vue-query', '@tanstack/vue-query-devtools', '@tanstack/vue-query > @vue/devtools-api']
    },
    plugins: [
      {
        name: 'medcore:vue-devtools-api-prebundle',
        configEnvironment(name, config, env) {
          if (name !== 'client' || env.command !== 'serve') {
            return
          }
          if (config.optimizeDeps?.exclude) {
            config.optimizeDeps.exclude = config.optimizeDeps.exclude.filter((entry) => entry !== '@vue/devtools-api')
          }
        }
      }
    ]
  }
})
