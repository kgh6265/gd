<template>
  <ul>
    <li>
      <a :href="googleCalendarLink" target="_blank">Add to Google Calendar</a>
    </li>
    <li><a :href="outlookCalendarLink" target="_blank">Add to Outlook</a></li>
    <li>
      <a :href="yahooCalendarLink" target="_blank">Add to Yahoo! Calendar</a>
    </li>
    <li>
      <a :href="appleCalendarLink" download="event.ics"
        >Add to Apple Calendar</a
      >
    </li>
    <li><a :href="icsFileLink" download="event.ics">Download .ics File</a></li>
  </ul>
</template>

<script setup>
// Props
const props = defineProps({
  name: { type: String, required: true },
  location: { type: String, required: true },
  details: { type: String, required: true },
  startsAt: { type: String, required: true }, // ISO 8601 format
});

const name = props.name;
const location = props.location;
const details = props.details;
const startsAt = props.startsAt;

// Compute the end time (1 hour after startsAt)
const endsAt = computed(() => {
  

  const startDate = new Date(startsAt);

  if (isNaN(startDate.getTime())) {
    console.error("Invalid startsAt format. Please use ISO 8601 format.");
    return null; // Return null for invalid dates
  }

  // Add 1 hour directly
  startDate.setHours(startDate.getHours() + 1);

  // Return as a string in the same local timezone
  return startDate.toISOString();
});

// Calendar Links
const googleCalendarLink = computed(() => {
  const start = encodeURIComponent(startsAt.replace(/-|:|\.\d{3}/g, ""));
  const end = encodeURIComponent(endsAt.value.replace(/-|:|\.\d{3}/g, ""));
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    name
  )}&dates=${start}/${end}&details=${encodeURIComponent(
    details
  )}&location=${encodeURIComponent(location)}`;
});

const outlookCalendarLink = computed(() => {
  const start = encodeURIComponent(startsAt.replace(/-|:|\.\d{3}/g, ""));
  const end = encodeURIComponent(endsAt.value.replace(/-|:|\.\d{3}/g, ""));
  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
    name
  )}&startdt=${start}&enddt=${end}&body=${encodeURIComponent(
    details
  )}&location=${encodeURIComponent(location)}`;
});

const yahooCalendarLink = computed(() => {
  const start = encodeURIComponent(startsAt.replace(/-|:|\.\d{3}/g, ""));
  const end = encodeURIComponent(endsAt.value.replace(/-|:|\.\d{3}/g, ""));
  return `https://calendar.yahoo.com/?v=60&title=${encodeURIComponent(
    name
  )}&st=${start}&et=${end}&desc=${encodeURIComponent(
    details
  )}&in_loc=${encodeURIComponent(location)}`;
});

const generateICS = () => {
  return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${name}
DTSTART:${startsAt.replace(/-|:|\.\d{3}/g, "")}
DTEND:${endsAt.value.replace(/-|:|\.\d{3}/g, "")}
LOCATION:${location}
DESCRIPTION:${details}
END:VEVENT
END:VCALENDAR`;
};

const appleCalendarLink = computed(() => {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(
    generateICS()
  )}`;
});

const icsFileLink = appleCalendarLink; // Reuse Apple Calendar link for .ics file
</script>

<style scoped>
.calendar-links ul {
  list-style-type: none;
  padding: 0;
}
.calendar-links li {
  margin: 0.5em 0;
}
</style>
