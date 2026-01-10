---
name: manage-mdx-content
description: Managing content for the website, including Services and Site Configuration.
---

# Manage Content (K&W)

This skill guides the agent in managing the website's content.

**Note:** This project currently uses TypeScript data files (`content/*.ts`) instead of MDX for content management to ensure type safety with Zod schemas.

## Content Structure

The content is located in the `content/` directory and is structured as TypeScript objects.

### Core Files

*   **`content/site.ts`**: Global site configuration (Name, Contact Info, Navigation, Social Links).
*   **`content/services.ts`**: The core service offerings. Use this to add or update "Work" items.
    *   **Structure:** Array of Service objects.
    *   **Fields:** `id`, `title`, `description`, `icon` (Lucide icon component), `features` (list of strings).
*   **`content/testimonials.ts`**: Customer reviews and success stories.
*   **`content/faqs.ts`**: Frequently asked questions.

## Work vs. Insights

While the prompt mentions "Work" (Case Studies) and "Insights" (Articles), in this specific codebase:

1.  **Work / Services**: These are defined in `content/services.ts`. Each entry represents a core competency of the business.
2.  **Insights / Blog**: Currently not implemented. If requested to add a blog post, you must first propose creating a new `content/blog.ts` file or similar structure, or creating a new page in `src/app/blog/`.

## Editing Rules

1.  **TypeScript Objects**: Content is code. Ensure all quotes are escaped properly and syntax is valid TS.
2.  **Icons**: In `content/services.ts`, Lucide icons are imported directly (e.g., `import { Hammer } from "lucide-react"`) and passed as objects. **Important:** Client Components consuming these must handle serialization if passed from Server Components (often requires mapping strings to icons in the component map if not using direct imports in the same file).
3.  **Type Safety**: Follow the Zod schemas (e.g., `ServiceSchema` in `services.ts`).
4.  **No MDX**: Do not create `.mdx` files unless explicitly modifying the Next.js configuration to support them.

## Example: Adding a Service

To add a new service (equivalent to a "Work" item):

1.  Open `content/services.ts`.
2.  Import the icon: `import { SprayCan } from "lucide-react";`
3.  Add a new object to the array:

```typescript
{
  id: "pressure-washing",
  title: "Pressure Washing",
  description: "Restore the look of your driveway, siding, and decks with high-grade pressure washing.",
  icon: SprayCan,
  features: ["Driveways", "Siding", "Decks", "Eco-friendly solutions"]
}
```
