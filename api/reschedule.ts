/**
 * Reschedule API
 * Receives a slot selection from /reschedule.
 * Sends a notification email to elystrateam@gmail.com so the team can
 * update the calendar invite. No Calendly dependency.
 */

interface ReschedulePayload {
  name: string;
  email: string;
  token?: string;
  slotDate: string; // YYYY-MM-DD
  slotTime: string; // HH:MM
  proposed?: boolean;
}

const TEAM_EMAIL = "elystrateam@gmail.com";

function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

async function sendRescheduleEmail(payload: ReschedulePayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL || "onboarding@elystra.online";
  const fromName = process.env.SENDGRID_FROM_NAME || "Elystra";

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.log("[reschedule] DEV — no RESEND_API_KEY, skipping email:", payload);
      return;
    }
    throw new Error("RESEND_API_KEY not configured");
  }

  const displayTime = formatTime(payload.slotTime);
  const kind = payload.proposed ? "Proposed time" : "Reschedule";
  const subject = `${kind}: ${payload.name} → ${payload.slotDate} at ${displayTime}`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 540px; margin: 0 auto; padding: 24px; }
    h2 { margin: 0 0 16px; font-size: 18px; }
    .section { margin: 16px 0; padding: 16px; background: #f5f5f5; border-radius: 8px; }
    .slot { font-size: 22px; font-weight: 600; color: #7c3aed; }
    .token { font-size: 11px; color: #999; }
  </style>
</head>
<body>
  <h2>${payload.proposed ? "Custom time proposed" : "Demo rescheduled"}</h2>
  <div class="section">
    <strong>${payload.name}</strong><br>
    <a href="mailto:${payload.email}">${payload.email}</a>
    ${payload.token ? `<br><span class="token">Token: ${payload.token}</span>` : ""}
  </div>
  <div class="section">
    <strong>${payload.proposed ? "Proposed slot" : "New slot"}</strong><br>
    <span class="slot">${payload.slotDate} at ${displayTime}</span>
  </div>
  <p>Update the calendar invite for <a href="mailto:${payload.email}">${payload.email}</a></p>
</body>
</html>`;

  const textBody = [
    payload.proposed ? "Custom time proposed" : "Demo rescheduled",
    "",
    `Name:  ${payload.name}`,
    `Email: ${payload.email}`,
    ...(payload.token ? [`Token: ${payload.token}`] : []),
    "",
    `${payload.proposed ? "Proposed slot" : "New slot"}: ${payload.slotDate} at ${displayTime}`,
    "",
    `Update the calendar invite for ${payload.email}`,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      to: [TEAM_EMAIL],
      subject,
      text: textBody,
      html: htmlBody,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend: ${err}`);
  }
}

const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);
  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 60_000 });
    return true;
  }
  if (record.count >= 5) return false;
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

  const ip = req.headers["x-forwarded-for"] ?? "unknown";
  if (!checkRateLimit(ip)) {
    res.status(429).json({ success: false, error: "Too many requests" });
    return;
  }

  try {
    const body: ReschedulePayload = req.body;

    if (!body.name || !body.email?.includes("@") || !body.slotDate || !body.slotTime) {
      res.status(400).json({ success: false, error: "Missing required fields" });
      return;
    }

    await sendRescheduleEmail(body);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Reschedule error:", err);
    res.status(500).json({ success: false, error: "Booking failed. Please try again." });
  }
}
