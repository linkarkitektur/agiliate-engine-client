// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  app: {
    baseURL: '/agiliate-engine-client/',
    buildAssetsDir: 'assets'
  },
  typescript: {
    strict: true,
  },
  experimental: {
    payloadExtraction: true
  },
})
