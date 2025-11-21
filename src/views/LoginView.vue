<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
    <!-- Language Switcher in top-right corner -->
    <div class="absolute top-4 right-4">
      <LanguageSwitcher />
    </div>
    
    <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
      <!-- Logo/Title -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">{{ $t('login.title') }}</h1>
        <p class="text-gray-600 mt-2">{{ $t('login.subtitle') }}</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {{ error }}
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('login.emailLabel') }}
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
            :placeholder="$t('login.emailPlaceholder')"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('login.passwordLabel') }}
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
            :placeholder="$t('login.passwordPlaceholder')"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? $t('login.signingIn') : $t('login.signInButton') }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-6">
        {{ $t('login.adminNote') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signIn } from '../shared/lib/supabase.config'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '../components/shared/LanguageSwitcher.vue'

const router = useRouter()
const { t } = useI18n()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await signIn(email.value, password.value)
    router.push('/')
  } catch (err: any) {
    // Map Supabase error messages to i18n keys
    const errorMessage = err.message || ''
    
    if (errorMessage.includes('Invalid login credentials')) {
      error.value = t('login.errors.invalidCredentials')
    } else if (errorMessage.includes('Invalid email')) {
      error.value = t('login.errors.invalidEmail')
    } else if (errorMessage.includes('Email not confirmed')) {
      error.value = t('login.errors.emailNotConfirmed')
    } else if (errorMessage.includes('Too many requests')) {
      error.value = t('login.errors.tooManyRequests')
    } else {
      error.value = t('login.errors.default')
    }
  } finally {
    loading.value = false
  }
}
</script>
