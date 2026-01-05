# Copilot instructions

## Project snapshot
- This is a Next.js 16 App Router site. `src/app/layout.tsx` wires Inter and Playfair_Display fonts, global metadata, and the JSON-LD business schema based on `content/site.ts`.
- Every route lives under `src/app` (home, `/services`, `/services/[id]`, `/contact`, `/gallery`, `/service-area`, `/about`, `/privacy`, `/terms`). `_app`-style wrappers (`Header`, `Footer`, `Hero`, `Marquee`) are shared components under `src/components`.
- Copy and data live in the `content/` folder: `services.ts`, `service-details.ts`, `testimonials.ts`, `site.ts`, `faqs.ts`, `gallery.ts`. Update those to change CTA text, SEO blurbs, testimonials, or gallery metadata.

## Data-driven pages & components
- `src/app/page.tsx` pulls `services` + `testimonials` to render the hero, service teasers (`ServiceCard`), and the looping `Marquee` testimonial strip.
- The `/services/[id]` route uses `generateStaticParams` and `generateMetadata` to hydrate `ServiceDetailTemplate`, which stitches `Reveal`, `MagneticButton`, `SpotlightCard`, and `Button` for the hero, process steps, and CTA blocks.
- `ServiceCard` maps `content/services.ts` `icon` strings to `lucide-react` components (`Hammer`, `Wrench`, etc.), so keep the `IconMap` in sync when adding new entries.
- `HeroVisual` brings in `useOpsData` (simulated ops states) and `trackEvent` logging from `src/lib/analytics.ts` and layers `GulfGrid`, `SpotlightCard`, and `MagneticButton` for the visual centerpiece.

## Styling conventions
- Tailwind CSS 4 is configured via `src/app/globals.css`. It defines the `@theme` palette tokens, a reusable `@utility container-custom`, and both media query and `.dark` overrides. Follow those tokens (`bg-background`, `text-foreground`, `border-border`, etc.) when writing new markup.
- Shared utility helpers: `src/lib/utils.ts` exposes `cn` (combining `clsx` + `tailwind-merge`), and `components/Button.tsx` wraps `class-variance-authority` for consistent variant/size props. Use `asChild` when nesting links.
- Motion/interaction patterns rely heavily on `framer-motion` (`Hero`, `ServiceDetailTemplate`, `Marquee`, `Header`) plus the `react-bits` helpers (`MagneticButton`, `Reveal`, `SpotlightCard`) for animated hover states and reveal-on-scroll behavior.

## Contact form + API flow
- `src/app/contact/page.tsx` is a client component using `react-hook-form` + `zodResolver`. The form schema enforces name, phone, service selection (populated from `siteConfig.services`), and details, toggling loading/success states with `motion`/`AnimatePresence`.
- The form POSTs to `/api/lead`, which lives in `src/app/api/lead/route.ts`. That server route:
  * Loads the `ServerConfig` from `src/lib/server-config/load.ts` (which validates the strict `ServerConfigSchema` from `src/lib/server-config/schema.ts`).
  * Applies IP-based throttling via `src/lib/security/rateLimit.ts` (in-memory `TokenBucket` map) and extracts the user IP with `src/lib/security/request.ts`.
  * Runs a Zod schema that expects honeypot `company` (max length 0) and optional `timestamp` so the client can gate bots.
  * Sends email via `nodemailer` when `notification.method === 'smtp'`; otherwise logs masked PII.

## Server config & operational tooling
- CLI helper `scripts/server-config.mjs` is plain Node (no `ts-node`). Follow README instructions: copy `.env.example` → `.env.local`, generate a 32-byte base64 `SERVER_CONFIG_MASTER_KEY`, then `npm run server:config init` to populate `data/server-config.json` with rate limits, spam controls, notification routing, and optionally encrypted SMTP credentials.
- `src/lib/server-config/store.ts` encrypts/decrypts `smtp.pass` (AES-256-GCM) when writing/reading `data/server-config.json` (`chmod 0o600`). `loadServerConfig` re-uses that file and throws if the Zod schema fails.
- Use `npm run server:validate` before deploys (checks env vars, file, schema). `npm run server:config generate nginx --domain <domain> --port <port>` emits `deploy/nginx/site.conf` with hardened headers; the same script can emit systemd boilerplate.

## Dev / deployment commands
- `npm run dev` (Next dev server). `npm run build` + `npm run start` apply standard Next.js lifecycle; linting is `npm run lint` (plain ESLint via built-in Next config).
- The Playwright helpers `verify_site.py` and `verify_mobile.py` hit `http://localhost:3001` to capture screenshots of home/gallery/service-area and mobile menu states. Install Playwright if you need to regenerate these verification assets.
- `next-sitemap` is installed but not configured here – the static sitemap defaults to the `src/app` routes.

## Copy/content updates
- For new services, add entries in `content/services.ts` (id/title/description/features/icon) and `content/service-details.ts` (long description, included list, process steps, SEO description). The `[id]` page will auto-generate routes and metadata from those files.
- `content/site.ts` feeds the header/footer/contact metadata (phone/email/address/social links). Sync any marketing copy updates there so the layout and CTA buttons stay consistent.
- Testimonials, FAQs, and gallery images are centralized in `content/testimonials.ts`, `content/faqs.ts`, and `content/gallery.ts` respectively.

## What to watch for
- All UI is server-rendered/App Router-style—avoid mixing `/pages`. Keep `"use client"` where motion or hooks are needed (Hero, Header, form, HeroVisual, Service detail template).
- The contact form submits `service` values derived from `siteConfig.services` strings, so when you add a service you might need to ensure the select options include a matching label and keep the `serviceId` → label logic in sync.
- Rate limiting is in-memory (`Map`). If you change the lead route, keep the `ipBuckets` cleanup comment in mind (clear the map if the limit grows), especially if moving to a distributed deployment.
- `HeroVisual` and other interactive sections depend on `useOpsData` and `GulfGrid`; you can tweak the fake data there to demonstrate different availability/zone states.
- When adjusting global styles, update `src/app/globals.css` color token blocks—the project relies on the defined CSS variables (e.g., `--background`, `--primary`, `--accent`) across the entire UI.

## Final check
After edits, run `npm run lint` (eslint), optionally `npm run build`, and `npm run server:validate`. If you touch deployment scripts, rerun `npm run server:config generate` so `deploy/nginx/site.conf` matches your domain/port.

Please review this guide and let me know if any sections feel unclear or need more detail—happy to iterate!