export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    let result = await $fetch(
      `${config.public.strapiUrl}/api/events?populate=*`,
      {
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

    return { upcomingEvents, pastEvents };
  } catch (error) {
    return { failed: true };
  }
});
