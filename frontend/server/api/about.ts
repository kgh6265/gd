export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  let result = await $fetch(`${config.strapiUrl}api/about`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.strapiToken}`,
    },
  });

  return result;
});
