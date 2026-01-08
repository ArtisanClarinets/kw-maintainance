import { getDb } from '@/lib/demo/persistence';
import { createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } from '@/app/admin/purchase-orders/actions';
import { redirect } from 'next/navigation';
import type { PurchaseOrder } from '@/lib/domain/schema';

export default async function AdminPOs() {
  const db = await getDb();
  const pos = db.purchaseOrders || [];

  async function createAction(formData: FormData) {
    'use server';
    await createPurchaseOrder({
      tenantId: String(formData.get('tenantId') ?? 't1'),
      vendorId: String(formData.get('vendorId') ?? ''),
      status: (String(formData.get('status') ?? 'Draft') as 'Draft' | 'Open' | 'Approved' | 'Received' | 'Closed' | 'Cancelled'),
      lines: [],
    });
    redirect('/admin/purchase-orders');
  }

  async function deleteAction(formData: FormData) {
    'use server';
    const id = String(formData.get('id'));
    const tenantId = String(formData.get('tenantId') ?? 't1');
    await deletePurchaseOrder(id, tenantId);
    redirect('/admin/purchase-orders');
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Purchase Orders</h2>
        <p className="text-slate-400">Create and manage vendor purchase orders and procurement.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 backdrop-blur">
          <h3 className="font-bold text-lg text-white mb-6">Create Purchase Order</h3>
          <form action={createAction} className="space-y-4">
            <input type="hidden" name="tenantId" value="t1" />
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Vendor ID *</label>
              <input name="vendorId" required className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" placeholder="vendor-001" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
              <select name="status" className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:border-emerald-500 transition">
                <option value="Draft">Draft</option>
                <option value="Open">Open</option>
                <option value="Approved">Approved</option>
                <option value="Received">Received</option>
                <option value="Closed">Closed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="pt-4">
              <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white rounded-lg font-semibold transition transform hover:scale-105">Create Purchase Order</button>
            </div>
          </form>
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 backdrop-blur">
          <h3 className="font-bold text-lg text-white mb-6">Existing Purchase Orders ({pos.length})</h3>
          <div className="space-y-4">
            {pos.map((p: PurchaseOrder) => (
              <div key={p.id} className="p-4 bg-slate-700/20 border border-slate-700 rounded-lg hover:bg-slate-700/40 transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-white">{p.id}</div>
                    <div className="text-sm text-slate-400 mt-1">Vendor: {p.vendorId}</div>
                    <div className={`text-xs font-medium mt-2 inline-block px-2 py-1 rounded ${
                      p.status === 'Closed' ? 'bg-emerald-500/20 text-emerald-400' :
                      p.status === 'Approved' ? 'bg-blue-500/20 text-blue-400' :
                      p.status === 'Draft' ? 'bg-slate-500/20 text-slate-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>{p.status}</div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <form action={deleteAction} className="flex">
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="tenantId" value={p.tenantId} />
                      <button type="submit" className="px-3 py-1.5 text-sm bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition border border-red-500/30">Remove</button>
                    </form>
                  </div>
                </div>

                <details className="mt-4 group">
                  <summary className="text-sm text-rose-400 cursor-pointer hover:text-rose-300 font-medium transition">✏️ Edit</summary>
                  <form action={async (fd: FormData) => { 'use server'; await updatePurchaseOrder(p.id, {
                    tenantId: p.tenantId,
                    vendorId: String(fd.get('vendorId') ?? p.vendorId),
                    status: (String(fd.get('status') ?? p.status) as 'Draft' | 'Open' | 'Approved' | 'Received' | 'Closed' | 'Cancelled'),
                  }); return redirect('/admin/purchase-orders'); }} className="mt-4 pt-4 border-t border-slate-700 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Vendor ID</label>
                      <input name="vendorId" defaultValue={p.vendorId} className="w-full px-3 py-2 rounded bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                      <select name="status" defaultValue={p.status} className="w-full px-3 py-2 rounded bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500 transition">
                        <option value="Draft">Draft</option>
                        <option value="Open">Open</option>
                        <option value="Approved">Approved</option>
                        <option value="Received">Received</option>
                        <option value="Closed">Closed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="pt-2">
                      <button type="submit" className="w-full px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded font-medium text-sm transition">Save Changes</button>
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
