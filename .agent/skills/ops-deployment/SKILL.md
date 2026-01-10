---
name: ops-deployment
description: Build, verification, and deployment operations.
---

# Ops & Deployment (K&W)

This skill covers the build pipeline, verification scripts, and environment setup.

## Build System

The project uses Next.js with a custom "Fortune 500" setup script.

### 1. Setup & "Build Proof"
The `postinstall` hook runs `scripts/setup-advanced.mjs`. This script acts as the "Build Proof" system by:
*   Generating/Validating `.env.local`.
*   Creating `data/server-config.json` (System configuration).
*   Creating `data/demo-db.json` (Initial data).
*   Generating security keys (`SERVER_CONFIG_MASTER_KEY`).

**Command:**
```bash
npm install
```

### 2. Validation
Before deployment, the server configuration must be validated.
**Command:**
```bash
npm run server:validate
```

### 3. Production Build
Standard Next.js build process, but requires the environment to be "bootstrapped" first.
**Command:**
```bash
npm run build
```

## Deployment Operations

### Environment Setup (`setup-advanced.mjs`)
This script is the source of truth for environment integrity.
*   **Auto-fix**: It attempts to create missing configuration files.
*   **Security**: It generates strong random keys for `AUTH_JWT_SECRET` and `SERVER_CONFIG_MASTER_KEY` if missing.

### Nginx / Server Config
The project generates a `data/server-config.json` which dictates behavior (rate limits, spam control). This is used by the application logic (runtime), replacing the need for complex Nginx rules for these specific application-layer checks.

### Verification
Use `npm run server:validate` to ensure the integrity of the configuration and data files before starting the production server.
