import { NextResponse } from 'next/server';
import { loadServerConfig } from '@/lib/server-config/load';
import { checkRateLimit } from '@/lib/security/rateLimit';
import { getClientIp } from '@/lib/security/request';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// Updated Schema
const LeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  companyName: z.string().min(1, "Company name is required"),
  role: z.string().optional(),
  portfolioSize: z.string().optional(), // Could be number, but form usually sends string
  message: z.string().min(1, "Message is required"),
  // Honeypot field (should be empty)
  company: z.string().max(0, "Bot detected").optional(),
  timestamp: z.number().int().optional(),
});

export async function POST(request: Request) {
  try {
    const config = await loadServerConfig();

    if (!config.leadProcessing.enabled) {
        return NextResponse.json({ ok: false, error: "Service currently unavailable" }, { status: 503 });
    }

    const ip = await getClientIp();
    const isAllowed = checkRateLimit(ip, config.leadProcessing.rateLimit);
    if (!isAllowed) {
        return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    const parseResult = LeadSchema.safeParse(body);
    if (!parseResult.success) {
        console.warn(`Validation failed for IP ${ip}`, parseResult.error.format());
        return NextResponse.json({ ok: false, error: "Invalid submission data" }, { status: 400 });
    }

    const data = parseResult.data;

    if (data.company) {
        return NextResponse.json({ ok: true });
    }

    if (data.timestamp) {
        const now = Date.now();
        const minTime = config.leadProcessing.spamControl.minSubmitTimeMs;
        if (now - data.timestamp < minTime) {
             return NextResponse.json({ ok: true }); 
        }
    }

    // Mask PII in logs
    console.log(`Lead received from ${ip}: ${data.email.replace(/(.{2})(.*)(@.*)/, "$1***$3")}`);

    if (config.notification.method === 'smtp' && config.smtp) {
        const transporter = nodemailer.createTransport({
            host: config.smtp.host,
            port: config.smtp.port,
            secure: config.smtp.secure,
            auth: {
                user: config.smtp.user,
                pass: config.smtp.pass,
            },
        });

        await transporter.sendMail({
            from: config.notification.email.from || config.smtp.user,
            to: config.notification.email.to.join(','),
            subject: `New Demo Request: ${data.name} - ${data.companyName}`,
            text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.companyName}
Role: ${data.role || 'N/A'}
Portfolio Size: ${data.portfolioSize || 'N/A'}

Message:
${data.message}
            `,
        });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
