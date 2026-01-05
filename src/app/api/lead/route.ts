
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Lead Received:", body);

    // Here we would send email or save to DB

    return NextResponse.json({ ok: true, id: Date.now() });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json({ ok: false, error: "Failed to process lead" }, { status: 500 });
  }
}
