import { headers } from 'next/headers';

export async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const xForwardedFor = headersList.get('x-forwarded-for');
  if (xForwardedFor) {
     const ip = xForwardedFor.split(',')[0];
     return ip ? ip.trim() : 'unknown';
  }
  return 'unknown';
}
