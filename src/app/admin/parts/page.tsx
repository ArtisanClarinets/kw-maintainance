import { getDb } from '@/lib/demo/persistence';
import { createPart, updatePart, deletePart } from '@/app/admin/parts/actions';
import { redirect } from 'next/navigation';
import type { Part } from '@/lib/domain/schema';

export default async function AdminParts() {
  const db = await getDb();
  const parts = db.parts || [];

  async function createAction(formData: FormData) {
    'use server';
    await createPart({
      tenantId: String(formData.get('tenantId') ?? 't1'),
      name: String(formData.get('name') ?? ''),
      sku: String(formData.get('sku') ?? ''),
      category: String(formData.get('category') ?? ''),
      cost: Number(formData.get('cost') ?? 0),
      minStockLevel: Number(formData.get('minStockLevel') ?? 0),
    });
    redirect('/admin/parts');
  }

  async function deleteAction(formData: FormData) {
    'use server';
    const id = String(formData.get('id'));
    const tenantId = String(formData.get('tenantId') ?? 't1');
    await deletePart(id, tenantId);
    redirect('/admin/parts');
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Parts & Inventory</h2>
        <p className="text-slate-400">Track components, parts, and inventory stock levels.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 backdrop-blur">
          <h3 className="font-bold text-lg text-white mb-6">Add Part</h3>
          <form action={createAction} className="space-y-4">
            <input type="hidden" name="tenantId" value="t1" />
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Name *</label>
              <input name="name" required className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" placeholder="Copper Pipe 1/2in" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">SKU</label>
              <input name="sku" className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" placeholder="CU-PIPE-050" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <input name="category" className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" placeholder="Plumbing Supplies" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Unit Cost</label>
                <input name="cost" type="number" step="0.01" className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" placeholder="15.99" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Min Stock</label>
                <input name="minStockLevel" type="number" className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" placeholder="10" />
              </div>
            </div>
            <div className="pt-4">
              <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-semibold transition transform hover:scale-105">Create Part</button>
            </div>
          </form>
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 backdrop-blur">
          <h3 className="font-bold text-lg text-white mb-6">Existing Parts ({parts.length})</h3>
          <div className="space-y-4">
            {parts.map((p: Part) => (
              <div key={p.id} className="p-4 bg-slate-700/20 border border-slate-700 rounded-lg hover:bg-slate-700/40 transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-white">{p.name}</div>
                    <div className="text-sm text-slate-400 mt-1">SKU: {p.sku} • {p.category}</div>
                    <div className="text-xs text-slate-500 mt-2">${p.cost.toFixed(2)} • Min Stock: {p.minStockLevel}</div>
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
                  <summary className="text-sm text-emerald-400 cursor-pointer hover:text-emerald-300 font-medium transition">✎ Edit</summary>
                  <form action={async (fd: FormData) => { 'use server'; await updatePart(p.id, {
                    tenantId: p.tenantId,
                    name: String(fd.get('name') ?? p.name),
                    sku: String(fd.get('sku') ?? p.sku),
                    category: String(fd.get('category') ?? p.category),
                    cost: Number(fd.get('cost') ?? p.cost),
                  }); return redirect('/admin/parts'); }} className="mt-4 pt-4 border-t border-slate-700 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                      <input name="name" defaultValue={p.name} className="w-full px-3 py-2 rounded bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">SKU</label>
                      <input name="sku" defaultValue={p.sku} className="w-full px-3 py-2 rounded bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                      <input name="category" defaultValue={p.category} className="w-full px-3 py-2 rounded bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Cost</label>
                      <input name="cost" type="number" step="0.01" defaultValue={p.cost} className="w-full px-3 py-2 rounded bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500 transition" />
                    </div>
                    <div className="pt-2">
                      <button type="submit" className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium text-sm transition">Save Changes</button>
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
