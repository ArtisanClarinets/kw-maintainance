'use server';
import { login as authLogin } from '@/lib/auth';
import { redirect } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const from = formData.get('from') as string;
    
    const success = await authLogin(email);
    
    if (success) {
        redirect(from || '/app');
    }
    
    return { success: false, error: 'Invalid email or user not found. Try "tech@example.com" or "admin@example.com".' };
}
