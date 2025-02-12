<template>
  <ul class="mt-5 lg:mt-0">
    <li class="mb-2">
      <a :href="googleCalendarLink" target="_blank"
        ><UButton color="gray" icon="i-mynaui-brand-google-solid"
          >Add to Google Calendar</UButton
        ></a
      >
    </li>
    <li class="mb-2">
      <a :href="outlookCalendarLink" target="_blank">
        <UButton color="gray" icon="i-mdi-outlook">Add to Outlook</UButton></a
      >
    </li>
    <li class="mb-2">
      <a :href="yahooCalendarLink" target="_blank"
        ><UButton color="gray" icon="i-mdi-yahoo"
          >Add to Yahoo! Calendar</UButton
        ></a
      >
    </li>
    <li class="mb-2">
      <a :href="office365CalendarLink" download="event.ics"
        ><UButton color="gray" icon="i-hugeicons-office-365"
          >Add to Office 365</UButton
        ></a
      >
    </li>
    <li class="mb-2">
      <a :href="icsFileLink" download="event.ics"
        ><UButton color="gray" icon="i-mdi-apple"
          >Add to Apple Calendar</UButton
        ></a
      >
    </li>
    <li>
      <a :href="icsFileLink" download="event.ics"
        ><UButton color="gray" icon="i-mdi-download"
          >Download .ics file</UButton
        ></a
      >
    </li>
  </ul>
</template>

<script setup>
import { google, outlook, office365, yahoo, ics } from "calendar-link";

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

// Set event as an object
const event = {
  title: name,
  description: details,
  start: startsAt + "Z",
  location: location,
  duration: [1, "hour"],
};

const googleCalendarLink = google(event);
const outlookCalendarLink = outlook(event);
const yahooCalendarLink = yahoo(event);
const office365CalendarLink = office365(event);
const icsFileLink = ics(event);
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
