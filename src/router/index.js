import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import CobaVue from '@/views/Coba.vue'
import OdiGantengVue from '@/views/OdiGanteng.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: '/login',
      name: 'login',
      // component: LandingPages
    },
    {
      path: '/register',
      name: 'register',
      // component: LandingPage
    },
    {
      path: '/coba',
      name: 'coba',
      component: CobaVue
    },
    {
      path: '/odiganteng',
      name: 'odiganteng',
      component: OdiGantengVue
    },
  ]
})

export default router
