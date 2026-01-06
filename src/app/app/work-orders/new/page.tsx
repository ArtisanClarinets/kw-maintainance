'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createWorkOrder } from '../actions';
import { Button } from '@/components/Button';
import { ArrowLeft, Loader2, WifiOff } from 'lucide-react';
import Link from 'next/link';
import { WorkOrderPriorityEnum, WorkOrderCategoryEnum } from '@/lib/domain/schema';
import { useOfflineQueue } from '@/hooks/useOfflineQueue';
import { z } from 'zod';

type Priority = z.infer<typeof WorkOrderPriorityEnum>;
type Category = z.infer<typeof WorkOrderCategoryEnum>;

export default function NewWorkOrderPage() {
  const router = useRouter();
  const { isOnline, addToQueue } = useOfflineQueue();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Simple form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [category, setCategory] = useState<Category>('General');
  const [assetId, setAssetId] = useState('');
  const [qcRequired, setQcRequired] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        title,
        description,
        priority,
        category,
        assetId: assetId || undefined,
        qcRequired,
        tasks: [
            // Default SOP tasks for demo
            { id: 't1', description: 'Assess situation and ensure safety', completed: false, required: true },
            { id: 't2', description: 'Perform required maintenance', completed: false, required: true },
            { id: 't3', description: 'Clean up work area', completed: false, required: true },
            { id: 't4', description: 'Verify asset functionality', completed: false, required: true },
        ]
      };

      if (!isOnline) {
        addToQueue('CREATE_WORK_ORDER', payload);
        setIsSubmitting(false);
        router.push('/app/work-orders');
        return;
      }

      const wo = await createWorkOrder(payload);
      router.push(`/app/work-orders/${wo.id}`);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/app/work-orders" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Cancel
        </Link>
        {!isOnline && (
            <div className="flex items-center text-amber-500 text-sm font-medium bg-amber-500/10 px-3 py-1 rounded-full">
                <WifiOff className="h-4 w-4 mr-2" />
                Offline Mode
            </div>
        )}
      </div>

      <div className="bg-card border border-border/40 rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold font-serif mb-6">Create Work Order</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input 
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="e.g. Leaking faucet in Room 302"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea 
                required
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe the issue in detail..."
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={priority}
                    onChange={e => setPriority(e.target.value as Priority)}
                >
                    {WorkOrderPriorityEnum.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={category}
                    onChange={e => setCategory(e.target.value as Category)}
                >
                    {WorkOrderCategoryEnum.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Asset ID (Optional)</label>
            <input 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="e.g. a-123"
                value={assetId}
                onChange={e => setAssetId(e.target.value)}
            />
             <p className="text-xs text-muted-foreground mt-1">
                Entering an existing Asset ID will link this WO to the asset.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input 
                type="checkbox" 
                id="qcRequired"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                checked={qcRequired}
                onChange={e => setQcRequired(e.target.checked)}
            />
            <label htmlFor="qcRequired" className="text-sm font-medium">Require Quality Control (QC) Sign-off</label>
          </div>

          <div className="pt-4">
            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                    </>
                ) : (
                    'Create Work Order'
                )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
