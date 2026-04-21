"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  HOW TRANSLATION WORKS:
  1. User picks a language → we write a `googtrans` cookie → reload page
  2. On reload, the GT script (loaded in layout.tsx <head>) reads the cookie
     and translates all text before the page becomes visible
  3. No widget iframe, no spinner, no toolbar banner — just clean translation
*/

const LANGUAGES = [
  { code: "en", label: "English", native: "English"  },
  { code: "hi", label: "Hindi",   native: "हिन्दी"   },
  { code: "mr", label: "Marathi", native: "मराठी"    },
];

function readActiveLang(): string {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/googtrans=\/en\/([a-z]+)/);
  return m ? m[1] : "en";
}

function applyTranslation(langCode: string) {
  // Clear all existing googtrans cookies
  const expiry = "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  document.cookie = `googtrans=; ${expiry}`;
  document.cookie = `googtrans=; ${expiry}; domain=${location.hostname}`;
  document.cookie = `googtrans=; ${expiry}; domain=.${location.hostname}`;

  if (langCode !== "en") {
    const val = `/en/${langCode}`;
    document.cookie = `googtrans=${val}; path=/`;
    document.cookie = `googtrans=${val}; path=/; domain=${location.hostname}`;
    document.cookie = `googtrans=${val}; path=/; domain=.${location.hostname}`;
  }

  window.location.reload();
}

interface Props {
  /** "dark" = white text on coloured background (topbar).
      "light" = dark text on white background (mobile nav). */
  variant?: "dark" | "light";
}

export default function GoogleTranslate({ variant = "dark" }: Props) {
  const [open,   setOpen]   = useState(false);
  const [active, setActive] = useState("en");
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setActive(readActiveLang()); }, []);

  // Close on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSelect = useCallback((code: string) => {
    setOpen(false);
    if (code === active) return;
    applyTranslation(code);
  }, [active]);

  const activeLabel = LANGUAGES.find((l) => l.code === active);

  const isDark = variant === "dark";

  return (
    <div className="relative" ref={dropRef}>
      {/* ── Trigger button ─────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold",
          "transition-all duration-200 border select-none outline-none",
          isDark
            ? [
                "border-white/30 text-white",
                "hover:bg-white/20 hover:border-white/60",
                open && "bg-white/20 border-white/60",
              ]
            : [
                "border-neutral-200 text-neutral-700",
                "hover:bg-neutral-100 hover:border-neutral-300",
                open && "bg-neutral-100 border-neutral-300",
              ]
        )}
      >
        <Globe className="w-3.5 h-3.5 shrink-0" />
        <span className="min-w-[3.2rem] text-left leading-none">
          {activeLabel?.native ?? "English"}
        </span>
        <ChevronDown
          className={cn(
            "w-3 h-3 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* ── Dropdown ────────────────────────────────────────────────────── */}
      <div
        role="listbox"
        aria-label="Language options"
        className={cn(
          // Position: always open downward, right-aligned
          "absolute right-0 top-[calc(100%+8px)] w-44",
          // Visual
          "bg-white rounded-2xl border border-neutral-100 overflow-hidden",
          // Elevation — high enough to sit above navbar layers
          "z-[99999]",
          // Shadow
          "shadow-[0_8px_30px_rgba(0,0,0,0.16),0_2px_8px_rgba(0,0,0,0.08)]",
          // Animation
          "transition-all duration-200 origin-top-right",
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="px-4 pt-3 pb-2 border-b border-neutral-100">
          <p className="font-bold text-neutral-400 uppercase tracking-widest"
             style={{ fontSize: "0.58rem" }}>
            Language
          </p>
        </div>

        {/* Language options */}
        {LANGUAGES.map((lang) => {
          const isActive = active === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              role="option"
              aria-selected={isActive}
              onClick={() => handleSelect(lang.code)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3",
                "text-left transition-colors duration-150 cursor-pointer",
                "outline-none focus-visible:bg-blue-50",
                isActive ? "bg-blue-50" : "hover:bg-neutral-50"
              )}
            >
              <div className="flex flex-col gap-0.5">
                <span
                  className="font-semibold leading-none text-sm"
                  style={{ color: isActive ? "var(--color-primary)" : "#1f2937" }}
                >
                  {lang.native}
                </span>
                <span className="text-xs leading-none text-neutral-400">
                  {lang.label}
                </span>
              </div>
              {isActive && (
                <Check className="w-4 h-4 shrink-0" style={{ color: "var(--color-primary)" }} />
              )}
            </button>
          );
        })}

        {/* Footer */}
        <div className="px-4 py-2 border-t border-neutral-100 bg-neutral-50/70">
          <p style={{ fontSize: "0.58rem", color: "#d1d5db" }}>
            Powered by Google Translate
          </p>
        </div>
      </div>
    </div>
  );
}
