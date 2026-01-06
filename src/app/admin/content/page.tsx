'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

export default function ContentPage() {
  const handleSave = () => {
    toast.success('Content updated successfully');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CMS Content</h1>
          <p className="text-muted-foreground">Manage marketing copy and localized strings.</p>
        </div>
        <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
        </Button>
      </div>

      <Tabs defaultValue="homepage">
        <TabsList>
            <TabsTrigger value="homepage">Homepage</TabsTrigger>
            <TabsTrigger value="platform">Platform</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
        </TabsList>

        <TabsContent value="homepage" className="mt-4 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Hero Section</CardTitle>
                    <CardDescription>Main value proposition</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Headline</label>
                        <Input defaultValue="Mission-Critical Hospitality Maintenance" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Subheadline</label>
                        <Textarea defaultValue="Orchestrate operations across your entire portfolio with military-grade precision." />
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="platform" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle>Platform Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-4 text-center text-muted-foreground bg-secondary/20 rounded border border-dashed">
                        Additional content fields would go here...
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="legal" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle>Legal Disclaimers</CardTitle>
                </CardHeader>
                <CardContent>
                     <div className="p-4 text-center text-muted-foreground bg-secondary/20 rounded border border-dashed">
                        Privacy Policy & Terms editor...
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
