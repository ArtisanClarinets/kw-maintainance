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
