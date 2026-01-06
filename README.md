# K & W Hospitality and Maintainance Services LLC.

A local handyman, maintenance, and hauling service business website.

## Tech Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   # Example: generate a 32-byte random base64 secret for AUTH_JWT_SECRET
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

   Add the generated value to `.env.local` as `AUTH_JWT_SECRET`.

2. **Initialize Configuration**:
   Run the interactive init script to create `data/server-config.json`. This file contains operational settings and encrypted secrets (like SMTP passwords).

   ```bash
   npm run server:config init
   ```
   Follow the prompts.

   Automatic setup (recommended on first `npm install`)
   --------------------------------------------------
   This repository runs a lightweight setup script after `npm install` to create a local `.env.local`, generate required secrets, enable the admin portal, and populate a demo database so you can log in immediately.

   What it creates:
   - `.env.local` with `SERVER_CONFIG_MASTER_KEY`, `AUTH_JWT_SECRET`, and `ADMIN_BEARER_TOKEN` (if missing)
   - `data/server-config.json` with `admin.enabled=true`
   - `data/demo-db.json` with demo users including `admin@example.com` and `tech@example.com`

   To re-run the setup manually (advanced):

   ```bash
   # recommended: non-interactive for CI or automated runs
   node scripts/setup-advanced.mjs --env development --non-interactive --yes

   # or via npm script
   npm run setup -- --env development --non-interactive --yes
   ```

   Default demo login
   ------------------
   The demo DB includes `admin@example.com` and `tech@example.com`. The app's login is email-only in this demo, so you can sign in by entering one of those emails at the login form. In production, replace demo accounts and enforce proper authentication.

3. **Validate Configuration**:
   To check if your environment and config file are valid:

   ```bash
   npm run server:validate
   ```

### Key Rotation (re-encrypt secrets)

If you need to rotate the `SERVER_CONFIG_MASTER_KEY` (for example after a key compromise or routine rotation), the repository provides a safe rotation flow that:
- Backs up `data/server-config.json` to `data/backups/<timestamp>`
- Re-decrypts any encrypted fields (e.g., `smtp.pass`) with the old key and re-encrypts them with the new key
- Optionally updates `.env.local` if it contained the old key

Example (preferred: pass keys via environment variables to avoid leaking on the command line):

```bash
# OLD_SERVER_CONFIG_MASTER_KEY and NEW_SERVER_CONFIG_MASTER_KEY should be base64 32-byte keys
OLD_SERVER_CONFIG_MASTER_KEY="$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")" \
NEW_SERVER_CONFIG_MASTER_KEY="$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")" \
   node scripts/setup-advanced.mjs --rotate-keys --yes --backup
```

Or explicit CLI form (note: passing secrets on the command line can be visible to other users/processes):

```bash
node scripts/setup-advanced.mjs --rotate-keys --old-key <old-base64-key> --new-key <new-base64-key> --yes --backup
```

After rotation, run validation:

```bash
npm run server:validate
```

Notes:
- Rotation will only replace strings that match the encrypted format (iv:tag:ciphertext). If you store other secrets encrypted, they will be rotated as long as they match the same format.
- The script will not update `.env.local` in production unless you pass `--force` to avoid accidental overwrites. A backup of `.env.local` will be saved when updated.

### Deployment

**Generate Nginx Config**:
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Content Management

Update content files in the `content/` directory:

* `content/site.ts`: Global configuration (branding, contact info, navigation).
* `content/services.ts`: List of services.
* `content/service-details.ts`: Detailed content for each service page.
* `content/testimonials.ts`: Customer testimonials.

## Deployment

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```
