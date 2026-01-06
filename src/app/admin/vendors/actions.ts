'use server';

import { getDb, saveDb } from '@/lib/demo/persistence';
import { Vendor } from '@/lib/domain/schema';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/security/audit';
import { getUser } from '@/lib/auth';
import { assertCanManageVendors } from '@/lib/security/rbac';

export async function getVendors(query?: string) {
  const db = await getDb();
  let vendors = db.vendors || [];

  if (query) {
    const q = query.toLowerCase();
    vendors = vendors.filter(v => 
      v.name.toLowerCase().includes(q) || 
      v.type.toLowerCase().includes(q)
    );
  }

  return vendors;
}

export async function createVendor(data: Omit<Vendor, 'id'>) {
  const actor = await getUser();
  assertCanManageVendors(actor, data.tenantId);

  const db = await getDb();
  const newVendor: Vendor = {
    ...data,
    id: `v-${Date.now()}`
  } as Vendor;
  db.vendors.push(newVendor);
  await saveDb(db);

  await logAuditEvent({ tenantId: newVendor.tenantId, actorId: actor?.id || 'system', actorName: actor?.name || 'system', action: 'VENDOR_CREATE', entityType: 'Vendor', entityId: newVendor.id, details: `Created vendor ${newVendor.name}` });

  revalidatePath('/admin/vendors');
  return { success: true, vendor: newVendor };
}
