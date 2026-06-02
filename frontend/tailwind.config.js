/** @type {import('tailwindcss').Config} */

const designSystem = require('./src/design-system/tokens.ts');

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary-navy': '#0A192F',
        'primary-navy-50': '#F5F7FB',
        'primary-navy-100': '#E8EDF5',
        'primary-navy-200': '#C9D9E8',
        'primary-navy-300': '#A3B8D8',
        'primary-navy-400': '#6B88C1',
        'primary-navy-500': '#3D5A8C',
        'primary-navy-600': '#0A192F',
        'primary-navy-700': '#061427',
        'primary-navy-800': '#040D19',

        // Secondary Colors
        'gold-premium': '#D4AF37',
        'gold-light': '#F0E6D2',
        'gold-lighter': '#FBF8F0',
        'gold-dark': '#AA8C1F',

        // Backgrounds
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F8FAFC',
        'bg-tertiary': '#F2F5F9',
        'bg-hover': '#F5F7FB',

        // Semantic
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
        'info': '#3B82F6',
      },

      fontFamily: {
        primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        secondary: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        mono: '"Fira Code", "Courier New", monospace',
      },

      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },

      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },

      spacing: {
        0: '0',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
      },

      maxWidth: {
        container: '1280px',
        'container-md': '1024px',
        'container-sm': '768px',
      },

      borderRadius: {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        full: '9999px',
      },

      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
      },

      backdropBlur: {
        sm: '4px',
        md: '12px',
        lg: '20px',
      },

      transitionDuration: {
        fast: '150ms',
        base: '250ms',
        slow: '350ms',
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      const glassEffect = {
        '.glass-effect': {
          background: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
        },
        '.glass-card': {
          background: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
          borderRadius: '1rem',
          padding: '1.5rem',
        },
      };
      addUtilities(glassEffect);
    },
  ],
};
