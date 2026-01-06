'use client';

import { useEffect, useState } from 'react';
import { getVendors } from './actions';
import { Vendor } from '@/lib/domain/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    getVendors().then(setVendors);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-serif tracking-tight">Vendor Compliance</h1>
          <p className="text-muted-foreground">Manage service providers, scorecards, and insurance compliance.</p>
        </div>
        <Button>Add Vendor</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <Card key={vendor.id} className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-lg">{vendor.name}</CardTitle>
                <CardDescription>{vendor.type} Provider</CardDescription>
              </div>
              <Badge variant={
                vendor.status === 'Active' ? 'default' :
                vendor.status === 'Probation' ? 'destructive' : 'secondary'
              }>
                {vendor.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Compliance Score</span>
                  <span className={cn(
                    "font-bold font-mono",
                    vendor.complianceScore >= 90 ? "text-green-500" :
                    vendor.complianceScore >= 70 ? "text-yellow-500" : "text-red-500"
                  )}>
                    {vendor.complianceScore}%
                  </span>
                </div>
                
                {/* Score bar */}
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full",
                      vendor.complianceScore >= 90 ? "bg-green-500" :
                      vendor.complianceScore >= 70 ? "bg-yellow-500" : "bg-red-500"
                    )}
                    style={{ width: `${vendor.complianceScore}%` }}
                  />
                </div>

                <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    Last Audit: {vendor.lastAuditDate}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
