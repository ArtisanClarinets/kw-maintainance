# Application Logic & Internal Operations

## 1. Authentication & Identity

### NextAuth Configuration
*   **Source:** `lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`.
*   **Providers:** Configured in `lib/auth.ts`.
*   **Callbacks:**
    *   `session`: Enriches the session object with `user.id`, `user.role`, and `user.tenantId`.
    *   `jwt`: Persists these fields into the JWT token for stateless verification.

### Session Handling
*   **Persistence:** Sessions are stateless (JWT-based).
*   **Validation:** Middleware (`middleware.ts`) verifies the token signature on every protected route.

### MFA Flow
*   **Source:** `lib/security/mfa.ts`.
*   **Logic:**
    *   **Generation:** Uses `otplib` (or similar) to generate TOTP secrets.
    *   **Verification:** Verifies the 6-digit code against the stored `mfaSecret`.
    *   **Backup Codes:** A set of one-time codes generated upon MFA setup.

### RBAC Enforcer
*   **Source:** `middleware.ts` and `lib/admin/guards.ts`.
*   **Logic:**
    *   Middleware checks `token.role`.
    *   Routes protected by specific guards (e.g., `requireAdmin`) abort if the role hierarchy is not satisfied (Owner > Admin > Editor > Analyst).

## 2. Security Defense Layers

### Request Validation
*   **Source:** `lib/security/request.ts`, `origin.ts`.
*   **CSRF:** Custom token validation or Next-Auth built-in CSRF protection.
*   **Origin:** `origin.ts` verifies the `Origin` and `Referer` headers match the allowed domains to prevent cross-site attacks.

### Data Redaction
*   **Source:** `lib/security/redact.ts`.
*   **Logic:** Recursively traverses response objects to strip sensitive keys:
    *   `passwordHash`
    *   `mfaSecret`
    *   `verificationToken`
    *   `paymentDetails`

### Secure Headers
*   **Source:** `app/api/proof/headers/route.ts` or `middleware.ts`.
*   **Headers:**
    *   `Content-Security-Policy` (CSP)
    *   `Strict-Transport-Security` (HSTS)
    *   `X-Frame-Options: DENY`
    *   `X-Content-Type-Options: nosniff`

### Upload Security
*   **Source:** `lib/security/upload.ts`.
*   **Logic:**
    *   **File Type:** Validates MIME types (magic numbers) against an allowed list.
    *   **Sanitization:** Renames files to random UUIDs or sanitizes original filenames to prevent path traversal.

## 3. "Hidden" Operations (The plumbing)

### Soft Deletion Strategy
*   **Source:** `prisma/schema.prisma`.
*   **Mechanism:** Models have a `deletedAt` DateTime field.
*   **Filtration:** API routes use Prisma middleware or explicit `where` clauses: `where: { deletedAt: null }`.

### Audit Logging
*   **Model:** `AuditLog` (Prisma).
*   **Triggers:**
    *   Mutations in `/admin` routes.
    *   Sensitive actions (Auth, Billing).
*   **Captures:** `Actor` (User ID), `Action` (String), `Diff` (JSON of before/after state), `Timestamp`.

### Job Queues
*   **Source:** `lib/jobs/`.
*   **System:** Background worker utilizing a queue (e.g., BullMQ or database-backed).
*   **Jobs:**
    *   `contract-reminders`: Checks for expiring contracts.
    *   `invoice-generation`: Generates recurring invoices.

### Cron Tasks
*   **Source:** `app/api/cron/`.
*   **Tasks:**
    *   `revenue-sync`: Syncs financial data nightly.
    *   `cleanup-logs`: Archives old audit logs.

## 4. Business Logic Engines

### Revenue Leak Detection
*   **Source:** `lib/revenue-leak/model.ts`.
*   **Logic:** Analyzes `Contracts` vs `Invoices` to identify unbilled hours or discrepancies in tracked time versus billed amounts.

### Server Configurator
*   **Source:** `lib/server-config/engine.ts`.
*   **Logic:**
    *   Inputs: User requirements (Traffic, Storage, Redundancy).
    *   Output: Recommended hardware specs or plan tier.
    *   Rules: Weighted scoring system based on input parameters.
