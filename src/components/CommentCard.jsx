function CommentCard({ comment }) {
  return (
    <div className="rounded border bg-white p-4">
      <h3 className="font-bold">{comment.name}</h3>
      <p className="mt-1 text-sm text-gray-600">{comment.email}</p>
      <p className="mt-3 text-gray-700">{comment.body}</p>
    </div>
  )
}

export default CommentCard
