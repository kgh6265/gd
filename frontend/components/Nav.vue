<!-- create a #F76902 navbar with the logo in the centre and three navigation links on either side of the logo -->
<template>
  <nav
    class="flex navbar w-full bg-[#F76902] p-1 pl-4 lg:pl-20 pr-20 align-middle content-center relative z-10"
  >
    <div class="navbar__logo">
      <NuxtLink to="/">
        <img src="/logo-inverse.png" alt="logo" class="w-14 md:w-20 lg:w-24 mt-2 mb-4" />
      </NuxtLink>
    </div>
    <div
      class="navbar__links hidden lg:flex justify-end gap-8 self-center w-full h-fit text-xl bold"
    >
      <a href="#" class="flex content-center">Home</a>
      <a href="#about">About</a>
      <a href="#magazines">E-magazines</a>
      <a href="#events">Events</a>
      <a href="#members">Meet The Team</a>
      <!-- <a href="#">Contact</a> -->
    </div>
  </nav>
</template>

<style scoped>
nav {
  background: #F76902;
  background: url("/noise.png") repeat fixed center/20rem, linear-gradient(to bottom, rgba(244, 101, 48, 1) 0%, rgba(244, 101, 48, 0.9) 90%, rgba(255, 255, 255, 0) 100%);
  color: black;
}

.navbar__links > a {
  padding: 10px 20px;
  transition: 150ms;
}

.navbar__links > a:hover {
  background-color: black;
  transition: 100ms;
  color: white;
}
</style>
