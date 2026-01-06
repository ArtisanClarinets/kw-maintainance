'use server';

import { getDb, saveDb } from '@/lib/demo/persistence';
import { Technician } from '@/lib/domain/schema';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/security/audit';
import { getUser } from '@/lib/auth';
import { assertCanManageTechnicians } from '@/lib/security/rbac';

export async function getTechnicians() {
  const db = await getDb();
  return db.technicians;
}

export async function createTechnician(data: Omit<Technician, 'id'> & { actorId?: string, actorName?: string }) {
  const actor = await getUser();
  // RBAC & tenant scope
  assertCanManageTechnicians(actor, data.tenantId);

  const db = await getDb();
  const newTech: Technician = {
    ...data,
    id: `tech-${Date.now()}`
  } as Technician;
  db.technicians.push(newTech);
  await saveDb(db);

  await logAuditEvent({ tenantId: newTech.tenantId, actorId: actor?.id || 'system', actorName: actor?.name || 'system', action: 'TECHNICIAN_CREATE', entityType: 'Technician', entityId: newTech.id, details: `Created technician ${newTech.name}` });

  revalidatePath('/admin/technicians');
  revalidatePath('/admin');
  return { success: true, technician: newTech };
} 
