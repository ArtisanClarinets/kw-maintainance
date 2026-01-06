'use server';

import { getDb, saveDb } from '@/lib/demo/persistence';
import { Tenant, Property } from '@/lib/domain/schema';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/security/audit';
import { getUser } from '@/lib/auth';

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

  const actor = await getUser();
  await logAuditEvent({ tenantId: newTenant.id, actorId: actor?.id || 'system', actorName: actor?.name || 'system', action: 'TENANT_CREATE', entityType: 'Tenant', entityId: newTenant.id, details: `Created tenant ${newTenant.name}` });

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

  const actor = await getUser();
  await logAuditEvent({ tenantId, actorId: actor?.id || 'system', actorName: actor?.name || 'system', action: 'PROPERTY_CREATE', entityType: 'Property', entityId: newProperty.id, details: `Created property ${newProperty.name}` });

  revalidatePath('/admin/tenants-properties');
  return { success: true, property: newProperty };
}
