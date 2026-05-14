function ErrorMessage({ message }) {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-4 shadow-sm">
      <p className="text-red-700">{message}</p>
    </div>
  )
}

export default ErrorMessage
