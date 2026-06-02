# Tatvika Achievers - Premium EdTech Design System Setup Guide

## 🎯 Overview

This document provides a comprehensive guide to the Tatvika Achievers Premium EdTech Design System, initialized with premium design tokens for a world-class educational platform.

## ✨ Design System Specifications

### Color Tokens

| Color | Value | Purpose |
|-------|-------|---------|
| **Primary Navy** | `#0A192F` | Trust, academics, primary actions |
| **Premium Gold** | `#D4AF37` | Achievement, success, accents |
| **Pure White** | `#FFFFFF` | Primary background |
| **Ultra-light Gray** | `#F8FAFC` | Secondary background |
| **Success** | `#10B981` | Positive states |
| **Warning** | `#F59E0B` | Cautionary states |
| **Error** | `#EF4444` | Error states |
| **Info** | `#3B82F6` | Informational states |

### Typography System

**Font Stack:**
- Primary: Inter (sans-serif)
- Secondary: Roboto (sans-serif)
- Monospace: Fira Code

**Heading Hierarchy (Strict):**
- **H1**: 48px, 800 weight, line-height 1.2
- **H2**: 36px, 700 weight, line-height 1.25
- **H3**: 30px, 700 weight, line-height 1.3
- **H4**: 24px, 600 weight, line-height 1.4
- **H5**: 20px, 600 weight, line-height 1.5
- **H6**: 16px, 600 weight, line-height 1.5

**Body Text:**
- Large: 18px, 400 weight, line-height 1.75
- Regular: 16px, 400 weight, line-height 1.5
- Small: 14px, 400 weight, line-height 1.5

### Layout System

- **Max-width Container**: 1280px
- **Spacing Scale**: 8px-based (4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px, 64px, 80px, 96px, 128px, 160px)
- **Grid Gaps**: Consistent gap-6 (24px) or gap-8 (32px)
- **Breakpoints**: 
  - xs: 0px
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

### Visual Effects

**Glassmorphism:**
```css
background: rgba(255, 255, 255, 0.45);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.25);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
```

**Shadows (6 levels):**
- XS: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- SM: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- MD: 0 4px 6px -1px rgba(0, 0, 0, 0.1) [default for cards]
- LG: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
- XL: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
- 2XL: 0 25px 50px -12px rgba(0, 0, 0, 0.25)

## 📁 Directory Structure

```
frontend/
├── src/
│   ├── design-system/
│   │   ├── tokens.ts                 # TypeScript design tokens
│   │   ├── index.ts                  # Main export file
│   │   ├── index.css                 # Master CSS import
│   │   ├── colors.css                # Color system & utilities
│   │   ├── typography.css            # Typography & text utilities
│   │   ├── spacing.css               # Spacing, layout, grid utilities
│   │   ├── effects.css               # Shadows, borders, animations
│   │   ├── components.css            # Pre-built component styles
│   │   ├── hooks.ts                  # React hooks for styling
│   │   └── README.md                 # Detailed design system docs
│   ├── components/
│   │   └── DesignSystemShowcase.tsx  # Example component (demo)
│   ├── index.css                     # Imports design system
│   ├── main.tsx                      # App entry point
│   └── App.tsx                       # Main app component
├── tailwind.config.js                # Tailwind configuration
├── DESIGN_SYSTEM_SETUP.md            # This file
└── package.json
```

## 🚀 Quick Start

### 1. **Using CSS Utility Classes**

```html
<!-- Colors -->
<div class="bg-primary-navy text-white">Navy Background</div>
<div class="text-primary">Primary Text Color</div>

<!-- Typography -->
<h1 class="text-5xl font-extrabold">Main Heading</h1>
<p class="text-base leading-normal">Body text</p>

<!-- Spacing -->
<div class="p-6 m-4 gap-6">Content with padding</div>

<!-- Effects -->
<div class="card shadow-lg rounded-lg">Premium Card</div>
<div class="glass-effect p-6">Glassmorphism</div>

<!-- Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <!-- Grid items -->
</div>
```

### 2. **Using CSS Variables**

```css
.my-component {
  color: var(--color-primary-navy);
  background: var(--color-bg-secondary);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  font-family: var(--font-family-primary);
}
```

### 3. **Using TypeScript Tokens**

```typescript
import { colors, typography, spacing, effects } from '@/design-system';

// Access tokens
const primaryColor = colors.primary.navy;
const headingStyle = typography.heading.h1;
const containerPadding = spacing[6];

// Use in React
const Component = () => (
  <div style={{ 
    backgroundColor: colors.background.primary,
    padding: spacing[4]
  }}>
    Content
  </div>
);
```

### 4. **Using React Hooks**

```typescript
import { 
  useThemedColor, 
  useMediaQuery, 
  getTypographyPreset,
  getSpacing 
} from '@/design-system/hooks';

const ResponsiveComponent = () => {
  const primaryColor = useThemedColor('primary.navy');
  const isLargeScreen = useMediaQuery('lg');
  const headingStyle = getTypographyPreset('h2');
  const padding = getSpacing('md');

  return (
    <div style={{ paddingTop: padding }}>
      {isLargeScreen && <h2 style={headingStyle}>Large Screen</h2>}
    </div>
  );
};
```

## 🧩 Pre-built Components

### Buttons
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary (Gold)</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large</button>
```

### Cards
```html
<div class="card">
  <div class="card-header"><h3>Title</h3></div>
  <div class="card-body">Content</div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>

<!-- Glass Card -->
<div class="card-glass">Glass Effect Card</div>
```

### Forms
```html
<div class="form-group">
  <label for="input" class="form-label">Label</label>
  <input id="input" class="form-input" type="text" />
  <div class="form-help">Helper text</div>
</div>
```

### Badges
```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-gold">Gold</span>
<span class="badge badge-success">Success</span>
```

### Alerts
```html
<div class="alert alert-success">
  <div class="alert-icon">✓</div>
  <div class="alert-content">Success message</div>
</div>
```

## 📊 CSS Variables Reference

### Colors
```css
--color-primary-navy: #0a192f;
--color-gold-premium: #d4af37;
--color-bg-primary: #ffffff;
--color-text-primary: #0a192f;
--color-success: #10b981;
--color-error: #ef4444;
```

### Typography
```css
--font-family-primary: 'Inter', ...;
--font-size-base: 1rem;
--font-weight-bold: 700;
--line-height-normal: 1.5;
```

### Spacing
```css
--spacing-4: 1rem;
--spacing-6: 1.5rem;
--gap-md: 1rem;
--container-max-width: 1280px;
```

### Effects
```css
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--radius-lg: 0.75rem;
--transition-base: 250ms ease;
--glass-background: rgba(255, 255, 255, 0.45);
```

## 🎨 Customization Guide

### Changing Primary Color

1. Update `tokens.ts`:
```typescript
primary: {
  navy: '#NEW_COLOR_HEX', // Change this
  // ... other shades
}
```

2. Update `colors.css`:
```css
--color-primary-navy: #NEW_COLOR_HEX;
```

### Adding New Colors

1. Add to `tokens.ts` in `colors` object
2. Add CSS variable to `colors.css`
3. Create utility classes if needed
4. Update documentation

### Extending Typography

Add custom font sizes to `typography.css` and `tokens.ts`:

```typescript
fontSize: {
  // Add new size
  'custom': '1.5rem',
}
```

## 🔧 Development

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## 📚 Available Imports

### From `@/design-system`

```typescript
// All tokens
import { 
  colors,
  typography,
  spacing,
  gap,
  layout,
  effects,
  transitions,
  components,
  designSystem
} from '@/design-system';

// From hooks
import {
  useThemedColor,
  useDesignClass,
  useBreakpoints,
  useMediaQuery,
  getTypographyPreset,
  getSpacing,
  createResponsiveStyles,
  mergeStyles
} from '@/design-system/hooks';
```

## ✅ Best Practices

1. **Use Design Tokens**: Always use tokens instead of hardcoding colors
2. **Consistent Spacing**: Follow the 8px scale
3. **Typography Hierarchy**: Maintain strict heading hierarchy
4. **Container Max-width**: Wrap content in containers with max-width: 1280px
5. **Responsive Design**: Use mobile-first approach with breakpoints
6. **Glass Effects**: Use for premium components, not every element
7. **Shadows**: Use appropriate shadow levels (md for cards, lg for elevated)
8. **Transitions**: Use `transition-base` (250ms) as default duration

## 🎯 Example: Building a Component

```typescript
import React from 'react';
import { colors, spacing } from '@/design-system';

const PremiumCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="card glass-effect p-6 rounded-xl">
      <h3 
        className="text-2xl font-bold mb-4"
        style={{ color: colors.primary.navy }}
      >
        {title}
      </h3>
      <div style={{ padding: spacing[4] }}>
        {children}
      </div>
    </div>
  );
};

export default PremiumCard;
```

## 📖 Additional Resources

- **Detailed Docs**: See `src/design-system/README.md`
- **Example Component**: See `src/components/DesignSystemShowcase.tsx`
- **CSS Files**: Check individual CSS files for all utilities
- **TypeScript Types**: All tokens are fully typed in `tokens.ts`

## 🔗 Tailwind CSS Integration

The project includes a `tailwind.config.js` that extends Tailwind with all design system tokens:

```javascript
// Already configured with:
// - All color tokens
// - Custom spacing scale
// - Typography settings
// - Custom effects (glassmorphism)
// - Glass effect utilities
```

To use Tailwind classes:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then use Tailwind classes directly:

```html
<div class="bg-primary-navy text-white p-6 rounded-lg shadow-lg">
  Premium Component
</div>
```

## 🎓 Learning Path

1. **Start Simple**: Use CSS utility classes
2. **Add Depth**: Learn CSS variables
3. **Go Pro**: Use TypeScript tokens
4. **Master**: Use React hooks for responsive design

## 🐛 Troubleshooting

### Colors not applying?
- Make sure `index.css` is imported in `main.tsx`
- Check for CSS specificity issues
- Clear browser cache

### Fonts not loading?
- Check if Google Fonts are imported in `typography.css`
- Verify internet connection
- Check font loading in DevTools

### Responsive classes not working?
- Ensure Tailwind is configured correctly
- Use proper breakpoint syntax: `md:`, `lg:`, `xl:`
- Check `tailwind.config.js`

## 📞 Support

For design system questions or updates:
1. Check `src/design-system/README.md`
2. Review example component: `DesignSystemShowcase.tsx`
3. Consult token files: `tokens.ts`

---

**Tatvika Achievers Premium EdTech Design System** | Excellence in Design & Education
