import { getUser } from '@/lib/auth';
import { getDb, saveDb } from '@/lib/demo/persistence';
import { assertCanManageTechnicians } from '@/lib/security/rbac';
import type { Technician } from '@/lib/domain/schema';

export type CreateTechnicianInput = {
  tenantId: string;
  name: string;
  skills?: string[];
  certifications?: Array<string | { id: string; tenantId?: string; name?: string; authority?: string; issuedAt?: string; expiresAt?: string }>;
  hourlyRate?: number;
  active?: boolean;
  vehicle?: string; // Kept for compatibility, maps to vehicleId
  phone?: string;
  userId?: string;
};

export async function createTechnician(input: CreateTechnicianInput) {
  const user = await getUser();
  assertCanManageTechnicians(user, input.tenantId);

  const db = await getDb();

  const id = `tech-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

  const certifications = (input.certifications ?? []).map(c =>
    typeof c === 'string'
      ? { id: c, tenantId: input.tenantId, name: c }
      : { id: c.id, tenantId: c.tenantId ?? input.tenantId, name: c.name ?? c.id, authority: c.authority, issuedAt: c.issuedAt, expiresAt: c.expiresAt }
  );

  const tech: Technician = {
    id,
    tenantId: input.tenantId,
    userId: input.userId,
    name: input.name,
    skills: input.skills ?? [],
    qualificationTags: [], // Default empty
    certifications,
    hourlyRate: input.hourlyRate,
    active: typeof input.active === 'boolean' ? input.active : true,
    vehicleId: input.vehicle, // Map to vehicleId
    phone: input.phone,
  };

  db.technicians = db.technicians || [];
  db.technicians.push(tech);
  await saveDb(db);

  return { success: true, technician: tech };
}

export async function updateTechnician(id: string, updates: Partial<CreateTechnicianInput>) {
  const user = await getUser();
  assertCanManageTechnicians(user, updates.tenantId ?? '');
  const db = await getDb();
  db.technicians = db.technicians || [];
  const idx = db.technicians.findIndex(t => t.id === id);
  if (idx === -1) throw new Error('Technician not found');
  const existing = db.technicians[idx];

  // Map updates to schema
  const { vehicle, certifications, ...rest } = updates;

  const mappedCerts = certifications
    ? certifications.map(c =>
        typeof c === 'string'
          ? { id: c, tenantId: updates.tenantId ?? existing.tenantId, name: c }
          : { id: c.id, tenantId: c.tenantId ?? updates.tenantId ?? existing.tenantId, name: c.name ?? c.id, authority: c.authority, issuedAt: c.issuedAt, expiresAt: c.expiresAt }
      )
    : undefined;

  const mappedUpdates: Partial<Technician> = {
      ...rest,
      ...(vehicle ? { vehicleId: vehicle } : {}),
      ...(mappedCerts ? { certifications: mappedCerts } : {}),
  };

  const updated = { ...existing, ...mappedUpdates } as Technician;
  db.technicians[idx] = updated;
  await saveDb(db);
  return { success: true, technician: updated };
}

export async function deleteTechnician(id: string, tenantId: string) {
  const user = await getUser();
  assertCanManageTechnicians(user, tenantId);
  const db = await getDb();
  db.technicians = (db.technicians || []).filter(t => t.id !== id);
  await saveDb(db);
  return { success: true };
}
