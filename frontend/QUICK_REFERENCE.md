# Tatvika Achievers Design System - Quick Reference

## 🎨 Colors

### Primary Palette
```typescript
Primary Navy: #0A192F        // Trust, academics
Premium Gold: #D4AF37        // Achievement, success
Pure White: #FFFFFF          // Primary background
Ultra-light Gray: #F8FAFC    // Secondary background
```

### CSS Variables
```css
var(--color-primary-navy)      /* #0A192F */
var(--color-gold-premium)      /* #D4AF37 */
var(--color-bg-primary)        /* #FFFFFF */
var(--color-bg-secondary)      /* #F8FAFC */
var(--color-text-primary)      /* #0A192F */
var(--color-success)           /* #10B981 */
var(--color-error)             /* #EF4444 */
```

### Classes
```html
<div class="bg-primary-navy text-white">Navy background</div>
<div class="text-gold-premium">Gold text</div>
<div class="bg-gray-light">Light gray background</div>
```

---

## 📝 Typography

### Font Stack
```typescript
Primary: Inter, -apple-system, BlinkMacSystemFont, sans-serif
Secondary: Roboto, -apple-system, BlinkMacSystemFont, sans-serif
Mono: Fira Code, Courier New, monospace
```

### Sizes (px)
```
xs:   12px     sm:   14px     base: 16px
lg:   18px     xl:   20px     2xl:  24px
3xl:  30px     4xl:  36px     5xl:  48px
```

### Weights
```
Light: 300     Normal: 400    Medium: 500
Semibold: 600  Bold: 700      Extrabold: 800
```

### Headings
```html
<h1 class="text-5xl font-extrabold">H1 - 48px, 800w</h1>
<h2 class="text-4xl font-bold">H2 - 36px, 700w</h2>
<h3 class="text-3xl font-bold">H3 - 30px, 700w</h3>
<h4 class="text-2xl font-semibold">H4 - 24px, 600w</h4>
<p class="text-base">Body - 16px, 400w</p>
```

### Classes
```html
<h1 class="text-5xl font-extrabold">Heading</h1>
<p class="text-lg leading-relaxed">Large body</p>
<span class="text-sm font-medium">Label</span>
```

---

## 📐 Spacing

### Scale (8px-based)
```
1: 4px       2: 8px       3: 12px      4: 16px
5: 20px      6: 24px      7: 28px      8: 32px
10: 40px     12: 48px     16: 64px     20: 80px
```

### Padding
```html
<div class="p-4">All sides: 16px</div>
<div class="px-6 py-4">Horizontal 24px, Vertical 16px</div>
<div class="pt-8 pb-4">Top 32px, Bottom 16px</div>
```

### Margin
```html
<div class="m-6">All sides: 24px</div>
<div class="mx-auto">Horizontal auto (center)</div>
<div class="mb-4">Bottom only: 16px</div>
```

### Gap
```html
<div class="flex gap-4">Gap: 16px</div>
<div class="grid gap-6">Grid gap: 24px</div>
<div class="grid gap-8">Grid gap: 32px</div>
```

---

## 🎯 Layout

### Container
```html
<div class="container mx-auto">        <!-- 1280px max-width -->
<div class="container-md mx-auto">     <!-- 1024px max-width -->
<div class="container-sm mx-auto">     <!-- 768px max-width -->
```

### Flexbox
```html
<div class="flex gap-4">               <!-- Row by default -->
<div class="flex flex-col gap-4">      <!-- Column layout -->
<div class="flex items-center justify-between">
<div class="flex flex-wrap gap-2">     <!-- Wrapping items -->
```

### Grid
```html
<div class="grid grid-cols-2 gap-6">           <!-- 2 columns -->
<div class="grid grid-cols-3 gap-6">           <!-- 3 columns -->
<div class="grid grid-cols-4 md:grid-cols-6">  <!-- Responsive -->
```

### Breakpoints
```
xs:  0px       sm:  640px     md:  768px
lg:  1024px    xl:  1280px    2xl: 1536px
```

### Responsive Classes
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<h1 class="text-2xl md:text-3xl lg:text-5xl">Responsive text</h1>
```

---

## ✨ Effects

### Shadows
```html
<div class="shadow-md">Medium shadow (default for cards)</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large shadow</div>
<div class="hover-shadow-lg:hover">Hover shadow effect</div>
```

### Border Radius
```html
<div class="rounded-md">8px radius</div>
<div class="rounded-lg">12px radius</div>
<div class="rounded-xl">16px radius</div>
<div class="rounded-2xl">24px radius</div>
<div class="rounded-full">Circular/pill</div>
```

### Glassmorphism
```html
<div class="glass-effect p-6 rounded-xl">
  Premium glass effect card
</div>

<div class="card-glass">
  Alternative glass card
</div>
```

### Transitions
```css
transition: all var(--transition-base);    /* 250ms ease */
transition: all var(--transition-fast);    /* 150ms ease */
transition: all var(--transition-slow);    /* 350ms ease */
```

### Hover Effects
```html
<div class="hover-scale hover:shadow-lg">Scales on hover</div>
<div class="hover-translate-y-up">Lifts on hover</div>
<div class="hover-opacity">Fades on hover</div>
```

---

## 🧩 Components

### Buttons
```html
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-secondary">Secondary Action</button>
<button class="btn btn-ghost">Ghost Action</button>

<!-- Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large</button>
```

### Cards
```html
<div class="card">
  <div class="card-header"><h3>Title</h3></div>
  <div class="card-body">Content here</div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>

<div class="card-glass">Glass effect card</div>
```

### Forms
```html
<div class="form-group">
  <label for="input" class="form-label">Label</label>
  <input id="input" class="form-input" type="text" placeholder="Type..." />
  <div class="form-help">Helper text</div>
</div>
```

### Badges
```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-gold">Gold</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-error">Error</span>
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

---

## 💻 TypeScript Usage

### Import Tokens
```typescript
import { colors, typography, spacing, effects } from '@/design-system';

// Access colors
const primaryColor = colors.primary.navy;      // #0A192F
const successColor = colors.semantic.success;  // #10B981

// Typography
const h1Style = typography.heading.h1;
const bodyStyle = typography.body.regular;

// Spacing
const padding = spacing[4];  // 16px
const containerWidth = layout.container.maxWidth;  // 1280px
```

### Use in Components
```typescript
import { colors, spacing } from '@/design-system';

const MyComponent = () => (
  <div style={{
    backgroundColor: colors.background.primary,
    padding: spacing[6],
    color: colors.text.primary
  }}>
    Premium Content
  </div>
);
```

---

## 🪝 React Hooks

### Media Query Hook
```typescript
import { useMediaQuery } from '@/design-system/hooks';

const MyComponent = () => {
  const isLargeScreen = useMediaQuery('lg');
  
  return (
    <div>
      {isLargeScreen ? <DesktopView /> : <MobileView />}
    </div>
  );
};
```

### Get Typed Color
```typescript
import { useThemedColor } from '@/design-system/hooks';

const MyComponent = () => {
  const primaryColor = useThemedColor('primary.navy');
  
  return <div style={{ color: primaryColor }}>Text</div>;
};
```

### Get Spacing Value
```typescript
import { getSpacing } from '@/design-system/hooks';

const padding = getSpacing('md');        // 16px
const customSpacing = getSpacing(8);     // 32px
```

### Get Typography Preset
```typescript
import { getTypographyPreset } from '@/design-system/hooks';

const headingStyle = getTypographyPreset('h2');
const bodyStyle = getTypographyPreset('body-large');

const MyComponent = () => (
  <h2 style={headingStyle}>Styled Heading</h2>
);
```

---

## 📋 CSS Variables Complete List

### Colors (60+)
```css
--color-primary-navy, --color-gold-premium
--color-bg-primary, --color-bg-secondary
--color-text-primary, --color-text-secondary
--color-success, --color-error, --color-warning
/* ... and many more */
```

### Typography
```css
--font-family-primary, --font-size-base
--font-weight-bold, --line-height-normal
--letter-spacing-normal
```

### Spacing
```css
--spacing-4, --spacing-6, --spacing-8
--gap-md, --gap-lg
--container-max-width
```

### Effects
```css
--shadow-md, --shadow-lg
--radius-lg, --radius-xl
--transition-base
--glass-background, --glass-border
```

---

## 🚀 Common Patterns

### Premium Card
```html
<div class="card shadow-lg rounded-lg hover:shadow-xl transition-shadow">
  <h3 class="text-2xl font-bold text-primary">Card Title</h3>
  <p class="text-gray-600 mt-2">Card content</p>
</div>
```

### Hero Section
```html
<section class="container mx-auto py-12 md:py-20">
  <h1 class="text-5xl font-extrabold text-primary-navy mb-4">
    Main Heading
  </h1>
  <p class="text-xl text-gray-600 mb-8">
    Subheading text
  </p>
  <button class="btn btn-primary">Call to Action</button>
</section>
```

### Grid Layout
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div class="card"><!-- Item 1 --></div>
  <div class="card"><!-- Item 2 --></div>
  <div class="card"><!-- Item 3 --></div>
  <div class="card"><!-- Item 4 --></div>
</div>
```

### Responsive Navigation
```html
<nav class="flex items-center justify-between px-6 py-4">
  <div class="font-bold text-2xl text-primary">Logo</div>
  <div class="hidden lg:flex gap-6">
    <a href="#" class="nav-item">Link 1</a>
    <a href="#" class="nav-item">Link 2</a>
  </div>
</nav>
```

---

## 🔗 File Locations

| Resource | Location |
|----------|----------|
| **Design Tokens** | `src/design-system/tokens.ts` |
| **CSS Variables** | `src/design-system/*.css` |
| **React Hooks** | `src/design-system/hooks.ts` |
| **TypeScript Types** | `src/design-system/types.ts` |
| **Full Documentation** | `src/design-system/README.md` |
| **Setup Guide** | `frontend/DESIGN_SYSTEM_SETUP.md` |
| **Example Component** | `src/components/DesignSystemShowcase.tsx` |
| **Tailwind Config** | `tailwind.config.js` |

---

## 💡 Tips & Tricks

1. **Always use max-width container**: `<div class="container mx-auto">`
2. **Default gap is md (16px)**: Use gap-6 (24px) or gap-8 (32px) for content
3. **Use shadow-md for cards**: Don't mix shadows randomly
4. **Mobile-first breakpoints**: Write mobile first, add md:, lg: overrides
5. **Prefer utility classes**: Faster than writing custom CSS
6. **Use CSS variables**: When you need to theme dynamically
7. **Use TypeScript tokens**: For maximum type safety in components
8. **Use React hooks**: For responsive and dynamic styling

---

**Quick Reference for Tatvika Achievers Design System**  
*For comprehensive docs, see [DESIGN_SYSTEM_SETUP.md](frontend/DESIGN_SYSTEM_SETUP.md) or [Design System README](frontend/src/design-system/README.md)*
