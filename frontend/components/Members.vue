<template>
  <div class="flex mt-5 justify-between gap-x-1 gap-y-10 w-auto flex-wrap flex-grow">
    <USkeleton v-if="!members" class="w-full md:w-[45%] lg:w-[30%] h-48" :ui="{ rounded: 'rounded-xl' }" />
    <USkeleton v-if="!members" class="w-full md:w-[45%] lg:w-[30%] h-48" :ui="{ rounded: 'rounded-xl' }" />
    <USkeleton v-if="!members" class="w-full md:w-[45%] lg:w-[30%] h-48" :ui="{ rounded: 'rounded-xl' }" />

    <div v-if="members" v-for="member in members" :key="member.id" class="w-full md:w-[45%] lg:w-[30%] p-0">
      <HoverCard>
        <UCard
          class="max-w-sm"
          :ui="{
            background: 'bg-[#7D55C7] dark:bg-[#7D55C7]',
            divide: 'divide-y-0',
            ring: 'ring-0'
          }"
        >
          <template #header>
            <div class="flex items center">
              <div
                v-if="member.avatar"
                :style="{ backgroundImage: `url(${member.avatar.url})` }"
                class="w-16 h-16 rounded-full bg-cover bg-top mr-4"
                :alt="member.name"
              ></div>
              <div>
                <h4 class="text-xl lg:text-2xl">{{ member.name }}</h4>
                <p class="text-sm lg:text-lg">{{ member.position }}</p>
              </div>
            </div>
          </template>

          <p class="text-sm lg:text-lg">{{ member.description }}</p>
        </UCard>
      </HoverCard>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["members"]);
</script>

<style scoped></style>
