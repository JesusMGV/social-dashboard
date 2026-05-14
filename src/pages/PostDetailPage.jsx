import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import CommentCard from '../components/CommentCard'
import ErrorMessage from '../components/ErrorMessage'
import LoadingMessage from '../components/LoadingMessage'
import { getPost, getPostComments, getUser } from '../lib/api'
import { capitalize } from '../lib/format'

function PostDetailPage() {
  const { postId } = useParams()
  const location = useLocation()
  const backTo = location.state?.backTo || '/posts'
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
      <Link
        to={backTo}
        className="mb-4 inline-block rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-100"
      >
        ← Back
      </Link>

      {loading && <LoadingMessage message="Loading post..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && post && (
        <>
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-gray-500">By {user ? user.name : 'Unknown user'}</p>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">
              {capitalize(post.title)}
            </h1>
            <p className="mt-4 text-gray-600">{capitalize(post.body)}</p>
          </div>

          <h2 className="mb-4 mt-6 text-sm font-bold uppercase text-emerald-700">
            Comments
          </h2>
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
