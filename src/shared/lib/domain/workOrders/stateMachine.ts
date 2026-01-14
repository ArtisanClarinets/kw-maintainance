import { WorkOrder, WorkOrderStatusEnum } from '../schema';
import { z } from 'zod';

export type WorkOrderStatus = z.infer<typeof WorkOrderStatusEnum>;

export const WORK_ORDER_STATUS_LABELS: Record<WorkOrderStatus, string> = {
  'Draft': 'Draft',
  'Request Received': 'Received',
  'Estimation': 'Estimation',
  'Scheduled': 'Scheduled',
  'En Route': 'En Route',
  'In Progress': 'In Progress',
  'Completion & Verification': 'Verification',
  'Invoiced': 'Invoiced',
  'Cancelled': 'Cancelled'
};

export type TransitionResult =
  | { success: true; nextStatus: WorkOrderStatus }
  | { success: false; error: string };

// Define allowed transitions
// Workflow: Request -> Estimation -> Scheduled -> En Route -> In Progress -> Completion -> Invoiced
const TRANSITIONS: Record<WorkOrderStatus, WorkOrderStatus[]> = {
  'Draft': ['Request Received', 'Scheduled', 'Cancelled'],
  'Request Received': ['Estimation', 'Scheduled', 'Cancelled'],
  'Estimation': ['Scheduled', 'Cancelled'],
  'Scheduled': ['En Route', 'Cancelled', 'In Progress'], // Allow skipping En Route if needed manually
  'En Route': ['In Progress', 'Cancelled', 'Scheduled'], // Re-schedule
  'In Progress': ['Completion & Verification', 'Cancelled'],
  'Completion & Verification': ['Invoiced', 'In Progress'], // In Progress if rejected
  'Invoiced': [],
  'Cancelled': []
};

export function canTransition(currentStatus: WorkOrderStatus, nextStatus: WorkOrderStatus): boolean {
  const allowed = TRANSITIONS[currentStatus];
  return allowed ? allowed.includes(nextStatus) : false;
}

export function validateTransition(wo: WorkOrder, nextStatus: WorkOrderStatus): TransitionResult {
  // 1. Check if transition is allowed in the map
  if (!canTransition(wo.status, nextStatus)) {
    // Exception: Admin override or fix? For now strict.
    return {
      success: false,
      error: `Cannot transition from ${wo.status} to ${nextStatus}`
    };
  }

  // 2. Specific Business Rules

  // Rule: Cannot move to Completion & Verification if checklist is not 100% complete
  if (nextStatus === 'Completion & Verification' && wo.tasks && wo.tasks.length > 0) {
    const incompleteTasks = wo.tasks.filter(t => !t.completed);
    if (incompleteTasks.length > 0) {
      return {
        success: false,
        error: 'All checklist tasks must be completed before verification.'
      };
    }
  }

  // Rule: Cannot move to Invoiced if QC Required and not satisfied?
  // (Assuming Completion & Verification stage handles the QC step physically).

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
