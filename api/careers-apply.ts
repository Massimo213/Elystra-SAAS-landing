/**
 * Careers Apply API
 * Stores applications in Supabase + emails elystrateam@gmail.com.
 * SDR applications may include a call recording (attachment or link).
 */

import {
  buildStoragePath,
  insertCareerApplication,
  isSupabaseConfigured,
  uploadApplicationFile,
} from "./lib/supabase-admin.js";

interface CareersApplyPayload {
  name: string;
  email: string;
  role: string;
  message: string;
  cvFilename: string;
  cvContentBase64: string;
  cvMimeType: string;
  recordingFilename?: string;
  recordingContentBase64?: string;
  recordingMimeType?: string;
  recordingLink?: string;
}

const TEAM_EMAIL = "elystrateam@gmail.com";

const ALLOWED_CV_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const ALLOWED_RECORDING_MIME = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "audio/mpeg",
  "audio/mp4",
  "audio/wav",
  "audio/x-m4a",
  "audio/m4a",
]);

const MAX_CV_BYTES = 4 * 1024 * 1024;
const MAX_RECORDING_BYTES = 15 * 1024 * 1024;

function isSdrRole(role: string): boolean {
  return /sales development representative|\bsdr\b/i.test(role);
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

async function sendApplicationEmail(payload: CareersApplyPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL || "onboarding@elystra.online";
  const fromName = process.env.SENDGRID_FROM_NAME || "Elystra Careers";

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.log("[careers-apply] DEV — no RESEND_API_KEY, skipping email:", {
        name: payload.name,
        email: payload.email,
        role: payload.role,
        cvFilename: payload.cvFilename,
        recordingFilename: payload.recordingFilename,
        recordingLink: payload.recordingLink,
        messageLength: payload.message.length,
      });
      return;
    }
    throw new Error("RESEND_API_KEY not configured");
  }

  const subject = `Career application: ${payload.role} — ${payload.name}`;

  const recordingLine = payload.recordingLink
    ? `Recording link: ${payload.recordingLink}`
    : payload.recordingFilename
      ? `Recording: ${payload.recordingFilename} (attached)`
      : "Recording: —";

  const adminUrl = "https://elystra.online/admin/applications";

  const textBody = [
    "New career application",
    "",
    `Role:    ${payload.role}`,
    `Name:    ${payload.name}`,
    `Email:   ${payload.email}`,
    `CV:      ${payload.cvFilename}`,
    recordingLine,
    "",
    "Message:",
    payload.message,
    "",
    `Review in admin inbox: ${adminUrl}`,
  ].join("\n");

  const recordingHtml = payload.recordingLink
    ? `<p>Recording: <a href="${escapeAttr(payload.recordingLink)}">${escapeHtml(payload.recordingLink)}</a></p>`
    : payload.recordingFilename
      ? `<p>Recording attached: <strong>${escapeHtml(payload.recordingFilename)}</strong></p>`
      : "";

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 560px; margin: 0 auto; padding: 24px; }
    h2 { margin: 0 0 16px; font-size: 18px; }
    .section { margin: 16px 0; padding: 16px; background: #f5f5f5; border-radius: 8px; }
    .role { font-size: 20px; font-weight: 600; color: #7c3aed; }
    .msg { white-space: pre-wrap; }
  </style>
</head>
<body>
  <h2>New career application</h2>
  <div class="section">
    <span class="role">${escapeHtml(payload.role)}</span><br><br>
    <strong>${escapeHtml(payload.name)}</strong><br>
    <a href="mailto:${escapeAttr(payload.email)}">${escapeHtml(payload.email)}</a>
  </div>
  <div class="section">
    <strong>Message</strong>
    <p class="msg">${escapeHtml(payload.message)}</p>
  </div>
  <p>CV attached: <strong>${escapeHtml(payload.cvFilename)}</strong></p>
  ${recordingHtml}
  <p style="margin-top: 24px;">
    <a href="${adminUrl}" style="color: #7c3aed; font-weight: 600;">Open applications inbox</a>
  </p>
</body>
</html>`;

  const attachments: { filename: string; content: string }[] = [
    {
      filename: payload.cvFilename,
      content: payload.cvContentBase64,
    },
  ];

  if (payload.recordingFilename && payload.recordingContentBase64) {
    attachments.push({
      filename: payload.recordingFilename,
      content: payload.recordingContentBase64,
    });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      to: [TEAM_EMAIL],
      reply_to: payload.email,
      subject,
      text: textBody,
      html: htmlBody,
      attachments,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend: ${err}`);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);
  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 60_000 });
    return true;
  }
  if (record.count >= 3) return false;
  record.count++;
  return true;
}

function estimateBase64Bytes(b64: string): number {
  const padding = b64.endsWith("==") ? 2 : b64.endsWith("=") ? 1 : 0;
  return Math.floor((b64.length * 3) / 4) - padding;
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
    res.status(429).json({ success: false, error: "Too many requests. Try again in a minute." });
    return;
  }

  try {
    const body: CareersApplyPayload = req.body;

    if (
      !body.name?.trim() ||
      !body.email?.includes("@") ||
      !body.role?.trim() ||
      !body.message?.trim() ||
      !body.cvFilename?.trim() ||
      !body.cvContentBase64 ||
      !body.cvMimeType
    ) {
      res.status(400).json({ success: false, error: "Missing required fields" });
      return;
    }

    if (!ALLOWED_CV_MIME.has(body.cvMimeType)) {
      res.status(400).json({ success: false, error: "CV must be PDF or Word (.doc / .docx)" });
      return;
    }

    if (estimateBase64Bytes(body.cvContentBase64) > MAX_CV_BYTES) {
      res.status(400).json({ success: false, error: "CV must be under 4MB" });
      return;
    }

    const hasRecordingFile = Boolean(body.recordingFilename && body.recordingContentBase64);
    const recordingLink = body.recordingLink?.trim() ?? "";

    if (isSdrRole(body.role) && !hasRecordingFile && !recordingLink) {
      res.status(400).json({
        success: false,
        error: "SDR applications require a call recording file or link.",
      });
      return;
    }

    if (recordingLink && !isValidUrl(recordingLink)) {
      res.status(400).json({ success: false, error: "Recording link must be a valid URL." });
      return;
    }

    if (hasRecordingFile) {
      if (!body.recordingMimeType || !ALLOWED_RECORDING_MIME.has(body.recordingMimeType)) {
        res.status(400).json({
          success: false,
          error: "Recording must be M4A, MP3, WAV, MP4, WebM, or MOV.",
        });
        return;
      }

      if (estimateBase64Bytes(body.recordingContentBase64!) > MAX_RECORDING_BYTES) {
        res.status(400).json({ success: false, error: "Recording must be under 15MB." });
        return;
      }
    }

    const payload = {
      name: body.name.trim().slice(0, 120),
      email: body.email.trim().slice(0, 200),
      role: body.role.trim().slice(0, 120),
      message: body.message.trim().slice(0, 5000),
      cvFilename: body.cvFilename.trim().slice(0, 200),
      cvContentBase64: body.cvContentBase64,
      cvMimeType: body.cvMimeType,
      recordingFilename: hasRecordingFile ? body.recordingFilename!.trim().slice(0, 200) : undefined,
      recordingContentBase64: hasRecordingFile ? body.recordingContentBase64 : undefined,
      recordingMimeType: hasRecordingFile ? body.recordingMimeType : undefined,
      recordingLink: recordingLink ? recordingLink.slice(0, 500) : undefined,
    };

    if (isSupabaseConfigured()) {
      try {
        const applicationId = crypto.randomUUID();
        const cvPath = buildStoragePath(applicationId, payload.cvFilename, "cv");
        await uploadApplicationFile(cvPath, payload.cvContentBase64, payload.cvMimeType);

        let recordingPath: string | undefined;
        if (payload.recordingFilename && payload.recordingContentBase64 && payload.recordingMimeType) {
          recordingPath = buildStoragePath(applicationId, payload.recordingFilename, "recording");
          await uploadApplicationFile(
            recordingPath,
            payload.recordingContentBase64,
            payload.recordingMimeType
          );
        }

        await insertCareerApplication({
          name: payload.name,
          email: payload.email,
          role: payload.role,
          message: payload.message,
          status: "new",
          admin_notes: null,
          cv_filename: payload.cvFilename,
          cv_mime_type: payload.cvMimeType,
          cv_storage_path: cvPath,
          recording_filename: payload.recordingFilename ?? null,
          recording_mime_type: payload.recordingMimeType ?? null,
          recording_storage_path: recordingPath ?? null,
          recording_link: payload.recordingLink ?? null,
        });
      } catch (storageErr) {
        console.error("[careers-apply] Admin storage failed (email will still send):", storageErr);
      }
    }

    await sendApplicationEmail(payload);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Careers apply error:", err);
    res.status(500).json({ success: false, error: "Could not send application. Please try again." });
  }
}
