'use client';

import { useEffect, useState, useCallback } from 'react';
import { getTenantsAndProperties, createTenant, createProperty } from './actions';
import { Tenant, Property } from '@/lib/domain/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Building, MapPin } from 'lucide-react';

export default function TenantsPropertiesPage() {
  const [data, setData] = useState<{ tenants: Tenant[], properties: Property[] }>({ tenants: [], properties: [] });
  const [isTenantDialogOpen, setIsTenantDialogOpen] = useState(false);
  const [isPropertyDialogOpen, setIsPropertyDialogOpen] = useState(false);

  const loadData = useCallback(async () => {
    const res = await getTenantsAndProperties();
    setData(res);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  const handleCreateTenant = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    
    await createTenant(name, slug);
    toast.success('Tenant created');
    setIsTenantDialogOpen(false);
    loadData();
  };

  const handleCreateProperty = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tenantId = formData.get('tenantId') as string;
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;

    await createProperty(tenantId, name, address);
    toast.success('Property created');
    setIsPropertyDialogOpen(false);
    loadData();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tenants & Properties</h1>
          <p className="text-muted-foreground">Manage organizational hierarchy and physical locations.</p>
        </div>
        <div className="flex gap-2">
            <Dialog open={isTenantDialogOpen} onOpenChange={setIsTenantDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Add Tenant</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Tenant</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateTenant} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Tenant Name</Label>
                            <Input id="name" name="name" required placeholder="Acme Corp" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" name="slug" required placeholder="acme" />
                        </div>
                        <Button type="submit" className="w-full">Create Tenant</Button>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isPropertyDialogOpen} onOpenChange={setIsPropertyDialogOpen}>
                <DialogTrigger asChild>
                    <Button>Add Property</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Property</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateProperty} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="tenantId">Organization</Label>
                            <Select name="tenantId" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Tenant" />
                                </SelectTrigger>
                                <SelectContent>
                                    {data.tenants.map(t => (
                                        <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Property Name</Label>
                            <Input id="name" name="name" required placeholder="Grand Hotel" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" name="address" required placeholder="123 Main St" />
                        </div>
                        <Button type="submit" className="w-full">Create Property</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Tenants
                </CardTitle>
                <CardDescription>Top-level organizations</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>ID</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.tenants.map(t => (
                            <TableRow key={t.id}>
                                <TableCell className="font-medium">{t.name}</TableCell>
                                <TableCell>{t.slug}</TableCell>
                                <TableCell className="text-xs font-mono text-muted-foreground">{t.id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Properties
                </CardTitle>
                <CardDescription>Physical locations managed</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Tenant</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.properties.map(p => (
                            <TableRow key={p.id}>
                                <TableCell className="font-medium">{p.name}</TableCell>
                                <TableCell>{p.address}</TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                    {data.tenants.find(t => t.id === p.tenantId)?.name || p.tenantId}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
