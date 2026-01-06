'use client';

import React, { useState, useEffect } from 'react';
import { getInventoryData, transferStock } from './actions';
import { Part, Warehouse, StockLevel } from '@/lib/domain/schema';
import { Button } from '@/components/Button';
import { Package, Truck, ArrowRightLeft, AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default function InventoryPage() {
    const [data, setData] = useState<{ parts: Part[], warehouses: Warehouse[], stockLevels: StockLevel[] } | null>(null);
    const [loading, setLoading] = useState(true);
    const [transferring, setTransferring] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        const res = await getInventoryData();
        setData(res);
        setLoading(false);
    };

    const getStock = (whId: string, partId: string) => {
        return data?.stockLevels.find(sl => sl.warehouseId === whId && sl.partId === partId)?.quantity || 0;
    };

    const handleSimulateTransfer = async () => {
        setTransferring(true);
        try {
            // Simulate transfer of 5 Filters from Main to Truck
            if (data && data.parts.length > 0 && data.warehouses.length > 0) {
                const part = data.parts[0]; // Filter
                const mainWh = data.warehouses.find(w => w.type === 'Main');
                const truck = data.warehouses.find(w => w.type === 'Truck');
                
                if (part && mainWh && truck) {
                    await transferStock(part.id, mainWh.id, truck.id, 1);
                    await loadData(); // Refresh
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            setTransferring(false);
        }
    };

    if (loading || !data) {
        return <div className="p-8">Loading inventory...</div>;
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-serif tracking-tight">Inventory & Logistics</h1>
                    <p className="text-muted-foreground">Multi-echelon inventory management across warehouses and mobile units.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={loadData}><RefreshCw className="h-4 w-4 mr-2" /> Refresh</Button>
                    <Button onClick={handleSimulateTransfer} disabled={transferring}>
                        <ArrowRightLeft className="h-4 w-4 mr-2" />
                        {transferring ? 'Transferring...' : 'Simulate Truck Replenishment'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stats */}
                <div className="bg-card border border-border/40 rounded-xl p-6 shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Package className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{data.parts.length}</div>
                        <div className="text-sm text-muted-foreground">Unique Parts SKU</div>
                    </div>
                </div>
                <div className="bg-card border border-border/40 rounded-xl p-6 shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <Truck className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{data.warehouses.filter(w => w.type === 'Truck').length}</div>
                        <div className="text-sm text-muted-foreground">Active Mobile Units</div>
                    </div>
                </div>
                <div className="bg-card border border-border/40 rounded-xl p-6 shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                        <AlertCircle className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">
                            {data.stockLevels.filter(sl => {
                                const part = data.parts.find(p => p.id === sl.partId);
                                return part && sl.quantity < part.minStockLevel;
                            }).length}
                        </div>
                        <div className="text-sm text-muted-foreground">Low Stock Alerts</div>
                    </div>
                </div>
            </div>

            {/* Matrix View */}
            <div className="bg-card border border-border/40 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border/20">
                    <h3 className="font-semibold">Stock Matrix</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/30">
                            <tr>
                                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Part SKU / Name</th>
                                {data.warehouses.map(wh => (
                                    <th key={wh.id} className="px-6 py-3 text-center font-medium text-muted-foreground">
                                        <div className="flex flex-col items-center">
                                            <span>{wh.name}</span>
                                            <span className="text-[10px] uppercase font-normal text-muted-foreground/70">{wh.type}</span>
                                        </div>
                                    </th>
                                ))}
                                <th className="px-6 py-3 text-center font-medium text-muted-foreground">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20">
                            {data.parts.map(part => {
                                const total = data.warehouses.reduce((acc, wh) => acc + getStock(wh.id, part.id), 0);
                                return (
                                    <tr key={part.id} className="hover:bg-muted/5">
                                        <td className="px-6 py-4">
                                            <div className="font-medium">{part.name}</div>
                                            <div className="text-xs text-muted-foreground font-mono">{part.sku}</div>
                                            {total < part.minStockLevel && (
                                                <div className="inline-flex items-center text-[10px] text-red-500 mt-1 font-bold uppercase">
                                                    <AlertCircle className="h-3 w-3 mr-1" /> Low Stock
                                                </div>
                                            )}
                                        </td>
                                        {data.warehouses.map(wh => {
                                            const qty = getStock(wh.id, part.id);
                                            return (
                                                <td key={wh.id} className="px-6 py-4 text-center">
                                                    <span className={cn(
                                                        "px-2 py-1 rounded-full text-xs font-mono",
                                                        qty === 0 ? "text-muted-foreground opacity-50" : 
                                                        qty < part.minStockLevel ? "bg-red-500/10 text-red-600 font-bold" : "bg-muted text-foreground"
                                                    )}>
                                                        {qty}
                                                    </span>
                                                </td>
                                            );
                                        })}
                                        <td className="px-6 py-4 text-center font-bold">
                                            {total}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
