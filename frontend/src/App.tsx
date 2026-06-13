import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

import tatvikaEmblem from './assets/tatvika-emblem.png'
import tatvikaLogo from './assets/tatvika-logo.jpg'
import Home from './pages/Home'
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

type DynamicItem = {
  id: string
  title: string
  classSection: '11th Class' | '12th Class'
  subject: 'Accounts' | 'Business Studies' | 'Economics'
  price: string
  actualPrice?: string
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Lectures', href: '/courses' },
  { label: 'Book', href: '/notes' },
  { label: 'Test Series', href: '/tests' },
  { label: 'Free Resources', href: '/resources' },
  { label: 'Contact Us', href: '/contact' },
]

const expandableMenuItems = ['Book', 'Lectures', 'Test Series']
const nestedMenuSections: Record<string, { label: string; targets?: string[] }[]> = {
  Book: [
    { label: 'Academic', targets: ['11th Class', '12th Class'] },
    { label: 'Professional', targets: ['Foundation', 'Post Foundation'] },
  ],
  Lectures: [
    { label: 'Academic', targets: ['11th Class', '12th Class'] },
    { label: 'Professional', targets: ['Foundation', 'Post Foundation'] },
  ],
  'Test Series': [
    { label: 'Academic' },
    { label: 'Professional' },
  ],
}

function AppShell() {
  const [expandedMenu, setExpandedMenu] = useState<Record<string, boolean>>({})
  const [expandedSubMenu, setExpandedSubMenu] = useState<Record<string, boolean>>({})
  const [activeSubPage, setActiveSubPage] = useState<string>('')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [dynamicBooks] = useState<DynamicItem[]>([
    {
      id: 'book-1',
      title: 'Accountancy Essentials',
      classSection: '11th Class',
      subject: 'Accounts',
      price: '₹220',
    },
    {
      id: 'book-2',
      title: 'Business Studies Primer',
      classSection: '12th Class',
      subject: 'Business Studies',
      price: '₹3,500',
      actualPrice: '₹5,000',
    },
    {
      id: 'book-3',
      title: 'Economics Concepts',
      classSection: '11th Class',
      subject: 'Economics',
      price: '₹210',
    },
    {
      id: 'book-4',
      title: '12th Economics (Full Syllabus)',
      classSection: '12th Class',
      subject: 'Economics',
      price: '₹6,000',
      actualPrice: '₹9,000',
    },
    {
      id: 'book-5',
      title: '12th Economics (Part A)',
      classSection: '12th Class',
      subject: 'Economics',
      price: '₹3,500',
      actualPrice: '₹5,000',
    },
    {
      id: 'book-6',
      title: '12th Economics (Part B)',
      classSection: '12th Class',
      subject: 'Economics',
      price: '₹3,500',
      actualPrice: '₹5,000',
    },
  ])
  const [dynamicLectures] = useState<DynamicItem[]>([
    {
      id: 'lecture-1',
      title: 'Accounts Masterclass',
      classSection: '11th Class',
      subject: 'Accounts',
      price: '₹750',
    },
    {
      id: 'lecture-2',
      title: 'Business Strategy Session',
      classSection: '12th Class',
      subject: 'Business Studies',
      price: '₹6,000',
      actualPrice: '₹8,200',
    },
    {
      id: 'lecture-3',
      title: 'Economics Review Workshop',
      classSection: '12th Class',
      subject: 'Economics',
      price: '₹6,000',
      actualPrice: '₹9,000',
    },
  ])

  const toggleExpandedMenu = (label: string) => {
    setExpandedMenu((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const toggleExpandedSubMenu = (key: string) => {
    setExpandedSubMenu((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const getAcademicItems = () => {
    const academicMatch = activeSubPage.match(/^(Book|Lectures)-Academic-(11th Class|12th Class)$/)
    if (!academicMatch) return null

    const [, parent, classSection] = academicMatch
    const source = parent === 'Book' ? dynamicBooks : dynamicLectures
    return source.filter((item) => item.classSection === classSection)
  }

  const isProfessionalTarget = /Professional-(Foundation|Post Foundation)$/.test(activeSubPage)
  const academicItems = getAcademicItems()

  return (
    <div className="tatvika-shell font-['Times_New_Roman',_serif]" style={{ fontFamily: '"Times New Roman", serif' }}>
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
            <img src={tatvikaEmblem} alt="" className="tatvika-brand-emblem" />
            Tatvika Achievers
          </Link>
        </h1>
        <button
          type="button"
          className="tatvika-portal-link"
          style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}
          onClick={() => setIsAuthModalOpen(true)}
        >
          Student Portal
        </button>
      </header>

      <div className="tatvika-body">
        <aside
          className="tatvika-sidebar"
          style={{ color: '#cbd5e1' }}
        >
          <Link to="/" className="tatvika-sidebar-brand" aria-label="Tatvika Achievers home">
            <img src={tatvikaLogo} alt="Tatvika Achievers" className="tatvika-sidebar-logo" />
          </Link>
          <nav className="tatvika-nav" aria-label="Primary navigation">
            {navItems.map((item) => {
              const isExpandable = expandableMenuItems.includes(item.label)
              const menuKey = item.label

              if (!isExpandable) {
                return (
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
                )
              }

              return (
                <div key={item.label}>
                  <NavLink
                    to={item.href}
                    onClick={() => {
                      toggleExpandedMenu(menuKey)
                      setActiveSubPage(menuKey)
                    }}
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
                  {expandedMenu[menuKey] && (
                    <div className="tatvika-nav-group" style={{ marginLeft: '1rem' }}>
                      {(nestedMenuSections[item.label] || []).map((section) => {
                        const sectionKey = `${menuKey}-${section.label}`
                        return (
                          <div key={section.label}>
                            <button
                              type="button"
                              onClick={() => {
                                toggleExpandedSubMenu(sectionKey)
                                setActiveSubPage(sectionKey)
                              }}
                              className="tatvika-nav-link tatvika-nav-sublink pl-4 text-left w-full"
                              style={{
                                backgroundColor: 'transparent',
                                color: activeSubPage === sectionKey ? '#D4AF37' : '#cbd5e1',
                                justifyContent: 'flex-start',
                              }}
                            >
                              {section.label}
                            </button>
                            {section.targets && expandedSubMenu[sectionKey] && (
                              <div className="tatvika-nav-group" style={{ marginLeft: '1rem' }}>
                                {section.targets.map((target) => {
                                  const targetKey = `${sectionKey}-${target}`
                                  return (
                                    <button
                                      key={target}
                                      type="button"
                                      onClick={() => setActiveSubPage(targetKey)}
                                      className="tatvika-nav-link tatvika-nav-final-link pl-8 text-left w-full"
                                      style={{
                                        backgroundColor: 'transparent',
                                        color: activeSubPage === targetKey ? '#D4AF37' : '#cbd5e1',
                                        justifyContent: 'flex-start',
                                      }}
                                    >
                                      {target}
                                    </button>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </aside>

        <main className="tatvika-main">
          <div className="tatvika-content">
            {isProfessionalTarget ? (
              <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center text-gray-500" style={{ fontFamily: '"Times New Roman", serif' }}>
                  <h2 className="text-3xl font-semibold">Coming soon...</h2>
                  <p className="mt-3 text-base">This professional section is under construction.</p>
                </div>
              </div>
            ) : academicItems ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {academicItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-300/10 bg-white/5 p-6"
                    style={{ fontFamily: '"Times New Roman", serif' }}
                  >
                    <div className="mb-3 text-lg font-semibold text-slate-900">{item.title}</div>
                    <div className="mb-4 inline-block rounded-full bg-slate-200/80 px-3 py-1 text-sm text-slate-700">
                      {item.subject}
                    </div>
                    <div className="mb-5 text-sm text-slate-600">{item.classSection}</div>
                    <div className="mb-4 text-xl font-bold text-slate-900">
                      {item.price}
                    </div>
                    {item.actualPrice ? (
                      <div className="mb-3 text-sm text-slate-500 line-through">
                        {item.actualPrice}
                      </div>
                    ) : null}
                    <button
                      type="button"
                      className="rounded-full bg-slate-900 px-5 py-2 text-white"
                      style={{ fontFamily: '"Times New Roman", serif', backgroundColor: '#123469' }}
                    >
                      View Premium
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
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
            )}
          </div>
        </main>
        {isAuthModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
            <div
              className="w-full max-w-2xl rounded-3xl border bg-white p-6 shadow-2xl"
              style={{ borderColor: '#0A192F', fontFamily: '"Times New Roman", serif' }}
            >
              <div className="mb-6 flex items-center justify-between border-b pb-3" style={{ borderColor: '#0A192F' }}>
                <div>
                  <h2 className="text-2xl font-semibold text-[#0A192F]">Student Portal</h2>
                  <p className="text-sm text-slate-600">Use email or phone to authenticate securely.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(false)}
                  className="rounded-full border px-3 py-1 text-sm"
                  style={{ borderColor: '#0A192F', color: '#0A192F', fontFamily: '"Times New Roman", serif' }}
                >
                  Close
                </button>
              </div>

              <div className="mb-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  className={`rounded-full px-4 py-2 text-sm ${authMethod === 'email' ? 'bg-[#0A192F] text-white' : 'bg-slate-100 text-slate-700'}`}
                  style={{ fontFamily: '"Times New Roman", serif' }}
                >
                  Email Address
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('phone')}
                  className={`rounded-full px-4 py-2 text-sm ${authMethod === 'phone' ? 'bg-[#0A192F] text-white' : 'bg-slate-100 text-slate-700'}`}
                  style={{ fontFamily: '"Times New Roman", serif' }}
                >
                  Phone Number
                </button>
              </div>

              {authMethod === 'email' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">Email Address</label>
                    <input
                      type="email"
                      value={emailAddress}
                      onChange={(event) => setEmailAddress(event.target.value)}
                      className="w-full rounded-2xl border px-4 py-3"
                      style={{ borderColor: '#0A192F', fontFamily: '"Times New Roman", serif' }}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full rounded-2xl border px-4 py-3"
                      style={{ borderColor: '#0A192F', fontFamily: '"Times New Roman", serif' }}
                      placeholder="Enter your password"
                    />
                  </div>
                  <button
                    type="button"
                    className="rounded-2xl bg-[#0A192F] px-6 py-3 text-white"
                    style={{ fontFamily: '"Times New Roman", serif' }}
                  >
                    Continue with Email
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">Country Code</label>
                    <input
                      type="text"
                      value={countryCode}
                      onChange={(event) => setCountryCode(event.target.value)}
                      className="w-full rounded-2xl border px-4 py-3"
                      style={{ borderColor: '#0A192F', fontFamily: '"Times New Roman", serif' }}
                      placeholder="+91"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">Phone Number</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      className="w-full rounded-2xl border px-4 py-3"
                      style={{ borderColor: '#0A192F', fontFamily: '"Times New Roman", serif' }}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {phoneNumber.trim() !== '' && (
                    <div>
                      <label className="block mb-2 text-sm font-medium text-slate-700">Enter OTP</label>
                      <input
                        type="text"
                        value={otp}
                        maxLength={6}
                        onChange={(event) => setOtp(event.target.value)}
                        className="w-full rounded-2xl border px-4 py-3"
                        style={{ borderColor: '#0A192F', fontFamily: '"Times New Roman", serif' }}
                        placeholder="6-digit verification code"
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    className="rounded-2xl bg-[#0A192F] px-6 py-3 text-white"
                    style={{ fontFamily: '"Times New Roman", serif' }}
                  >
                    {phoneNumber.trim() !== '' ? 'Verify & Login' : 'Send OTP'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
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
