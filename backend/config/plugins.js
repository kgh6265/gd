module.exports = () => ({
  upload: {
    config: {
      provider: "strapi-provider-upload-supabase-strage",
      providerOptions: {
        url: process.env.SUPABASE_API_URL,
        apiKey: process.env.SUPABASE_API_KEY,
        bucket: process.env.SUPABASE_BUCKET,
        directory: process.env.SUPABASE_DIRECTORY,
        options: {},
      },
    },
    sizeLimit: 1048576, // 15 MB
  },
  email: {
    config: {
      provider: "strapi-provider-email-resend",
      providerOptions: {
        apiKey: process.env.RESEND_API_KEY,
      },
      settings: {
        defaultFrom: "no-reply@gdclub.khaleelgibran.com",
        defaultReplyTo: "khaleel@mail.rit.edu",
      },
    },
  },
});
