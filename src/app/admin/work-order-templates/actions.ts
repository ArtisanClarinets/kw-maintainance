import { getUser } from '@/lib/auth';
import { getDb, saveDb } from '@/lib/demo/persistence';
import { assertCanManageTemplates } from '@/lib/security/rbac';
import type { WorkOrderTemplate } from '@/lib/domain/schema';

export type CreateWorkOrderTemplateInput = {
  tenantId: string;
  title: string;
  category: WorkOrderTemplate['category'];
  defaultSLA?: string;
  tasks?: Array<{ id: string; description: string; completed?: boolean; required?: boolean }>;
};

export async function createWorkOrderTemplate(input: CreateWorkOrderTemplateInput) {
  const user = await getUser();
  assertCanManageTemplates(user, input.tenantId);

  const db = await getDb();

  const id = `wot-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

  const tmpl: WorkOrderTemplate = {
    id,
    tenantId: input.tenantId,
    title: input.title,
    category: input.category,
    defaultSLA: input.defaultSLA,
    tasks: (input.tasks ?? []).map(t => ({ id: t.id, description: t.description, completed: !!t.completed, required: typeof t.required === 'boolean' ? t.required : true })),
    requiredCertifications: [],
    defaultParts: [],
    createdAt: new Date().toISOString(),
  };

  db.workOrderTemplates = db.workOrderTemplates || [];
  db.workOrderTemplates.push(tmpl);
  await saveDb(db);

  return { success: true, template: tmpl };
}

export async function updateWorkOrderTemplate(id: string, updates: Partial<CreateWorkOrderTemplateInput>) {
  const user = await getUser();
  assertCanManageTemplates(user, updates.tenantId ?? '');
  const db = await getDb();
  db.workOrderTemplates = db.workOrderTemplates || [];
  const idx = db.workOrderTemplates.findIndex(w => w.id === id);
  if (idx === -1) throw new Error('Template not found');
  const updated = { ...db.workOrderTemplates[idx], ...updates } as WorkOrderTemplate;
  db.workOrderTemplates[idx] = updated;
  await saveDb(db);
  return { success: true, template: updated };
}

export async function deleteWorkOrderTemplate(id: string, tenantId: string) {
  const user = await getUser();
  assertCanManageTemplates(user, tenantId);
  const db = await getDb();
  db.workOrderTemplates = (db.workOrderTemplates || []).filter(w => w.id !== id);
  await saveDb(db);
  return { success: true };
}
