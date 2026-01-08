import Link from 'next/link';

export default function AdminTemplates() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Work Order Templates</h2>
      <p className="text-sm text-muted-foreground mb-6">Create and manage work order templates.</p>
      <Link href="/admin" className="text-sm text-primary">← Back to Admin</Link>
    </div>
  );
}
