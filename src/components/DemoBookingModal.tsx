"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, Sparkles, Calendar, Clock } from "lucide-react";

/* ---------------- Lead capture ---------------- */
type LeadData = {
  name: string;
  agencyName: string;
  email: string;
  phone: string;
};

/* ---------------- Qualification ---------------- */
const PROPOSAL_OPTIONS = [
  { value: "1-4", label: "1–4" },
  { value: "5-9", label: "5–9" },
  { value: "10-24", label: "10–24" },
  { value: "25+", label: "25+" },
];

const DEAL_SIZE_OPTIONS = [
  { value: "under-2k", label: "Under $2K" },
  { value: "2k-5k", label: "$2K–$5K" },
  { value: "5k-15k", label: "$5K–$15K" },
  { value: "15k-50k", label: "$15K–$50K" },
  { value: "50k+", label: "$50K+" },
];

const ROLE_OPTIONS = [
  "Founder / Owner",
  "Sales / Business Dev",
  "Operations",
  "Other",
];

const AGENCY_TYPE_OPTIONS = [
  "Performance / Media",
  "Creative / Brand",
  "Strategic / Consulting",
  "SEO / Content",
  "Full-service",
  "Other",
];

/* ---------------- Our times: 6–8 per day, varied by weekday ---------------- */
const SLOTS_BY_WEEKDAY: Record<number, string[]> = {
  0: ["10:00", "14:00"],
  1: ["09:00", "10:30", "12:00", "15:00", "17:00", "18:00"],
  2: ["08:30", "11:30", "14:00", "16:30", "17:30"],
  3: ["08:30", "11:30", "12:00", "14:00", "16:00", "18:00"],
  4: ["09:30", "11:00", "14:30", "17:00", "18:00"],
  5: ["09:00", "10:00", "12:30", "15:30", "17:30"],
  6: ["10:00", "14:00"],
};

type QualData = {
  proposalsPerMonth: string;
  avgDealSize: string;
  role: string;
  agencyType: string;
};

type Step = "lead" | "qualify" | "qualified" | "confirm" | "not-qualified";

function qualify(data: QualData): "qualified" | "not-qualified" {
  const proposalsVal = PROPOSAL_OPTIONS.find((o) => o.value === data.proposalsPerMonth);
  const dealVal = DEAL_SIZE_OPTIONS.find((o) => o.value === data.avgDealSize);
  if (!proposalsVal || !dealVal) return "not-qualified";
  if (data.proposalsPerMonth === "1-4" && (data.avgDealSize === "under-2k" || data.avgDealSize === "2k-5k")) {
    return "not-qualified";
  }
  return "qualified";
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function getNextDays(count: number): Date[] {
  const days: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light focus:outline-none focus:border-violet-500/50 placeholder:text-zinc-500";
const labelClass = "block text-xs text-zinc-400 font-light mb-1.5";

export function DemoBookingModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState<Step>("lead");
  const [lead, setLead] = useState<LeadData>({
    name: "",
    agencyName: "",
    email: "",
    phone: "",
  });
  const [qual, setQual] = useState<QualData>({
    proposalsPerMonth: "",
    avgDealSize: "",
    role: "",
    agencyType: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const nextDays = useMemo(() => getNextDays(14), []);

  const slotsForDate = useMemo(() => {
    if (!selectedDate) return [];
    const wd = selectedDate.getDay();
    return SLOTS_BY_WEEKDAY[wd] || ["10:00", "14:00"];
  }, [selectedDate]);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("qualify");
  };

  const handleQualifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(qualify(qual));
    if (qualify(qual) === "qualified") {
      setSelectedDate(null);
      setSelectedSlot(null);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const slotDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

    const payload = {
      ...lead,
      ...qual,
      slotDate,
      slotTime: selectedSlot,
    };

    try {
      const res = await fetch("/api/demo-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data: { success?: boolean; error?: string } = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        if (!res.ok) throw new Error(res.status === 404 ? "API unavailable. Deploy to Vercel." : `Error ${res.status}`);
        throw new Error("Invalid response");
      }

      if (!res.ok) throw new Error(data.error || "Booking failed");
      setStep("confirm");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      setStep("lead");
      setLead({ name: "", agencyName: "", email: "", phone: "" });
      setQual({ proposalsPerMonth: "", avgDealSize: "", role: "", agencyType: "" });
      setSelectedDate(null);
      setSelectedSlot(null);
      setSubmitError(null);
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-lg border-white/10 bg-black/95 backdrop-blur-sm p-0 overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 40px 100px rgba(0,0,0,0.8)",
        }}
      >
        <div className="p-6 md:p-8">
          {step === "lead" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-light text-white text-center">
                  Book a 7-Minute Demo
                </DialogTitle>
                <p className="text-sm text-zinc-400 font-light text-center mt-1">
                  Let&apos;s start with the basics.
                </p>
              </DialogHeader>

              <form onSubmit={handleLeadSubmit} className="mt-6 space-y-4">
                <div>
                  <label className={labelClass}>Your name</label>
                  <input type="text" required value={lead.name} onChange={(e) => setLead((p) => ({ ...p, name: e.target.value }))} className={inputClass} placeholder="Jane Smith" />
                </div>
                <div>
                  <label className={labelClass}>Agency name</label>
                  <input type="text" required value={lead.agencyName} onChange={(e) => setLead((p) => ({ ...p, agencyName: e.target.value }))} className={inputClass} placeholder="Acme Media" />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" required value={lead.email} onChange={(e) => setLead((p) => ({ ...p, email: e.target.value }))} className={inputClass} placeholder="jane@acmemedia.com" />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input type="tel" required value={lead.phone} onChange={(e) => setLead((p) => ({ ...p, phone: e.target.value }))} className={inputClass} placeholder="+1 555 123 4567" />
                </div>
                <button type="submit" className="w-full mt-6 flex items-center justify-center gap-3 px-6 py-4 rounded-full text-white font-medium" style={{ background: "linear-gradient(135deg, rgba(124,58,237,1) 0%, rgba(147,51,234,1) 55%, rgba(99,102,241,1) 100%)", boxShadow: "0 0 40px rgba(139,92,246,0.3)" }}>
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {step === "qualify" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-light text-white text-center">
                  Four quick questions
                </DialogTitle>
                <p className="text-sm text-zinc-400 font-light text-center mt-1">Qualified agencies only.</p>
              </DialogHeader>

              <form onSubmit={handleQualifySubmit} className="mt-6 space-y-4">
                <div>
                  <label className={labelClass}>How many proposals do you send per month?</label>
                  <select required value={qual.proposalsPerMonth} onChange={(e) => setQual((p) => ({ ...p, proposalsPerMonth: e.target.value }))} className={inputClass}>
                    <option value="">Select</option>
                    {PROPOSAL_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>What is your average deal size?</label>
                  <select required value={qual.avgDealSize} onChange={(e) => setQual((p) => ({ ...p, avgDealSize: e.target.value }))} className={inputClass}>
                    <option value="">Select</option>
                    {DEAL_SIZE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>What is your role?</label>
                  <select required value={qual.role} onChange={(e) => setQual((p) => ({ ...p, role: e.target.value }))} className={inputClass}>
                    <option value="">Select</option>
                    {ROLE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>What type of agency are you?</label>
                  <select required value={qual.agencyType} onChange={(e) => setQual((p) => ({ ...p, agencyType: e.target.value }))} className={inputClass}>
                    <option value="">Select</option>
                    {AGENCY_TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full mt-6 flex items-center justify-center gap-3 px-6 py-4 rounded-full text-white font-medium" style={{ background: "linear-gradient(135deg, rgba(124,58,237,1) 0%, rgba(147,51,234,1) 55%, rgba(99,102,241,1) 100%)", boxShadow: "0 0 40px rgba(139,92,246,0.3)" }}>
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {step === "qualified" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-light text-white text-center">
                  Pick the closest time you can actually protect
                </DialogTitle>
                <p className="text-sm text-zinc-400 font-light text-center mt-1">
                  We&apos;ll email you and send a calendar invite.
                </p>
              </DialogHeader>

              <form onSubmit={handleBookingSubmit} className="mt-6 space-y-6">
                <div>
                  <p className={labelClass}><Calendar className="inline w-3.5 h-3.5 mr-1" />Date</p>
                  <div className="flex flex-wrap gap-2">
                    {nextDays.map((d) => {
                      const isSelected = selectedDate?.toDateString() === d.toDateString();
                      return (
                        <button key={d.toISOString()} type="button" onClick={() => { setSelectedDate(d); setSelectedSlot(null); }} className={`px-4 py-2.5 rounded-xl text-sm font-light transition-colors ${isSelected ? "bg-violet-600 text-white" : "bg-white/5 border border-white/10 text-zinc-300 hover:border-violet-500/50"}`}>
                          {formatDate(d)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedDate && slotsForDate.length > 0 && (
                  <div>
                    <p className={labelClass}><Clock className="inline w-3.5 h-3.5 mr-1" />Time</p>
                    <div className="flex flex-wrap gap-2">
                      {slotsForDate.map((slot) => {
                        const isSelected = selectedSlot === slot;
                        return (
                          <button key={slot} type="button" onClick={() => setSelectedSlot(slot)} className={`px-4 py-2.5 rounded-xl text-sm font-light transition-colors ${isSelected ? "bg-violet-600 text-white" : "bg-white/5 border border-white/10 text-zinc-300 hover:border-violet-500/50"}`}>
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {submitError && <p className="text-xs text-red-400 text-center">{submitError}</p>}

                <button type="submit" disabled={!selectedDate || !selectedSlot || isSubmitting} className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full text-white font-medium disabled:opacity-50" style={{ background: "linear-gradient(135deg, rgba(124,58,237,1) 0%, rgba(147,51,234,1) 55%, rgba(99,102,241,1) 100%)", boxShadow: "0 0 40px rgba(139,92,246,0.3)" }}>
                  {isSubmitting ? "Sending…" : <><Sparkles className="w-4 h-4" />Confirm demo <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            </>
          )}

          {step === "confirm" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-light text-white text-center">
                  You&apos;re all set
                </DialogTitle>
                <p className="text-sm text-zinc-400 font-light text-center mt-1 max-w-sm mx-auto">
                  We got your request. We&apos;ll create the meeting and send a calendar invite to {lead.email}.
                </p>
              </DialogHeader>
              <div className="mt-6 text-center">
                <button type="button" onClick={() => handleClose(false)} className="text-violet-400 hover:text-violet-300 text-sm font-light">Close</button>
              </div>
            </>
          )}

          {step === "not-qualified" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-light text-white text-center">
                  Not the right fit right now
                </DialogTitle>
                <p className="text-sm text-zinc-400 font-light text-center mt-1 max-w-sm mx-auto">
                  Elystra is built for agencies sending 6+ proposals per month with $5K+ deal sizes.
                </p>
              </DialogHeader>
              <div className="mt-6 space-y-3">
                <button type="button" onClick={() => handleClose(false)} className="block w-full text-center text-sm text-violet-400 hover:text-violet-300 font-light">Back to site</button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
