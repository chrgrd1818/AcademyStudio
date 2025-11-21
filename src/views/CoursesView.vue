<template>
  <AdminLayout>
    <div>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">{{ $t('courses.title') }}</h2>
        <button
          @click="showCreateForm = true"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          <svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          {{ $t('courses.newCourse') }}
        </button>
      </div>

      <!-- Course List (placeholder for now) -->
      <div v-if="courses.length ===0" class="text-center py-12 bg-white rounded-lg shadow">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">{{ $t('courses.empty.title') }}</h3>
        <p class="mt-1 text-sm text-gray-500">{{ $t('courses.empty.description') }}</p>
        <div class="mt-6">
          <button
            @click="showCreateForm = true"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {{ $t('courses.createCourse') }}
          </button>
        </div>
      </div>

      <!-- Course Grid -->
      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="course in courses" :key="course.id" class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition">
          <div class="p-5">
            <h3 class="text-lg font-medium text-gray-900">{{ course.title }}</h3>
            <p class="mt-1 text-sm text-gray-500">{{ course.description }}</p>
            <div class="mt-4 flex items-center justify-between">
              <span :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                course.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              ]">
                {{ course.is_published ? $t('courses.published') : $t('courses.draft') }}
              </span>
              <button class="text-sm text-blue-600 hover:text-blue-800">{{ $t('courses.edit') }}</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Create Course Modal (placeholder) -->
      <div v-if="showCreateForm" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg max-w-md w-full p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ $t('courses.modal.title') }}</h3>
          <p class="text-sm text-gray-500 mb-4">{{ $t('courses.modal.comingSoon') }}</p>
          <button
            @click="showCreateForm = false"
            class="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            {{ $t('courses.modal.close') }}
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '../components/AdminLayout.vue'
import { supabase } from '../shared/lib/supabase.config'

const courses = ref<any[]>([])
const showCreateForm = ref(false)

onMounted(async () => {
  const { data } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })

  if (data) {
    courses.value = data
  }
})
</script>
