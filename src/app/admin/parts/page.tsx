'use client';

import { useEffect, useState } from 'react';
import { getParts, createPart } from './actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

export default function PartsAdminPage() {
  const [parts, setParts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => { getParts().then(setParts); }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get('name') as string;
    const sku = fd.get('sku') as string;
    const category = fd.get('category') as string;
    const cost = parseFloat(fd.get('cost') as string || '0');
    const minStockLevel = parseInt(fd.get('minStockLevel') as string || '0', 10);

    await createPart({ tenantId: 't1', name, sku, category, cost, minStockLevel });
    setOpen(false);
    const updated = await getParts();
    setParts(updated);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Parts Catalog</h1>
          <p className="text-muted-foreground">Define and manage spare parts and consumables.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Part</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Part</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input name="name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>SKU</Label>
                  <Input name="sku" />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input name="category" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Unit Cost</Label>
                  <Input name="cost" type="number" step="0.01" />
                </div>
                <div>
                  <Label>Min Stock Level</Label>
                  <Input name="minStockLevel" type="number" />
                </div>
              </div>
              <Button type="submit" className="w-full">Create Part</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Parts</CardTitle>
          <CardDescription>Master parts catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Unit Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parts.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.sku}</TableCell>
                  <TableCell><Badge variant="secondary">{p.category}</Badge></TableCell>
                  <TableCell>{p.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
