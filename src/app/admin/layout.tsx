import React from 'react';
import Link from 'next/link';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user || user.role !== 'security_admin') {
     redirect('/login');
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
           <h1 className="text-xl font-bold text-emerald-400 tracking-wider">KW OPS ADMIN</h1>
           <p className="text-xs text-slate-500 mt-1">Security Level 5</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
           <AdminLink href="/admin" label="Dashboard" />
           <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Core</div>
           <AdminLink href="/admin/scheduling" label="Scheduling Rules" />
           <AdminLink href="/admin/tenants-properties" label="Tenants & Properties" />
           <AdminLink href="/admin/users-roles" label="Users & Roles" />
           
           <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Modules</div>
           <AdminLink href="/admin/work-order-templates" label="WO Templates" />
           <AdminLink href="/admin/dispatch-rules" label="Dispatch Logic" />
           <AdminLink href="/admin/assets" label="Asset Registry" />
           <AdminLink href="/admin/inventory" label="Inventory Config" />
           <AdminLink href="/admin/iot" label="IoT & Sensors" />

           <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">System</div>
           <AdminLink href="/admin/integrations" label="Integrations" />
           <AdminLink href="/admin/audit" label="Audit Logs" />
           <AdminLink href="/admin/content" label="CMS Content" />
           <AdminLink href="/admin/settings" label="Global Settings" />
           <AdminLink href="/admin/demo-data" label="Reset Demo Data" />
        </nav>
        <div className="p-4 border-t border-slate-800">
           <div className="text-sm font-medium">{user.name}</div>
           <div className="text-xs text-slate-500">{user.email}</div>
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
      <main className="flex-1 p-8 overflow-y-auto">
         {children}
      </main>
    </div>
  );
}

function AdminLink({ href, label }: { href: string, label: string }) {
    return (
        <Link href={href} className="block px-4 py-2 rounded text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            {label}
        </Link>
    )
}
