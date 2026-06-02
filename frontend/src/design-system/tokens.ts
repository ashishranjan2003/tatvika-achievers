/**
 * Tatvika Achievers - Premium EdTech Design System
 * Design Tokens for consistent theming across the application
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const colors = {
  // Primary Colors - Trust & Academics
  primary: {
    navy: '#0A192F', // Deep Navy Blue - represents trust and academics
    navy50: '#F5F7FB',
    navy100: '#E8EDF5',
    navy200: '#C9D9E8',
    navy300: '#A3B8D8',
    navy400: '#6B88C1',
    navy500: '#3D5A8C',
    navy600: '#0A192F',
    navy700: '#061427',
    navy800: '#040D19',
  },

  // Secondary Accent - Achievement & Success
  gold: {
    premium: '#D4AF37', // Subtle Premium Gold
    light: '#F0E6D2',
    lighter: '#FBF8F0',
    dark: '#AA8C1F',
  },

  // Backgrounds
  background: {
    primary: '#FFFFFF', // Pure White
    secondary: '#F8FAFC', // Ultra-light Gray
    tertiary: '#F2F5F9',
    hover: '#F5F7FB',
  },

  // Semantic Colors
  semantic: {
    success: '#10B981', // Green for success
    warning: '#F59E0B', // Amber for warnings
    error: '#EF4444', // Red for errors
    info: '#3B82F6', // Blue for info
  },

  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
  },

  // Text Colors
  text: {
    primary: '#0A192F', // Deep Navy - primary text
    secondary: '#4B5563', // Gray - secondary text
    tertiary: '#9CA3AF', // Light gray - tertiary text
    inverse: '#FFFFFF', // White on dark backgrounds
  },

  // Border Colors
  border: {
    light: 'rgba(255, 255, 255, 0.25)', // For glassmorphism
    default: '#E5E7EB',
    dark: '#D1D5DB',
  },
};

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const typography = {
  fontFamily: {
    primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    secondary: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    monospace: '"Fira Code", "Courier New", monospace',
  },

  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.02em',
    wider: '0.05em',
  },

  // Heading Styles - Strict hierarchy
  heading: {
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
  },

  // Body Styles
  body: {
    large: {
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.75,
    },
    regular: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    small: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },

  // Label Styles
  label: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
};

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  7: '1.75rem', // 28px
  8: '2rem', // 32px
  9: '2.25rem', // 36px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  28: '7rem', // 112px
  32: '8rem', // 128px
  36: '9rem', // 144px
  40: '10rem', // 160px
};

export const gap = {
  xs: spacing[2], // 8px
  sm: spacing[3], // 12px
  md: spacing[4], // 16px
  lg: spacing[6], // 24px
  xl: spacing[8], // 32px
};

// ============================================================================
// LAYOUT TOKENS
// ============================================================================

export const layout = {
  container: {
    maxWidth: '1280px', // Max-width for content containers
    maxWidthMd: '1024px',
    maxWidthSm: '768px',
  },

  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  gridColumns: {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    6: '6',
    12: '12',
  },
};

// ============================================================================
// EFFECTS TOKENS
// ============================================================================

export const effects = {
  // Glassmorphism Effect
  glassmorphism: {
    background: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
  },

  // Shadows
  shadow: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    none: 'none',
  },

  // Blur Effects
  blur: {
    sm: 'blur(4px)',
    md: 'blur(12px)',
    lg: 'blur(20px)',
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },
};

// ============================================================================
// TRANSITION TOKENS
// ============================================================================

export const transitions = {
  duration: {
    fast: '150ms',
    base: '250ms',
    slow: '350ms',
  },

  timing: {
    ease: 'ease',
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

// ============================================================================
// COMPONENT TOKENS
// ============================================================================

import type { Components } from './types';

export const components: Components = {
  // Button
  button: {
    primaryBg: colors.primary.navy,
    primaryText: colors.neutral.white,
    secondaryBg: colors.gold.premium,
    secondaryText: colors.primary.navy,
    disabledBg: '#D1D5DB',
    disabledText: '#6B7280',
  },

  // Input
  input: {
    bg: colors.background.primary,
    border: colors.border.default,
    borderFocus: colors.primary.navy,
    text: colors.text.primary,
    placeholder: colors.text.tertiary,
  },

  // Card
  card: {
    bg: colors.background.primary,
    border: colors.border.default,
    shadow: effects.shadow.md,
  },
};

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export const designSystem = {
  colors,
  typography,
  spacing,
  gap,
  layout,
  effects,
  transitions,
  components,
};

export default designSystem;
