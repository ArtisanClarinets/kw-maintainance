'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Wifi, Activity } from 'lucide-react';

export default function IoTAdminPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">IoT & Sensors</h1>
          <p className="text-muted-foreground">Provision devices, configure thresholds, and map to assets.</p>
        </div>
        <Button>
            <Plus className="mr-2 h-4 w-4" />
            Provision Device
        </Button>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Connected Devices</CardTitle>
            <CardDescription>Sensor fleet status and configuration.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Device ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Asset Mapping</TableHead>
                        <TableHead>Threshold</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-mono">s-1</TableCell>
                        <TableCell>Temperature</TableCell>
                        <TableCell>Chiller A</TableCell>
                        <TableCell>{'>'} 45°F</TableCell>
                        <TableCell><Badge className="bg-green-500/10 text-green-500"><Wifi className="h-3 w-3 mr-1" /> Online</Badge></TableCell>
                        <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-mono">s-2</TableCell>
                        <TableCell>Vibration</TableCell>
                        <TableCell>Pump B</TableCell>
                        <TableCell>{'>'} 0.5 IPS</TableCell>
                        <TableCell><Badge className="bg-green-500/10 text-green-500"><Wifi className="h-3 w-3 mr-1" /> Online</Badge></TableCell>
                        <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-mono">s-3</TableCell>
                        <TableCell>Pressure</TableCell>
                        <TableCell>Boiler Main</TableCell>
                        <TableCell>{'>'} 120 PSI</TableCell>
                        <TableCell><Badge variant="secondary"><Activity className="h-3 w-3 mr-1" /> Syncing</Badge></TableCell>
                        <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
