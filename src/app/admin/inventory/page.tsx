'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Warehouse, Truck } from 'lucide-react';

export default function InventoryAdminPage() {
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
                        <TableRow>
                            <TableCell className="font-medium">Central Supply</TableCell>
                            <TableCell>B1-100</TableCell>
                            <TableCell><Badge>Main</Badge></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">East Wing Closet</TableCell>
                            <TableCell>L2-E</TableCell>
                            <TableCell><Badge variant="secondary">Satellite</Badge></TableCell>
                        </TableRow>
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
    </div>
  );
}
