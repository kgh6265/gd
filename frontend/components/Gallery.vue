<template>
  <div class="flex flex-wrap">
    <div v-for="(image, index) in images" :key="index" class="relative w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-1 box-border">
      <img :src="image.src" :alt="image.alt" class="w-full h-auto block" />
      <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
        {{ image.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
const images = [
  {
    src: 'https://placehold.co/300x300',
    alt: 'Placeholder image 1',
    text: 'Image 1',
  },
  {
    src: 'https://placehold.co/300x300',
    alt: 'Placeholder image 2',
    text: 'Image 2',
  },
  {
    src: 'https://placehold.co/300x300',
    alt: 'Placeholder image 3',
    text: 'Image 3',
  },
  {
    src: 'https://placehold.co/300x300',
    alt: 'Placeholder image 3',
    text: 'Image 3',
  },
  {
    src: 'https://placehold.co/300x300',
    alt: 'Placeholder image 3',
    text: 'Image 3',
  },
  {
    src: 'https://placehold.co/300x300',
    alt: 'Placeholder image 3',
    text: 'Image 3',
  },
  {
    src: 'https://placehold.co/300x300',
    alt: 'Placeholder image 3',
    text: 'Image 3',
  },
  {
    src: 'https://placehold.co/300x300',
    alt: 'Placeholder image 3',
    text: 'Image 3',
  },
  {
    src: 'https://placehold.co/300x300',
    alt: 'Placeholder image 3',
    text: 'Image 3',
  },
];
</script>