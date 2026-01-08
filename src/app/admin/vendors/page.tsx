import { getDb } from '@/lib/demo/persistence';
import { createVendor, updateVendor, deleteVendor } from '@/app/admin/vendors/actions';
import { redirect } from 'next/navigation';
import type { Vendor } from '@/lib/domain/schema';

export default async function AdminVendors() {
  const db = await getDb();
  const vendors = db.vendors || [];

  async function createAction(formData: FormData) {
    'use server';
    await createVendor({
      tenantId: String(formData.get('tenantId') ?? 't1'),
      name: String(formData.get('name') ?? ''),
      type: (String(formData.get('type') ?? 'Service') as 'Service' | 'Supply' | 'Software'),
      status: (String(formData.get('status') ?? 'Active') as 'Active' | 'Probation' | 'Non-Compliant'),
      complianceScore: Number(formData.get('score') ?? 100),
      lastAuditDate: String(formData.get('lastAuditDate') ?? undefined) || undefined,
    });
    redirect('/admin/vendors');
  }

  async function deleteAction(formData: FormData) {
    'use server';
    const id = String(formData.get('id'));
    const tenantId = String(formData.get('tenantId') ?? 't1');
    await deleteVendor(id, tenantId);
    redirect('/admin/vendors');
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Vendors</h2>
        <p className="text-slate-400">Manage suppliers and track vendor compliance status.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 backdrop-blur">
          <h3 className="font-bold text-lg text-white mb-6">Add Vendor</h3>
          <form action={createAction} className="space-y-4">
            <input type="hidden" name="tenantId" value="t1" />
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Name *</label>
              <input name="name" required className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" placeholder="Acme Plumbing Supply" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
              <select name="type" className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:border-emerald-500 transition">
                <option value="Service">Service Provider</option>
                <option value="Supply">Supply Vendor</option>
                <option value="Software">Software</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
              <select name="status" className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:border-emerald-500 transition">
                <option value="Active">Active</option>
                <option value="Probation">Probation</option>
                <option value="Non-Compliant">Non-Compliant</option>
              </select>
            </div>
            <div className="pt-4">
              <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg font-semibold transition transform hover:scale-105">Create Vendor</button>
            </div>
          </form>
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 backdrop-blur">
          <h3 className="font-bold text-lg text-white mb-6">Existing Vendors ({vendors.length})</h3>
          <div className="space-y-4">
            {vendors.map((v: Vendor) => (
              <div key={v.id} className="p-4 bg-slate-700/20 border border-slate-700 rounded-lg hover:bg-slate-700/40 transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-white">{v.name}</div>
                    <div className="text-sm text-slate-400 mt-1">
                      <span className="inline-block mr-3">Type: {v.type}</span>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        v.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' :
                        v.status === 'Probation' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>{v.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <form action={deleteAction} className="flex">
                      <input type="hidden" name="id" value={v.id} />
                      <input type="hidden" name="tenantId" value={v.tenantId} />
                      <button type="submit" className="px-3 py-1.5 text-sm bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition border border-red-500/30">Remove</button>
                    </form>
                  </div>
                </div>

                <details className="mt-4 group">
                  <summary className="text-sm text-amber-400 cursor-pointer hover:text-amber-300 font-medium transition">✏️ Edit</summary>
                  <form action={async (fd: FormData) => { 'use server'; await updateVendor(v.id, {
                      tenantId: v.tenantId,
                      name: String(fd.get('name') ?? v.name),
                    type: (String(fd.get('type') ?? v.type) as 'Service' | 'Supply' | 'Software'),
                    status: (String(fd.get('status') ?? v.status) as 'Active' | 'Probation' | 'Non-Compliant'),
                      complianceScore: Number(fd.get('score') ?? v.complianceScore)
                    }); return redirect('/admin/vendors'); }} className="mt-4 pt-4 border-t border-slate-700 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                      <input name="name" defaultValue={v.name} className="w-full px-3 py-2 rounded bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                      <select name="type" defaultValue={v.type} className="w-full px-3 py-2 rounded bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500 transition">
                        <option value="Service">Service</option>
                        <option value="Supply">Supply</option>
                        <option value="Software">Software</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                      <select name="status" defaultValue={v.status} className="w-full px-3 py-2 rounded bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500 transition">
                        <option value="Active">Active</option>
                        <option value="Probation">Probation</option>
                        <option value="Non-Compliant">Non-Compliant</option>
                      </select>
                    </div>
                    <div className="pt-2">
                      <button type="submit" className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded font-medium text-sm transition">Save Changes</button>
                    </div>
                  </form>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
