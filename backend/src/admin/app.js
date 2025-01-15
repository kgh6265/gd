const config = {
  tutorials: false,
  translations: {
    en: {
      "Auth.form.welcome.title": "Graphic Design Club",
      "Auth.form.welcome.subtitle": "Khaleel does't know your password.",
    },
  },
  notifications: {
    releases: false,
  },
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
