import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import LoadingMessage from '../components/LoadingMessage'
import PostCard from '../components/PostCard'
import { getPostsByUser } from '../lib/api'

function UserPostsPage() {
  const { userId } = useParams()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getPostsByUser(userId)
      .then((data) => {
        setPosts(data)
      })
      .catch(() => {
        setError('Could not load posts for this user.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [userId])

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">Posts by user {userId}</h1>

      {loading && <LoadingMessage message="Loading posts..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}

export default UserPostsPage
