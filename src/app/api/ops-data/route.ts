import { NextResponse } from 'next/server';
import { getDb } from '@/lib/demo/persistence';
import { getNextSlot } from '@/lib/domain/scheduling';

export const dynamic = 'force-dynamic';

export async function GET() {
    const db = await getDb();
    const rules = db.schedulingRules[0] || {
        id: 'default',
        tenantId: 't1',
        minimumLeadTimeMinutes: 180,
        minimumGapMinutes: 120,
        defaultDurationMinutes: 60
    };

    const nextSlot = getNextSlot(rules, db.appointments);
    
    // Format next slot relative to today
    const now = new Date();
    const isToday = nextSlot.getDate() === now.getDate() && nextSlot.getMonth() === now.getMonth() && nextSlot.getFullYear() === now.getFullYear();
    const timeStr = nextSlot.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const dayStr = isToday ? 'Today' : nextSlot.toLocaleDateString('en-US', { weekday: 'short' });
    
    const formattedNextSlot = `${dayStr}, ${timeStr}`;
    
    // Check if can come today (if next slot is today)
    const canComeToday = isToday;

    return NextResponse.json({
        availability: {
            status: canComeToday ? 'Available' : 'Limited',
            nextSlot: formattedNextSlot,
            canComeToday
        },
        weather: {
            temp: 72,
            condition: 'Clear'
        },
        userLocation: 'Gulf Coast',
        activeZones: [
            { name: "Zone A", status: "Active", activeJobs: 3 },
            { name: "Zone B", status: "Idle", activeJobs: 0 },
            { name: "Zone C", status: "Active", activeJobs: 5 },
        ],
        recentActivity: [
            { id: "1", timestamp: "10:42 AM", action: "Dispatch Confirmed: WO-2941", location: "Miami" },
            { id: "2", timestamp: "10:38 AM", action: "IoT Alert: HVAC Unit 4", location: "Orlando" },
            { id: "3", timestamp: "10:35 AM", action: "Inventory Low: Filter 20x20", location: "Tampa" }
        ]
    });
}
