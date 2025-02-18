<template>
  <div id="vision-boards" class="p-10 md:p-20 lg:p-40 max-w-[1600px] m-auto">
    <h1 class="text-5xl lg:text-6xl mb-10">Vision Boards</h1>
    <span class="block text-base lg:text-xl mt-10 mb-20 max-w-[800px]">
      On January 29, 2025, the <b>Graphic Design Club</b> and the
      <a
        href="https://www.linkedin.com/company/wieritdubai/posts/?feedView=all"
        target="_blank"
        class="underline font-bold"
        >Women in Engineering Club</a
      >
      hosted the first event of the semester, the
      <NuxtLink to="/events/vision-board-workshop" class="underline"
        >Vision Board Workshop</NuxtLink
      >, where participants could design their dreams, create their vision, and shape their future with vision boards. <br /><br />Check out the cool vision boards people made!
    </span>
    <div>
      <div class="hover:scale-110 transition-transform duration-200">
        <p class="text-xl lg:text-3xl text-right mt-2 text-zinc-300 mb-2">
          Mira Ismail
        </p>
        <img src="/visionboards/2.png" class="" />
      </div>
      <div
        class="mt-10 lg:mt-20 hover:scale-110 transition-transform duration-200"
      >
        <p class="text-xl lg:text-3xl text-right mt-2 text-zinc-300 mb-2">
          Aicha Malouche
        </p>
        <img src="/visionboards/4.png" class="" />
      </div>
      <div
        class="mt-10 lg:mt-20 hover:scale-110 transition-transform duration-200"
      >
        <p class="text-xl lg:text-3xl text-right mt-2 text-zinc-300 mb-2">
          Ayesha Khan
        </p>
        <img src="/visionboards/1.png" class="" />
      </div>
      <div
        class="mt-10 lg:mt-20 hover:scale-110 transition-transform duration-200"
      >
        <p class="text-xl lg:text-3xl text-right mt-2 text-zinc-300 mb-2">
          Malak Mahmoud
        </p>
        <img src="/visionboards/3.png" class="" />
      </div>
      <div
        class="mt-10 lg:mt-20 hover:scale-110 transition-transform duration-200"
      >
        <p class="text-xl lg:text-3xl text-right mt-2 text-zinc-300 mb-2">
          Mariam Mahmoud
        </p>
        <img src="/visionboards/5.png" class="w-full" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "vision-board",
});

useSeoMeta({
  title: "Vision Boards",
  description:
    "View the vision boards from Vision Board Workshop hosted by the Graphic Design Club and the Women in Engineering Club, where participants could design their dreams, create their vision, and shape their future with vision boards.",
  ogTitle: "Vision Boards",
  ogDescription:
    "View the vision boards from Vision Board Workshop hosted by the Graphic Design Club and the Women in Engineering Club, where participants could design their dreams, create their vision, and shape their future with vision boards.",
  ogImage: "https://gdclub.ritdubai.ae/visionboards/cover.png",
});
</script>

<style scoped></style>
