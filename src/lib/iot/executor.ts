import { getDb, saveDb } from '@/lib/demo/persistence';
import { IoTRule, WorkOrder, WorkOrderPriorityEnum } from '@/lib/domain/schema';
import { logAuditEvent } from '@/lib/security/audit';

export type DeviceEvent = {
  tenantId: string;
  deviceId: string;
  metric: string;
  value: number;
  timestamp?: string;
};

function evaluateOperator(val: number, operator: IoTRule['operator'], threshold: number): boolean {
  switch (operator) {
    case '>':
      return val > threshold;
    case '<':
      return val < threshold;
    case '>=':
      return val >= threshold;
    case '<=':
      return val <= threshold;
    case '===':
      return val === threshold;
    case '!==':
      return val !== threshold;
    default:
      return false;
  }
}

function mapSeverityToPriority(sev: IoTRule['severity']): WorkOrder['priority'] {
  switch (sev) {
    case 'Low':
      return 'Low';
    case 'Medium':
      return 'Medium';
    case 'High':
      return 'High';
    case 'Critical':
      return 'Critical';
    default:
      return 'High';
  }
}

export async function processDeviceEvent(evt: DeviceEvent) {
  const db = await getDb();
  const now = new Date().toISOString();
  const matching = (db.iotRules || []).filter(r => r.active && r.tenantId === evt.tenantId && r.deviceId === evt.deviceId && r.metric === evt.metric);
  const results: Array<{ ruleId: string; workOrderId?: string }> = [];

  for (const rule of matching) {
    if (!evaluateOperator(evt.value, rule.operator as any, rule.threshold)) continue;

    // Action handling
    if (rule.action === 'create_work_order') {
      // Determine property via asset or fallback to first tenant property
      const asset = rule.assetId ? (db.assets || []).find(a => a.id === rule.assetId) : undefined;
      const prop = asset?.propertyId ?? (db.properties || []).find(p => p.tenantId === evt.tenantId)?.id;

      const wo: WorkOrder = {
        id: `wo-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        tenantId: evt.tenantId,
        propertyId: prop || '',
        assetId: rule.assetId,
        title: `IoT Alert: ${rule.metric} ${rule.operator} ${rule.threshold} on ${evt.deviceId}`,
        description: `Triggered by device ${evt.deviceId} metric ${evt.metric} value ${evt.value} at ${evt.timestamp || now}`,
        priority: mapSeverityToPriority(rule.severity),
        status: 'Draft',
        category: 'Predictive',
        assignedUserId: undefined,
        createdAt: now,
        updatedAt: now,
        tasks: [],
        linkedWorkOrderIds: [],
        isDuplicate: false,
        qcRequired: false,
      } as WorkOrder;

      db.workOrders = db.workOrders || [];
      db.workOrders.push(wo);
      await saveDb(db);

      await logAuditEvent({ tenantId: evt.tenantId, actorId: 'system', actorName: 'iot-engine', action: 'IOT_TRIGGER', entityType: 'IoTRule', entityId: rule.id, details: `Created WO ${wo.id} from rule ${rule.id} for device ${evt.deviceId}` });

      results.push({ ruleId: rule.id, workOrderId: wo.id });
    } else {
      await logAuditEvent({ tenantId: evt.tenantId, actorId: 'system', actorName: 'iot-engine', action: 'IOT_TRIGGER', entityType: 'IoTRule', entityId: rule.id, details: `Action ${rule.action} triggered for device ${evt.deviceId} value ${evt.value}` });
      results.push({ ruleId: rule.id });
    }
  }

  return results;
}
