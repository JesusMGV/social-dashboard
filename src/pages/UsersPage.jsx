import { useEffect, useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import LoadingMessage from '../components/LoadingMessage'
import UserCard from '../components/UserCard'
import { getUsers } from '../lib/api'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data)
      })
      .catch(() => {
        setError('Could not load users. Please try again later.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">Users</h1>

      {loading && <LoadingMessage message="Loading users..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="grid gap-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </section>
  )
}

export default UsersPage
