/**
 * Tatvika Achievers - Layout Component Documentation
 * Global Shell with Header, Footer, and Theme Toggle
 */

# Global Layout Component

## Overview

The `Layout` component is the global shell for your Tatvika Achievers application. It provides:

✅ **Sticky Header/Navbar** - With logo, navigation links, theme toggle, and mobile menu  
✅ **Responsive Mobile Menu** - Hamburger menu for small screens  
✅ **Premium Multi-Column Footer** - With quick links, contacts, social icons, newsletter signup  
✅ **Dark/Light Mode Toggle** - State management for theme switching  
✅ **Main Content Area** - Where your page content renders  

## File Structure

```
src/components/
├── Layout.tsx          # Main Layout component
├── Layout.css          # Styling for Layout
└── ... (other components)
```

## Usage

### Basic Setup in App.tsx

```typescript
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      {/* Your page content goes here */}
      <main className="container mx-auto py-12">
        <h1>Your Page Content</h1>
        {/* ... */}
      </main>
    </Layout>
  )
}

export default App
```

### What Layout Provides

#### 1. **Header Component**

The header includes:

- **Logo**: "Tatvika Achievers" with premium branding
- **Navigation Links**: Home, About, Courses, Notes, Test Series, Free Resources
- **Desktop Navigation**: Visible on lg screens and above
- **Mobile Hamburger Menu**: Collapsible menu for mobile devices
- **Theme Toggle Button**: Switch between light and dark modes
- **Student Portal Button**: CTA button for login

**Header Features:**
- Sticky positioning (stays at top while scrolling)
- Smooth transitions
- Responsive design (hamburger menu on mobile)
- Accessibility support (focus states, semantic HTML)
- Golden underline animation on nav links

#### 2. **Footer Component**

The footer is premium and multi-column with:

**Newsletter Section:**
- Gradient background (navy gradient)
- Newsletter signup form with email input
- Subscribe button with loading/success states
- Real-time validation feedback

**Main Footer Content:**
- Brand section with description and social icons
- 4 footer link columns:
  - Quick Links (Dashboard, My Courses, My Notes, Test Series)
  - Resources (Study Materials, Blog, FAQ, Documentation)
  - Company (About Us, Careers, Press, Contact)
  - Legal (Terms, Privacy, Cookies, Support)

**Contact Information:**
- Email: support@tatvikaachievers.com
- Phone: +91 98765 43210
- Address: 123 Education Hub, New Delhi, India

**Social Media Icons:**
- Twitter, LinkedIn, YouTube, Facebook
- Hover effects with transform animations

**Copyright Notice:**
- Year automatically handled
- "Built with ❤️ for students"

#### 3. **Theme Toggle**

The Layout manages light/dark mode state:

```typescript
// The theme state is internal to Layout
const [theme, setTheme] = useState<'light' | 'dark'>('light')

// Toggle function is called when user clicks theme button
const toggleTheme = () => {
  setTheme(theme === 'light' ? 'dark' : 'light')
  document.documentElement.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light')
}
```

**Theme Features:**
- Two SVG icons (moon for light mode, sun for dark mode)
- Smooth color transitions
- Applied to entire app
- Persisted in DOM data attribute (you can add localStorage if needed)

## Component Structure

```
<Layout>
  ├── <Header>
  │   ├── Logo
  │   ├── Desktop Navigation
  │   ├── Theme Toggle Button
  │   ├── Student Portal Button
  │   └── Mobile Hamburger Menu
  │       └── Mobile Navigation Menu
  │
  ├── <main> (main-content)
  │   └── {children}
  │
  └── <Footer>
      ├── Newsletter Section
      ├── Main Footer
      │   ├── Brand Section
      │   ├── Footer Links (4 columns)
      │   ├── Contact Info
      │   └── Social Icons
      └── Copyright
```

## Styling Integration

The Layout uses the design system:

- **Colors**: From design tokens (primary navy, gold, etc.)
- **Typography**: Design system fonts and sizes
- **Spacing**: 8px-based spacing scale
- **Effects**: Glassmorphism for premium feel
- **Animations**: Smooth transitions (250ms)

### CSS Classes Available

All design system classes work within Layout:

```html
<!-- Buttons -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>

<!-- Text -->
<h1 class="text-5xl font-extrabold">Heading</h1>
<p class="text-base text-gray-600">Paragraph</p>

<!-- Spacing -->
<div class="container mx-auto py-12 px-4">

<!-- Forms -->
<input class="form-input" type="text" />
<div class="form-help">Helper text</div>

<!-- Colors -->
<div class="bg-primary-navy text-white">Dark background</div>
<div class="text-gold-premium">Gold text</div>
```

## Responsive Design

The Layout is fully responsive:

**Desktop (lg and above):**
- Full navigation menu displayed
- Student Portal button visible
- Multi-column footer layout

**Tablet (md to lg):**
- Navigation starts to compress
- Student Portal button visible
- Footer adjusts columns

**Mobile (sm to md):**
- Hamburger menu for navigation
- Student Portal button in mobile menu
- Single-column footer
- Touch-friendly spacing

**Extra Small (xs to sm):**
- Compact header
- Full-screen mobile menu
- Single-column layout
- Optimized touch targets

## Dark Mode Implementation

The Layout applies dark mode through CSS classes:

**Light Mode (default):**
```css
.header-light { background: white; }
.footer-light { background: white; }
```

**Dark Mode:**
```css
.header-dark { background: #040D19; }  /* Primary Navy 800 */
.footer-dark { background: #111827; }  /* Primary Navy 900 */
```

Theme colors automatically adjust:
- Text colors inverse
- Borders become lighter
- Hover states adapt
- All transitions are smooth

## Customization

### Changing Navigation Links

Edit in `Layout.tsx`:

```typescript
const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#' },
  // Add more links here
]
```

### Changing Footer Links

Edit in `Layout.tsx`:

```typescript
const footerLinks = {
  'Quick Links': [
    { label: 'Dashboard', href: '#' },
    // Add more links
  ],
  // Edit other sections
}
```

### Changing Social Icons

Modify the `socialIcons` array in `Layout.tsx` with SVG icons

### Newsletter Handler

The newsletter form includes email validation:

```typescript
const handleSubscribe = (e: React.FormEvent) => {
  e.preventDefault()
  setSubscribeStatus('loading')
  
  // Add your API call here
  // Example: await api.subscribe(email)
  
  setTimeout(() => {
    setSubscribeStatus('success')
    setEmail('')
  }, 1000)
}
```

To connect to backend:
1. Replace setTimeout with API call
2. Handle loading state
3. Show success/error feedback
4. Store subscription

## Accessibility Features

✅ **Semantic HTML**: Proper header, main, footer, nav tags  
✅ **ARIA Labels**: Menu toggle and theme button have aria-labels  
✅ **Focus States**: Clear keyboard navigation  
✅ **Color Contrast**: WCAG AA compliant  
✅ **Mobile Friendly**: Touch targets are 44px minimum  
✅ **Reduced Motion**: Respects prefers-reduced-motion  

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

## Performance Considerations

- **Header**: Sticky positioning (no performance issues)
- **Mobile Menu**: Closes on navigation
- **Theme Toggle**: Uses className (fast)
- **Newsletter**: Client-side validation only (before API)
- **Animations**: Use CSS transforms (GPU accelerated)

## Common Use Cases

### Add a New Page

```typescript
import Layout from '@/components/Layout'

function CoursesPage() {
  return (
    <Layout>
      <div className="container mx-auto py-12">
        <h1 className="text-5xl font-bold mb-8">Courses</h1>
        {/* Your courses content */}
      </div>
    </Layout>
  )
}
```

### Navigate with Routing

When you add routing (React Router):

```typescript
// In Layout.tsx
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Notes', href: '/notes' },
]

// Use Link component
import { Link } from 'react-router-dom'

// Then update the anchor tags to use Link
<Link to={link.href}>{link.label}</Link>
```

### Connect Newsletter API

```typescript
const handleSubscribe = async (e: React.FormEvent) => {
  e.preventDefault()
  setSubscribeStatus('loading')
  
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
    
    if (response.ok) {
      setSubscribeStatus('success')
      setEmail('')
    } else {
      setSubscribeStatus('error')
    }
  } catch (error) {
    setSubscribeStatus('error')
  }
}
```

## Troubleshooting

### Mobile menu not closing

Check that `setIsMobileMenuOpen(false)` is called in the link `onClick` handler

### Dark mode not applying

Ensure `Layout.css` is imported and that the CSS variables are available from design system

### Footer not sticking to bottom

The Layout wrapper uses `flex` with `min-height: 100vh` - main content has `flex: 1`

### Theme toggle not working

Check that the toggle button calls `toggleTheme()` and updates the state

## Next Steps

1. ✅ Layout component created
2. Next: Create page templates (Hero, Features, Testimonials, etc.)
3. Then: Add routing with React Router
4. Then: Connect to backend APIs
5. Then: Implement user authentication

---

**Tatvika Achievers Global Layout** | Ready for premium educational content
