<!-- create a #F76902 navbar with the logo in the centre and three navigation links on either side of the logo -->
<template>
  <nav
    class="flex navbar w-full p-1 pl-4 lg:pl-10 pr-4 lg:pr-7 align-middle content-center relative z-10 border-0 border-b border-zinc-700"
  >
    <div class="navbar__logo">
      <NuxtLink to="/">
        <img src="/logo-inverse-white.png" alt="logo" class="w-14 md:w-20 lg:w-24 mt-2 mb-4" />
      </NuxtLink>
    </div>
    <div
      class="navbar__links flex justify-end gap-8 self-center w-full h-fit text-xl bold"
    >
      <NuxtLink to="/" class="hidden lg:block">Home</NuxtLink>
      <NuxtLink to="/#about" class="hidden lg:block">About</NuxtLink>
      <NuxtLink to="/#magazines" class="hidden lg:block">E-magazines</NuxtLink>
      <NuxtLink to="/bylaws" class="hidden lg:block">BYLAWS</NuxtLink>
      <NuxtLink to="/#members" class="hidden lg:block">Meet The Team</NuxtLink>
      <NuxtLink to="/dashboard" class="text-lg lg:text-xl">Dashboard</NuxtLink>
      <!-- <a href="#">Contact</a> -->
    </div>
  </nav>
</template>

<style scoped>
nav {
  /* background: #F76902;
  background: url("/noise.png") repeat scroll center/20rem, linear-gradient(to bottom, rgba(244, 101, 48, 1) 0%, rgba(244, 101, 48, 0.9) 90%, rgba(255, 255, 255, 0) 100%); */
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
</style>
