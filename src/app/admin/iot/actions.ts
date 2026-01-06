'use server';

import { getDb, saveDb } from '@/lib/demo/persistence';
import { IoTRule } from '@/lib/domain/schema';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/security/audit';
import { getUser } from '@/lib/auth';
import { assertCanManageIoTRules } from '@/lib/security/rbac';
import { processDeviceEvent, DeviceEvent } from '@/lib/iot/executor';

export async function getIoTRules() {
  const db = await getDb();
  return db.iotRules || [];
}

export async function createIoTRule(data: Omit<IoTRule, 'id'>) {
  const actor = await getUser();
  assertCanManageIoTRules(actor, data.tenantId);

  const db = await getDb();
  const newRule: IoTRule = { ...data, id: `r-${Date.now()}` } as IoTRule;
  db.iotRules = db.iotRules || [];
  db.iotRules.push(newRule);
  await saveDb(db);

  await logAuditEvent({ tenantId: newRule.tenantId, actorId: actor?.id || 'system', actorName: actor?.name || 'system', action: 'IOTRULE_CREATE', entityType: 'IoTRule', entityId: newRule.id, details: `Created IoT rule ${newRule.id}` });

  revalidatePath('/admin/iot');
  return { success: true, rule: newRule };
}

export async function simulateDeviceEvent(data: DeviceEvent) {
  const actor = await getUser();
  assertCanManageIoTRules(actor, data.tenantId);

  const res = await processDeviceEvent(data);
  return { success: true, triggers: res };
}
