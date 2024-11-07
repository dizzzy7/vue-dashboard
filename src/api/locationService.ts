import { useQuery } from '@tanstack/vue-query'

export const useLocation = () =>
  useQuery<{
    city: string
    lat: number
    lon: number
  }>({
    queryKey: ['location', 'estimated'],
    queryFn: async () => {
      const response = await fetch('http://ip-api.com/json/')

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return response.json()
    },
  })
