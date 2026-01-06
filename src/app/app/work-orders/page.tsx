import React from 'react';
import Link from 'next/link';
import { getWorkOrders } from './actions';
import { Button } from '@/components/Button';
import { Plus, AlertCircle, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function WorkOrdersPage() {
  const workOrders = await getWorkOrders();

  // Sort by updated at desc
  const sortedWorkOrders = [...workOrders].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-500 font-bold';
      case 'High': return 'text-orange-500 font-semibold';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-blue-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif tracking-tight">Work Orders</h1>
          <p className="text-muted-foreground">Manage and track maintenance requests across your portfolio.</p>
        </div>
        <Button asChild>
          <Link href="/app/work-orders/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Work Order
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border border-border/40 bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 text-xs uppercase font-semibold text-muted-foreground">
              <tr>
                <th className="px-6 py-4">ID / Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {sortedWorkOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No work orders found. Create one to get started.
                  </td>
                </tr>
              ) : (
                sortedWorkOrders.map((wo) => (
                  <tr key={wo.id} className="group hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <Link href={`/app/work-orders/${wo.id}`} className="font-medium hover:text-primary transition-colors">
                          {wo.title}
                        </Link>
                        <span className="text-xs text-muted-foreground font-mono">{wo.id}</span>
                        {wo.isDuplicate && (
                            <span className="inline-flex items-center text-[10px] text-red-400 mt-1">
                                <AlertCircle className="h-3 w-3 mr-1" /> Potential Duplicate
                            </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", getStatusColor(wo.status))}>
                        {wo.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("flex items-center gap-1.5", getPriorityColor(wo.priority))}>
                        {wo.priority === 'Critical' && <AlertCircle className="h-3 w-3" />}
                        {wo.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {wo.category}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {new Date(wo.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/app/work-orders/${wo.id}`}>View</Link>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
