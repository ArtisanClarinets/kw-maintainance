'use server';

import { getDb, saveDb } from '@/lib/demo/persistence';
import { logAuditEvent } from '@/lib/security/audit';
import { getUser } from '@/lib/auth';
import { assertHasRole } from '@/lib/security/rbac';

export async function getAuditLogs() {
  const db = await getDb();
  return db.auditLogs || [];
}

export async function clearOldAuditLogs(days: number) {
  const actor = await getUser();
  assertHasRole(actor, 'security_admin');

  const db = await getDb();
  const threshold = new Date();
  threshold.setDate(threshold.getDate() - days);

  const initialCount = db.auditLogs.length;
  db.auditLogs = db.auditLogs.filter(log => new Date(log.timestamp) > threshold);
  
  await saveDb(db);
  await logAuditEvent({ 
    tenantId: actor?.tenantId || 'global', 
    actorId: actor?.id || 'system', 
    actorName: actor?.name || 'system', 
    action: 'AUDIT_CLEANUP', 
    entityType: 'AuditLog', 
    entityId: 'all', 
    details: `Cleaned up ${initialCount - db.auditLogs.length} logs older than ${days} days` 
  });

  return { deleted: initialCount - db.auditLogs.length };
}

export async function exportAuditLogs() {
  const db = await getDb();
  return db.auditLogs;
}
