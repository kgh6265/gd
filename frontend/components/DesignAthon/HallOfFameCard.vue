<template>
  <div class="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
    <!-- Left: Info -->
    <div class="flex-1">
      <div class="flex items-center gap-4 mb-6">
        <h3 class="text-3xl lg:text-4xl text-white">
          DesignAthon {{ edition.year }}
        </h3>
        <span
          class="px-3 py-1 text-xs uppercase tracking-widest bg-[#7D55C7] text-white rounded"
        >
          {{ edition.semester }}
        </span>
      </div>
      <p class="text-zinc-400 text-lg mb-6">{{ edition.date }}</p>

      <div class="mb-8">
        <p class="text-zinc-500 text-sm uppercase tracking-wider mb-3">Podium</p>
        <div class="flex flex-col gap-2">
          <div
            v-for="winner in edition.topThree"
            :key="winner.rank"
            class="flex items-center gap-3"
          >
            <span
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              :class="{
                'bg-[#f6be00] text-black': winner.rank === 1,
                'bg-zinc-400 text-black': winner.rank === 2,
                'bg-[#b45309] text-white': winner.rank === 3,
              }"
            >
              {{ winner.rank }}
            </span>
            <span class="text-lg text-white">{{ winner.name }}</span>
          </div>
        </div>
      </div>

      <div class="flex gap-10 mb-8 text-zinc-400">
        <div v-if="edition.stats">
          <p class="text-2xl text-white font-bold">{{ edition.stats.participants }}</p>
          <p class="text-sm uppercase tracking-wider">Participants</p>
        </div>
        <div v-if="edition.stats">
          <p class="text-2xl text-white font-bold">{{ edition.stats.finalists }}</p>
          <p class="text-sm uppercase tracking-wider">Finalists</p>
        </div>
      </div>

      <NuxtLink
        :to="edition.link"
        class="text-xl text-[#d0b7ff] border-b border-[#7D55C7] hover:text-zinc-500 hover:border-zinc-500 transition-colors duration-200 pb-1"
      >
        View {{ edition.year }} Hall of Fame →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  edition: {
    type: Object,
    required: true,
  },
});
</script>
