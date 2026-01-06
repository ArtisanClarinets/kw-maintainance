'use server';

import { getDb } from '@/lib/demo/persistence';
import { createWorkOrder } from '../work-orders/actions';

export async function createIoTWorkOrder(sensorId: string, readingValue: number, threshold: number) {
    const db = await getDb();
    
    // Find sensor info (simulated, we don't have a sensor table yet, just assume valid)
    const title = `IoT Alert: High Temp Detected on Sensor ${sensorId}`;
    
    // Check if open WO already exists for this sensor/alert to prevent spam
    const existing = db.workOrders.find(w => 
        w.category === 'Predictive' && 
        w.title === title && 
        w.status !== 'Financial Close'
    );

    if (existing) {
        return { success: false, message: 'Active alert already exists' };
    }

    await createWorkOrder({
        title,
        description: `Automated alert triggered by edge rule. Reading: ${readingValue}°F (Threshold: ${threshold}°F). Immediate inspection required.`,
        priority: 'High',
        category: 'Predictive',
        qcRequired: true,
        tasks: [
            { id: 't1', description: 'Verify sensor reading manually', completed: false, required: true },
            { id: 't2', description: 'Inspect asset for overheating', completed: false, required: true },
            { id: 't3', description: 'Check coolant levels', completed: false, required: true },
        ]
    });

    return { success: true, message: 'Work Order Created' };
}
