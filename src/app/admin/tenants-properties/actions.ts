'use server';

import { getDb, saveDb } from '@/lib/demo/persistence';
import { Tenant, Property } from '@/lib/domain/schema';
import { revalidatePath } from 'next/cache';

export async function getTenantsAndProperties() {
  const db = await getDb();
  return {
    tenants: db.tenants,
    properties: db.properties
  };
}

export async function createTenant(name: string, slug: string) {
  const db = await getDb();
  const newTenant: Tenant = {
    id: `t-${Date.now()}`,
    name,
    slug
  };
  db.tenants.push(newTenant);
  await saveDb(db);
  revalidatePath('/admin/tenants-properties');
  return { success: true, tenant: newTenant };
}

export async function createProperty(tenantId: string, name: string, address: string) {
  const db = await getDb();
  const newProperty: Property = {
    id: `p-${Date.now()}`,
    tenantId,
    name,
    address,
    timezone: 'UTC'
  };
  db.properties.push(newProperty);
  await saveDb(db);
  revalidatePath('/admin/tenants-properties');
  return { success: true, property: newProperty };
}
