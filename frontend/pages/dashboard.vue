<template>
  <div id="dashboard" class="p-10 md:p-20 lg:p-40 max-w-[1600px] m-auto">
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
          <p class="text-xl lg:text-4xl">
            Hi {{ user?.user_metadata.full_name }}!
          </p>
          <p class="text-xl lg:text-2xl text-zinc-300">{{ user?.email }}</p>
        </div>
      </div>
    </div>

    <h2 class="mt-20 text-3xl lg:text-4xl">Registered events</h2>
    <div v-if="events.length === 0">
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
        You haven't registered for any events!
      </p>
    </div>
    <div
      v-for="event in events.slice().reverse()"
      :key="event.id"
      class="mt-10 flex items-center rounded-lg"
    >
      <div
        class="w-2/5 xl:w-1/5 text-sm lg:text-lg text-left self-start text-zinc-300"
      >
        {{ formatDate(event.date) }}<br />{{ iso8601ToTime(event.date)
        }}<br /><span v-if="event.location">{{ event.location }}</span>
        <!-- show badge if date is in the future -->
      </div>
      <div class="w-3/5 xl:w-4/5">
        <p
          class="text-xl lg:text-2xl font-bold text-[#d0b7ff] transition-colors"
        >
          <NuxtLink class="underline" :to="`/events/${event.event_id}`">{{
            event.title
          }}</NuxtLink>
          &nbsp;<UBadge v-if="inTheFuture(event.date)">UPCOMING</UBadge><br />
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
const inTheFuture = (date) => new Date(date) > new Date();

const signOut = async () => {
  await navigateTo("/logout");
};

// Get registered events from event_registrations and cross reference it with data from events
const { data, error } = await supabase
  .from("event_registrations")
  .select("event_id")
  .eq("user_id", user.value.id);

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

const iso8601ToTime = (isoTimestamp) => {
  // Create a Date object from the ISO timestamp
  const utcDate = new Date(isoTimestamp);

  // Get UTC hours
  const utcHours = utcDate.getUTCHours();

  // Check if the input is already in UAE time (+4)
  const isUAE = (utcHours >= 0 && utcHours < 4) || (utcHours >= 8 && utcHours < 20); 

  // If already in UAE time, return the original time
  if (isUAE) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return utcDate.toLocaleString('en-US', options); 
  }

  // Calculate UAE time if not already in UAE time zone
  const uaeTime = new Date(utcDate.getTime() + (4 * 60 * 60 * 1000)); 

  // Format the UAE date and time as hours:minutes with 2 digits each
  const options = { hour: '2-digit', minute: '2-digit' };
  return uaeTime.toLocaleString('en-US', options); 
};
</script>
