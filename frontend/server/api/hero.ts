export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  console.log(config.strapiToken)
  console.log(config.strapiUrl)

  let result = await $fetch(`${config.strapiUrl}/api/hero`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.strapiToken}`,
    },
  });

  return result
});
