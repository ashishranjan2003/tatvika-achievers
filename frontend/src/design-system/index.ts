/**
 * Tatvika Achievers - Premium EdTech Design System
 * TypeScript Index - Export all design tokens and utilities
 */

// Import and export all design tokens
export { default as designSystem } from './tokens';
export * from './tokens';

// Re-export individual token categories for convenience
export {
  colors,
  typography,
  spacing,
  gap,
  layout,
  effects,
  transitions,
  components,
} from './tokens';

/**
 * Design System Documentation
 * 
 * The Tatvika Achievers Premium EdTech Design System includes:
 * 
 * 1. COLOR SYSTEM
 *    - Primary Navy: #0A192F (trust & academics)
 *    - Premium Gold: #D4AF37 (achievement & success)
 *    - Backgrounds: White & Ultra-light Gray
 *    - Semantic colors: Success, Warning, Error, Info
 * 
 * 2. TYPOGRAPHY
 *    - Primary Font: Inter
 *    - Secondary Font: Roboto
 *    - Strict heading hierarchy (H1-H6)
 *    - Crisp, highly scannable body text
 * 
 * 3. SPACING & LAYOUT
 *    - Max-width containers: 1280px
 *    - Consistent grid spacing (gap-6, gap-8)
 *    - 8px-based spacing scale
 * 
 * 4. EFFECTS
 *    - Glassmorphism: rgba(255,255,255,0.45) + blur(12px)
 *    - Premium shadows for depth
 *    - Smooth transitions (150ms, 250ms, 350ms)
 * 
 * USAGE IN COMPONENTS:
 * 
 * TypeScript:
 *   import { colors, typography, spacing } from '@/design-system';
 *   const primaryColor = colors.primary.navy;
 * 
 * CSS/HTML:
 *   <div class="card glass-effect">
 *     <h2 class="text-2xl font-bold">Premium Design</h2>
 *   </div>
 * 
 * CSS Variables:
 *   background: var(--color-primary-navy);
 */
