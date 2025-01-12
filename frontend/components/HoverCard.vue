<template>
  <div
    class="card"
    @mousemove="handleMouseMove"
    @mouseleave="resetTransform"
    :style="cardStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup>
const rotationX = ref(0);
const rotationY = ref(0);
const elevation = 10;

const cardStyle = computed(() => ({
  transform: `perspective(1000px) rotateX(${rotationX.value}deg) rotateY(${rotationY.value}deg) translateZ(${elevation}px)`,
  transition:
    rotationX.value === 0 && rotationY.value === 0 ? "transform 0.2s ease" : "",
}));

const handleMouseMove = (event) => {
  const card = event.currentTarget.getBoundingClientRect();
  const centerX = card.left + card.width / 2;
  const centerY = card.top + card.height / 2;

  const deltaX = event.clientX - centerX;
  const deltaY = event.clientY - centerY;

  rotationY.value = (deltaX / (card.width / 2)) * 5;
  rotationX.value = -(deltaY / (card.height / 2)) * 5;
};

const resetTransform = () => {
  rotationX.value = 0;
  rotationY.value = 0;
};
</script>

<style scoped>
.card {
  transform-origin: center;
  transition: box-shadow 1.5s ease;
}
</style>