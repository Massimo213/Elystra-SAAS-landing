/**
 * Demo Booking API
 * Receives qualified demo bookings from in-site flow.
 * Sends email to elystrateam@gmail.com — you configure the meeting manually.
 * No Calendly dependency.
 */

interface DemoBookingPayload {
  name: string;
  agencyName: string;
  email: string;
  phone: string;
  proposalsPerMonth: string;
  avgDealSize: string;
  role: string;
  agencyType: string;
  slotDate: string; // YYYY-MM-DD
  slotTime: string; // HH:MM
}

const TEAM_EMAIL = "elystrateam@gmail.com";

async function sendBookingEmail(payload: DemoBookingPayload): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL || "onboarding@elystra.online";
  const fromName = process.env.SENDGRID_FROM_NAME || "Elystra";

  if (!apiKey) {
    throw new Error("SENDGRID_API_KEY not configured");
  }

  const subject = `Demo Request: ${payload.name} @ ${payload.agencyName} – ${payload.slotDate} ${payload.slotTime}`;

  const textBody = `
New demo booking from website

--- Lead ---
Name: ${payload.name}
Agency: ${payload.agencyName}
Email: ${payload.email}
Phone: ${payload.phone}

--- Qualification ---
Proposals/month: ${payload.proposalsPerMonth}
Deal size: ${payload.avgDealSize}
Role: ${payload.role}
Agency type: ${payload.agencyType}

--- Requested slot ---
Date: ${payload.slotDate}
Time: ${payload.slotTime}

---
Create the meeting and send the calendar invite to ${payload.email}
`.trim();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>body{font-family:-apple-system,sans-serif;line-height:1.6;color:#333;max-width:540px;margin:0 auto;padding:24px}h2{margin:0 0 16px;font-size:18px}.section{margin:16px 0;padding:16px;background:#f5f5f5;border-radius:8px}.section strong{display:inline-block;width:140px}table{width:100%;border-collapse:collapse}td{padding:6px 0;border-bottom:1px solid #eee}.slot{font-size:18px;font-weight:600;color:#7c3aed}</style></head>
<body>
  <h2>New demo booking</h2>
  <div class="section">
    <strong>Lead</strong><br>
    ${payload.name} · ${payload.agencyName}<br>
    <a href="mailto:${payload.email}">${payload.email}</a> · ${payload.phone}
  </div>
  <div class="section">
    <strong>Qualification</strong><br>
    ${payload.proposalsPerMonth} proposals/mo · ${payload.avgDealSize} deal · ${payload.role} · ${payload.agencyType}
  </div>
  <div class="section">
    <strong>Requested slot</strong><br>
    <span class="slot">${payload.slotDate} at ${payload.slotTime}</span>
  </div>
  <p>Create the meeting and send the calendar invite to <a href="mailto:${payload.email}">${payload.email}</a></p>
</body>
</html>
`;

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: TEAM_EMAIL }], subject }],
      from: { email: fromEmail, name: fromName },
      content: [
        { type: "text/plain", value: textBody },
        { type: "text/html", value: htmlBody },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`SendGrid: ${err}`);
  }
}

const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 5;
  const record = rateLimit.get(ip);
  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (record.count >= maxRequests) return false;
  record.count++;
  return true;
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const ip = req.headers["x-forwarded-for"] || "unknown";
  if (!checkRateLimit(ip)) {
    res.status(429).json({ success: false, error: "Too many requests" });
    return;
  }

  try {
    const body: DemoBookingPayload = req.body;

    if (
      !body.name ||
      !body.agencyName ||
      !body.email?.includes("@") ||
      !body.phone ||
      !body.slotDate ||
      !body.slotTime
    ) {
      res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
      return;
    }

    await sendBookingEmail(body);

    res.status(200).json({
      success: true,
      message: "We'll send a calendar invite shortly.",
    });
  } catch (err) {
    console.error("Demo booking error:", err);
    res.status(500).json({
      success: false,
      error: "Booking failed. Please try again.",
    });
  }
}
