"use client";

import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";

interface EmergencyContact {
  label: string;
  number: string;
}

interface EmergencyContactTabProps {
  /** Letters shown on the collapsed vertical tab, e.g. "EMERGENCY" */
  tabLabel?: string;
  /** Numbers shown once expanded, in order */
  contacts?: EmergencyContact[];
}

const defaultContacts: EmergencyContact[] = [
  { label: "Emergency", number: "02563 351505" },
  { label: "Appointment", number: "02563 351503" },
  { label: "Radiology", number: "02563 351510" },
  { label: "Toll-free", number: "1800 8909 111" },
];

export default function EmergencyContactTab({
  tabLabel = "EMERGENCY",
  contacts = defaultContacts,
}: EmergencyContactTabProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Small entrance transition once the panel mounts
  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open emergency contacts"
        className="fixed left-0 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-0.5 rounded-r-xl bg-red-600 px-2 py-4 text-white shadow-lg transition-colors hover:bg-red-700"
      >
        {tabLabel.split("").map((ch, i) => (
          <span key={i} className="text-xs font-bold leading-none tracking-wide">
            {ch}
          </span>
        ))}
      </button>
    );
  }

  return (
    <div
      className={`fixed left-0 top-1/2 z-50 w-72 max-w-[85vw] -translate-y-1/2 overflow-hidden rounded-r-2xl bg-red-600 text-white shadow-2xl transition-all duration-200 ease-out ${
        visible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
      }`}
    >
      <div className="flex items-start justify-between gap-2 p-5">
        <div className="flex-1 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-red-100">
            Emergency Contacts
          </p>
          {contacts.map((c, i) => (
            <a
              key={i}
              href={`tel:${c.number.replace(/\s+/g, "")}`}
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/10"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-wide text-red-100">
                  {c.label}
                </span>
                <span className="block text-sm font-bold">{c.number}</span>
              </span>
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close emergency contacts"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
