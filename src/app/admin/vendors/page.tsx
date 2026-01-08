import Link from 'next/link';

export default function AdminVendors() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Vendors</h2>
      <p className="text-sm text-muted-foreground mb-6">Manage vendor records and compliance.</p>
      <Link href="/admin" className="text-sm text-primary">← Back to Admin</Link>
    </div>
  );
}
