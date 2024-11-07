import WeatherDashboard from '@/components/dashboards/WeatherDashboard.vue'
// import CurrencyDashboard from '@/components/dashboards/CurrencyDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Weather',
    component: WeatherDashboard,
    alias: '/weather',
  },
  {
    path: '/currency',
    component: () => import('@/components/dashboards/CurrencyDashboard.vue'),
    name: 'Currency',
  },
]

export default routes
