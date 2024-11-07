import { useQueries, useQuery } from '@tanstack/vue-query'
import { addDays, compareAsc, format, subDays, subMonths } from 'date-fns'

export const useCurrency = (
  timeSpan: 'lastMonth' | 'lastSixMonths' | 'lastYear' = 'lastMonth',
) => {
  const date = subDays(new Date(), 1)
  const queries = []

  if (timeSpan === 'lastMonth') {
    let pastDate = subMonths(date, 1)

    while (compareAsc(date, pastDate) !== -1) {
      const formattedDate = format(pastDate, 'yyyy-MM-dd')
      queries.push({
        queryKey: ['currency', formattedDate],
        queryFn: async () => {
          const response = await fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${formattedDate}/v1/currencies/eur.json`,
          )

          if (!response.ok) {
            throw new Error(response.statusText)
          }

          return await response.json()
        },
        enabled: true,
      })

      pastDate = addDays(pastDate, 1)
    }
  }

  return useQueries({ queries: queries })
}

export const useCurrencySingle = () =>
  useQuery({
    queryKey: ['currency', 'latest'],
    queryFn: async () => {
      const response = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json`,
      )

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      return response.json()
    },
    enabled: true,
  })
