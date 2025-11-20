<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-900">QuizAcademy Studio</h1>
            <div class="ml-10 flex space-x-4">
              <router-link
                to="/"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
                :class="{ 'bg-gray-100 text-gray-900': $route.path === '/' }"
              >
                Dashboard
              </router-link>
              <router-link
                to="/courses"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
                :class="{ 'bg-gray-100 text-gray-900': $route.path === '/courses' }"
              >
                Courses
              </router-link>
              <router-link
                to="/quizzes"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
                :class="{ 'bg-gray-100 text-gray-900': $route.path === '/quizzes' }"
              >
                Quizzes
              </router-link>
            </div>
          </div>
          <div class="flex items-center">
            <span class="text-sm text-gray-600 mr-4">{{ userEmail }}</span>
            <button
              @click="handleSignOut"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase, signOut } from '../shared/lib/supabase.config'

const router = useRouter()
const userEmail = ref('')

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    userEmail.value = user.email || 'Admin'
  }
})

const handleSignOut = async () => {
  await signOut()
  router.push('/login')
}
</script>
