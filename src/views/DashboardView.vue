<template>
  <AdminLayout>
    <div>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ $t('dashboard.title') }}</h2>
      
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-1">
                <dt class="text-sm font-medium text-gray-500 truncate">{{ $t('dashboard.stats.totalCourses') }}</dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.courses }}</dd>
              </div>
              <div class="ml-5 flex-shrink-0">
                <svg class="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-1">
                <dt class="text-sm font-medium text-gray-500 truncate">{{ $t('dashboard.stats.totalQuizzes') }}</dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.quizzes }}</dd>
              </div>
              <div class="ml-5 flex-shrink-0">
                <svg class="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-1">
                <dt class="text-sm font-medium text-gray-500 truncate">{{ $t('dashboard.stats.published') }}</dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.published }}</dd>
              </div>
              <div class="ml-5 flex-shrink-0">
                <svg class="h-12 w-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-1">
                <dt class="text-sm font-medium text-gray-500 truncate">{{ $t('dashboard.stats.drafts') }}</dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.drafts }}</dd>
              </div>
              <div class="ml-5 flex-shrink-0">
                <svg class="h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">{{ $t('dashboard.quickActions.title') }}</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <router-link
            to="/courses"
            class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            <svg class="mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            {{ $t('dashboard.quickActions.createCourse') }}
          </router-link>
          <router-link
            to="/quizzes"
            class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            <svg class="mr-2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            {{ $t('dashboard.quickActions.createQuiz') }}
          </router-link>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '../components/AdminLayout.vue'
import { supabase } from '../shared/lib/supabase.config'

const stats = ref({
  courses: 0,
  quizzes: 0,
  published: 0,
  drafts: 0
})

onMounted(async () => {
  // Fetch stats from Supabase
  const { data: courses } = await supabase.from('courses').select('id, is_published')
  const { data: quizzes } = await supabase.from('quizzes').select('id')

  if (courses) {
    stats.value.courses = courses.length
    stats.value.published = courses.filter(c => c.is_published).length
    stats.value.drafts = courses.filter(c => !c.is_published).length
  }

  if (quizzes) {
    stats.value.quizzes = quizzes.length
  }
})
</script>
