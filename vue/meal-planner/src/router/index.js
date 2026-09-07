import { createRouter, createWebHistory } from 'vue-router'
import WeekPlanView from '@/views/WeekPlanView.vue'


const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL), // createWebHistory usa URLs limpias

  routes: [
    {
      path: '/',                  // la URL
      name: 'week-plan',          // nombre interno
      component: WeekPlanView,    // lo que se pinta en el <RouterView />
    },
    
  ],
})

export default router
