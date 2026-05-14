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

export function getUser(userId) {
  return request(`/users/${userId}`)
}

export function getPosts() {
  return request('/posts')
}

export function getPostsByUser(userId) {
  return request(`/posts?userId=${userId}`)
}

export function getPost(postId) {
  return request(`/posts/${postId}`)
}

export function getPostComments(postId) {
  return request(`/posts/${postId}/comments`)
}
