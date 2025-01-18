<template>
  <div id="confirm" class="p-10 md:p-20 lg:p-40 max-w-[1600px] m-auto">
    <p class="text-xl lg:text-2xl max-w-xl">We're signing you in, hold on!</p>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();

// Get redirect path from cookies
const cookieName = useRuntimeConfig().public.supabase.cookieName;
const redirectPath = useCookie(`${cookieName}-redirect-path`).value;
const priorityRedirectPath = useCookie("redirect").value;

watch(
  user,
  () => {
    if (user.value) {
      console.log(useCookie("redirect").value)
      if (useCookie("redirect").value !== null) {
        // Clear cookie
        useCookie("redirect").value = null;

        // Redirect to path
        return navigateTo(priorityRedirectPath || "/");
      }

      // Clear cookie
      useCookie(`${cookieName}-redirect-path`).value = null;
      
      // Redirect to path
      return navigateTo(redirectPath || "/");
    }
  },
  { immediate: true }
);
</script>
