<template>
  <div id="dashboard" class="p-14 md:p-20 lg:p-40 max-w-[1600px] m-auto">
    <h1 class="text-5xl lg:text-6xl mb-10">Dashboard</h1>
    <!-- <p class="text-xl lg:text-2xl max-w-xl">View your past and upcoming registered events.</p> -->
    <div class="user">
      <div class="flex flex-start items-start">
        <div
          :style="{ backgroundImage: `url(${user.user_metadata.avatar_url})` }"
          class="w-14 h-14 rounded-full shadow-lg bg-cover bg-center"
          :alt="user?.user_metadata.full_name"
        ></div>
        <div class="ml-4">
          <p class="text-3xl lg:text-4xl">
            Hi {{ user?.user_metadata.full_name }}!
          </p>
          <p class="text-xl lg:text-2xl text-zinc-300">{{ user?.email }}</p>
        </div>
      </div>
    </div>

    <h2 class="mt-20 text-3xl lg:text-4xl">Registered events</h2>

    <div
      v-for="event in events"
      :key="event.id"
      class="mt-10 flex items-center rounded-lg"
    >
      <div
        class="w-2/5 xl:w-1/5 text-sm lg:text-lg text-left self-start text-zinc-300"
      >
        {{ formatDate(event.date) }}<br />{{ iso1806ToTime(event.date)
        }}<br /><span v-if="event.location">{{ event.location }}</span>
      </div>
      <div class="w-3/5 xl:w-4/5">
        <p
          class="text-xl lg:text-2xl font-bold text-[#d0b7ff] transition-colors"
        >
          <NuxtLink :to="`/events/${event.event_id}`">{{
            event.title
          }}</NuxtLink>
        </p>
        <p class="text-sm lg:text-lg mt-2 max-w-xl">
          {{ event.description }}
        </p>
      </div>
    </div>

    <button
      class="bg-red-400 text-black py-2 px-4 rounded-lg text-xl mt-20 flex content-between items-center"
      @click="signOut"
    >
      Sign out!
    </button>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const events = ref(null);

const signOut = async () => {
  await navigateTo("/logout");
};

// Get registered events from event_registrations and cross reference it with data from events
const { data, error } = await supabase
  .from("event_registrations")
  .select("event_id")
  .eq("user_id", user.value.id);

console.log(data);

if (error) {
  console.error("Error fetching registered events", error);
}

// Get the event details for each event_id
const eventIds = data.map((event) => event.event_id);
const { data: eventsData, error: eventsError } = await supabase
  .from("events")
  .select("*")
  .in("event_id", eventIds);

if (eventsError) {
  console.error("Error fetching event details", eventsError);
}

// Remove entries where published_at = null
events.value = eventsData.filter((event) => event.published_at !== null);

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

const iso1806ToTime = (iso) => {
  // Timestamp is already in the right timezone, so we need to remove the Z
  const localTime = new Date(iso.replace("Z", ""));
  return localTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
