// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui'
  ],

  app: {
    head: {
      title: 'Rsi - nuxt',
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  css: ['~/assets/css/main.css'],
})
