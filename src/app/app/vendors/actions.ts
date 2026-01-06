'use server';

import { getDb } from '@/lib/demo/persistence';
import { Vendor } from '@/lib/domain/schema';

export async function getVendors(): Promise<Vendor[]> {
  const db = await getDb();
  return db.vendors;
}
