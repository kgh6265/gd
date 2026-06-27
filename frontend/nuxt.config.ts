// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    "/": { prerender: true },
    "/designathon/**": { prerender: true },
    "/designathon": { prerender: true },
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
    "/status": {
      redirect: "https://kgh6265.github.io/statuspage/",
    },
    "/health-check": {
      redirect: "https://kgh6265.github.io/statuspage/",
    },
    "/magazines/latest": {
      isr: 3600,
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "nuxt-umami",
  ],
  runtimeConfig: {
    strapiToken: process.env.STRAPI_TOKEN,
    strapiUrl: (
      process.env.STRAPI_URL || "https://gd-strapi.onrender.com"
    ).replace(/\/?$/, "/"),
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
    public: {
      redirectUrl: process.env.REDIRECT_URL,
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
          content:
            "We are RIT Dubai's pioneering departmental club dedicated to igniting passion and harnessing the power of liberal arts among our students.",
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
      // script: [
      //   {
      //     src: "https://cloud.umami.is/script.js",
      //     "data-website-id": "12db7138-696b-4c12-8911-16206a5142ef",
      //     defer: true,
      //   },
      // ],
    },
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/", "/privacy", "/magazines/**", "/events/**"],
      include: ["/dashboard"],
      cookieRedirect: true,
    },
  },
  umami: {
    id: "12db7138-696b-4c12-8911-16206a5142ef",
    host: "https://cloud.umami.is",
    autoTrack: true,
  },
});
