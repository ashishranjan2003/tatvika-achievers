# Tatvika Achievers - Premium EdTech Design System

A comprehensive, production-ready design system for the Tatvika Achievers platform, embodying trust, achievement, and premium aesthetics through carefully curated design tokens.

## 🎨 Design Philosophy

The Tatvika Achievers Design System is built on three core principles:

1. **Trust & Academics** - Represented by Deep Navy Blue (#0A192F)
2. **Achievement & Success** - Represented by Subtle Premium Gold (#D4AF37)
3. **Premium Simplicity** - Glassmorphism effects and clean typography

## 📦 System Structure

```
src/design-system/
├── tokens.ts              # TypeScript design tokens (colors, typography, spacing, etc.)
├── index.ts              # Main export file for all tokens and utilities
├── index.css             # Master CSS import (aggregates all CSS files)
├── colors.css            # Color system and utilities
├── typography.css        # Typography scales and utilities
├── spacing.css           # Spacing, layout, flexbox, and grid utilities
├── effects.css           # Shadows, borders, glassmorphism, animations
├── components.css        # Pre-built component styles (buttons, cards, forms, etc.)
├── hooks.ts              # React hooks for design system integration
└── README.md             # This file
```

## 🎯 Key Design Tokens

### Colors

#### Primary Palette
- **Deep Navy Blue**: `#0A192F` - Primary color for trust and academics
- **Subtle Premium Gold**: `#D4AF37` - Secondary accent for achievement
- **Pure White**: `#FFFFFF` - Primary background
- **Ultra-light Gray**: `#F8FAFC` - Secondary background

#### Semantic Colors
- **Success**: `#10B981` - Green for positive states
- **Warning**: `#F59E0B` - Amber for cautionary states
- **Error**: `#EF4444` - Red for error states
- **Info**: `#3B82F6` - Blue for informational states

### Typography

- **Primary Font**: Inter (sans-serif)
- **Secondary Font**: Roboto (sans-serif)
- **Monospace**: Fira Code

**Heading Hierarchy:**
- H1: 48px, 800 weight (extra bold)
- H2: 36px, 700 weight (bold)
- H3: 30px, 700 weight (bold)
- H4: 24px, 600 weight (semibold)
- H5: 20px, 600 weight (semibold)
- H6: 16px, 600 weight (semibold)

**Body Text:**
- Large: 18px, 400 weight
- Regular: 16px, 400 weight (default)
- Small: 14px, 400 weight

### Spacing & Layout

- **Spacing Scale**: 8px-based (4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, etc.)
- **Max-width Container**: 1280px
- **Grid Gaps**: 24px (gap-6) or 32px (gap-8) for consistency
- **Responsive Breakpoints**: xs (0), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

### Visual Effects

#### Glassmorphism
```css
background: rgba(255, 255, 255, 0.45);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.25);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
```

#### Shadows
- **Shadow XS**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **Shadow SM**: `0 1px 3px 0 rgba(0, 0, 0, 0.1)`
- **Shadow MD**: `0 4px 6px -1px rgba(0, 0, 0, 0.1)` (default for cards)
- **Shadow LG**: `0 10px 15px -3px rgba(0, 0, 0, 0.1)`
- **Shadow XL**: `0 20px 25px -5px rgba(0, 0, 0, 0.1)`
- **Shadow 2XL**: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`

## 🚀 Usage

### 1. CSS Custom Properties

Use CSS variables directly in your stylesheets:

```css
.my-component {
  color: var(--color-primary-navy);
  background: var(--color-bg-secondary);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
}
```

### 2. CSS Utility Classes

Use pre-built utility classes from the design system:

```html
<!-- Colors -->
<div class="bg-primary-navy text-white">Primary Navy Background</div>
<div class="text-primary">Primary Text Color</div>

<!-- Typography -->
<h1 class="text-5xl font-extrabold">Heading 1</h1>
<p class="text-base leading-normal">Regular body text</p>

<!-- Spacing -->
<div class="p-6 m-4 gap-6">Content with padding and margin</div>

<!-- Effects -->
<div class="card shadow-lg rounded-lg">Premium Card</div>
<div class="glass-effect">Glassmorphism Effect</div>

<!-- Flexbox & Grid -->
<div class="flex items-center justify-between gap-4">
  <span>Left</span>
  <span>Right</span>
</div>

<div class="grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-6">
  <!-- Grid items -->
</div>
```

### 3. TypeScript Design Tokens

Import and use design tokens in TypeScript/React:

```typescript
import { colors, typography, spacing, effects } from '@/design-system';

const primaryColor = colors.primary.navy;
const headingStyle = typography.heading.h1;
const paddingValue = spacing[6];
const glassEffect = effects.glassmorphism;

// Use in React components
const MyComponent = () => (
  <div style={{ 
    color: colors.text.primary,
    padding: `${spacing[4]}`,
    backgroundColor: colors.background.primary
  }}>
    Content
  </div>
);
```

### 4. React Hooks

Use design system hooks for responsive and dynamic styling:

```typescript
import { 
  useThemedColor, 
  useMediaQuery, 
  getTypographyPreset,
  getSpacing 
} from '@/design-system/hooks';

const MyComponent = () => {
  const primaryColor = useThemedColor('primary.navy');
  const isLargeScreen = useMediaQuery('lg');
  const headingStyle = getTypographyPreset('h2');
  const padding = getSpacing('md');

  return (
    <div style={{ paddingTop: padding }}>
      {isLargeScreen ? <h2 style={headingStyle}>Large Screen</h2> : null}
    </div>
  );
};
```

## 🧩 Pre-built Components

### Buttons

```html
<!-- Primary Button -->
<button class="btn btn-primary">Primary Action</button>

<!-- Secondary Button (Gold) -->
<button class="btn btn-secondary">Secondary Action</button>

<!-- Ghost Button -->
<button class="btn btn-ghost">Ghost Action</button>

<!-- Sizes -->
<button class="btn btn-sm btn-primary">Small</button>
<button class="btn btn-lg btn-primary">Large</button>
```

### Cards

```html
<!-- Standard Card -->
<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
  </div>
  <div class="card-body">
    Card content goes here
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>

<!-- Glass Card -->
<div class="card-glass">
  Premium glassmorphism card
</div>
```

### Forms

```html
<div class="form-group">
  <label for="input" class="form-label">Label</label>
  <input id="input" class="form-input" type="text" placeholder="Enter text" />
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

<div class="alert alert-error">
  <div class="alert-icon">✕</div>
  <div class="alert-content">Error message</div>
</div>
```

## 📱 Responsive Design

The design system supports mobile-first responsive design:

```html
<!-- 1 column on mobile, 2 on tablet, 3 on desktop, 4 on large screens -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-6">
  <!-- Grid items -->
</div>

<!-- Text size responsive -->
<h1 class="text-2xl md:text-3xl lg:text-5xl">Responsive Heading</h1>
```

## 🎨 Customization

### Tailwind Integration

If using Tailwind CSS, the `tailwind.config.js` file extends Tailwind with all design system tokens:

```javascript
// Already configured with design system colors, spacing, typography, etc.
```

### Creating New Tokens

To add new tokens to the design system:

1. Add to `tokens.ts` in the appropriate category
2. Add CSS variables to the relevant `.css` file
3. Create utility classes if needed
4. Update this README

### Theming

The design system uses CSS custom properties for easy theming. Override `:root` variables:

```css
:root {
  --color-primary-navy: #0A192F; /* Change primary color */
  --color-gold-premium: #D4AF37; /* Change gold accent */
  /* ... override other variables ... */
}
```

## ♿ Accessibility

The design system follows WCAG 2.1 AA standards:

- **Color Contrast**: All text meets minimum contrast ratios
- **Focus States**: Clear focus indicators on all interactive elements
- **Semantic HTML**: Proper heading hierarchy and semantic markup
- **Form Labels**: All inputs have associated labels
- **Keyboard Navigation**: All components are keyboard accessible

## 🔗 CSS Variables Reference

All CSS variables are defined in `:root`:

```css
/* Colors */
--color-primary-navy
--color-gold-premium
--color-bg-primary
--color-text-primary

/* Typography */
--font-family-primary
--font-size-base
--font-weight-bold
--line-height-normal

/* Spacing */
--spacing-4
--gap-md
--container-max-width: 1280px

/* Effects */
--shadow-md
--blur-md
--radius-lg
--glass-box-shadow

/* Transitions */
--transition-base: 250ms ease
```

## 📚 Files & Exports

- `tokens.ts` - All TypeScript design tokens
- `index.ts` - Main export point
- `hooks.ts` - React hooks for styling
- `index.css` - All CSS (color, typography, spacing, effects, components)

## 🎯 Best Practices

1. **Use CSS Variables**: Prefer `var(--color-primary-navy)` over hardcoded colors
2. **Use Spacing Scale**: Stick to the 8px scale for consistency
3. **Container Queries**: Use `max-width: 1280px` for content containers
4. **Typography Hierarchy**: Follow the strict heading hierarchy
5. **Consistent Gaps**: Use `gap-6` or `gap-8` for consistent spacing in grids/flexbox

## 📖 Documentation

For more information about specific features, see:
- Typography: See `typography.css` for all font styles
- Colors: See `colors.css` for complete color palette
- Components: See `components.css` for pre-built component styles
- Spacing: See `spacing.css` for layout utilities

---

**Tatvika Achievers Premium EdTech Design System** | Built for excellence in education
