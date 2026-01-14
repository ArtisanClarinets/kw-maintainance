'use server';

import { getDb } from '@/shared/lib/demo/persistence';
import { Vendor } from '@/shared/lib/domain/schema';

export async function getVendors(): Promise<Vendor[]> {
  const db = await getDb();
  return db.vendors;
}
