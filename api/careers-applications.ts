/**
 * Admin API — list and manage stored career applications.
 * Auth: Authorization: Bearer <CAREERS_ADMIN_PASSWORD>
 */

import {
  createSignedFileUrl,
  getCareerApplication,
  listCareerApplications,
  updateCareerApplication,
  type ApplicationStatus,
  isSupabaseConfigured,
} from "./lib/supabase-admin";
import { requireAdmin } from "./lib/careers-admin-auth";

const VALID_STATUSES = new Set<ApplicationStatus>(["new", "reviewed", "shortlisted", "rejected"]);

function parseQuery(url?: string) {
  if (!url) return new URLSearchParams();
  const q = url.includes("?") ? url.slice(url.indexOf("?")) : "";
  return new URLSearchParams(q);
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Careers-Admin-Token");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const auth = requireAdmin(req);
  if (!auth.ok) {
    res.status(auth.status).json({ success: false, error: auth.error });
    return;
  }

  if (!isSupabaseConfigured()) {
    res.status(503).json({
      success: false,
      error: "Application storage is not configured yet.",
    });
    return;
  }

  try {
    const query = parseQuery(req.url);

    if (req.method === "GET") {
      const id = query.get("id");
      if (id) {
        const application = await getCareerApplication(id);
        if (!application) {
          res.status(404).json({ success: false, error: "Application not found" });
          return;
        }

        const cvUrl = await createSignedFileUrl(application.cv_storage_path);
        let recordingUrl: string | null = null;
        if (application.recording_storage_path) {
          recordingUrl = await createSignedFileUrl(application.recording_storage_path);
        }

        res.status(200).json({
          success: true,
          application: {
            ...application,
            cv_url: cvUrl,
            recording_url: recordingUrl,
          },
        });
        return;
      }

      const status = query.get("status") as ApplicationStatus | null;
      const role = query.get("role");
      const applications = await listCareerApplications({
        status: status && VALID_STATUSES.has(status) ? status : undefined,
        role: role ?? undefined,
      });

      res.status(200).json({ success: true, applications });
      return;
    }

    if (req.method === "PATCH") {
      const body = req.body ?? {};
      const id = typeof body.id === "string" ? body.id : "";
      if (!id) {
        res.status(400).json({ success: false, error: "Missing application id" });
        return;
      }

      const patch: {
        status?: ApplicationStatus;
        admin_notes?: string | null;
        reviewed_at?: string | null;
      } = {};

      if (body.status !== undefined) {
        if (!VALID_STATUSES.has(body.status)) {
          res.status(400).json({ success: false, error: "Invalid status" });
          return;
        }
        patch.status = body.status;
        patch.reviewed_at = new Date().toISOString();
      }

      if (body.admin_notes !== undefined) {
        patch.admin_notes =
          typeof body.admin_notes === "string" ? body.admin_notes.trim().slice(0, 5000) : null;
      }

      if (Object.keys(patch).length === 0) {
        res.status(400).json({ success: false, error: "Nothing to update" });
        return;
      }

      const application = await updateCareerApplication(id, patch);
      res.status(200).json({ success: true, application });
      return;
    }

    res.status(405).json({ success: false, error: "Method not allowed" });
  } catch (err) {
    console.error("careers-applications error:", err);
    res.status(500).json({ success: false, error: "Could not process request" });
  }
}
