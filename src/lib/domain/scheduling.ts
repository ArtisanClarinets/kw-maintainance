import { Appointment, SchedulingRules } from './schema';

export function getNextSlot(
  rules: SchedulingRules,
  appointments: Appointment[],
  now: Date = new Date()
): Date {
  // 1. candidateA = now + minimumLeadTimeMinutes
  const candidateA = new Date(now.getTime() + rules.minimumLeadTimeMinutes * 60000);

  // 2. Find next scheduled appointment (startAt > now)
  const futureAppts = appointments
    .filter(a => new Date(a.startAt) > now && a.status !== 'cancelled')
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

  const nextAppt = futureAppts[0];
  
  let candidateB: Date;
  
  if (nextAppt) {
      // candidateB = nextAppt.endAt + minimumGapMinutes
      const endAt = new Date(nextAppt.endAt);
      candidateB = new Date(endAt.getTime() + rules.minimumGapMinutes * 60000);
  } else {
      // candidateB = now
      candidateB = now;
  }

  // 3. nextSlot = max(candidateA, candidateB)
  return candidateA > candidateB ? candidateA : candidateB;
}

export function validateAppointment(
    appt: { startAt: string, endAt: string },
    rules: SchedulingRules,
    existingAppointments: Appointment[],
    now: Date = new Date()
): { valid: boolean; error?: string } {
    const start = new Date(appt.startAt);
    const end = new Date(appt.endAt);
    
    // Check lead time
    const minStart = new Date(now.getTime() + rules.minimumLeadTimeMinutes * 60000);
    if (start < minStart) {
        return { valid: false, error: `Appointment must be scheduled at least ${rules.minimumLeadTimeMinutes} minutes in advance.` };
    }

    // Check gap with other appointments
    for (const existing of existingAppointments) {
        if (existing.status === 'cancelled') continue;
        const eStart = new Date(existing.startAt);
        const eEnd = new Date(existing.endAt);
        
        // Check overlap
        if (start < eEnd && end > eStart) {
            return { valid: false, error: "Time slot overlaps with an existing appointment." };
        }
        
        // Check gap
        // If existing is before new
        if (eEnd <= start) {
            const gap = (start.getTime() - eEnd.getTime()) / 60000;
            if (gap < rules.minimumGapMinutes) {
                 return { valid: false, error: `Must leave ${rules.minimumGapMinutes} min gap after previous appointment.` };
            }
        }
        
        // If new is before existing
        if (end <= eStart) {
            const gap = (eStart.getTime() - end.getTime()) / 60000;
            if (gap < rules.minimumGapMinutes) {
                 return { valid: false, error: `Must leave ${rules.minimumGapMinutes} min gap before next appointment.` };
            }
        }
    }

    return { valid: true };
}
