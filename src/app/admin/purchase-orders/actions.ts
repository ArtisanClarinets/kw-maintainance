import { getUser } from '@/lib/auth';
import { getDb, saveDb } from '@/lib/demo/persistence';
import { assertCanManagePurchaseOrders } from '@/lib/security/rbac';
import type { PurchaseOrder } from '@/lib/domain/schema';

export type CreatePurchaseOrderInput = {
  tenantId: string;
  vendorId: string;
  propertyId?: string;
  status: 'Draft' | 'Open' | 'Approved' | 'Received' | 'Closed' | 'Cancelled';
  lines?: Array<{ partId: string; quantity: number; unitCost: number }>;
};

export async function createPurchaseOrder(input: CreatePurchaseOrderInput) {
  const user = await getUser();
  assertCanManagePurchaseOrders(user, input.tenantId);

  const db = await getDb();
  const id = `po-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

  const createdAt = new Date().toISOString();

  const po: PurchaseOrder = {
    id,
    tenantId: input.tenantId,
    vendorId: input.vendorId,
    propertyId: input.propertyId,
    status: input.status,
    lines: input.lines ?? [],
    createdAt,
    updatedAt: createdAt,
  } as PurchaseOrder;

  db.purchaseOrders = db.purchaseOrders || [];
  db.purchaseOrders.push(po);
  await saveDb(db);

  return { success: true, purchaseOrder: po };
}
