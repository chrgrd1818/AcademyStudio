<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from './shared/lib/supabase.config'

const router = useRouter()

onMounted(async () => {
  // Check if user is logged in
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session && router.currentRoute.value.path !== '/login') {
    router.push('/login')
  }
})
</script>
