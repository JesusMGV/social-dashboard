const API_URL = 'https://jsonplaceholder.typicode.com'

async function request(path) {
  const response = await fetch(`${API_URL}${path}`)

  if (!response.ok) {
    throw new Error('Something went wrong while loading the data.')
  }

  return response.json()
}

export function getUsers() {
  return request('/users')
}
