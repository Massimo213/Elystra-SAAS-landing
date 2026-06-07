"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { DemoBookingModal, type DemoPrefill } from "@/components/DemoBookingModal";

type DemoBookingContextType = {
  openDemoBooking: (prefill?: DemoPrefill) => void;
};

const DemoBookingContext = createContext<DemoBookingContextType | null>(null);

export const useDemoBooking = () => {
  const ctx = useContext(DemoBookingContext);
  if (!ctx) throw new Error("useDemoBooking must be used within DemoBookingProvider");
  return ctx;
};

export const DemoBookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<DemoPrefill>(null);

  const openDemoBooking = useCallback((next?: DemoPrefill) => {
    setPrefill(next ?? null);
    setOpen(true);
  }, []);

  return (
    <DemoBookingContext.Provider value={{ openDemoBooking }}>
      {children}
      <DemoBookingModal open={open} onOpenChange={setOpen} prefill={prefill} />
    </DemoBookingContext.Provider>
  );
};
