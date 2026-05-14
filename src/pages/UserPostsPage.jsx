import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import LoadingMessage from '../components/LoadingMessage'
import PostCard from '../components/PostCard'
import { getPostsByUser, getUser } from '../lib/api'

function UserPostsPage() {
  const { userId } = useParams()
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getPostsByUser(userId), getUser(userId)])
      .then(([postsData, userData]) => {
        setPosts(postsData)
        setUser(userData)
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
      <p className="mb-2 text-sm font-bold uppercase text-emerald-700">
        Posts by
      </p>
      <h1 className="mb-4 text-2xl font-bold text-gray-900">
        {user ? user.name : `User ${userId}`}
      </h1>

      {loading && <LoadingMessage message="Loading posts..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} authorName={user?.name} />
          ))}
        </div>
      )}
    </section>
  )
}

export default UserPostsPage
