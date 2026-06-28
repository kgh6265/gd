export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    let result = await $fetch(
      `${config.strapiUrl}api/magazines?locale=all&populate=*&pagination[pageSize]=100`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.strapiToken}`,
        },
      },
    );

    const magazines = result.data.reduce((acc, magazine) => {
      const season = magazine.season.toLowerCase().replace(/\s/g, "");
      if (!acc[season]) {
        acc[season] = [];
      }
      acc[season].push(magazine);
      return acc;
    }, {});
    console.log(magazines);
    return magazines;
  } catch (error) {
    console.error(error);
    return { failed: true };
  }
});
