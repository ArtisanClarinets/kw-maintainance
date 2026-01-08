import Link from 'next/link';
import { getDb } from '@/lib/demo/persistence';
import { createPart, updatePart, deletePart } from '@/app/admin/parts/actions';
import { Button } from '@/components/ui/button';
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Parts</h2>
          <p className="text-sm text-muted-foreground">Manage inventory parts and details.</p>
        </div>
        <Link href="/admin" className="text-sm text-primary">← Back to Admin</Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded border border-border/40">
          <h3 className="font-bold mb-4">Add Part</h3>
          <form action={createAction} className="space-y-3">
            <input type="hidden" name="tenantId" value="t1" />
            <div>
              <label className="text-sm">Name</label>
              <input name="name" required className="w-full mt-1 px-3 py-2 rounded border" />
            </div>
            <div>
              <label className="text-sm">SKU</label>
              <input name="sku" className="w-full mt-1 px-3 py-2 rounded border" />
            </div>
            <div>
              <label className="text-sm">Category</label>
              <input name="category" className="w-full mt-1 px-3 py-2 rounded border" />
            </div>
            <div className="flex gap-2 items-center">
              <label className="text-sm">Cost</label>
              <input name="cost" type="number" className="w-32 mt-1 px-3 py-2 rounded border" />
            </div>
            <div className="pt-2">
              <Button type="submit">Create Part</Button>
            </div>
          </form>
        </div>

        <div className="bg-card p-6 rounded border border-border/40">
          <h3 className="font-bold mb-4">Existing Parts</h3>
          <div className="space-y-3">
            {parts.map((p: Part) => (
              <div key={p.id} className="p-3 border rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{p.sku} • {p.category}</div>
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
                  <form action={async (fd: FormData) => { 'use server'; await updatePart(p.id, {
                    tenantId: p.tenantId,
                    name: String(fd.get('name') ?? p.name),
                    sku: String(fd.get('sku') ?? p.sku),
                    category: String(fd.get('category') ?? p.category),
                    cost: Number(fd.get('cost') ?? p.cost),
                  }); return redirect('/admin/parts'); }} className="mt-3 space-y-2">
                    <input type="hidden" name="tenantId" value={p.tenantId} />
                    <div>
                      <label className="text-sm">Name</label>
                      <input name="name" defaultValue={p.name} className="w-full mt-1 px-3 py-2 rounded border" />
                    </div>
                    <div>
                      <label className="text-sm">SKU</label>
                      <input name="sku" defaultValue={p.sku} className="w-full mt-1 px-3 py-2 rounded border" />
                    </div>
                    <div className="flex gap-2 items-center">
                      <label className="text-sm">Cost</label>
                      <input name="cost" type="number" defaultValue={p.cost} className="w-32 mt-1 px-3 py-2 rounded border" />
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
