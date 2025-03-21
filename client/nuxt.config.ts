// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxt/icon', '@pinia/nuxt', '@nuxt/ui'],

  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL
    }
  },
})