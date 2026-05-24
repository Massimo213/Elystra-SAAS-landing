import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle } from "lucide-react";
import Logo from "@/components/Logo";

// ─── Slot generation ──────────────────────────────────────────────────────────
// DYNAMIC dates — recalculated from today every time the page loads.
// STATIC times — always 10:00 AM, 2:00 PM, and 11:00 AM.
//
// Pattern:
//   [0] Tomorrow morning
//   [1] Tomorrow afternoon
//   [2] Later this week (+4 days)
// All within 5 days.

function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

function makeSlot(daysAhead: number, time: string) {
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  const date = new Date(base);
  date.setDate(base.getDate() + daysAhead);
  const dayLabel = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return { date, time, label: `${dayLabel} · ${formatTime(time)}` };
}

function getThreeSlots() {
  return [
    makeSlot(1, "10:00"),
    makeSlot(1, "14:00"),
    makeSlot(4, "11:00"),
  ];
}

function toISODate(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function formatConfirmFromParts(slotDate: string, slotTime: string): string {
  const [y, m, d] = slotDate.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const day = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return `${day} at ${formatTime(slotTime)}`;
}

const inputClass =
  "w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light focus:outline-none focus:border-violet-500/50 placeholder:text-zinc-500 transition-colors";

type Step = "info" | "pick" | "propose" | "done";

// ─── Component ────────────────────────────────────────────────────────────────

const Reschedule = () => {
  const [searchParams] = useSearchParams();
  const urlName = searchParams.get("name") ?? "";
  const urlEmail = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";

  const hasParams = Boolean(urlName && urlEmail);

  const [step, setStep] = useState<Step>(hasParams ? "pick" : "info");
  const [name, setName] = useState(urlName);
  const [email, setEmail] = useState(urlEmail);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedSlot, setConfirmedSlot] = useState("");
  const [proposedDate, setProposedDate] = useState("");
  const [proposedTime, setProposedTime] = useState("");

  const slots = useMemo(() => getThreeSlots(), []);

  const submitBooking = async (slotDate: string, slotTime: string, proposed = false) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/reschedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          token,
          slotDate,
          slotTime,
          proposed,
        }),
      });

      let data: { success?: boolean; error?: string } = {};
      try {
        data = await res.json();
      } catch {
        if (res.status === 404) {
          throw new Error("API unavailable. Restart the dev server, then try again.");
        }
        if (!res.ok) throw new Error(`Error ${res.status}`);
      }

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("API unavailable. Restart the dev server, then try again.");
        }
        throw new Error(data.error ?? "Booking failed");
      }

      setConfirmedSlot(formatConfirmFromParts(slotDate, slotTime));
      setStep("done");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    } finally {
      setIsSubmitting(false);
      setActiveIndex(null);
    }
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("pick");
  };

  const handleSlotTap = async (index: number) => {
    const slot = slots[index];
    setActiveIndex(index);
    await submitBooking(toISODate(slot.date), slot.time);
  };

  const handleProposeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitBooking(proposedDate, proposedTime, true);
  };

  return (
    <div className="min-h-screen relative isolate overflow-hidden bg-black flex flex-col">

      {/* ── Atmospheric background ─────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-900" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-violet-600/20 via-indigo-600/12 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-purple-600/12 via-violet-600/8 to-transparent rounded-full blur-3xl" />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[200px] blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
          <svg className="w-full h-full">
            <filter id="rsgrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#rsgrain)" />
          </svg>
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)" }}
        />
      </div>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="relative z-10 w-full py-6 px-6">
        <Link to="/" className="inline-block opacity-80 hover:opacity-100 transition-opacity">
          <Logo />
        </Link>
      </header>

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-5 py-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          <div
            className="relative bg-white/[0.04] backdrop-blur-xl border border-white/[0.09] rounded-3xl p-7 md:p-9"
            style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.7)" }}
          >
            {/* Ambient glow edge */}
            <div
              className="absolute inset-px rounded-3xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.07) 0%, transparent 55%)" }}
            />

            {/* ── Step: info (fallback — no URL params) ── */}
            {step === "info" && (
              <>
                <div className="text-center mb-7">
                  <p className="text-2xl font-light text-white leading-snug">
                    No problem —<br />pick a new time.
                  </p>
                  <p className="text-sm text-zinc-500 font-light mt-2">
                    Enter your details to continue.
                  </p>
                </div>

                <form onSubmit={handleInfoSubmit} className="space-y-3">
                  <input
                    type="text"
                    required
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder="Your name"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    placeholder="Your email"
                  />
                  <button
                    type="submit"
                    className="w-full mt-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full text-white font-medium text-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(124,58,237,1) 0%, rgba(147,51,234,1) 55%, rgba(99,102,241,1) 100%)",
                      boxShadow: "0 0 40px rgba(139,92,246,0.3)",
                    }}
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}

            {/* ── Step: pick (3 slots) ── */}
            {step === "pick" && (
              <>
                <div className="text-center mb-7">
                  <p className="text-2xl font-light text-white leading-snug">
                    No problem —<br />pick a new time.
                  </p>
                  {name && (
                    <p className="text-xs text-zinc-500 font-light mt-2">
                      For {name}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  {slots.map((slot, i) => {
                    const isLoading = isSubmitting && activeIndex === i;
                    return (
                      <motion.button
                        key={i}
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleSlotTap(i)}
                        whileHover={isSubmitting ? {} : { scale: 1.015 }}
                        whileTap={isSubmitting ? {} : { scale: 0.98 }}
                        className="w-full px-5 py-4 rounded-2xl text-left text-sm font-light transition-colors disabled:opacity-50"
                        style={{
                          background: isLoading
                            ? "rgba(139,92,246,0.12)"
                            : "rgba(255,255,255,0.04)",
                          border: isLoading
                            ? "1px solid rgba(139,92,246,0.4)"
                            : "1px solid rgba(255,255,255,0.09)",
                          color: "#ffffff",
                        }}
                      >
                        {isLoading ? (
                          <span className="text-violet-300">Booking…</span>
                        ) : (
                          slot.label
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {submitError && (
                  <p className="mt-4 text-xs text-red-400 text-center">{submitError}</p>
                )}

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitError(null);
                      setStep("propose");
                    }}
                    className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                  >
                    None of these work → propose a time
                  </button>
                </div>
              </>
            )}

            {/* ── Step: propose (custom date + time) ── */}
            {step === "propose" && (
              <>
                <div className="text-center mb-7">
                  <p className="text-2xl font-light text-white leading-snug">
                    Propose a time.
                  </p>
                  <p className="text-sm text-zinc-500 font-light mt-2">
                    Pick the date and time that works for you.
                  </p>
                </div>

                <form onSubmit={handleProposeSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs text-zinc-500 font-light mb-1.5">Date</label>
                    <input
                      type="date"
                      required
                      value={proposedDate}
                      onChange={(e) => setProposedDate(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 font-light mb-1.5">Time</label>
                    <input
                      type="time"
                      required
                      value={proposedTime}
                      onChange={(e) => setProposedTime(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  {submitError && (
                    <p className="text-xs text-red-400 text-center">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-1 flex items-center justify-center gap-2 px-6 py-4 rounded-full text-white font-medium text-sm disabled:opacity-50"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(124,58,237,1) 0%, rgba(147,51,234,1) 55%, rgba(99,102,241,1) 100%)",
                      boxShadow: "0 0 40px rgba(139,92,246,0.3)",
                    }}
                  >
                    {isSubmitting ? "Sending…" : "Submit time"}
                  </button>
                </form>

                <div className="mt-5 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitError(null);
                      setStep("pick");
                    }}
                    className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                  >
                    ← Back to suggested times
                  </button>
                </div>
              </>
            )}

            {/* ── Step: done ── */}
            {step === "done" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-3"
              >
                <div className="flex justify-center mb-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(99,102,241,0.2))",
                      border: "1px solid rgba(139,92,246,0.35)",
                    }}
                  >
                    <CheckCircle className="w-6 h-6 text-violet-400" />
                  </div>
                </div>
                <p className="text-3xl font-light text-white mb-3">Done.</p>
                <p className="text-sm text-zinc-300 font-light">{confirmedSlot}.</p>
                <p className="text-sm text-zinc-500 font-light mt-1">See you then.</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 py-5 text-center">
        <p className="text-xs text-zinc-700">Elystra</p>
      </footer>
    </div>
  );
};

export default Reschedule;
