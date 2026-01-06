import { getDb, saveDb } from '@/lib/demo/persistence';

export async function logAuditEvent({ tenantId, actorId, actorName, action, entityType, entityId, details }: {
  tenantId: string;
  actorId: string;
  actorName: string;
  action: string;
  entityType: string;
  entityId: string;
  details?: string;
}) {
  const db = await getDb();
  const log = {
    id: `log-${Date.now()}`,
    tenantId,
    actorId,
    actorName,
    action,
    entityType,
    entityId,
    details: details || undefined,
    timestamp: new Date().toISOString(),
  };
  db.auditLogs.unshift(log);
  await saveDb(db);
  return log;
}
