'use server';

import { getDb, saveDb } from '@/lib/demo/persistence';
import { PurchaseOrder } from '@/lib/domain/schema';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/security/audit';
import { getUser } from '@/lib/auth';
import { assertCanManagePurchaseOrders } from '@/lib/security/rbac';

export async function getPurchaseOrders() {
  const db = await getDb();
  return db.purchaseOrders || [];
}

export async function createPurchaseOrder(data: Omit<PurchaseOrder, 'id' | 'createdAt'>) {
  const actor = await getUser();
  assertCanManagePurchaseOrders(actor, data.tenantId);

  const db = await getDb();
  const now = new Date().toISOString();
  const newPO: PurchaseOrder = {
    ...data,
    id: `po-${Date.now()}`,
    createdAt: now,
    updatedAt: now
  } as PurchaseOrder;
  db.purchaseOrders.push(newPO);
  await saveDb(db);

  await logAuditEvent({ tenantId: newPO.tenantId, actorId: actor?.id || 'system', actorName: actor?.name || 'system', action: 'PO_CREATE', entityType: 'PurchaseOrder', entityId: newPO.id, details: `Created PO for vendor ${newPO.vendorId}` });

  revalidatePath('/admin/purchase-orders');
  return { success: true, purchaseOrder: newPO };
}
