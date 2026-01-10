---
name: admin-workflows
description: Administrative tasks, RBAC hierarchy, and business workflows.
---

# Admin Workflows

This skill documents high-level administrative processes.

## RBAC Hierarchy
The system enforces the following role hierarchy:
1.  **Owner**: Full system access, can manage billing and structural configurations.
2.  **Admin**: Can manage users, projects, and settings within a Tenant.
3.  **Editor**: Can create and modify content (Projects, Contracts).
4.  **Analyst**: Read-only access to data and reports.

## Core Workflows

### 1. Proposal -> Project
*   **Trigger:** A "Proposal" is approved.
*   **Action:** The system converts the Proposal object into a generic "Project".
*   **Data:** Carries over budget, timeline, and client details.

### 2. Lead Management
*   **Flow:** Inbox -> Status Update.
*   **States:** New, Contacted, Qualified, Proposal Sent, Won/Lost.

### 3. Audit Logging
*   **Requirement:** All privileged actions must be logged.
*   **Scope:** Any mutation by an Admin or Owner (e.g., changing user roles, deleting projects).
*   **Storage:** `AuditLog` table (via Prisma).
