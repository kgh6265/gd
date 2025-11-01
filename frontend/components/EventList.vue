<template>
  <div class="">
    <div>
      <USkeleton
        v-if="!events"
        class="mt-5 w-[30%] h-[20px]"
        :ui="{ rounded: 'rounded-xl' }"
      />
      <USkeleton
        v-if="!events"
        class="mt-5 w-[50%] h-[20px]"
        :ui="{ rounded: 'rounded-xl' }"
      />
      <USkeleton
        v-if="!events"
        class="mt-5 w-[30%] h-[20px]"
        :ui="{ rounded: 'rounded-xl' }"
      />
      <USkeleton
        v-if="!events"
        class="mt-5 w-[50%] h-[20px]"
        :ui="{ rounded: 'rounded-xl' }"
      />
    </div>
    <p
      v-if="events.length === 0"
      class="mt-5 text-8xl lg:text-9xl text-zinc-500"
    >
      ( ͡° ʖ̯ ͡°)
    </p>
    <p
      v-if="events.length === 0"
      class="mt-2 ml-[20px] text-lg lg:text-xl text-zinc-500 italic"
    >
      No upcoming events. Stay tuned!
    </p>
    <div v-else class="mt-5 mb-10 space-y-10" v-if="!events.failed">
      <div
        v-for="event in events"
        :key="event.id"
        class="flex items-center p-1 rounded-lg"
      >
        <div
          class="w-2/5 xl:w-1/5 text-sm lg:text-lg text-left self-start text-zinc-300"
        >
          {{ formatDate(event.date) }}<br />{{ iso8601ToTime(event.date)
          }}<br /><span v-if="event.location">{{ event.location }}</span>
        </div>
        <div class="w-3/5 xl:w-4/5">
          <NuxtLink class="underline" :to="`/events/${event.eventId}`">
            <p
              class="text-xl lg:text-2xl font-bold text-[#d0b7ff] transition-colors"
            >
              {{ event.title }}
            </p>
          </NuxtLink>
          <p class="text-sm lg:text-lg mt-2 max-w-xl">
            {{ event.description }}
          </p>
          <p
            v-if="allowRegistration === true"
            class="text-sm lg:text-lg mt-6 w-fit"
          >
            <NuxtLink
              class="text-black bg-[#d0b7ff] py-2 px-4 rounded-lg"
              :to="`/events/${event.eventId}`"
              >More info</NuxtLink
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["events", "allowRegistration"]);

// Sort events by date
if (props.allowRegistration === true) {
  props.events.sort((a, b) => new Date(a.date) - new Date(b.date));
} else {
  props.events.sort((a, b) => new Date(b.date) - new Date(a.date));
}

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

const iso8601ToTime = (isoTimestamp) => {
  // Create a Date object from the ISO timestamp
  const utcDate = new Date(isoTimestamp);

  // Get UTC hours
  const utcHours = utcDate.getUTCHours();

  // Check if the input is already in UAE time (+4)
  const isUAE =
    (utcHours >= 0 && utcHours < 4) || (utcHours >= 8 && utcHours < 20);

  // If already in UAE time, return the original time
  if (isUAE) {
    const options = { hour: "2-digit", minute: "2-digit" };
    return utcDate.toLocaleString("en-US", options);
  }

  // Calculate UAE time if not already in UAE time zone
  const uaeTime = new Date(utcDate.getTime() + 4 * 60 * 60 * 1000);

  // Format the UAE date and time as hours:minutes with 2 digits each
  const options = { hour: "2-digit", minute: "2-digit" };
  return uaeTime.toLocaleString("en-US", options);
};
</script>

<style scoped>
.event {
  /* From https://css.glass */
  background: rgba(125, 85, 199, 0.7);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(125, 85, 199, 0.3);
}
</style>
