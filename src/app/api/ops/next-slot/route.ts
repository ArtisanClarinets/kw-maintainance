import { NextResponse } from "next/server";
import { getDb } from "@/lib/demo/persistence";
import { getNextSlot } from "@/lib/domain/scheduling";

export async function GET() {
  const db = await getDb();
  const rules = db.schedulingRules[0];
  if (!rules) {
    return NextResponse.json({ error: "Scheduling rules missing" }, { status: 500 });
  }

  const now = new Date();
  const nextSlot = getNextSlot(rules, db.appointments, now);
  const upcoming = db.appointments
    .filter((appt) => appt.status !== "cancelled")
    .filter((appt) => new Date(appt.startAt) > now)
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
    .slice(0, 3); // Keep next few

  const nextAppointment = upcoming[0] ?? null;

  return NextResponse.json({
    nextSlot: nextSlot.toISOString(),
    candidateA: new Date(now.getTime() + rules.minimumLeadTimeMinutes * 60000).toISOString(),
    candidateB: nextAppointment
      ? new Date(new Date(nextAppointment.endAt).getTime() + rules.minimumGapMinutes * 60000).toISOString()
      : now.toISOString(),
    nextAppointment,
    upcoming,
    rules: {
      minimumLeadTimeMinutes: rules.minimumLeadTimeMinutes,
      minimumGapMinutes: rules.minimumGapMinutes,
    },
  });
}
