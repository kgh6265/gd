export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    let result = await $fetch(
      `${config.strapiUrl}api/members?populate=*`,
      {
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.strapiToken}`,
        },
      }
    );

    return result.data.sort((a, b) => a.id - b.id);
  } catch (error) {
    throw createError({
      statusCode: 504,
      statusMessage: "Strapi Backend Timeout",
    });
  }
});
