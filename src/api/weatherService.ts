import { useQuery } from '@tanstack/vue-query'
import type { ComputedRef } from 'vue'

export const getDailyWeather = async (lat: number, lon: number) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const response = await fetch(
    `http://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&forecast_days=1&timezone=${timeZone}&hourly=rain,temperature_2m`,
  )

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

export const useWeather = (
  location: ComputedRef<{ lat?: number; lon?: number }>,
  enabled: ComputedRef<boolean>,
  interval: 'hourly' | 'current', // could also accept array/set of 'hourly'/'current', to request both
) =>
  useQuery({
    queryKey: ['weather', interval],
    queryFn: async () => {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

      const response = await fetch(
        `http://api.open-meteo.com/v1/forecast?latitude=${location.value.lat}&longitude=${location.value.lon}&timezone=${timeZone}&${interval}=rain,temperature_2m`,
      )

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return response.json()
    },
    enabled: enabled,
  })
