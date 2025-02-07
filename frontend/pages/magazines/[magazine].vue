<template>
  <div id="magazine" class="p-10 md:p-20 lg:p-40 max-w-[1600px] m-auto">
    If you haven't been redirected, click
    <a href="{{ magazine.value.url }}">here</a>.
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

await navigateTo(magazine.value.url, {
  external: true,
});
</script>

<style scoped></style>
