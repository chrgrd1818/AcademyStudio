import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentProfile } from '../shared/lib/supabase.config'

// Extend route meta type
declare module 'vue-router' {
    interface RouteMeta {
        requiresAuth?: boolean
    }
}

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import CoursesView from '../views/CoursesView.vue'
import QuizzesView from '../views/QuizzesView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { requiresAuth: false }
        },
        {
            path: '/',
            name: 'dashboard',
            component: DashboardView,
            meta: { requiresAuth: true }
        },
        {
            path: '/courses',
            name: 'courses',
            component: CoursesView,
            meta: { requiresAuth: true }
        },
        {
            path: '/quizzes',
            name: 'quizzes',
            component: QuizzesView,
            meta: { requiresAuth: true }
        }
    ]
})

// Authentication guard
router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth) {
        try {
            const profile = await getCurrentProfile()

            if (!profile) {
                next('/login')
                return
            }

            // Check if user is admin
            if (profile.role !== 'admin') {
                alert('Access denied. Admin access required.')
                next('/login')
                return
            }

            next()
        } catch (error) {
            next('/login')
        }
    } else {
        next()
    }
})

export default router
