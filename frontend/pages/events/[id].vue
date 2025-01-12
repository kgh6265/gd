<template>
  <div></div>
</template>

<script setup>
const route = useRoute();

if (!route.params.id) {
  await navigateTo('/#events');
}
</script>

<style scoped></style>
