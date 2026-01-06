'use client';

import { useEffect, useState } from 'react';
import { getIoTRules, createIoTRule, simulateDeviceEvent } from './actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Wifi, Activity } from 'lucide-react';

export default function IoTAdminPage() {
  const [rules, setRules] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [sim, setSim] = useState({ deviceId: '', metric: '', value: 0 });

  useEffect(() => {
    getIoTRules().then(setRules);
  }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const deviceId = fd.get('deviceId') as string;
    const metric = fd.get('metric') as string;
    const operator = fd.get('operator') as string;
    const threshold = parseFloat(fd.get('threshold') as string || '0');
    const severity = fd.get('severity') as string as any;
    const action = fd.get('action') as string as any;

    await createIoTRule({ tenantId: 't1', deviceId, metric, operator: operator as any, threshold, severity: severity as any, action: action as any, active: true });
    setOpen(false);
    const updated = await getIoTRules();
    setRules(updated);
  };

  const handleSim = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const deviceId = fd.get('deviceId') as string;
    const metric = fd.get('metric') as string;
    const value = parseFloat(fd.get('value') as string || '0');
    const res = await simulateDeviceEvent({ tenantId: 't1', deviceId, metric, value });
    alert(`Sim result: ${JSON.stringify(res.triggers)}`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">IoT & Sensors</h1>
          <p className="text-muted-foreground">Provision devices, configure thresholds, and map to assets.</p>
        </div>
        <div className="space-x-2">
          <Button>
              <Plus className="mr-2 h-4 w-4" />
              Provision Device
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Connected Devices</CardTitle>
            <CardDescription>Sensor fleet status and configuration.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-6">
                <form onSubmit={handleSim} className="flex gap-2 items-center mb-4">
                    <Input name="deviceId" placeholder="Device ID" value={sim.deviceId} onChange={e => setSim({ ...sim, deviceId: e.target.value })} />
                    <Input name="metric" placeholder="metric" value={sim.metric} onChange={e => setSim({ ...sim, metric: e.target.value })} />
                    <Input name="value" placeholder="value" type="number" value={sim.value} onChange={e => setSim({ ...sim, value: parseFloat(e.target.value || '0') })} />
                    <Button type="submit">Simulate</Button>
                </form>
                <div className="mb-4">
                    <Button onClick={() => setOpen(true)}>Add Rule</Button>
                </div>
                <div className="hidden" aria-hidden>
                  {/* Form modal markup used by the Add Rule CTA to keep consistent styles */}
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Device</TableHead>
                        <TableHead>Metric</TableHead>
                        <TableHead>Operator</TableHead>
                        <TableHead>Threshold</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map(r => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.deviceId}</TableCell>
                      <TableCell>{r.metric}</TableCell>
                      <TableCell>{r.operator}</TableCell>
                      <TableCell>{r.threshold}</TableCell>
                      <TableCell>{r.action}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
