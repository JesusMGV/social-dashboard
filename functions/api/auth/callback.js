import {
  authCookies,
  cleanReturnTo,
  clearCookie,
  createCookie,
  createSession,
  getOAuthRedirectUri,
  json,
  parseCookies,
  redirect,
} from '../../_utils/auth.js'

export async function onRequestGet({ request, env }) {
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET || !env.SESSION_SECRET) {
    return json({ error: 'OAuth environment variables are not configured' }, 500)
  }

  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const cookies = parseCookies(request)
  const cookieNames = authCookies()
  const headers = new Headers()
  const returnTo = cleanReturnTo(cookies[cookieNames.returnTo])

  headers.append('set-cookie', clearCookie(request, cookieNames.state))
  headers.append('set-cookie', clearCookie(request, cookieNames.returnTo))

  if (!code || !state || state !== cookies[cookieNames.state]) {
    return json({ error: 'Invalid OAuth callback state' }, 400, headers)
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: getOAuthRedirectUri(request, env),
    }),
  })

  const tokenData = await tokenResponse.json()

  if (!tokenResponse.ok || !tokenData.access_token) {
    return json({ error: tokenData.error_description || 'GitHub login failed' }, 502)
  }

  const userResponse = await fetch('https://api.github.com/user', {
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${tokenData.access_token}`,
      'user-agent': 'social-dashboard-challenge',
    },
  })

  if (!userResponse.ok) {
    return json({ error: 'Could not read GitHub profile' }, 502)
  }

  const user = await userResponse.json()
  const session = await createSession(user, env.SESSION_SECRET)

  headers.append(
    'set-cookie',
    createCookie(request, cookieNames.session, session, {
      maxAge: 60 * 60 * 24 * 7,
    }),
  )

  return redirect(returnTo, headers)
}
