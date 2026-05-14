import { Link } from 'react-router-dom'

function UserCard({ user }) {
  return (
    <div className="rounded border bg-white p-4">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="mt-1 text-gray-600">{user.email}</p>

      <div className="mt-4">
        <p>
          <span className="font-bold">Company:</span> {user.company.name}
        </p>
        <p className="mt-2">
          <span className="font-bold">Website:</span>{' '}
          <a
            href={`https://${user.website}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            {user.website}
          </a>
        </p>
      </div>

      <Link
        to={`/users/${user.id}/posts`}
        className="mt-4 inline-block text-blue-600 hover:underline"
      >
        View posts
      </Link>
    </div>
  )
}

export default UserCard
