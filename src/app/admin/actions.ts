'use server';

import { getDb, saveDb, resetDb } from '@/lib/demo/persistence';
import { AppointmentSchema, SchedulingRules } from '@/lib/domain/schema';
import { validateAppointment } from '@/lib/domain/scheduling';
import { revalidatePath } from 'next/cache';

// Helper for ID
function generateId() {
    return Math.random().toString(36).substring(2, 15);
}

export async function updateSchedulingRules(data: SchedulingRules) {
    const db = await getDb();
    const index = db.schedulingRules.findIndex(r => r.id === data.id);
    if (index >= 0) {
        db.schedulingRules[index] = data;
    } else {
        db.schedulingRules.push(data);
    }
    await saveDb(db);
    revalidatePath('/admin');
    return { success: true };
}

export async function createAppointment(formData: FormData) {
    const db = await getDb();
    // specific rule or default
    const rules = db.schedulingRules[0] || {
        id: 'default',
        tenantId: 't1',
        minimumLeadTimeMinutes: 180,
        minimumGapMinutes: 120,
        defaultDurationMinutes: 60
    };

    const startAt = formData.get('startAt') as string;
    // If endAt is not provided, calculate it
    let endAt = formData.get('endAt') as string;
    if (!endAt) {
        const startDate = new Date(startAt);
        const endDate = new Date(startDate.getTime() + rules.defaultDurationMinutes * 60000);
        endAt = endDate.toISOString();
    }
    
    const title = formData.get('title') as string;

    // Validation
    const validation = validateAppointment(
        { startAt, endAt }, 
        rules, 
        db.appointments
    );

    if (!validation.valid) {
        return { success: false, error: validation.error };
    }

    const newAppt = {
        id: generateId(),
        tenantId: 't1', // Hardcoded for demo
        propertyId: 'p1',
        title,
        startAt,
        endAt,
        status: 'scheduled' as const
    };

    const parsed = AppointmentSchema.safeParse(newAppt);
    if (!parsed.success) {
         return { success: false, error: "Invalid data format: " + JSON.stringify(parsed.error.format()) };
    }

    db.appointments.push(parsed.data);
    await saveDb(db);
    revalidatePath('/admin/scheduling');
    return { success: true };
}

export async function resetDemoData() {
    await resetDb();
    revalidatePath('/');
}
