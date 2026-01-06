'use client';

import React, { useState, useEffect } from 'react';
import { runDispatchSimulation, massReshuffle, DispatchCandidate } from './actions';
import { getWorkOrders } from '../work-orders/actions'; // Reuse
import { WorkOrder } from '@/lib/domain/schema';
import { Button } from '@/components/Button';
import { Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default function DispatchPage() {
    const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
    const [selectedWo, setSelectedWo] = useState<WorkOrder | null>(null);
    const [candidates, setCandidates] = useState<DispatchCandidate[]>([]);
    const [loading, setLoading] = useState(false);
    const [reshuffling, setReshuffling] = useState(false);
    const [reshuffleResult, setReshuffleResult] = useState<{ moves: number; efficiencyGain: string } | null>(null);

    useEffect(() => {
        getWorkOrders().then(wos => {
            // Filter for unscheduled/draft
            setWorkOrders(wos.filter(w => w.status === 'Draft'));
        });
    }, []);

    const handleSelectWo = async (wo: WorkOrder) => {
        setSelectedWo(wo);
        setLoading(true);
        try {
            const results = await runDispatchSimulation(wo.id);
            setCandidates(results);
        } finally {
            setLoading(false);
        }
    };

    const handleReshuffle = async () => {
        setReshuffling(true);
        try {
            const res = await massReshuffle();
            setReshuffleResult(res);
        } finally {
            setReshuffling(false);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
            <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold font-serif tracking-tight">Dispatch Console</h1>
                    <p className="text-muted-foreground">AI-driven resource optimization and scheduling.</p>
                </div>
                <Button 
                    onClick={handleReshuffle} 
                    disabled={reshuffling}
                    className={cn(reshuffling ? "animate-pulse" : "")}
                >
                    <Zap className="mr-2 h-4 w-4" />
                    {reshuffling ? "Optimizing Fleet..." : "Run Mass Reshuffle"}
                </Button>
            </div>

            {reshuffleResult && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-600 p-4 rounded-lg mb-6 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                    <span className="font-medium flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Optimization Complete: {reshuffleResult.moves} assignments updated.
                    </span>
                    <span className="font-bold">Efficiency Gain: {reshuffleResult.efficiencyGain}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                {/* Work Order Queue */}
                <div className="bg-card border border-border/40 rounded-xl p-4 overflow-y-auto shadow-sm">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">Pending Queue</h3>
                    <div className="space-y-2">
                        {workOrders.length === 0 ? (
                            <p className="text-sm text-muted-foreground px-2">No pending work orders.</p>
                        ) : (
                            workOrders.map(wo => (
                                <div 
                                    key={wo.id}
                                    onClick={() => handleSelectWo(wo)}
                                    className={cn(
                                        "p-3 rounded-lg border cursor-pointer transition-all hover:border-primary/50",
                                        selectedWo?.id === wo.id ? "bg-primary/5 border-primary" : "bg-background border-border/40"
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-medium text-sm truncate">{wo.title}</span>
                                        <span className={cn(
                                            "text-[10px] px-1.5 py-0.5 rounded-full border",
                                            wo.priority === 'Critical' ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-muted text-muted-foreground"
                                        )}>{wo.priority}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                                        <span>{wo.category}</span>
                                        <span>•</span>
                                        <span>{wo.id}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Scoring Engine Visualization */}
                <div className="lg:col-span-2 bg-card border border-border/40 rounded-xl p-6 overflow-y-auto shadow-sm">
                    {selectedWo ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-border/20 pb-4">
                                <h2 className="text-lg font-bold">Dispatch Candidates for {selectedWo.id}</h2>
                                <div className="text-xs text-muted-foreground">Based on Skills, Proximity, & SLA</div>
                            </div>
                            
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                                    <p className="text-sm text-muted-foreground">Calculating scores...</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {candidates.map((candidate, idx) => (
                                        <div key={candidate.user.id} className="relative group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="relative p-4 border border-border/40 rounded-lg flex items-center gap-4 bg-background/50">
                                                {/* Score Badge */}
                                                <div className={cn(
                                                    "h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg border-4",
                                                    idx === 0 ? "border-green-500 text-green-600 bg-green-50" : "border-muted text-muted-foreground bg-muted/20"
                                                )}>
                                                    {Math.round(candidate.score * 100)}
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-bold">{candidate.user.name}</h3>
                                                            <p className="text-xs text-muted-foreground uppercase">{candidate.user.role}</p>
                                                        </div>
                                                        {idx === 0 && (
                                                            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                                                                RECOMMENDED
                                                            </span>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Factors */}
                                                    <div className="grid grid-cols-4 gap-2 mt-3">
                                                        <div className="text-center">
                                                            <div className="text-[10px] text-muted-foreground uppercase mb-1">Skills</div>
                                                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                                                <div className="h-full bg-blue-500" style={{ width: `${candidate.factors.skillMatch * 100}%` }} />
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-[10px] text-muted-foreground uppercase mb-1">Proximity</div>
                                                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                                                <div className="h-full bg-indigo-500" style={{ width: `${candidate.factors.proximity * 100}%` }} />
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-[10px] text-muted-foreground uppercase mb-1">Load</div>
                                                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                                                <div className="h-full bg-orange-500" style={{ width: `${candidate.factors.workload * 100}%` }} />
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-[10px] text-muted-foreground uppercase mb-1">SLA Impact</div>
                                                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                                                <div className="h-full bg-red-500" style={{ width: `${candidate.factors.slaPressure * 100}%` }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button size="sm" variant={idx === 0 ? "default" : "secondary"}>
                                                    Assign
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                            <Users className="h-12 w-12 mb-4" />
                            <p>Select a work order to run dispatch analysis</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
