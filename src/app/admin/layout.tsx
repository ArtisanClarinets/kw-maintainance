import React from 'react';
import Link from 'next/link';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Users, FileText, ClipboardList, Database, Box } from 'lucide-react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) redirect('/login');

  const allowedAdminRoles = ['security_admin', 'tenant_admin'];
  if (!allowedAdminRoles.includes(user.role)) redirect('/app');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      <aside className="w-20 lg:w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 transition-all duration-300">
        <div className="p-4 lg:p-6 border-b border-slate-800 flex items-center justify-center lg:justify-start">
          <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-slate-900">K</div>
          <span className="ml-3 font-bold text-white hidden lg:block tracking-wider">KW ADMIN</span>
        </div>
        <nav className="flex-1 p-2 lg:p-4 space-y-1">
          <AdminLink href="/admin" label="Overview" icon={FileText} />
          <AdminLink href="/admin/technicians" label="Technicians" icon={Users} />
          <AdminLink href="/admin/work-order-templates" label="Templates" icon={ClipboardList} />
          <AdminLink href="/admin/vendors" label="Vendors" icon={Box} />
          <AdminLink href="/admin/parts" label="Parts" icon={Database} />
          <AdminLink href="/admin/purchase-orders" label="Purchase Orders" icon={ClipboardList} />
        </nav>
        <div className="p-4 border-t border-slate-800 hidden lg:block">
          <div className="text-sm font-medium truncate">{user.name}</div>
          <div className="text-xs text-slate-500 truncate">{user.role}</div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-medium text-slate-200">Admin Console</h1>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

function AdminLink({ href, label, icon: Icon }: { href: string; label: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 lg:px-4 py-3 rounded text-slate-400 hover:bg-slate-800 hover:text-white transition-colors group">
      <Icon className="h-5 w-5 group-hover:text-emerald-400 transition-colors" />
      <span className="hidden lg:block font-medium text-sm">{label}</span>
    </Link>
  );
}
