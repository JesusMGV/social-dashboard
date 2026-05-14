function LoadingMessage({ message = 'Loading...' }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-gray-600">{message}</p>
    </div>
  )
}

export default LoadingMessage
