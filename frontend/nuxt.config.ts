// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    "/": { ssr: true },
    "/events/**": { ssr: false },
    "/dashboard": { ssr: false },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    strapiToken: process.env.STRAPI_TOKEN,
    public: {
      strapiUrl: process.env.STRAPI_URL,
    },
  },
  colorMode: {
    preference: "dark",
  },
  app: {
    head: {
      title: "Graphic Design Club · RIT Dubai",
      meta: [
        {
          name: "description",
          content: "Graphic Design Club at RIT Dubai",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          type: "text/plain",
          rel: "author",
          href: "/humans.txt",
        }
      ]
    },
  },
});