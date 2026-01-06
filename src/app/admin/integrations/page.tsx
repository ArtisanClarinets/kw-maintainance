'use client';

import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Globe, Database, CreditCard, Server } from 'lucide-react';
import { toast } from 'sonner';

export default function IntegrationsPage() {
  const handleToggle = (name: string) => {
      toast.success(`${name} integration updated`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">Manage external connectors and data synchronization.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <IntegrationCard 
            title="Oracle Opera PMS" 
            description="Two-way sync for room status, guest profiles, and work order blocking."
            icon={<Server className="h-6 w-6" />}
            connected={true}
            onToggle={() => handleToggle("Opera PMS")}
        />
        <IntegrationCard 
            title="SAP ERP" 
            description="Financial posting for POs, invoices, and inventory valuation."
            icon={<Database className="h-6 w-6" />}
            connected={true}
            onToggle={() => handleToggle("SAP ERP")}
        />
        <IntegrationCard 
            title="Stripe Connect" 
            description="Payment processing for vendor invoices and contractor payouts."
            icon={<CreditCard className="h-6 w-6" />}
            connected={false}
            onToggle={() => handleToggle("Stripe")}
        />
        <IntegrationCard 
            title="IoT Hub (Azure)" 
            description="Real-time telemetry ingestion from edge devices."
            icon={<Globe className="h-6 w-6" />}
            connected={true}
            onToggle={() => handleToggle("IoT Hub")}
        />
      </div>
    </div>
  );
}

interface IntegrationCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    connected: boolean;
    onToggle: () => void;
}

function IntegrationCard({ title, description, icon, connected, onToggle }: IntegrationCardProps) {
    return (
        <Card>
            <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-secondary rounded-lg">
                        {icon}
                    </div>
                    <div>
                        <CardTitle className="text-lg">{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Badge variant={connected ? "default" : "secondary"}>
                        {connected ? "Connected" : "Disconnected"}
                    </Badge>
                    <Switch checked={connected} onCheckedChange={onToggle} />
                    <Button variant="outline">Configure</Button>
                </div>
            </div>
        </Card>
    );
}
