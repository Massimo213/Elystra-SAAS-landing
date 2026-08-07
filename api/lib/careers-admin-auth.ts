export function getAdminTokenFromRequest(req: { headers: Record<string, string | string[] | undefined> }) {
  const auth = req.headers.authorization;
  if (typeof auth === "string" && auth.startsWith("Bearer ")) {
    return auth.slice(7).trim();
  }
  const header = req.headers["x-careers-admin-token"];
  if (typeof header === "string") return header.trim();
  return null;
}

export function isValidAdminToken(token: string | null): boolean {
  const expected = process.env.CAREERS_ADMIN_PASSWORD;
  if (!expected || !token) return false;
  return token === expected;
}

export function requireAdmin(req: { headers: Record<string, string | string[] | undefined> }) {
  const token = getAdminTokenFromRequest(req);
  if (!isValidAdminToken(token)) {
    return { ok: false as const, status: 401, error: "Unauthorized" };
  }
  return { ok: true as const };
}
