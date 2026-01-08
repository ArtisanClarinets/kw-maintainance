import { getUser } from '@/lib/auth';
import { getDb, saveDb } from '@/lib/demo/persistence';
import { assertCanManageVendors } from '@/lib/security/rbac';
import type { Vendor } from '@/lib/domain/schema';

export type CreateVendorInput = {
  tenantId: string;
  name: string;
  type: 'Service' | 'Supply' | 'Software';
  status: 'Active' | 'Probation' | 'Non-Compliant';
  complianceScore: number;
  lastAuditDate?: string;
};

export async function createVendor(input: CreateVendorInput) {
  const user = await getUser();
  assertCanManageVendors(user, input.tenantId);

  const db = await getDb();
  const id = `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

  const vendor: Vendor = {
    id,
    tenantId: input.tenantId,
    name: input.name,
    type: input.type,
    status: input.status,
    complianceScore: input.complianceScore,
    lastAuditDate: input.lastAuditDate,
  };

  db.vendors = db.vendors || [];
  db.vendors.push(vendor);
  await saveDb(db);

  return { success: true, vendor };
}

export async function updateVendor(id: string, updates: Partial<CreateVendorInput>) {
  const user = await getUser();
  assertCanManageVendors(user, updates.tenantId ?? '');
  const db = await getDb();
  db.vendors = db.vendors || [];
  const idx = db.vendors.findIndex(v => v.id === id);
  if (idx === -1) throw new Error('Vendor not found');
  const updated = { ...db.vendors[idx], ...updates } as Vendor;
  db.vendors[idx] = updated;
  await saveDb(db);
  return { success: true, vendor: updated };
}

export async function deleteVendor(id: string, tenantId: string) {
  const user = await getUser();
  assertCanManageVendors(user, tenantId);
  const db = await getDb();
  db.vendors = (db.vendors || []).filter(v => v.id !== id);
  await saveDb(db);
  return { success: true };
}
