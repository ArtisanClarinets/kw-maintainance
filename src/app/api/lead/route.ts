import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/demo/persistence';
import { Lead } from '@/lib/domain/schema';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Basic honeypot check
    if (data.company) {
      return NextResponse.json({ success: true }, { status: 200 }); // Silent success
    }

    const db = await getDb();

    const newLead: Lead = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      serviceType: data.serviceType || data.service, // Handle both forms
      message: data.message,
      address: data.address,
      companyName: data.companyName,
      portfolioSize: data.portfolioSize,
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    // Ensure leads array exists (in case of old DB file)
    if (!db.leads) {
      db.leads = [];
    }

    db.leads.push(newLead);
    await saveDb(db);

    console.log("New Lead Saved:", newLead);

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: "Lead captured" });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
