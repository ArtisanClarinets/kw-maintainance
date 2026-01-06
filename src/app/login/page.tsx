'use client';

import { useActionState, Suspense } from 'react';
import { loginAction } from './actions';
import { useSearchParams } from 'next/navigation';

function LoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '';
  const [state, action, isPending] = useActionState(loginAction, null);

  return (
    <form action={action} className="space-y-4">
        <input type="hidden" name="from" value={from} />
        
        <div>
            <label className="block text-xs text-slate-400 mb-1">Email Address</label>
            <input 
                name="email" 
                type="email" 
                required 
                placeholder="tech@example.com"
                className="w-full bg-slate-950 border border-slate-700 rounded px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none" 
            />
        </div>

        {state?.error && (
            <div className="text-red-400 text-xs bg-red-400/10 p-2 rounded border border-red-400/20">
                {state.error}
            </div>
        )}

        <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded transition-colors disabled:opacity-50"
        >
            {isPending ? 'Authenticating...' : 'Sign In'}
        </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">KW Enterprise</h1>
            <p className="text-slate-400 text-sm">Sign in to access the platform</p>
        </div>

        <Suspense fallback={<div className="text-slate-400 text-sm text-center">Loading login form...</div>}>
            <LoginForm />
        </Suspense>

        <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500 mb-2">Demo Credentials:</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-emerald-400 font-mono">
                <button onClick={() => {
                    const input = document.querySelector('input[name="email"]') as HTMLInputElement;
                    if(input) input.value = 'admin@example.com';
                }} className="text-left hover:underline">admin@example.com</button>
                <button onClick={() => {
                    const input = document.querySelector('input[name="email"]') as HTMLInputElement;
                    if(input) input.value = 'tech@example.com';
                }} className="text-left hover:underline">tech@example.com</button>
            </div>
        </div>
      </div>
    </div>
  );
}
