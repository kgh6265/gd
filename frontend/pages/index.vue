<template>
  <div class="h-screen">
    <Nav />
    <div
      id="main"
      class="p-5 md:p-10 lg:p-20 w-full h-screen flex justify-center items-center absolute top-0 z-0"
    >
      <!-- <h1 class="text-8xl font-bold mt-10">The Graphic Design Club</h1> -->
      <svg
        width="972"
        height="300"
        viewBox="0 0 972 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="mt-20 relative self-center"
      >
        <text
          fill="white"
          xml:space="preserve"
          style="white-space: pre"
          font-family="PP Editorial"
          font-size="64"
          letter-spacing="0em"
        >
          <tspan x="98" y="59.56">The</tspan>
        </text>
        <text
          fill="white"
          xml:space="preserve"
          style="white-space: pre"
          font-family="PP Editorial"
          font-size="128"
          font-weight="800"
          letter-spacing="0em"
        >
          <tspan x="0" y="147.12">Graphic Design&#10;</tspan>
        </text>
        <text
          fill="white"
          xml:space="preserve"
          style="white-space: pre"
          font-family="PP Editorial"
          font-size="128"
          font-style="italic"
          letter-spacing="0em"
        >
          <tspan x="681" y="266.12">Club</tspan>
        </text>
      </svg>

      <!-- <span class="w-40 h-1 bg-[#f46530] block mt-10"></span> -->
      <!-- <p class="text-2xl mt-20">
          Embark on a relentless pursuit of excellence with us.<br />
          Shape the future of design with creativity & precision.
        </p> -->
    </div>
    <div id="tagline-text" class="mt-[90vh]">
      <p
        class="uppercase p-2 text-[11px] md:text-sm lg:text-lg text-center text-zinc-500"
      >
        Embark on a relentless pursuit of excellence with us. Shape the future
        of design with creativity & precision.
      </p>
    </div>
    <div id="about" class="p-10 md:p-20 lg:p-40 max-w-[1600px] m-auto">
      <div class="flex flex-col lg:flex-row justify-center gap-48 mt-20">
        <div>
          <h2 class="text-4xl lg:text-5xl mb-10">About Us</h2>
          <p class="text-xl lg:text-2xl max-w-xl">
            We are RIT Dubai's pioneering departmental club dedicated to
            igniting passion and harnessing the power of liberal arts among our
            students.
          </p>
          <h3 class="text-2xl lg:text-3xl mt-20">Vision</h3>
          <p class="text-xl lg:text-2xl mt-5 max-w-xl">
            To transform students' perspectives on liberal arts, highlighting
            its crucial role in uniting societies and fostering long-term
            cultural impact.
          </p>
          <h3 class="text-2xl lg:text-3xl mt-20">Core Values</h3>
          <p class="text-xl lg:text-2xl mt-5 max-w-xl">
            Our core values include collaboration, inclusivity, passion,
            lifelong learning, and empowerment.
          </p>
          <p class="text-md lg:text-lg mt-20 max-w-2xl">
            In just one semester, we proudly showcased 20 remarkable faculty and
            student spotlights, highlighting our outstanding achievements.
          </p>
        </div>
        <div class="-mt-20 lg:mt-0">
          <img
            src="/clubsday.jpg"
            alt="Clubs Day"
            class="rounded-xl rotate-3 h-auto max-w-[1/5] lg:max-w-lg transition delay-75 hover:rotate-6"
            loading="lazy"
          />
          <img
            src="/gamedesignworkshop.jpg"
            alt="Game Design Basics Workshop"
            class="rounded-xl -rotate-3 -mt-18 lg:-mt-36 h-auto max-w-[1/5] lg:max-w-lg transition delay-75 hover:rotate-6"
            loading="lazy"
          />
          <img
            src="/ethnicday.jpg"
            alt="Ethnic Day"
            class="rounded-xl rotate-2 -mt-18 lg:-mt-36 h-auto max-w-[1/5] lg:max-w-lg transition delay-75 relative z-10 hover:rotate-6"
            loading="lazy"
          />
        </div>
      </div>
    </div>
    <div id="magazines" class="p-10 md:p-20 lg:p-40 max-w-[1600px] m-auto">
      <h2 class="text-4xl lg:text-5xl mb-10 text-[#C4D600] mt-20 lg:mt-0">
        E-magazines
      </h2>
      <p class="text-xl lg:text-2xl mb-10">
        Read our e-magazine, Palette Perspectives, with six amazing issues
        published every semester.<br /><span class="text-zinc-500"
          >(click to read, opens in a new tab)</span
        >
      </p>
      <!-- input drop down for spring 2024 and fall 2024 -->
      <UTabs
        :items="magazineTabs"
        :ui="{
          list: {
            background: 'bg-zinc-900 dark:bg-zinc-900',
            width: 'w-auto',
            marker: {
              background: 'bg-[#7D55C7] dark:bg-[#7D55C7]',
            },
          },
        }"
      >
        <template #fall2024="{ item }">
          <MagazineList :magazines="magazineData.fall2024" />
        </template>
        <template #spring2024="{ item }">
          <MagazineList :magazines="magazineData.spring2024" />
        </template>
      </UTabs>
    </div>
    <div id="events" class="p-10 md:p-20 lg:p-40 max-w-[1600px] m-auto">
      <h2 class="text-4xl lg:text-5xl mb-10 text-[#84BD00] mt-20 lg:mt-0">
        Events
      </h2>
      <UTabs
        :items="eventTabs"
        :ui="{
          list: {
            background: 'bg-zinc-900 dark:bg-zinc-900',
            width: 'w-auto',
            marker: {
              background: 'bg-[#7D55C7] dark:bg-[#7D55C7]',
            },
          },
        }"
      >
        <template #upcoming="{ item }">
          <EventList :events="events.upcomingEvents" />
        </template>
        <template #past="{ item }">
          <EventList :events="events.pastEvents" />
        </template>
      </UTabs>
    </div>
    <div id="members" class="p-10 md:p-20 lg:p-40 max-w-[1600px] m-auto">
      <h2 class="text-4xl lg:text-5xl mb-10 text-[#009CBD] mt-20 lg:mt-0">
        Meet the Team
      </h2>
      <Members :members="members" />
    </div>
    <div id="Contact" class="p-10 md:p-20 lg:p-40 max-w-[1600px] m-auto">
      <h2 class="text-4xl lg:text-5xl mb-10 text-[#DA291C] mt-20 lg:mt-0">
        Contact
      </h2>
      <div class="lg:flex justify-start gap-10">
        <div>
          <div
            style="
              max-width: 100%;
              list-style: none;
              transition: none;
              overflow: hidden;
            "
            class="rounded-lg w-96 h-96"
          >
            <div
              id="display-google-map"
              style="height: 100%; width: 100%; max-width: 100%"
            >
              <iframe
                style="height: 100%; width: 100%; border: 0"
                frameborder="0"
                src="https://www.google.com/maps/embed/v1/place?q=Rochester+Institute+of+Technology+-+Dubai+(RIT+Dubai)+-+Dubai+-+United+Arab+Emirates&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
              ></iframe>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-2xl lg:text-3xl mb-5 lg:mb-10 lg:mt-0 mt-10">
            Check out our work on our socials!
          </h3>
          <div class="flex items-center gap-2">
            <UIcon name="i-mdi-instagram" class="lg:w-10 lg:h-10 w-5 h-5" />
            <a
              href="https://www.instagram.com/ritd_gdclub"
              target="_blank"
              class="border-b border-[#7D55C7] hover:text-zinc-400 hover:border-zinc-400 transition:colors duration-200"
              ><span class="text-2xl lg:text-3xl"> Instagram </span></a
            >
          </div>
          <div class="flex items-center gap-2 mt-2 lg:mt-3">
            <UIcon name="i-mdi-linkedin" class="lg:w-10 lg:h-10 w-5 h-5" />
            <a
              href="https://www.linkedin.com/company/ritd-graphic-design-club/posts/?feedView=all"
              target="_blank"
              class="border-b border-[#7D55C7] hover:text-zinc-400 hover:border-zinc-400 transition:colors duration-200"
              ><span class="text-2xl lg:text-3xl"> LinkedIn </span></a
            >
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>

  <!--
  <div id="g_id_onload"
     data-client_id="712547148156-1suh55le5cn7piq4t5g0j7sqn8kmbfir.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-callback="handleSignInWithGoogle"
     data-nonce=""
     data-auto_prompt="false">
  </div>

  <div class="g_id_signin"
      data-type="standard"
      data-shape="rectangular"
      data-theme="filled_blue"
      data-text="signin_with"
      data-size="large"
      data-locale="en-US"
      data-logo_alignment="left">
  </div>
  -->

  <!-- <div
      id="main"
      class="p-20 w-full h-full flex justify-center bg-gradient-to-r from-orange-500 to-gray-700"
    > 
      <div>
        <span
          class="p-2"
          :style="`background-color: ${accentColor};mix-blend-mode: difference;`"
          >{{ heroSeason }}</span
        ><span
          class="p-2 mt-10"
          :style="`background-color: ${accentColor};mix-blend-mode: difference;`"
          >Issue {{ heroIssue }}</span
        >
        <h1
          class="text-8xl font-bold mt-10"
          :style="`text-decoration-color:${accentColor};`"
        >
          {{ heroTitle }}
        </h1>
        <a :href="heroUrl" target="_blank" rel="noopener noreferrer"
          class="hvr-sweep-to-top text-4xl mt-12 bg-white text-black p-2 pl-5 pr-5 uppercase"
        >
          Read Now
        </a>
      </div>
      <img
        :src="heroImg"
        :alt="heroTitle"
        :style="`border: 5px solid ${accentColor}`"
      /> -->
</template>

<script setup>
// Define different semesters for the magazine
const magazineTabs = [
  {
    slot: "fall2024",
    label: "Fall 2024",
  },
  {
    slot: "spring2024",
    label: "Spring 2024",
  },
];

// Define different tabs for the events
const eventTabs = [
  {
    slot: "upcoming",
    label: "Upcoming events",
  },
  {
    slot: "past",
    label: "Past events",
  },
];

// Get all magazine data
const { data: magazineData } = await useFetch("/api/magazines");
const { data: events } = await useFetch("/api/events");
const { data: members } = await useFetch("/api/members");
</script>

<style>
@import url("https://use.typekit.net/gmb0olm.css");

/*
font-family: "playfair-display", serif;
font-weight: 900;
font-style: normal;

font-family: "playfair-display", serif;
font-weight: 900;
font-style: italic;
*/

@font-face {
  font-family: "Geist";
  src: url("/Geist-Thin.ttf");
  font-weight: 100;
}

@font-face {
  font-family: "Geist";
  src: url("/Geist-ExtraLight.ttf");
  font-weight: 200;
}

@font-face {
  font-family: "Geist";
  src: url("/Geist-Light.ttf");
  font-weight: 300;
}

@font-face {
  font-family: "Geist";
  src: url("/Geist-Regular.ttf");
  font-weight: 400;
}

@font-face {
  font-family: "Geist";
  src: url("/Geist-Medium.ttf");
  font-weight: 500;
}

@font-face {
  font-family: "Geist";
  src: url("/Geist-SemiBold.ttf");
  font-weight: 600;
}

@font-face {
  font-family: "Geist";
  src: url("/Geist-Bold.ttf");
  font-weight: 700;
}

@font-face {
  font-family: "Geist";
  src: url("/Geist-ExtraBold.ttf");
  font-weight: 800;
}

@font-face {
  font-family: "Geist";
  src: url("/Geist-Black.ttf");
  font-weight: 900;
}

@font-face {
  font-family: "PP Editorial";
  src: url("/PPEDITORIALNEW-REGULAR.OTF") format("opentype");
}

@font-face {
  font-family: "PP Editorial";
  src: url("/PPEDITORIALNEW-ITALIC.OTF") format("opentype");
  font-style: italic;
}

@font-face {
  font-family: "PP Editorial";
  src: url("/PPEDITORIALNEW-ULTRABOLD.OTF") format("opentype");
  font-weight: 800;
}

@font-face {
  font-family: "PP Editorial";
  src: url("/PPEDITORIALNEW-ULTRABOLDITALIC.OTF") format("opentype");
  font-style: italic;
  font-weight: 800;
}

@font-face {
  font-family: "PP Editorial";
  src: url("/PPEDITORIALNEW-ULTRALIGHT.OTF") format("opentype");
  font-weight: 100;
}

@font-face {
  font-family: "PP Editorial";
  src: url("/PPEDITORIALNEW-ULTRALIGHTITALIC.OTF") format("opentype");
  font-style: italic;
  font-weight: 100;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Geist", "Inter V", "Inter",
    sans-serif;
  background-color: #030304;
  background: url("/noise-big.png") repeat scroll center/700px, #030304;
  font-display: swap;
  color: white;
  scroll-behavior: smooth;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "PP Editorial", "playfair-display", serif;
}

h2 {
  color: #f6be00;
}

#main {
  /* background: rgb(244, 101, 48);
  background: url("/noise.png") repeat fixed center/20rem,
    linear-gradient(180deg, rgb(244, 101, 48) 0%, rgb(63, 63, 63) 100%);
  border-bottom: 1px solid black; */
  background: url("/noise.png") repeat fixed center/20rem,
    url("/banner.png") no-repeat 70% 35% / 2500px;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.7);
  color: white;
}

#main h1,
#main p {
  text-shadow: 0px 0px 2.2px rgba(0, 0, 0, 0.02),
    0px 0px 5.3px rgba(0, 0, 0, 0.028), 0px 0px 10px rgba(0, 0, 0, 0.035),
    0px 0px 17.9px rgba(0, 0, 0, 0.042), 0px 0px 33.4px rgba(0, 0, 0, 0.05),
    0px 0px 80px rgba(0, 0, 0, 0.07);
}

.hvr-sweep-to-top {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}

.hvr-sweep-to-top:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  -webkit-transform: scaleY(0);
  transform: scaleY(0);
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}

.hvr-sweep-to-top:hover,
.hvr-sweep-to-top:focus,
.hvr-sweep-to-top:active {
  color: white;
}

.hvr-sweep-to-top:hover:before,
.hvr-sweep-to-top:focus:before,
.hvr-sweep-to-top:active:before {
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
}

.map-generator {
  max-width: 100%;
  max-height: 100%;
  background: none;
}
</style>
