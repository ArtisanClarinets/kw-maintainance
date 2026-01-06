'use client';

import { useEffect, useState } from 'react';
import { getAuditLogs, anonymizePII } from './actions';
import { AuditLog } from '@/lib/domain/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Lock, FileJson } from 'lucide-react';
import { toast } from 'sonner';

export default function SecurityPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    getAuditLogs().then(setLogs);
  }, []);

  const handleAnonymize = async () => {
      const res = await anonymizePII();
      if (res.success) toast.success(res.message);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-serif tracking-tight">Security & Compliance</h1>
          <p className="text-muted-foreground">Audit logs, RBAC configuration, and data retention policies.</p>
        </div>
        <Button variant="destructive" onClick={handleAnonymize}>
            <Lock className="mr-2 h-4 w-4" />
            Trigger PII Retention Scrub
        </Button>
      </div>

      <Tabs defaultValue="audit">
        <TabsList>
            <TabsTrigger value="audit">Audit Log</TabsTrigger>
            <TabsTrigger value="rbac">RBAC Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="audit" className="space-y-4 mt-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileJson className="h-5 w-5" />
                        Immutable Audit Trail
                    </CardTitle>
                    <CardDescription>
                        All system actions are cryptographically signed and stored in an append-only log.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Actor</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Entity</TableHead>
                                <TableHead>Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.map(log => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-mono text-xs">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </TableCell>
                                    <TableCell>{log.actorName}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{log.action}</Badge>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs">
                                        {log.entityType}:{log.entityId}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {log.details}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="rbac" className="space-y-4 mt-4">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Role-Based Access Control
                    </CardTitle>
                    <CardDescription>
                        Current permission matrix for active roles.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Role</TableHead>
                                <TableHead>Work Orders</TableHead>
                                <TableHead>Assets</TableHead>
                                <TableHead>Inventory</TableHead>
                                <TableHead>Financials</TableHead>
                                <TableHead>Admin</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Tech</TableCell>
                                <TableCell><Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Read/Write</Badge></TableCell>
                                <TableCell><Badge variant="secondary">Read Only</Badge></TableCell>
                                <TableCell><Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Read/Write</Badge></TableCell>
                                <TableCell><Badge variant="outline" className="text-muted-foreground">None</Badge></TableCell>
                                <TableCell><Badge variant="outline" className="text-muted-foreground">None</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Supervisor</TableCell>
                                <TableCell><Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Full Access</Badge></TableCell>
                                <TableCell><Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Edit</Badge></TableCell>
                                <TableCell><Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Approve</Badge></TableCell>
                                <TableCell><Badge variant="secondary">View Cost</Badge></TableCell>
                                <TableCell><Badge variant="outline" className="text-muted-foreground">None</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">GM / VP</TableCell>
                                <TableCell><Badge variant="secondary">View All</Badge></TableCell>
                                <TableCell><Badge variant="secondary">View All</Badge></TableCell>
                                <TableCell><Badge variant="secondary">View All</Badge></TableCell>
                                <TableCell><Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Full Access</Badge></TableCell>
                                <TableCell><Badge variant="secondary">Reports</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Security Admin</TableCell>
                                <TableCell><Badge variant="secondary">Audit</Badge></TableCell>
                                <TableCell><Badge variant="secondary">Audit</Badge></TableCell>
                                <TableCell><Badge variant="secondary">Audit</Badge></TableCell>
                                <TableCell><Badge variant="secondary">Audit</Badge></TableCell>
                                <TableCell><Badge className="bg-purple-500/20 text-purple-500 hover:bg-purple-500/30">System Owner</Badge></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
