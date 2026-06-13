import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import { type ReactNode, useState } from 'react'
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

type AuthUser = {
  label: string
  method: 'email' | 'phone'
}

type SocialLink = {
  label: 'WhatsApp' | 'YouTube' | 'Instagram' | 'Telegram'
  href: string
  icon: ReactNode
  colorClassName: string
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Lectures', href: '/courses' },
  { label: 'Book', href: '/notes' },
  { label: 'Test Series', href: '/tests' },
  { label: 'Free Resources', href: '/resources' },
  { label: 'Contact Us', href: '/contact' },
]

const iconClassName = 'h-5 w-5'

const socialLinks: SocialLink[] = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/message/3Z2G5XNAP53EJ1',
    colorClassName: 'tatvika-social-whatsapp',
    icon: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.34 4.97L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.46 17.51 2 12.04 2Zm5.77 14.17c-.25.71-1.46 1.35-2.02 1.44-.52.08-1.18.12-1.9-.12-.44-.14-1-.32-1.72-.63-3.02-1.3-4.99-4.33-5.14-4.53-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.31.61-.39.81-.39h.58c.18 0 .44-.07.68.52.25.6.85 2.08.92 2.23.08.15.13.33.03.53-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.31.32-.13.62.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.15.49.13.67-.08.18-.2.77-.9.98-1.21.2-.31.41-.25.69-.15.28.1 1.79.84 2.1.99.31.15.51.23.59.36.08.13.08.74-.17 1.45Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@tatvikaachievers?si=yLirPVFrLymemdYP',
    colorClassName: 'tatvika-social-youtube',
    icon: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/tatvikaachievers?igsh=MW13MHpmeWl0bm1xaQ==',
    colorClassName: 'tatvika-social-instagram',
    icon: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.81.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.36 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.81-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.36-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.81-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.36-1.06-.42-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.81.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.36 2.23-.42 1.27-.06 1.65-.07 4.85-.07Zm0 2.2c-3.15 0-3.52.01-4.75.07-1.14.05-1.76.24-2.17.4-.54.21-.93.46-1.34.87-.41.41-.66.8-.87 1.34-.16.41-.35 1.03-.4 2.17-.06 1.23-.07 1.6-.07 4.75s.01 3.52.07 4.75c.05 1.14.24 1.76.4 2.17.21.54.46.93.87 1.34.41.41.8.66 1.34.87.41.16 1.03.35 2.17.4 1.23.06 1.6.07 4.75.07s3.52-.01 4.75-.07c1.14-.05 1.76-.24 2.17-.4.54-.21.93-.46 1.34-.87.41-.41.66-.8.87-1.34.16-.41.35-1.03.4-2.17.06-1.23.07-1.6.07-4.75s-.01-3.52-.07-4.75c-.05-1.14-.24-1.76-.4-2.17a3.65 3.65 0 0 0-.87-1.34 3.65 3.65 0 0 0-1.34-.87c-.41-.16-1.03-.35-2.17-.4-1.23-.06-1.6-.07-4.75-.07Z" />
        <path d="M12 7.84a4.16 4.16 0 1 1 0 8.32 4.16 4.16 0 0 1 0-8.32Zm0 6.86a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4ZM17.38 7.62a.97.97 0 1 1-1.94 0 .97.97 0 0 1 1.94 0Z" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/contact/1780745702:wEm-nYr_M9tup0AW',
    colorClassName: 'tatvika-social-telegram',
    icon: (
      <svg className={iconClassName} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm4.64 6.84-1.51 7.13c-.11.5-.41.62-.83.39l-2.3-1.7-1.11 1.07c-.12.12-.23.23-.47.23l.17-2.35 4.28-3.86c.19-.17-.04-.26-.29-.1l-5.29 3.33-2.28-.71c-.5-.16-.51-.5.1-.74l8.9-3.43c.41-.15.77.1.63.74Z" />
      </svg>
    ),
  },
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
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [authError, setAuthError] = useState('')
  const [dynamicBooks] = useState<DynamicItem[]>([
    { id: 'book-1', title: 'Accountancy Essentials', classSection: '11th Class', subject: 'Accounts', price: '₹220' },
    { id: 'book-2', title: 'Business Studies Primer', classSection: '12th Class', subject: 'Business Studies', price: '₹3,500', actualPrice: '₹5,000' },
    { id: 'book-3', title: 'Economics Concepts', classSection: '11th Class', subject: 'Economics', price: '₹210' },
    { id: 'book-4', title: '12th Economics (Full Syllabus)', classSection: '12th Class', subject: 'Economics', price: '₹6,000', actualPrice: '₹9,000' },
    { id: 'book-5', title: '12th Economics (Part A)', classSection: '12th Class', subject: 'Economics', price: '₹3,500', actualPrice: '₹5,000' },
    { id: 'book-6', title: '12th Economics (Part B)', classSection: '12th Class', subject: 'Economics', price: '₹3,500', actualPrice: '₹5,000' },
  ])
  const [dynamicLectures] = useState<DynamicItem[]>([
    { id: 'lecture-1', title: 'Accounts Masterclass', classSection: '11th Class', subject: 'Accounts', price: '₹750' },
    { id: 'lecture-2', title: 'Business Strategy Session', classSection: '12th Class', subject: 'Business Studies', price: '₹6,000', actualPrice: '₹8,200' },
    { id: 'lecture-3', title: 'Economics Review Workshop', classSection: '12th Class', subject: 'Economics', price: '₹6,000', actualPrice: '₹9,000' },
  ])

  const toggleExpandedMenu = (label: string) => {
    setExpandedMenu((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const toggleExpandedSubMenu = (key: string) => {
    setExpandedSubMenu((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const openStudentPortal = () => {
    if (authUser) {
      setIsAccountMenuOpen((prev) => !prev)
      setIsAuthModalOpen(false)
      return
    }
    setIsAuthModalOpen((prev) => !prev)
    setIsAccountMenuOpen(false)
    setAuthError('')
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
    setAuthError('')
  }

  const handleEmailLogin = () => {
    if (!emailAddress.trim() || !password.trim()) {
      setAuthError('Enter your email address and password to continue.')
      return
    }
    setAuthUser({ label: emailAddress.trim(), method: 'email' })
    setPassword('')
    closeAuthModal()
  }

  const handlePhoneAuth = () => {
    if (!phoneNumber.trim()) {
      setAuthError('Enter your phone number to receive an OTP.')
      return
    }
    if (!isOtpSent) {
      setIsOtpSent(true)
      setAuthError('')
      return
    }
    if (otp.trim().length < 4) {
      setAuthError('Enter the OTP sent to your phone.')
      return
    }
    setAuthUser({ label: `${countryCode} ${phoneNumber}`.trim(), method: 'phone' })
    setOtp('')
    setIsOtpSent(false)
    closeAuthModal()
  }

  const signOut = () => {
    setAuthUser(null)
    setIsAccountMenuOpen(false)
    setIsAuthModalOpen(false)
    setEmailAddress('')
    setPassword('')
    setPhoneNumber('')
    setOtp('')
    setIsOtpSent(false)
    setAuthError('')
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
  const isViewingSubPage = isProfessionalTarget || !!academicItems

  return (
    <div className="tatvika-shell font-['Times_New_Roman',_serif]" style={{ fontFamily: '"Times New Roman", serif' }}>
      {/* FIXED: Directly forcing the exact sidebar blue background color here */}
      <header className="tatvika-header" style={{ backgroundColor: '#0081C9', borderBottomColor: 'rgba(255, 255, 255, 0.12)' }}>
        <div className="tatvika-header-spacer" />
        <h1 className="tatvika-brand">
          <Link to="/" className="tatvika-brand-link" style={{ color: '#D4AF37' }} onClick={() => setActiveSubPage('')}>
            <img src={tatvikaEmblem} alt="" className="tatvika-brand-emblem" />
            Tatvika Achievers
          </Link>
        </h1>
        <div className="tatvika-header-actions">
          <div className="tatvika-header-socials flex items-center gap-3 mr-4" aria-label="Official social channels">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${social.label}`}
                title={social.label}
                className={`tatvika-social-icon-link ${social.colorClassName}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <button
            type="button"
            className="tatvika-portal-link"
            aria-expanded={authUser ? isAccountMenuOpen : isAuthModalOpen}
            style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}
            onClick={openStudentPortal}
          >
            {authUser ? 'My Portal' : 'Student Portal'}
          </button>
        </div>
      </header>

      {authUser && isAccountMenuOpen && (
        <div className="tatvika-account-menu" role="menu" aria-label="Student portal account">
          <p className="tatvika-account-kicker">Signed in with {authUser.method}</p>
          <p className="tatvika-account-user">{authUser.label}</p>
          <div className="tatvika-account-actions">
            <Link to="/dashboard" className="tatvika-account-primary" onClick={() => { setIsAccountMenuOpen(false); setActiveSubPage(''); }}>
              Open Dashboard
            </Link>
            <button type="button" className="tatvika-account-secondary" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </div>
      )}

      <div className="tatvika-body">
        <aside className="tatvika-sidebar" style={{ color: '#cbd5e1' }}>
          <Link to="/" className="tatvika-sidebar-brand" aria-label="Tatvika Achievers home" onClick={() => setActiveSubPage('')}>
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
                    onClick={() => setActiveSubPage('')}
                    style={({ isActive }) => ({
                      backgroundColor: isActive && !isViewingSubPage ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                      color: isActive && !isViewingSubPage ? '#D4AF37' : '#cbd5e1',
                    })}
                    className={({ isActive }) =>
                      [
                        'tatvika-nav-link',
                        isActive && !isViewingSubPage ? 'tatvika-nav-link-active' : 'tatvika-nav-link-default',
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
                        isActive ? 'tatvika-nav-link-active' : 'tatvika-nav-link-default',
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
                                        justify: 'flex-start',
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
          <div className="tatvika-sidebar-socials mt-auto pb-6 px-4 flex justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${social.label}`}
                title={social.label}
                className={`tatvika-social-icon-link ${social.colorClassName}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
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
      </div>

      {isAuthModalOpen && (
        <div className="tatvika-auth-overlay" role="presentation" onMouseDown={closeAuthModal}>
          <section
            className="tatvika-auth-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="student-portal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.24em] text-[#D4AF37]">Secure access</p>
                <h2 id="student-portal-title" className="text-3xl font-semibold text-[#0A192F]">Student Portal</h2>
                <p className="mt-1 text-sm text-slate-600">Choose email or phone verification to continue.</p>
              </div>
              <button
                type="button"
                onClick={closeAuthModal}
                className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-[#0A192F] transition-colors hover:border-[#0A192F]"
              >
                Close
              </button>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-3 rounded-2xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('email')
                  setAuthError('')
                }}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${authMethod === 'email' ? 'bg-[#0A192F] text-white shadow-sm' : 'text-slate-700 hover:bg-white'}`}
              >
                Email Address
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('phone')
                  setAuthError('')
                }}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${authMethod === 'phone' ? 'bg-[#0A192F] text-white shadow-sm' : 'text-slate-700 hover:bg-white'}`}
              >
                Phone Number
              </button>
            </div>

            {authError && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {authError}
              </div>
            )}

            {authMethod === 'email' ? (
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(event) => setEmailAddress(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-colors focus:border-[#0A192F]"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-colors focus:border-[#0A192F]"
                    placeholder="Enter your password"
                  />
                </div>
                <button type="button" className="tatvika-auth-submit" onClick={handleEmailLogin}>
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
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-colors focus:border-[#0A192F]"
                    placeholder="+91"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-colors focus:border-[#0A192F]"
                    placeholder="Enter your phone number"
                  />
                </div>
                {isOtpSent && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">Enter OTP</label>
                    <input
                      type="text"
                      value={otp}
                      maxLength={6}
                      onChange={(event) => setOtp(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-colors focus:border-[#0A192F]"
                      placeholder="6-digit verification code"
                    />
                  </div>
                )}
                <button type="button" className="tatvika-auth-submit" onClick={handlePhoneAuth}>
                  {isOtpSent ? 'Verify & Login' : 'Send OTP'}
                </button>
              </div>
            )}
          </section>
        </div>
      )}
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