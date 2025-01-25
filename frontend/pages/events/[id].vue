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
    <div class="all-registrations" v-if="showAllRegistrations === true">
      <div
        class="mt-20 w-full h-px bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900"
      ></div>
      <h2 class="mt-20 mb-20 text-3xl lg:text-4xl">All registrations</h2>
      <!-- create a table for all registrations with avatar url, name, email -->
      <div class="mt-20" v-if="allRegistrations === null">
        <p class="mt-5 text-8xl lg:text-9xl text-zinc-500">( ͡° ʖ̯ ͡°)</p>
        <p class="mt-2 ml-[20px] text-lg lg:text-xl text-zinc-500 italic">
          No registrations yet! What are you waiting for, share the word! 📢
        </p>
      </div>
      <div v-else>
        <!-- number of registrations -->
        <p class="text-lg lg:text-lg mt-10 text-zinc-300 font-bold">
          Registrations <br />
          <span class="text-5xl lg:text-9xl ml-[-5px] font-black text-white">{{
            allRegistrations.length
          }}</span>
          
        </p>

        <div class="max-w-[800px] mt-20">
          <Bar :options="{ responsive: true }" :data="chartData" />
        </div>

        <div class="options mt-20 flex justify-end gap-3 flex-wrap">
          <UButton
            color="purple"
            variant="outline"
            icon="i-heroicons-clipboard-document"
            @click="copyEmailString()"
            label="Copy emails"
            :disabled="selectedRegistrations.length === 0"
          />
          <UButton
            color="purple"
            variant="outline"
            icon="i-heroicons-envelope"
            @click="sendEmails()"
            label="Send emails"
            :disabled="selectedRegistrations.length === 0"
          />
          <UButton
            color="purple"
            variant="solid"
            icon="i-heroicons-arrow-path-rounded-square-solid"
            @click="getAllRegistrations()"
            label="Refresh"
            :loading="isRefreshing"
          />
        </div>

        <UTable
          class="mt-4 border-t border-zinc-700 pt-b"
          v-model="selectedRegistrations"
          :columns="[
            {
              key: 'id',
              label: 'ID',
            },
            {
              key: 'name',
              label: 'Name',
            },
            {
              key: 'email',
              label: 'Email',
            },
            {
              key: 'Registered on',
              label: 'Registered on',
            },
            {
              key: 'User ID',
              label: 'User ID',
            },
            {
              key: 'actions',
            },
          ]"
          :rows="allRegistrations"
          :ui="{
            tr: {
              selected: 'bg-purple-300 dark:purple-300',
            },
            th: {
              color: 'text-zinc-300 dark:text-zinc-300',
            },
            td: {
              color: 'text-white dark:text-white',
            },
            checkbox: 'accent-purple-300 dark:accent-purple-300',
            default: {
              checkbox: {
                color: 'purple',
              },
            },
          }"
        >
          <template #actions-data="{ row }">
            <UButton
              color="white"
              variant="ghost"
              icon="i-heroicons-envelope"
              @click="sendEmail(row.email)"
            />
          </template>
        </UTable>
        <!-- <table class="mt-10 w-full" id="regs">
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
        </table> -->
        <p
          class="text-right text-sm lg:text-sm mt-2 text-zinc-300 border-t border-zinc-700 pt-2"
        >
          <span v-if="selectedRegistrations.length > 0">
            Selected {{ selectedRegistrations.length }} record(s)
          </span>
          <span v-else> Showing {{ allRegistrations.length }} record(s) </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import ChartJS
import { Bar } from "vue-chartjs";

// Get route event ID info
const route = useRoute();
const eventId = route.params.id;
const supabase = useSupabaseClient();
const toast = useToast();

const user = ref(null);
const showRegistration = ref(false);
const isConfirmed = ref(false);
const isRegistering = ref(false);
const phone = ref(null);
const registrationWording = ref("been succesfully");
const error = ref(null);
const showAllRegistrations = ref(false);
const allRegistrations = ref(null);
const selectedRegistrations = ref([]);
const isRefreshing = ref(false);
const chartData = ref({});

const sendEmail = (email) => {
  window.open(`mailto:${email}`);
};

const copyEmailString = () => {
  const emails = selectedRegistrations.value.map(
    (registration) => registration.email
  );
  const emailString = emails.join(", ");
  navigator.clipboard.writeText(emailString);
  toast.add({ title: "Copied emails to clipboard!" });
};

const sendEmails = () => {
  const emails = selectedRegistrations.value.map(
    (registration) => registration.email
  );
  const emailString = emails.join(", ");
  window.open(`mailto:?subject=${event.value.title}&bcc=${emailString}`);
};

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

function copyTableToClipboard(tableId) {
  const table = document.getElementById(tableId);

  if (!table) {
    console.error(`Table with ID "${tableId}" not found.`);
    return;
  }

  // Create a temporary textarea element
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = table.outerHTML; // Copy the entire table HTML
  document.body.appendChild(tempTextArea);

  // Select and copy the text
  tempTextArea.select();
  document.execCommand("copy");

  // Remove the temporary textarea
  document.body.removeChild(tempTextArea);
}

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
    await navigateTo({
      name: "login",
      query: { redirect: `/events/${eventId}` },
    });
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

const getAllRegistrations = async () => {
  // Set refreshing to true
  isRefreshing.value = true;

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
          isRefreshing.value = false;
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

      // Replace the title fields with appropriate fields
      allRegistrations.value = registrations.value.map((registration) => {
        return {
          id: registration.id,
          name: registration.name,
          email: registration.email,
          "Registered on": `${formatDate(
            registration.created_at
          )} ${iso8601ToTime(registration.created_at)}`,
          "User ID": registration.user_id,
        };
      });

      // Create a chart data object based on the no of registrations per day
      const registrationsPerDay = registrations.value.reduce((acc, curr) => {
        const date = new Date(curr.created_at).toLocaleDateString();
        acc[date] = acc[date] ? acc[date] + 1 : 1;
        return acc;
      }, {});

      chartData.value = {
        labels: Object.keys(registrationsPerDay),
        datasets: [
          {
            label: "Registrations",
            backgroundColor: "#d0b7ff",
            data: Object.values(registrationsPerDay),
          },
        ],
      };
    }

    // Stop refreshing visual indicator
    isRefreshing.value = false;
  }
};

// Fetch all registrations
getAllRegistrations();
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
