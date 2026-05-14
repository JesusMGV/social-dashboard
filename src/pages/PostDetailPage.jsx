import { useParams } from 'react-router-dom'

function PostDetailPage() {
  const { postId } = useParams()

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">
        Post #{postId}
      </h1>
      <div className="rounded border bg-white p-4">
        <p className="text-gray-600">full post details</p>
      </div>
    </section>
  )
}

export default PostDetailPage
