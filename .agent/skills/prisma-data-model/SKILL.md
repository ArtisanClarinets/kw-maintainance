---
name: prisma-data-model
description: Understanding the Prisma schema, core entities, and database operations.
---

# Prisma Data Model

This skill ensures correct usage of the database schema and Prisma commands.

## Core Entities

The system relies on the following core models defined in `prisma/schema.prisma`:

### 1. Tenant
The top-level organizational unit.
*   **Relationships:**
    *   Has many `Projects`.
    *   Has many `Environments`.
    *   Has many `Users`.

### 2. Project
A specific engagement or workspace within a Tenant.
*   **Belongs to:** `Tenant`.
*   **Has many:** `Contracts`, `Invoices`.

### 3. Contract
Legal agreements associated with a Project.

### 4. Invoice
Billing records linked to a Project.

### 5. User
System users with access to Tenants.

## Key Relationships
*   **Hierarchy:** `Tenant` -> `Project` -> (`Contract`, `Invoice`).
*   **Isolation:** Queries should almost always filter by `tenantId` to ensure data isolation.

## Soft Deletes
The system uses a "Soft Delete" strategy.
*   **Field:** `deletedAt` (DateTime, nullable).
*   **Logic:**
    *   If `deletedAt` is `null`, the record is active.
    *   If `deletedAt` is set, the record is considered deleted.
*   **Querying:** Always include `where: { deletedAt: null }` in queries unless explicitly auditing deleted items.

## Commands

*   **Generate Client:** `npx prisma generate` (Run after schema changes).
*   **Migrate DB:** `npx prisma migrate deploy` (For production) or `npx prisma migrate dev` (For development).
