'use server';

import { getDb, saveDb } from '@/lib/demo/persistence';
import { Asset } from '@/lib/domain/schema';
import { revalidatePath } from 'next/cache';

export async function getAssets() {
  const db = await getDb();
  return db.assets;
}

export async function getAssetTree() {
  const db = await getDb();
  const assets = db.assets;

  // Build tree
  type AssetWithChildren = Asset & { children: AssetWithChildren[] };
  const assetMap = new Map<string, AssetWithChildren>();
  
  // Initialize map
  assets.forEach(asset => {
    assetMap.set(asset.id, { ...asset, children: [] });
  });

  const rootAssets: AssetWithChildren[] = [];

  assets.forEach(asset => {
    if (asset.parentId && assetMap.has(asset.parentId)) {
      assetMap.get(asset.parentId)!.children.push(assetMap.get(asset.id)!);
    } else {
      rootAssets.push(assetMap.get(asset.id)!);
    }
  });

  return rootAssets;
}

export async function seedAssets() {
    const db = await getDb();
    if (db.assets.length > 0) return; // Already seeded

    // Seed a simple hierarchy
    const newAssets: Asset[] = [
        { id: 'region-1', tenantId: 't1', propertyId: 'p1', name: 'Gulf Coast Region', type: 'region', status: 'active', parentId: null, cost: 0, replacementCost: 0 },
        { id: 'prop-1', tenantId: 't1', propertyId: 'p1', name: 'Grand Hotel', type: 'property', status: 'active', parentId: 'region-1', cost: 0, replacementCost: 50000000 },
        { id: 'bldg-1', tenantId: 't1', propertyId: 'p1', name: 'Main Tower', type: 'building', status: 'active', parentId: 'prop-1', cost: 0, replacementCost: 20000000 },
        { id: 'floor-1', tenantId: 't1', propertyId: 'p1', name: 'Floor 1', type: 'floor', status: 'active', parentId: 'bldg-1', cost: 0, replacementCost: 0 },
        { id: 'hvac-system', tenantId: 't1', propertyId: 'p1', name: 'HVAC System', type: 'system', status: 'active', parentId: 'bldg-1', cost: 5000, replacementCost: 50000 },
        { id: 'chiller-1', tenantId: 't1', propertyId: 'p1', name: 'Chiller Unit A', type: 'asset', status: 'active', parentId: 'hvac-system', cost: 15000, replacementCost: 25000, modelNumber: 'CH-2000', serialNumber: 'SN-998877' },
        { id: 'chiller-2', tenantId: 't1', propertyId: 'p1', name: 'Chiller Unit B (Bad Actor)', type: 'asset', status: 'maintenance', parentId: 'hvac-system', cost: 18000, replacementCost: 25000, modelNumber: 'CH-2000', serialNumber: 'SN-998878' },
    ];

    db.assets = newAssets;
    await saveDb(db);
    revalidatePath('/app/assets');
}

export async function calculateTCO(assetId: string) {
    // In a real app, this would aggregate WO costs, parts, energy, etc.
    // For demo, we'll return the 'cost' field which represents cumulative maintenance spend
    const db = await getDb();
    const asset = db.assets.find(a => a.id === assetId);
    if (!asset) return null;

    const maintenanceSpend = asset.cost;
    const isBadActor = asset.replacementCost > 0 && (maintenanceSpend > (asset.replacementCost * 0.5)); // 50% threshold for demo

    return {
        maintenanceSpend,
        replacementCost: asset.replacementCost,
        isBadActor,
        ratio: asset.replacementCost > 0 ? (maintenanceSpend / asset.replacementCost) : 0
    };
}
