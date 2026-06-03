import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import Notes from './pages/Notes'
import TestSeries from './pages/TestSeries'
import FreeResources from './pages/FreeResources'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Purchase from './pages/Purchase'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'

type NavItem = {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Courses', href: '/courses' },
  { label: 'Notes', href: '/notes' },
  { label: 'Test Series', href: '/tests' },
  { label: 'Free Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
]

function AppShell() {
  return (
    <div className="tatvika-shell">
      <header
        className="tatvika-header"
        style={{ backgroundColor: '#0A192F', borderBottomColor: 'rgba(255, 255, 255, 0.12)' }}
      >
        <div className="tatvika-header-spacer" />
        <h1 className="tatvika-brand">
          <Link
            to="/"
            className="tatvika-brand-link"
            style={{ color: '#D4AF37' }}
          >
            Tatvika Achievers
          </Link>
        </h1>
        <Link
          to="/login"
          className="tatvika-portal-link"
          style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}
        >
          Student Portal
        </Link>
      </header>

      <div className="tatvika-body">
        <aside
          className="tatvika-sidebar"
          style={{ backgroundColor: '#0A192F', color: '#cbd5e1' }}
        >
          <nav className="tatvika-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                  color: isActive ? '#D4AF37' : '#cbd5e1',
                })}
                className={({ isActive }) =>
                  [
                    'tatvika-nav-link',
                    isActive
                      ? 'tatvika-nav-link-active'
                      : 'tatvika-nav-link-default',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="tatvika-main">
          <div className="tatvika-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/tests" element={<TestSeries />} />
              <Route path="/resources" element={<FreeResources />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
