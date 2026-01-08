import Link from 'next/link';
import { getDb } from '@/lib/demo/persistence';
import { createTechnician, updateTechnician, deleteTechnician } from '@/app/admin/technicians/actions';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import type { Technician } from '@/lib/domain/schema';

export default async function AdminTechnicians() {
  const db = await getDb();
  const techs = db.technicians || [];

  async function createAction(formData: FormData) {
    'use server';
    const payload = {
      tenantId: String(formData.get('tenantId') ?? 't1'),
      name: String(formData.get('name') ?? ''),
      skills: (String(formData.get('skills') ?? '') || '').split(',').map(s => s.trim()).filter(Boolean),
      certifications: (String(formData.get('certs') ?? '') || '').split(',').map(s => s.trim()).filter(Boolean),
      hourlyRate: Number(formData.get('hourlyRate') ?? 0),
      active: formData.get('active') === 'on',
      phone: String(formData.get('phone') ?? ''),
    };
    await createTechnician(payload);
    redirect('/admin/technicians');
  }

  async function deleteAction(formData: FormData) {
    'use server';
    const id = String(formData.get('id'));
    const tenantId = String(formData.get('tenantId') ?? 't1');
    await deleteTechnician(id, tenantId);
    redirect('/admin/technicians');
  }

  async function updateAction(formData: FormData) {
    'use server';
    const id = String(formData.get('id'));
    const payload: Partial<Technician> = {};
    if (formData.get('name')) payload.name = String(formData.get('name'));
    if (formData.get('skills')) payload.skills = String(formData.get('skills')).split(',').map(s=>s.trim()).filter(Boolean);
    if (formData.get('hourlyRate')) payload.hourlyRate = Number(formData.get('hourlyRate'));
    if (formData.get('active') !== null) payload.active = formData.get('active') === 'on';
    await updateTechnician(id, payload);
    redirect('/admin/technicians');
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Technicians</h2>
          <p className="text-sm text-muted-foreground">Create and manage technicians for your tenant.</p>
        </div>
        <Link href="/admin" className="text-sm text-primary">← Back to Admin</Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded border border-border/40">
          <h3 className="font-bold mb-4">Add Technician</h3>
          <form action={createAction} className="space-y-3">
            <input type="hidden" name="tenantId" value="t1" />
            <div>
              <label className="text-sm">Name</label>
              <input name="name" required className="w-full mt-1 px-3 py-2 rounded border" />
            </div>
            <div>
              <label className="text-sm">Skills (comma-separated)</label>
              <input name="skills" className="w-full mt-1 px-3 py-2 rounded border" />
            </div>
            <div>
              <label className="text-sm">Certifications (comma-separated)</label>
              <input name="certs" className="w-full mt-1 px-3 py-2 rounded border" />
            </div>
            <div className="flex gap-2 items-center">
              <label className="text-sm">Hourly Rate</label>
              <input name="hourlyRate" type="number" className="w-32 mt-1 px-3 py-2 rounded border" />
            </div>
            <div className="flex gap-2 items-center">
              <label className="text-sm">Phone</label>
              <input name="phone" className="w-full mt-1 px-3 py-2 rounded border" />
            </div>
            <div className="pt-2">
              <Button type="submit">Create Technician</Button>
            </div>
          </form>
        </div>

        <div className="bg-card p-6 rounded border border-border/40">
          <h3 className="font-bold mb-4">Existing Technicians</h3>
          <div className="space-y-3">
            {techs.map((t: Technician) => (
              <div key={t.id} className="p-3 border rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.skills?.join(', ')}</div>
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
                  <form action={updateAction} className="mt-3 space-y-2">
                    <input type="hidden" name="id" value={t.id} />
                    <div>
                      <label className="text-sm">Name</label>
                      <input name="name" defaultValue={t.name} className="w-full mt-1 px-3 py-2 rounded border" />
                    </div>
                    <div>
                      <label className="text-sm">Skills (comma-separated)</label>
                      <input name="skills" defaultValue={(t.skills || []).join(', ')} className="w-full mt-1 px-3 py-2 rounded border" />
                    </div>
                    <div className="flex gap-2 items-center">
                      <label className="text-sm">Hourly Rate</label>
                      <input name="hourlyRate" type="number" defaultValue={t.hourlyRate} className="w-32 mt-1 px-3 py-2 rounded border" />
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
