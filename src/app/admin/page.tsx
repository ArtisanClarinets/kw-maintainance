export default function AdminIndex() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-xl border border-border/40">
          <h3 className="text-sm uppercase text-muted-foreground">Overview</h3>
          <p className="text-2xl font-bold mt-2">Admin Dashboard</p>
          <p className="text-sm text-muted-foreground mt-2">Manage technicians, templates, vendors, parts, and purchase orders.</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border/40">
          <h3 className="text-sm uppercase text-muted-foreground">System</h3>
          <p className="text-2xl font-bold mt-2">Demo Mode</p>
          <p className="text-sm text-muted-foreground mt-2">This is the admin console for demo and local operations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-card p-6 rounded-xl border border-border/40">Links and quick actions placeholder</div>
        <div className="bg-card p-6 rounded-xl border border-border/40">Recent administrative activity</div>
        <div className="bg-card p-6 rounded-xl border border-border/40">Health & metrics</div>
      </div>
    </div>
  );
}
