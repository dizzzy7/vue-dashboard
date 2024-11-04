export const getLocation = async () => {
  const response = await fetch('http://ip-api.com/json/')

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}
