// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    "/": { prerender: true },
    "/events/**": { ssr: false },
    "/dashboard": { ssr: true },
    "/login": { ssr: true },
    "/confirm": { ssr: true },
    "/events": { redirect: "/#events" },
    "/about": { redirect: "/#about" },
    "/magazines": { redirect: "/#magazines" },
    "/members": { redirect: "/#members" },
    "/analytics": {
      redirect:
        "https://cloud.umami.is/share/0Hf0pSsWTJhE0IBT/gdclub.ritdubai.ae",
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
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
        },
      ],
      script: [
        {
          src: "https://cloud.umami.is/script.js",
          "data-website-id": "12db7138-696b-4c12-8911-16206a5142ef",
          defer: true,
        },
      ],
    },
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/", "/events/**"],
      include: ["/dashboard"],
      cookieRedirect: true,
    },
  },
});