/**
 * Demo Availability API
 * Fetches real available slots from Calendly.
 * Filters to a controlled, varied set per weekday — not the same sequence every day.
 */

const CALENDLY_BASE = "https://api.calendly.com";

/** Per-weekday preferred times (0=Sun … 6=Sat). Vary by day — not the same sequence. */
const PREFERRED_TIMES_BY_WEEKDAY: Record<number, string[]> = {
  0: ["10:00", "14:00"],
  1: ["09:00", "10:30", "12:00", "15:00", "17:00"],
  2: ["08:30", "11:30", "14:00", "16:30"],
  3: ["08:30", "11:30", "12:00", "14:00", "16:00"],
  4: ["09:30", "11:00", "14:30", "17:00"],
  5: ["09:00", "10:00", "12:30", "15:30", "17:30"],
  6: ["10:00", "14:00"],
};

const DEMO_TIMEZONE = process.env.DEMO_AVAILABILITY_TIMEZONE || "America/New_York";

function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

/** Pick slots that best match preferred times for each date. Max one slot per preferred window. */
function filterToPreferredSlots(
  slots: string[],
  timezone: string
): string[] {
  const byDate = new Map<string, string[]>();
  for (const iso of slots) {
    const d = new Date(iso);
    const dateStr = d.toLocaleDateString("en-CA", { timeZone: timezone });
    if (!byDate.has(dateStr)) byDate.set(dateStr, []);
    byDate.get(dateStr)!.push(iso);
  }

  const result: string[] = [];
  for (const [dateStr, dateSlots] of byDate.entries()) {
    const [y, m, day] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, day);
    const weekday = date.getDay();
    const preferred = PREFERRED_TIMES_BY_WEEKDAY[weekday] || ["10:00", "14:00"];
    const used = new Set<string>();

    for (const target of preferred) {
      const targetMin = parseTimeToMinutes(target);
      let best: string | null = null;
      let bestDist = Infinity;

      for (const iso of dateSlots) {
        if (used.has(iso)) continue;
        const slotDate = new Date(iso);
        const local = new Intl.DateTimeFormat("en-CA", {
          timeZone: timezone,
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        }).format(slotDate);
        const [h, m] = local.split(":").map(Number);
        const slotMin = (h || 0) * 60 + (m || 0);
        const dist = Math.min(
          Math.abs(slotMin - targetMin),
          Math.abs(slotMin - (targetMin + 24 * 60)),
          Math.abs(slotMin - (targetMin - 24 * 60))
        );
        if (dist < bestDist && dist <= 45) {
          bestDist = dist;
          best = iso;
        }
      }
      if (best) {
        used.add(best);
        result.push(best);
      }
    }
  }
  return result.sort();
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const token = process.env.CALENDLY_API_TOKEN;
  const eventTypeUri = process.env.CALENDLY_EVENT_TYPE_URI;

  if (!token || !eventTypeUri) {
    res.status(500).json({
      success: false,
      error: "Calendly not configured",
    });
    return;
  }

  try {
    // Calendly requires start_time and end_time IN THE FUTURE — use start of next hour
    const now = new Date();
    const startDate = new Date(now);
    startDate.setUTCHours(startDate.getUTCHours() + 1, 0, 0, 0);
    const startTime = startDate.toISOString();
    // Range cannot exceed 7 days
    const endDate = new Date(startDate);
    endDate.setUTCDate(endDate.getUTCDate() + 6);
    endDate.setUTCHours(23, 59, 59, 999);
    const endTime = endDate.toISOString();

    const url = new URL(`${CALENDLY_BASE}/event_type_available_times`);
    url.searchParams.set("event_type", eventTypeUri);
    url.searchParams.set("start_time", startTime);
    url.searchParams.set("end_time", endTime);

    const calRes = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await calRes.json();

    if (!calRes.ok) {
      const details = data?.details || [];
      const detailMsgs = details.map(
        (d: { parameter?: string; code?: string; message?: string }) =>
          `${d.parameter || "?"}: ${d.code || d.message || "invalid"}`
      );
      const errDetail = detailMsgs.length ? detailMsgs.join("; ") : "";
      console.error("Calendly availability error:", {
        status: calRes.status,
        data,
        requested: { startTime, endTime, eventType: eventTypeUri },
      });
      res.status(calRes.status).json({
        success: false,
        error: errDetail || data?.message || "Failed to fetch availability",
      });
      return;
    }

    const collection = data?.collection || [];
    const rawSlots = collection
      .map((s: { start_time?: string; start?: string }) => s.start_time || s.start)
      .filter(Boolean) as string[];

    const slots = filterToPreferredSlots(rawSlots, DEMO_TIMEZONE);
    res.status(200).json({
      success: true,
      slots: slots.length > 0 ? slots : rawSlots,
    });
  } catch (err) {
    console.error("Availability error:", err);
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Failed to fetch availability",
    });
  }
}
