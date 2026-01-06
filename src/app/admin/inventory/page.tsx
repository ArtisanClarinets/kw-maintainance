'use client';

import { useEffect, useState } from 'react';
import { getWarehouses, getParts } from './actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Warehouse, Truck, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Warehouse {
  id: string;
  name: string;
  location?: string;
  type?: string;
}

interface Part {
  id: string;
  name: string;
  sku: string;
  category: string;
  cost: number;
}

export default function InventoryAdminPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getWarehouses().then(setWarehouses);
    getParts(search).then(setParts);
  }, [search]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Configuration</h1>
          <p className="text-muted-foreground">Manage warehouses, mobile units, and part catalog definitions.</p>
        </div>
        <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Warehouse
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Warehouse className="h-5 w-5" />
                    Fixed Warehouses
                </CardTitle>
                <CardDescription>Main storage locations</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {warehouses.length > 0 ? (
                          warehouses.map(w => (
                            <TableRow key={w.id}>
                              <TableCell className="font-medium">{w.name}</TableCell>
                              <TableCell>{w.location || 'N/A'}</TableCell>
                              <TableCell><Badge>{w.type || 'General'}</Badge></TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="text-slate-500 text-center py-4">No warehouses configured</TableCell>
                          </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Mobile Units
                </CardTitle>
                <CardDescription>Tech trucks and carts</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Assigned To</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                         <TableRow>
                            <TableCell className="font-medium">Truck 01</TableCell>
                            <TableCell>John Doe</TableCell>
                            <TableCell><Badge className="bg-green-500/10 text-green-500">Active</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Cart A</TableCell>
                            <TableCell>Jane Smith</TableCell>
                            <TableCell><Badge className="bg-green-500/10 text-green-500">Active</Badge></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Parts Catalog
          </CardTitle>
          <CardDescription>Searchable inventory of available parts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            placeholder="Search parts by name or SKU..." 
            className="w-full" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parts.length > 0 ? (
                parts.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell className="font-mono text-xs">{p.sku}</TableCell>
                    <TableCell><Badge variant="secondary">{p.category}</Badge></TableCell>
                    <TableCell>${p.cost?.toFixed(2) || '0.00'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-slate-500 text-center py-4">No parts found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
