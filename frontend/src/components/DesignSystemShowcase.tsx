/**
 * Example Component - Demonstrates Design System Usage
 * This component showcases colors, typography, spacing, and effects
 */

import React from 'react';
import { colors } from '../design-system/tokens';
import { useThemedColor } from '../design-system/hooks';

const DesignSystemShowcase: React.FC = () => {
  const primaryColor = useThemedColor('primary.navy');

  return (
    <div className="container mx-auto py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-extrabold text-primary-navy mb-4" style={{ color: primaryColor }}>
          Tatvika Achievers Design System
        </h1>
        <p className="text-xl text-gray-600">
          Premium EdTech Design System with Trust, Achievement, and Excellence
        </p>
      </div>

      {/* Color Palette Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-primary-navy mb-6">Color Palette</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Primary Navy */}
          <div className="card">
            <div 
              className="w-full h-24 rounded-lg mb-4" 
              style={{ backgroundColor: colors.primary.navy }}
            />
            <h4 className="font-semibold text-primary">Deep Navy Blue</h4>
            <p className="text-sm text-gray-600">{colors.primary.navy}</p>
            <p className="text-xs text-gray-500">Trust & Academics</p>
          </div>

          {/* Gold */}
          <div className="card">
            <div 
              className="w-full h-24 rounded-lg mb-4 border border-gray-200" 
              style={{ backgroundColor: colors.gold.premium }}
            />
            <h4 className="font-semibold text-primary">Premium Gold</h4>
            <p className="text-sm text-gray-600">{colors.gold.premium}</p>
            <p className="text-xs text-gray-500">Achievement & Success</p>
          </div>

          {/* White */}
          <div className="card border-2 border-gray-200">
            <div className="w-full h-24 rounded-lg mb-4 bg-white border border-gray-200" />
            <h4 className="font-semibold text-primary">Pure White</h4>
            <p className="text-sm text-gray-600">#FFFFFF</p>
            <p className="text-xs text-gray-500">Primary Background</p>
          </div>

          {/* Light Gray */}
          <div className="card">
            <div 
              className="w-full h-24 rounded-lg mb-4" 
              style={{ backgroundColor: colors.background.secondary }}
            />
            <h4 className="font-semibold text-primary">Ultra-light Gray</h4>
            <p className="text-sm text-gray-600">{colors.background.secondary}</p>
            <p className="text-xs text-gray-500">Secondary Background</p>
          </div>
        </div>

        {/* Semantic Colors */}
        <h3 className="text-2xl font-bold text-primary-navy mt-8 mb-4">Semantic Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(colors.semantic).map(([name, color]) => (
            <div key={name} className="card">
              <div 
                className="w-full h-20 rounded-lg mb-4" 
                style={{ backgroundColor: color }}
              />
              <h4 className="font-semibold capitalize text-primary">{name}</h4>
              <p className="text-sm text-gray-600">{color}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-primary-navy mb-6">Typography</h2>
        
        <div className="space-y-6">
          {/* Headings */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary-navy mb-4">Heading Hierarchy</h3>
            <div className="space-y-3">
              <h1 className="text-5xl font-extrabold">Heading H1 - 48px, 800 weight</h1>
              <h2 className="text-4xl font-bold">Heading H2 - 36px, 700 weight</h2>
              <h3 className="text-3xl font-bold">Heading H3 - 30px, 700 weight</h3>
              <h4 className="text-2xl font-semibold">Heading H4 - 24px, 600 weight</h4>
              <h5 className="text-xl font-semibold">Heading H5 - 20px, 600 weight</h5>
              <h6 className="text-base font-semibold">Heading H6 - 16px, 600 weight</h6>
            </div>
          </div>

          {/* Body Text */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary-navy mb-4">Body Text</h3>
            <div className="space-y-3">
              <p className="text-lg text-gray-700">Large Body - 18px, 400 weight</p>
              <p className="text-base text-gray-700">Regular Body - 16px, 400 weight</p>
              <p className="text-sm text-gray-700">Small Body - 14px, 400 weight</p>
            </div>
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-primary-navy mb-6">Components</h2>
        
        {/* Buttons */}
        <div className="card mb-6">
          <h3 className="text-lg font-semibold text-primary-navy mb-4">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-primary">Primary Button</button>
            <button className="btn btn-secondary">Secondary (Gold)</button>
            <button className="btn btn-ghost">Ghost Button</button>
            <button className="btn btn-primary btn-sm">Small</button>
            <button className="btn btn-primary btn-lg">Large</button>
          </div>
        </div>

        {/* Cards */}
        <div className="card mb-6">
          <h3 className="text-lg font-semibold text-primary-navy mb-4">Card Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard Card */}
            <div className="card border border-gray-200 hover-shadow-lg">
              <div className="card-header">
                <h4 className="font-semibold">Standard Card</h4>
              </div>
              <div className="card-body">
                <p>This is a standard card with shadow and hover effects</p>
              </div>
            </div>

            {/* Glass Card */}
            <div className="glass-effect p-6 rounded-lg">
              <h4 className="font-semibold text-primary-navy mb-2">Glass Effect Card</h4>
              <p className="text-gray-700">Glassmorphism effect with blur and transparency</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="card mb-6">
          <h3 className="text-lg font-semibold text-primary-navy mb-4">Badges</h3>
          <div className="flex flex-wrap gap-3">
            <span className="badge badge-primary">Primary</span>
            <span className="badge badge-gold">Gold</span>
            <span className="badge badge-success">Success</span>
            <span className="badge badge-warning">Warning</span>
            <span className="badge badge-error">Error</span>
          </div>
        </div>

        {/* Alerts */}
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-navy mb-4">Alerts</h3>
          <div className="space-y-3">
            <div className="alert alert-success">
              <div className="alert-icon">✓</div>
              <div className="alert-content">Success message - All systems operational</div>
            </div>
            <div className="alert alert-warning">
              <div className="alert-icon">⚠</div>
              <div className="alert-content">Warning message - Please review this action</div>
            </div>
            <div className="alert alert-error">
              <div className="alert-icon">✕</div>
              <div className="alert-content">Error message - Something went wrong</div>
            </div>
            <div className="alert alert-info">
              <div className="alert-icon">ℹ</div>
              <div className="alert-content">Info message - Note this information</div>
            </div>
          </div>
        </div>
      </section>

      {/* Layout & Spacing Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-primary-navy mb-6">Layout & Spacing</h2>
        
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-navy mb-4">Grid Layout</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className="p-6 bg-primary-navy-50 rounded-lg border border-gray-200 flex items-center justify-center text-center"
              >
                <p className="font-semibold text-primary-navy">Grid Item {i}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Effects Section */}
      <section>
        <h2 className="text-4xl font-bold text-primary-navy mb-6">Visual Effects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shadows */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary-navy mb-4">Shadows</h3>
            <div className="space-y-3">
              <div className="p-4 bg-white rounded shadow-sm border border-gray-100">Shadow Small</div>
              <div className="p-4 bg-white rounded shadow-md border border-gray-100">Shadow Medium</div>
              <div className="p-4 bg-white rounded shadow-lg border border-gray-100">Shadow Large</div>
              <div className="p-4 bg-white rounded shadow-xl border border-gray-100">Shadow Extra Large</div>
            </div>
          </div>

          {/* Glassmorphism */}
          <div>
            <h3 className="text-lg font-semibold text-primary-navy mb-4">Glassmorphism</h3>
            <div className="relative h-48 bg-gradient-to-br from-primary-navy-50 to-primary-navy-100 rounded-lg overflow-hidden">
              <div className="glass-effect absolute inset-0 m-4 flex items-center justify-center">
                <p className="text-center font-semibold text-primary-navy">Glass Effect</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignSystemShowcase;