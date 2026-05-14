function LoadingMessage({ message = 'Loading...' }) {
  return (
    <div className="rounded border bg-white p-4">
      <p className="text-gray-600">{message}</p>
    </div>
  )
}

export default LoadingMessage
