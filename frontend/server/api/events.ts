export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    let result = await $fetch(
      `${config.strapiUrl}api/events?populate=*`,
      {
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.strapiToken}`,
        },
      }
    );

    const events = result.data;
    const upcomingEvents = events
      .filter((event) => {
        const eventDate = new Date(event.date);
        const currentDate = new Date();
        return eventDate > currentDate;
      })
      .reverse();
    const pastEvents = events
      .filter((event) => {
        const eventDate = new Date(event.date);
        const currentDate = new Date();
        return eventDate < currentDate;
      })
      .reverse();

    return { allEvents: events, upcomingEvents, pastEvents };
  } catch (error) {
    throw createError({
      statusCode: 504,
      statusMessage: "Strapi Backend Timeout",
    });
  }
});
