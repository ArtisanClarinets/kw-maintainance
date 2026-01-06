'use client';

import { useEffect, useState } from 'react';
import { getAuditLogs } from '@/app/app/security/actions';
import { AuditLog } from '@/lib/domain/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileJson, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    getAuditLogs().then(setLogs);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Audit Log</h1>
          <p className="text-muted-foreground">Complete immutable history of all system events.</p>
        </div>
        <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <FileJson className="h-5 w-5" />
                Event Stream
            </CardTitle>
            <CardDescription>
                Real-time feed of user and system actions.
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
    </div>
  );
}
