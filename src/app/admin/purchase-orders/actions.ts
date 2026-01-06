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
  const total = data.lines.reduce((acc, l) => acc + (l.quantity * l.unitCost), 0);
  
  const newPO: PurchaseOrder = {
    ...data,
    id: `po-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
    total,
    requestedById: actor?.id,
    requestedAt: now
  } as PurchaseOrder;
  db.purchaseOrders.push(newPO);
  await saveDb(db);

  await logAuditEvent({ tenantId: newPO.tenantId, actorId: actor?.id || 'system', actorName: actor?.name || 'system', action: 'PO_CREATE', entityType: 'PurchaseOrder', entityId: newPO.id, details: `Created PO for vendor ${newPO.vendorId} total ${total}` });

  revalidatePath('/admin/purchase-orders');
  return { success: true, purchaseOrder: newPO };
}

export async function updatePurchaseOrderStatus(id: string, status: PurchaseOrder['status'], notes?: string) {
  const actor = await getUser();
  const db = await getDb();
  const po = db.purchaseOrders.find(p => p.id === id);
  if (!po) throw new Error("PO not found");
  
  assertCanManagePurchaseOrders(actor, po.tenantId);

  po.status = status;
  po.updatedAt = new Date().toISOString();
  
  if (status === 'Approved') {
    po.approvedById = actor?.id;
    po.approvedAt = po.updatedAt;
    po.approvalNotes = notes;
  }
  
  if (status === 'Received') {
    po.receivedAt = po.updatedAt;
    // Task 4: Adjust Stock
    await adjustStockForPO(db, po);
  }

  await saveDb(db);
  await logAuditEvent({ tenantId: po.tenantId, actorId: actor?.id || 'system', actorName: actor?.name || 'system', action: 'PO_STATUS_CHANGE', entityType: 'PurchaseOrder', entityId: po.id, details: `Status changed to ${status}` });

  revalidatePath('/admin/purchase-orders');
  return { success: true };
}

async function adjustStockForPO(db: any, po: PurchaseOrder) {
  // Simple in-memory adjustment for demo
  for (const line of po.lines) {
    let stock = db.stockLevels.find((s: any) => s.partId === line.partId);
    if (!stock) {
      stock = { id: `s-${Date.now()}-${Math.random()}`, partId: line.partId, warehouseId: 'w1', quantity: 0, updatedAt: new Date().toISOString(), tenantId: po.tenantId };
      db.stockLevels.push(stock);
    }
    stock.quantity += line.quantity;
    stock.updatedAt = new Date().toISOString();
  }
}
