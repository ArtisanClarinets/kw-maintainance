---
name: ui-design-system
description: UI guidelines, components, and design philosophy ("Executive Suite").
---

# UI Design System (K&W)

This skill ensures all generated UI code adheres to the "Executive Suite" design philosophy defined in the PRD.

## Design Philosophy

*   **Aesthetic**: "Fortune 500 Professionalism". Stable, Scalable, Trustworthy.
*   **Colors**:
    *   **Primary**: Deep Navy (HSL 222, 47%, 11%). Backgrounds, extensive use.
    *   **Accent**: Brand Cyan (HSL 193, 94%, 69% / `#64DAFA`).
    *   **Constraint**: Use Cyan sparingly for high-impact actions.
    *   **Accessibility**: On light backgrounds, use `text-sky-600` instead of Brand Cyan for readable text/icons. Use `text-accent` (#64DAFA) only in Dark Mode or on dark backgrounds.
*   **Typography**: `Playfair Display` (Headings) for authority, `Inter` (Body) for readability.

## Component Library

*   **Location**: `src/components/ui` (shadcn/ui based).
*   **Usage**: Always prefer importing existing components (Buttons, Cards, Inputs) over creating new HTML elements.

## Animations

*   **Library**: `framer-motion`.
*   **Style**: "Subtle and Purposeful".
    *   **Buttons**: Scale 0.98 on press (`whileTap={{ scale: 0.98 }}`).
    *   **Cards**: Lift -5px on hover (`whileHover={{ y: -5 }}`).
    *   **No 3D**: Strictly no Three.js or heavy WebGL scenes.

## Accessibility (WCAG 2.2 AA)

*   Ensure sufficient contrast (especially with the Cyan accent).
*   All images must have `alt` tags.
*   Interactive elements must be keyboard navigable.

## Code Style
*   **Tailwind v4**: Use the new v4 engine.
*   **Clean**: Avoid "div soup". Use semantic HTML (`<section>`, `<article>`, `<nav>`).
