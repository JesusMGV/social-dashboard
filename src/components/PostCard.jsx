import { Link, useLocation } from 'react-router-dom'
import { capitalize } from '../lib/format'

function PostCard({ authorName, post }) {
  const location = useLocation()

  return (
    <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm">
      {authorName && (
        <p className="text-sm font-medium text-emerald-700">{authorName}</p>
      )}

      <h2 className="mt-6 text-2xl font-bold text-gray-900">
        {capitalize(post.title)}
      </h2>
      <p className="mt-4 text-gray-600">{capitalize(post.body)}</p>

      <Link
        to={`/posts/${post.id}`}
        state={{ backTo: location.pathname }}
        className="ml-auto mt-6 block w-fit rounded bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800"
      >
        View comments →
      </Link>
    </div>
  )
}

export default PostCard
