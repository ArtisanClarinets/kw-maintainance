import { NextResponse } from 'next/server';
import { loadServerConfig } from '@/lib/server-config/load';
import { checkRateLimit } from '@/lib/security/rateLimit';
import { getClientIp } from '@/lib/security/request';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { decrypt } from '@/lib/server-config/crypto';

// Schema for the lead payload
const LeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"), // Basic validation
  service: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  // Honeypot field (should be empty)
  company: z.string().max(0, "Bot detected").optional(),
  // Timestamp for timing check
  timestamp: z.number().int().optional(),
});

export async function POST(request: Request) {
  try {
    const config = await loadServerConfig();

    // 1. Check if lead processing is enabled
    if (!config.leadProcessing.enabled) {
        return NextResponse.json({ ok: false, error: "Service currently unavailable" }, { status: 503 });
    }

    // 2. Rate Limiting
    const ip = await getClientIp();
    const isAllowed = checkRateLimit(ip, config.leadProcessing.rateLimit);
    if (!isAllowed) {
        return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
    }

    // 3. Body Size and JSON parsing
    // Next.js handles body size limits via config, but we can double check length if needed.
    // For now, request.json() will read the body.
    let body;
    try {
        body = await request.json();
    } catch (e) {
        return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    // 4. Validation & Anti-Spam
    const parseResult = LeadSchema.safeParse(body);
    if (!parseResult.success) {
        // Log validation error but be vague to client
        console.warn(`Validation failed for IP ${ip}:`, parseResult.error.format());
        return NextResponse.json({ ok: false, error: "Invalid submission data" }, { status: 400 });
    }

    const data = parseResult.data;

    // Honeypot check (handled by Zod max(0) but explicit check here for clarity)
    if (data.company) {
        console.warn(`Honeypot triggered by IP ${ip}`);
        // Return success to confuse bot
        return NextResponse.json({ ok: true });
    }

    // Timing check
    if (data.timestamp) {
        const now = Date.now();
        const minTime = config.leadProcessing.spamControl.minSubmitTimeMs;
        if (now - data.timestamp < minTime) {
             console.warn(`Submission too fast from IP ${ip}`);
             return NextResponse.json({ ok: true }); // Silent reject
        }
    }

    // 5. Process Lead (Email or Log)
    if (config.notification.method === 'smtp' && config.smtp) {
        try {
            // Decrypt password if needed (it should be decrypted by loadServerConfig but let's be safe)
            // loadServerConfig calls readConfigFile which calls decryptSecrets.
            // So config.smtp.pass IS the plaintext password here.

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
                subject: `New Lead: ${data.name}`,
                text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.service || 'Not specified'}
Message: ${data.message}
                `,
            });
            console.log(`Email sent for lead from ${ip}`);
        } catch (emailError) {
            console.error("Failed to send email:", emailError);
            // Fallback to log?
            console.log(`[FALLBACK LOG] Lead: Name=${data.name}, Service=${data.service}`); // No PII in raw logs ideally, but this is fallback
        }
    } else {
        // Log-only mode
        // Mask PII
        const maskedEmail = data.email.replace(/(.{2})(.*)(@.*)/, "$1***$3");
        const maskedPhone = data.phone.replace(/(\d{3})\d+(\d{2})/, "$1******$2");
        console.log(`[LEAD] Name: ${data.name}, Email: ${maskedEmail}, Phone: ${maskedPhone}, Service: ${data.service}`);
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
