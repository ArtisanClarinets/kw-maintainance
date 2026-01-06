import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { User } from '@/lib/domain/schema';
import { getDb } from '@/lib/demo/persistence';
import { getAuthSecret, AUTH_COOKIE_NAME } from '@/lib/env';

export async function login(email: string): Promise<boolean> {
  const db = await getDb();
  const user = db.users.find(u => u.email === email);

  if (!user) return false;

  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    tenantId: user.tenantId,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getAuthSecret());

  (await cookies()).set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return true;
}

export async function logout() {
  (await cookies()).delete(AUTH_COOKIE_NAME);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token.value, getAuthSecret());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return payload as any; // Typed payload
  } catch (e) {
    void e;
    return null;
  }
}

export async function getUser(): Promise<User | null> {
  const session = await getSession();
  if (!session) return null;
  const db = await getDb();
  return db.users.find(u => u.id === session.id) || null;
}
