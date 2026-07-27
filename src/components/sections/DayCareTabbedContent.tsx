"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Syringe,
  Droplet,
  Scissors,
  Stethoscope,
  Timer,
  ClipboardList,
  Sparkles,
  HeartPulse,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TabItem {
  title: string;
  description: string | string[];
  image?: string | null;
}

// ── Keyword → icon map, with a fallback rotation for anything unmatched ─────
const ICON_RULES: Array<{ keywords: string[]; Icon: typeof Syringe }> = [
  { keywords: ["chemo", "oncology", "cancer"], Icon: Droplet },
  { keywords: ["dialysis", "renal"], Icon: Droplet },
  {
    keywords: ["surgery", "surgical", "minor procedure", "operation"],
    Icon: Scissors,
  },
  { keywords: ["endoscopy", "scope"], Icon: Eye },
  { keywords: ["injection", "infusion", "iv "], Icon: Syringe },
  { keywords: ["cardiac", "heart"], Icon: HeartPulse },
  { keywords: ["consult", "doctor", "specialist"], Icon: Stethoscope },
  { keywords: ["recovery", "observation", "monitoring"], Icon: Timer },
  { keywords: ["admission", "registration", "discharge"], Icon: ClipboardList },
];
const FALLBACK_ICONS = [Sparkles, Stethoscope, Timer, ClipboardList];

function iconFor(title: string, index: number) {
  const lower = title.toLowerCase();
  const match = ICON_RULES.find((r) =>
    r.keywords.some((k) => lower.includes(k)),
  );
  return match?.Icon ?? FALLBACK_ICONS[index % FALLBACK_ICONS.length];
}

export default function DayCareTabbedContent({ data }: { data: TabItem[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const active = data[activeTab];
  const ActiveIcon = iconFor(active.title, activeTab);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 sm:gap-8 lg:gap-10 rounded-2xl sm:rounded-3xl p-3 sm:p-6 lg:p-8"
      style={{ background: "#F6F9FB" }}
    >
      {/* ── Left: procedure rail ─────────────────────────────────────────── */}
      <nav
        aria-label="Day care procedures"
        className="lg:sticky lg:top-28 self-start"
      >
        {/* Mobile: horizontal icon-pill scroller */}
        <ul className="flex lg:hidden gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {data.map((tab, i) => {
            const Icon = iconFor(tab.title, i);
            const isActive = activeTab === i;
            return (
              <li key={i} className="shrink-0 snap-start">
                <button
                  onClick={() => setActiveTab(i)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border",
                    isActive
                      ? "text-white border-transparent shadow-md"
                      : "bg-white border-neutral-200 text-neutral-600 hover:border-[#08A2A4]/40",
                  )}
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(135deg, #0456A8, #08A2A4)",
                        }
                      : undefined
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {tab.title}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Desktop: vertical connecting rail */}
        <ul className="hidden lg:block relative">
          <div
            className="absolute left-[19px] top-2 bottom-2 w-px"
            style={{
              background: "linear-gradient(to bottom, #0456A8AA, #08A2A455)",
            }}
            aria-hidden
          />
          {data.map((tab, i) => {
            const Icon = iconFor(tab.title, i);
            const isActive = activeTab === i;
            return (
              <li key={i} className="relative">
                <button
                  onClick={() => setActiveTab(i)}
                  aria-current={isActive ? "true" : undefined}
                  className="w-full flex items-center gap-3.5 py-2.5 group text-left"
                >
                  <span className="relative shrink-0 flex items-center justify-center">
                    {isActive && (
                      <span
                        className="absolute inline-flex h-10 w-10 rounded-full opacity-40 animate-[ping_1.8s_ease-in-out_infinite]"
                        style={{ background: "#08A2A4" }}
                        aria-hidden
                      />
                    )}
                    <span
                      className={cn(
                        "relative w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10",
                        isActive
                          ? "text-white border-transparent shadow-lg scale-105"
                          : "bg-white border-neutral-200 text-neutral-400 group-hover:border-[#08A2A4] group-hover:text-[#08A2A4]",
                      )}
                      style={
                        isActive
                          ? {
                              background:
                                "linear-gradient(135deg, #0456A8, #08A2A4)",
                            }
                          : undefined
                      }
                    >
                      <Icon className="w-[18px] h-[18px]" />
                    </span>
                  </span>

                  <span
                    className={cn(
                      "text-[15px] leading-snug transition-colors duration-200",
                      isActive
                        ? "font-semibold"
                        : "font-medium text-neutral-500 group-hover:text-neutral-800",
                    )}
                    style={isActive ? { color: "#0B2E4E" } : undefined}
                  >
                    {tab.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Right: active procedure card ─────────────────────────────────── */}
      <div
        key={activeTab}
        className="bg-white rounded-3xl shadow-[0_8px_40px_-12px_rgba(4,86,168,0.15)] overflow-hidden animate-[fadeInUp_0.4s_ease-out]"
      >
        <div className="grid grid-cols-1 md:grid-cols-5">
          {active.image && (
            <div className="relative md:col-span-2 aspect-[16/10] sm:aspect-[4/3] md:aspect-auto">
              <Image
                src={active.image}
                alt={active.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(11,46,78,0.35), transparent 40%)",
                }}
                aria-hidden
              />
            </div>
          )}

          <div
            className={cn(
              "p-5 sm:p-8 lg:p-10 flex flex-col justify-center",
              active.image ? "md:col-span-3" : "md:col-span-5",
            )}
          >
            <div className="flex items-center gap-2.5 mb-4 flex-wrap">
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "#0456A80D", color: "#0456A8" }}
              >
                <ActiveIcon className="w-[18px] h-[18px]" />
              </span>
              <span
                className="text-xs font-semibold tracking-[0.14em] uppercase"
                style={{ color: "#08A2A4" }}
              >
                Day Care Procedure {String(activeTab + 1).padStart(2, "0")} /{" "}
                {String(data.length).padStart(2, "0")}
              </span>
            </div>

            <h3
              className="text-xl sm:text-2xl lg:text-3xl mb-4"
              style={{
                fontFamily: "var(--font-display, serif)",
                color: "#0B2E4E",
              }}
            >
              {active.title}
            </h3>

            {Array.isArray(active.description) ? (
              <div className="space-y-3">
                {active.description.map((para, j) => (
                  <p
                    key={j}
                    className="text-neutral-600 leading-relaxed text-sm md:text-md"
                  >
                    {para}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-neutral-600 leading-relaxed text-sm md:text-md">
                {active.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
