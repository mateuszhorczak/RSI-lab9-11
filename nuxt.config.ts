// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
  ],
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Rsi - nuxt',
    },
  },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-05-15',

  nitro: {
    experimental: {
      openAPI: true,
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
