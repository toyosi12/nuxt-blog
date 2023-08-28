// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/styles/global.scss"],
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
    { path: "~/components/molecules", pathPrefix: false },
    { path: "~/components/landing", pathPrefix: false },
    { path: "~/components/detail", pathPrefix: false },
    { path: "~/components/atoms", pathPrefix: false },
    { path: "~/components/utils", pathPrefix: false },
    { path: "~/components/icons", prefix: "Icon" },
    "~/components",
  ],
  modules: ["@nuxt/image-edge", "@vite-pwa/nuxt"],
  pwa: {
    manifest: {
      name: "TechCrunch",
      short_name: "TechCrunch",
      description: "TechCrunch",
      theme_color: "#2c2c2c",
      background_color: "#fff",
      icons: [
        {
          src: "icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "icons/icon-256x256.png",
          sizes: "256x256",
          type: "image/png",
        },
        {
          src: "icons/icon-384x384.png",
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: "icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
    devOptions: {
      enabled: false,
      type: "module",
    },
  },
});
