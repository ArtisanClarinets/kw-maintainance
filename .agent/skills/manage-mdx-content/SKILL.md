---
name: manage-mdx-content
description: Managing "Work" and "Insight" posts using MDX and Frontmatter.
---

# Manage MDX Content

This skill enables the agent to author and manage content for "Work" (Case Studies) and "Insights" (Articles).

## Content Types

### 1. Work (Case Studies)
*   **Location:** `content/work/*.mdx`
*   **Purpose:** Showcase successful projects and case studies.
*   **Key Structure:**
    *   Requires strict **KPIs** to demonstrate value.
    *   Often involves **Redacted** client names for privacy.

### 2. Insights (Articles)
*   **Location:** `content/insights/*.mdx`
*   **Purpose:** Share industry knowledge, technical deep dives, or thought leadership.

## Frontmatter Rules

All `.mdx` files must start with a YAML frontmatter block.

### Required Fields
*   `title`: (String) The primary headline.
*   `publishedAt`: (String) ISO Date (YYYY-MM-DD).
*   `summary`: (String) A short excerpt for previews.
*   `image`: (String) Path to the cover image (e.g., `/images/blog/cover.jpg`).

### Recommended Fields
*   `author`: (String) The writer's name.
*   `tags`: (Array) List of relevant topics.

### Work-Specific Fields
*   `client`: (String) Client name. Use "Redacted" if NDA applies.
*   `kpis`: (Array of Objects)
    *   `label`: (String) e.g., "Revenue Increase"
    *   `value`: (String) e.g., "40%"

## Handling Redaction
*   If a client is strictly confidential, set `client: "Redacted"`.
*   Ensure no PII leaks in the body text.
*   Use generic terms like "Major FinTech Unicorn" instead of the specific name in the body.
