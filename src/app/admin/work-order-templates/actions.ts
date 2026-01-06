'use server';

import { getDb, saveDb } from '@/lib/demo/persistence';
import { WorkOrderTemplate } from '@/lib/domain/schema';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/security/audit';
import { getUser } from '@/lib/auth';
import { assertCanManageTemplates } from '@/lib/security/rbac';

export async function getWorkOrderTemplates() {
  const db = await getDb();
  return db.workOrderTemplates || [];
}

export async function createWorkOrderTemplate(data: Omit<WorkOrderTemplate, 'id'>) {
  const actor = await getUser();
  // RBAC & tenant scope
  assertCanManageTemplates(actor, data.tenantId);

  const db = await getDb();
  const newTemplate: WorkOrderTemplate = {
    ...data,
    id: `wot-${Date.now()}`
  } as WorkOrderTemplate;
  db.workOrderTemplates = db.workOrderTemplates || [];
  db.workOrderTemplates.push(newTemplate);
  await saveDb(db);

  await logAuditEvent({ tenantId: newTemplate.tenantId, actorId: actor?.id || 'system', actorName: actor?.name || 'system', action: 'TEMPLATE_CREATE', entityType: 'WorkOrderTemplate', entityId: newTemplate.id, details: `Created template ${newTemplate.title}` });

  revalidatePath('/admin/work-order-templates');
  return { success: true, template: newTemplate };
} 
