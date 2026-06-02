/**
 * Tatvika Achievers - Design System Type Definitions
 * Full TypeScript support for design tokens and utilities
 */

// ============================================================================
// COLOR TYPES
// ============================================================================

export interface ColorScale {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
}

export interface ColorPalette {
  primary: {
    navy: string;
    navy50: string;
    navy100: string;
    navy200: string;
    navy300: string;
    navy400: string;
    navy500: string;
    navy600: string;
    navy700: string;
    navy800: string;
  };
  gold: {
    premium: string;
    light: string;
    lighter: string;
    dark: string;
  };
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    hover: string;
  };
  semantic: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  neutral: {
    white: string;
    black: string;
    gray50: string;
    gray100: string;
    gray200: string;
    gray300: string;
    gray400: string;
    gray500: string;
    gray600: string;
    gray700: string;
    gray800: string;
    gray900: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  border: {
    light: string;
    default: string;
    dark: string;
  };
}

// ============================================================================
// TYPOGRAPHY TYPES
// ============================================================================

export interface FontSizes {
  [key: string]: string;
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
}

export interface FontWeights {
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
}

export interface LineHeights {
  tight: number;
  normal: number;
  relaxed: number;
  loose: number;
}

export interface LetterSpacing {
  tight: string;
  normal: string;
  wide: string;
  wider: string;
}

export interface TextStyle {
  fontSize: string | number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing?: string;
}

export interface HeadingStyles {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  h5: TextStyle;
  h6: TextStyle;
}

export interface BodyStyles {
  large: TextStyle;
  regular: TextStyle;
  small: TextStyle;
}

export interface Typography {
  fontFamily: {
    primary: string;
    secondary: string;
    monospace: string;
  };
  fontSize: FontSizes;
  fontWeight: FontWeights;
  lineHeight: LineHeights;
  letterSpacing: LetterSpacing;
  heading: HeadingStyles;
  body: BodyStyles;
  label: TextStyle;
}

// ============================================================================
// SPACING TYPES
// ============================================================================

export interface SpacingScale {
  [key: string]: string;
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  12: string;
  14: string;
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
  36: string;
  40: string;
}

export interface GapScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

// ============================================================================
// LAYOUT TYPES
// ============================================================================

export interface ContainerSizes {
  maxWidth: string;
  maxWidthMd: string;
  maxWidthSm: string;
}

export interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface GridColumns {
  [key: number]: string;
}

export interface Layout {
  container: ContainerSizes;
  breakpoints: Breakpoints;
  gridColumns: GridColumns;
}

// ============================================================================
// EFFECTS TYPES
// ============================================================================

export interface GlassmorphismEffect {
  background: string;
  backdropFilter: string;
  border: string;
  boxShadow: string;
}

export interface ShadowScale {
  [key: string]: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  none: string;
}

export interface BlurScale {
  [key: string]: string;
  sm: string;
  md: string;
  lg: string;
}

export interface BorderRadiusScale {
  [key: string]: string;
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

export interface Effects {
  glassmorphism: GlassmorphismEffect;
  shadow: ShadowScale;
  blur: BlurScale;
  borderRadius: BorderRadiusScale;
}

// ============================================================================
// TRANSITION TYPES
// ============================================================================

export interface TransitionDurations {
  fast: string;
  base: string;
  slow: string;
}

export interface TransitionTimings {
  ease: string;
  linear: string;
  easeIn: string;
  easeOut: string;
  easeInOut: string;
}

export interface Transitions {
  duration: TransitionDurations;
  timing: TransitionTimings;
}

// ============================================================================
// COMPONENT TOKEN TYPES
// ============================================================================

export interface ButtonTokens {
  primaryBg: string;
  primaryText: string;
  secondaryBg: string;
  secondaryText: string;
  disabledBg: string;
  disabledText: string;
}

export interface InputTokens {
  bg: string;
  border: string;
  borderFocus: string;
  text: string;
  placeholder: string;
}

export interface CardTokens {
  bg: string;
  border: string;
  shadow: string;
}

export interface Components {
  button: ButtonTokens;
  input: InputTokens;
  card: CardTokens;
}

// ============================================================================
// DESIGN SYSTEM INTERFACE
// ============================================================================

export interface DesignSystem {
  colors: ColorPalette;
  typography: Typography;
  spacing: SpacingScale;
  gap: GapScale;
  layout: Layout;
  effects: Effects;
  transitions: Transitions;
  components: Components;
}

// ============================================================================
// UTILITY TYPE DEFINITIONS
// ============================================================================

/** Breakpoint keys for media queries */
export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Color function signatures */
export type ColorPath = string; // e.g., 'primary.navy', 'semantic.success'

/** Typography presets */
export type TypographyPreset = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body-large' | 'body-regular' | 'body-small'
  | 'label';

/** Spacing scale keys */
export type SpacingKey = keyof SpacingScale | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Shadow levels */
export type ShadowLevel = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';

/** Border radius sizes */
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

/** Transition durations */
export type TransitionDuration = 'fast' | 'base' | 'slow';

// ============================================================================
// REACT COMPONENT TYPES
// ============================================================================

export interface StyledComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface ButtonProps extends StyledComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

export interface CardProps extends StyledComponentProps {
  variant?: 'default' | 'elevated' | 'glass';
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export interface BadgeProps extends StyledComponentProps {
  variant?: 'primary' | 'gold' | 'success' | 'warning' | 'error' | 'info';
}

export interface AlertProps extends StyledComponentProps {
  variant?: 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
}

// ============================================================================
// RESPONSIVE STYLE TYPE
// ============================================================================

export type ResponsiveValue<T> = T | {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};

// ============================================================================
// EXPORT DEFAULT TYPE
// ============================================================================

