'use server';

import { getDb, saveDb } from '@/lib/demo/persistence';
import { Timesheet } from '@/lib/domain/schema';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/security/audit';
import { getUser } from '@/lib/auth';
import { assertAuthenticated } from '@/lib/security/rbac';

export async function getTimesheets() {
  const db = await getDb();
  return db.timesheets || [];
}

export async function createTimesheet(data: Omit<Timesheet, 'id' | 'approved'>) {
  const actor = await getUser();
  assertAuthenticated(actor);

  const db = await getDb();
  const newTs: Timesheet = {
    ...data,
    id: `ts-${Date.now()}`,
    approved: false
  } as Timesheet;
  db.timesheets = db.timesheets || [];
  db.timesheets.push(newTs);
  await saveDb(db);

  await logAuditEvent({ tenantId: newTs.tenantId, actorId: actor?.id || 'system', actorName: actor?.name || 'system', action: 'TIMESHEET_CREATE', entityType: 'Timesheet', entityId: newTs.id, details: `Logged ${newTs.hours}h for tech ${newTs.technicianId}` });

  revalidatePath('/admin/timesheets');
  return { success: true };
}

export async function approveTimesheet(id: string) {
  const actor = await getUser();
  // Role check needed maybe? security_admin or supervisor
  const db = await getDb();
  const ts = db.timesheets.find(t => t.id === id);
  if (!ts) throw new Error("Timesheet not found");

  ts.approved = true;
  await saveDb(db);
  await logAuditEvent({ tenantId: ts.tenantId, actorId: actor?.id || 'system', actorName: actor?.name || 'system', action: 'TIMESHEET_APPROVE', entityType: 'Timesheet', entityId: ts.id });

  revalidatePath('/admin/timesheets');
  return { success: true };
}
