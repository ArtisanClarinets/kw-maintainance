'use server';

import { getDb } from '@/lib/demo/persistence';
import { getUser } from '@/lib/auth';
import { ForbiddenError, UnauthorizedError } from '@/lib/security/errors';

export async function getWarehouses() {
    const user = await getUser();
    if (!user) throw new UnauthorizedError();
    
    // RBAC: Technicians can't manage supply chain config
    if (user.role === 'tech') throw new ForbiddenError();

    const data = await getDb();
    return data.warehouses || [];
}

export async function getParts(query?: string, category?: string) {
    const user = await getUser();
    if (!user) throw new UnauthorizedError();
    
    const data = await getDb();
    let parts = data.parts || [];

    if (query) {
        const q = query.toLowerCase();
        parts = parts.filter(p => 
            p.name.toLowerCase().includes(q) || 
            p.sku.toLowerCase().includes(q)
        );
    }

    if (category && category !== 'all') {
        parts = parts.filter(p => p.category === category);
    }

    return parts;
}
