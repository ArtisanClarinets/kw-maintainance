'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FilePlus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useEffect, useState } from 'react';
import { getWorkOrderTemplates, createWorkOrderTemplate } from './actions';

export default function WorkOrderTemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getWorkOrderTemplates().then(setTemplates);
  }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = fd.get('title') as string;
    const category = fd.get('category') as string;
    const sla = fd.get('sla') as string;
    const tasksRaw = fd.get('tasks') as string;
    const tasks = tasksRaw ? tasksRaw.split('\n').map((desc, i) => ({ id: `t-${Date.now()}-${i}`, description: desc.trim(), completed: false, required: true })) : [];

    await createWorkOrderTemplate({ tenantId: 't1', title, category: category as any, defaultSLA: sla, tasks, requiredCertifications: [], defaultParts: [] });
    setOpen(false);
    const updated = await getWorkOrderTemplates();
    setTemplates(updated);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Work Order Templates</h1>
          <p className="text-muted-foreground">Standard Operating Procedures (SOPs) and checklists.</p>
        </div>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <FilePlus className="mr-2 h-4 w-4" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Work Order Template</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input name="title" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input name="category" defaultValue="General" />
                  </div>
                  <div className="space-y-2">
                    <Label>Default SLA</Label>
                    <Input name="sla" placeholder="4h" />
                  </div>
                </div>
                <div>
                  <Label>Tasks (one per line)</Label>
                  <Textarea name="tasks" rows={6} placeholder={`Inspect HVAC\nSanitize surfaces`} />
                </div>
                <Button type="submit" className="w-full">Create Template</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
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
                    {templates.map(t => (
                        <TableRow key={t.id}>
                            <TableCell className="font-medium">{t.title}</TableCell>
                            <TableCell><Badge variant="secondary">{t.category}</Badge></TableCell>
                            <TableCell>{t.defaultSLA || '-'}</TableCell>
                            <TableCell>{t.tasks?.length || 0} items</TableCell>
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
