'use client';

import { useEffect, useState } from 'react';
import { getVendors, createVendor } from './actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function VendorsAdminPage() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getVendors().then(setVendors);
  }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get('name') as string;
    const type = fd.get('type') as string;
    const status = fd.get('status') as string;
    const complianceScore = parseInt(fd.get('complianceScore') as string || '0', 10);

    await createVendor({ tenantId: 't1', name, type: type as any, status: status as any, complianceScore, lastAuditDate: new Date().toISOString() });
    setOpen(false);
    const updated = await getVendors();
    setVendors(updated);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
          <p className="text-muted-foreground">Manage suppliers and service vendors.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Vendor</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Vendor</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input name="name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Input name="type" defaultValue="Service" />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Input name="status" defaultValue="Active" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Compliance Score</Label>
                <Input name="complianceScore" type="number" defaultValue={100} />
              </div>
              <Button type="submit" className="w-full">Create Vendor</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Supplier Directory</CardTitle>
          <CardDescription>Onboarded vendors and status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Compliance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map(v => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.name}</TableCell>
                  <TableCell>{v.type}</TableCell>
                  <TableCell>{v.status}</TableCell>
                  <TableCell>{v.complianceScore}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
