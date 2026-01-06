import { getDb } from '@/lib/demo/persistence';
import { updateSchedulingRules } from '../actions';

export default async function SettingsPage() {
  const db = await getDb();
  const rules = db.schedulingRules[0] || {
        id: 'default',
        tenantId: 't1',
        minimumLeadTimeMinutes: 180,
        minimumGapMinutes: 120,
        defaultDurationMinutes: 60
  };

  return (
    <div className="space-y-8">
       <div>
         <h2 className="text-2xl font-bold text-white">Global Settings</h2>
         <p className="text-slate-400">Configure scheduling rules and platform defaults.</p>
       </div>

       <div className="bg-slate-800 p-6 rounded border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-4">Scheduling Rules</h3>
           <form action={async (formData) => {
               'use server';
               const lead = parseInt(formData.get('minimumLeadTimeMinutes') as string);
               const gap = parseInt(formData.get('minimumGapMinutes') as string);
               const duration = parseInt(formData.get('defaultDurationMinutes') as string);
               
               await updateSchedulingRules({
                   ...rules,
                   minimumLeadTimeMinutes: lead,
                   minimumGapMinutes: gap,
                   defaultDurationMinutes: duration
               });
           }} className="space-y-4">
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div>
                       <label className="block text-xs text-slate-400 mb-1">Min Lead Time (Minutes)</label>
                       <input name="minimumLeadTimeMinutes" type="number" defaultValue={rules.minimumLeadTimeMinutes} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" />
                   </div>
                   <div>
                       <label className="block text-xs text-slate-400 mb-1">Min Gap (Minutes)</label>
                       <input name="minimumGapMinutes" type="number" defaultValue={rules.minimumGapMinutes} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" />
                   </div>
                   <div>
                       <label className="block text-xs text-slate-400 mb-1">Default Duration (Minutes)</label>
                       <input name="defaultDurationMinutes" type="number" defaultValue={rules.defaultDurationMinutes} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" />
                   </div>
               </div>

               <div className="pt-4">
                   <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-medium">
                       Save Changes
                   </button>
               </div>
           </form>
       </div>
    </div>
  );
}
