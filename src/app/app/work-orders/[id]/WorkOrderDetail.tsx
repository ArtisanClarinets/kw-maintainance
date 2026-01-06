'use client';

import React, { useState } from 'react';
import { WorkOrder } from '@/lib/domain/schema';
import { updateWorkOrderStatus, updateWorkOrderTasks } from '../actions';
import { Button } from '@/components/Button';
import { canTransition, WORK_ORDER_STATUS_LABELS, WorkOrderStatus } from '@/lib/domain/workOrders/stateMachine';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkOrderDetailProps {
  workOrder: WorkOrder;
}

export function WorkOrderDetail({ workOrder: initialWorkOrder }: WorkOrderDetailProps) {
  const [workOrder, setWorkOrder] = useState(initialWorkOrder);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTransition = async (nextStatus: WorkOrderStatus) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateWorkOrderStatus(workOrder.id, nextStatus);
      if (result.success && result.workOrder) {
        setWorkOrder(result.workOrder);
      } else {
        setError(result.error || 'Failed to update status');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (taskId: string) => {
    const newTasks = workOrder.tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    
    // Optimistic update
    setWorkOrder({ ...workOrder, tasks: newTasks });
    
    try {
      await updateWorkOrderTasks(workOrder.id, newTasks);
    } catch (e) {
      void e;
      // Revert if failed
      console.error("Failed to update tasks");
      setWorkOrder(workOrder);
    }
  };

  const allowedTransitions = Object.keys(WORK_ORDER_STATUS_LABELS).filter(status => 
    canTransition(workOrder.status, status as WorkOrderStatus)
  ) as WorkOrderStatus[];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      case 'Dispatch Confirmed': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'In Progress': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'QC Pending': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Financial Close': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", getStatusColor(workOrder.status))}>
              {workOrder.status}
            </span>
            <span className="text-sm text-muted-foreground font-mono">{workOrder.id}</span>
            {workOrder.isDuplicate && (
                <span className="inline-flex items-center text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded border border-red-400/20">
                    <AlertCircle className="h-3 w-3 mr-1" /> Duplicate
                </span>
            )}
          </div>
          <h1 className="text-3xl font-bold font-serif text-foreground">{workOrder.title}</h1>
        </div>
        
        <div className="flex flex-wrap gap-2">
            {allowedTransitions.map(status => (
                <Button 
                    key={status} 
                    onClick={() => handleTransition(status)}
                    disabled={loading}
                    variant="outline"
                    className="border-primary/20 hover:bg-primary/5"
                >
                    {loading ? 'Updating...' : `Move to ${WORK_ORDER_STATUS_LABELS[status]}`}
                </Button>
            ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-card rounded-xl border border-border/40 p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                    {workOrder.description || "No description provided."}
                </p>
            </div>

            <div className="bg-card rounded-xl border border-border/40 p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
                    <span>SOP Checklist</span>
                    <span className="text-xs text-muted-foreground font-normal">
                        {workOrder.tasks.filter(t => t.completed).length}/{workOrder.tasks.length} Completed
                    </span>
                </h3>
                {workOrder.tasks.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">No tasks defined for this work order.</p>
                ) : (
                    <div className="space-y-3">
                        {workOrder.tasks.map(task => (
                            <div 
                                key={task.id} 
                                onClick={() => toggleTask(task.id)}
                                className={cn(
                                    "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                                    task.completed 
                                        ? "bg-primary/5 border-primary/20" 
                                        : "bg-background border-border/40 hover:border-primary/40"
                                )}
                            >
                                <div className={cn(
                                    "mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                                    task.completed ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground"
                                )}>
                                    {task.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                                </div>
                                <div className={cn("flex-1 text-sm", task.completed && "text-muted-foreground line-through")}>
                                    {task.description}
                                    {task.required && <span className="ml-2 text-[10px] text-red-400 font-medium uppercase">Required</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border/40 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Details</h3>
                <dl className="space-y-4 text-sm">
                    <div>
                        <dt className="text-muted-foreground mb-1">Priority</dt>
                        <dd className="font-medium">{workOrder.priority}</dd>
                    </div>
                    <div>
                        <dt className="text-muted-foreground mb-1">Category</dt>
                        <dd className="font-medium">{workOrder.category}</dd>
                    </div>
                    <div>
                        <dt className="text-muted-foreground mb-1">Asset</dt>
                        <dd className="font-medium font-mono text-xs">{workOrder.assetId || "N/A"}</dd>
                    </div>
                    <div>
                        <dt className="text-muted-foreground mb-1">QC Required</dt>
                        <dd className="font-medium">{workOrder.qcRequired ? "Yes" : "No"}</dd>
                    </div>
                    <div>
                        <dt className="text-muted-foreground mb-1">Created</dt>
                        <dd className="font-medium">{new Date(workOrder.createdAt).toLocaleString()}</dd>
                    </div>
                    <div>
                        <dt className="text-muted-foreground mb-1">Last Updated</dt>
                        <dd className="font-medium">{new Date(workOrder.updatedAt).toLocaleString()}</dd>
                    </div>
                </dl>
            </div>
        </div>
      </div>
    </div>
  );
}
