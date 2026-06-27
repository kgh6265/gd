<template>
  <nav
    class="flex navbar w-full p-1 pl-4 lg:pl-10 pr-4 lg:pr-7 align-middle content-center relative z-50 border-0 border-b border-zinc-700 bg-[#030304]"
  >
    <div class="navbar__logo">
      <NuxtLink to="/">
        <img src="/logo-inverse-white.png" alt="logo" class="w-14 md:w-20 lg:w-24 mt-2 mb-4" />
      </NuxtLink>
    </div>
    
    <!-- Desktop Links -->
    <div class="navbar__links hidden lg:flex justify-end gap-8 self-center w-full h-fit text-xl font-bold">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/#about">About</NuxtLink>
      <NuxtLink to="/charter">CHARTER</NuxtLink>
      <NuxtLink to="/#magazines">E-magazines</NuxtLink>
      <NuxtLink to="/designathon">DesignAthon</NuxtLink>
      <NuxtLink to="/#members">Meet The Team</NuxtLink>
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
    </div>

    <!-- Mobile Header Actions (Dashboard + Hamburger) -->
    <div class="flex lg:hidden justify-end self-center w-full gap-2 items-center">
      <NuxtLink to="/dashboard" class="mobile-dashboard-btn">Dashboard</NuxtLink>
      <button @click="isOpen = !isOpen" class="text-white p-2 focus:outline-none" aria-label="Toggle menu">
        <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Dropdown Menu -->
    <Transition name="slide-down">
      <div v-if="isOpen" class="absolute top-full left-0 w-full bg-[#030304] border-b border-zinc-700 flex flex-col p-4 shadow-xl lg:hidden origin-top">
        <NuxtLink @click="isOpen = false" to="/" class="mobile-link">Home</NuxtLink>
        <NuxtLink @click="isOpen = false" to="/#about" class="mobile-link">About</NuxtLink>
        <NuxtLink @click="isOpen = false" to="/charter" class="mobile-link">CHARTER</NuxtLink>
        <NuxtLink @click="isOpen = false" to="/#magazines" class="mobile-link">E-magazines</NuxtLink>
        <NuxtLink @click="isOpen = false" to="/designathon" class="mobile-link text-[#F76902]">DesignAthon</NuxtLink>
        <NuxtLink @click="isOpen = false" to="/#members" class="mobile-link">Meet The Team</NuxtLink>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<style scoped>
nav {
  backdrop-filter: blur(10px);
  color: black;
}

.navbar__links > a {
  padding: 10px 20px;
  transition: 150ms;
  color: white;
  text-transform: uppercase;
}

.navbar__links > a:hover {
  background-color: #F76902;
  transition: 100ms;
  color: black;
}

.mobile-dashboard-btn {
  padding: 8px 16px;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.mobile-dashboard-btn:hover {
  background-color: #F76902;
  color: black;
}

.mobile-link {
  padding: 1rem;
  color: white;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: color 0.2s;
}

.mobile-link:last-child {
  border-bottom: none;
}

.mobile-link:hover {
  color: #F76902;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
