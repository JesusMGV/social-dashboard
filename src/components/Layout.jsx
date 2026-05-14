import Navigation from './Navigation'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="mx-auto max-w-5xl p-6">{children}</main>
    </div>
  )
}

export default Layout
