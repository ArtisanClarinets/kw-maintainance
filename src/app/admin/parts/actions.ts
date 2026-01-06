'use server';

import { getDb, saveDb } from '@/lib/demo/persistence';
import { Part } from '@/lib/domain/schema';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/security/audit';
import { getUser } from '@/lib/auth';
import { assertCanManageParts } from '@/lib/security/rbac';

export async function getParts() {
  const db = await getDb();
  return db.parts || [];
}

export async function createPart(data: Omit<Part, 'id'>) {
  const actor = await getUser();
  assertCanManageParts(actor, data.tenantId);

  const db = await getDb();
  const newPart: Part = {
    ...data,
    id: `part-${Date.now()}`
  } as Part;
  db.parts.push(newPart);
  await saveDb(db);

  await logAuditEvent({ tenantId: newPart.tenantId, actorId: actor?.id || 'system', actorName: actor?.name || 'system', action: 'PART_CREATE', entityType: 'Part', entityId: newPart.id, details: `Created part ${newPart.name}` });

  revalidatePath('/admin/parts');
  return { success: true, part: newPart };
}
