import Link from 'next/link';
import { getDb } from '@/lib/demo/persistence';
import { createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } from '@/app/admin/purchase-orders/actions';
import { Button } from '@/components/ui/button';
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Purchase Orders</h2>
          <p className="text-sm text-muted-foreground">Create and manage purchase orders.</p>
        </div>
        <Link href="/admin" className="text-sm text-primary">← Back to Admin</Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded border border-border/40">
          <h3 className="font-bold mb-4">Create Purchase Order</h3>
          <form action={createAction} className="space-y-3">
            <input type="hidden" name="tenantId" value="t1" />
            <div>
              <label className="text-sm">Vendor ID</label>
              <input name="vendorId" required className="w-full mt-1 px-3 py-2 rounded border" />
            </div>
            <div>
              <label className="text-sm">Status</label>
              <select name="status" className="w-full mt-1 px-3 py-2 rounded border">
                <option value="Draft">Draft</option>
                <option value="Open">Open</option>
                <option value="Approved">Approved</option>
                <option value="Received">Received</option>
                <option value="Closed">Closed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="pt-2">
              <Button type="submit">Create PO</Button>
            </div>
          </form>
        </div>

        <div className="bg-card p-6 rounded border border-border/40">
          <h3 className="font-bold mb-4">Existing Purchase Orders</h3>
          <div className="space-y-3">
            {pos.map((p: PurchaseOrder) => (
              <div key={p.id} className="p-3 border rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.id}</div>
                    <div className="text-sm text-muted-foreground">{p.vendorId} • {p.status}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={deleteAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <input type="hidden" name="tenantId" value={p.tenantId} />
                      <Button type="submit" variant="outline">Delete</Button>
                    </form>
                  </div>
                </div>

                <details className="mt-3">
                  <summary className="text-sm text-primary cursor-pointer">Edit</summary>
                  <form action={async (fd: FormData) => { 'use server'; await updatePurchaseOrder(p.id, {
                    tenantId: p.tenantId,
                    vendorId: String(fd.get('vendorId') ?? p.vendorId),
                    status: (String(fd.get('status') ?? p.status) as 'Draft' | 'Open' | 'Approved' | 'Received' | 'Closed' | 'Cancelled'),
                  }); return redirect('/admin/purchase-orders'); }} className="mt-3 space-y-2">
                    <input type="hidden" name="tenantId" value={p.tenantId} />
                    <div>
                      <label className="text-sm">Vendor ID</label>
                      <input name="vendorId" defaultValue={p.vendorId} className="w-full mt-1 px-3 py-2 rounded border" />
                    </div>
                    <div>
                      <label className="text-sm">Status</label>
                      <select name="status" defaultValue={p.status} className="w-full mt-1 px-3 py-2 rounded border">
                        <option value="Draft">Draft</option>
                        <option value="Open">Open</option>
                        <option value="Approved">Approved</option>
                        <option value="Received">Received</option>
                        <option value="Closed">Closed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="pt-2">
                      <Button type="submit">Save</Button>
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
