'use server';

import { getDb, saveDb } from '@/lib/demo/persistence';
import { Part, Warehouse, StockLevel } from '@/lib/domain/schema';
import { revalidatePath } from 'next/cache';

export async function getInventoryData() {
    const db = await getDb();
    
    // If empty, seed
    if (db.parts.length === 0) {
        await seedInventory();
    }
    
    // Return structured data
    return {
        parts: db.parts,
        warehouses: db.warehouses,
        stockLevels: db.stockLevels
    };
}

export async function seedInventory() {
    const db = await getDb();

    // Warehouses
    const warehouses: Warehouse[] = [
        { id: 'wh-main', tenantId: 't1', propertyId: 'p1', name: 'Main Central Storage', type: 'Main', location: 'Basement Level 2' },
        { id: 'wh-floor3', tenantId: 't1', propertyId: 'p1', name: 'Floor 3 Closet', type: 'Satellite', location: 'Floor 3 East' },
        { id: 'truck-1', tenantId: 't1', propertyId: 'p1', name: 'Van 101 (Mobile)', type: 'Truck', location: 'Mobile' },
    ];

    // Parts
    const parts: Part[] = [
        { id: 'p-filter-a', tenantId: 't1', name: 'HVAC Filter Type A', sku: 'FIL-200', category: 'HVAC', cost: 12.50, minStockLevel: 10 },
        { id: 'p-valve-1', tenantId: 't1', name: 'Mixing Valve 1/2"', sku: 'VLV-050', category: 'Plumbing', cost: 45.00, minStockLevel: 5 },
        { id: 'p-bulb-led', tenantId: 't1', name: 'LED Bulb 60W Eq', sku: 'LGT-060', category: 'Electrical', cost: 3.25, minStockLevel: 50 },
    ];

    // Stock Levels
    const stockLevels: StockLevel[] = [
        // Main WH
        { id: 'sl-1', warehouseId: 'wh-main', partId: 'p-filter-a', quantity: 100, updatedAt: new Date().toISOString() },
        { id: 'sl-2', warehouseId: 'wh-main', partId: 'p-valve-1', quantity: 20, updatedAt: new Date().toISOString() },
        { id: 'sl-3', warehouseId: 'wh-main', partId: 'p-bulb-led', quantity: 200, updatedAt: new Date().toISOString() },
        
        // Floor 3
        { id: 'sl-4', warehouseId: 'wh-floor3', partId: 'p-bulb-led', quantity: 15, updatedAt: new Date().toISOString() },

        // Truck
        { id: 'sl-5', warehouseId: 'truck-1', partId: 'p-filter-a', quantity: 2, updatedAt: new Date().toISOString() },
        { id: 'sl-6', warehouseId: 'truck-1', partId: 'p-valve-1', quantity: 1, updatedAt: new Date().toISOString() },
    ];

    db.warehouses = warehouses;
    db.parts = parts;
    db.stockLevels = stockLevels;

    await saveDb(db);
    revalidatePath('/app/inventory');
}

export async function transferStock(partId: string, fromWhId: string, toWhId: string, quantity: number) {
    const db = await getDb();
    
    const sourceLevel = db.stockLevels.find(sl => sl.warehouseId === fromWhId && sl.partId === partId);
    const destLevel = db.stockLevels.find(sl => sl.warehouseId === toWhId && sl.partId === partId);

    if (!sourceLevel || sourceLevel.quantity < quantity) {
        throw new Error("Insufficient stock in source warehouse");
    }

    // Decrement source
    sourceLevel.quantity -= quantity;
    sourceLevel.updatedAt = new Date().toISOString();

    // Increment dest (create if not exists)
    if (destLevel) {
        destLevel.quantity += quantity;
        destLevel.updatedAt = new Date().toISOString();
    } else {
        db.stockLevels.push({
            id: `sl-${Date.now()}`,
            warehouseId: toWhId,
            partId: partId,
            quantity: quantity,
            updatedAt: new Date().toISOString()
        });
    }

    await saveDb(db);
    revalidatePath('/app/inventory');
    return { success: true };
}
