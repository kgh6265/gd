<template>
  <div class="mt-20 px-4 lg:px-10 max-w-2xl mx-auto min-h-[60vh] pb-20">
    <div v-if="pending" class="text-center text-zinc-400 mt-20">
      <p>Verifying credential...</p>
    </div>

    <div v-else-if="error || !credential" class="text-center mt-20 border border-red-500/30 bg-red-500/10 rounded-2xl p-10">
      <div class="text-5xl mb-4">❌</div>
      <h1 class="text-3xl lg:text-4xl font-bold mb-4">Invalid Credential</h1>
      <p class="text-zinc-400">This credential could not be verified in our system. It may be invalid, expired, or the ID is incorrect.</p>
    </div>

    <div v-else class="mt-10 border border-green-500/30 bg-green-500/10 rounded-2xl p-8 lg:p-12 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
      <div class="text-center mb-8 border-b border-green-500/20 pb-8">
        <div class="text-5xl mb-4">✅</div>
        <h1 class="text-3xl lg:text-4xl font-bold text-green-400 mb-2">Verified Credential</h1>
        <p class="text-green-500/70">This is a valid and official document.</p>
      </div>

      <div class="space-y-6 text-lg">
        <div>
          <span class="block text-sm text-zinc-400 uppercase tracking-wider mb-1">Recipient</span>
          <span class="font-bold text-2xl">{{ credential.recipient_name }}</span>
        </div>
        
        <div>
          <span class="block text-sm text-zinc-400 uppercase tracking-wider mb-1">Award / Placement</span>
          <span class="font-semibold">{{ credential.award }}</span>
        </div>

        <div>
          <span class="block text-sm text-zinc-400 uppercase tracking-wider mb-1">Event</span>
          <span>{{ credential.event_name }}</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span class="block text-sm text-zinc-400 uppercase tracking-wider mb-1">Issue Date</span>
            <span>{{ new Date(credential.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
          </div>
          <div>
            <span class="block text-sm text-zinc-400 uppercase tracking-wider mb-1">Credential ID</span>
            <span class="font-mono text-[#F76902]">{{ credential.credential_id }}</span>
          </div>
        </div>

        <div class="pt-6 border-t border-green-500/20">
          <span class="block text-sm text-zinc-400 uppercase tracking-wider mb-1">Issued By</span>
          <span class="font-medium">{{ credential.issued_by }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const credentialId = route.params.id

// Fetch credential by ID
const { data: response, pending, error } = await useFetch(`/api/credentials`, {
  query: { id: credentialId },
})

// Computed property to extract the actual credential data
const credential = computed(() => {
  if (response.value && response.value.data && response.value.data.length > 0) {
    // Strapi v4/v5 structure: .data is an array of entries, and the attributes are inside .attributes (v4) or direct (v5).
    // Handle both cases just in case.
    const entry = response.value.data[0]
    return entry.attributes ? entry.attributes : entry
  }
  return null
})
</script>

<style scoped>
</style>
