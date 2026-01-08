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
  vehicle?: string;
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
    certifications,
    hourlyRate: input.hourlyRate,
    active: typeof input.active === 'boolean' ? input.active : true,
    vehicle: input.vehicle,
    phone: input.phone,
  };

  db.technicians = db.technicians || [];
  db.technicians.push(tech);
  await saveDb(db);

  return { success: true, technician: tech };
}
