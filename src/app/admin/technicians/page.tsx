'use client';

import { useEffect, useState, useCallback } from 'react';
import { getTechnicians, createTechnician } from './actions';
import { Technician } from '@/lib/domain/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { User2 } from 'lucide-react';

export default function TechniciansPage() {
  const [techs, setTechs] = useState<Technician[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const loadData = useCallback(async () => {
    const res = await getTechnicians();
    setTechs(res);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loadData();
  }, [loadData]);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tenantId = formData.get('tenantId') as string || 't1';
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const skillsRaw = formData.get('skills') as string;
    const hourlyRate = parseFloat(formData.get('hourlyRate') as string || '0');
    const vehicle = formData.get('vehicle') as string;

    const newTech = {
      tenantId,
      name,
      skills: skillsRaw ? skillsRaw.split(',').map(s => s.trim()).filter(Boolean) : [],
      certifications: [],
      hourlyRate: isNaN(hourlyRate) ? undefined : hourlyRate,
      active: true,
      vehicle,
      phone
    };

    await createTechnician(newTech);
    toast.success('Technician created');
    setIsOpen(false);
    loadData();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Technicians & Contractors</h1>
          <p className="text-muted-foreground">Manage field personnel, skills, and certifications.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add Technician</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Technician</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" required placeholder="Alex Rivera" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" placeholder="+1 (850) 555-0001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input id="skills" name="skills" placeholder="plumbing, hvac" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate</Label>
                  <Input id="hourlyRate" name="hourlyRate" type="number" step="0.5" placeholder="45" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle</Label>
                  <Input id="vehicle" name="vehicle" placeholder="Truck 01" />
                </div>
              </div>
              <Button type="submit" className="w-full">Create Technician</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User2 className="h-5 w-5"/> Field Crew</CardTitle>
          <CardDescription>Active technicians and contractors</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead>Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {techs.map(t => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell>{t.phone}</TableCell>
                  <TableCell className="text-xs">{t.skills.join(', ')}</TableCell>
                  <TableCell>{t.hourlyRate ? `$${t.hourlyRate}/hr` : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
