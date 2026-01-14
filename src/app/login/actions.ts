'use server';

import { login } from '@/lib/auth';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) return { success: false, error: 'Email and password required' };

  const success = await login(email, password);
  if (success) {
    return { success: true };
  } else {
    return { success: false, error: 'Invalid email or user not found' };
  }
}
