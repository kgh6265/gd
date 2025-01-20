<template>
  <div id="confirm" class="p-10 md:p-20 lg:p-40 max-w-[1600px] m-auto">
    <p class="text-xl lg:text-2xl max-w-xl">We're signing you in, hold on!</p>
  </div>
</template>

<script setup>
import isRelativeUrl from 'is-relative-url';

const user = useSupabaseUser();
const route = useRoute();

// Get redirect path from cookies
const cookieName = useRuntimeConfig().public.supabase.cookieName;
const redirectPath = useCookie(`${cookieName}-redirect-path`).value;
const priorityRedirectPath = route.query.redirect;

watch(
  user,
  () => {
    if (user.value) {
      if (priorityRedirectPath && priorityRedirectPath !== "/" && isRelativeUrl(priorityRedirectPath)) {
        // Redirect to path
        return navigateTo(priorityRedirectPath);
      }

      // Clear cookie
      useCookie(`${cookieName}-redirect-path`).value = null;
      
      // Redirect to path
      return navigateTo(redirectPath);
    }
  },
  { immediate: true }
);
</script>
