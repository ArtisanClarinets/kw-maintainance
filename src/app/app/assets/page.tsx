'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getAssetTree, seedAssets, calculateTCO } from './actions';
import { Button } from '@/components/Button';
import { ChevronRight, ChevronDown, Box, AlertTriangle, DollarSign, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Asset } from '@/lib/domain/schema';

type AssetTreeNodeType = Asset & {
    children?: AssetTreeNodeType[];
}

interface TCOData {
    maintenanceSpend: number;
    replacementCost: number;
    isBadActor: boolean;
    ratio: number;
}

// Recursive Tree Component
const AssetTreeNode = ({ node, level = 0, onSelect }: { node: AssetTreeNodeType, level?: number, onSelect: (node: AssetTreeNodeType) => void }) => {
    const [isOpen, setIsOpen] = useState(level < 2); // Open first couple levels
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div>
            <div 
                className={cn(
                    "flex items-center gap-2 py-1.5 px-2 hover:bg-muted/50 rounded cursor-pointer transition-colors",
                    "text-sm"
                )}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
                onClick={() => onSelect(node)}
            >
                <div 
                    onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                    className={cn("p-0.5 rounded hover:bg-muted/80", !hasChildren && "invisible")}
                >
                    {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                </div>
                
                <Box className={cn("h-3.5 w-3.5", level === 0 ? "text-primary" : "text-muted-foreground")} />
                
                <span className={cn("font-medium", level === 0 && "font-semibold")}>
                    {node.name}
                </span>
                
                {node.status === 'maintenance' && (
                    <AlertTriangle className="h-3 w-3 text-orange-500 ml-auto" />
                )}
            </div>
            
            {isOpen && hasChildren && (
                <div>
                    {node.children!.map((child: AssetTreeNodeType) => (
                        <AssetTreeNode key={child.id} node={child} level={level + 1} onSelect={onSelect} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function AssetsPage() {
    const [tree, setTree] = useState<AssetTreeNodeType[]>([]);
    const [selectedAsset, setSelectedAsset] = useState<AssetTreeNodeType | null>(null);
    const [tcoData, setTcoData] = useState<TCOData | null>(null);
    const [loading, setLoading] = useState(true);

    const loadData = useCallback(async () => {
        // Seed first if empty
        await seedAssets();
        const data = await getAssetTree();
        setTree(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadData();
    }, [loadData]);

    const handleRefresh = () => {
        setLoading(true);
        loadData();
    };

    useEffect(() => {
        if (selectedAsset) {
            calculateTCO(selectedAsset.id).then(setTcoData);
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTcoData(null);
        }
    }, [selectedAsset]);

    return (
        <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
             <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold font-serif tracking-tight">Asset Registry</h1>
                    <p className="text-muted-foreground">Manage hierarchy, lifecycle, and total cost of ownership.</p>
                </div>
                <Button variant="outline" onClick={handleRefresh}>Refresh</Button>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0">
                {/* Tree View */}
                <div className="bg-card border border-border/40 rounded-xl p-4 overflow-y-auto shadow-sm">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">Hierarchy</h3>
                    {loading ? (
                        <div className="text-sm text-muted-foreground px-2">Loading assets...</div>
                    ) : (
                        tree.map(node => (
                            <AssetTreeNode key={node.id} node={node} onSelect={setSelectedAsset} />
                        ))
                    )}
                </div>

                {/* Detail View */}
                <div className="md:col-span-2 bg-card border border-border/40 rounded-xl p-8 overflow-y-auto shadow-sm">
                    {selectedAsset ? (
                        <div className="space-y-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">{selectedAsset.type.toUpperCase()}</span>
                                        {selectedAsset.status === 'maintenance' && (
                                            <span className="text-xs font-bold text-orange-500 flex items-center gap-1">
                                                <AlertTriangle className="h-3 w-3" /> MAINTENANCE
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-2xl font-bold">{selectedAsset.name}</h2>
                                    <p className="text-sm text-muted-foreground font-mono mt-1">ID: {selectedAsset.id}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-muted-foreground">Replacement Cost</div>
                                    <div className="text-xl font-mono font-medium">${selectedAsset.replacementCost.toLocaleString()}</div>
                                </div>
                            </div>

                            {/* TCO Card */}
                            <div className={cn(
                                "rounded-xl border p-6 transition-all",
                                tcoData?.isBadActor ? "bg-red-500/5 border-red-500/20" : "bg-muted/20 border-border/20"
                            )}>
                                <div className="flex items-center gap-2 mb-4">
                                    <DollarSign className={cn("h-5 w-5", tcoData?.isBadActor ? "text-red-500" : "text-green-500")} />
                                    <h3 className="font-semibold">Total Cost of Ownership Analysis</h3>
                                    {tcoData?.isBadActor && (
                                        <span className="ml-auto text-xs font-bold bg-red-500 text-white px-2 py-1 rounded animate-pulse">
                                            BAD ACTOR DETECTED
                                        </span>
                                    )}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Lifetime Maintenance Spend</div>
                                        <div className="text-2xl font-bold">${tcoData?.maintenanceSpend.toLocaleString()}</div>
                                        <div className="w-full bg-muted/50 h-2 rounded-full mt-2 overflow-hidden">
                                            <div 
                                                className={cn("h-full rounded-full", tcoData?.isBadActor ? "bg-red-500" : "bg-primary")} 
                                                style={{ width: `${Math.min((tcoData?.ratio || 0) * 100, 100)}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {(tcoData?.ratio ? (tcoData.ratio * 100).toFixed(1) : 0)}% of replacement value
                                        </p>
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground mb-1">Recommendation</div>
                                        {tcoData?.isBadActor ? (
                                            <p className="text-sm font-medium text-red-600">
                                                Capital replacement recommended. Maintenance costs have exceeded threshold.
                                            </p>
                                        ) : (
                                            <p className="text-sm font-medium text-green-600">
                                                Asset performing within expected TCO parameters. Continue preventative maintenance.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Technical Specs</h4>
                                    <dl className="space-y-2 text-sm">
                                        <div className="flex justify-between border-b border-border/10 pb-1">
                                            <span>Model</span>
                                            <span className="font-mono">{selectedAsset.modelNumber || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-border/10 pb-1">
                                            <span>Serial</span>
                                            <span className="font-mono">{selectedAsset.serialNumber || 'N/A'}</span>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                            <Activity className="h-12 w-12 mb-4 opacity-20" />
                            <p>Select an asset to view details and TCO analysis</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}