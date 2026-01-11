# K&W Maintenance Services Design System Specification

## Overview
This document outlines the comprehensive design system for K&W Maintenance Services web application, aimed at achieving a Fortune 500-caliber UI/UX experience. The design system focuses on consistency, accessibility, and reusability across all components and pages.

## 1. Typography System

### Font Families
- **Primary Font (Body)**: Inter (sans-serif) - A modern, highly readable sans-serif font
- **Secondary Font (Headings)**: Playfair Display (serif) - An elegant serif font for headings
- **Fallback Fonts**: System fonts for better performance and compatibility

### Font Weights
- **Light**: 300 (for subtle text and captions)
- **Regular**: 400 (for body text)
- **Medium**: 500 (for subheadings and emphasis)
- **Semi-Bold**: 600 (for buttons and important text)
- **Bold**: 700 (for headings and titles)
- **Extra Bold**: 800 (for hero sections and main titles)

### Font Sizes (Rem-based for accessibility)
```
| Size | Rem | Px | Usage |
|------|-----|----|-------|
| xs   | 0.75rem | 12px | Captions, small text |
| sm   | 0.875rem | 14px | Body text, labels |
| base | 1rem | 16px | Default body text |
| lg   | 1.125rem | 18px | Subheadings, larger text |
| xl   | 1.25rem | 20px | Small headings |
| 2xl  | 1.5rem | 24px | Section headings |
| 3xl  | 1.875rem | 30px | Main headings |
| 4xl  | 2.25rem | 36px | Large headings |
| 5xl  | 3rem | 48px | Hero headings |
| 6xl  | 3.75rem | 60px | Main hero titles |
```

### Line Heights
- **Body Text**: 1.5 (for optimal readability)
- **Headings**: 1.2 (for better visual hierarchy)
- **Captions**: 1.4 (for smaller text)

### Letter Spacing
- **Body Text**: Normal (0)
- **Headings**: -0.02em (for tighter, more refined look)
- **Uppercase Text**: 0.05em (for better readability)
- **Large Headings**: -0.03em (for hero sections)

## 2. Color Scheme

### Color Palette

#### Primary Colors
- **Primary (Deep Navy)**: HSL(222, 47%, 11%) - `#0a192f`
- **Primary Foreground**: HSL(0, 0%, 100%) - `#ffffff`

#### Secondary Colors
- **Secondary (Light Gray)**: HSL(210, 40%, 96.1%) - `#f7fafc`
- **Secondary Foreground**: HSL(222, 47%, 11%) - `#0a192f`

#### Accent Colors
- **Accent (Brand Cyan)**: HSL(193, 94%, 69%) - `#3b82f6`
- **Accent Foreground**: HSL(222, 47%, 11%) - `#0a192f`

#### Additional Colors
- **Success**: HSL(143, 72%, 40%) - `#10b981`
- **Warning**: HSL(43, 98%, 54%) - `#f59e0b`
- **Danger (Destructive)**: HSL(0, 84.2%, 60.2%) - `#ef4444`
- **Info**: HSL(217, 91%, 60%) - `#3b82f6`

### Dark Mode Colors
- **Background**: HSL(222, 47%, 11%) - `#0a192f`
- **Foreground**: HSL(210, 40%, 98%) - `#f7fafc`
- **Card**: HSL(222, 47%, 11%) - `#0a192f`
- **Card Foreground**: HSL(210, 40%, 98%) - `#f7fafc`
- **Muted**: HSL(217.2, 32.6%, 17.5%) - `#1e293b`
- **Muted Foreground**: HSL(215, 20.2%, 65.1%) - `#94a3b8`

### Color Usage Guidelines
- **Primary Color**: Used for main CTAs, important buttons, and key elements
- **Secondary Color**: Used for backgrounds, cards, and secondary elements
- **Accent Color**: Used for highlights, interactive elements, and focus states
- **Success/Warning/Danger**: Used for feedback messages, alerts, and status indicators

### Accessibility
- Ensure minimum contrast ratio of 4.5:1 for normal text
- Ensure minimum contrast ratio of 3:1 for large text
- Use color contrast checkers to validate all color combinations

## 3. Spacing System

### Spacing Scale (Rem-based)
```
| Size | Rem | Px | Usage |
|------|-----|----|-------|
| 0    | 0rem | 0px | No spacing |
| 1    | 0.25rem | 4px | Smallest spacing |
| 2    | 0.5rem | 8px | Small spacing |
| 3    | 0.75rem | 12px | Medium-small spacing |
| 4    | 1rem | 16px | Base spacing |
| 5    | 1.25rem | 20px | Medium spacing |
| 6    | 1.5rem | 24px | Medium-large spacing |
| 8    | 2rem | 32px | Large spacing |
| 10   | 2.5rem | 40px | Extra-large spacing |
| 12   | 3rem | 48px | Largest spacing |
```

### Spacing Usage
- **Padding**: Use consistent padding within components (e.g., `p-4`, `p-6`)
- **Margins**: Use consistent margins between components (e.g., `mb-4`, `mt-6`)
- **Gaps**: Use consistent gaps in flex/grid layouts (e.g., `gap-4`, `gap-6`)

## 4. Shadows and Gradients

### Shadow System
```
| Level | Usage | CSS Value |
|-------|-------|-----------|
| sm    | Subtle depth | 0 1px 2px 0 rgb(0 0 0 / 0.05) |
| base  | Default depth | 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) |
| md    | Medium depth | 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) |
| lg    | Large depth | 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) |
| xl    | Extra depth | 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) |
| 2xl   | Maximum depth | 0 25px 50px -12px rgb(0 0 0 / 0.25) |
```

### Gradient System
```
| Name | Usage | CSS Value |
|------|-------|-----------|
| Primary | Main gradient | linear-gradient(to right, #0a192f, #1e293b) |
| Accent | Accent gradient | linear-gradient(to right, #3b82f6, #1d4ed8) |
| Light | Light gradient | linear-gradient(to right, #f7fafc, #e2e8f0) |
| Dark | Dark gradient | linear-gradient(to right, #0a192f, #1e293b) |
```

## 5. Component Styles

### Buttons
- **Primary Button**: `bg-primary text-primary-foreground hover:bg-primary/90`
- **Secondary Button**: `bg-secondary text-secondary-foreground hover:bg-secondary/80`
- **Outline Button**: `border border-input bg-background hover:bg-accent hover:text-accent-foreground`
- **Ghost Button**: `hover:bg-accent hover:text-accent-foreground`
- **Link Button**: `text-primary underline-offset-4 hover:underline`

### Cards
- **Base Card**: `rounded-lg border bg-card text-card-foreground shadow-sm`
- **Hover Effect**: `transition-transform will-change-transform hover:-translate-y-1 hover:shadow-2xl`
- **Header**: `flex flex-col space-y-1.5 p-6`
- **Title**: `text-2xl font-semibold leading-none tracking-tight`
- **Description**: `text-sm text-muted-foreground`
- **Content**: `p-6 pt-0`
- **Footer**: `flex items-center p-6 pt-0`

### Forms
- **Input**: `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background`
- **Label**: `text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`
- **Select**: `flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background`
- **Textarea**: `flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background`

### Navigation
- **Main Navigation**: `flex items-center justify-between px-4 py-3`
- **Mobile Menu**: `fixed inset-0 top-0 left-0 h-screen w-full bg-background z-40 flex flex-col items-center justify-center p-8`
- **Nav Links**: `text-sm font-medium transition-colors hover:text-primary`

## 6. Micro-Interactions and Animations

### Hover States
- **Buttons**: `transition-colors duration-200 ease-in-out`
- **Cards**: `transition-transform duration-300 ease-in-out hover:-translate-y-1`
- **Links**: `transition-colors duration-200 ease-in-out hover:text-primary`

### Transitions
- **Page Transitions**: `motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}`
- **Fade In**: `initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}`
- **Slide Up**: `initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}`

### Animations
- **Button Press**: `whileTap={{ scale: 0.95 }} transition={{ duration: 0.1 }}`
- **Card Hover**: `whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.3 }}`
- **Loading Spinner**: `animate-spin`
- **Pulse Effect**: `animate-ping`

## 7. Implementation Recommendations

### Tailwind CSS Configuration
```javascript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(222, 47%, 11%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "hsl(210, 40%, 96.1%)",
          foreground: "hsl(222, 47%, 11%)",
        },
        accent: {
          DEFAULT: "hsl(193, 94%, 69%)",
          foreground: "hsl(222, 47%, 11%)",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "ui-serif", "Georgia", "Cambria", "Times New Roman"],
      },
      spacing: {
        '0': '0rem',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
      },
    },
  },
  plugins: [],
};

export default config;
```

### Framer Motion Usage
```javascript
import { motion } from "framer-motion";

// Example: Button with hover animation
const Button = ({ children }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
    className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
  >
    {children}
  </motion.button>
);

// Example: Card with hover effect
const Card = ({ children }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    transition={{ duration: 0.3 }}
    className="rounded-lg border bg-card text-card-foreground shadow-sm"
  >
    {children}
  </motion.div>
);
```

## 8. Accessibility Guidelines

### General
- Ensure all interactive elements are keyboard navigable
- Provide proper focus states for all interactive elements
- Use semantic HTML elements
- Ensure proper color contrast ratios

### Typography
- Use relative units (rem) for font sizes
- Ensure line heights are appropriate for readability
- Provide sufficient letter spacing for uppercase text

### Forms
- Label all form fields properly
- Provide clear error messages
- Ensure form fields have proper focus states

### Images
- Provide alt text for all images
- Ensure decorative images are marked appropriately

### Motion
- Provide reduced motion alternatives
- Ensure animations don't cause discomfort

## 9. Responsiveness Guidelines

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Responsive Design
- Use fluid layouts with percentages and flex/grid
- Ensure text remains readable on all screen sizes
- Test all interactive elements on mobile devices
- Provide appropriate touch targets for mobile users

## 10. Implementation Plan

### Phase 1: Foundation
1. Update Tailwind CSS configuration with design system values
2. Create base styles for typography, colors, and spacing
3. Implement responsive design system

### Phase 2: Components
1. Standardize button styles and variants
2. Create consistent card designs
3. Implement form components with proper styling
4. Design navigation elements

### Phase 3: Enhancements
1. Add micro-interactions and animations
2. Implement dark mode support
3. Ensure accessibility compliance
4. Test and refine all components

### Phase 4: Documentation
1. Create comprehensive style guide
2. Document component usage and variants
3. Provide examples and best practices
4. Create implementation guidelines for developers

## Conclusion
This design system specification provides a comprehensive framework for achieving a Fortune 500-caliber UI/UX experience for K&W Maintenance Services. By following these guidelines and implementing the recommended practices, the web application will achieve consistency, accessibility, and professional polish across all components and pages.