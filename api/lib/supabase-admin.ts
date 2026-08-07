const BUCKET = "career-applications";

export type ApplicationStatus = "new" | "reviewed" | "shortlisted" | "rejected";

export type CareerApplicationRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  role: string;
  message: string;
  status: ApplicationStatus;
  admin_notes: string | null;
  cv_filename: string;
  cv_mime_type: string;
  cv_storage_path: string;
  recording_filename: string | null;
  recording_mime_type: string | null;
  recording_storage_path: string | null;
  recording_link: string | null;
  reviewed_at: string | null;
};

function getConfig() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured");
  }
  return { url: url.replace(/\/$/, ""), serviceKey };
}

function dbHeaders(serviceKey: string, extra: Record<string, string> = {}) {
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export async function uploadApplicationFile(
  storagePath: string,
  base64: string,
  mimeType: string
): Promise<void> {
  const { url, serviceKey } = getConfig();
  const body = Buffer.from(base64, "base64");

  const res = await fetch(`${url}/storage/v1/object/${BUCKET}/${storagePath}`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": mimeType,
      "x-upsert": "false",
    },
    body,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Storage upload failed: ${err}`);
  }
}

export async function insertCareerApplication(
  row: Omit<CareerApplicationRow, "id" | "created_at" | "reviewed_at">
): Promise<CareerApplicationRow> {
  const { url, serviceKey } = getConfig();

  const res = await fetch(`${url}/rest/v1/career_applications`, {
    method: "POST",
    headers: dbHeaders(serviceKey, { Prefer: "return=representation" }),
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Database insert failed: ${err}`);
  }

  const data = (await res.json()) as CareerApplicationRow[];
  if (!data[0]) throw new Error("Database insert returned no row");
  return data[0];
}

export async function listCareerApplications(filters?: {
  status?: ApplicationStatus;
  role?: string;
}): Promise<CareerApplicationRow[]> {
  const { url, serviceKey } = getConfig();
  const params = new URLSearchParams({
    select: "*",
    order: "created_at.desc",
  });

  if (filters?.status) params.set("status", `eq.${filters.status}`);
  if (filters?.role) params.set("role", `ilike.*${filters.role}*`);

  const res = await fetch(`${url}/rest/v1/career_applications?${params}`, {
    headers: dbHeaders(serviceKey),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Database list failed: ${err}`);
  }

  return (await res.json()) as CareerApplicationRow[];
}

export async function getCareerApplication(id: string): Promise<CareerApplicationRow | null> {
  const { url, serviceKey } = getConfig();

  const res = await fetch(
    `${url}/rest/v1/career_applications?id=eq.${encodeURIComponent(id)}&select=*`,
    { headers: dbHeaders(serviceKey) }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Database fetch failed: ${err}`);
  }

  const data = (await res.json()) as CareerApplicationRow[];
  return data[0] ?? null;
}

export async function updateCareerApplication(
  id: string,
  patch: Partial<Pick<CareerApplicationRow, "status" | "admin_notes" | "reviewed_at">>
): Promise<CareerApplicationRow> {
  const { url, serviceKey } = getConfig();

  const res = await fetch(`${url}/rest/v1/career_applications?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: dbHeaders(serviceKey, { Prefer: "return=representation" }),
    body: JSON.stringify(patch),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Database update failed: ${err}`);
  }

  const data = (await res.json()) as CareerApplicationRow[];
  if (!data[0]) throw new Error("Application not found");
  return data[0];
}

export async function createSignedFileUrl(storagePath: string, expiresIn = 3600): Promise<string> {
  const { url, serviceKey } = getConfig();

  const res = await fetch(`${url}/storage/v1/object/sign/${BUCKET}/${storagePath}`, {
    method: "POST",
    headers: dbHeaders(serviceKey),
    body: JSON.stringify({ expiresIn }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Signed URL failed: ${err}`);
  }

  const data = (await res.json()) as { signedURL?: string };
  if (!data.signedURL) throw new Error("Signed URL missing from response");

  return data.signedURL.startsWith("http")
    ? data.signedURL
    : `${url}/storage/v1${data.signedURL}`;
}

export function buildStoragePath(applicationId: string, filename: string, kind: "cv" | "recording") {
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
  return `${applicationId}/${kind}-${safeName}`;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
