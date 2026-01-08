import { getDb } from '@/lib/demo/persistence';
import { createTechnician, updateTechnician, deleteTechnician } from '@/app/admin/technicians/actions';
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
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Technicians</h2>
        <p className="text-slate-400">Recruit, organize, and manage your skilled team members.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 backdrop-blur">
          <h3 className="font-bold text-lg text-white mb-6">Add Technician</h3>
          <form action={createAction} className="space-y-4">
            <input type="hidden" name="tenantId" value="t1" />
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Name *</label>
              <input name="name" required className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" placeholder="John Smith" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Skills (comma-separated)</label>
              <input name="skills" className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" placeholder="Plumbing, Electrical, HVAC" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Certifications (comma-separated)</label>
              <input name="certs" className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" placeholder="License A, License B" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Hourly Rate</label>
                <input name="hourlyRate" type="number" className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" placeholder="65" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                <input name="phone" className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" placeholder="(555) 123-4567" />
              </div>
            </div>
            <div className="pt-4">
              <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-semibold transition transform hover:scale-105">Create Technician</button>
            </div>
          </form>
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 backdrop-blur">
          <h3 className="font-bold text-lg text-white mb-6">Existing Technicians ({techs.length})</h3>
          <div className="space-y-3">
            {techs.map((t: Technician) => (
              <div key={t.id} className="p-4 bg-slate-700/20 border border-slate-700 rounded-lg hover:bg-slate-700/40 transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-slate-400 mt-1">{t.skills?.length ? t.skills.join(', ') : 'No skills listed'}</div>
                    <div className="text-xs text-slate-500 mt-2">${t.hourlyRate}/hr • {t.phone}</div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <form action={deleteAction} className="flex">
                      <input type="hidden" name="id" value={t.id} />
                      <input type="hidden" name="tenantId" value={t.tenantId} />
                      <button type="submit" className="px-3 py-1.5 text-sm bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition border border-red-500/30">Remove</button>
                    </form>
                  </div>
                </div>

                <details className="mt-4 group">
                  <summary className="text-sm text-emerald-400 cursor-pointer hover:text-emerald-300 font-medium transition">✎ Edit</summary>
                  <form action={updateAction} className="mt-4 pt-4 border-t border-slate-700 space-y-3">
                    <input type="hidden" name="id" value={t.id} />
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                      <input name="name" defaultValue={t.name} className="w-full px-3 py-2 rounded bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Skills</label>
                      <input name="skills" defaultValue={(t.skills || []).join(', ')} className="w-full px-3 py-2 rounded bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Hourly Rate</label>
                      <input name="hourlyRate" type="number" defaultValue={t.hourlyRate} className="w-full px-3 py-2 rounded bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500 transition" />
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
