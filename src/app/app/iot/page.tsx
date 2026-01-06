'use client';

import React, { useState, useEffect } from 'react';
import { createIoTWorkOrder } from './actions';
import { Button } from '@/components/Button';
import { Activity, Zap, AlertTriangle, Power } from 'lucide-react';
import { cn } from '@/lib/utils';

// Simple Switch Component
function SimpleSwitch({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (c: boolean) => void }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onCheckedChange(!checked)}
            className={cn(
                "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
                checked ? "bg-primary" : "bg-input"
            )}
        >
            <span
                className={cn(
                    "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
                    checked ? "translate-x-5" : "translate-x-0"
                )}
            />
        </button>
    );
}

interface Sensor {
    id: string;
    name: string;
    type: 'Temperature' | 'Vibration' | 'Pressure';
    location: string;
    value: number;
    threshold: number;
    unit: string;
    status: 'Normal' | 'Warning' | 'Critical';
    history: number[];
}

const INITIAL_SENSORS: Sensor[] = [
    { id: 's-1', name: 'Chiller A Output', type: 'Temperature', location: 'Roof', value: 42, threshold: 55, unit: '°F', status: 'Normal', history: Array(20).fill(42) },
    { id: 's-2', name: 'Boiler Pressure', type: 'Pressure', location: 'Basement', value: 120, threshold: 150, unit: 'PSI', status: 'Normal', history: Array(20).fill(120) },
    { id: 's-3', name: 'Elevator Motor 1', type: 'Vibration', location: 'Shaft 1', value: 2.1, threshold: 5.0, unit: 'mm/s', status: 'Normal', history: Array(20).fill(2.1) },
];

export default function IoTPage() {
    const [sensors, setSensors] = useState<Sensor[]>(INITIAL_SENSORS);
    const [edgeRuleEnabled, setEdgeRuleEnabled] = useState(true);
    const [anomalyTriggered, setAnomalyTriggered] = useState(false);
    const [lastAlert, setLastAlert] = useState<string | null>(null);

    // Simulation Loop
    useEffect(() => {
        const interval = setInterval(() => {
            setSensors(prev => prev.map(s => {
                // Random fluctuation
                const noise = (Math.random() - 0.5) * (s.type === 'Temperature' ? 2 : s.type === 'Pressure' ? 5 : 0.2);
                let newValue = s.value + noise;
                
                // Anomaly injection
                if (anomalyTriggered && s.id === 's-1') {
                     newValue += 5; // Rapid heat rise
                } else if (!anomalyTriggered && s.id === 's-1' && s.value > 45) {
                    newValue -= 2; // Cool down
                }

                // Clamp
                if (s.type === 'Temperature' && newValue < 30) newValue = 30;
                if (s.type === 'Pressure' && newValue < 80) newValue = 80;
                if (s.type === 'Vibration' && newValue < 0) newValue = 0;

                const newHistory = [...s.history.slice(1), newValue];
                
                // Check status
                let status: Sensor['status'] = 'Normal';
                if (newValue > s.threshold) status = 'Critical';
                else if (newValue > s.threshold * 0.85) status = 'Warning';

                // Trigger Edge Rule
                if (status === 'Critical' && edgeRuleEnabled && !lastAlert) {
                    handleCriticalAlert(s, newValue);
                }

                return { ...s, value: newValue, status, history: newHistory };
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, [anomalyTriggered, edgeRuleEnabled, lastAlert]);

    const handleCriticalAlert = async (sensor: Sensor, value: number) => {
        setLastAlert(`Alert sent for ${sensor.name}`);
        await createIoTWorkOrder(sensor.id, Math.round(value), sensor.threshold);
        // Reset alert state after a delay to allow re-triggering if persistent (for demo we just block spam)
        setTimeout(() => setLastAlert(null), 10000);
    };

    const toggleAnomaly = () => {
        setAnomalyTriggered(!anomalyTriggered);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-serif tracking-tight">IoT Predictive Monitor</h1>
                    <p className="text-muted-foreground">Real-time sensor telemetry and edge-computed alerts.</p>
                </div>
                <div className="flex items-center gap-4 bg-card border border-border/40 p-2 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 px-2">
                        <Zap className={cn("h-4 w-4", edgeRuleEnabled ? "text-primary" : "text-muted-foreground")} />
                        <span className="text-sm font-medium">Edge Rules</span>
                    </div>
                    <SimpleSwitch checked={edgeRuleEnabled} onCheckedChange={setEdgeRuleEnabled} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sensors.map(sensor => (
                    <div key={sensor.id} className={cn(
                        "bg-card border rounded-xl p-6 shadow-sm transition-all relative overflow-hidden",
                        sensor.status === 'Critical' ? "border-red-500 shadow-red-500/20 ring-1 ring-red-500" : 
                        sensor.status === 'Warning' ? "border-orange-500/50" : "border-border/40"
                    )}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold">{sensor.name}</h3>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Activity className="h-3 w-3" />
                                    {sensor.type} • {sensor.location}
                                </div>
                            </div>
                            <div className={cn(
                                "px-2 py-1 rounded text-xs font-bold uppercase",
                                sensor.status === 'Critical' ? "bg-red-500 text-white animate-pulse" :
                                sensor.status === 'Warning' ? "bg-orange-500/10 text-orange-500" : "bg-green-500/10 text-green-500"
                            )}>
                                {sensor.status}
                            </div>
                        </div>

                        <div className="flex items-end gap-2 mb-4">
                            <span className="text-4xl font-mono font-bold tracking-tighter">
                                {sensor.value.toFixed(1)}
                            </span>
                            <span className="text-sm text-muted-foreground mb-1">{sensor.unit}</span>
                        </div>

                        {/* Sparkline visualization using simple flex bars */}
                        <div className="h-12 flex items-end gap-0.5 opacity-50">
                            {sensor.history.map((val, i) => (
                                <div 
                                    key={i} 
                                    className={cn(
                                        "flex-1 rounded-t-sm transition-all duration-300",
                                        val > sensor.threshold ? "bg-red-500" : 
                                        val > sensor.threshold * 0.85 ? "bg-orange-500" : "bg-primary"
                                    )}
                                    style={{ height: `${Math.min((val / (sensor.threshold * 1.5)) * 100, 100)}%` }}
                                />
                            ))}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-border/10 flex justify-between items-center text-xs text-muted-foreground">
                            <span>Threshold: {sensor.threshold} {sensor.unit}</span>
                            {sensor.status === 'Critical' && (
                                <span className="flex items-center text-red-500 font-bold">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    WO Created
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Simulation Controls */}
            <div className="mt-12 p-6 bg-muted/20 border border-border/20 rounded-xl">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Simulation Controls</h3>
                <div className="flex gap-4">
                    <Button 
                        variant={anomalyTriggered ? "destructive" : "outline"} 
                        onClick={toggleAnomaly}
                        className={cn(anomalyTriggered && "animate-pulse")}
                    >
                        <Power className="mr-2 h-4 w-4" />
                        {anomalyTriggered ? "Stop Anomaly Injection" : "Inject Anomaly (Chiller A)"}
                    </Button>
                </div>
                {lastAlert && (
                    <div className="mt-4 text-sm text-green-500 font-mono">
                        &gt; {lastAlert}
                    </div>
                )}
            </div>
        </div>
    );
}
