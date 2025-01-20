export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  let result = await $fetch(`${config.strapiUrl}/api/hero`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.strapiToken}`,
    },
  });

  return result
});
