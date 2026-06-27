<template>
  <div class="flex items-start gap-5 p-5 rounded-lg transition-colors duration-200 hover:bg-zinc-900/50">
    <div
      class="w-10 h-10 rounded-lg bg-[#7D55C7] flex items-center justify-center shrink-0 mt-1"
    >
      <UIcon :name="icon" class="w-5 h-5 text-white" />
    </div>
    <div>
      <h4 class="text-lg lg:text-xl mb-1">{{ title }}</h4>
      <p class="text-sm lg:text-base text-zinc-400 leading-relaxed">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
