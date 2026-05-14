import Navigation from './Navigation'

function Layout({ children, onLogout, user }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation user={user} onLogout={onLogout} />
      <main className="mx-auto max-w-5xl p-6">{children}</main>
    </div>
  )
}

export default Layout
