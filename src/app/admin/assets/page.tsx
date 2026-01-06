'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Plus, Search, QrCode } from 'lucide-react';

export default function AssetsAdminPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Asset Registry</h1>
          <p className="text-muted-foreground">Manage equipment hierarchy, specifications, and warranty data.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <QrCode className="mr-2 h-4 w-4" />
                Print Tags
            </Button>
            <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Asset
            </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search assets by tag, name, or serial..." className="pl-8" />
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Master Asset List</CardTitle>
            <CardDescription>Showing top-level systems and equipment.</CardDescription>
        </CardHeader>
        <CardContent>
             <div className="text-center py-12 text-muted-foreground">
                <p>Asset tree management is available in the main app.</p>
                <p className="text-sm">Use this admin view for bulk imports and schema configuration.</p>
             </div>
        </CardContent>
      </Card>
    </div>
  );
}
