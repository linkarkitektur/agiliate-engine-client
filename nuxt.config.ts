// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-lodash'],
  app: {
    baseURL: '/agiliate-engine-client/',
    buildAssetsDir: 'assets'
  },
  typescript: {
    strict: true,
  },
  experimental: {
    payloadExtraction: false
  },
  compatibilityDate: '2025-01-28',
})
