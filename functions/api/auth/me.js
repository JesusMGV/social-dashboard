import { json, readSession } from '../../_utils/auth.js'

export async function onRequestGet({ request, env }) {
  const user = await readSession(request, env)

  if (!user) {
    return json({ user: null }, 401)
  }

  return json({ user })
}
