'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FilePlus, Edit, Trash2 } from 'lucide-react';

const MOCK_TEMPLATES = [
    { id: 1, title: 'HVAC Seasonal Inspection', category: 'HVAC', sla: '48h', tasks: 12 },
    { id: 2, title: 'Guest Room PM (Deep Clean)', category: 'General', sla: '24h', tasks: 25 },
    { id: 3, title: 'Kitchen Grease Trap Clean', category: 'Plumbing', sla: '72h', tasks: 5 },
    { id: 4, title: 'Fire Safety Audit', category: 'Safety', sla: '24h', tasks: 40 },
];

export default function WorkOrderTemplatesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Work Order Templates</h1>
          <p className="text-muted-foreground">Standard Operating Procedures (SOPs) and checklists.</p>
        </div>
        <Button>
            <FilePlus className="mr-2 h-4 w-4" />
            New Template
        </Button>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>SOP Library</CardTitle>
            <CardDescription>Pre-configured checklists for standard maintenance tasks.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Template Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Default SLA</TableHead>
                        <TableHead>Task Count</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {MOCK_TEMPLATES.map(t => (
                        <TableRow key={t.id}>
                            <TableCell className="font-medium">{t.title}</TableCell>
                            <TableCell><Badge variant="secondary">{t.category}</Badge></TableCell>
                            <TableCell>{t.sla}</TableCell>
                            <TableCell>{t.tasks} items</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
