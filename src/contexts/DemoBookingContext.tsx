"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { DemoBookingModal } from "@/components/DemoBookingModal";

type DemoBookingContextType = {
  openDemoBooking: () => void;
};

const DemoBookingContext = createContext<DemoBookingContextType | null>(null);

export const useDemoBooking = () => {
  const ctx = useContext(DemoBookingContext);
  if (!ctx) throw new Error("useDemoBooking must be used within DemoBookingProvider");
  return ctx;
};

export const DemoBookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const openDemoBooking = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <DemoBookingContext.Provider value={{ openDemoBooking }}>
      {children}
      <DemoBookingModal open={open} onOpenChange={setOpen} />
    </DemoBookingContext.Provider>
  );
};
