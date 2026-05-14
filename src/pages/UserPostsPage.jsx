import { useParams } from 'react-router-dom'

function UserPostsPage() {
  const { userId } = useParams()

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">
        Posts by user {userId}
      </h1>
      <div className="rounded border bg-white p-4">
        <p className="text-gray-600">posts by user list</p>
      </div>
    </section>
  )
}

export default UserPostsPage
