import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CommentCard from '../components/CommentCard'
import ErrorMessage from '../components/ErrorMessage'
import LoadingMessage from '../components/LoadingMessage'
import { getPost, getPostComments, getUser } from '../lib/api'

function PostDetailPage() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [user, setUser] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getPost(postId)
      .then((postData) => {
        setPost(postData)

        return Promise.all([
          getUser(postData.userId),
          getPostComments(postData.id),
        ])
      })
      .then(([userData, commentsData]) => {
        setUser(userData)
        setComments(commentsData)
      })
      .catch(() => {
        setError('Could not load this post.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [postId])

  return (
    <section>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        Back
      </button>

      {loading && <LoadingMessage message="Loading post..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && post && (
        <>
          <div className="rounded border bg-white p-4">
            <p className="text-gray-600">By {user ? user.name : 'Unknown user'}</p>
            <h1 className="mt-2 text-2xl font-bold">{post.title}</h1>
            <p className="mt-4 text-gray-700">{post.body}</p>
          </div>

          <h2 className="mb-4 mt-6 text-xl font-bold">Comments</h2>
          <div className="grid gap-4">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default PostDetailPage
