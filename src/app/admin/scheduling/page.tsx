import { getDb } from '@/lib/demo/persistence';
import { createAppointment } from '../actions';

export default async function SchedulingPage() {
  const db = await getDb();
  // Ensure we have at least one rule set
  const rules = db.schedulingRules[0] || {
        id: 'default',
        tenantId: 't1',
        minimumLeadTimeMinutes: 180,
        minimumGapMinutes: 120,
        defaultDurationMinutes: 60
  };
  
  const appointments = db.appointments.sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

  return (
    <div className="space-y-8">
       <div>
         <h2 className="text-2xl font-bold text-white">Scheduling & Calendar</h2>
         <p className="text-slate-400">Manage appointments and validation rules.</p>
       </div>

       {/* Current Rules Summary */}
       <div className="bg-slate-800 p-4 rounded border border-slate-700">
          <h3 className="text-emerald-400 font-bold mb-2">Active Rules</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
             <div>
                <span className="text-slate-500">Min Lead Time:</span> <span className="text-white">{rules.minimumLeadTimeMinutes} min</span>
             </div>
             <div>
                <span className="text-slate-500">Min Gap:</span> <span className="text-white">{rules.minimumGapMinutes} min</span>
             </div>
             <div>
                <span className="text-slate-500">Default Duration:</span> <span className="text-white">{rules.defaultDurationMinutes} min</span>
             </div>
          </div>
       </div>

       {/* Create Appointment Form */}
       <div className="bg-slate-800 p-6 rounded border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-4">Book Appointment</h3>
           <form action={async (formData) => {
             'use server';
             await createAppointment(formData);
           }} className="space-y-4">
               <div>
                   <label className="block text-xs text-slate-400 mb-1">Title</label>
                   <input name="title" type="text" required className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                   <div>
                       <label className="block text-xs text-slate-400 mb-1">Start Time (Local)</label>
                       <input name="startAt" type="datetime-local" required className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" />
                   </div>
                   <div>
                       <label className="block text-xs text-slate-400 mb-1">End Time (Optional)</label>
                       <input name="endAt" type="datetime-local" className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" />
                   </div>
               </div>
               <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded font-medium">
                   Schedule
               </button>
           </form>
       </div>

       {/* Appointment List */}
       <div className="space-y-2">
           <h3 className="text-lg font-bold text-white">Upcoming Appointments</h3>
           {appointments.length === 0 && <p className="text-slate-500">No appointments scheduled.</p>}
           {appointments.map(appt => (
               <div key={appt.id} className="bg-slate-800 p-4 rounded border border-slate-700 flex justify-between items-center">
                   <div>
                       <div className="font-bold text-white">{appt.title}</div>
                       <div className="text-xs text-slate-400">
                           {new Date(appt.startAt).toLocaleString()} - {new Date(appt.endAt).toLocaleTimeString()}
                       </div>
                   </div>
                   <div className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300 uppercase">
                       {appt.status}
                   </div>
               </div>
           ))}
       </div>
    </div>
  );
}
