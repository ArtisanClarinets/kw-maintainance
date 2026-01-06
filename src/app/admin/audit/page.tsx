'use client';

import { useEffect, useState } from 'react';
import { getAuditLogs, clearOldAuditLogs } from './actions';
import { AuditLog } from '@/lib/domain/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileJson, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [retention, setRetention] = useState(90);

  useEffect(() => {
    getAuditLogs().then(setLogs);
  }, []);

  const handleCleanup = async () => {
    if (confirm(`Clear logs older than ${retention} days?`)) {
      await clearOldAuditLogs(retention);
      getAuditLogs().then(setLogs);
    }
  };

  const exportCSV = () => {
    const headers = ['Timestamp', 'Actor', 'Action', 'Entity', 'Details'];
    const rows = logs.map(l => [l.timestamp, l.actorName, l.action, `${l.entityType}:${l.entityId}`, l.details || '']);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `audit-export-${new Date().toISOString()}.csv`;
    link.click();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Audit Log</h1>
          <p className="text-muted-foreground">Complete immutable history of all system events.</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2 mr-4 bg-slate-900 p-1 px-3 rounded-md border border-slate-800">
            <Label htmlFor="retention" className="text-xs text-slate-400">Retention (Days)</Label>
            <Input 
              id="retention"
              type="number" 
              className="w-16 h-8 bg-transparent border-none text-xs" 
              value={retention} 
              onChange={e => setRetention(parseInt(e.target.value))} 
            />
            <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-400" onClick={handleCleanup}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" onClick={exportCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
          </Button>
        </div>
      </div>

      <Card className="bg-slate-950 border-slate-800">
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
                <TableHeader className="bg-slate-900/50">
                    <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Actor</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Entity</TableHead>
                        <TableHead>Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {logs.slice().reverse().map(log => (
                        <TableRow key={log.id} className="hover:bg-slate-900/40 border-slate-800/50">
                            <TableCell className="font-mono text-xs text-slate-400">
                                {new Date(log.timestamp).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <div className="font-medium text-slate-200">{log.actorName}</div>
                              <div className="text-[10px] text-slate-500 font-mono italic">{log.actorId}</div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className="bg-emerald-500/5 text-emerald-400 border-emerald-500/10 font-mono text-[10px]">
                                  {log.action}
                                </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-[10px] text-slate-300">
                                {log.entityType}:<span className="text-slate-500">{log.entityId}</span>
                            </TableCell>
                            <TableCell className="text-slate-400 text-xs italic max-w-xs truncate">
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
