import { useQuery } from '@tanstack/vue-query'

export const useLocation = () =>
  useQuery<{
    city: string
    latitude: number
    longitude: number
  }>({
    queryKey: ['location', 'estimated'],
    queryFn: async () => {
      const response = await fetch('https://ipapi.co/json/')

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return response.json()
    },
  })
