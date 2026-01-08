import { getDb } from '@/lib/demo/persistence';
import { createWorkOrderTemplate, updateWorkOrderTemplate, deleteWorkOrderTemplate } from '@/app/admin/work-order-templates/actions';
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
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Work Order Templates</h2>
        <p className="text-slate-400">Create standardized templates for common job types.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 backdrop-blur">
          <h3 className="font-bold text-lg text-white mb-6">Add Template</h3>
          <form action={createAction} className="space-y-4">
            <input type="hidden" name="tenantId" value="t1" />
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Title *</label>
              <input name="title" required className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition" placeholder="Standard Inspection" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select name="category" className="w-full px-4 py-2.5 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:border-emerald-500 transition">
                <option value="General">General</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="HVAC">HVAC</option>
                <option value="Appliance">Appliance</option>
                <option value="Predictive">Predictive Maintenance</option>
                <option value="Preventative">Preventative Maintenance</option>
              </select>
            </div>
            <div className="pt-4">
              <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition transform hover:scale-105">Create Template</button>
            </div>
          </form>
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-8 backdrop-blur">
          <h3 className="font-bold text-lg text-white mb-6">Existing Templates ({templates.length})</h3>
          <div className="space-y-4">
            {templates.map((t: WorkOrderTemplate) => (
              <div key={t.id} className="p-4 bg-slate-700/20 border border-slate-700 rounded-lg hover:bg-slate-700/40 transition">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-white">{t.title}</div>
                    <div className="text-sm text-slate-400 mt-1">{t.category}</div>
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
                  <summary className="text-sm text-purple-400 cursor-pointer hover:text-purple-300 font-medium transition">✏️ Edit</summary>
                  <form action={async (fd: FormData) => { 'use server'; await updateWorkOrderTemplate(t.id, {
                    tenantId: t.tenantId,
                    title: String(fd.get('title') ?? t.title),
                    category: (String(fd.get('category') ?? t.category) as 'Plumbing' | 'Electrical' | 'HVAC' | 'Appliance' | 'General' | 'Predictive' | 'Preventative'),
                  }); return redirect('/admin/work-order-templates'); }} className="mt-4 pt-4 border-t border-slate-700 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                      <input name="title" defaultValue={t.title} className="w-full px-3 py-2 rounded bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                      <select name="category" defaultValue={t.category} className="w-full px-3 py-2 rounded bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-emerald-500 transition">
                        <option value="General">General</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrical">Electrical</option>
                        <option value="HVAC">HVAC</option>
                        <option value="Appliance">Appliance</option>
                        <option value="Predictive">Predictive</option>
                        <option value="Preventative">Preventative</option>
                      </select>
                    </div>
                    <div className="pt-2">
                      <button type="submit" className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium text-sm transition">Save Changes</button>
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
