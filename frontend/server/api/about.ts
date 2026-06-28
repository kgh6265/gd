export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    let result = await $fetch(`${config.strapiUrl}api/about`, {
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.strapiToken}`,
      },
    });

    return result;
  } catch (error) {
    throw createError({
      statusCode: 504,
      statusMessage: "Strapi Backend Timeout",
    });
  }
});
