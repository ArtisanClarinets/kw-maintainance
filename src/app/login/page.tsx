'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { loginAction } from './actions';

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const res = await loginAction(formData);
    if (res.success) {
      router.push('/admin');
    } else {
      setError(res.error || 'Login failed');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <Card className="w-full max-w-md bg-slate-950 border-slate-800 text-slate-100">
        <CardHeader>
          <CardTitle className="text-2xl text-center">KW Enterprise Login</CardTitle>
          <CardDescription className="text-center text-slate-400">
            Enter your email to sign in (Demo)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                required
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
              Sign In
            </Button>
            <div className="text-xs text-center text-slate-500">
              Demo accounts: admin@example.com, tech@example.com
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
