# Product Requirements Document (PRD)

## Project: K & W Hospitality and Maintainance Services LLC - Digital Platform

### 1. Executive Summary
**Vision:** To establish K & W as the premier partner for "Hospitality Repair Management" in Fort Walton Beach and surrounding areas. The digital platform will serve as a "Fortune 500" caliber trust signal, pivoting the business from transactional handyman work to recurring B2B revenue streams through preventative maintenance contracts, facility management, and turnover services.

**Mission:** Deliver a "Sovereign Digital Ecosystem" that embodies Coherence, Fluidity, and Resilience, assuring hotel GMs, resort owners, and Airbnb property managers of reliability, compliance, and asset longevity.

### 2. Market Analysis & Pivot Strategy
**Current State:** Consumer-focused handyman services.
**Target State:** B2B Hospitality Repair Management.
**Key Market Drivers:**
- **Recurring Revenue:** Moving from "break-fix" to "preventative maintenance (PM)" contracts.
- **Asset Protection:** Hotels/Resorts need to extend the life of HVAC, plumbing, and aesthetic assets to maintain ADR (Average Daily Rate).
- **Guest Satisfaction:** Rapid turnover and invisible maintenance are critical to guest reviews.
- **Compliance & Safety:** Adherence to safety standards (ADA, fire safety checks) is non-negotiable for commercial clients.

### 3. Target Audience (User Personas)
1.  **The Hotel General Manager:**
    -   *Needs:* Reliability, 24/7 emergency response, budget predictability.
    -   *Pain Points:* Unreliable contractors, inconsistent quality, guest complaints about room condition.
2.  **The Airbnb Portfolio Manager:**
    -   *Needs:* Rapid turnover repairs between 11 AM and 3 PM, automated reporting, "set it and forget it" maintenance.
    -   *Pain Points:* Coordinating multiple vendors for one turnover.
3.  **The Commercial Facility Director:**
    -   *Needs:* Compliance documentation, insured vendors, detailed invoicing.

### 4. Product Principles
-   **Fortune 500 Professionalism:** The site must exude stability and scale. No "mom & pop" aesthetics.
-   **Sovereign Digital Ecosystem:**
    -   **Coherence:** Unified design language ("Executive Suite").
    -   **Fluidity:** Seamless navigation and micro-interactions.
    -   **Resilience:** High performance, accessibility, and trust verification.
-   **Trust First:** Visible insurance, licensing, and "Verified" badges are central to the UI.

### 5. Design Guidelines ("Executive Suite")
-   **Primary Color:** Deep Navy (HSL 222, 47%, 11%) - Conveying authority and stability.
-   **Accent Color:** Brand Cyan (HSL 193, 94%, 69% / HEX #64DAFA) - Used for calls-to-action and highlights.
    -   *Accessibility Note:* On light backgrounds, use `text-sky-600` for text/icons to ensure contrast compliance, while keeping `#64DAFA` for dark mode or large graphical elements.
-   **Typography:** Playfair Display (Headings) & Inter (Body).
-   **Interaction:** Buttons scale (0.98) on press; Cards lift (-5px) on hover.

### 6. Core Features & Requirements

#### 6.1. Service Offerings (Refined for B2B)
-   **Preventative Maintenance Plans:** Tiered contracts (Bronze/Silver/Gold) for ongoing facility health.
-   **Hospitality Turnover Services:** Rapid response painting, fixture repair, and inspection between guests.
-   **Facility Audits:** Comprehensive reports on asset health (HVAC, Plumbing, Electrical safety).
-   **Emergency Response:** 24/7 dedicated line/portal for contract holders.
-   **Vendor Management:** Acting as the single point of contact for specialized trades.

#### 6.2. Trust & Verification
-   **Verified Badge:** Footer and Hero sections must display License # and Insurance status prominently.
-   **Case Studies/Testimonials:** Focus on B2B success stories (e.g., "Saved Resort X $50k in avoided HVAC repairs").

#### 6.3. Lead Generation (The "Intake")
-   **Smart Forms:** Differentiate between "Residential Quote" and "Commercial Proposal".
-   **Commercial Focus:** Ask for "Number of Units", "Property Type" (Hotel, Condo, Resort).
-   **Anti-Spam:** Server-side validation, honeypots, and rate limiting (already implemented).

### 7. Technical Architecture
-   **Framework:** Next.js 16 (App Router).
-   **Styling:** Tailwind CSS v4.
-   **Validation:** Zod for all data structures.
-   **State Management:** Zustand (minimal client state), URL-based state for shareability.
-   **Animations:** Framer Motion (strict no-3D policy).
-   **Security:** HSTS, CSP headers, AES-256-GCM for config encryption.

### 8. Roadmap
-   **Phase 1 (Current):** Rebrand content to B2B/Hospitality focus. Establish trust signals.
-   **Phase 2:** Client Portal for work order tracking and invoice history.
-   **Phase 3:** Integration with PM software (CMMS) APIs for automated ticketing.

### 9. Content Strategy
-   **Tone:** Professional, assuring, competent. Avoid slang. Use industry terminology (PM, ADR, RevPAR, CapEx).
-   **SEO:** Target "Hotel Maintenance Fort Walton Beach", "Resort Repair Services", "Commercial Property Maintenance".

### 10. Success Metrics
-   **Conversion Rate:** % of visitors requesting Commercial Proposals.
-   **Recurring Revenue:** Number of signed Preventative Maintenance contracts.
-   **Brand Perception:** Qualitative feedback on the "Fortune 500" feel.
