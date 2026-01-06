import { resetDemoData } from '../actions';

export default function DemoDataPage() {
  return (
    <div className="space-y-8">
       <div>
         <h2 className="text-2xl font-bold text-white">Demo Data Manager</h2>
         <p className="text-slate-400">Control the simulation state and fixtures.</p>
       </div>

       <div className="bg-slate-800 p-6 rounded border border-slate-700">
           <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
           <p className="text-slate-400 mb-4">Resetting demo data will wipe all appointments, work orders, and assets created during the demo session.</p>
           
           <form action={resetDemoData}>
               <button type="submit" className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-medium">
                   Reset All Data to Defaults
               </button>
           </form>
       </div>
    </div>
  );
}
