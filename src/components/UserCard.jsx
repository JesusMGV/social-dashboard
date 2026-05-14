import { Link } from 'react-router-dom'

function UserCard({ user }) {
  const postsPath = `/users/${user.id}/posts`

  return (
    <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            to={postsPath}
            className="text-xl font-bold text-gray-900 hover:underline"
          >
            {user.name}
          </Link>
          <p className="mt-2 text-gray-500">{user.email}</p>
        </div>

      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase text-gray-400">Company</p>
          <p className="mt-2 text-gray-700">{user.company.name}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase text-gray-400">Website</p>
          <a
            href={`https://${user.website}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block text-emerald-700 hover:underline"
          >
            {user.website}
          </a>
        </div>
      </div>

      <Link
        to={postsPath}
        className="ml-auto mt-4 block w-fit rounded bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800"
      >
        View posts →
      </Link>
    </div>
  )
}

export default UserCard
