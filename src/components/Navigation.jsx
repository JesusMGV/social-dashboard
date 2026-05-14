import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { href: '/users', label: 'Users' },
  { href: '/posts', label: 'Posts' },
]

function Navigation({ onLogout, user }) {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-5xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/users">
            <span className="text-xl font-bold text-gray-900">
              Social Dashboard
            </span>
          </Link>

          <nav className="flex gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-600 underline'
                    : 'text-gray-600 hover:underline'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <img
            src={user.avatarUrl}
            alt=""
            className="h-8 w-8 rounded-full"
          />
          <div>
            <p className="font-bold">{user.name}</p>
            <p className="text-sm text-gray-600">@{user.username}</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="ml-auto text-blue-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navigation
