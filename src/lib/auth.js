export async function getSession() {
  const response = await fetch('/api/auth/me', {
    credentials: 'include',
  })

  if (response.status === 401) {
    return null
  }

  if (!response.ok) {
    throw new Error('Could not check login status.')
  }

  const data = await response.json()
  return data.user
}

export async function logout() {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  })
}

export function getLoginUrl() {
  const returnTo = window.location.pathname
  return `/api/auth/login?returnTo=${encodeURIComponent(returnTo)}`
}
