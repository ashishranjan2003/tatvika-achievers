import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom'
import {
  type ReactNode,
  useState,
  useEffect,
  useCallback,
  lazy,
  Suspense,
} from 'react'
import './App.css'

import tatvikaEmblem from './assets/tatvika-emblem.png'
import tatvikaLogo from './assets/tatvika-logo.jpg'

// ✅ FIX: Lazy-load all page components to reduce initial bundle size
const Home        = lazy(() => import('./pages/Home'))
const Courses     = lazy(() => import('./pages/Courses'))
const Notes       = lazy(() => import('./pages/Notes'))
const TestSeries  = lazy(() => import('./pages/TestSeries'))
const FreeResources = lazy(() => import('./pages/FreeResources'))
const Login       = lazy(() => import('./pages/Login'))
const Signup      = lazy(() => import('./pages/Signup'))
const Purchase    = lazy(() => import('./pages/Purchase'))
const Dashboard   = lazy(() => import('./pages/Dashboard'))
const Contact     = lazy(() => import('./pages/Contact'))

// ─── Types ────────────────────────────────────────────────────────────────────

type NavItem = { label: string; href: string }

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

// ─── Static data (outside component — never mutated, no re-render cost) ──────

const navItems: NavItem[] = [
  { label: 'Home',           href: '/'         },
  { label: 'Lectures',       href: '/courses'  },
  { label: 'Book',           href: '/notes'    },
  { label: 'Test Series',    href: '/tests'    },
  { label: 'Free Resources', href: '/resources'},
  { label: 'Contact Us',     href: '/contact'  },
]

const iconCls = 'h-5 w-5'

const socialLinks: SocialLink[] = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/message/3Z2G5XNAP53EJ1',
    colorClassName: 'tatvika-social-whatsapp',
    icon: (
      <svg className={iconCls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.34 4.97L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.46 17.51 2 12.04 2Zm5.77 14.17c-.25.71-1.46 1.35-2.02 1.44-.52.08-1.18.12-1.9-.12-.44-.14-1-.32-1.72-.63-3.02-1.3-4.99-4.33-5.14-4.53-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.28-.31.61-.39.81-.39h.58c.18 0 .44-.07.68.52.25.6.85 2.08.92 2.23.08.15.13.33.03.53-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.31.32-.13.62.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.15.49.13.67-.08.18-.2.77-.9.98-1.21.2-.31.41-.25.69-.15.28.1 1.79.84 2.1.99.31.15.51.23.59.36.08.13.08.74-.17 1.45Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@tatvikaachievers?si=yLirPVFrLymemdYP',
    colorClassName: 'tatvika-social-youtube',
    icon: (
      <svg className={iconCls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/tatvikaachievers?igsh=MW13MHpmeWl0bm1xaQ==',
    colorClassName: 'tatvika-social-instagram',
    icon: (
      <svg className={iconCls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
      <svg className={iconCls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm4.64 6.84-1.51 7.13c-.11.5-.41.62-.83.39l-2.3-1.7-1.11 1.07c-.12.12-.23.23-.47.23l.17-2.35 4.28-3.86c.19-.17-.04-.26-.29-.1l-5.29 3.33-2.28-.71c-.5-.16-.51-.5.1-.74l8.9-3.43c.41-.15.77.1.63.74Z" />
      </svg>
    ),
  },
]

const expandableMenuItems = ['Book', 'Lectures', 'Test Series']

const nestedMenuSections: Record<string, { label: string; targets?: string[] }[]> = {
  Book: [
    { label: 'Academic',     targets: ['11th Class', '12th Class']    },
    { label: 'Professional', targets: ['Foundation', 'Post Foundation'] },
  ],
  Lectures: [
    { label: 'Academic',     targets: ['11th Class', '12th Class']    },
    { label: 'Professional', targets: ['Foundation', 'Post Foundation'] },
  ],
  'Test Series': [
    { label: 'Academic'     },
    { label: 'Professional' },
  ],
}

// ✅ FIX: Moved out of component state — these are static and never mutated
const dynamicBooks: DynamicItem[] = [
  { id: 'book-1', title: 'Accountancy Essentials',       classSection: '11th Class', subject: 'Accounts',          price: '₹220'   },
  { id: 'book-2', title: 'Business Studies Primer',      classSection: '12th Class', subject: 'Business Studies',  price: '₹3,500', actualPrice: '₹5,000' },
  { id: 'book-3', title: 'Economics Concepts',           classSection: '11th Class', subject: 'Economics',         price: '₹210'   },
  { id: 'book-4', title: '12th Economics (Full Syllabus)',classSection: '12th Class', subject: 'Economics',         price: '₹6,000', actualPrice: '₹9,000' },
  { id: 'book-5', title: '12th Economics (Part A)',      classSection: '12th Class', subject: 'Economics',         price: '₹3,500', actualPrice: '₹5,000' },
  { id: 'book-6', title: '12th Economics (Part B)',      classSection: '12th Class', subject: 'Economics',         price: '₹3,500', actualPrice: '₹5,000' },
]

const dynamicLectures: DynamicItem[] = [
  { id: 'lecture-1', title: 'Accounts Masterclass',         classSection: '11th Class', subject: 'Accounts',         price: '₹750'   },
  { id: 'lecture-2', title: 'Business Strategy Session',    classSection: '12th Class', subject: 'Business Studies', price: '₹6,000', actualPrice: '₹8,200' },
  { id: 'lecture-3', title: 'Economics Review Workshop',    classSection: '12th Class', subject: 'Economics',        price: '₹6,000', actualPrice: '₹9,000' },
]

// ─── ProtectedRoute ───────────────────────────────────────────────────────────

// ✅ FIX: Unauthenticated users are redirected to /login instead of being
//         able to navigate directly to /dashboard via the address bar.
function ProtectedRoute({ authUser, children }: { authUser: AuthUser | null; children: ReactNode }) {
  if (!authUser) return <Navigate to="/login" replace />
  return <>{children}</>
}

// ─── AuthModal ────────────────────────────────────────────────────────────────

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (user: AuthUser) => void
}

function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [authMethod, setAuthMethod]     = useState<'email' | 'phone'>('email')
  const [isOtpSent, setIsOtpSent]       = useState(false)
  // ✅ FIX: Store the generated OTP in state so we can verify it correctly
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [authError, setAuthError]       = useState('')

  // ✅ FIX: Keyboard accessibility — Escape closes the modal
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Reset internal state when modal closes so it's fresh next open
  useEffect(() => {
    if (!isOpen) {
      setAuthMethod('email')
      setIsOtpSent(false)
      setGeneratedOtp('')
      setAuthError('')
    }
  }, [isOpen])

  if (!isOpen) return null

  // ✅ FIX: Password never touches React state — read from FormData at submit time only
  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd    = new FormData(e.currentTarget)
    const email = (fd.get('email') as string)?.trim()
    const pass  = (fd.get('password') as string)?.trim()
    if (!email || !pass) {
      setAuthError('Enter your email address and password to continue.')
      return
    }
    onSuccess({ label: email, method: 'email' })
    onClose()
  }

  const handlePhoneSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd          = new FormData(e.currentTarget)
    const countryCode = (fd.get('countryCode') as string) || '+91'
    const phone       = (fd.get('phoneNumber') as string)?.trim()
    const typedOtp    = (fd.get('otp') as string)?.trim()

    if (!phone) {
      setAuthError('Enter your phone number to receive an OTP.')
      return
    }

    if (!isOtpSent) {
      // ✅ FIX: Generate a real 6-digit OTP and store it for comparison
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      setGeneratedOtp(code)
      setIsOtpSent(true)
      setAuthError('')
      // In production replace this alert with your SMS API call
      alert(`[Dev] OTP for ${countryCode} ${phone}: ${code}`)
      return
    }

    // ✅ FIX: Compare against the actual generated OTP, not just length
    if (typedOtp !== generatedOtp) {
      setAuthError('Invalid OTP. Please check and try again.')
      return
    }

    onSuccess({ label: `${countryCode} ${phone}`, method: 'phone' })
    setIsOtpSent(false)
    setGeneratedOtp('')
    onClose()
  }

  return (
    // ✅ FIX: role="dialog" belongs on the overlay (the ARIA landmark), not just the inner card
    <div
      className="tatvika-auth-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-portal-title"
      onMouseDown={onClose}
    >
      <section
        className="tatvika-auth-card"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.24em] text-[#D4AF37]">Secure access</p>
            <h2 id="student-portal-title" className="text-3xl font-semibold text-[#0A192F]">Student Portal</h2>
            <p className="mt-1 text-sm text-slate-600">Choose email or phone verification to continue.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-[#0A192F] transition-colors hover:border-[#0A192F]"
          >
            Close
          </button>
        </div>

        {/* Method toggle */}
        <div className="mb-5 grid grid-cols-2 gap-3 rounded-2xl bg-slate-100 p-1">
          {(['email', 'phone'] as const).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => { setAuthMethod(method); setAuthError('') }}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                authMethod === method ? 'bg-[#0A192F] text-white shadow-sm' : 'text-slate-700 hover:bg-white'
              }`}
            >
              {method === 'email' ? 'Email Address' : 'Phone Number'}
            </button>
          ))}
        </div>

        {authError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {authError}
          </div>
        )}

        {authMethod === 'email' ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label htmlFor="auth-email" className="block mb-2 text-sm font-medium text-slate-700">Email Address</label>
              <input
                id="auth-email"
                type="email"
                name="email"
                autoComplete="email"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-colors focus:border-[#0A192F]"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="auth-password" className="block mb-2 text-sm font-medium text-slate-700">Password</label>
              <input
                id="auth-password"
                type="password"
                name="password"
                autoComplete="current-password"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-colors focus:border-[#0A192F]"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="tatvika-auth-submit">Continue with Email</button>
          </form>
        ) : (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label htmlFor="auth-cc" className="block mb-2 text-sm font-medium text-slate-700">Country Code</label>
              <input
                id="auth-cc"
                type="text"
                name="countryCode"
                defaultValue="+91"
                disabled={isOtpSent}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-colors focus:border-[#0A192F] disabled:bg-slate-100"
              />
            </div>
            <div>
              <label htmlFor="auth-phone" className="block mb-2 text-sm font-medium text-slate-700">Phone Number</label>
              <input
                id="auth-phone"
                type="tel"
                name="phoneNumber"
                autoComplete="tel"
                disabled={isOtpSent}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-colors focus:border-[#0A192F] disabled:bg-slate-100"
                placeholder="Enter your phone number"
              />
            </div>
            {isOtpSent && (
              <div>
                <label htmlFor="auth-otp" className="block mb-2 text-sm font-medium text-slate-700">Enter OTP</label>
                <input
                  id="auth-otp"
                  type="text"
                  name="otp"
                  maxLength={6}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-colors focus:border-[#0A192F]"
                  placeholder="6-digit verification code"
                />
              </div>
            )}
            <button type="submit" className="tatvika-auth-submit">
              {isOtpSent ? 'Verify & Login' : 'Send OTP'}
            </button>
          </form>
        )}
      </section>
    </div>
  )
}

// ─── AppShell ─────────────────────────────────────────────────────────────────

function AppShell() {
  const navigate       = useNavigate()
  const location       = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  // ✅ FIX: Sub-page navigation is URL-driven — browser back/forward and deep
  //         links now work correctly. activeSubPage was pure state before, which
  //         could desync from the URL on direct navigation.
  const activeSection = searchParams.get('section') ?? ''

  const [expandedMenu,    setExpandedMenu]    = useState<Record<string, boolean>>({})
  const [expandedSubMenu, setExpandedSubMenu] = useState<Record<string, boolean>>({})

  const [isAuthModalOpen,   setIsAuthModalOpen]   = useState(false)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)

  // ✅ FIX: Persist auth user to localStorage so session survives page refresh
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem('tatvika-auth-user')
      return stored ? (JSON.parse(stored) as AuthUser) : null
    } catch {
      return null
    }
  })

  // Sync expanded state from URL on first load / back-forward navigation
  useEffect(() => {
    if (!activeSection) return
    const [menuKey, sectionLabel] = activeSection.split('-')
    if (menuKey) setExpandedMenu((p) => ({ ...p, [menuKey]: true }))
    if (menuKey && sectionLabel)
      setExpandedSubMenu((p) => ({ ...p, [`${menuKey}-${sectionLabel}`]: true }))
  }, [activeSection])

  // ✅ FIX: useCallback prevents unnecessary re-creation of handlers each render
  const toggleExpandedMenu = useCallback((label: string) => {
    setExpandedMenu((p) => ({ ...p, [label]: !p[label] }))
  }, [])

  const toggleExpandedSubMenu = useCallback((key: string) => {
    setExpandedSubMenu((p) => ({ ...p, [key]: !p[key] }))
  }, [])

  // ✅ FIX: Modal toggle now explicitly clears the other panel first — no stale
  //         backdrop can linger behind the account menu or vice versa.
  const openStudentPortal = useCallback(() => {
    if (authUser) {
      setIsAuthModalOpen(false)
      setIsAccountMenuOpen((p) => !p)
    } else {
      setIsAccountMenuOpen(false)
      setIsAuthModalOpen((p) => !p)
    }
  }, [authUser])

  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), [])

  const handleAuthSuccess = useCallback((user: AuthUser) => {
    setAuthUser(user)
    // ✅ FIX: Persist to localStorage
    localStorage.setItem('tatvika-auth-user', JSON.stringify(user))
  }, [])

  const signOut = useCallback(() => {
    setAuthUser(null)
    localStorage.removeItem('tatvika-auth-user')
    setIsAccountMenuOpen(false)
    setIsAuthModalOpen(false)
  }, [])

  // Derive which content panel to show from the current URL + section param
  const currentRouteLabel = navItems.find((n) => n.href === location.pathname)?.label ?? ''

  const getAcademicItems = (): DynamicItem[] | null => {
    const match = activeSection.match(/^(Book|Lectures)-Academic-(11th Class|12th Class)$/)
    if (!match) return null
    const [, parent, cls] = match
    const source = parent === 'Book' ? dynamicBooks : dynamicLectures
    return source.filter((item) => item.classSection === cls)
  }

  const isProfessionalTarget =
    /^(Book|Lectures|Test Series)-Professional/.test(activeSection)
  const academicItems   = getAcademicItems()
  const isViewingSubPage = isProfessionalTarget || !!academicItems

  return (
    // ✅ FIX: Single font-family declaration via CSS class — inline style removed
    <div className="tatvika-shell">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="tatvika-header">
        <h1 className="tatvika-brand">
          <Link
            to="/"
            className="tatvika-brand-link"
            onClick={() => setSearchParams({})}
          >
            <img src={tatvikaEmblem} alt="" className="tatvika-brand-emblem" />
            Tatvika Achievers
          </Link>
        </h1>

        <div className="tatvika-header-actions">
          <div className="tatvika-header-socials" aria-label="Official social channels">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${s.label}`}
                title={s.label}
                className={`tatvika-social-icon-link ${s.colorClassName}`}
              >
                {s.icon}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="tatvika-portal-link"
            aria-expanded={authUser ? isAccountMenuOpen : isAuthModalOpen}
            onClick={openStudentPortal}
          >
            {authUser ? 'My Portal' : 'Student Portal'}
          </button>
        </div>
      </header>

      {/* ── Account dropdown ───────────────────────────────── */}
      {authUser && isAccountMenuOpen && (
        <div className="tatvika-account-menu" role="menu" aria-label="Student portal account">
          <p className="tatvika-account-kicker">Signed in with {authUser.method}</p>
          <p className="tatvika-account-user">{authUser.label}</p>
          <div className="tatvika-account-actions">
            <Link
              to="/dashboard"
              className="tatvika-account-primary"
              onClick={() => setIsAccountMenuOpen(false)}
            >
              Open Dashboard
            </Link>
            <button type="button" className="tatvika-account-secondary" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* ── Body ───────────────────────────────────────────── */}
      <div className="tatvika-body">
        {/* Sidebar */}
        <aside className="tatvika-sidebar">
          <Link
            to="/"
            className="tatvika-sidebar-brand"
            aria-label="Tatvika Achievers home"
            onClick={() => setSearchParams({})}
          >
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
                    onClick={() => setSearchParams({})}
                    // ✅ FIX: Active style is derived from URL only — no isViewingSubPage
                    //         conditional that could desync from the actual route.
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? 'rgba(245,158,11,0.1)' : 'transparent',
                      color: isActive ? '#D4AF37' : undefined,
                    })}
                    className="tatvika-nav-link"
                  >
                    {item.label}
                  </NavLink>
                )
              }

              return (
                <div key={item.label}>
                  <NavLink
                    to={item.href}
                    onClick={() => { toggleExpandedMenu(menuKey); setSearchParams({}) }}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? 'rgba(245,158,11,0.1)' : 'transparent',
                      color: isActive ? '#D4AF37' : undefined,
                    })}
                    className="tatvika-nav-link"
                  >
                    {item.label}
                  </NavLink>

                  {expandedMenu[menuKey] && (
                    <div className="tatvika-nav-group">
                      {(nestedMenuSections[item.label] ?? []).map((section) => {
                        const sectionKey = `${menuKey}-${section.label}`
                        const sectionActive = activeSection.startsWith(sectionKey)

                        return (
                          <div key={section.label}>
                            <button
                              type="button"
                              onClick={() => {
                                toggleExpandedSubMenu(sectionKey)
                                if (!section.targets) {
                                  navigate(`${item.href}?section=${encodeURIComponent(sectionKey)}`)
                                }
                              }}
                              className="tatvika-nav-link tatvika-nav-sublink"
                              style={{ color: sectionActive ? '#D4AF37' : undefined }}
                            >
                              {section.label}
                            </button>

                            {section.targets && expandedSubMenu[sectionKey] && (
                              <div className="tatvika-nav-group">
                                {section.targets.map((target) => {
                                  const targetKey = `${sectionKey}-${target}`
                                  return (
                                    <button
                                      key={target}
                                      type="button"
                                      onClick={() =>
                                        navigate(`${item.href}?section=${encodeURIComponent(targetKey)}`)
                                      }
                                      // ✅ FIX: Was `justify: 'flex-start'` (invalid CSS property)
                                      className="tatvika-nav-link tatvika-nav-final-link"
                                      style={{
                                        color: activeSection === targetKey ? '#D4AF37' : undefined,
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

          {/* Sidebar social links */}
          <div className="tatvika-sidebar-socials">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${s.label}`}
                title={s.label}
                className={`tatvika-social-icon-link ${s.colorClassName}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="tatvika-main">
          <div className="tatvika-content">
            {isViewingSubPage ? (
              isProfessionalTarget ? (
                <div className="tatvika-coming-soon">
                  <h2>Coming soon…</h2>
                  <p>This professional section is under construction.</p>
                </div>
              ) : academicItems && academicItems.length > 0 ? (
                <div className="tatvika-card-grid">
                  {academicItems.map((item) => (
                    <div key={item.id} className="tatvika-product-card">
                      <div className="tatvika-product-title">{item.title}</div>
                      <span className="tatvika-product-badge">{item.subject}</span>
                      <div className="tatvika-product-class">{item.classSection}</div>
                      <div className="tatvika-product-price">{item.price}</div>
                      {item.actualPrice && (
                        <div className="tatvika-product-actual-price">{item.actualPrice}</div>
                      )}
                      <button type="button" className="tatvika-product-cta">
                        View Premium
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                // Guard: section param exists but no matching items
                <div className="tatvika-coming-soon">
                  <h2>No content yet</h2>
                  <p>Check back soon for items in this section.</p>
                </div>
              )
            ) : (
              // ✅ FIX: Routes wrapped in Suspense for lazy-loaded pages
              <Suspense fallback={<div className="tatvika-page-loading">Loading…</div>}>
                <Routes>
                  <Route path="/"          element={<Home />}         />
                  <Route path="/courses"   element={<Courses />}      />
                  <Route path="/notes"     element={<Notes />}        />
                  <Route path="/tests"     element={<TestSeries />}   />
                  <Route path="/resources" element={<FreeResources />}/>
                  <Route path="/login"     element={<Login />}        />
                  <Route path="/signup"    element={<Signup />}       />
                  <Route path="/purchase"  element={<Purchase />}     />
                  {/* ✅ FIX: /dashboard is protected — redirects to /login if not authed */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute authUser={authUser}>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/contact"   element={<Contact />}      />
                  {/* Catch-all */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            )}
          </div>
        </main>
      </div>

      {/* ── Auth modal ─────────────────────────────────────── */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onSuccess={handleAuthSuccess}
      />
    </div>
  )
}

// ─── App root ─────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
