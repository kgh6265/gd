<script setup lang="ts">
const props = defineProps(["error"]);
</script>

<template>
  <div>
    <NuxtLayout>
      <div class="p-10 md:p-20 lg:p-40 max-w-[1600px] m-auto">
        <h1 class="mt-20 lg:mt-0 text-5xl lg:text-6xl mb-10">{{ error.statusCode }}</h1>
        <img
          src="https://http.cat/{{ error.statusCode }}"
          alt="Error"
          class="w-full max-w-[500px] h-auto mb-20 rounded-lg shadow"
        />
        <p class="mt-20 text-2xl">Something's not right.</p>
        <NuxtLink to="/" class="mt-20 text-2xl border-b hover:text-zinc-500 hover:border-zinc-500 transition:colors duration-200"
          >Go back home?</NuxtLink
        >
      </div>
    </NuxtLayout>
  </div>
</template>
