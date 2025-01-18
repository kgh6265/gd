<template>
  <div id="login" class="p-10 md:p-20 lg:p-40 max-w-[1600px] m-auto">
    <h1 class="text-5xl lg:text-6xl mb-10">Sign in</h1>
    <p class="text-xl lg:text-2xl max-w-xl">Welcome back to your account!</p>
    <p class="text-xl lg:text-2xl mb-10">
      <span class="text-zinc-300"
        >(Even if you don't have an account, just sign in!)</span
      >
    </p>
    <p class="text-sm mb-2">
      <span class="text-zinc-500"
        >You will have to login with your RIT account</span
      >
    </p>
    <button
      class="bg-[#d0b7ff] text-black py-2 px-4 rounded-lg text-lg lg:text-2xl flex content-between items-center"
      @click="signInWithGoogle"
    >
      <UIcon name="i-carbon-logo-google" class="w-7 h-7" /><span class="ml-2"
        >Continue with Google</span
      >
    </button>
    <p class="text-lg mt-20">
      <span class="text-zinc-300"
        >By signing in with Google, you agree to Google’s
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          class="underline"
          >Terms of Service</a
        >
        and
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          class="underline"
          >Privacy Policy</a
        >.<br />You also agree to the
        <a
          href="http://www.rit.edu/computerconduct"
          target="_blank"
          class="underline"
          >RIT Code of Conduct for Computer Use</a
        >.</span
      >
    </p>
    <!-- <button class="bg-zinc-800 text-black py-2 px-4 rounded-lg text-xl flex content-between items-center mt-2 cursor-not-allowed" disabled>
      <UIcon name="i-mdi-email" class="w-6 h-6" /><span class="ml-2">Continue with email link</span> 
    </button> -->
    <p class="error text-xl text-red-300 mt-4" v-if="error">
      Something went wrong, try again?
    </p>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const error = ref(null);

// If user is already signed in, redirect to home
const user = useSupabaseUser();
if (user.value) {
  await navigateTo("/dashboard");
}

const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/confirm",
    },
  });
  if (error) {
    error.value = true;
    console.error(error);
  }
};
</script>

<style scoped></style>
