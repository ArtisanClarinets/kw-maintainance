export default function AppDashboard() {
  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
               <h3 className="text-slate-400 text-sm uppercase">Open Work Orders</h3>
               <p className="text-3xl font-bold text-white mt-2">12</p>
               <div className="text-xs text-emerald-400 mt-2">↑ 2 from yesterday</div>
           </div>
           <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
               <h3 className="text-slate-400 text-sm uppercase">Avg Resolution Time</h3>
               <p className="text-3xl font-bold text-white mt-2">4.2h</p>
               <div className="text-xs text-emerald-400 mt-2">↓ 0.5h improvement</div>
           </div>
           <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
               <h3 className="text-slate-400 text-sm uppercase">Asset Health</h3>
               <p className="text-3xl font-bold text-white mt-2">98.5%</p>
               <div className="text-xs text-slate-500 mt-2">Operational</div>
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-64 flex items-center justify-center">
               <p className="text-slate-500">Live Activity Feed (Simulation)</p>
           </div>
           <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-64 flex items-center justify-center">
               <p className="text-slate-500">Resource Allocation Map</p>
           </div>
       </div>
    </div>
  )
}
