export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  let result = await $fetch(
    `${config.strapiUrl}api/members?populate=*`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.strapiToken}`,
      },
    }
  );

  return result.data.sort((a, b) => a.id - b.id);
});
