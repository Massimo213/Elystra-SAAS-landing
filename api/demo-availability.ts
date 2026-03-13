/**
 * Demo Availability API
 * Fetches real available slots from Calendly.
 * start_time for booking MUST come from this — arbitrary times are rejected.
 */

const CALENDLY_BASE = "https://api.calendly.com";

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
    const slots = collection
      .map((s: { start_time?: string; start?: string }) => s.start_time || s.start)
      .filter(Boolean);
    res.status(200).json({
      success: true,
      slots,
    });
  } catch (err) {
    console.error("Availability error:", err);
    res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Failed to fetch availability",
    });
  }
}
