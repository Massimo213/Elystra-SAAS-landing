/**
 * Demo Booking API
 * Receives qualified demo bookings from in-site flow.
 * Creates Calendly event via Scheduling API — no redirect.
 *
 * Env: CALENDLY_API_TOKEN, CALENDLY_EVENT_TYPE_URI, CALENDLY_LOCATION_KIND (optional)
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
  slotDateTime: string; // ISO 8601 UTC
  timezone?: string; // IANA e.g. America/New_York
}

/** Normalize to E.164 for Calendly SMS reminders (e.g. +15551234567) */
function toE164(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10 && !phone.startsWith("+")) {
    return "+1" + digits; // US default
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return "+" + digits;
  }
  return phone.startsWith("+") ? phone : "+" + digits;
}

const CALENDLY_BASE = "https://api.calendly.com";

async function createCalendlyInvitee(payload: DemoBookingPayload): Promise<{
  event: string;
  cancelUrl: string;
  rescheduleUrl: string;
}> {
  const token = process.env.CALENDLY_API_TOKEN;
  const eventTypeUri = process.env.CALENDLY_EVENT_TYPE_URI;
  const locationKind = process.env.CALENDLY_LOCATION_KIND || "zoom_conference";

  if (!token || !eventTypeUri) {
    throw new Error(
      "Calendly not configured. Set CALENDLY_API_TOKEN and CALENDLY_EVENT_TYPE_URI."
    );
  }

  const timezone = payload.timezone || "America/New_York";
  const phoneE164 = payload.phone ? toE164(payload.phone) : null;

  const invitee: Record<string, unknown> = {
    name: payload.name,
    email: payload.email,
    timezone,
  };
  if (phoneE164) {
    invitee.text_reminder_number = phoneE164;
  }

  const body: Record<string, unknown> = {
    event_type: eventTypeUri,
    start_time: payload.slotDateTime,
    invitee,
    tracking: {
      utm_source: "website",
      utm_medium: "demo_booking",
    },
  };

  // Location required if event type has one; omit if event type has no location
  if (locationKind) {
    body.location = { kind: locationKind };
  }

  // Answer required "Phone number for reminders" custom question (SMS follow-up)
  if (phoneE164) {
    body.questions_and_answers = [
      { question: "Phone number for reminders", answer: phoneE164, position: 0 },
    ];
  }

  // Agency/qual data: log for your CRM; Calendly invitee creation doesn't support
  // custom questions via API — add "Agency Name" etc. in Calendly event type if needed
  console.log("Demo booking qual data:", {
    agencyName: payload.agencyName,
    proposalsPerMonth: payload.proposalsPerMonth,
    avgDealSize: payload.avgDealSize,
    role: payload.role,
    agencyType: payload.agencyType,
  });

  const res = await fetch(`${CALENDLY_BASE}/invitees`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    const errMsg =
      data?.message || data?.errors?.[0]?.message || data?.title || res.statusText;
    console.error("Calendly API error:", { status: res.status, data });
    throw new Error(errMsg || `Calendly API error: ${res.status}`);
  }

  return {
    event: data.resource?.uri || "",
    cancelUrl: data.resource?.cancel_url || "",
    rescheduleUrl: data.resource?.reschedule_url || "",
  };
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
      !body.email ||
      !body.email.includes("@") ||
      !body.phone ||
      !body.slotDateTime
    ) {
      res.status(400).json({
        success: false,
        error: "Missing required fields: name, agencyName, email, phone, slotDateTime",
      });
      return;
    }

    const result = await createCalendlyInvitee(body);

    res.status(200).json({
      success: true,
      message: "Demo booked. We'll send a calendar invite shortly.",
      cancelUrl: result.cancelUrl,
      rescheduleUrl: result.rescheduleUrl,
    });
  } catch (err) {
    console.error("Demo booking error:", err);
    const msg = err instanceof Error ? err.message : "Booking failed. Please try again.";
    res.status(500).json({
      success: false,
      error: msg,
    });
  }
}
