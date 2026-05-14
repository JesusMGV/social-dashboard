import {
  authCookies,
  cleanReturnTo,
  createCookie,
  createState,
  getOAuthRedirectUri,
  json,
  redirect,
} from '../../_utils/auth.js'

export async function onRequestGet({ request, env }) {
  if (!env.GITHUB_CLIENT_ID) {
    return json({ error: 'Missing GITHUB_CLIENT_ID' }, 500)
  }

  const requestUrl = new URL(request.url)
  const state = await createState()
  const returnTo = cleanReturnTo(requestUrl.searchParams.get('returnTo'))
  const githubUrl = new URL('https://github.com/login/oauth/authorize')
  const cookies = authCookies()
  const headers = new Headers()

  githubUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID)
  githubUrl.searchParams.set('redirect_uri', getOAuthRedirectUri(request, env))
  githubUrl.searchParams.set('scope', 'read:user user:email')
  githubUrl.searchParams.set('state', state)

  headers.append(
    'set-cookie',
    createCookie(request, cookies.state, state, { maxAge: 600 }),
  )
  headers.append(
    'set-cookie',
    createCookie(request, cookies.returnTo, returnTo, { maxAge: 600 }),
  )

  return redirect(githubUrl.toString(), headers)
}
