/**
 * Shared apply form — CV + message → /api/careers-apply → elystrateam@gmail.com
 * SDR applications also require a call recording (file upload or link).
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, FileUp, Link2, Mic, Upload, X } from "lucide-react";

const inputClass =
  "w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-light focus:outline-none focus:border-violet-500/50 placeholder:text-zinc-600 transition-colors";

const glassButtonClass =
  "group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.06] px-6 py-3.5 text-sm font-light text-white transition-colors hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-50";

const CV_ALLOWED = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const RECORDING_ALLOWED = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "audio/mpeg",
  "audio/mp4",
  "audio/wav",
  "audio/x-m4a",
  "audio/m4a",
];

const MAX_CV_BYTES = 4 * 1024 * 1024;
const MAX_RECORDING_BYTES = 15 * 1024 * 1024;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Could not read file"));
        return;
      }
      const base64 = result.split(",")[1];
      if (!base64) {
        reject(new Error("Could not encode file"));
        return;
      }
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

function isCvFile(file: File): boolean {
  return CV_ALLOWED.includes(file.type) || /\.(pdf|doc|docx)$/i.test(file.name);
}

function isRecordingFile(file: File): boolean {
  return RECORDING_ALLOWED.includes(file.type) || /\.(mp4|webm|mov|mp3|m4a|wav)$/i.test(file.name);
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

type CareersApplyFormProps = {
  roleTitle: string;
  requiresRecording?: boolean;
};

export default function CareersApplyForm({
  roleTitle,
  requiresRecording = false,
}: CareersApplyFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [recording, setRecording] = useState<File | null>(null);
  const [recordingLink, setRecordingLink] = useState("");
  const [recordingDragActive, setRecordingDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleCvChange = (file: File | null) => {
    setSubmitError(null);
    if (!file) {
      setCv(null);
      return;
    }
    if (!isCvFile(file)) {
      setSubmitError("Please upload a PDF or Word file for your CV.");
      setCv(null);
      return;
    }
    if (file.size > MAX_CV_BYTES) {
      setSubmitError("CV must be under 4MB.");
      setCv(null);
      return;
    }
    setCv(file);
  };

  const handleRecordingChange = (file: File | null) => {
    setSubmitError(null);
    if (!file) {
      setRecording(null);
      return;
    }
    if (!isRecordingFile(file)) {
      setSubmitError("Recording must be M4A, MP3, WAV, MP4, WebM, or MOV.");
      setRecording(null);
      return;
    }
    if (file.size > MAX_RECORDING_BYTES) {
      setSubmitError("Recording must be under 15MB.");
      setRecording(null);
      return;
    }
    setRecording(file);
    setRecordingLink("");
  };

  const handleRecordingLinkChange = (value: string) => {
    setSubmitError(null);
    setRecordingLink(value);
    if (value.trim()) {
      setRecording(null);
    }
  };

  const handleRecordingDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setRecordingDragActive(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file) handleRecordingChange(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cv) {
      setSubmitError("Please attach your CV.");
      return;
    }

    const trimmedLink = recordingLink.trim();
    if (requiresRecording && !recording && !trimmedLink) {
      setSubmitError("Please upload a voice recording or paste a link to one.");
      return;
    }
    if (trimmedLink && !isValidUrl(trimmedLink)) {
      setSubmitError("Please enter a valid recording link (https://…).");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const cvContentBase64 = await fileToBase64(cv);
      let recordingContentBase64: string | undefined;
      if (recording) {
        recordingContentBase64 = await fileToBase64(recording);
      }

      const res = await fetch("/api/careers-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          role: roleTitle,
          message,
          cvFilename: cv.name,
          cvContentBase64,
          cvMimeType: cv.type || "application/pdf",
          ...(requiresRecording && {
            recordingFilename: recording?.name,
            recordingContentBase64,
            recordingMimeType: recording?.type,
            recordingLink: trimmedLink || undefined,
          }),
        }),
      });

      let data: { success?: boolean; error?: string } = {};
      try {
        data = await res.json();
      } catch {
        if (res.status === 404) {
          throw new Error("API unavailable. Restart the dev server, then try again.");
        }
        throw new Error(`Error ${res.status}`);
      }

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Try again.");
      }

      setDone(true);
      setName("");
      setEmail("");
      setMessage("");
      setCv(null);
      setRecording(null);
      setRecordingLink("");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <CheckCircle className="h-10 w-10 text-violet-300" />
        <p className="text-lg font-light text-white">Got it. We&apos;ll be in touch.</p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="text-sm font-light text-zinc-500 transition-colors hover:text-zinc-300"
        >
          Submit another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-light text-zinc-400">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-light text-zinc-400">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@email.com"
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-light text-zinc-400">Message</label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="A few lines on your outbound experience and why this role interests you."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-light text-zinc-400">CV</label>
        {cv ? (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <FileUp className="h-5 w-5 shrink-0 text-violet-300" />
              <span className="truncate text-sm font-light text-white">{cv.name}</span>
            </div>
            <button
              type="button"
              onClick={() => setCv(null)}
              className="rounded-full p-1 text-zinc-500 transition-colors hover:text-white"
              aria-label="Remove CV"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/[0.12] bg-white/[0.02] px-4 py-8 transition-colors hover:border-violet-500/40 hover:bg-white/[0.04]">
            <input
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              onChange={(e) => handleCvChange(e.target.files?.[0] ?? null)}
            />
            <Upload className="h-5 w-5 text-zinc-500" />
            <span className="text-sm font-light text-zinc-500">PDF or Word · under 4MB</span>
          </label>
        )}
      </div>

      {requiresRecording && (
        <div>
          <label className="mb-2 block text-sm font-light text-zinc-400">
            Voice Recording <span className="text-zinc-600">(required)</span>
          </label>

          {recording ? (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <Mic className="h-5 w-5 shrink-0 text-violet-300" />
                <span className="truncate text-sm font-light text-white">{recording.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setRecording(null)}
                className="rounded-full p-1 text-zinc-500 transition-colors hover:text-white"
                aria-label="Remove recording"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <label
                className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-4 py-8 transition-colors ${
                  recordingDragActive
                    ? "border-violet-500/50 bg-violet-500/[0.06]"
                    : "border-white/[0.12] bg-white/[0.02] hover:border-violet-500/40 hover:bg-white/[0.04]"
                }`}
                onDragEnter={(e) => {
                  e.preventDefault();
                  setRecordingDragActive(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setRecordingDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setRecordingDragActive(false);
                }}
                onDrop={handleRecordingDrop}
              >
                <input
                  type="file"
                  accept=".m4a,.mp3,.wav,.mp4,.webm,.mov,audio/m4a,audio/x-m4a,audio/mpeg,audio/wav,audio/mp4,video/mp4,video/webm,video/quicktime"
                  className="sr-only"
                  onChange={(e) => handleRecordingChange(e.target.files?.[0] ?? null)}
                />
                <Upload className="h-5 w-5 text-zinc-500" />
                <span className="text-sm font-light text-zinc-500">
                  Drag & drop or browse · M4A, MP3, WAV, MP4, WebM, MOV · under 15MB
                </span>
              </label>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/[0.06]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#0a0a0b] px-3 text-xs font-light uppercase tracking-wider text-zinc-600">
                    or paste a link
                  </span>
                </div>
              </div>

              <div className="relative">
                <Link2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                <input
                  type="url"
                  value={recordingLink}
                  onChange={(e) => handleRecordingLinkChange(e.target.value)}
                  className={`${inputClass} pl-11`}
                  placeholder="https://loom.com/… or Google Drive / Dropbox link"
                />
              </div>
            </>
          )}
        </div>
      )}

      {submitError && <p className="text-sm font-light text-rose-400">{submitError}</p>}

      <button type="submit" disabled={isSubmitting} className={glassButtonClass}>
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Sending…
          </>
        ) : (
          <>
            Submit application
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
