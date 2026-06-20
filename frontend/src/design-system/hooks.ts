/**
 * Tatvika Achievers - Premium EdTech Design System
 * React Hooks & Utilities for component styling
 */

import React, { useMemo } from 'react';
import { colors, typography, spacing } from './tokens';

interface TokenTree {
  [key: string]: string | TokenTree;
}

/**
 * Hook to get themed colors based on current theme
 * @param {string} colorKey - Key from colors object (e.g., 'primary.navy', 'gold.premium')
 * @returns {string} Color value
 */
export const useThemedColor = (colorKey: string): string => {
  return useMemo(() => {
    const keys = colorKey.split('.');
    let result: string | TokenTree | undefined = colors as TokenTree;
    
    for (const key of keys) {
      result = typeof result === 'object' ? result[key] : undefined;
    }
    
    return typeof result === 'string' ? result : colors.primary.navy;
  }, [colorKey]);
};

/**
 * Hook to combine CSS classes with design system utilities
 * @param {...string[]} classNames - Class names to combine
 * @returns {string} Combined class string
 */
export const useDesignClass = (...classNames: (string | undefined)[]): string => {
  return classNames.filter(Boolean).join(' ');
};

/**
 * Hook to get responsive breakpoint values
 * @returns {object} Breakpoint sizes
 */
export const useBreakpoints = () => {
  return useMemo(() => ({
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }), []);
};

/**
 * Hook to handle responsive design decisions
 * @param {string} breakpoint - Breakpoint size (xs, sm, md, lg, xl, 2xl)
 * @returns {boolean} Is viewport >= breakpoint
 */
export const useMediaQuery = (breakpoint: string): boolean => {
  const breakpoints = useBreakpoints();
  const size = breakpoints[breakpoint as keyof typeof breakpoints];
  const getInitialMatches = () => (
    Boolean(size) && typeof window !== 'undefined'
      ? window.matchMedia(`(min-width: ${size})`).matches
      : false
  );
  const [matches, setMatches] = React.useState(getInitialMatches);

  React.useEffect(() => {
    if (!size || typeof window === 'undefined') return undefined;

    const media = window.matchMedia(`(min-width: ${size})`);
    const listener = () => setMatches(media.matches);
    
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [size]);

  return matches;
};

/**
 * Get typography preset for a given style
 * @param {string} preset - Typography preset (h1, h2, h3, h4, h5, h6, body-large, body-regular, body-small)
 * @returns {object} Typography style object
 */
export const getTypographyPreset = (preset: string): React.CSSProperties => {
  const presets: Record<string, React.CSSProperties> = {
    'h1': {
      fontSize: typography.heading.h1.fontSize,
      fontWeight: typography.heading.h1.fontWeight,
      lineHeight: typography.heading.h1.lineHeight,
      letterSpacing: typography.heading.h1.letterSpacing,
    },
    'h2': {
      fontSize: typography.heading.h2.fontSize,
      fontWeight: typography.heading.h2.fontWeight,
      lineHeight: typography.heading.h2.lineHeight,
      letterSpacing: typography.heading.h2.letterSpacing,
    },
    'h3': {
      fontSize: typography.heading.h3.fontSize,
      fontWeight: typography.heading.h3.fontWeight,
      lineHeight: typography.heading.h3.lineHeight,
    },
    'h4': {
      fontSize: typography.heading.h4.fontSize,
      fontWeight: typography.heading.h4.fontWeight,
      lineHeight: typography.heading.h4.lineHeight,
    },
    'h5': {
      fontSize: typography.heading.h5.fontSize,
      fontWeight: typography.heading.h5.fontWeight,
      lineHeight: typography.heading.h5.lineHeight,
    },
    'h6': {
      fontSize: typography.heading.h6.fontSize,
      fontWeight: typography.heading.h6.fontWeight,
      lineHeight: typography.heading.h6.lineHeight,
    },
    'body-large': {
      fontSize: typography.body.large.fontSize,
      fontWeight: typography.body.large.fontWeight,
      lineHeight: typography.body.large.lineHeight,
    },
    'body-regular': {
      fontSize: typography.body.regular.fontSize,
      fontWeight: typography.body.regular.fontWeight,
      lineHeight: typography.body.regular.lineHeight,
    },
    'body-small': {
      fontSize: typography.body.small.fontSize,
      fontWeight: typography.body.small.fontWeight,
      lineHeight: typography.body.small.lineHeight,
    },
  };

  return presets[preset] || presets['body-regular'];
};

/**
 * Get spacing value by scale (1-40, or xs, sm, md, lg, xl)
 * @param {string|number} size - Size key or number
 * @returns {string} Spacing value in rem
 */
export const getSpacing = (size: string | number): string => {
  const sizeMap: Record<string | number, string> = {
    'xs': spacing[2],
    'sm': spacing[3],
    'md': spacing[4],
    'lg': spacing[6],
    'xl': spacing[8],
    ...spacing,
  };

  return sizeMap[size] || spacing[4];
};

/**
 * Create responsive style object
 * @param {object} styles - Object with breakpoint keys (xs, sm, md, lg, xl)
 * @returns {string} Media query CSS string
 */
export const createResponsiveStyles = (
  styles: Record<string, React.CSSProperties>
): string => {
  let css = '';
  const breakpoints = {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  };

  for (const [breakpoint, style] of Object.entries(styles)) {
    if (breakpoint === 'xs') {
      // Base styles
      Object.entries(style).forEach(([key, value]) => {
        css += `${key}: ${value};`;
      });
    } else {
      // Media query styles
      const size = breakpoints[breakpoint as keyof typeof breakpoints];
      if (size) {
        const styleString = Object.entries(style)
          .map(([key, value]) => `${key}: ${value}`)
          .join(';');
        css += `@media (min-width: ${size}) { ${styleString} }`;
      }
    }
  }

  return css;
};

/**
 * Combine multiple style objects
 * @param {...object[]} styles - Style objects to merge
 * @returns {React.CSSProperties} Merged style object
 */
export const mergeStyles = (...styles: (React.CSSProperties | undefined)[]): React.CSSProperties => {
  return Object.assign({}, ...styles.filter(Boolean));
};

// Re-export design tokens for convenience
export { colors, typography, spacing, gap, layout, effects, transitions, components } from './tokens';

export default {
  useThemedColor,
  useDesignClass,
  useBreakpoints,
  useMediaQuery,
  getTypographyPreset,
  getSpacing,
  createResponsiveStyles,
  mergeStyles,
};
