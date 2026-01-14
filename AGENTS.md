# Agent Instructions

## Strategic Alignment

All work in this repository must align with the **Strategic Roadmap** located in `docs/STRATEGIC_ROADMAP.md`. This roadmap defines the long-term vision for the platform, including:
- **Regional Logistics:** Service zones from Pensacola to Tallahassee.
- **Workflow:** Strict 7-stage job lifecycle.
- **Offline First:** Mobile tools must support offline operations.
- **Financial Rigor:** Job costing, disposal fee tracking, and dynamic quoting.

Before implementing new features or refactoring existing ones, consult the roadmap to ensure your approach supports these pillars.

## Core Directives

1. **Verify Before Applying:** Always read the roadmap and relevant documentation before making architectural decisions.
2. **Offline Resilience:** When designing client-side interactions, consider how they will function without network connectivity (e.g., using local storage or optimistic UI).
3. **Data Integrity:** Ensure that financial data (costs, fees, hours) is captured accurately to support the "Financial Intelligence" goals.
