<template>
  <div id="event" class="p-10 md:p-20 lg:p-40 max-w-[1600px] m-auto">
    <p
      v-if="event.data === null"
      class="text-xl lg:text-2xl mb-10 max-w-[800px] text-white"
    >
      We couldn't find that event, maybe
      <NuxtLink to="/" class="underline">go home</NuxtLink>?
    </p>
    <div v-else>
      <img
        v-if="event.image_url"
        :src="event.image_url"
        alt="Event Image"
        class="w-full max-w-[500px] h-auto mb-20 rounded-lg shadow"
      />
      <h2 class="text-4xl lg:text-5xl mb-10 text-[#d0b7ff] font-bold">
        {{ event.title }}
      </h2>
      <p class="text-xl lg:text-2xl mb-10 max-w-[800px] text-white">
        {{ event.description }}
      </p>
      <div class="event-details">
        <h3 class="text-2xl lg:text-2xl text-zinc-300 font-bold">Date</h3>
        <p class="text-xl lg:text-2xl text-white">
          {{ formatDate(event.date) }}
        </p>

        <h3 class="text-2xl lg:text-2xl text-zinc-300 font-bold mt-10">Time</h3>
        <p class="text-xl lg:text-2xl text-white">
          {{ iso8601ToTime(event.date) }}
        </p>

        <!-- <ClientOnly>
          <AddToCalendar
            :name="event.title"
            :location="event.location"
            :details="event.description"
            :startsAt="event.date"
          />
        </ClientOnly> -->

        <h3
          class="text-2xl lg:text-2xl text-zinc-300 font-bold mt-10"
          v-if="event.location"
        >
          Location
        </h3>
        <p class="text-xl lg:text-2xl text-white" v-if="event.location">
          {{ event.location }}
        </p>
        <p class="text-sm mt-20">
          <span class="text-zinc-500"
            >You will have to login with your RIT account</span
          >
        </p>
        <button
          v-if="event.allow_registration === true"
          class="lg:text-xl mt-2 w-fit text-black bg-[#d0b7ff] py-2 px-4 rounded-lg text-lg"
          @click="register"
        >
          Register
        </button>
      </div>
      <Transition name="fade">
        <div
          class="event-registration mt-10 py-10 px-10 backdrop-blur rounded-lg border border-zinc-500 max-w-[800px]"
          v-if="showRegistration === true"
        >
          <p class="error text-xl text-red-500 mt-4" v-if="error">
            Something went wrong, try again?
          </p>
          <div v-if="!isConfirmed && !error">
            <p>
              {{ event.title }}<br />{{ formatDate(event.date) }}<br />{{
                iso8601ToTime(event.date)
              }}
            </p>

            <p class="text-2xl lg:text-2xl text-zinc-300 font-bold mt-10">
              Name
            </p>
            <p class="text-xl lg:text-2xl text-white">
              {{ user?.user_metadata.full_name }}
            </p>

            <p class="text-2xl lg:text-2xl text-zinc-300 font-bold mt-10">
              Email
            </p>
            <p class="text-xl lg:text-2xl text-white">
              {{ user?.email }}
            </p>
            <p class="text-sm lg:text-lg text-zinc-300">
              A confirmation email will be sent to this address.
            </p>
            <!-- <button
            class="bg-green-400 text-black py-2 px-4 rounded-lg text-xl mt-10 flex content-between items-center"
            @click="confirmRegistration"
          >
            <UIcon name="i-material-symbols-check" class="w-7 h-7" />
            <span class="ml-2">Confirm registration</span>
          </button> -->
            <UButton
              icon="i-material-symbols-check"
              size="xl"
              color="green"
              variant="solid"
              label="Confirm registration"
              :trailing="false"
              :loading="isRegistering"
              class="mt-10"
              @click="confirmRegistration"
            />
          </div>
          <div v-if="isConfirmed && !error">
            <p class="text-xl lg:text-2xl">
              You've {{ registrationWording }} registered! 🎉
            </p>
            <p class="text-lg lg:text-xl mt-2">See you there!</p>
            <img
              src="/cat.jpg"
              alt="Cat"
              class="w-full h-auto mt-10 rounded-lg"
            />
          </div>
        </div>
      </Transition>
    </div>
    <div
      class="all-registrations max-w-[800px]"
      v-if="showAllRegistrations === true"
    >
      <div
        class="mt-20 w-full h-px bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900"
      ></div>
      <h3 class="mt-20 text-3xl lg:text-4xl">View registrations</h3>
      <!-- create a table for all registrations with avatar url, name, email -->
      <div>
        <!-- number of registrations -->
        <p class="text-lg lg:text-lg mt-10 text-zinc-300">
          <span class="text-7xl font-black text-white">{{
            allRegistrations.length
          }}</span>
          registrations
        </p>
        <table class="mt-10 w-full">
          <thead>
            <tr
              class="text-zinc-300 border-b border-zinc-500 py-4 text-sm lg:text-lg"
            >
              <th class="text-left py-2"></th>
              <th class="text-left py-2">Name</th>
              <th class="text-left py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            <div v-if="allRegistrations.length === 0">
              <p class="mt-5 text-8xl lg:text-9xl text-zinc-500">( ͡° ʖ̯ ͡°)</p>
              <p class="mt-2 ml-[20px] text-lg lg:text-xl text-zinc-500 italic">
                No registrations yet! What are you waiting for, share the word!
                📢
              </p>
            </div>
            <tr
              v-for="registration in allRegistrations"
              :key="registration.id"
              class="border-b border-zinc-500 text-sm lg:text-lg"
            >
              <td>
                <img
                  :src="registration.avatar_url"
                  alt="Avatar"
                  class="w-10 h-10 rounded-full hidden md:block lg:block"
                />
              </td>
              <td class="py-4">{{ registration.name }}</td>
              <td class="py-4" @click="useCopyToClipboard(registration.email)">
                {{ registration.email }}
              </td>
              <td class="py-4">
                <a :href="'mailto:' + registration.email">Send email</a>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-right text-sm lg:text-sm mt-2 text-zinc-300">
          Showing {{ allRegistrations.length }} record(s)
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Get route event ID info
const route = useRoute();
const eventId = route.params.id;
const supabase = useSupabaseClient();

const user = ref(null);
const showRegistration = ref(false);
const isConfirmed = ref(false);
const isRegistering = ref(false);
const phone = ref(null);
const registrationWording = ref("been succesfully");
const error = ref(null);
const showAllRegistrations = ref(false);
const allRegistrations = ref(null);
const clipboardText = ref(null);

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

const iso8601ToTime = (iso) => {
  // Timestamp is already in the right timezone, so we need to remove the Z
  const localTime = new Date(iso.replace("Z", ""));
  return localTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const iso8601ToTimestamp = (iso) => {
  return new Date(iso).getTime();
};

// Get event details
const { data: event } = await useAsyncData("event", async () => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("event_id", eventId)
    .limit(1)
    .single();

  if (error) {
    console.error(error);
    return {};
  } else {
    return data;
  }
});

// Add page metadata
useHead({
  title: event.value ? event.value.title : "Event",
  meta: [
    {
      name: "description",
      content: event.value ? event.value.description : "Event",
    },
  ],
});

const register = async () => {
  // Get the user
  const supabaseUser = useSupabaseUser();
  if (!supabaseUser.value) {
    await navigateTo({ name: "login", query: { redirect: `/events/${eventId}` } });
  }

  // Check if the user is already registered
  const { data: registrations, error } = await supabase
    .from("event_registrations")
    .select("*")
    .eq("user_id", supabaseUser.value.id)
    .eq("event_id", eventId)
    .limit(1)
    .single();

  if (error) {
    console.error(error);
    showRegistration.value = true;
  }

  if (registrations) {
    showRegistration.value = true;
    isConfirmed.value = true;
    registrationWording.value = "already been";
    return;
  }

  // Show the registration form
  showRegistration.value = true;

  // Send data back
  user.value = supabaseUser.value;
};

const confirmRegistration = async () => {
  // Get the user
  const supabaseUser = useSupabaseUser();
  if (!supabaseUser.value) {
    await navigateTo("/login");
  }

  // Button loading state
  isRegistering.value = true;

  // Get the user ID
  const userId = supabaseUser.value.id;
  const email = supabaseUser.value.email;
  const name = supabaseUser.value.user_metadata.full_name;
  const avatar = supabaseUser.value.user_metadata.avatar_url;

  // Insert the registration
  const { error } = await supabase.from("event_registrations").insert([
    {
      user_id: userId,
      avatar_url: avatar,
      name: name,
      email: email,
      event_id: eventId,
    },
  ]);

  if (error) {
    console.error(error);
    error.value = true;
    isRegistering.value = false;
  } else {
    isConfirmed.value = true;
    isRegistering.value = false;
  }
};

// 1. Create a table called staff_members with relations to users
// 2. Only accessible to users with the role of staff
// 3. Fetch the staff members and check if the current user is in the list based on email
// 4. If the user is in the list, show the registrations

// Get the user
const supabaseUser = useSupabaseUser();
if (supabaseUser.value) {
  user.value = supabaseUser.value;

  const { data: staffMembers } = await useAsyncData(
    "staffMembers",
    async () => {
      const { data, error } = await supabase
        .from("staff_members")
        .select("*")
        .eq("email", user.value.email);

      if (error) {
        console.error(error);
        return {};
      } else {
        return data;
      }
    }
  );

  if (
    staffMembers.value &&
    staffMembers.value !== null &&
    staffMembers.value.length > 0
  ) {
    showAllRegistrations.value = true;

    // Get the whole event_registrations, only accessible to staff
    const { data: registrations } = await useAsyncData(
      "registrations",
      async () => {
        const { data, error } = await supabase
          .from("event_registrations")
          .select("*")
          .eq("event_id", eventId);

        if (error) {
          console.error(error);
          return {};
        } else {
          return data;
        }
      }
    );

    allRegistrations.value = registrations.value;
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
