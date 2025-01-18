<template>
  <div id="logout" class="p-10 md:p-20 lg:p-40 max-w-[1600px] m-auto">
    <h1 class="text-5xl lg:text-6xl mb-10">Sign out</h1>
    <p class="text-xl lg:text-2xl max-w-xl">
      We're signing you out, hang tight!
    </p>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();

const { error } = await supabase.auth.signOut();
if (error) {
  console.log(error);
} else {
  await navigateTo("/");
}
</script>

<style scoped></style>
