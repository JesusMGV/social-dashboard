import { Link } from 'react-router-dom'

function PostCard({ authorName, post }) {
  return (
    <div className="rounded border bg-white p-4">
      {authorName && (
        <p className="mb-2 text-sm text-gray-600">By {authorName}</p>
      )}

      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="mt-2 text-gray-600">{post.body}</p>

      <Link
        to={`/posts/${post.id}`}
        className="mt-4 inline-block text-blue-600 hover:underline"
      >
        View comments
      </Link>
    </div>
  )
}

export default PostCard
