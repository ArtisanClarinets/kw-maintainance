'use client';

import { useEffect, useState } from 'react';
import { getPurchaseOrders, createPurchaseOrder } from './actions';
import { getParts } from '../parts/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function PurchaseOrdersPage() {
  const [pos, setPos] = useState<any[]>([]);
  const [parts, setParts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => { getPurchaseOrders().then(setPos); getParts().then(setParts); }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const vendorId = fd.get('vendorId') as string;
    const propertyId = fd.get('propertyId') as string;
    const linesRaw = fd.get('lines') as string || '';
    const lines = linesRaw.split('\n').map(l => {
      const [partId, qty, unitCost] = l.split(',').map(s => s.trim());
      return { partId, quantity: parseInt(qty || '0', 10), unitCost: parseFloat(unitCost || '0') };
    }).filter(l => l.partId);

    await createPurchaseOrder({ tenantId: 't1', vendorId, propertyId, status: 'Draft', lines });
    setOpen(false);
    const updated = await getPurchaseOrders();
    setPos(updated);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
          <p className="text-muted-foreground">Create and manage purchase orders for parts and supplies.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create PO</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Purchase Order</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Vendor ID</Label>
                <Input name="vendorId" defaultValue="v1" />
              </div>
              <div className="space-y-2">
                <Label>Property ID</Label>
                <Input name="propertyId" defaultValue="p1" />
              </div>
              <div>
                <Label>Lines (one per line: partId, qty, unitCost)</Label>
                <textarea name="lines" rows={6} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white" placeholder={`part-1, 10, 12.5\npart-2, 5, 45`}></textarea>
              </div>
              <Button type="submit" className="w-full">Create PO</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Open Purchase Orders</CardTitle>
          <CardDescription>Recent POs</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Lines</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pos.map(po => (
                <TableRow key={po.id}>
                  <TableCell className="font-mono">{po.id}</TableCell>
                  <TableCell>{po.vendorId}</TableCell>
                  <TableCell className="text-xs">{po.lines?.length || 0} lines</TableCell>
                  <TableCell>{po.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
