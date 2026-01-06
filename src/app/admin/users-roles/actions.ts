'use server';

import { getDb, saveDb } from '@/lib/demo/persistence';
import { User } from '@/lib/domain/schema';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/security/audit';
import { getUser } from '@/lib/auth';

export async function getUsers() {
  const db = await getDb();
  return db.users;
}

export async function createUser(data: Omit<User, 'id'>) {
  const db = await getDb();
  const newUser: User = {
    ...data,
    id: `u-${Date.now()}`
  };
  db.users.push(newUser);
  await saveDb(db);

  // Log audit entry using session user if available
  const actor = await getUser();
  await logAuditEvent({ tenantId: newUser.tenantId, actorId: actor?.id || 'system', actorName: actor?.name || 'system', action: 'USER_CREATE', entityType: 'User', entityId: newUser.id, details: `Created user ${newUser.email}` });

  revalidatePath('/admin/users-roles');
  return { success: true, user: newUser };
}
