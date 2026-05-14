import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

const navLinks = [
  { href: '/users', label: 'Users' },
  { href: '/posts', label: 'Posts' },
]

function Navigation({ onLogout, user }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto max-w-5xl p-4">
        <div className="flex items-center gap-4">
          <Link to="/users" className="text-xl font-bold text-gray-900">
            Social Dashboard
          </Link>

          <nav className="flex gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? 'text-sm font-bold text-emerald-700'
                    : 'text-sm font-medium text-gray-600 hover:text-gray-900'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-3 md:flex">
            <img src={user.avatarUrl} alt="" className="h-9 w-9 rounded-full" />
            <div>
              <p className="text-sm font-bold">{user.name}</p>
              <p className="text-sm text-gray-600">@{user.username}</p>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>

          <div className="relative ml-auto md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1"
            >
              <img
                src={user.avatarUrl}
                alt=""
                className="h-9 w-9 rounded-full"
              />
              <span className="text-sm text-gray-600">▾</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white p-4 shadow-md">
                <p className="font-bold">{user.name}</p>
                <p className="text-sm text-gray-600">@{user.username}</p>
                <button
                  type="button"
                  onClick={onLogout}
                  className="mt-4 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navigation
