import Link from 'next/link';
import { getDb } from '@/lib/demo/persistence';
import { Button } from '@/components/ui/button';
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Vendors</h2>
          <p className="text-sm text-muted-foreground">Manage vendor records and compliance.</p>
        </div>
        <Link href="/admin" className="text-sm text-primary">← Back to Admin</Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded border border-border/40">
          <h3 className="font-bold mb-4">Add Vendor</h3>
          <form action={createAction} className="space-y-3">
            <input type="hidden" name="tenantId" value="t1" />
            <div>
              <label className="text-sm">Name</label>
              <input name="name" required className="w-full mt-1 px-3 py-2 rounded border" />
            </div>
            <div>
              <label className="text-sm">Type</label>
              <select name="type" className="w-full mt-1 px-3 py-2 rounded border">
                <option value="Service">Service</option>
                <option value="Supply">Supply</option>
                <option value="Software">Software</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Status</label>
              <select name="status" className="w-full mt-1 px-3 py-2 rounded border">
                <option value="Active">Active</option>
                <option value="Probation">Probation</option>
                <option value="Non-Compliant">Non-Compliant</option>
              </select>
            </div>
            <div className="pt-2">
              <Button type="submit">Create Vendor</Button>
            </div>
          </form>
        </div>

        <div className="bg-card p-6 rounded border border-border/40">
          <h3 className="font-bold mb-4">Existing Vendors</h3>
          <div className="space-y-3">
            {vendors.map((v: Vendor) => (
              <div key={v.id} className="p-3 border rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{v.name}</div>
                    <div className="text-sm text-muted-foreground">{v.type} • {v.status}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={deleteAction}>
                      <input type="hidden" name="id" value={v.id} />
                      <input type="hidden" name="tenantId" value={v.tenantId} />
                      <Button type="submit" variant="outline">Delete</Button>
                    </form>
                  </div>
                </div>

                <details className="mt-3">
                  <summary className="text-sm text-primary cursor-pointer">Edit</summary>
                  <form action={async (fd: FormData) => { 'use server'; await updateVendor(v.id, {
                      tenantId: v.tenantId,
                      name: String(fd.get('name') ?? v.name),
                    type: (String(fd.get('type') ?? v.type) as 'Service' | 'Supply' | 'Software'),
                    status: (String(fd.get('status') ?? v.status) as 'Active' | 'Probation' | 'Non-Compliant'),
                      complianceScore: Number(fd.get('score') ?? v.complianceScore)
                    }); return redirect('/admin/vendors'); }} className="mt-3 space-y-2">
                    <input type="hidden" name="tenantId" value={v.tenantId} />
                    <div>
                      <label className="text-sm">Name</label>
                      <input name="name" defaultValue={v.name} className="w-full mt-1 px-3 py-2 rounded border" />
                    </div>
                    <div>
                      <label className="text-sm">Type</label>
                      <select name="type" defaultValue={v.type} className="w-full mt-1 px-3 py-2 rounded border">
                        <option value="Service">Service</option>
                        <option value="Supply">Supply</option>
                        <option value="Software">Software</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm">Status</label>
                      <select name="status" defaultValue={v.status} className="w-full mt-1 px-3 py-2 rounded border">
                        <option value="Active">Active</option>
                        <option value="Probation">Probation</option>
                        <option value="Non-Compliant">Non-Compliant</option>
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
