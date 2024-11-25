import { useQuery } from '@tanstack/vue-query'
import type { ComputedRef } from 'vue'

export const useWeather = (
  location: ComputedRef<{ lat?: number; lon?: number }>,
  enabled: ComputedRef<boolean>,
  interval: 'hourly' | 'current', // could also accept array/set of 'hourly'/'current', to request both
  forecastDays: number = 1,
) =>
  useQuery({
    queryKey: ['weather', interval],
    queryFn: async () => {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.value.lat}&longitude=${location.value.lon}&forecast_days=${forecastDays}&timezone=${timeZone}&${interval}=precipitation_probability,temperature_2m,weather_code,is_day`,
      )

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return response.json()
    },
    enabled: enabled,
  })
