export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  console.log(config.strapiToken)
  console.log(config.public.strapiUrl)

  let result = await $fetch(`${config.public.strapiUrl}/api/hero`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.strapiToken}`,
    },
  });

  return result
});
