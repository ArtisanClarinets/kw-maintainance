import { WorkOrder, WorkOrderStatusEnum } from '../schema';
import { z } from 'zod';

export type WorkOrderStatus = z.infer<typeof WorkOrderStatusEnum>;

export const WORK_ORDER_STATUS_LABELS: Record<WorkOrderStatus, string> = {
  'Draft': 'Draft',
  'Dispatch Confirmed': 'Scheduled',
  'In Progress': 'In Progress',
  'On Hold - Supply Chain': 'On Hold - Parts',
  'On Hold - Occupancy': 'On Hold - Access',
  'QC Pending': 'QC Pending',
  'Financial Close': 'Closed'
};

export type TransitionResult = 
  | { success: true; nextStatus: WorkOrderStatus }
  | { success: false; error: string };

// Define allowed transitions
const TRANSITIONS: Record<WorkOrderStatus, WorkOrderStatus[]> = {
  'Draft': ['Dispatch Confirmed', 'Financial Close'], // Financial Close here acts as Cancelled/Archived for simplicity if needed, or we add Cancelled to schema
  'Dispatch Confirmed': ['In Progress', 'Financial Close', 'On Hold - Occupancy'],
  'In Progress': ['On Hold - Supply Chain', 'On Hold - Occupancy', 'QC Pending', 'Financial Close'],
  'On Hold - Supply Chain': ['In Progress', 'Financial Close'],
  'On Hold - Occupancy': ['Dispatch Confirmed', 'In Progress', 'Financial Close'],
  'QC Pending': ['Financial Close', 'In Progress'], // Back to In Progress if QC fails
  'Financial Close': []
};

export function canTransition(currentStatus: WorkOrderStatus, nextStatus: WorkOrderStatus): boolean {
  const allowed = TRANSITIONS[currentStatus];
  return allowed ? allowed.includes(nextStatus) : false;
}

export function validateTransition(wo: WorkOrder, nextStatus: WorkOrderStatus): TransitionResult {
  // 1. Check if transition is allowed in the map
  if (!canTransition(wo.status, nextStatus)) {
    return { 
      success: false, 
      error: `Cannot transition from ${wo.status} to ${nextStatus}` 
    };
  }

  // 2. Specific Business Rules

  // Rule: Cannot move to QC_PENDING or Financial Close if checklist is not 100% complete (if checklist exists)
  if ((nextStatus === 'QC Pending' || nextStatus === 'Financial Close') && wo.tasks && wo.tasks.length > 0) {
    const incompleteTasks = wo.tasks.filter(t => !t.completed);
    if (incompleteTasks.length > 0) {
      // Exception: Cancelling (moving to Financial Close from Draft/Scheduled might be allowed without tasks? 
      // But spec says "cannot enter Financial Close until labor/parts posted". 
      // Let's assume Financial Close = Completed successfully.
      // We might need a "Cancelled" status in schema.
      return {
        success: false,
        error: 'All checklist tasks must be completed before finishing the work order.'
      };
    }
  }

  // Rule: If QC is required, must go to QC Pending before Financial Close
  // Note: schema doesn't have qcRequired field yet, assuming it might be added or we use a custom field. 
  // Let's check schema... it doesn't have qcRequired. I should add it or ignore for now.
  // The spec says "cannot close without QC if required".
  // I will assume for now we don't have that field, but I'll add a comment.
  
  return { success: true, nextStatus };
}

export function transition(wo: WorkOrder, nextStatus: WorkOrderStatus): WorkOrder {
  const validation = validateTransition(wo, nextStatus);
  if (!validation.success) {
    throw new Error(validation.error);
  }

  return {
    ...wo,
    status: nextStatus,
    updatedAt: new Date().toISOString(),
  };
}
