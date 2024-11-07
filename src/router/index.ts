import { createRouter, createWebHistory } from 'vue-router'
import CurrencyDashboard from '@/components/dashboards/CurrencyDashboard.vue'
import WeatherDashboard from '@/components/dashboards/WeatherDashboard.vue'

import navigatableRoutes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...navigatableRoutes,
    {
      path: '/styles',
      name: 'styles',
      // route level code-splitting
      // this generates a separate chunk (Styles.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/StylesView.vue'),
    },
  ],
})

export default router
