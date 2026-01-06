'use server';

import { getDb, saveDb } from '@/lib/demo/persistence';
import { User } from '@/lib/domain/schema';
import { revalidatePath } from 'next/cache';

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
  revalidatePath('/admin/users-roles');
  return { success: true, user: newUser };
}
