export const getCurrentWeather = async (lat: number, lon: number) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const response = await fetch(
    `http://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=${timeZone}&current=rain,temperature_2m`,
  )

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

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
