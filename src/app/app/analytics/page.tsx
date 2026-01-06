'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { BarChart, TrendingUp, DollarSign, Clock, AlertTriangle } from 'lucide-react';

// Mock Data for Demo
const KPI_DATA = {
  completion: [65, 78, 82, 75, 88, 92, 95],
  slaBreach: [12, 10, 8, 15, 5, 3, 2],
  spend: [12000, 15000, 11000, 18000, 14000, 22000, 19000],
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};

export default function AnalyticsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-serif tracking-tight">Analytics & Insights</h1>
          <p className="text-muted-foreground">Operational KPIs, financial performance, and team efficiency metrics.</p>
        </div>
        <Select defaultValue="this_week">
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this_week">This Week</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
                <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
            title="SLA Compliance" 
            value="98.2%" 
            change="+2.1%" 
            trend="up" 
            icon={<Clock className="h-4 w-4 text-muted-foreground" />} 
        />
        <KPICard 
            title="Maintenance Spend" 
            value="$42,500" 
            change="-5.4%" 
            trend="down" 
            goodTrend="down"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} 
        />
        <KPICard 
            title="Open Work Orders" 
            value="142" 
            change="+12" 
            trend="up" 
            goodTrend="down"
            icon={<BarChart className="h-4 w-4 text-muted-foreground" />} 
        />
        <KPICard 
            title="Critical Alerts" 
            value="3" 
            change="-2" 
            trend="down" 
            goodTrend="down"
            icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />} 
        />
      </div>

      <Tabs defaultValue="ops">
        <TabsList>
            <TabsTrigger value="ops">Operations</TabsTrigger>
            <TabsTrigger value="financial">Financials</TabsTrigger>
            <TabsTrigger value="assets">Asset Health</TabsTrigger>
        </TabsList>

        <TabsContent value="ops" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Work Order Completion</CardTitle>
                        <CardDescription>Daily completion rates vs target</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-end justify-between gap-4 px-4 pt-8 pb-2">
                            {KPI_DATA.completion.map((val, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                                    <div className="w-full bg-secondary/30 rounded-t-md relative h-full flex items-end overflow-hidden">
                                        <div 
                                            className="w-full bg-primary transition-all duration-500 group-hover:bg-primary/90"
                                            style={{ height: `${val}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-muted-foreground font-mono">{KPI_DATA.days[i]}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>SLA Breaches</CardTitle>
                        <CardDescription>Missed response times by day</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-end justify-between gap-4 px-4 pt-8 pb-2">
                             {KPI_DATA.slaBreach.map((val, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                                    <div className="w-full bg-secondary/30 rounded-t-md relative h-full flex items-end overflow-hidden">
                                        <div 
                                            className="w-full bg-red-500 transition-all duration-500 group-hover:bg-red-600"
                                            style={{ height: `${val * 5}%` }} // Scale for visual
                                        />
                                    </div>
                                    <span className="text-xs text-muted-foreground font-mono">{KPI_DATA.days[i]}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
        
        <TabsContent value="financial">
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Spend Velocity</CardTitle>
                    <CardDescription>Maintenance spend across all categories</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="h-[300px] flex items-end justify-between gap-4 px-4 pt-8 pb-2">
                             {KPI_DATA.spend.map((val, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                                    <div className="w-full bg-secondary/30 rounded-t-md relative h-full flex items-end overflow-hidden">
                                        <div 
                                            className="w-full bg-green-500 transition-all duration-500 group-hover:bg-green-600"
                                            style={{ height: `${(val / 25000) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-muted-foreground font-mono">{KPI_DATA.days[i]}</span>
                                </div>
                            ))}
                        </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface KPICardProps {
    title: string;
    value: string | number;
    change: string;
    trend: 'up' | 'down';
    goodTrend?: 'up' | 'down';
    icon: React.ReactNode;
}

function KPICard({ title, value, change, trend, goodTrend = 'up', icon }: KPICardProps) {
    const isPositive = (trend === 'up' && goodTrend === 'up') || (trend === 'down' && goodTrend === 'down');
    
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className={cn("text-xs flex items-center mt-1", isPositive ? "text-green-500" : "text-red-500")}>
                    <TrendingUp className={cn("h-3 w-3 mr-1", trend === 'down' && "rotate-180")} />
                    {change} from last week
                </p>
            </CardContent>
        </Card>
    );
}
