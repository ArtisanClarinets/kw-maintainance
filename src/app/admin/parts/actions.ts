import { getUser } from '@/lib/auth';
import { getDb, saveDb } from '@/lib/demo/persistence';
import { assertCanManageParts } from '@/lib/security/rbac';
import type { Part } from '@/lib/domain/schema';

export type CreatePartInput = {
  tenantId: string;
  name: string;
  sku: string;
  category: string;
  cost: number;
  minStockLevel: number;
};

export async function createPart(input: CreatePartInput) {
  const user = await getUser();
  assertCanManageParts(user, input.tenantId);

  const db = await getDb();
  const id = `part-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

  const part: Part = {
    id,
    tenantId: input.tenantId,
    name: input.name,
    sku: input.sku,
    category: input.category,
    cost: input.cost,
    minStockLevel: input.minStockLevel,
  };

  db.parts = db.parts || [];
  db.parts.push(part);
  await saveDb(db);

  return { success: true, part };
}
