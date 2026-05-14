function ErrorMessage({ message }) {
  return (
    <div className="rounded border border-red-300 bg-red-50 p-4">
      <p className="text-red-700">{message}</p>
    </div>
  )
}

export default ErrorMessage
