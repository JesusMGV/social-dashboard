import { useEffect, useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import LoadingMessage from '../components/LoadingMessage'
import PostCard from '../components/PostCard'
import { getPosts, getUsers } from '../lib/api'

function getAuthorName(users, userId) {
  const user = users.find((currentUser) => currentUser.id === userId)
  return user ? user.name : 'Unknown user'
}

function PostsPage() {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getPosts(), getUsers()])
      .then(([postsData, usersData]) => {
        setPosts(postsData)
        setUsers(usersData)
      })
      .catch(() => {
        setError('Could not load posts.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <section>
      <h1 className="mb-4 text-sm font-bold uppercase text-emerald-700">
        Posts
      </h1>

      {loading && <LoadingMessage message="Loading posts..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              authorName={getAuthorName(users, post.userId)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default PostsPage
