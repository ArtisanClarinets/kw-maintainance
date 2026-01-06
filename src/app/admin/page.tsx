import { getDb } from '@/lib/demo/persistence';

export default async function AdminDashboard() {
  const db = await getDb();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-white">System Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatCard label="Total Tenants" value={db.tenants.length} />
         <StatCard label="Properties" value={db.properties.length} />
         <StatCard label="Users" value={db.users.length} />
         <StatCard label="Active Work Orders" value={db.workOrders.filter(w => w.status !== 'Financial Close').length} />
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4 text-emerald-400">Recent Activity</h3>
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <p className="text-slate-400 italic">Audit log integration pending...</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string, value: number }) {
    return (
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-lg">
            <h4 className="text-slate-400 text-sm uppercase tracking-wide font-medium">{label}</h4>
            <p className="text-4xl font-bold text-white mt-2">{value}</p>
        </div>
    )
}
