import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { href: '/users', label: 'Users' },
  { href: '/posts', label: 'Posts' },
]

function Navigation() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
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
    </header>
  )
}

export default Navigation
