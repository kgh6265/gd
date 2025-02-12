<template>
  <div
    class="flex justify-between mt-5 gap-x-1 gap-y-5 lg:gap-y-7 w-auto flex-wrap"
  >
    <USkeleton
      v-if="!magazines"
      class="w-[47%] lg:w-[32%] h-[350px] lg:h-[500px]"
      :ui="{ rounded: 'rounded-xl' }"
    />
    <USkeleton
      v-if="!magazines"
      class="w-[47%] lg:w-[32%] h-[350px] lg:h-[500px]"
      :ui="{ rounded: 'rounded-xl' }"
    />
    <USkeleton
      v-if="!magazines"
      class="w-[47%] lg:w-[32%] h-[350px] lg:h-[500px]"
      :ui="{ rounded: 'rounded-xl' }"
    />

    <div
      v-if="magazines"
      v-for="magazine in magazines"
      :key="magazine.issue"
      class="hover:scale-110 transition-transform duration-200 w-[47%] lg:w-[32%]"
    >
      <NuxtLink :to="`/magazines/${magazine.season.toLowerCase().split(' ').join('')}-${magazine.issue}`">
        <img
          :src="magazine.cover.url"
          :alt="magazine.title + ' Issue #' + magazine.issue"
          class="rounded-xl h-auto w-full shadow-md"
          loading="lazy"
        />
      </NuxtLink>
      <p class="text-xl lg:text-2xl text-right mt-2 text-zinc-300">
        Issue #{{ magazine.issue }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MagazineList",
  props: {
    magazines: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
