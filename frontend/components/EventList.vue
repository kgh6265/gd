<template>
  <div class="">
    <p
      v-if="!events || events.length === 0"
      class="mt-5 text-8xl lg:text-9xl text-zinc-500"
    >
      ( ͡° ʖ̯ ͡°)
    </p>
    <p
      v-if="!events || events.length === 0"
      class="mt-2 ml-[20px] text-lg lg:text-xl text-zinc-500 italic"
    >
      No upcoming events. Stay tuned!
    </p>
    <div v-else class="mt-5 mb-10 space-y-10">
      <div
        v-for="event in events"
        :key="event.id"
        class="flex items-center p-1 rounded-lg"
      >
        <div class="w-2/5 xl:w-1/5 text-sm lg:text-lg text-left self-start text-zinc-300">
          {{ formatDate(event.date) }}<br /><span v-if="event.location">{{
            event.location
          }}</span>
        </div>
        <div class="w-3/5 xl:w-4/5">
          <p class="text-xl lg:text-2xl font-bold text-[#d0b7ff] transition-colors">
            {{ event.title }}
          </p>
          <p class="text-sm lg:text-lg mt-2 max-w-xl">{{ event.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["events"]);

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
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
