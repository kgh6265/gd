<template>
  <div id="magazine" class="p-10 md:p-20 lg:p-40 max-w-[1600px] m-auto">
    <ULink
      to="/#magazines"
      active-class="text-primary underline"
      inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline"
      class="mb-10"
    >
      Back to magazines
    </ULink>
    <h1 class="text-3xl lg:text-6xl mt-10 mb-10">
      Issue {{ magazine.issue }} - {{ magazine.season }}
    </h1>
    <!-- add external link using UButton to read it -->
    <NuxtLink :to="magazine.url" target="_blank" rel="noopener noreferrer">
      <UButton
        v-if="magazine.url"
        class="mb-5 lg:mb-10 float-right"
        size="lg"
        icon="i-ic-baseline-launch"
        variant="outline"
      >
        Read magazine in a new tab
      </UButton>
    </NuxtLink>
    <div>
      <iframe
        v-if="magazine && magazine.url"
        :src="embedUrl(magazine.url)"
        width="100%"
        height="1080px"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const magazineId = route.params.magazine;
const [_semester, issue] = magazineId.split("-");
const semester = _semester.replace(
  /(fall|spring|summer|winter)(\d{4})/i,
  (match, season, year) =>
    `${season.charAt(0).toUpperCase() + season.slice(1)} ${year}`
);

const supbase = useSupabaseClient();
const { data: magazine } = await useAsyncData("magazine", async () => {
  const { data, error } = await supbase
    .from("magazines")
    .select("*")
    .eq("season", semester)
    .eq("issue", issue)
    .not("published_at", "is", null)
    .single();
  if (error) throw error;

  return data;
});

if (!magazine) {
  await navigateTo("/magazines");
}

useSeoMeta({
  title: `${semester} Issue ${issue} - ${semester}`,
  ogTitle: `${semester} Issue ${issue} - ${semester}`,
  description: `Read Issue #${issue} of Palette Perspective's ${semester} magazine.`,
  ogDescription: `Read Issue #${issue} of Palette Perspective's ${semester} magazine.`,
});

const embedUrl = (url) => {
  const fileId = url.match(/[-\w]{25,}/);
  return fileId ? `https://drive.google.com/file/d/${fileId[0]}/preview` : "";
};
</script>

<style scoped></style>
