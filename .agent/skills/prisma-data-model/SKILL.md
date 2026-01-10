---
name: prisma-data-model
description: Understanding the data model and entities (Tenants, Users, Properties).
---

# Data Model (K&W)

This skill describes the data entities and relationships within the system.

**Note:** This project does not currently use Prisma or a relational database. It uses a **File-Based JSON Database** (`data/demo-db.json`) for the MVP/Demo phase, managed by `scripts/setup-advanced.mjs`.

## Core Entities

The system mimics a multi-tenant B2B structure essential for the "Hospitality Repair Management" pivot.

### 1. Tenant (`Tenant`)
Represents a business client (e.g., a Hotel Group or Property Management Company).
*   **Key Fields**: `id`, `name`, `slug`.
*   **Relationship**: Has many `Users` and `Properties`.

### 2. User (`User`)
An individual accessing the platform.
*   **Key Fields**: `id`, `email`, `role` (`tech`, `security_admin`, `supervisor`), `tenantId`, `passwordHash`.
*   **Authentication**: Token-based (Bearer) or mocked via `server-config.json` settings.

### 3. Property (`Property`)
A physical location managed by the Tenant (e.g., "Grand Hotel").
*   **Key Fields**: `id`, `name`, `address`, `tenantId`.

### 4. Vendor (`Vendor`)
External service providers or software integrations.
*   **Key Fields**: `id`, `name`, `type`, `complianceScore`.

## Data Management

### Reading Data
Data is stored in `data/demo-db.json`. To query "Tenants", read this file and parse the JSON.

### Modifying Data
To "migrate" or update the schema:
1.  Modify `scripts/setup-advanced.mjs` (the `ensureDemoDb` function) to define the new structure or default data.
2.  Run `npm install` (which triggers `postinstall` -> `setup-advanced.mjs`) to regenerate/update `data/demo-db.json` if it doesn't exist, or manually edit the JSON file for immediate testing.

### "Soft Deletes"
While not explicitly enforced by a database engine, the convention is to mark items as `status: "Inactive"` or `deletedAt: "timestamp"` rather than removing them from the JSON array, to maintain audit trails.

## Prisma Status
*   **Current**: No `schema.prisma`.
*   **Future**: If a real DB is needed, a `schema.prisma` would be created mirroring the structure of `demo-db.json`.
