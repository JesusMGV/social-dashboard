import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { getSession, logout } from './lib/auth'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import PostDetailPage from './pages/PostDetailPage'
import PostsPage from './pages/PostsPage'
import UserPostsPage from './pages/UserPostsPage'
import UsersPage from './pages/UsersPage'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getSession()
      .then((sessionUser) => {
        setUser(sessionUser)
      })
      .catch(() => {
        setError('Could not check your GitHub login.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  function handleLogout() {
    logout().finally(() => {
      setUser(null)
    })
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto mt-20 max-w-md rounded-md border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-gray-600">Checking login...</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return <LoginPage error={error} />
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/users/:userId/posts" element={<UserPostsPage />} />
        <Route path="/posts/:postId" element={<PostDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App
