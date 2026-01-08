
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Basic honeypot check
    if (data.company) {
      return NextResponse.json({ success: true }, { status: 200 }); // Silent success
    }

    // In a real app, you would send an email here using Resend, SendGrid, etc.
    // For now, we'll just log it.
    console.log("New Lead Received:", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.serviceType,
        message: data.message,
        address: data.address
    });

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
