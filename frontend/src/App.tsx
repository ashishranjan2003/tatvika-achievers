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
    <div className="flex min-h-screen flex-col bg-slate-50 font-primary text-slate-950 selection:bg-amber-200">
      <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
        <div className="hidden w-32 md:block" />
        <h1 className="text-center text-2xl font-extrabold tracking-normal text-[#0A192F]">
          <Link
            to="/"
            className="text-[#0A192F] transition-colors hover:text-amber-600"
          >
            Tatvika Achievers
          </Link>
        </h1>
        <Link
          to="/login"
          className="rounded-lg bg-[#0A192F] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-slate-800"
        >
          Student Portal
        </Link>
      </header>

      <div className="flex min-h-screen flex-1 pt-16">
        <aside className="fixed bottom-0 left-0 top-16 z-40 flex w-64 flex-col bg-[#0A192F] text-slate-300 shadow-xl">
          <nav className="flex-1 space-y-2 px-4 py-8" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  [
                    'flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium tracking-normal transition-all duration-200',
                    isActive
                      ? 'border-l-4 border-amber-400 bg-amber-400/10 pl-3 text-amber-400'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="ml-64 flex-1 bg-white p-8 md:p-12 lg:p-16">
          <div className="mx-auto max-w-4xl space-y-12">
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
