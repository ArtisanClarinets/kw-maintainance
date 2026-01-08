import Link from 'next/link';
import { getDb } from '@/lib/demo/persistence';
import { createWorkOrderTemplate, updateWorkOrderTemplate, deleteWorkOrderTemplate } from '@/app/admin/work-order-templates/actions';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import type { WorkOrderTemplate } from '@/lib/domain/schema';

export default async function AdminTemplates() {
  const db = await getDb();
  const templates = db.workOrderTemplates || [];

  async function createAction(formData: FormData) {
    'use server';
    await createWorkOrderTemplate({
      tenantId: String(formData.get('tenantId') ?? 't1'),
      title: String(formData.get('title') ?? ''),
      category: (String(formData.get('category') ?? 'General') as 'Plumbing' | 'Electrical' | 'HVAC' | 'Appliance' | 'General' | 'Predictive' | 'Preventative'),
      defaultSLA: String(formData.get('defaultSLA') ?? undefined) || undefined,
      tasks: [],
    });
    redirect('/admin/work-order-templates');
  }

  async function deleteAction(formData: FormData) {
    'use server';
    const id = String(formData.get('id'));
    const tenantId = String(formData.get('tenantId') ?? 't1');
    await deleteWorkOrderTemplate(id, tenantId);
    redirect('/admin/work-order-templates');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Work Order Templates</h2>
          <p className="text-sm text-muted-foreground">Create and manage templates for common jobs.</p>
        </div>
        <Link href="/admin" className="text-sm text-primary">← Back to Admin</Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded border border-border/40">
          <h3 className="font-bold mb-4">Add Template</h3>
          <form action={createAction} className="space-y-3">
            <input type="hidden" name="tenantId" value="t1" />
            <div>
              <label className="text-sm">Title</label>
              <input name="title" required className="w-full mt-1 px-3 py-2 rounded border" />
            </div>
            <div>
              <label className="text-sm">Category</label>
              <input name="category" className="w-full mt-1 px-3 py-2 rounded border" />
            </div>
            <div className="pt-2">
              <Button type="submit">Create Template</Button>
            </div>
          </form>
        </div>

        <div className="bg-card p-6 rounded border border-border/40">
          <h3 className="font-bold mb-4">Existing Templates</h3>
          <div className="space-y-3">
            {templates.map((t: WorkOrderTemplate) => (
              <div key={t.id} className="p-3 border rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t.title}</div>
                    <div className="text-sm text-muted-foreground">{t.category}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={deleteAction}>
                      <input type="hidden" name="id" value={t.id} />
                      <input type="hidden" name="tenantId" value={t.tenantId} />
                      <Button type="submit" variant="outline">Delete</Button>
                    </form>
                  </div>
                </div>

                <details className="mt-3">
                  <summary className="text-sm text-primary cursor-pointer">Edit</summary>
                  <form action={async (fd: FormData) => { 'use server'; await updateWorkOrderTemplate(t.id, {
                    tenantId: t.tenantId,
                    title: String(fd.get('title') ?? t.title),
                    category: (String(fd.get('category') ?? t.category) as 'Plumbing' | 'Electrical' | 'HVAC' | 'Appliance' | 'General' | 'Predictive' | 'Preventative'),
                  }); return redirect('/admin/work-order-templates'); }} className="mt-3 space-y-2">
                    <input type="hidden" name="tenantId" value={t.tenantId} />
                    <div>
                      <label className="text-sm">Title</label>
                      <input name="title" defaultValue={t.title} className="w-full mt-1 px-3 py-2 rounded border" />
                    </div>
                    <div>
                      <label className="text-sm">Category</label>
                      <input name="category" defaultValue={t.category} className="w-full mt-1 px-3 py-2 rounded border" />
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
