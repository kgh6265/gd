export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  let result = await $fetch(
    `${config.public.strapiUrl}/api/magazines?populate=*`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.strapiToken}`,
      },
    }
  );

  const magazines = result.data.reduce((acc, magazine) => {
    const season = magazine.season.toLowerCase().replace(/\s/g, "");
    if (!acc[season]) {
      acc[season] = [];
    }
    acc[season].push(magazine);
    return acc;
  }, {});

  return magazines;
});
