'use client';

import { useEffect, useState } from 'react';
import { getTimesheets, createTimesheet, approveTimesheet } from './actions';
import { getTechnicians } from '../technicians/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function TimesheetsPage() {
  const [timesheets, setTimesheets] = useState<any[]>([]);
  const [techs, setTechs] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getTimesheets().then(setTimesheets);
    getTechnicians().then(setTechs);
  }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const technicianId = fd.get('technicianId') as string;
    const date = fd.get('date') as string;
    const hours = parseFloat(fd.get('hours') as string || '0');
    const notes = fd.get('notes') as string;

    await createTimesheet({ tenantId: 't1', technicianId, date, hours, notes });
    setOpen(false);
    getTimesheets().then(setTimesheets);
  };

  const handleApprove = async (id: string) => {
    await approveTimesheet(id);
    getTimesheets().then(setTimesheets);
  };

  const exportCSV = () => {
    const headers = ['ID', 'Technician', 'Date', 'Hours', 'Approved', 'Notes'];
    const rows = timesheets.map(t => [t.id, t.technicianId, t.date, t.hours, t.approved, t.notes]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `timesheets-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timesheets & Payroll</h1>
          <p className="text-muted-foreground">Log technician hours and export for payroll processing.</p>
        </div>
        <div className="space-x-2">
            <Button variant="outline" onClick={exportCSV}>Export CSV</Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>Log Hours</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log Time</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreate} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Technician</Label>
                    <Select name="technicianId" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select tech" />
                        </SelectTrigger>
                        <SelectContent>
                            {techs.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input name="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label>Hours</Label>
                    <Input name="hours" type="number" step="0.5" required defaultValue="8" />
                  </div>
                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Input name="notes" placeholder="Work performed" />
                  </div>
                  <Button type="submit" className="w-full">Save Entry</Button>
                </form>
              </DialogContent>
            </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Timesheet Entries</CardTitle>
          <CardDescription>Verify and approve hours.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tech</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timesheets.map(t => (
                <TableRow key={t.id}>
                  <TableCell>{t.technicianId}</TableCell>
                  <TableCell>{t.date}</TableCell>
                  <TableCell>{t.hours}</TableCell>
                  <TableCell>
                    <Badge variant={t.approved ? 'default' : 'secondary'}>{t.approved ? 'Approved' : 'Pending'}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {!t.approved && <Button size="sm" onClick={() => handleApprove(t.id)}>Approve</Button>}
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
