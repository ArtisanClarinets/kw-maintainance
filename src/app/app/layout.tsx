import React from 'react';
import Link from 'next/link';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LayoutGrid, ClipboardList, Map, Box, Package, Activity } from 'lucide-react';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
     redirect('/login');
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 transition-all duration-300">
        <div className="p-4 lg:p-6 border-b border-slate-800 flex items-center justify-center lg:justify-start">
           <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-slate-900">K</div>
           <span className="ml-3 font-bold text-white hidden lg:block tracking-wider">KW OPS</span>
        </div>
        <nav className="flex-1 p-2 lg:p-4 space-y-1">
           <AppLink href="/app" label="Dashboard" icon="LayoutGrid" />
           <AppLink href="/app/work-orders" label="Work Orders" icon="ClipboardList" />
           <AppLink href="/app/dispatch" label="Dispatch" icon="Map" />
           <AppLink href="/app/assets" label="Assets" icon="Box" />
           <AppLink href="/app/inventory" label="Inventory" icon="Package" />
           <AppLink href="/app/iot" label="IoT Monitor" icon="Activity" />
        </nav>
        <div className="p-4 border-t border-slate-800 hidden lg:block">
           <div className="text-sm font-medium truncate">{user.name}</div>
           <div className="text-xs text-slate-500 truncate">{user.role}</div>
           <form action={async () => {
             'use server';
             const { logout } = await import('@/lib/auth');
             await logout();
             redirect('/login');
           }}>
             <button className="mt-2 text-xs text-red-400 hover:text-red-300">Sign Out</button>
           </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
         {/* Topbar */}
         <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur flex items-center justify-between px-8 sticky top-0 z-10">
            <h1 className="text-lg font-medium text-slate-200">
               Property: <span className="text-emerald-400">Grand Hotel</span>
            </h1>
            <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-slate-400 font-mono">SYSTEM ONLINE</span>
            </div>
         </header>
         <div className="p-8">
            {children}
         </div>
      </main>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Icons: any = { LayoutGrid, ClipboardList, Map, Box, Package, Activity };

function AppLink({ href, label, icon }: { href: string, label: string, icon: string }) {
    const Icon = Icons[icon];
    return (
        <Link href={href} className="flex items-center gap-3 px-3 lg:px-4 py-3 rounded text-slate-400 hover:bg-slate-800 hover:text-white transition-colors group">
            <Icon className="h-5 w-5 group-hover:text-emerald-400 transition-colors" />
            <span className="hidden lg:block font-medium text-sm">{label}</span>
        </Link>
    )
}
