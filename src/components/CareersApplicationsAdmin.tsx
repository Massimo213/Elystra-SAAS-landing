/**
 * Internal inbox for reviewing career applications stored in Supabase.
 * Route: /admin/applications — password protected via CAREERS_ADMIN_PASSWORD.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Loader2,
  Lock,
  Mail,
  RefreshCw,
  Search,
} from "lucide-react";

const TOKEN_KEY = "elystra.careersAdminToken";

function useAdminPageMeta() {
  useEffect(() => {
    document.title = "Applications | Elystra Admin";
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) {
      robots.setAttribute("content", "noindex, nofollow");
    } else {
      const meta = document.createElement("meta");
      meta.name = "robots";
      meta.content = "noindex, nofollow";
      document.head.appendChild(meta);
    }
  }, []);
}

type ApplicationStatus = "new" | "reviewed" | "shortlisted" | "rejected";

type ApplicationSummary = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  role: string;
  message: string;
  status: ApplicationStatus;
  admin_notes: string | null;
  cv_filename: string;
  recording_filename: string | null;
  recording_link: string | null;
};

type ApplicationDetail = ApplicationSummary & {
  cv_url: string;
  recording_url: string | null;
  cv_mime_type: string;
  recording_mime_type: string | null;
};

const STATUS_OPTIONS: ApplicationStatus[] = ["new", "reviewed", "shortlisted", "rejected"];

const STATUS_LABEL: Record<ApplicationStatus, string> = {
  new: "New",
  reviewed: "Reviewed",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
};

const STATUS_CLASS: Record<ApplicationStatus, string> = {
  new: "bg-violet-500/15 text-violet-200 border-violet-500/30",
  reviewed: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30",
  shortlisted: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30",
  rejected: "bg-rose-500/15 text-rose-200 border-rose-500/30",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

async function apiFetch<T>(
  token: string,
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error ?? `Request failed (${res.status})`);
  }
  return data as T;
}

function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[0.65rem] uppercase tracking-[0.18em] ${STATUS_CLASS[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

export default function CareersApplicationsAdmin() {
  useAdminPageMeta();
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) ?? "");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<ApplicationDetail | null>(null);
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [listLoading, setListLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState("");

  const loadApplications = useCallback(async (activeToken: string) => {
    setListLoading(true);
    setError(null);
    try {
      const query =
        statusFilter === "all"
          ? "/api/careers-applications"
          : `/api/careers-applications?status=${statusFilter}`;
      const data = await apiFetch<{ applications: ApplicationSummary[] }>(activeToken, query);
      setApplications(data.applications);
      if (selectedId && !data.applications.some((item) => item.id === selectedId)) {
        setSelectedId(null);
        setDetail(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load applications");
    } finally {
      setListLoading(false);
    }
  }, [selectedId, statusFilter]);

  const loadDetail = useCallback(async (activeToken: string, id: string) => {
    setDetailLoading(true);
    setError(null);
    try {
      const data = await apiFetch<{ application: ApplicationDetail }>(
        activeToken,
        `/api/careers-applications?id=${encodeURIComponent(id)}`
      );
      setDetail(data.application);
      setNotesDraft(data.application.admin_notes ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load application");
    } finally {
      setDetailLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    void loadApplications(token);
  }, [token, loadApplications]);

  useEffect(() => {
    if (!token || !selectedId) return;
    void loadDetail(token, selectedId);
  }, [token, selectedId, loadDetail]);

  const filteredApplications = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return applications;
    return applications.filter((item) =>
      [item.name, item.email, item.role, item.message]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [applications, search]);

  const counts = useMemo(() => {
    const base = { all: applications.length, new: 0, reviewed: 0, shortlisted: 0, rejected: 0 };
    for (const item of applications) base[item.status] += 1;
    return base;
  }, [applications]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      await apiFetch<{ applications: ApplicationSummary[] }>(
        password,
        "/api/careers-applications"
      );
      sessionStorage.setItem(TOKEN_KEY, password);
      setToken(password);
      setPassword("");
    } catch {
      setAuthError("Invalid password or storage not configured.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleStatusChange = async (status: ApplicationStatus) => {
    if (!token || !detail) return;
    setSaveLoading(true);
    setError(null);
    try {
      const data = await apiFetch<{ application: ApplicationSummary }>(token, "/api/careers-applications", {
        method: "PATCH",
        body: JSON.stringify({ id: detail.id, status }),
      });
      setDetail({ ...detail, ...data.application });
      setApplications((prev) =>
        prev.map((item) => (item.id === data.application.id ? { ...item, ...data.application } : item))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update status");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!token || !detail) return;
    setSaveLoading(true);
    setError(null);
    try {
      const data = await apiFetch<{ application: ApplicationSummary }>(token, "/api/careers-applications", {
        method: "PATCH",
        body: JSON.stringify({ id: detail.id, admin_notes: notesDraft }),
      });
      setDetail({ ...detail, ...data.application });
      setApplications((prev) =>
        prev.map((item) => (item.id === data.application.id ? { ...item, ...data.application } : item))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save notes");
    } finally {
      setSaveLoading(false);
    }
  };

  const signOut = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setApplications([]);
    setSelectedId(null);
    setDetail(null);
  };

  if (!token) {
    return (
      <main className="relative z-10 min-h-screen pt-14 md:pt-16">
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full border border-white/[0.08] bg-white/[0.04] p-3">
                <Lock className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <h1 className="text-xl font-light text-white">Applications inbox</h1>
                <p className="text-sm font-light text-zinc-500">Internal review only</p>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-light text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none"
                autoComplete="current-password"
              />
              {authError ? <p className="text-sm font-light text-rose-400">{authError}</p> : null}
              <button
                type="submit"
                disabled={authLoading || !password}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.06] px-5 py-3 text-sm font-light text-white transition-colors hover:bg-white/[0.1] disabled:opacity-50"
              >
                {authLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Enter inbox
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative z-10 min-h-screen pt-14 md:pt-16">

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              to="/careers"
              className="mb-3 inline-flex items-center gap-1.5 text-sm font-light text-zinc-500 transition-colors hover:text-zinc-300"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Careers
            </Link>
            <h1 className="text-3xl font-extralight tracking-[-0.03em] text-white">
              Applications inbox
            </h1>
            <p className="mt-2 text-sm font-light text-zinc-500">
              Review CVs, recordings, and notes in one place. New submissions appear here automatically.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void loadApplications(token)}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-light text-zinc-300 transition-colors hover:bg-white/[0.08]"
            >
              <RefreshCw className={`h-4 w-4 ${listLoading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={signOut}
              className="rounded-full border border-white/[0.08] px-4 py-2 text-sm font-light text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Sign out
            </button>
          </div>
        </div>

        {error ? (
          <div className="mb-4 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-light text-rose-200">
            {error}
          </div>
        ) : null}

        <div className="mb-4 flex flex-wrap gap-2">
          {(["all", ...STATUS_OPTIONS] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-full border px-3 py-1.5 text-xs font-light transition-colors ${
                statusFilter === status
                  ? "border-violet-500/40 bg-violet-500/15 text-violet-100"
                  : "border-white/[0.08] bg-white/[0.03] text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {status === "all" ? "All" : STATUS_LABEL[status]} ({counts[status]})
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
          <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02]">
            <div className="border-b border-white/[0.06] p-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name, email, role..."
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm font-light text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="max-h-[70vh] overflow-y-auto">
              {listLoading && applications.length === 0 ? (
                <div className="flex items-center justify-center gap-2 px-4 py-16 text-sm font-light text-zinc-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading applications...
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="px-4 py-16 text-center text-sm font-light text-zinc-500">
                  No applications yet. New submissions will appear here after the next apply.
                </div>
              ) : (
                filteredApplications.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full border-b border-white/[0.06] px-4 py-4 text-left transition-colors hover:bg-white/[0.03] ${
                      selectedId === item.id ? "bg-white/[0.04]" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-light text-white">{item.name}</p>
                        <p className="truncate text-xs font-light text-zinc-500">{item.role}</p>
                      </div>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs font-light leading-5 text-zinc-400">
                      {item.message}
                    </p>
                    <p className="mt-2 text-[0.65rem] font-light uppercase tracking-[0.16em] text-zinc-600">
                      {formatDate(item.created_at)}
                    </p>
                  </button>
                ))
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6">
            {!selectedId ? (
              <div className="flex min-h-[50vh] items-center justify-center text-sm font-light text-zinc-500">
                Select an application to review
              </div>
            ) : detailLoading && !detail ? (
              <div className="flex min-h-[50vh] items-center justify-center gap-2 text-sm font-light text-zinc-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading details...
              </div>
            ) : detail ? (
              <div className="space-y-6">
                <div className="flex flex-col gap-4 border-b border-white/[0.06] pb-6 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <StatusBadge status={detail.status} />
                      <span className="text-xs font-light text-zinc-600">
                        {formatDate(detail.created_at)}
                      </span>
                    </div>
                    <h2 className="text-2xl font-light tracking-tight text-white">{detail.name}</h2>
                    <p className="mt-1 text-sm font-light text-zinc-400">{detail.role}</p>
                    <a
                      href={`mailto:${detail.email}`}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-light text-violet-300 transition-colors hover:text-violet-200"
                    >
                      <Mail className="h-4 w-4" />
                      {detail.email}
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map((status) => (
                      <button
                        key={status}
                        type="button"
                        disabled={saveLoading || detail.status === status}
                        onClick={() => void handleStatusChange(status)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-light transition-colors disabled:opacity-50 ${
                          detail.status === status
                            ? STATUS_CLASS[status]
                            : "border-white/[0.08] text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {STATUS_LABEL[status]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[0.7rem] uppercase tracking-[0.28em] text-zinc-500">Message</h3>
                  <p className="mt-3 whitespace-pre-wrap text-sm font-light leading-7 text-zinc-300">
                    {detail.message}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href={detail.cv_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-sm font-light text-white transition-colors hover:bg-white/[0.06]"
                  >
                    <span className="truncate pr-3">{detail.cv_filename}</span>
                    <Download className="h-4 w-4 shrink-0 text-violet-300" />
                  </a>

                  {detail.recording_url ? (
                    <a
                      href={detail.recording_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-sm font-light text-white transition-colors hover:bg-white/[0.06]"
                    >
                      <span className="truncate pr-3">{detail.recording_filename ?? "Recording"}</span>
                      <Download className="h-4 w-4 shrink-0 text-violet-300" />
                    </a>
                  ) : detail.recording_link ? (
                    <a
                      href={detail.recording_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-sm font-light text-white transition-colors hover:bg-white/[0.06]"
                    >
                      <span>Recording link</span>
                      <ExternalLink className="h-4 w-4 shrink-0 text-violet-300" />
                    </a>
                  ) : null}
                </div>

                {detail.recording_url &&
                detail.recording_mime_type?.startsWith("audio/") ? (
                  <div>
                    <h3 className="mb-3 text-[0.7rem] uppercase tracking-[0.28em] text-zinc-500">
                      Recording preview
                    </h3>
                    <audio controls className="w-full" src={detail.recording_url}>
                      Your browser does not support audio playback.
                    </audio>
                  </div>
                ) : null}

                <div>
                  <h3 className="text-[0.7rem] uppercase tracking-[0.28em] text-zinc-500">Internal notes</h3>
                  <textarea
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    rows={4}
                    placeholder="Notes for your team..."
                    className="mt-3 w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-light text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none"
                  />
                  <button
                    type="button"
                    disabled={saveLoading}
                    onClick={() => void handleSaveNotes()}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.06] px-5 py-2.5 text-sm font-light text-white transition-colors hover:bg-white/[0.1] disabled:opacity-50"
                  >
                    {saveLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Save notes
                  </button>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}
