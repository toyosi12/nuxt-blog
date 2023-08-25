// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/styles/global.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/_variables.scss" as *;',
        },
      },
    },
  },
  components: [
    { path: '~/components/molecules', pathPrefix: false },
    { path: '~/components/atoms', pathPrefix: false },
    { path: '~/components/utils', pathPrefix: false },
    { path: '~/components/icons', prefix: 'Icon' },
    '~/components'
  ]
})
