'use server';

import { getDb } from '@/lib/demo/persistence';
import { User } from '@/lib/domain/schema';

// Types for Dispatch
export interface DispatchCandidate {
    user: User;
    score: number;
    factors: {
        skillMatch: number;
        proximity: number;
        workload: number;
        slaPressure: number;
    };
}

// Deterministic random for demo
function seededRandom(seed: number) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

export async function runDispatchSimulation(workOrderId: string) {
    const db = await getDb();
    const wo = db.workOrders.find(w => w.id === workOrderId);
    if (!wo) throw new Error("Work Order not found");

    // Filter for tech users
    const techs = db.users.filter(u => u.role === 'tech');

    // Simulate scoring
    const candidates: DispatchCandidate[] = techs.map((tech) => {
        // Generate pseudo-random factors based on tech ID and WO ID to be consistent
        const seed = tech.id.charCodeAt(0) + wo.id.charCodeAt(0);
        
        // Skill Match (Hard constraint simulation - higher is better)
        const skillMatch = 0.5 + (seededRandom(seed) * 0.5); // 0.5 - 1.0

        // Proximity (Soft constraint - higher is closer)
        const proximity = seededRandom(seed + 1);

        // Workload (Inverse - higher score means LESS busy)
        const workload = seededRandom(seed + 2);

        // SLA Pressure (Constant for WO, but affects weight)
        const slaPressure = wo.priority === 'Critical' ? 1.0 : wo.priority === 'High' ? 0.8 : 0.5;

        // Weighted Score Formula
        // Score = (Skill * 0.4) + (Proximity * 0.3) + (Workload * 0.3) + (SLA * 0.1 bonus)
        const score = (skillMatch * 0.4) + (proximity * 0.3) + (workload * 0.3) + (slaPressure * 0.1);

        return {
            user: tech,
            score: Number(score.toFixed(2)),
            factors: {
                skillMatch: Number(skillMatch.toFixed(2)),
                proximity: Number(proximity.toFixed(2)),
                workload: Number(workload.toFixed(2)),
                slaPressure
            }
        };
    });

    // Sort by score desc
    return candidates.sort((a, b) => b.score - a.score);
}

export async function massReshuffle() {
    // Simulate a system-wide optimization
    // In a real system this would reassign multiple WOs
    // For demo, we just return a success message and maybe some stats
    
    await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay

    return {
        success: true,
        moves: 12,
        efficiencyGain: "14%"
    };
}
