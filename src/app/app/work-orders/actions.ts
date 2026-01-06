'use server';

import { getDb, saveDb } from '@/lib/demo/persistence';
import { WorkOrder, WorkOrderStatusEnum } from '@/lib/domain/schema';
import { transition } from '@/lib/domain/workOrders/stateMachine';
import { revalidatePath } from 'next/cache';

export async function getWorkOrders() {
  const db = await getDb();
  return db.workOrders;
}

export async function getWorkOrder(id: string) {
  const db = await getDb();
  return db.workOrders.find((wo) => wo.id === id);
}

export async function createWorkOrder(data: Partial<WorkOrder>) {
  const db = await getDb();
  
  // Simple ID generation
  const id = `wo-${Date.now()}`;
  
  const newWorkOrder: WorkOrder = {
    id,
    tenantId: 't1', // Hardcoded for demo
    propertyId: 'p1', // Hardcoded for demo
    title: data.title || 'Untitled Work Order',
    description: data.description || '',
    priority: data.priority || 'Medium',
    status: 'Draft',
    category: data.category || 'General',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tasks: data.tasks || [],
    qcRequired: data.qcRequired || false,
    linkedWorkOrderIds: [],
    isDuplicate: false,
    ...data,
  } as WorkOrder;

  // Validate with schema (partial validation since we constructed it)
  // In a real app we'd use strict validation
  
  // Dedupe Logic (Simulated)
  // Check for same category and asset/location within last 24 hours
  const duplicate = db.workOrders.find(w => 
    w.status !== 'Financial Close' && 
    w.category === newWorkOrder.category && 
    (newWorkOrder.assetId ? w.assetId === newWorkOrder.assetId : false)
  );

  if (duplicate) {
    newWorkOrder.isDuplicate = true;
    newWorkOrder.linkedWorkOrderIds = [duplicate.id];
    // We still save it, but marked as duplicate
  }

  db.workOrders.push(newWorkOrder);
  await saveDb(db);
  revalidatePath('/app/work-orders');
  return newWorkOrder;
}

export async function updateWorkOrderStatus(id: string, newStatus: string) {
  const db = await getDb();
  const index = db.workOrders.findIndex((w) => w.id === id);
  
  if (index === -1) {
    throw new Error('Work Order not found');
  }

  const wo = db.workOrders[index];
  
  // Verify transition using domain logic
  // We need to cast string to enum, safer in real app
  const statusEnum = WorkOrderStatusEnum.parse(newStatus);
  
  try {
    const updatedWo = transition(wo, statusEnum);
    db.workOrders[index] = updatedWo;
    await saveDb(db);
    revalidatePath(`/app/work-orders/${id}`);
    revalidatePath('/app/work-orders');
    return { success: true, workOrder: updatedWo };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message };
  }
}

export async function updateWorkOrderTasks(id: string, tasks: WorkOrder['tasks']) {
    const db = await getDb();
    const index = db.workOrders.findIndex((w) => w.id === id);
    
    if (index === -1) {
      throw new Error('Work Order not found');
    }

    db.workOrders[index].tasks = tasks;
    db.workOrders[index].updatedAt = new Date().toISOString();
    
    await saveDb(db);
    revalidatePath(`/app/work-orders/${id}`);
    return { success: true };
}
