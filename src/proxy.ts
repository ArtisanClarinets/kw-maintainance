import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { getAuthSecret, AUTH_COOKIE_NAME } from '@/lib/env';

interface SessionPayload {
  role?: string;
  [key: string]: unknown;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /app and /admin
  if (pathname.startsWith('/app') || pathname.startsWith('/admin')) {
    // Exclude login pages if they were under these paths
    if (pathname === '/admin/login') {
        return NextResponse.next();
    }

    const token = request.cookies.get(AUTH_COOKIE_NAME);
    let session: SessionPayload | null = null;

    if (token) {
      try {
        const { payload } = await jwtVerify(token.value, getAuthSecret());
        session = payload as SessionPayload;
      } catch (e) {
        void e;
        // Invalid token
      }
    }

    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('from', pathname);
      return NextResponse.redirect(url);
    }

    // Role checks
    if (pathname.startsWith('/admin')) {
       if (session.role !== 'security_admin') {
           // Redirect to app if logged in but not admin
           return NextResponse.redirect(new URL('/app', request.url));
       }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*', '/admin/:path*'],
};
