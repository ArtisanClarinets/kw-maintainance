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
           <AdminLink href="/admin" label="Command Centre" />
           <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Operational Core</div>
           <AdminLink href="/admin/scheduling" label="Deployment Cadence" />
           <AdminLink href="/admin/tenants-properties" label="Institutional Portfolio" />
           <AdminLink href="/admin/users-roles" label="Command Hierarchy" />
           
           <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Operational Modules</div>
           <AdminLink href="/admin/work-order-templates" label="Orchestration Blueprints" />
           <AdminLink href="/admin/dispatch-rules" label="Resource Dynamics" />
           <AdminLink href="/admin/assets" label="Asset Stewardship" />
           <AdminLink href="/admin/inventory" label="Supply Chain Config" />
           <AdminLink href="/admin/iot" label="Telemetry & IoT" />

           <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Infrastructure</div>
           <AdminLink href="/admin/integrations" label="Ecosystem Connectivity" />
           <AdminLink href="/admin/audit" label="Stewardship Traceability" />
           <AdminLink href="/admin/content" label="Brand Narrative CMS" />
           <AdminLink href="/admin/settings" label="Global Architecture" />
           <AdminLink href="/admin/demo-data" label="Reset Environment" />
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
