export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const query = getQuery(event);
  const credentialId = query.id;

  let result = await $fetch(
    `${config.strapiUrl}api/credentials?filters[credential_id][$eq]=${credentialId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.strapiToken}`,
      },
    }
  );

  return result;
});
