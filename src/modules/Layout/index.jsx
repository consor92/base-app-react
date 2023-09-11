import { NavLink, Outlet } from 'react-router-dom'
import './styles.css'

export default function Layout() {
  const menuItems = [
    { href: '/', title: 'Home' },
    { href: 'students', title: 'Students' },
  ]

  return (
    <div>
      <main>
        <nav>
          <ul>
            {menuItems.map(({ href, title }) => (
              <li key={title}>
                <NavLink to={href}>
                  <p>{title}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
