/**
 * Tatvika Achievers - Global Layout Component
 * Includes sticky header, responsive navigation, footer, and theme toggle
 */

import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Layout.css';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Courses', href: '/courses' },
  { label: 'Notes', href: '/notes' },
  { label: 'Test Series', href: '/tests' },
  { label: 'Free Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Header Component - Sticky navbar with responsive mobile menu
 */
const Header: React.FC<{ theme: 'light' | 'dark'; toggleTheme: () => void }> = ({
  theme,
  toggleTheme,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`header header-${theme}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="logo">
          <h1 className="text-2xl font-bold text-primary-navy">
            Tatvika <span className="text-gold-premium">Achievers</span>
          </h1>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg
                className="w-6 h-6 text-gold-premium"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m3.08 3.08l4.24 4.24M1 12h6m6 0h6m-15.78 7.78l4.24-4.24m3.08-3.08l4.24-4.24" />
              </svg>
            )}
          </button>

          {/* Student Portal Button (Desktop) */}
          <Link to="/login" className="btn btn-primary hidden md:inline-flex">
            Student Portal
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <nav className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="nav-link-mobile px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-primary"
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/login" className="btn btn-primary w-full mt-4">
              Student Portal
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

const Sidebar: React.FC = () => (
  <aside className="sidebar hidden lg:block border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
    <div className="sticky top-0 h-screen pt-6 pb-10 px-6">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.35em] text-primary">Navigate</p>
        <h2 className="mt-3 text-2xl font-bold text-primary-navy">Sections</h2>
      </div>
      <nav className="space-y-3">
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.href}
            className={({ isActive }) =>
              `sidebar-link block rounded-3xl px-5 py-3 transition-all ${
                isActive
                  ? 'bg-primary-navy text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  </aside>
);

/**
 * Footer Component - Multi-column footer with social icons and newsletter
 */
const Footer: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('loading');
    
    // Simulate subscription
    setTimeout(() => {
      if (email) {
        setSubscribeStatus('success');
        setEmail('');
        setTimeout(() => setSubscribeStatus('idle'), 3000);
      } else {
        setSubscribeStatus('error');
      }
    }, 1000);
  };

  const footerLinks = {
    "Quick Links": [
      { label: 'Dashboard', href: '#' },
      { label: 'My Courses', href: '#' },
      { label: 'My Notes', href: '#' },
      { label: 'Test Series', href: '#' },
    ],
    Resources: [
      { label: 'Study Materials', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Documentation', href: '#' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '/contact' },
    ],
    Legal: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Support', href: '#' },
    ],
  };

  const socialIcons = [
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 11-3.14 1.53 4.48 4.48 0 00.666-.066A6.46 6.46 0 0120 3c-2.343 1.039-4.847 1.572-7.5 1.572" />
        </svg>
      ),
      href: '#',
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        </svg>
      ),
      href: '#',
    },
    {
      name: 'YouTube',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.54c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
        </svg>
      ),
      href: '#',
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 011-1h3z" />
        </svg>
      ),
      href: '#',
    },
  ];

  return (
    <footer className={`footer footer-${theme} mt-20`}>
      {/* Newsletter Section */}
      <div className="newsletter-section bg-gradient-to-r from-primary-navy to-primary-navy-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-blue-100 mb-6">
              Get the latest courses, notes, and study materials delivered to your inbox
            </p>
            
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input flex-1"
                disabled={subscribeStatus === 'loading'}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={subscribeStatus === 'loading'}
              >
                {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            {subscribeStatus === 'success' && (
              <p className="text-green-200 text-sm mt-2">✓ Subscribed successfully!</p>
            )}
            {subscribeStatus === 'error' && (
              <p className="text-red-200 text-sm mt-2">✕ Please enter a valid email</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-white dark:bg-gray-900 py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <h4 className="text-xl font-bold text-primary-navy mb-4">
                Tatvika <span className="text-gold-premium">Achievers</span>
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Empowering students with premium educational content and resources.
              </p>
              <div className="flex gap-3">
                {socialIcons.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-navy hover:text-white transition-all"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links Columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h5 className="font-semibold text-primary-navy mb-4">{category}</h5>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gold-premium transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h6 className="font-semibold text-primary-navy mb-2">Email</h6>
                <a
                  href="mailto:support@tatvikaachievers.com"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gold-premium"
                >
                  support@tatvikaachievers.com
                </a>
              </div>
              <div>
                <h6 className="font-semibold text-primary-navy mb-2">Phone</h6>
                <a
                  href="tel:+919876543210"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gold-premium"
                >
                  +91 98765 43210
                </a>
              </div>
              <div>
                <h6 className="font-semibold text-primary-navy mb-2">Address</h6>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  123 Education Hub, New Delhi, India
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2026 Tatvika Achievers. All rights reserved. Built with ❤️ for students.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Global Layout Component
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('tatvika-theme');
      return (saved as 'light' | 'dark') || 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('tatvika-theme', theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`layout-wrapper ${theme}`} data-theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />

      <div className="layout-body lg:grid lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="main-content min-h-screen px-6 py-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>

      <Footer theme={theme} />
    </div>
  );
};

export default Layout;
export { Header, Footer };