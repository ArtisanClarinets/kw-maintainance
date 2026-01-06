'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save, Zap } from 'lucide-react';
import { toast } from 'sonner';

export default function DispatchRulesPage() {
    const handleSave = () => toast.success("Dispatch configuration saved");

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dispatch Logic</h1>
          <p className="text-muted-foreground">Configure automated assignment scoring weights.</p>
        </div>
        <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Rules
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Scoring Weights</CardTitle>
                <CardDescription>Adjust how candidates are ranked (Total must equal 100%)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <Label>Skill Match</Label>
                        <span className="font-mono text-sm">40%</span>
                    </div>
                    <Slider defaultValue={[40]} max={100} step={5} />
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <Label>Proximity / Travel Time</Label>
                        <span className="font-mono text-sm">30%</span>
                    </div>
                    <Slider defaultValue={[30]} max={100} step={5} />
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <Label>SLA Pressure</Label>
                        <span className="font-mono text-sm">20%</span>
                    </div>
                    <Slider defaultValue={[20]} max={100} step={5} />
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <Label>Technician Utilization (Load Balancing)</Label>
                        <span className="font-mono text-sm">10%</span>
                    </div>
                    <Slider defaultValue={[10]} max={100} step={5} />
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Automation Settings</CardTitle>
                <CardDescription>Rules for auto-assignment and re-optimization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base">Auto-Dispatch High Priority</Label>
                        <p className="text-sm text-muted-foreground">Automatically assign Critical/High WOs if score {'>'} 90%</p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base">Real-time Optimization</Label>
                        <p className="text-sm text-muted-foreground">Re-shuffle schedule when new urgent WO arrives</p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base">Hard Constraint: Certification</Label>
                        <p className="text-sm text-muted-foreground">Never assign without required certs</p>
                    </div>
                    <Switch defaultChecked disabled />
                </div>
                
                <div className="pt-6 border-t">
                    <Button variant="secondary" className="w-full">
                        <Zap className="mr-2 h-4 w-4" />
                        Run Simulation
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
