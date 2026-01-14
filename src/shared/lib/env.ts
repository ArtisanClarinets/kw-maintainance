// Server-only environment helpers for secrets and auth
// Keep this module server-only; it may throw in production if required vars are missing.

export const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'demo_auth_token';

/**
 * Returns a Uint8Array suitable for use with jose HS* operations.
 * In production this will throw if AUTH_JWT_SECRET is not set. In development
 * it will warn and fall back to a demo secret to avoid breaking local builds.
 */
export function getAuthSecret(): Uint8Array {
  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('AUTH_JWT_SECRET is required in production. Set AUTH_JWT_SECRET in the environment.');
    }
    // Development fallback (insecure) — useful for local dev & CI demos
    // but DO NOT use in production.
    console.warn('AUTH_JWT_SECRET not set — using insecure demo fallback. Generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'base64\'))"');
    return new TextEncoder().encode('demo-secret-key-change-me');
  }

  return new TextEncoder().encode(secret);
}
