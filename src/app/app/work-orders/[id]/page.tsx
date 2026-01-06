import React from 'react';
import { notFound } from 'next/navigation';
import { getWorkOrder } from '../actions';
import { WorkOrderDetail } from './WorkOrderDetail';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const workOrder = await getWorkOrder(params.id);

  if (!workOrder) {
    notFound();
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link href="/app/work-orders" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Work Orders
        </Link>
      </div>
      <WorkOrderDetail workOrder={workOrder} />
    </div>
  );
}
