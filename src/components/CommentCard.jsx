function CommentCard({ comment }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="font-bold text-gray-900">{comment.name}</h3>
      <p className="mt-1 text-sm text-emerald-700">{comment.email}</p>
      <p className="mt-4 text-gray-600">{comment.body}</p>
    </div>
  )
}

export default CommentCard
