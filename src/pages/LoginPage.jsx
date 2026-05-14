import { getLoginUrl } from '../lib/auth'

function LoginPage({ error }) {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto mt-20 max-w-md rounded-md border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Social Dashboard</h1>
        <p className="mt-3 text-gray-600">
          Sign in with GitHub to view users, posts, and comments.
        </p>

        {error && (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">
            {error}
          </p>
        )}

        <a
          href={getLoginUrl()}
          className="mt-6 inline-block rounded bg-gray-900 px-4 py-2 text-white"
        >
          Login with GitHub
        </a>
      </div>
    </main>
  )
}

export default LoginPage
