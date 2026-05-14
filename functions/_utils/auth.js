const SESSION_COOKIE = 'sd_session'
const STATE_COOKIE = 'sd_oauth_state'
const RETURN_COOKIE = 'sd_oauth_return'

const encoder = new TextEncoder()

export function json(data, status = 200, headers = new Headers()) {
  headers.set('content-type', 'application/json; charset=utf-8')
  headers.set('cache-control', 'no-store')

  return new Response(JSON.stringify(data), {
    status,
    headers,
  })
}

export function redirect(location, headers = new Headers()) {
  headers.set('location', location)
  headers.set('cache-control', 'no-store')
  return new Response(null, { status: 302, headers })
}

export function getOAuthRedirectUri(request, env) {
  if (env.OAUTH_REDIRECT_URI) return env.OAUTH_REDIRECT_URI
  const url = new URL(request.url)
  return `${url.origin}/api/auth/callback`
}

export function parseCookies(request) {
  const header = request.headers.get('cookie') || ''

  return header.split(';').reduce((cookies, part) => {
    const [name, ...rest] = part.trim().split('=')
    if (!name) return cookies
    cookies[name] = decodeURIComponent(rest.join('='))
    return cookies
  }, {})
}

export function createCookie(request, name, value, options = {}) {
  const url = new URL(request.url)
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
  ]

  if (url.protocol === 'https:') parts.push('Secure')
  if (options.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`)

  return parts.join('; ')
}

export function clearCookie(request, name) {
  return createCookie(request, name, '', { maxAge: 0 })
}

export async function createState() {
  return base64Url(crypto.getRandomValues(new Uint8Array(24)))
}

export function cleanReturnTo(value) {
  if (!value || !value.startsWith('/')) return '/users'
  if (value.startsWith('//') || value.startsWith('/api/')) return '/users'
  return value
}

export function authCookies() {
  return {
    session: SESSION_COOKIE,
    state: STATE_COOKIE,
    returnTo: RETURN_COOKIE,
  }
}

export async function createSession(user, secret) {
  const profile = {
    id: user.id,
    username: user.login,
    name: user.name || user.login,
    avatarUrl: user.avatar_url,
    profileUrl: user.html_url,
  }

  const payload = base64Url(
    encoder.encode(
      JSON.stringify({
        user: profile,
        issuedAt: Date.now(),
      }),
    ),
  )
  const signature = await sign(payload, secret)

  return `${payload}.${signature}`
}

export async function readSession(request, env) {
  const cookies = parseCookies(request)
  const token = cookies[SESSION_COOKIE]
  if (!token || !env.SESSION_SECRET) return null

  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null

  const expected = await sign(payload, env.SESSION_SECRET)
  if (signature !== expected) return null

  try {
    const decoded = JSON.parse(
      new TextDecoder().decode(base64UrlToBytes(payload)),
    )
    return decoded.user || null
  } catch {
    return null
  }
}

async function sign(value, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value))
  return base64Url(new Uint8Array(signature))
}

function base64Url(bytes) {
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlToBytes(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return bytes
}
