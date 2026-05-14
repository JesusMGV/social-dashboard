import { authCookies, clearCookie, json } from '../../_utils/auth.js'

export async function onRequestPost({ request }) {
  const headers = new Headers()
  headers.append('set-cookie', clearCookie(request, authCookies().session))
  return json({ ok: true }, 200, headers)
}
