import Link from 'next/link';

export default function AdminTechnicians() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Technicians</h2>
      <p className="text-sm text-muted-foreground mb-6">Manage technicians for tenants.</p>
      <div className="grid gap-4">
        <Link href="/admin" className="text-sm text-primary">← Back to Admin</Link>
        <div className="bg-card p-4 rounded border border-border/40">No technicians yet — use the API to create one.</div>
      </div>
    </div>
  );
}
