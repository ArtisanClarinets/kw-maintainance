'use server';

import { getDb, saveDb } from '@/lib/demo/persistence';
import { AuditLog } from '@/lib/domain/schema';

export async function getAuditLogs(): Promise<AuditLog[]> {
  const db = await getDb();
  
  // Seed some logs if empty for demo purposes
  if (db.auditLogs.length === 0) {
    const newLogs: AuditLog[] = [
      {
        id: 'log-1',
        tenantId: 't1',
        actorId: 'u1',
        actorName: 'Tech User',
        action: 'WORK_ORDER_UPDATE',
        entityType: 'WorkOrder',
        entityId: 'wo-101',
        details: 'Status changed to In Progress',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
      },
      {
        id: 'log-2',
        tenantId: 't1',
        actorId: 'u3',
        actorName: 'Supervisor',
        action: 'INVENTORY_TRANSFER',
        entityType: 'StockLevel',
        entityId: 'sl-55',
        details: 'Approved transfer of 5 units',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
      },
      {
        id: 'log-3',
        tenantId: 't1',
        actorId: 'u2',
        actorName: 'Admin User',
        action: 'USER_LOGIN',
        entityType: 'User',
        entityId: 'u2',
        details: 'Successful login from 192.168.1.1',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString()
      }
    ];
    db.auditLogs = newLogs;
    await saveDb(db);
    return newLogs;
  }
  
  return db.auditLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function anonymizePII() {
    // Demo function to show "PII Retention" feature
    return { success: true, message: "PII for records older than 30 days has been hashed." };
}
