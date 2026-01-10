---
name: admin-workflows
description: Administrative tasks, RBAC, and business logic workflows.
---

# Admin Workflows (K&W)

This skill guides the agent through administrative and business logic operations.

## Role-Based Access Control (RBAC)

The system supports a hierarchical RBAC model, currently defined in `data/demo-db.json` and enforced by application logic.

### Roles
1.  **Owner / Security Admin**: Full access. Can rotate keys (`setup-advanced.mjs`).
2.  **Admin / Supervisor**: Can manage properties, users, and view all reports.
3.  **Tech**: Limited access to assigned Work Orders.
4.  **Analyst**: Read-only access to reporting.

## Workflows

### 1. User Management
*   **Create User**: Currently involves editing `data/demo-db.json` -> `users` array.
*   **Password Reset**: Passwords are hashed. To reset, use `scripts/setup-advanced.mjs --admin-email <email> --admin-password <new_pass>`.

### 2. Proposal -> Project (Future Phase)
*   **Current**: Leads arrive via email (Contact Form).
*   **Workflow**:
    1.  Lead submits "Commercial Proposal" form.
    2.  Admin reviews in external email.
    3.  Admin creates a "Tenant" entry in `demo-db.json` if they convert.

### 3. Audit Logging
*   **Requirement**: All privileged actions (e.g., changing server config, rotating keys) should be logged.
*   **Implementation**: `scripts/setup-advanced.mjs` logs to `data/setup.log`.

## Admin Portal
The "Admin Portal" is currently a Phase 2 feature. Administrative actions are performed via CLI scripts (`scripts/`) or direct data file manipulation (`data/`).
